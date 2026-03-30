import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'rgba(10, 10, 16, 0.8)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradients */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', width: '30%', height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
        opacity: 0.5
      }} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        padding: '60px 24px'
      }}>
        {/* Logo & Desc */}
        <div style={{ maxWidth: '300px' }}>
          <button
            onClick={() => navigate('/')}
            className="hover-scale-sm"
            style={{
              fontSize: '24px',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: 'var(--text-main)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              padding: 0
            }}
          >
            Freelance<span className="text-gradient-primary">Hub</span>
          </button>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            La plateforme marocaine qui connecte les talents freelance avec les entreprises qui grandissent.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '16px', marginBottom: '20px' }}>Navigation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => navigate('/services')} className="hover-lift" style={{ fontSize: '15px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Explorer les services</button>
            <button onClick={() => navigate('/register')} className="hover-lift" style={{ fontSize: '15px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Devenir freelancer</button>
            <button onClick={() => navigate('/login')} className="hover-lift" style={{ fontSize: '15px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Se connecter</button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '16px', marginBottom: '20px' }}>Catégories</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {['Design', 'Développement', 'Marketing', 'Rédaction', 'Vidéo', 'Traduction'].map(cat => (
              <button
                key={cat}
                onClick={() => navigate(`/services?cat=${cat}`)}
                className="hover-lift"
                style={{ fontSize: '15px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.2)'
      }}>
        © {currentYear} FreelanceHub — Fait par Yassine HAYINE - Maroc
      </div>
    </footer>
  )
}
