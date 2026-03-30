import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { BASE_URL } from '../utils/api'
import { SkeletonCard } from '../components/Loading'
import { formatDate, starsHTML } from '../utils/helpers'

export default function Home() {
  const navigate = useNavigate()
  const [featuredServices, setFeaturedServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedServices()
  }, [])

  const loadFeaturedServices = async () => {
    try {
      const services = await api.get('/services?limit=6&featured=true')
      setFeaturedServices(services || [])
    } catch (err) {
      console.error('Erreur chargement services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value
    if (e.key === 'Enter' && query) {
      navigate(`/services?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO */}
      <section style={{
        position: 'relative',
        padding: '120px 20px 100px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Background Gradients (Decorative) */}
        <div className="animate-gradient-bg" style={{
          position: 'absolute', top: '-50%', left: '-20%', width: '70%', height: '150%',
          borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1
        }} />
        <div className="animate-gradient-bg delay-500" style={{
          position: 'absolute', bottom: '-50%', right: '-20%', width: '60%', height: '120%',
          borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2, zIndex: -1
        }} />

        {/* Floating Elements (Visual Polish) */}
        <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '15%', fontSize: '40px', filter: 'drop-shadow(0 0 10px rgba(255,95,31,0.5))', opacity: 0.8 }}>🚀</div>
        <div className="animate-float-delayed" style={{ position: 'absolute', top: '15%', right: '20%', fontSize: '48px', filter: 'drop-shadow(0 0 10px rgba(138,43,226,0.5))', opacity: 0.8 }}>💡</div>
        <div className="animate-float delay-300" style={{ position: 'absolute', bottom: '25%', left: '20%', fontSize: '32px', filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))', opacity: 0.7 }}>💸</div>
        <div className="animate-float delay-400" style={{ position: 'absolute', bottom: '20%', right: '15%', fontSize: '50px', filter: 'drop-shadow(0 0 10px rgba(255,183,3,0.5))', opacity: 0.8 }}>✨</div>

        <div className="container animate-fade-in-up">
          <div className="badge badge-primary hover-glow" style={{ marginBottom: '24px', display: 'inline-flex', padding: '10px 20px', fontSize: '14px' }}>
            <span style={{ marginRight: '8px' }}>🇲🇦</span> La plateforme freelance marocaine #1
          </div>
          <h1 className="section-title" style={{
            fontSize: '64px',
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textShadow: '0 0 40px rgba(255,255,255,0.1)'
          }}>
            Trouvez le talent<br />qu'il vous <span className="animate-gradient-text" style={{ fontSize: '72px' }}>faut.</span>
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Des milliers de freelancers qualifiés marocains prêts à transformer vos idées en réalité. Démarrez votre projet aujourd'hui.
          </p>

          {/* Search Glassmorphism */}
          <div className="glass" style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '650px',
            margin: '0 auto 32px',
            padding: '12px',
            borderRadius: '20px',
            boxShadow: 'var(--glow-purple)'
          }}>
            <input
              className="input"
              placeholder="Développeur web, création de logo, traduction..."
              onKeyPress={handleSearch}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', fontSize: '16px', boxShadow: 'none' }}
            />
            <button
              className="btn btn-primary btn-lg hover-scale-sm"
              style={{ padding: '12px 32px', borderRadius: '12px' }}
              onClick={() => {
                const input = document.querySelector('input[placeholder*="Développeur"]')
                if (input?.value) {
                  navigate(`/services?q=${encodeURIComponent(input.value)}`)
                }
              }}
            >
              Rechercher
            </button>
          </div>

          <p className="animate-fade-in delay-200" style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Recherches populaires :
            <button key="logo" onClick={() => navigate('/services?q=Logo')} className="hover-scale-sm" style={{ marginLeft: '12px', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px 14px', borderRadius: '100px', transition: 'all 0.2s' }}>🎨 Logo</button>
            <button key="web" onClick={() => navigate('/services?q=Site+web')} className="hover-scale-sm" style={{ marginLeft: '12px', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px 14px', borderRadius: '100px', transition: 'all 0.2s' }}>💻 Site web</button>
            <button key="marketing" onClick={() => navigate('/services?q=Marketing')} className="hover-scale-sm" style={{ marginLeft: '12px', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px 14px', borderRadius: '100px', transition: 'all 0.2s' }}>📈 Marketing</button>
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-3 glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
            <div className="hover-scale-sm" style={{ transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--primary)', textShadow: '0 0 20px rgba(255,95,31,0.4)' }}>
                500+
              </div>
              <div style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>
                Freelancers actifs
              </div>
            </div>
            <div className="hover-scale-sm" style={{ transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--primary)', textShadow: '0 0 20px rgba(255,95,31,0.4)' }}>
                1200+
              </div>
              <div style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>
                Projets livrés
              </div>
            </div>
            <div className="hover-scale-sm" style={{ transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--primary)', textShadow: '0 0 20px rgba(255,95,31,0.4)' }}>
                98%
              </div>
              <div style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>
                Clients satisfaits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center animate-fade-in-up">
            <h2 className="section-title">Explorez par catégorie</h2>
            <p className="section-sub" style={{ marginBottom: '40px' }}>
              Trouvez exactement ce dont vous avez besoin.
            </p>
          </div>
          
          <div className="grid-3 grid-stagger" style={{ marginBottom: '60px' }}>
            {[
              { emoji: '🎨', label: 'Design & Graphisme', cat: 'Design' },
              { emoji: '💻', label: 'Développement Web & App', cat: 'Développement' },
              { emoji: '📈', label: 'Marketing Digital', cat: 'Marketing' },
              { emoji: '✍️', label: 'Rédaction & Traduction', cat: 'Rédaction' },
              { emoji: '🎬', label: 'Montage Vidéo', cat: 'Vidéo' },
              { emoji: '🌍', label: 'Consulting', cat: 'Traduction' },
            ].map(cat => (
              <a
                key={cat.cat}
                href={`/services?cat=${encodeURIComponent(cat.cat)}`}
                className="card hover-lift hover-glow"
                style={{
                  padding: '40px 32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  width: '90px', 
                  height: '90px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {cat.emoji}
                </div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-main)' }}>
                  {cat.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="animate-fade-in-up" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px'
          }}>
            <div>
              <h2 className="section-title" style={{ fontSize: '36px' }}>Services populaires</h2>
              <p className="section-sub">Les prestations les plus demandées cette semaine</p>
            </div>
            <button onClick={() => navigate('/services')} className="btn btn-outline hover-glow">
              Voir tout ➔
            </button>
          </div>

          <div className="grid-3 grid-stagger">
            {loading
              ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featuredServices.map(s => (
                <a
                  key={s.id}
                  href={`/service/${s.id}`}
                  className="card hover-lift"
                  style={{ textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '220px',
                      background: s.image ? '#000' : 'linear-gradient(135deg, rgba(255,95,31,0.2), rgba(138,43,226,0.2))',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {s.image ? (
                      <img src={`${BASE_URL}${s.image}`} alt={s.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="service-img" />
                    ) : (
                      <div className="animate-float" style={{ fontSize: '72px', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}>✨</div>
                    )}
                  </div>
                  <div className="card-body">
                    {s.categorie && <span className="badge badge-primary" style={{ marginBottom: '12px' }}>{s.categorie}</span>}
                    <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      {s.titre}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-muted)', marginTop: '16px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px',
                        boxShadow: 'var(--glow-primary)'
                      }}>
                        {(s.freelancer_nom || '?')[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{s.freelancer_nom}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '20px',
                      paddingTop: '20px',
                      borderTop: '1px solid var(--border)'
                    }}>
                      <span style={{ color: '#F59E0B', fontWeight: 600 }}>★ {s.note_moyenne || 0} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({s.nb_avis || 0})</span></span>
                      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, color: 'var(--text-main)', fontSize: '18px' }}>
                        {s.prix} MAD
                      </span>
                    </div>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <div className="glass animate-glow-pulse" style={{
          padding: '80px 40px',
          textAlign: 'center',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, rgba(20,20,30,0.8), rgba(30,10,20,0.9))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Deco circles */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255,95,31,0.2)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'rgba(138,43,226,0.2)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="section-title" style={{ fontSize: '48px', marginBottom: '20px', color: '#fff' }}>
              Vous êtes freelancer ?
            </h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '18px',
              maxWidth: '550px',
              margin: '0 auto 40px',
              lineHeight: 1.7
            }}>
              Rejoignez des centaines de talents qui développent leur activité grâce à notre plateforme. Créez votre profil en 2 minutes.
            </p>
            <button onClick={() => navigate('/register?role=freelancer')} className="btn btn-primary btn-lg hover-scale-sm">
              Commencer gratuitement ➔
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
