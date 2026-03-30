# FreelanceHub - React Frontend

Ce projet a été converti de **HTML/CSS/JavaScript Vanilla** à **React**.

## 📂 Structure du projet

```
src/
├── assets/             # Ressources (images, icons)
│   ├── images/         # Images et logos
│   └── icons/          # Icônes SVG/PNG
├── components/         # Composants réutilisables (Navbar, Footer, etc)
├── config/             # Configuration centralisée
│   ├── api.js          # Instance axios + intercepteurs
│   └── constants.js    # Constantes globales
├── hooks/              # Hooks React personnalisés
│   ├── useAuth.js     # Gestion authentification
│   ├── useFetch.js    # Requêtes API
│   └── index.js       # Exporte centralisé
├── pages/              # Pages principales (Home, Dashboard, Services, etc)
├── services/           # Logique métier & appels API
│   ├── authService.js         # Authentification
│   ├── serviceService.js      # Gestion des services
│   ├── orderService.js        # Commandes
│   ├── messageService.js      # Messagerie
│   ├── reviewService.js       # Avis
│   └── index.js               # Exporte centralisé
├── store/              # État global avec Zustand (authStore)
├── utils/              # Helpers et utilitaires
├── styles/             # CSS global
├── STRUCTURE.md        # Guide détaillé de la structure
├── MIGRATION.md        # Guide de migration
└── main.jsx            # Point d'entrée
```

## 🚀 Installation & Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000 dans le navigateur
```

## 📝 Pages disponibles

- **/** - Page d'accueil
- **/login** - Connexion
- **/register** - Inscription
- **/forgot-password** - Réinitialiser mot de passe
- **/verify** - Vérifier email
- **/services** - Liste des services
- **/service/:id** - Détail d'un service
- **/dashboard** - Dashboard utilisateur (protégé)
- **/create-service** - Créer un service (freelancer uniquement)
- **/profile** - Profil utilisateur (protégé)
- **/messages** - Messages (protégé)
- **/admin** - Administration (admin uniquement)

## 🔑 Fonctionnalités principales

✅ Authentification (Login/Register)
✅ Gestion des services (affichage, création, suppression)
✅ Système de commandes
✅ Dashboard avec statistiques
✅ Profil utilisateur
✅ Système de messaging
✅ Panel administrateur
✅ Responsive design
✅ Protected routes

## 🛠️ Technologies utilisées

- **React 19** - Framework UI
- **React Router v7** - Routing
- **Zustand** - État global (state management)
- **Axios** - Requêtes HTTP avec intercepteurs
- **Vite** - Build tool ultra-rapide
- **CSS Custom Properties** - Styling moderne
- **Socket.IO** (client) - Communication temps réel

## 📡 Configuration API

L'API REST est configurée dans `src/config/api.js`:
- URL locale: `http://localhost:5000/api`
- URL production: `/api`

Les requêtes incluent automatiquement le JWT token depuis `localStorage`.

**Utilisation:**
```javascript
import axiosInstance from '@/config/api'

const response = await axiosInstance.get('/services')
```

## 🪝 Hooks React

Des hooks réutilisables sont disponibles dans `src/hooks/`:

### useAuth
Gestion de l'authentification et des rôles utilisateur:
```javascript
import { useAuth } from '@/hooks'

function MyComponent() {
  const { user, isLoggedIn, logout, isAdmin, isFreelancer } = useAuth()
  return <>...</>
}
```

### useFetch
Hook pour les requêtes API avec gestion d'état:
```javascript
import { useFetch } from '@/hooks'

function ServicesList() {
  const { data, loading, error, refetch } = useFetch('/services')
  return <>...</>
}
```

## 🛠️ Services API

Les services métier sont organisés dans `src/services/`:

### authService
```javascript
import { authService } from '@/services'

await authService.login(email, password)
await authService.register(userData)
await authService.verifyEmail(token)
await authService.updateProfile(profileData)
```

### serviceService
```javascript
import { serviceService } from '@/services'

await serviceService.getServices(filters)
await serviceService.getServiceById(id)
await serviceService.createService(data)
await serviceService.updateService(id, data)
```

### orderService
```javascript
import { orderService } from '@/services'

await orderService.createOrder(data)
await orderService.getOrders(filters)
await orderService.updateOrderStatus(id, status)
```

### messageService
```javascript
import { messageService } from '@/services'

await messageService.getConversations()
await messageService.sendMessage(conversationId, data)
await messageService.startConversation(userId)
```

