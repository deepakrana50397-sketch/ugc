'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type SiteMode = 'brand' | 'talent';

interface SiteModeContextType {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
}

const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);

export const SiteModeProvider: React.FC<{
  children: React.ReactNode;
  initialMode: SiteMode;
}> = ({ children, initialMode }) => {
  const [mode, setModeState] = useState<SiteMode>(initialMode);
  const router = useRouter();

  // Sync state if initialMode prop changes (e.g. from server-side updates)
  useEffect(() => {
    setModeState(initialMode);
  }, [initialMode]);

  const setMode = (newMode: SiteMode) => {
    setModeState(newMode);
    
    if (typeof window !== 'undefined') {
      // Set secure cookie expiring in 1 year
      document.cookie = `igigster_mode=${newMode}; path=/; max-age=31536000; SameSite=Lax; Secure`;
      
      // Refresh current route to trigger Server Components to re-read cookie and update
      router.refresh();
    }
  };

  const toggleMode = () => {
    const nextMode = mode === 'brand' ? 'talent' : 'brand';
    setMode(nextMode);
  };

  return (
    <SiteModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </SiteModeContext.Provider>
  );
};

export const useSiteMode = () => {
  const context = useContext(SiteModeContext);
  if (!context) {
    throw new Error('useSiteMode must be used within a SiteModeProvider');
  }
  return context;
};
