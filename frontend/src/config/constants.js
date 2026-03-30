// ============================================
// STATUTS DES COMMANDES
// ============================================
export const ORDER_STATUS = {
  en_attente: {
    label: 'En attente',
    color: 'warning',
    badge: 'badge-warning'
  },
  en_cours: {
    label: 'En cours',
    color: 'info',
    badge: 'badge-info'
  },
  termine: {
    label: 'Terminée',
    color: 'success',
    badge: 'badge-success'
  },
  annulee: {
    label: 'Annulée',
    color: 'danger',
    badge: 'badge-danger'
  }
}

// ============================================
// CATÉGORIES DE SERVICES
// ============================================
export const SERVICE_CATEGORIES = [
  'Design',
  'Développement',
  'Marketing',
  'Rédaction',
  'Vidéo',
  'Traduction',
  'Consulting',
  'Autre'
]

// ============================================
// RÔLES UTILISATEUR
// ============================================
export const USER_ROLES = {
  CLIENT: 'client',
  FREELANCER: 'freelancer',
  ADMIN: 'admin'
}

// ============================================
// NIVEAUX DE COMPÉTENCE
// ============================================
export const SKILL_LEVELS = {
  JUNIOR: 'junior',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert'
}

// ============================================
// RÈGLES DE VALIDATION
// ============================================
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[0-9]{10,}$/,
  URL_REGEX: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
}

// ============================================
// MESSAGES D'ERREUR
// ============================================
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur réseau. Vérifiez votre connexion.',
  UNAUTHORIZED: 'Authentification requise. Veuillez vous connecter.',
  FORBIDDEN: 'Vous n\'avez pas l\'accès à cette ressource.',
  NOT_FOUND: 'Ressource non trouvée.',
  VALIDATION_ERROR: 'Les données envoyées ne sont pas valides.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNKNOWN_ERROR: 'Une erreur inconnue s\'est produite.'
}

// ============================================
// MESSAGES DE SUCCÈS
// ============================================
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie!',
  REGISTER_SUCCESS: 'Inscription réussie! Vérifiez votre email.',
  SERVICE_CREATED: 'Service créé avec succès!',
  SERVICE_UPDATED: 'Service mis à jour avec succès!',
  SERVICE_DELETED: 'Service supprimé avec succès!',
  ORDER_CREATED: 'Commande créée avec succès!',
  REVIEW_CREATED: 'Avis ajouté avec succès!'
}

// ============================================
// PAGINATION
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_SORT: '-createdAt'
}

// ============================================
// TIMEOUTS
// ============================================
export const TIMEOUTS = {
  TOAST_DURATION: 3000, // 3 secondes
  MODAL_DELAY: 200, // 200ms
  API_TIMEOUT: 10000 // 10 secondes
}
