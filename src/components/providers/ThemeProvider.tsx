'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('igigster_theme', newTheme);
    document.cookie = `igigster_theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.remove('dark-theme', 'light-theme');
      body.classList.add(`${newTheme}-theme`);
    }

    window.dispatchEvent(new Event('igigster-theme-change'));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Sync context state with class list on mount/theme updates
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.remove('dark-theme', 'light-theme');
      body.classList.add(`${theme}-theme`);
    }
  }, [theme]);

  // Sync state if localStorage changes in other windows or tabs
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = (localStorage.getItem('igigster_theme') as Theme) || 'dark';
      if (currentTheme !== theme) {
        setThemeState(currentTheme);
      }
    };
    window.addEventListener('igigster-theme-change', handleThemeChange);
    return () => window.removeEventListener('igigster-theme-change', handleThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
