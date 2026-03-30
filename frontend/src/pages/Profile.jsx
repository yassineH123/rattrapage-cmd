import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Loading } from '../components/Loading'

export default function Profile() {
  const { user } = useAuthStore()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const { alerts, showAlert } = useAlerts()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await api.get('/users/profile')
      setProfile(response)
      setFormData(response)
    } catch (err) {
      showAlert('Erreur chargement profil', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      await api.put('/users/profile', formData)
      setProfile(formData)
      setEditMode(false)
      showAlert('Profil mis à jour', 'success')
    } catch (err) {
      showAlert('Erreur mise à jour profil', 'danger')
    }
  }

  if (loading) return <Loading />

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px'
        }}>
          <h1 className="section-title">Mon Profil</h1>
          <button
            className="btn btn-outline"
            onClick={() => {
              setEditMode(!editMode)
              if (editMode) setFormData(profile)
            }}
          >
            {editMode ? '✕ Annuler' : '✏️ Éditer'}
          </button>
        </div>

        {alerts.map(alert => (
          <Alert key={alert.id} message={alert.message} type={alert.type} />
        ))}

        {profile && (
          <div className="card" style={{ padding: '24px' }}>
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '32px',
              marginBottom: '20px'
            }}>
              {(profile.nom || '?')[0].toUpperCase()}
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Nom
                </label>
                {editMode ? (
                  <input
                    className="input"
                    name="nom"
                    value={formData.nom || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <p style={{ color: 'var(--muted)' }}>{profile.nom}</p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                  Email
                </label>
                <p style={{ color: 'var(--muted)' }}>{profile.email}</p>
              </div>

              {user?.role === 'freelancer' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                      Bio
                    </label>
                    {editMode ? (
                      <textarea
                        className="input"
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        rows={4}
                      />
                    ) : (
                      <p style={{ color: 'var(--muted)' }}>{profile.bio || 'Aucune bio'}</p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                      Spécialités
                    </label>
                    {editMode ? (
                      <input
                        className="input"
                        name="specialites"
                        placeholder="Séparées par des virgules"
                        value={formData.specialites || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      <p style={{ color: 'var(--muted)' }}>{profile.specialites || 'Non renseignées'}</p>
                    )}
                  </div>
                </>
              )}

              {editMode && (
                <button
                  className="btn btn-primary btn-full"
                  onClick={handleSave}
                >
                  Enregistrer les modifications
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
