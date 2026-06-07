import { Gig } from '@/types/gig';
import { Creator } from '@/types/creator';
import { Application, User } from '@/types/common';
import { mockGigs } from '@/data/gigs';
import { mockCreators } from '@/data/creators';
import { creatorDashboardData, brandDashboardData } from '@/data/dashboard';

// Helper to check if window is defined (client-side)
const isClient = typeof window !== 'undefined';

// Safe localStorage getter
function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

// Safe localStorage setter
function setLocalStorageItem<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

// Seeds default data into localStorage if not present
export function seedMockDatabase() {
  if (!isClient) return;
  
  if (!localStorage.getItem('igigster_gigs')) {
    setLocalStorageItem('igigster_gigs', mockGigs);
  }
  if (!localStorage.getItem('igigster_creators')) {
    setLocalStorageItem('igigster_creators', mockCreators);
  }
  if (!localStorage.getItem('igigster_applications')) {
    // Seed initial applications from dashboard data
    const initialApps: Application[] = creatorDashboardData.applications.map((app, index) => {
      const creator = mockCreators[0]; // Neha Kapoor
      const gig = mockGigs.find(g => g.id === app.gigId) || mockGigs[0];
      return {
        id: app.id,
        gigId: app.gigId,
        gigTitle: app.gigTitle,
        brandId: gig.brandId,
        brandName: app.brandName,
        creatorId: creator.id,
        creatorName: creator.name,
        creatorAvatar: creator.avatar,
        creatorTitle: creator.title,
        pitch: `Pitch proposal for ${app.gigTitle} by Neha Kapoor.`,
        portfolioLink: creator.portfolio[0]?.videoUrl || '',
        rate: app.bidAmount,
        appliedAt: new Date(app.appliedDate).toISOString(),
        status: app.status as any
      };
    });
    setLocalStorageItem('igigster_applications', initialApps);
  }
}

// ----------------------
// AUTH SIMULATION SERVICE
// ----------------------
export function getCurrentUser(): User | null {
  return getLocalStorageItem<User | null>('igigster_user', null);
}

export function loginMockUser(email: string, role: 'creator' | 'brand' | 'admin'): User {
  let name = 'Guest User';
  let companyName = undefined;
  let title = undefined;

  if (role === 'creator') {
    name = 'Neha Kapoor';
    title = 'Beauty & Lifestyle UGC Creator';
  } else if (role === 'brand') {
    name = 'Sarah Jenkins';
    companyName = 'SkinGlow India';
  } else if (role === 'admin') {
    name = 'Admin Director';
  }

  const user: User = {
    id: role === 'creator' ? 'creator-1' : role === 'brand' ? 'brand-skinglow' : 'admin-1',
    name,
    email,
    role,
    companyName,
    title,
    avatar: role === 'creator' 
      ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    joinedAt: new Date().toISOString()
  };

  setLocalStorageItem('igigster_user', user);
  return user;
}

export function logoutUser(): void {
  if (!isClient) return;
  localStorage.removeItem('igigster_user');
}

// ----------------------
// GIG SERVICE
// ----------------------
export function getGigs(): Gig[] {
  seedMockDatabase();
  return getLocalStorageItem<Gig[]>('igigster_gigs', mockGigs);
}

export function getGigBySlug(slug: string): Gig | undefined {
  const gigs = getGigs();
  return gigs.find(g => g.slug === slug);
}

export function createGig(gig: Omit<Gig, 'id' | 'postedAt' | 'applicantsCount' | 'status' | 'brandId' | 'brandName' | 'brandLogo'>): Gig {
  const gigs = getGigs();
  const user = getCurrentUser();
  
  const newGig: Gig = {
    ...gig,
    id: `gig-${Date.now()}`,
    postedAt: new Date().toISOString(),
    applicantsCount: 0,
    status: 'active',
    brandId: user?.id || 'brand-generic',
    brandName: user?.companyName || user?.name || 'Incredible Brand',
    brandLogo: user?.avatar || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100'
  };

  setLocalStorageItem('igigster_gigs', [newGig, ...gigs]);
  return newGig;
}

