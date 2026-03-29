-- ==============================================
--  FreelanceHub — Schéma MySQL
--  Lancer : mysql -u root < schema.sql
-- ==============================================

CREATE DATABASE IF NOT EXISTS freelancehub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE freelancehub;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nom           VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  UNIQUE NOT NULL,
  phone         VARCHAR(20),
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('client','freelancer','admin') DEFAULT 'client',
  avatar        VARCHAR(255),
  bio           TEXT,
  is_verified   BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VERIFICATION CODES
CREATE TABLE IF NOT EXISTS verification_codes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT         NOT NULL,
  code        VARCHAR(6)  NOT NULL,
  method      ENUM('email','sms') DEFAULT 'email',
  expires_at  TIMESTAMP   NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT           NOT NULL,
  titre        VARCHAR(200)  NOT NULL,
  description  TEXT          NOT NULL,
  prix         DECIMAL(10,2) NOT NULL,
  categorie    VARCHAR(100),
  image        VARCHAR(255),
  delai        INT DEFAULT 3,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  client_id   INT           NOT NULL,
  service_id  INT           NOT NULL,
  statut      ENUM('en_attente','en_cours','termine','annule') DEFAULT 'en_attente',
  montant     DECIMAL(10,2) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id)  REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  order_id     INT     NOT NULL,
  user_id      INT     NOT NULL,
  note         TINYINT NOT NULL CHECK (note BETWEEN 1 AND 5),
  commentaire  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_review_order (order_id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  sender_id    INT  NOT NULL,
  receiver_id  INT  NOT NULL,
  contenu      TEXT NOT NULL,
  lu           BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id)   REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Admin par defaut: admin@freelancehub.ma / Admin@123
INSERT IGNORE INTO users (nom, email, password_hash, role, is_verified) VALUES
('Admin FreelanceHub', 'admin@freelancehub.ma',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VQHhHlC4K',
 'admin', TRUE);
