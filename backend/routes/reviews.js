const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { auth } = require('../middleware/auth');

// ── POST /api/reviews ─────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const { order_id, note, commentaire } = req.body;
    if (!note || note < 1 || note > 5)
      return res.status(400).json({ message: 'La note doit être entre 1 et 5.' });

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND client_id = ?',
      [order_id, req.user.id]
    );
    if (!orders.length) return res.status(404).json({ message: 'Commande introuvable.' });
    if (orders[0].statut !== 'termine')
      return res.status(400).json({ message: 'Impossible d\'évaluer une commande non terminée.' });

    const [existing] = await db.query('SELECT id FROM reviews WHERE order_id = ?', [order_id]);
    if (existing.length) return res.status(400).json({ message: 'Vous avez déjà soumis un avis.' });

    await db.query(
      'INSERT INTO reviews (order_id, user_id, note, commentaire) VALUES (?, ?, ?, ?)',
      [order_id, req.user.id, note, commentaire]
    );
    res.status(201).json({ message: 'Avis soumis avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/reviews/service/:id ──────────────
router.get('/service/:service_id', async (req, res) => {
  const [reviews] = await db.query(`
    SELECT r.*, u.nom, u.avatar
    FROM reviews r
    JOIN users   u ON r.user_id  = u.id
    JOIN orders  o ON r.order_id = o.id
    WHERE o.service_id = ?
    ORDER BY r.created_at DESC
  `, [req.params.service_id]);
  res.json(reviews);
});

module.exports = router;
