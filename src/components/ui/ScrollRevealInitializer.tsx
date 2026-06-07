'use client';

import { useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ScrollRevealInitializer() {
  useScrollReveal();
  return null;
}
