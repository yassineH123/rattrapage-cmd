import axiosInstance from '../config/api'

/**
 * Services pour gérer la messagerie
 */
const messageService = {
  /**
   * Obtenir les conversations
   */
  getConversations: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await axiosInstance.get(`/messages/conversations${params ? `?${params}` : ''}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir les messages d'une conversation
   */
  getMessages: async (conversationId) => {
    try {
      const response = await axiosInstance.get(`/messages/conversations/${conversationId}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Envoyer un message
   */
  sendMessage: async (conversationId, messageData) => {
    try {
      const response = await axiosInstance.post(
        `/messages/conversations/${conversationId}`,
        messageData
      )
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Démarrer une nouvelle conversation
   */
  startConversation: async (userId) => {
    try {
      const response = await axiosInstance.post('/messages/conversations', {
        participantId: userId
      })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Marquer une conversation comme lue
   */
  markAsRead: async (conversationId) => {
    try {
      const response = await axiosInstance.put(
        `/messages/conversations/${conversationId}/read`
      )
      return response
    } catch (error) {
      throw error
    }
  }
}

export default messageService
