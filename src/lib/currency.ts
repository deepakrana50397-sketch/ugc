import { Currency, MultiCurrencyPrice } from '@/types/common';

/**
 * Checks the browser's timezone and locale to guess if the user is in India.
 * If timezone is Asia/Kolkata or locale is English-India, returns INR, else USD.
 */
export function detectLocalCurrency(): Currency {
  if (typeof window === 'undefined') {
    return 'USD'; // SSR Default
  }

  try {
    // 1. Check localStorage first
    const saved = localStorage.getItem('igigster_currency');
    if (saved === 'INR' || saved === 'USD') {
      return saved as Currency;
    }

    // 2. Guess by Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone && (timezone.includes('Kolkata') || timezone.includes('Calcutta') || timezone === 'Asia/Calcutta')) {
      return 'INR';
    }

    // 3. Guess by language locale
    const languages = window.navigator.languages || [window.navigator.language];
    for (const lang of languages) {
      if (lang.toLowerCase().includes('in') || lang.toLowerCase() === 'en-in') {
        return 'INR';
      }
    }
  } catch (e) {
    console.error('Failed to detect currency locale', e);
  }

  return 'USD'; // fallback
}

/**
 * Formats a numeric price into a currency string.
 */
export function formatPrice(amount: number, currency: Currency): string {
  const isINR = currency === 'INR';
  return new Intl.NumberFormat(isINR ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Displays a multi-currency price object based on the active currency state.
 */
export function displayPrice(price: MultiCurrencyPrice, activeCurrency: Currency): string {
  const amount = price[activeCurrency];
  const formatted = formatPrice(amount, activeCurrency);
  if (price.period) {
    return `${formatted}/${price.period}`;
  }
  return formatted;
}
