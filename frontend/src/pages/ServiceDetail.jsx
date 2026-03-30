import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api, { BASE_URL } from '../utils/api'
import { Loading } from '../components/Loading'
import { formatDate, starsHTML } from '../utils/helpers'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [orderLoading, setOrderLoading] = useState(false)

  useEffect(() => {
    loadService()
  }, [id])

  const loadService = async () => {
    try {
      const response = await api.get(`/services/${id}`)
      setService(response)
    } catch (err) {
      console.error('Erreur chargement service:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async () => {
    setOrderLoading(true)
    try {
      await api.post('/orders', {
        service_id: id,
        quantite: quantity,
        montant: (service?.prix || 0) * quantity
      })
      alert('Commande créée avec succès!')
      navigate('/dashboard')
    } catch (err) {
      alert('Erreur création commande: ' + (err?.message || ''))
    } finally {
      setOrderLoading(false)
    }
  }

  if (loading) return <Loading />
  if (!service) return (
    <main className="page">
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1>Service non trouvé</h1>
      </div>
    </main>
  )

  return (
    <main className="page">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left - Image & Details */}
          <div>
            <div
              style={{
                width: '100%',
                height: '400px',
                background: 'rgba(232,93,4,.1)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                marginBottom: '24px'
              }}
            >
              {service.image ? (
                <img src={`${BASE_URL}${service.image}`} alt={service.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                '🎨'
              )}
            </div>

            {/* Seller Info */}
            <div className="card" style={{ padding: '16px', marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '16px'
                }}>
                  {(service.freelancer_nom || '?')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{service.freelancer_nom}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {starsHTML(service.note_moyenne)} ({service.nb_avis || 0} avis)
                  </div>
                </div>
              </div>
              <button onClick={() => navigate(`/profile/${service.freelancer_id}`)} className="btn btn-ghost btn-full" style={{ marginTop: '12px' }}>
                Voir le profil
              </button>
            </div>
          </div>

          {/* Right - Details & Order */}
          <div>
            <h1 className="section-title" style={{ marginBottom: '12px' }}>
              {service.titre}
            </h1>

            <div style={{ marginBottom: '24px' }}>
              <span className="badge badge-primary">{service.categorie}</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                fontSize: '14px',
                color: 'var(--muted)'
              }}>
                {starsHTML(service.note_moyenne)} ({service.nb_avis || 0} avis)
              </div>
            </div>

            <div style={{
              background: 'var(--surface)',
              padding: '20px',
              borderRadius: 'var(--radius)',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>À partir de</div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '36px',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}>
                    {service.prix} DH
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '12px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '16px',
                borderTop: '1px solid var(--border)',
                paddingTop: '12px'
              }}>
                <div>
                  <strong>⏱️</strong> {service.delai_livraison || 5} jours
                </div>
                {service.revisions_illimitees && (
                  <div>
                    <strong>🔄</strong> Révisions illimitées
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Description</h3>
              <p style={{
                color: 'var(--muted)',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap'
              }}>
                {service.description}
              </p>
            </div>

            {/* Order Form */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '16px' }}>Passer une commande</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Quantité
                </label>
                <input
                  className="input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={orderLoading}
                />
              </div>

              <div style={{
                background: 'var(--surface)',
                padding: '12px',
                borderRadius: 'var(--radius)',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--primary)' }}>
                    {((service?.prix || 0) * quantity).toFixed(0)} DH
                  </span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="btn btn-primary btn-full"
                disabled={orderLoading}
              >
                {orderLoading ? (
                  <>
                    <span className="spinner"></span>
                    Commande en cours...
                  </>
                ) : (
                  'Commander maintenant'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          main > div {
            display: grid !important;
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
