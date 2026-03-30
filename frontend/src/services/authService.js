import axiosInstance, { API_URL } from '../config/api'

/**
 * Services d'authentification
 */
const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Connexion utilisateur
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Vérifier l'email
   */
  verifyEmail: async (token) => {
    try {
      const response = await axiosInstance.post('/auth/verify-email', { token })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Demander un reset de mot de passe
   */
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Réinitialiser le mot de passe
   */
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword
      })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/profile')
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Mettre à jour le profil
   */
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/auth/profile', profileData)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default authService
