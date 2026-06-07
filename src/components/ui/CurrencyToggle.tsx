'use client';

import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';

export default function CurrencyToggle() {
  const { currency, setCurrency, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <div className="shimmer" style={{ width: '80px', height: '36px', borderRadius: '20px' }}></div>
    );
  }

  return (
    <div 
      className="currency-toggle-container"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        backgroundColor: 'var(--muted-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        gap: '2px',
      }}
    >
      <button
        onClick={() => setCurrency('INR')}
        style={{
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: 600,
          borderRadius: '20px',
          backgroundColor: currency === 'INR' ? 'rgb(var(--primary))' : 'transparent',
          color: currency === 'INR' ? '#ffffff' : 'var(--muted)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Switch to Indian Rupee"
      >
        ₹ INR
      </button>
      <button
        onClick={() => setCurrency('USD')}
        style={{
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: 600,
          borderRadius: '20px',
          backgroundColor: currency === 'USD' ? 'rgb(var(--primary))' : 'transparent',
          color: currency === 'USD' ? '#ffffff' : 'var(--muted)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Switch to US Dollar"
      >
        $ USD
      </button>
    </div>
  );
}
