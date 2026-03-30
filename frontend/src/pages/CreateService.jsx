import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../utils/api'
import { Alert, useAlerts } from '../components/Alert'
import { CATEGORIES } from '../utils/constants'

export default function CreateService() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: 'Design',
    prix: '',
    delai_livraison: 5,
    revisions_illimitees: false
  })
  const { alerts, showAlert } = useAlerts()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.titre || !formData.description || !formData.prix) {
      showAlert('Veuillez remplir tous les champs requis', 'danger')
      return
    }

    setLoading(true)
    try {
      const data = new FormData()
      data.append('titre', formData.titre)
      data.append('description', formData.description)
      data.append('categorie', formData.categorie)
      data.append('prix', formData.prix)
      data.append('delai_livraison', formData.delai_livraison)
      data.append('revisions_illimitees', formData.revisions_illimitees ? 1 : 0)

      if (imageFile) {
        data.append('image', imageFile)
      }

      await api.upload('/services', data)
      showAlert('Service créé avec succès', 'success')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      showAlert(err?.message || 'Erreur création service', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="section-title">Créer un service</h1>
        <p className="section-sub">Partagez vos talents avec les clients</p>

        {alerts.map(alert => (
          <Alert key={alert.id} message={alert.message} type={alert.type} />
        ))}

        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          {/* Title */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Titre du service *
            </label>
            <input
              className="input"
              type="text"
              name="titre"
              placeholder="Ex: Je développe des sites web modernes"
              value={formData.titre}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Description *
            </label>
            <textarea
              className="input"
              name="description"
              placeholder="Décrivez votre service en détail..."
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              rows={6}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Catégorie
            </label>
            <select
              className="input"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              disabled={loading}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Prix (DH) *
            </label>
            <input
              className="input"
              type="number"
              name="prix"
              placeholder="100"
              value={formData.prix}
              onChange={handleChange}
              disabled={loading}
              min="1"
            />
          </div>

          {/* Deadline */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Délai de livraison (jours)
            </label>
            <input
              className="input"
              type="number"
              name="delai_livraison"
              value={formData.delai_livraison}
              onChange={handleChange}
              disabled={loading}
              min="1"
            />
          </div>

          {/* Revisions */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              <input
                type="checkbox"
                name="revisions_illimitees"
                checked={formData.revisions_illimitees}
                onChange={handleChange}
                disabled={loading}
              />
              Révisions illimitées
            </label>
          </div>

          {/* Image */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Image du service
            </label>
            <div style={{
              position: 'relative',
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--surface)'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '150px',
                      borderRadius: 'var(--radius)',
                      marginBottom: '12px'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Cliquer pour changer</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📸</div>
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>Cliquez ou glissez une image</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>PNG, JPG ou WebP</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Création...
              </>
            ) : (
              'Publier le service'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
