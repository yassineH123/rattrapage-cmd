const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { auth } = require('../middleware/auth');

// ── POST /api/orders ──────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'client')
      return res.status(403).json({ message: 'Réservé aux clients.' });

    const { service_id } = req.body;
    const [services] = await db.query('SELECT * FROM services WHERE id = ?', [service_id]);
    if (!services.length) return res.status(404).json({ message: 'Service introuvable.' });
    if (services[0].user_id === req.user.id)
      return res.status(400).json({ message: 'Vous ne pouvez pas commander votre propre service.' });

    const [result] = await db.query(
      'INSERT INTO orders (client_id, service_id, montant, statut) VALUES (?, ?, ?, ?)',
      [req.user.id, service_id, services[0].prix, 'en_attente']
    );
    res.status(201).json({ id: result.insertId, message: 'Commande passée avec succès !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/orders ───────────────────────────
router.get('/', auth, async (req, res) => {
  let query, params;

  if (req.user.role === 'client') {
    query = `
      SELECT o.*, s.titre, s.image, s.categorie, u.nom AS freelancer_nom, u.avatar AS freelancer_avatar
      FROM orders o
      JOIN services s ON o.service_id = s.id
      JOIN users    u ON s.user_id    = u.id
      WHERE o.client_id = ?
      ORDER BY o.created_at DESC
    `;
    params = [req.user.id];
  } else {
    query = `
      SELECT o.*, s.titre, s.image, s.categorie, u.nom AS client_nom, u.avatar AS client_avatar
      FROM orders o
      JOIN services s ON o.service_id = s.id
      JOIN users    u ON o.client_id  = u.id
      WHERE s.user_id = ?
      ORDER BY o.created_at DESC
    `;
    params = [req.user.id];
  }

  const [orders] = await db.query(query, params);
  res.json(orders);
});

// ── GET /api/orders/:id ───────────────────────
router.get('/:id', auth, async (req, res) => {
  const [rows] = await db.query(`
    SELECT o.*, s.titre, s.description, s.prix, s.image,
      c.nom AS client_nom, f.nom AS freelancer_nom
    FROM orders o
    JOIN services s ON o.service_id = s.id
    JOIN users c    ON o.client_id  = c.id
    JOIN users f    ON s.user_id    = f.id
    WHERE o.id = ?
  `, [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Commande introuvable.' });
  res.json(rows[0]);
});

// ── PUT /api/orders/:id/status ────────────────
router.put('/:id/status', auth, async (req, res) => {
  const { statut } = req.body;
  const validStatus = ['en_attente', 'en_cours', 'termine', 'annule'];
  if (!validStatus.includes(statut))
    return res.status(400).json({ message: 'Statut invalide.' });

  await db.query('UPDATE orders SET statut = ? WHERE id = ?', [statut, req.params.id]);
  res.json({ message: 'Statut mis à jour.' });
});

module.exports = router;
