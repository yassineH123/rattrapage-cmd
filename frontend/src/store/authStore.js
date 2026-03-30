import { create } from 'zustand'

const getInitialUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

const getInitialToken = () => localStorage.getItem('token')

export const useAuthStore = create((set, get) => ({
  user: getInitialUser(),
  token: getInitialToken(),

  setSession: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },

  isLoggedIn: () => {
    const { token } = get()
    return !!token
  },

  hasRole: (role) => {
    const { user } = get()
    return user?.role === role
  },
}))
