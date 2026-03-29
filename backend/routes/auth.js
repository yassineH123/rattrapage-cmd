const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const db       = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');
const { generateCode, sendEmailCode } = require('../config/verification');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, nom: user.nom },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    if (!nom || !email || !password)
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Mot de passe trop court (min 6 caractères).' });

    const cleanEmail = email.trim().toLowerCase();

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existing.length)
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

    const hash     = await bcrypt.hash(password, 12);
    const userRole = ['client', 'freelancer'].includes(role) ? role : 'client';

    const [result] = await db.query(
      'INSERT INTO users (nom, email, password_hash, role, is_verified) VALUES (?, ?, ?, ?, FALSE)',
      [nom.trim(), cleanEmail, hash, userRole]
    );

    const userId = result.insertId;
    const code   = generateCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'INSERT INTO verification_codes (user_id, code, method, expires_at) VALUES (?, ?, ?, ?)',
      [userId, code, 'email', expires]
    );

    // Envoyer le code par email
    try {
      await sendEmailCode(cleanEmail, code, nom.trim());
      console.log(`📧 Code envoyé à ${cleanEmail}`);
    } catch (sendErr) {
      console.error('Erreur envoi:', sendErr.message);
      // Supprimer l'utilisateur créé pour permettre une nouvelle tentative
      await db.query('DELETE FROM users WHERE id = ?', [userId]);
      return res.status(500).json({ message: `Impossible d'envoyer le code : ${sendErr.message}` });
    }

    res.status(201).json({
      userId,
      message: `Code de vérification envoyé par email.`
    });
  } catch (err) {
    console.log('ERREUR INSCRIPTION:', err.message);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// POST /api/auth/verify
router.post('/verify', async (req, res) => {
  try {
    const { userId, code } = req.body;
    const [codes] = await db.query(
      `SELECT * FROM verification_codes
       WHERE user_id = ? AND code = ? AND used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId, code]
    );
    if (!codes.length)
      return res.status(400).json({ message: 'Code invalide ou expiré.' });

    await db.query('UPDATE verification_codes SET used = TRUE WHERE id = ?', [codes[0].id]);
    await db.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [userId]);

    const [users] = await db.query('SELECT id, nom, email, role, avatar FROM users WHERE id = ?', [userId]);
    const token = signToken(users[0]);
    res.json({ token, user: users[0], message: 'Compte vérifié avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// POST /api/auth/resend-code
router.post('/resend-code', async (req, res) => {
  try {
    const { userId } = req.body;
    const [users] = await db.query(
      'SELECT id, nom, email, phone FROM users WHERE id = ? AND is_verified = FALSE',
      [userId]
    );
    if (!users.length)
      return res.status(404).json({ message: 'Utilisateur non trouvé ou déjà vérifié.' });

    const user = users[0];
    const [lastCodes] = await db.query(
      'SELECT method FROM verification_codes WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    const method  = lastCodes[0]?.method || 'email';
    const code    = generateCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'INSERT INTO verification_codes (user_id, code, method, expires_at) VALUES (?, ?, ?, ?)',
      [userId, code, method, expires]
    );

    if (method === 'sms') {
      await sendSmsCode(user.phone, code);
    } else {
      await sendEmailCode(user.email, code, user.nom);
    }
    res.json({ message: 'Nouveau code envoyé.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email et mot de passe requis.' });

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (!users.length)
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    const user  = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });

    if (!user.is_verified)
      return res.status(403).json({
        message: 'Compte non vérifié.',
        userId: user.id,
        needsVerification: true
      });

    const token = signToken(user);
    res.json({ token, user: { id: user.id, nom: user.nom, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, nom, email, role, avatar, bio, phone, is_verified, created_at FROM users WHERE id = ?',
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
  res.json(rows[0]);
});

// PUT /api/auth/profile
router.put('/profile', auth, async (req, res) => {
  const { nom, bio } = req.body;
  await db.query('UPDATE users SET nom = ?, bio = ? WHERE id = ?', [nom, bio, req.user.id]);
  res.json({ message: 'Profil mis à jour.' });
});

// ── ADMIN ROUTES (kept for backwards compatibility) ──
// These endpoints are also available in /api/admin but kept here for existing frontend code
router.get('/admin/users', auth, adminOnly, async (req, res) => {
  const [users] = await db.query(
    'SELECT id, nom, email, role, is_verified, created_at FROM users ORDER BY created_at DESC'
  );
  res.json(users);
});

router.delete('/admin/users/:id', auth, adminOnly, async (req, res) => {
  const { id } = req.params;
  if (String(id) === String(req.user.id))
    return res.status(400).json({ message: 'Vous ne pouvez pas supprimer votre propre compte.' });
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'Utilisateur supprimé.' });
});

router.put('/admin/users/:id/verify', auth, adminOnly, async (req, res) => {
  await db.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [req.params.id]);
  res.json({ message: 'Utilisateur vérifié.' });
});

module.exports = router;
