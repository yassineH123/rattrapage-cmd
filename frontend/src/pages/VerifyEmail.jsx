import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Navbar } from '../components/Navbar'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { alerts, showAlert } = useAlerts()
  const userId = searchParams.get('userId')

  useEffect(() => {
    if (!userId) {
      showAlert('Erreur: userId manquant', 'danger')
      setTimeout(() => navigate('/register'), 2000)
    }
  }, [userId, navigate, showAlert])

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!code) {
      showAlert('Veuillez entrer le code', 'danger')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/verify', { userId, code })
      showAlert('✅ Email vérifié avec succès! Connectez-vous maintenant', 'success')
      // Redirection vers login après vérification
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      showAlert(err?.message || 'Code invalide', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '40px 20px'
      }}>
        <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✉️</div>
          <h1 style={{
            fontSize: '30px',
            marginBottom: '6px',
            fontFamily: "'Syne', sans-serif"
          }}>
            Vérifiez votre email
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: '14px',
            marginBottom: '28px'
          }}>
            Nous avons envoyé un code de vérification à votre adresse email
          </p>

          {alerts.map(alert => (
            <Alert key={alert.id} message={alert.message} type={alert.type} />
          ))}

          <form onSubmit={handleVerify}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                Code de vérification
              </label>
              <input
                className="input"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                maxLength="6"
                style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? 'Vérification...' : 'Vérifier mon email'}
            </button>
          </form>

          <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--muted)' }}>
            Vous n'avez pas reçu le code ?{' '}
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Renvoyer
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
