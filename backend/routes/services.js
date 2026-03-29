const express = require('express');
const router  = express.Router();
const path    = require('path');
const multer  = require('multer');
const db      = require('../config/db');
const { auth } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// ── GET /api/services ─────────────────────────
router.get('/', async (req, res) => {
  try {
    const { categorie, search, page = 1, limit = 12 } = req.query;
    let query = `
      SELECT s.*,
        u.nom  AS freelancer_nom,
        u.avatar AS freelancer_avatar,
        ROUND(AVG(r.note), 1) AS note_moyenne,
        COUNT(DISTINCT r.id)  AS nb_avis
      FROM services s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN orders o ON o.service_id = s.id
      LEFT JOIN reviews r ON r.order_id = o.id
      WHERE 1=1
    `;
    const params = [];
    if (categorie) { query += ' AND s.categorie = ?'; params.push(categorie); }
    if (search)    { query += ' AND (s.titre LIKE ? OR s.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

    query += ' GROUP BY s.id ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [services] = await db.query(query, params);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/services/mine ────────────────────
router.get('/mine', auth, async (req, res) => {
  const [services] = await db.query(
    'SELECT * FROM services WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(services);
});

// ── GET /api/services/:id ─────────────────────
router.get('/:id', async (req, res) => {
  const [rows] = await db.query(`
    SELECT s.*,
      u.nom AS freelancer_nom,
      u.avatar AS freelancer_avatar,
      u.bio  AS freelancer_bio,
      ROUND(AVG(r.note), 1) AS note_moyenne,
      COUNT(DISTINCT r.id)  AS nb_avis
    FROM services s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN orders o ON o.service_id = s.id
    LEFT JOIN reviews r ON r.order_id = o.id
    WHERE s.id = ?
    GROUP BY s.id
  `, [req.params.id]);

  if (!rows.length) return res.status(404).json({ message: 'Service introuvable.' });
  res.json(rows[0]);
});

// ── POST /api/services ────────────────────────
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (req.user.role !== 'freelancer')
      return res.status(403).json({ message: 'Réservé aux freelancers.' });

    const { titre, description, prix, categorie, delai } = req.body;
    if (!titre || !description || !prix)
      return res.status(400).json({ message: 'Titre, description et prix sont requis.' });

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO services (user_id, titre, description, prix, categorie, image, delai) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, titre, description, prix, categorie, image, delai || 3]
    );
    res.status(201).json({ id: result.insertId, message: 'Service créé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PUT /api/services/:id ─────────────────────
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Service introuvable.' });
  if (rows[0].user_id !== req.user.id)
    return res.status(403).json({ message: 'Non autorisé.' });

  const { titre, description, prix, categorie, delai } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : rows[0].image;

  await db.query(
    'UPDATE services SET titre=?, description=?, prix=?, categorie=?, image=?, delai=? WHERE id=?',
    [titre, description, prix, categorie, image, delai, req.params.id]
  );
  res.json({ message: 'Service mis à jour.' });
});

// ── DELETE /api/services/:id ──────────────────
router.delete('/:id', auth, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Service introuvable.' });
  if (rows[0].user_id !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Non autorisé.' });

  await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Service supprimé.' });
});

module.exports = router;
