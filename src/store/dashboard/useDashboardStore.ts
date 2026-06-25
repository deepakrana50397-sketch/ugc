'use client';

import { create } from 'zustand';
import { Creator } from '@/types/creator';
import { User } from '@/types/common';
import { getCurrentUser, getCreators, registerCreatorProfile } from '@/lib/services';

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
  
  loadDashboard: () => void;
  updateCreatorProfile: (profileData: Partial<Creator>) => void;
  updateBrandProfile: (profileData: Partial<User>) => void;
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
  loadDashboard: () => {
    if (typeof window === 'undefined') return;
    const activeUser = getCurrentUser();
    if (activeUser) {
      if (activeUser.role === 'creator') {
        const creators = getCreators();
        let p = creators.find(c => c.id === activeUser.id);
        if (!p) {
          p = creators.find(c => c.name.toLowerCase() === activeUser.name.toLowerCase()) || creators[0];
        }
        set({
          user: activeUser,
          isLoading: false,
          creator: { profile: p || null },
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
  updateBrandProfile: (profileData) => {
    if (typeof window === 'undefined') return;
    const activeUser = getCurrentUser();
    if (!activeUser || activeUser.role !== 'brand') return;
    
    const updatedUser = {
      ...activeUser,
      ...profileData,
    };
    localStorage.setItem('igigster_user', JSON.stringify(updatedUser));
    
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
