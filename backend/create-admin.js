const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'freelancehub',
  });

  try {
    const connection = await pool.getConnection();
    
    // Hash du mot de passe
    const password = 'Admin@123';
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Supprimer l'ancien admin si existe
    await connection.query('DELETE FROM users WHERE email = ?', ['admin@freelancehub.ma']);
    
    // Créer le nouvel admin
    await connection.query(
      'INSERT INTO users (nom, email, password_hash, role, is_verified) VALUES (?, ?, ?, ?, ?)',
      ['Admin FreelanceHub', 'admin@freelancehub.ma', passwordHash, 'admin', 1]
    );
    
    console.log('✅ Admin créé avec succès !');
    console.log('📧 Email: admin@freelancehub.ma');
    console.log('🔑 Mot de passe: Admin@123');
    
    connection.release();
    pool.end();
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    pool.end();
    process.exit(1);
  }
}

createAdmin();
