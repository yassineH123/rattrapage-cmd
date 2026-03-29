const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { auth } = require('../middleware/auth');

// ── GET /api/messages ─────────────────────────
// Liste des conversations (dernier message par interlocuteur)
router.get('/', auth, async (req, res) => {
  const uid = req.user.id;
  const [conversations] = await db.query(`
    SELECT
      IF(m.sender_id = ?, m.receiver_id, m.sender_id) AS other_id,
      u.nom, u.avatar,
      m.contenu  AS dernier_message,
      m.created_at AS derniere_activite,
      SUM(m.lu = FALSE AND m.receiver_id = ?) AS non_lus
    FROM messages m
    JOIN users u ON u.id = IF(m.sender_id = ?, m.receiver_id, m.sender_id)
    WHERE m.sender_id = ? OR m.receiver_id = ?
    GROUP BY other_id
    ORDER BY m.created_at DESC
  `, [uid, uid, uid, uid, uid]);
  res.json(conversations);
});

// ── GET /api/messages/:userId ─────────────────
// Conversation avec un utilisateur spécifique
router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const me = req.user.id;

  const [messages] = await db.query(`
    SELECT m.*, u.nom AS sender_nom, u.avatar AS sender_avatar
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE (m.sender_id = ? AND m.receiver_id = ?)
       OR (m.sender_id = ? AND m.receiver_id = ?)
    ORDER BY m.created_at ASC
  `, [me, userId, userId, me]);

  // Marquer comme lus
  await db.query(
    'UPDATE messages SET lu = TRUE WHERE sender_id = ? AND receiver_id = ?',
    [userId, me]
  );

  res.json(messages);
});

// ── POST /api/messages ────────────────────────
router.post('/', auth, async (req, res) => {
  const { receiver_id, contenu } = req.body;
  if (!contenu?.trim()) return res.status(400).json({ message: 'Message vide.' });

  const [result] = await db.query(
    'INSERT INTO messages (sender_id, receiver_id, contenu) VALUES (?, ?, ?)',
    [req.user.id, receiver_id, contenu.trim()]
  );
  res.status(201).json({ id: result.insertId, message: 'Message envoyé.' });
});

module.exports = router;
