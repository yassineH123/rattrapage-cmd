import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { Loading } from '../components/Loading'
import { Alert, useAlerts } from '../components/Alert'

export default function Admin() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('stats')
  const { alerts, showAlert } = useAlerts()

  useEffect(() => {
    loadData()
  }, [tab])

  const loadData = async () => {
    try {
      if (tab === 'stats') {
        const response = await api.get('/admin/stats')
        setStats({
          totalUsers: response.users || 0,
          totalServices: response.services || 0,
          totalOrders: response.orders || 0,
          totalRevenue: response.revenue || 0
        })
      } else if (tab === 'users') {
        const response = await api.get('/admin/users')
        setUsers(response.users && Array.isArray(response.users) ? response.users : [])
      } else if (tab === 'services') {
        const response = await api.get('/admin/services')
        setServices(response.services && Array.isArray(response.services) ? response.services : [])
      }
    } catch (err) {
      console.error('Erreur admin:', err)
      showAlert('Erreur chargement données admin', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await api.delete(`/admin/users/${userId}`)
        loadData()
        showAlert('Utilisateur supprimé', 'success')
      } catch (err) {
        showAlert('Erreur suppression', 'danger')
      }
    }
  }

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await api.delete(`/admin/services/${serviceId}`)
        loadData()
        showAlert('Service supprimé', 'success')
      } catch (err) {
        showAlert('Erreur suppression', 'danger')
      }
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">Administration</h1>

        {alerts.map(alert => (
          <Alert key={alert.id} message={alert.message} type={alert.type} />
        ))}

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px'
        }}>
          {['stats', 'users', 'services'].map(tabName => (
            <button
              key={tabName}
              onClick={() => {
                setTab(tabName)
                setLoading(true)
              }}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: tab === tabName ? 'var(--primary)' : 'transparent',
                color: tab === tabName ? '#fff' : 'var(--muted)',
                cursor: 'pointer',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              {tabName === 'stats' && '📊 Statistiques'}
              {tabName === 'users' && '👥 Utilisateurs'}
              {tabName === 'services' && '🎯 Services'}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Stats Tab */}
            {tab === 'stats' && stats && (
              <div className="grid-4">
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700 }}>
                    {stats.totalUsers}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                    Utilisateurs
                  </div>
                </div>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700 }}>
                    {stats.totalServices}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                    Services
                  </div>
                </div>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700 }}>
                    {stats.totalOrders}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                    Commandes
                  </div>
                </div>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>💰</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700 }}>
                    {stats.totalRevenue} DH
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                    Chiffre d'affaires
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {tab === 'users' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Nom</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Rôle</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px' }}>{user.nom}</td>
                        <td style={{ padding: '12px', color: 'var(--muted)' }}>{user.email}</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-primary">{user.role}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Services Tab */}
            {tab === 'services' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Titre</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Auteur</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Catégorie</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Prix</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px' }}>{service.titre}</td>
                        <td style={{ padding: '12px', color: 'var(--muted)' }}>{service.freelancer_nom}</td>
                        <td style={{ padding: '12px' }}>{service.categorie}</td>
                        <td style={{ padding: '12px' }}>{service.prix} DH</td>
                        <td style={{ padding: '12px' }}>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
