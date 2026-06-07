'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Page Error caught:', error);
  }, [error]);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '50%', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <AlertCircle size={32} style={{ color: '#ef4444' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Something went wrong!</h2>
        <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '450px', lineHeight: 1.5 }}>
          An error occurred while loading this page. Let's attempt to refresh or reset the cache.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            border: '1px solid var(--card-border)',
            color: '#0f172a',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Refresh Page
        </button>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: 'rgb(var(--primary))',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '24px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <RotateCcw size={14} />
          <span>Reset Session</span>
        </button>
      </div>
    </div>
  );
}
