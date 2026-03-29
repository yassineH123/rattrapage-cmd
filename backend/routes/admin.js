const express  = require('express');
const router   = express.Router();
const db       = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

// ── Middleware ────────────────────────────────
router.use(auth, adminOnly);

// ── GET all users ─────────────────────────────
router.get('/users', async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, nom, email, phone, role, avatar, is_verified, created_at FROM users'
    );
    res.json({ users, count: users.length });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── GET all services ─────────────────────────
router.get('/services', async (req, res) => {
  try {
    const [services] = await db.query(
      'SELECT id, user_id, titre, description, prix, categorie, delai, created_at FROM services'
    );
    res.json({ services, count: services.length });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── GET all orders ───────────────────────────
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT id, client_id, service_id, statut, montant, created_at FROM orders'
    );
    res.json({ orders, count: orders.length });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── GET all messages ─────────────────────────
router.get('/messages', async (req, res) => {
  try {
    const [messages] = await db.query(
      'SELECT id, sender_id, receiver_id, contenu, lu, created_at FROM messages'
    );
    res.json({ messages, count: messages.length });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── GET all reviews ──────────────────────────
router.get('/reviews', async (req, res) => {
  try {
    const [reviews] = await db.query(
      'SELECT id, order_id, user_id, note, commentaire, created_at FROM reviews'
    );
    res.json({ reviews, count: reviews.length });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── DELETE user ───────────────────────────────
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── DELETE service ────────────────────────────
router.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    res.json({ message: 'Service supprimé', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── DELETE order ──────────────────────────────
router.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json({ message: 'Commande supprimée', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── DELETE message ────────────────────────────
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM messages WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── DELETE review ─────────────────────────────
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }
    res.json({ message: 'Avis supprimé', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── UPDATE user ───────────────────────────────
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, phone, role, is_verified } = req.body;
    
    const [result] = await db.query(
      'UPDATE users SET nom=?, email=?, phone=?, role=?, is_verified=? WHERE id=?',
      [nom, email, phone, role, is_verified, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur modifié', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── UPDATE service ────────────────────────────
router.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, prix, categorie, delai } = req.body;
    
    const [result] = await db.query(
      'UPDATE services SET titre=?, description=?, prix=?, categorie=?, delai=? WHERE id=?',
      [titre, description, prix, categorie, delai, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    res.json({ message: 'Service modifié', id });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ── GET dashboard stats ───────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [users] = await db.query('SELECT COUNT(*) as count FROM users');
    const [services] = await db.query('SELECT COUNT(*) as count FROM services');
    const [orders] = await db.query('SELECT COUNT(*) as count FROM orders');
    const [messages] = await db.query('SELECT COUNT(*) as count FROM messages');
    const [reviews] = await db.query('SELECT COUNT(*) as count FROM reviews');
    
    res.json({
      users: users[0].count,
      services: services[0].count,
      orders: orders[0].count,
      messages: messages[0].count,
      reviews: reviews[0].count
    });
  } catch(err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
