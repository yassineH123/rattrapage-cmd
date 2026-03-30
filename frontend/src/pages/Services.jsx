import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api, { BASE_URL } from '../utils/api'
import { SkeletonCard } from '../components/Loading'
import { formatDate, starsHTML } from '../utils/helpers'
import { CATEGORIES } from '../utils/constants'

export default function Services() {
  const [searchParams] = useSearchParams()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || '')

  useEffect(() => {
    loadServices()
  }, [searchQuery, selectedCategory])

  const loadServices = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.append('categorie', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)
      params.append('limit', '24')

      const response = await api.get(`/services?${params.toString()}`)
      setServices(Array.isArray(response) ? response : [])
    } catch (err) {
      console.error('Erreur chargement services:', err)
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value)
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="section-title">Tous les services</h1>
        <p className="section-sub" style={{ marginBottom: '24px' }}>
          Trouvez le freelancer parfait pour votre projet
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            className="input"
            placeholder="Rechercher un service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={() => {}}
          >
            Rechercher
          </button>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '8px 16px',
              borderRadius: '100px',
              border: selectedCategory === '' ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
              background: selectedCategory === '' ? 'rgba(232,93,4,.1)' : 'transparent',
              color: selectedCategory === '' ? 'var(--primary)' : 'var(--muted)',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            Tous
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: selectedCategory === cat ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                background: selectedCategory === cat ? 'rgba(232,93,4,.1)' : 'transparent',
                color: selectedCategory === cat ? 'var(--primary)' : 'var(--muted)',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          {services.length} service(s) trouvé(s)
        </p>

        {/* Services Grid */}
        <div className="grid-3">
          {loading && Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && services.length === 0 && (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 0',
              color: 'var(--muted)'
            }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>Aucun service trouvé</h3>
              <p>Essayez d'autres mots-clés ou catégories.</p>
            </div>
          )}

          {!loading && services.map(s => (
            <button
              key={s.id}
              onClick={() => navigate(`/service/${s.id}`)}
              className="card service-card"
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  background: 'rgba(232,93,4,.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}
              >
                {s.image ? (
                  <img src={`${BASE_URL}${s.image}`} alt={s.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '🎨'
                )}
              </div>
              <div className="card-body">
                {s.categorie && <span className="badge badge-primary">{s.categorie}</span>}
                <div style={{ fontWeight: 600, fontSize: '16px', marginTop: '8px' }}>
                  {s.titre}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '11px'
                  }}>
                    {(s.freelancer_nom || '?')[0].toUpperCase()}
                  </div>
                  <span>{s.freelancer_nom}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)'
                }}>
                  <span>{starsHTML(s.note_moyenne)} ({s.nb_avis || 0})</span>
                  <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, color: 'var(--primary)' }}>
                    {s.prix} DH
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
