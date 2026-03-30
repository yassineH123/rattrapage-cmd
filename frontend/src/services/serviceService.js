import axiosInstance from '../config/api'

/**
 * Services pour gérer les services (offres)
 */
const serviceService = {
  /**
   * Obtenir tous les services
   */
  getServices: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await axiosInstance.get(`/services${params ? `?${params}` : ''}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir un service par ID
   */
  getServiceById: async (id) => {
    try {
      const response = await axiosInstance.get(`/services/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Créer un nouvel service
   */
  createService: async (serviceData) => {
    try {
      const response = await axiosInstance.post('/services', serviceData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Mettre à jour un service
   */
  updateService: async (id, serviceData) => {
    try {
      const response = await axiosInstance.put(`/services/${id}`, serviceData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Supprimer un service
   */
  deleteService: async (id) => {
    try {
      const response = await axiosInstance.delete(`/services/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir les services de l'utilisateur connecté
   */
  getUserServices: async () => {
    try {
      const response = await axiosInstance.get('/services/user/my-services')
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Rechercher des services
   */
  searchServices: async (query, filters = {}) => {
    try {
      const params = {
        q: query,
        ...filters
      }
      const queryString = new URLSearchParams(params).toString()
      const response = await axiosInstance.get(`/services/search?${queryString}`)
      return response
    } catch (error) {
      throw error
    }
  }
}

export default serviceService
