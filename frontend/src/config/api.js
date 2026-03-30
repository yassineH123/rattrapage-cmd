import axios from 'axios'

// Déterminer l'URL de base
const isLocalDev = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname.includes('192.168')

export const API_URL = isLocalDev ? 'http://localhost:5000/api' : '/api'
// Use relative paths in dev so Vite proxy handles them
export const BASE_URL = ''

// Créer une instance axios
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Intercepteur pour ajouter le token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour gérer les erreurs de réponse
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}:`, response.data)
    return response.data
  },
  (error) => {
    // Rediriger vers login si unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    console.error(
      `❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
      error.response?.status,
      error.response?.data
    )
    return Promise.reject(error.response?.data || error)
  }
)

export default axiosInstance
