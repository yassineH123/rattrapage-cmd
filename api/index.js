require('dotenv').config({ path: '../backend/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../backend/uploads')));

// Routes
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/services', require('../backend/routes/services'));
app.use('/api/orders', require('../backend/routes/orders'));
app.use('/api/reviews', require('../backend/routes/reviews'));
app.use('/api/messages', require('../backend/routes/messages'));
app.use('/api/admin', require('../backend/routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FreelanceHub API is running' });
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// SPA fallback - servir index.html pour les routes frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

module.exports = app;
