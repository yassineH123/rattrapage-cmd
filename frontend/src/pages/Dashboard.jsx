import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { Loading } from '../components/Loading'
import { formatDate, starsHTML } from '../utils/helpers'
import { STATUS } from '../utils/constants'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [myServices, setMyServices] = useState([])
  const [loading, setLoading] = useState(true)
  const { alerts, showAlert } = useAlerts()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [ordersData, servicesData] = await Promise.all([
        api.get('/orders'),
        user?.role === 'freelancer' ? api.get('/services/mine') : Promise.resolve([])
      ])
      setOrders(Array.isArray(ordersData) ? ordersData : [])
      setMyServices(Array.isArray(servicesData) ? servicesData : [])
    } catch (err) {
      showAlert('Erreur chargement données', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { statut: newStatus })
      loadData()
      showAlert('Statut mis à jour', 'success')
    } catch (err) {
      showAlert('Erreur mise à jour statut', 'danger')
    }
  }

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await api.delete(`/services/${serviceId}`)
        loadData()
        showAlert('Service supprimé', 'success')
      } catch (err) {
        showAlert('Erreur suppression service', 'danger')
      }
    }
  }

  if (loading) return <Loading />

  const done = orders.filter(o => o.statut === 'termine')
  const ongoing = orders.filter(o => o.statut === 'en_cours')
  const revenue = done.reduce((s, o) => s + Number(o.montant || 0), 0)

  const stats = [
    { n: orders.length, label: 'Total commandes', icon: '📦' },
    { n: ongoing.length, label: 'En cours', icon: '⚙️' },
    { n: done.length, label: 'Terminées', icon: '✅' },
    { n: revenue.toFixed(0) + ' DH', label: user?.role === 'freelancer' ? 'Revenus' : 'Dépenses', icon: '💰' },
  ]

  return (
    <main className="page">
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px'
        }}>
          <div>
            <h1 className="section-title">Dashboard</h1>
            <p className="section-sub">Bonjour, {user?.nom} 👋</p>
          </div>
          {user?.role === 'freelancer' && (
            <button onClick={() => navigate('/create-service')} className="btn btn-primary">
              + Nouveau service
            </button>
          )}
        </div>

        {alerts.map(alert => (
          <Alert key={alert.id} message={alert.message} type={alert.type} />
        ))}

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '36px' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>
                {s.n}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '13px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* My Services (freelancer only) */}
        {user?.role === 'freelancer' && (
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '20px', fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: '16px' }}>
              Mes services
            </h2>

            {myServices.length === 0 ? (
              <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📭</div>
                <p style={{ marginBottom: '14px' }}>Pas encore de service.</p>
                <button onClick={() => navigate('/create-service')} className="btn btn-primary">
                  Créer mon premier service
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myServices.map(s => (
                  <div
                    key={s.id}
                    className="card"
                    style={{
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '10px',
                        background: 'rgba(232,93,4,.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}
                    >
                      {s.image ? (
                        <img src={s.image} alt={s.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        '🎨'
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <button onClick={() => navigate(`/service/${s.id}`)} style={{ fontWeight: 600, color: 'var(--dark)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        {s.titre}
                      </button>
                      <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                        {s.prix} DH · {s.categorie || '-'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--danger)' }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders */}
        <div>
          <h2 style={{ fontSize: '20px', fontFamily: "Syne,sans-serif", fontWeight: 700, marginBottom: '16px' }}>
            {user?.role === 'client' ? 'Mes commandes' : 'Commandes reçues'}
          </h2>

          {orders.length === 0 ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📭</div>
              <p>Aucune commande pour l'instant.</p>
              {user?.role === 'client' && (
                <button onClick={() => navigate('/services')} className="btn btn-primary" style={{ marginTop: '14px' }}>
                  Explorer les services
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.map(o => {
                const st = STATUS[o.statut] || { label: o.statut, cls: 'badge-muted' }
                const otherName = user?.role === 'client' ? o.freelancer_nom : o.client_nom

                return (
                  <div
                    key={o.id}
                    className="card"
                    style={{
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{o.titre}</div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                        {user?.role === 'client' ? 'Freelancer' : 'Client'}: {otherName} · {formatDate(o.created_at)}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: 'var(--primary)' }}>
                        {Number(o.montant).toFixed(0)} DH
                      </span>
                      <span className={`badge ${st.cls}`} style={{
                        background: st.cls === 'badge-success' ? 'rgba(5,150,105,.1)' : st.cls === 'badge-warning' ? 'rgba(217,119,6,.1)' : 'rgba(37,99,235,.1)',
                        color: st.cls === 'badge-success' ? 'var(--success)' : st.cls === 'badge-warning' ? 'var(--warning)' : 'var(--info)'
                      }}>
                        {st.label}
                      </span>

                      {user?.role === 'freelancer' && o.statut === 'en_attente' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleStatusUpdate(o.id, 'en_cours')}
                        >
                          Accepter
                        </button>
                      )}
                      {user?.role === 'freelancer' && o.statut === 'en_cours' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleStatusUpdate(o.id, 'termine')}
                        >
                          Terminer
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
