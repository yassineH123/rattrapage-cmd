// Réexporter les constantes depuis le dossier config
export * from '../config/constants'

// Legacy support - Transformer les anciennes constantes au nouveau format
export const STATUS = {
  'en_attente': {
    label: 'En attente',
    cls: 'badge-warning'
  },
  'en_cours': {
    label: 'En cours',
    cls: 'badge-info'
  },
  'termine': {
    label: 'Terminée',
    cls: 'badge-success'
  },
  'annulee': {
    label: 'Annulée',
    cls: 'badge-danger'
  }
}

export const CATEGORIES = [
  'Design',
  'Développement',
  'Marketing',
  'Rédaction',
  'Vidéo',
  'Traduction'
]

export const getStatusLabel = (status) => {
  return STATUS[status]?.label || status
}

export const getStatusClass = (status) => {
  return STATUS[status]?.cls || 'badge-muted'
}
