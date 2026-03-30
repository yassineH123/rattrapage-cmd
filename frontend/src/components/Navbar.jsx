import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export function Navbar({ activePage = '' }) {
  const { user, logout } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const links = [
    { label: 'Explorer', href: '/services', page: 'services' },
    ...(user ? [{ label: 'Dashboard', href: '/dashboard', page: 'dashboard' }] : []),
    ...(user ? [{ label: 'Messages', href: '/messages', page: 'messages' }] : []),
    ...(user?.role === 'freelancer' ? [{ label: 'Publier', href: '/create-service', page: 'create' }] : []),
    ...(user?.role === 'admin' ? [{ label: '⚙️ Admin', href: '/admin', page: 'admin', style: { color: 'var(--primary)' } }] : []),
  ]

  return (
    <nav className="navbar-glass animate-fade-in" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        gap: '32px'
      }}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="hover-scale-sm"
          style={{
            fontSize: '24px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            color: 'var(--text-main)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '-0.02em'
          }}
        >
          Freelance<span className="text-gradient-primary">Hub</span>
        </button>

        {/* Links */}
        <nav style={{
          display: 'flex',
          gap: '32px',
          flex: 1,
          justifyContent: 'center'
        }}>
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.href)}
              className="hover-lift"
              style={{
                color: activePage === link.page ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activePage === link.page ? 600 : 500,
                fontSize: '15px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                ...link.style
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
              onMouseLeave={(e) => e.target.style.color = activePage === link.page ? 'var(--primary)' : 'var(--text-muted)'}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth Area */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover-scale-sm"
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#fff',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    boxShadow: 'var(--glow-primary)',
                    border: '2px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {user.nom[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {user.nom}
                </span>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="glass animate-scale-in" style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  borderRadius: 'var(--radius)',
                  minWidth: '220px',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '8px' }}>
                    <button onClick={() => { navigate('/profile'); setDropdownOpen(false) }} className="btn-ghost" style={{
                      width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)'
                    }}>
                      👤 Mon profil
                    </button>
                    <button onClick={() => { navigate('/dashboard'); setDropdownOpen(false) }} className="btn-ghost" style={{
                      width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)'
                    }}>
                      📊 Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <button onClick={() => { navigate('/admin'); setDropdownOpen(false) }} className="btn-ghost" style={{
                        width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '14px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)'
                      }}>
                        ⚙️ Administration
                      </button>
                    )}
                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); navigate('/login') }}
                      className="btn-ghost"
                      style={{
                        width: '100%', padding: '12px 16px', color: 'var(--danger)', cursor: 'pointer', fontSize: '14px', textAlign: 'left', borderRadius: '8px'
                      }}
                    >
                      🚪 Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn btn-outline btn-sm animate-fade-in">
                Connexion
              </button>
              <button onClick={() => navigate('/register')} className="btn btn-primary btn-sm animate-scale-in">
                S'inscrire
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
