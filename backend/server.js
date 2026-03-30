require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const http     = require('http');
const { Server } = require('socket.io');
const path     = require('path');

const app    = express();
const server = http.createServer(app);

// CORS configuration - Accept all origins in development
const corsOptions = {
  origin: function(origin, callback) {
    if (process.env.NODE_ENV === 'production') {
      const allowed = [process.env.CLIENT_URL, 'http://localhost:5500'].filter(Boolean);
      if (allowed.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Development: Allow all origins
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

const io     = new Server(server, {
  cors: corsOptions
});

// ── Middleware ────────────────────────────────
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

// ── Routes ────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/users',    require('./routes/users'));
app.use('/api/services', require('./routes/services'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/reviews',  require('./routes/reviews'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/admin',    require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// ── Socket.io — Messagerie temps réel ─────────
const onlineUsers = {};

io.on('connection', (socket) => {
  // Associer userId <-> socketId
  socket.on('user_connected', (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit('online_users', Object.keys(onlineUsers));
  });

  socket.on('send_message', (data) => {
    const receiverSocket = onlineUsers[data.receiver_id];
    if (receiverSocket) {
      io.to(receiverSocket).emit('receive_message', data);
    }
  });

  socket.on('typing', (data) => {
    const receiverSocket = onlineUsers[data.receiver_id];
    if (receiverSocket) io.to(receiverSocket).emit('typing', data);
  });

  socket.on('disconnect', () => {
    for (const [userId, sId] of Object.entries(onlineUsers)) {
      if (sId === socket.id) { delete onlineUsers[userId]; break; }
    }
    io.emit('online_users', Object.keys(onlineUsers));
  });
});

// ── Start ─────────────────────────────────────
const PORT = process.env.PORT || 5000;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 FreelanceHub API — http://localhost:${PORT}`);
  console.log(`📦 Database : ${process.env.DB_NAME}`);
  console.log(`🔐 Auth     : JWT enabled\n`);
});

// Catch unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