export function updateGigStatus(gigId: string, status: Gig['status']): void {
  const gigs = getGigs();
  const updated = gigs.map(g => g.id === gigId ? { ...g, status } : g);
  setLocalStorageItem('igigster_gigs', updated);
}

// ----------------------
// CREATOR SERVICE
// ----------------------
export function getCreators(): Creator[] {
  seedMockDatabase();
  return getLocalStorageItem<Creator[]>('igigster_creators', mockCreators);
}

export function getCreatorById(id: string): Creator | undefined {
  const creators = getCreators();
  return creators.find(c => c.id === id);
}

export function registerCreatorProfile(creatorData: Partial<Creator>): Creator {
  const creators = getCreators();
  const user = getCurrentUser();

  const newCreator: Creator = {
    id: user?.id || `creator-${Date.now()}`,
    name: user?.name || creatorData.name || 'New Creator',
    avatar: user?.avatar || creatorData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    title: creatorData.title || 'UGC Video Creator',
    bio: creatorData.bio || '',
    category: creatorData.category || 'video_creator',
    location: creatorData.location || 'India',
    rating: 5.0,
    completedJobs: 0,
    skills: creatorData.skills || [],
    startingRate: creatorData.startingRate || { INR: 2000, USD: 30 },
    portfolio: creatorData.portfolio || [],
    socials: creatorData.socials || {},
    isFeatured: false,
    isVerified: false,
    ...creatorData
  };

  const exists = creators.some(c => c.id === newCreator.id);
  const updatedCreators = exists
    ? creators.map(c => c.id === newCreator.id ? newCreator : c)
    : [newCreator, ...creators];

  setLocalStorageItem('igigster_creators', updatedCreators);
  
  // Update the current logged in user metadata too
  if (user) {
    user.name = newCreator.name;
    user.title = newCreator.title;
    user.avatar = newCreator.avatar;
    setLocalStorageItem('igigster_user', user);
  }

  return newCreator;
}

// ----------------------
// APPLICATIONS SERVICE
// ----------------------
export function getApplications(): Application[] {
  seedMockDatabase();
  return getLocalStorageItem<Application[]>('igigster_applications', []);
}

export function applyToGig(applicationData: {
  gigId: string;
  pitch: string;
  portfolioLink: string;
  rate: { INR: number; USD: number };
}): Application {
  const applications = getApplications();
  const user = getCurrentUser();
  const gigs = getGigs();
  const gig = gigs.find(g => g.id === applicationData.gigId);

  if (!gig) throw new Error('Gig not found');

  const newApp: Application = {
    id: `app-${Date.now()}`,
    gigId: applicationData.gigId,
    gigTitle: gig.title,
    brandId: gig.brandId,
    brandName: gig.brandName,
    creatorId: user?.id || 'creator-anonymous',
    creatorName: user?.name || 'Anonymous Creator',
    creatorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    creatorTitle: user?.title || 'UGC Creator',
    pitch: applicationData.pitch,
    portfolioLink: applicationData.portfolioLink,
    rate: applicationData.rate,
    appliedAt: new Date().toISOString(),
    status: 'pending'
  };

  // Increment gig application counter
  const updatedGigs = gigs.map(g => {
    if (g.id === applicationData.gigId) {
      return { ...g, applicantsCount: g.applicantsCount + 1 };
    }
    return g;
  });
  setLocalStorageItem('igigster_gigs', updatedGigs);

  setLocalStorageItem('igigster_applications', [newApp, ...applications]);
  return newApp;
}

export function updateApplicationStatus(appId: string, status: Application['status']): void {
  const applications = getApplications();
  const updated = applications.map(app => app.id === appId ? { ...app, status } : app);
  setLocalStorageItem('igigster_applications', updated);
}
