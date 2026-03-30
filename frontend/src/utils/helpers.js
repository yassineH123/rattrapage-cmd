export const starsHTML = (note) => {
  const n = Math.round(parseFloat(note) || 0)
  const stars = '★'.repeat(n) + '☆'.repeat(5 - n)
  return stars
}

export const avatarHTML = (nom, size = 36) => {
  const letter = (nom || '?')[0].toUpperCase()
  return letter
}

export const formatDate = (d) => {
  return new Date(d).toLocaleDateString('fr-FR', { 
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export const truncate = (str, length = 100) => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

/**
 * Formater une devise (MAD par défaut)
 */
export const formatCurrency = (amount, currency = 'MAD') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency
  }).format(amount)
}

/**
 * Générer les initiales d'un nom
 */
export const getInitials = (firstName, lastName) => {
  return ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase()
}

/**
 * Valider un email
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valider un mot de passe
 */
export const isValidPassword = (password) => {
  return password.length >= 8
}

/**
 * Capitaliser la première lettre
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Slugifier un texte
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Délai (utile pour debouncing, etc.)
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
