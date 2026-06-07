'use client';

import { useEffect, useState } from 'react';
import { Currency } from '@/types/common';
import { detectLocalCurrency } from '@/lib/currency';
import { useCurrency } from './useCurrency';

export function useLocationCurrency() {
  const { currency, setCurrency } = useCurrency();
  const [detectedCurrency, setDetectedCurrency] = useState<Currency>('USD');
  const [hasMismatch, setHasMismatch] = useState(false);

  useEffect(() => {
    const detected = detectLocalCurrency();
    setDetectedCurrency(detected);
    
    // Check if what is saved/set matches actual locale detection
    const saved = localStorage.getItem('igigster_currency');
    if (!saved && detected !== currency) {
      setHasMismatch(true);
    } else if (saved && saved !== detected) {
      // User manual choice differs from detected location
      // We can notify or just log, but let's expose it so components can offer a banner
      setHasMismatch(true);
    } else {
      setHasMismatch(false);
    }
  }, [currency]);

  const acceptLocationCurrency = () => {
    setCurrency(detectedCurrency);
    setHasMismatch(false);
  };

  const dismissMismatch = () => {
    setHasMismatch(false);
  };

  return {
    detectedCurrency,
    currentCurrency: currency,
    hasMismatch,
    acceptLocationCurrency,
    dismissMismatch,
  };
}
