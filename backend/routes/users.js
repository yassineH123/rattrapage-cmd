const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth } = require('../middleware/auth');

// GET /api/users/profile - Get current user's profile
router.get('/profile', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nom, email, role, avatar, bio, phone, is_verified, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (!rows.length) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /profile error:', err.message);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// PUT /api/users/profile - Update current user's profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { nom, bio, phone } = req.body;
    
    const updateFields = [];
    const updateValues = [];
    
    if (nom !== undefined) {
      updateFields.push('nom = ?');
      updateValues.push(nom);
    }
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }
    
    updateValues.push(req.user.id);
    
    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.query(query, updateValues);
    
    // Return updated profile
    const [rows] = await db.query(
      'SELECT id, nom, email, role, avatar, bio, phone, is_verified, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    
    res.json({ message: 'Profil mis à jour.', user: rows[0] });
  } catch (err) {
    console.error('PUT /profile error:', err.message);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET /api/users/:id - Get public profile of a user
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nom, avatar, role, bio, phone, is_verified, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    
    if (!rows.length) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /:id error:', err.message);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
