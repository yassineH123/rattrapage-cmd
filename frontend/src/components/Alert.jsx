import React, { useState, useCallback } from 'react'

export function Alert({ message, type = 'danger', onClose }) {
  const icons = {
    danger: '⚠️',
    success: '✅',
    warning: '⚡',
    info: 'ℹ️'
  }

  return (
    <div className={`alert alert-${type}`} style={{ marginBottom: '16px' }}>
      <span>{icons[type]}</span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export function useAlerts() {
  const [alerts, setAlerts] = useState([])

  const showAlert = useCallback((message, type = 'danger', duration = 5000) => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, message, type }])
    if (duration > 0) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id))
      }, duration)
    }
    return id
  }, [])

  const clearAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }, [])

  return { alerts, showAlert, clearAlert }
}
