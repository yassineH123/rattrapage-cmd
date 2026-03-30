import axiosInstance from '../config/api'

/**
 * Services pour gérer les commandes
 */
const orderService = {
  /**
   * Créer une nouvelle commande
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/orders', orderData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir toutes les commandes de l'utilisateur
   */
  getOrders: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await axiosInstance.get(`/orders${params ? `?${params}` : ''}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir une commande par ID
   */
  getOrderById: async (id) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Mettre à jour le statut d'une commande
   */
  updateOrderStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/status`, { status })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Annuler une commande
   */
  cancelOrder: async (id, reason) => {
    try {
      const response = await axiosInstance.post(`/orders/${id}/cancel`, { reason })
      return response
    } catch (error) {
      throw error
    }
  }
}

export default orderService
