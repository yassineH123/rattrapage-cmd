# 🚀 FreelanceHub - Plateforme de Freelancing Marocaine

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Une plateforme moderne et complète pour connecter les freelances et les clients au Maroc. FreelanceHub permet aux freelances de proposer leurs services, aux clients de trouver les meilleurs talents, et à tous deux de collaborer en toute confiance.

## ✨ Fonctionnalités Principales

### 👤 Authentification & Profil
- ✅ Inscription et connexion sécurisées (JWT)
- ✅ Vérification d'email
- ✅ Réinitialisation de mot de passe
- ✅ Profils détaillés avec portfolio
- ✅ Gestion des paramètres utilisateur

### 💼 Services & Commandes
- ✅ Création et gestion de services
- ✅ Navigation et recherche de services
- ✅ Système de commandes avec suivi
- ✅ Gestion du statut des commandes
- ✅ Historique complet

### 💬 Communication
- ✅ Messagerie en temps réel (Socket.IO)
- ✅ Chat direct entre freelances et clients
- ✅ Notifications en direct

### ⭐ Évaluations & Avis
- ✅ Système d'évaluation 5 étoiles
- ✅ Commentaires détaillés
- ✅ Historique des avis

### 🛡️ Admin & Modération
- ✅ Tableau de bord administrateur
- ✅ Gestion des utilisateurs
- ✅ Modération du contenu
- ✅ Statistiques et analytiques

## 🛠️ Stack Technologique

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation SPA
- **Axios** - Client HTTP
- **Zustand** - State management léger
- **CSS3** - Styling moderne

### Backend
- **Node.js** - Runtime JavaScript serveur
- **Express.js** - Framework web
- **MySQL 2** - Base de données relationnelle
- **JWT** - Authentification stateless
- **Socket.IO** - Communication en temps réel
- **Multer** - Upload de fichiers
- **Nodemailer** - Envoi d'emails
- **Twilio** - SMS et notifications
- **bcryptjs** - Hashage sécurisé des mots de passe

## 📦 Installation

### Pré-requis
- **Node.js** ≥ 16.x
- **npm** ≥ 8.x ou **yarn**
- **MySQL** ≥ 8.0
- Un navigateur moderne

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/yourusername/freelancehub.git
cd freelancehub
```

### 2️⃣ Installer toutes les dépendances

```bash
npm run install:all
```

Cela va installer les dépendances du :
- Projet root
- Backend (`backend/`)
- Frontend (`frontend/`)

### 3️⃣ Configuration de la base de données

**Créer la base de données:**

```bash
mysql -u root -p < backend/database/schema.sql
```

**Configurer les variables d'environnement** (créer `backend/.env`):

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=freelancehub

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Twilio (optionnel)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Configuration du Frontend

Créer `frontend/.env.local` :

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Lancer l'application

### Mode Développement (Backend + Frontend)

```bash
npm run dev
```

Cela va lancer en parallèle :
- **Backend** → http://localhost:5000
- **Frontend** → http://localhost:5173

### Lancer séparément

```bash
# Terminal 1 - Backend uniquement
npm run dev:backend

# Terminal 2 - Frontend uniquement
npm run dev:frontend
```

### Mode Production

```bash
# Construire le frontend
npm run build

