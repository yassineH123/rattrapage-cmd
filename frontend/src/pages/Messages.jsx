import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { Loading } from '../components/Loading'
import { formatDate } from '../utils/helpers'

export default function Messages() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    loadConversations()
  }, [])

  useEffect(() => {
    if (selectedId) {
      loadMessages(selectedId)
    }
  }, [selectedId])

  const loadConversations = async () => {
    try {
      const response = await api.get('/messages/conversations')
      setConversations(Array.isArray(response) ? response : [])
    } catch (err) {
      console.error('Erreur chargement conversations:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId) => {
    try {
      const response = await api.get(`/messages/${conversationId}`)
      setMessages(Array.isArray(response) ? response : [])
    } catch (err) {
      console.error('Erreur chargement messages:', err)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedId) return

    setSendingMessage(true)
    try {
      await api.post(`/messages/${selectedId}`, { message: newMessage })
      setNewMessage('')
      loadMessages(selectedId)
    } catch (err) {
      console.error('Erreur envoi message:', err)
    } finally {
      setSendingMessage(false)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="page">
      <div className="container" style={{ height: 'calc(100vh - 200px)', display: 'grid', gridTemplateColumns: '300px 1fr' }}>
        {/* Conversations List */}
        <div style={{
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
          paddingRight: '20px'
        }}>
          <h2 style={{ fontWeight: 600, marginBottom: '16px' }}>Messages</h2>
          {conversations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>
              Aucun message
            </div>
          ) : (
            conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: selectedId === conv.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: selectedId === conv.id ? 'rgba(232,93,4,.1)' : 'transparent',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{conv.autre_personne}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  {conv.dernier_message_preview || 'Aucun message'}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Chat Area */}
        {selectedId ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '20px'
          }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: msg.est_mien ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    className="card"
                    style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      background: msg.est_mien ? 'var(--primary)' : 'var(--surface)',
                      color: msg.est_mien ? '#fff' : 'var(--dark)',
                      borderRadius: msg.est_mien ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)' : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)'
                    }}
                  >
                    <p style={{ margin: '0 0 4px 0' }}>{msg.contenu}</p>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>
                      {formatDate(msg.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
              <input
                className="input"
                placeholder="Votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sendingMessage}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sendingMessage || !newMessage.trim()}
              >
                Envoyer
              </button>
            </form>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)'
          }}>
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </main>
  )
}
