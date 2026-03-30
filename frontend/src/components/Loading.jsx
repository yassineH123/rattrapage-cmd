import React from 'react'

export function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px'
    }}>
      <div className="spinner"></div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card">
      <div className="skeleton" style={{ height: '180px' }}></div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="skeleton" style={{ height: '12px', width: '60px', borderRadius: '100px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '80%' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '50%' }}></div>
        <div className="skeleton" style={{ height: '12px', width: '40%', marginTop: '8px' }}></div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, widths = ['100%', '100%', '60%'] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array(lines).fill(0).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: '16px', width: widths[i] || '100%' }}></div>
      ))}
    </div>
  )
}