### reviewService
```javascript
import { reviewService } from '@/services'

await reviewService.createReview(data)
await reviewService.getReviewsByFreelancer(freelancerId)
await reviewService.getMyReviews()
```

## ⚙️ Constantes Globales

Les constantes sont centralisées dans `src/config/constants.js`:

```javascript
import { 
  ORDER_STATUS, 
  SERVICE_CATEGORIES,
  USER_ROLES,
  VALIDATION 
} from '@/config'

const status = ORDER_STATUS.en_cours.label // "En cours"
const categories = SERVICE_CATEGORIES // Array
const adminRole = USER_ROLES.ADMIN
const emailRegex = VALIDATION.EMAIL_REGEX
```

## 📡 Configuration API (ANCIENNE - Toujours valide)

## 🔐 Authentification

L'authentification est gérée par `useAuthStore` (Zustand):
- Token stocké en `localStorage`
- Utilisateur stocké en `localStorage`
- Auto-redirect vers `/login` si 401
- Routes protégées avec `<ProtectedRoute>`

**Utilisation avec le hook:**
```javascript
import { useAuth } from '@/hooks'

function MyComponent() {
  const { user, isLoggedIn, logout } = useAuth()
  
  if (!isLoggedIn) return <div>Non connecté</div>
  
  return <>Connecté en tant que {user.name}</>
}
```

## 🎨 Styling

Tous les styles utilisent les variables CSS définies dans `src/styles/index.css`:
- Couleurs: `--primary`, `--danger`, `--success`, etc.
- Radii: `--radius-sm`, `--radius`, `--radius-lg`, `--radius-xl`
- Shadows: `--shadow-sm`, `--shadow`, `--shadow-lg`

## ✨ Bonnes pratiques

### 1. Utiliser les Hooks
Préférez les hooks personnalisés à la logique inline:
```javascript
// ✅ BON
const { user, isLoggedIn } = useAuth()

// ❌ MAUVAIS
const user = useAuthStore((state) => state.user)
```

### 2. Utiliser les Services
Centralisez la logique métier dans les services:
```javascript
// ✅ BON
const data = await serviceService.getServices()

// ❌ MAUVAIS
const data = await axiosInstance.get('/services')
```

### 3. Importer depuis les sources primaires
```javascript
// ✅ BON - Imports depuis les sources primaires
import { useAuth } from '@/hooks'
import { authService } from '@/services'
import { ORDER_STATUS } from '@/config'

// ⚠️ OK - Imports depuis les wrappers (legacy)
import { API_URL } from '@/utils/api'
```

### 4. Créer des hooks réutilisables
Si vous avez de la logique répétée, créez un hook:
```javascript
// src/hooks/useServices.js
export const useServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    serviceService.getServices().then(setServices).finally(() => setLoading(false))
  }, [])
  
  return { services, loading }
}
```

## 📚 Documentation Supplémentaire

- **[STRUCTURE.md](STRUCTURE.md)** - Guide détaillé de la structure du frontend
- **[MIGRATION.md](MIGRATION.md)** - Guide de migration à la nouvelle architecture
- **[../README.md](../README.md)** - README principal du projet

## 📦 Build pour production

```bash
npm run build
npm run preview
```

Les fichiers générés seront dans le dossier `dist/`.

## 🐛 Débogage

Ouvrez la console du navigateur pour voir:
- Logs des requêtes API (`📤`, `✅`, `❌`)
- Erreurs d'authentification
- Statuts des API

**Notes:**
- Les requêtes sont loggées avec des emojis pour une meilleure lisibilité
- Les erreurs 401 redirigent automatiquement vers `/login`
- Tous les intercepteurs Axios sont configurés dans `src/config/api.js`

## 🚀 Architecture Moderne

Cette architecture suit les meilleures pratiques React:
- ✅ **Hooks personnalisés** pour la logique réutilisable
- ✅ **Services** pour la logique métier séparée
- ✅ **Configuration centralisée** pour les constantes
- ✅ **Zustand** pour l'état global léger
- ✅ **Axios** avec intercepteurs pour les requêtes
- ✅ **Routes protégées** pour la sécurité
- ✅ **Code organisé et scalable**

**Note:** Les requêtes HTML/CSS/JS Vanilla originales ont été 100% converties en React. Toute la fonctionnalité est préservée et le design est identique.
