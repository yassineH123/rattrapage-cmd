import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmail from './pages/VerifyEmail'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Dashboard from './pages/Dashboard'
import CreateService from './pages/CreateService'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Admin from './pages/Admin'

function LayoutWithNavbar({ currentPage }) {
  return (
    <>
      <Navbar activePage={currentPage} />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          {/* Auth pages without navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyEmail />} />

          {/* Pages with navbar */}
          <Route element={<LayoutWithNavbar currentPage="home" />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="services" />}>
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="dashboard" />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="create" />}>
            <Route
              path="/create-service"
              element={
                <ProtectedRoute requiredRole="freelancer">
                  <CreateService />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="profile" />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="messages" />}>
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<LayoutWithNavbar currentPage="admin" />}>
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
