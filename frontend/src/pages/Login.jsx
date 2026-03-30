import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Navbar } from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { alerts, showAlert } = useAlerts()
  const { setSession } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      showAlert('Veuillez remplir tous les champs', 'danger')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/login', { email, password })
      setSession(response.token, response.user)
      // Attendre un peu pour que le store se mette à jour
      setTimeout(() => {
        navigate('/dashboard')
      }, 100)
    } catch (err) {
      // Si le compte n'est pas vérifié
      if (err?.needsVerification) {
        showAlert('Compte non vérifié. Veuillez vérifier votre email pour continuer.', 'warning')
        // Redirection vers vérification
        setTimeout(() => navigate(`/verify?userId=${err?.userId}`), 2000)
      } else {
        showAlert(err?.message || 'Erreur de connexion', 'danger')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 64px)'
      }}>
        {/* Left Decoration */}
        <div style={{
          background: 'var(--dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'rgba(232,93,4,.15)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(232,93,4,.08)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>

          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚀</div>
            <h2 style={{
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '14px',
              fontFamily: "'Syne', sans-serif"
            }}>
              Bienvenue sur<br />
              <span style={{ color: 'var(--primary)' }}>FreelanceHub</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,.55)',
              fontSize: '15px',
              maxWidth: '300px',
              lineHeight: 1.7,
              margin: '0 auto'
            }}>
              La plateforme qui connecte les meilleurs freelancers du Maroc avec des clients ambitieux.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '6px', fontFamily: "'Syne', sans-serif" }}>
              Se connecter
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
              Pas encore de compte ?{' '}
              <button onClick={() => navigate('/register')} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                S'inscrire
              </button>
            </p>

            {alerts.map(alert => (
              <Alert key={alert.id} message={alert.message} type={alert.type} />
            ))}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Adresse email
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Mot de passe
                </label>
                <div className="input-group">
                  <input
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-eye"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <button onClick={() => navigate('/forgot-password')} style={{
                  color: 'var(--primary)',
                  fontSize: '13px',
                  textDecoration: 'underline',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}>
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Connexion...
                  </>
                ) : (
                  'Se connecter →'
                )}
              </button>
            </form>

            {/* Demo Account */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: '10px'
              }}>
                Compte de démo
              </p>
              <p style={{
                fontSize: '12px',
                color: 'var(--muted)',
                fontFamily: 'monospace'
              }}>
                admin@freelancehub.ma / Admin@123
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          main { grid-template-columns: 1fr; }
          main > div:first-child { display: none; }
        }
      `}</style>
    </>
  )
}
