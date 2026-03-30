import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function ProtectedRoute({ children, requiredRole = null }) {
  const navigate = useNavigate()
  const { user, token } = useAuthStore()
  const isLoggedIn = !!token

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    if (requiredRole && user?.role !== requiredRole) {
      navigate('/')
    }
  }, [isLoggedIn, user, requiredRole, navigate])

  if (!isLoggedIn) {
    return null
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return children
}
