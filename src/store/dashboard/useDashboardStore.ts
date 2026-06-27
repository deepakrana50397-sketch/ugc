'use client';

import { create } from 'zustand';
import { Creator } from '@/types/creator';
import { User } from '@/types/common';
import { getCurrentUser, getMe, getCreatorById, registerCreatorProfile, updateBrandProfile } from '@/lib/services';

interface CreatorDashboardData {
  profile: Creator | null;
}

interface BrandDashboardData {
  companyName: string;
  avatar: string;
}

interface DashboardState {
  user: User | null;
  isLoading: boolean;
  
  // Separated data for Creator and Brand
  creator: CreatorDashboardData;
  brand: BrandDashboardData;
  
  loadDashboard: () => Promise<void>;
  updateCreatorProfile: (profileData: Partial<Creator>) => Promise<void>;
  updateBrandProfile: (profileData: Partial<User>) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  user: null,
  isLoading: true,
  creator: {
    profile: null,
  },
  brand: {
    companyName: '',
    avatar: '',
  },
  loadDashboard: async () => {
    if (typeof window === 'undefined') return;
    
    const localUser = localStorage.getItem('igigster_user')
      ? JSON.parse(localStorage.getItem('igigster_user')!)
      : null;
    if (localUser) {
      set({ user: localUser });
    }

    set({ isLoading: true });
    try {
      const activeUser = await getMe();
      if (activeUser) {
        if (activeUser.role === 'creator') {
          const profile = await getCreatorById(activeUser.id);
          set({
            user: activeUser,
            isLoading: false,
            creator: { profile: profile || null },
            brand: { companyName: '', avatar: '' }
          });
        } else if (activeUser.role === 'brand') {
          set({
            user: activeUser,
            isLoading: false,
            creator: { profile: null },
            brand: {
              companyName: activeUser.companyName || activeUser.name || 'SkinGlow India',
              avatar: activeUser.avatar || ''
            }
          });
        } else {
          set({
            user: activeUser,
            isLoading: false,
            creator: { profile: null },
            brand: { companyName: '', avatar: '' }
          });
        }
      } else {
        set({
          user: null,
          isLoading: false,
          creator: { profile: null },
          brand: { companyName: '', avatar: '' }
        });
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      set({
        user: null,
        isLoading: false,
        creator: { profile: null },
        brand: { companyName: '', avatar: '' }
      });
    }
  },
  updateCreatorProfile: async (profileData) => {
    const currentProfile = get().creator.profile;
    if (!currentProfile) return;
    
    const updated = await registerCreatorProfile({
      ...currentProfile,
      ...profileData,
    });
    
    const activeUser = getCurrentUser();
    set({
      creator: { profile: updated },
      user: activeUser
    });
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('creator-profile-updated'));
    }
  },
  updateBrandProfile: async (profileData) => {
    if (typeof window === 'undefined') return;
    const activeUser = getCurrentUser();
    if (!activeUser || activeUser.role !== 'brand') return;
    
    const updatedUser = await updateBrandProfile({
      ...activeUser,
      ...profileData,
    });
    
    set({
      user: updatedUser,
      brand: {
        companyName: updatedUser.companyName || updatedUser.name || '',
        avatar: updatedUser.avatar || ''
      }
    });
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('brand-profile-updated'));
    }
  }
}));
