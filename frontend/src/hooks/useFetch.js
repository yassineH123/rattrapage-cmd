import { useState, useEffect } from 'react'
import axiosInstance from '../config/api'

/**
 * Hook personnalisé pour les requêtes API avec gestion d'erreurs et loading
 * @param {string} url - Endpoint API
 * @param {Object} options - Options additionnelles (method, data, etc.)
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const config = {
        url,
        method: options.method || 'GET',
        ...options
      }

      const response = await axiosInstance(config)
      setData(response)
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}
