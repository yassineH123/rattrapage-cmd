// Réexporter depuis la nouvelle structure de config
export { 
  API_URL, 
  BASE_URL, 
  default as axiosInstance 
} from '../config/api'

// Pour compatibilité rétroactive, créer un objet api
import axiosInstance from '../config/api'

export const api = {
  get: (endpoint) => axiosInstance.get(endpoint),
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
  'put': (endpoint, data) => axiosInstance.put(endpoint, data),
  'delete': (endpoint) => axiosInstance.delete(endpoint),
  patch: (endpoint, data) => axiosInstance.patch(endpoint, data),
  upload: (endpoint, formData) => axiosInstance.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

export default api
