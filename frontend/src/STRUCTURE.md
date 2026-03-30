/**
 * 📁 NOUVELLE STRUCTURE FRONTEND
 * 
 * Cette nouvelle organisation améliore la maintenabilité et la scalabilité du projet.
 * 
 * =====================================
 * GUIDE DE MIGRATION & UTILISATION
 * =====================================
 * 
 * 1. FICHIERS DÉPLACÉS
 * ====================
 * 
 * ✓ utils/api.js → config/api.js
 *   - Configuration et intercepteurs axios
 * 
 * ✓ utils/constants.js → config/constants.js
 *   - Constantes globales réexportées depuis utils/constants.js
 * 
 * 
 * 2. NOUVEAUX DOSSIERS
 * ====================
 * 
 * 📦 /hooks
 *    ├── useAuth.js       - Hook pour l'authentification
 *    ├── useFetch.js      - Hook pour les requêtes API
 *    └── index.js         - Exporte tous les hooks
 * 
 * 📦 /services
 *    ├── authService.js   - API d'authentification
 *    ├── serviceService.js - Gestion des services
 *    ├── orderService.js  - Gestion des commandes
 *    ├── messageService.js - Messagerie
 *    ├── reviewService.js - Évaluations
 *    └── index.js         - Exporte tous les services
 * 
 * 📦 /config
 *    ├── api.js           - Configuration axios + intercepteurs
 *    └── constants.js     - Constantes globales
 * 
 * 📦 /assets
 *    ├── images/          - Images (logo, bannières, etc.)
 *    └── icons/           - Icônes SVG/PNG
 * 
 * 
 * 3. EXEMPLES D'UTILISATION
 * ==========================
 * 
 * ⚡ Utiliser un hook:
 * ────────────────────
 * 
 *   import { useAuth, useFetch } from '@/hooks'
 *   
 *   function MyComponent() {
 *     const { user, isLoggedIn, logout } = useAuth()
 *     const { data, loading, error } = useFetch('/api/services')
 *     
 *     return <>...</>
 *   }
 * 
 * 
 * ⚡ Utiliser un service:
 * ─────────────────────
 * 
 *   import { authService, serviceService } from '@/services'
 *   
 *   async function handleLogin() {
 *     try {
 *       const response = await authService.login(email, password)
 *       // Handle success
 *     } catch (error) {
 *       // Handle error
 *     }
 *   }
 * 
 * 
 * ⚡ Utiliser une constante:
 * ──────────────────────────
 * 
 *   import { ORDER_STATUS, SERVICE_CATEGORIES, USER_ROLES } from '@/config/constants'
 *   
 *   const status = ORDER_STATUS.en_cours.label // "En cours"
 *   const categories = SERVICE_CATEGORIES // Array de catégories
 * 
 * 
 * 4. COMPATIBILITÉ RÉTROACTIVE
 * ============================
 * 
 * Les anciens imports fonctionneront toujours:
 * 
 *   ✓ import { API_URL } from '@/utils/api'
 *   ✓ import { CATEGORIES } from '@/utils/constants'
 * 
 * Car utils/api.js et utils/constants.js réexportent depuis /config
 * 
 * 
 * 5. BONNES PRATIQUES
 * ===================
 * 
 * ✓ Placez la logique métier dans /services
 * ✓ Créez des hooks React pour la logique réutilisable
 * ✓ Stockez configurations et constantes dans /config
 * ✓ Gardez /utils pour les helpers "purs" (fonctions utilitaires)
 * ✓ Organisez les images dans /assets/images
 * ✓ Stockez les icônes dans /assets/icons
 * 
 * 
 * 6. PROCHAINES ÉTAPES
 * ====================
 * 
 * - Ajouter des services pour Admin si nécessaire
 * - Créer des hooks additionnels (useForm, useLocalStorage, etc.)
 * - Ajouter des types TypeScript (optional)
 * - Documenter les endpoints API utilisés
 * 
 */

export const README = {
  version: '1.0.0',
  description: 'Structure frontend optimisée pour FreelanceHub',
  lastUpdated: new Date().toISOString()
}
