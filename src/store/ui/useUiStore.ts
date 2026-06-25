'use client';

import { create } from 'zustand';

interface UiState {
  // Sidebar State
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Active Dashboard View Query tab (e.g. 'earnings', 'saved', 'messages')
  activeDashboardView: string | null;
  setDashboardView: (view: string | null) => void;

  // Tools Modal (Create new modal) State
  isToolsModalOpen: boolean;
  setToolsModalOpen: (open: boolean) => void;
  toggleToolsModal: () => void;

  // Theme state
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  // Initial Sidebar State
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),

  // Initial View State
  activeDashboardView: null,
  setDashboardView: (view) => set({ activeDashboardView: view }),

  // Initial Tools Modal state
  isToolsModalOpen: false,
  setToolsModalOpen: (open) => set({ isToolsModalOpen: open }),
  toggleToolsModal: () => set((state) => ({ isToolsModalOpen: !state.isToolsModalOpen })),

  // Initial Theme state
  theme: 'dark',
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_theme', theme);
      window.dispatchEvent(new Event('igigster-theme-change'));
    }
  },
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_theme', nextTheme);
      window.dispatchEvent(new Event('igigster-theme-change'));
    }
    return { theme: nextTheme };
  }),
}));
