import axiosInstance from '../config/api'

/**
 * Services pour gérer les avis et évaluations
 */
const reviewService = {
  /**
   * Créer un nouvel avis
   */
  createReview: async (reviewData) => {
    try {
      const response = await axiosInstance.post('/reviews', reviewData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir les avis d'un freelancer
   */
  getReviewsByFreelancer: async (freelancerId, page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/reviews/freelancer/${freelancerId}?page=${page}&limit=${limit}`
      )
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir les avis reçus par l'utilisateur connecté
   */
  getMyReviews: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/reviews/my-reviews?page=${page}&limit=${limit}`
      )
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Mettre à jour un avis
   */
  updateReview: async (id, reviewData) => {
    try {
      const response = await axiosInstance.put(`/reviews/${id}`, reviewData)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Supprimer un avis
   */
  deleteReview: async (id) => {
    try {
      const response = await axiosInstance.delete(`/reviews/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Obtenir la note moyenne d'un freelancer
   */
  getAverageRating: async (freelancerId) => {
    try {
      const response = await axiosInstance.get(
        `/reviews/freelancer/${freelancerId}/rating`
      )
      return response
    } catch (error) {
      throw error
    }
  }
}

export default reviewService
