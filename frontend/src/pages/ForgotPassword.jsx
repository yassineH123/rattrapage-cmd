import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Navbar } from '../components/Navbar'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email') // email, code, password
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [loading, setLoading] = useState(false)
  const { alerts, showAlert } = useAlerts()

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email) {
      showAlert('Veuillez entrer votre email', 'danger')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      showAlert('Code envoyé à votre email', 'success')
      setStep('code')
    } catch (err) {
      showAlert(err?.message || 'Erreur envoi code', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    if (!code) {
      showAlert('Veuillez entrer le code', 'danger')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/verify-reset-code', { email, code })
      setStep('password')
    } catch (err) {
      showAlert(err?.message || 'Code invalide', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!newPassword || !newPassword2) {
      showAlert('Veuillez entrer le nouveau mot de passe', 'danger')
      return
    }

    if (newPassword !== newPassword2) {
      showAlert('Les mots de passe ne correspondent pas', 'danger')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/reset-password', { email, code, newPassword })
      showAlert('Mot de passe réinitialisé avec succès', 'success')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      showAlert(err?.message || 'Erreur réinitialisation', 'danger')
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
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{
            fontSize: '30px',
            marginBottom: '6px',
            fontFamily: "'Syne', sans-serif"
          }}>
            Réinitialiser mot de passe
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: '14px',
            marginBottom: '28px'
          }}>
            Entrez votre email pour recevoir un code de réinitialisation
          </p>

          {alerts.map(alert => (
            <Alert key={alert.id} message={alert.message} type={alert.type} />
          ))}

          {step === 'email' && (
            <form onSubmit={handleSendCode}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Email
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
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? 'Envoi...' : 'Envoyer le code'}
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Code de vérification
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Entrez le code reçu par email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? 'Vérification...' : 'Vérifier le code'}
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Nouveau mot de passe
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Confirmer mot de passe
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
              >
                {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--muted)' }}>
            <button onClick={() => navigate('/login')} style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              Retour à la connexion
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
