import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Navbar } from '../components/Navbar'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: '', 
    role: 'client'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { alerts, showAlert } = useAlerts()
  const { setSession } = useAuthStore()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!formData.nom || !formData.email || !formData.password) {
      showAlert('Veuillez remplir tous les champs', 'danger')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert('Les mots de passe ne correspondent pas', 'danger')
      return
    }

    if (formData.password.length < 6) {
      showAlert('Le mot de passe doit contenir au moins 6 caractères', 'danger')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/register', {
        nom: formData.nom,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      showAlert('Inscription réussie! Vérifiez votre email pour continuer', 'success')
      // Redirige vers la vérification email avec l'userId
      setTimeout(() => navigate(`/verify?userId=${response.userId}`), 1500)
    } catch (err) {
      showAlert(err?.message || 'Erreur lors de l\'inscription', 'danger')
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
          background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark2) 100%)',
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
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
            <h2 style={{
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '14px',
              fontFamily: "'Syne', sans-serif"
            }}>
              Rejoignez<br />
              <span style={{ color: 'var(--primary)' }}>FreelanceHub</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,.55)',
              fontSize: '15px',
              maxWidth: '300px',
              lineHeight: 1.7,
              margin: '0 auto'
            }}>
              Trouvez des opportunités ou des talents pour vos projets. C'est gratuit et facile à commencer.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          overflowY: 'auto'
        }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '6px', fontFamily: "'Syne', sans-serif" }}>
              S'inscrire
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
              Vous avez déjà un compte ?{' '}
              <button onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Se connecter
              </button>
            </p>

            {alerts.map(alert => (
              <Alert key={alert.id} message={alert.message} type={alert.type} />
            ))}

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Nom complet
                </label>
                <input
                  className="input"
                  type="text"
                  name="nom"
                  placeholder="Votre nom complet"
                  value={formData.nom}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Rôle
                </label>
                <select
                  className="input"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="client">Je cherche des freelancers</option>
                  <option value="freelancer">Je suis freelancer</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Mot de passe
                </label>
                <div className="input-group">
                  <input
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Confirmer mot de passe
                </label>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Inscription...
                  </>
                ) : (
                  'S\'inscrire →'
                )}
              </button>

              <p style={{
                fontSize: '12px',
                color: 'var(--muted)',
                marginTop: '16px',
                textAlign: 'center',
                lineHeight: 1.5
              }}>
                En s'inscrivant, vous acceptez nos<br />
                <a href="#" style={{ color: 'var(--primary)' }}>conditions d'utilisation</a> et{' '}
                <a href="#" style={{ color: 'var(--primary)' }}>politique de confidentialité</a>
              </p>
            </form>
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
