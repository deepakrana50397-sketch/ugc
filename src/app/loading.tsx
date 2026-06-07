'use client';

import React from 'react';

export default function Loading() {
  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      {/* Premium glowing pulsing circle */}
      <div 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid rgba(124, 58, 237, 0.1)',
          borderTopColor: 'rgb(var(--primary))',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em' }}>
        LOADING IGIGSTER...
      </span>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
