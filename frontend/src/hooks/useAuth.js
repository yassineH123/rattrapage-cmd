import { useAuthStore } from '../store/authStore'

/**
 * Hook pour gérer l'authentification
 * @returns {Object} - Fonctions et état d'authentification
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const setSession = useAuthStore((state) => state.setSession)
  const logout = useAuthStore((state) => state.logout)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const hasRole = useAuthStore((state) => state.hasRole)

  return {
    user,
    token,
    setSession,
    logout,
    isLoggedIn: isLoggedIn(),
    hasRole,
    isAdmin: hasRole('admin'),
    isFreelancer: hasRole('freelancer'),
    isClient: hasRole('client'),
  }
}