# Déployer et lancer le backend
npm run start --prefix backend
```

## 📁 Structure du Projet

```
freelancehub/
├── backend/                    # API Node.js/Express
│   ├── config/                # Configuration (DB, email, etc.)
│   ├── middleware/            # Middlewares (auth, CORS, etc.)
│   ├── routes/                # Routes API
│   │   ├── auth.js           # Authentification
│   │   ├── services.js       # Gestion des services
│   │   ├── orders.js         # Gestion des commandes
│   │   ├── messages.js       # Messagerie
│   │   ├── reviews.js        # Évaluations
│   │   └── admin.js          # Panel admin
│   ├── database/              # Scripts SQL
│   ├── uploads/               # Fichiers uploadés
│   ├── server.js              # Point d'entrée backend
│   └── package.json
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── assets/           # Ressources statiques
│   │   │   ├── images/       # Images et logos
│   │   │   └── icons/        # Icônes SVG/PNG
│   │   ├── components/       # Composants réutilisables
│   │   ├── config/           # Configuration centralisée
│   │   │   ├── api.js        # Instance axios + intercepteurs
│   │   │   └── constants.js  # Constantes globales
│   │   ├── hooks/            # Hooks React personnalisés
│   │   │   ├── useAuth.js   # Gestion authentification
│   │   │   ├── useFetch.js  # Requêtes API
│   │   │   └── index.js     # Exporte centralisé
│   │   ├── pages/            # Pages principales
│   │   ├── services/         # Logique métier & API
│   │   │   ├── authService.js      # Authentification
│   │   │   ├── serviceService.js   # Gestion des services
│   │   │   ├── orderService.js     # Commandes
│   │   │   ├── messageService.js   # Messagerie
│   │   │   ├── reviewService.js    # Avis
│   │   │   └── index.js            # Exporte centralisé
│   │   ├── store/            # État global (Zustand)
│   │   ├── styles/           # Styles globaux
│   │   ├── utils/            # Helpers et utilitaires
│   │   ├── App.jsx           # Composant racine
│   │   ├── main.jsx          # Entrée React
│   │   └── STRUCTURE.md      # Guide de la structure
│   ├── MIGRATION.md          # Guide de migration
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── api/                        # Configuration API (Vercel)
├── package.json               # Root package.json
└── README.md                  # Ce fichier
```

## 📚 Pages Principales

### Frontend Routes
- `/` - Accueil
- `/login` - Connexion
- `/register` - Inscription
- `/verify-email` - Vérification d'email
- `/forgot-password` - Récupération mot de passe
- `/dashboard` - Tableau de bord utilisateur
- `/profile` - Profil utilisateur
- `/services` - Liste des services
- `/services/:id` - Détail d'un service
- `/create-service` - Créer un service
- `/messages` - Messagerie
- `/orders` - Mes commandes
- `/admin` - Panel admin (admin uniquement)

### API Endpoints
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/services` - Liste des services
- `POST /api/services` - Créer un service
- `GET /api/orders` - Mes commandes
- `POST /api/messages` - Envoyer un message
- `POST /api/reviews` - Créer un avis

## 🪝 Hooks et Services Frontend

### Hooks React disponibles

```javascript
import { useAuth, useFetch } from '@/hooks'

// 🔐 useAuth - Gestion de l'authentification
const { user, isLoggedIn, logout, hasRole } = useAuth()

// 📡 useFetch - Requêtes API avec gestion d'état
const { data, loading, error, refetch } = useFetch('/api/services')
```

### Services API disponibles

```javascript
import { 
  authService, 
  serviceService, 
  orderService, 
  messageService, 
  reviewService 
} from '@/services'

// 🔐 Authentication
await authService.login(email, password)
await authService.register(userData)
await authService.verifyEmail(token)

// 💼 Services
await serviceService.getServices(filters)
await serviceService.createService(data)
await serviceService.updateService(id, data)

// 📦 Orders
await orderService.createOrder(data)
await orderService.getOrders(filters)
await orderService.updateOrderStatus(id, status)

// 💬 Messages
await messageService.getConversations()
await messageService.sendMessage(conversationId, data)

// ⭐ Reviews
await reviewService.createReview(data)
await reviewService.getReviewsByFreelancer(freelancerId)
```

### Configuration et Constantes

```javascript
import { 
  API_URL, 
  ORDER_STATUS, 
  SERVICE_CATEGORIES, 
  USER_ROLES 
} from '@/config'

const baseUrl = API_URL
const status = ORDER_STATUS.en_cours.label
const roles = USER_ROLES.FREELANCER
const categories = SERVICE_CATEGORIES
```

## 🔐 Sécurité

- ✅ Authentification JWT sécurisée
- ✅ Mots de passe hashés avec bcryptjs
- ✅ CORS configuré pour le frontend uniquement
- ✅ Validation des entrées utilisateur
- ✅ Protection CSRF
- ✅ Upload de fichiers sécurisé

## 🐛 Développement & Débogage

### Scripts utiles

```bash
# Installer toutes les dépendances
npm run install:all

# Lancer le dev avec hot-reload
npm run dev

# Tuer le port 5000 (si occupé)
npm run kill

# Build pour production
npm run build
```

### Logs Debug
Le backend affiche des logs détaillés en mode développement. Vérifiez la console pour les erreurs de connexion BD ou de configuration.

## 📄 Licences & Crédits

- **Licence**: MIT
- **Créateur**: Votre Équipe
- **Version**: 1.0.0

## 📖 Documentation Supplémentaire

- **[STRUCTURE.md](frontend/src/STRUCTURE.md)** - Guide détaillé de la structure du frontend
- **[MIGRATION.md](frontend/MIGRATION.md)** - Guide de migration et principes de la nouvelle architecture
- **[GITHUB_USER_STORIES.md](GITHUB_USER_STORIES.md)** - User Stories et Milestones
- **[KANBAN_GUIDE.md](KANBAN_GUIDE.md)** - Guide du Kanban GitHub

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour modifier le projet :

1. Forker le repository
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request


**Prêt à démarrer?** ➡️ [Suivez l'installation](#installation) et lancez `npm run dev` ! 🎉