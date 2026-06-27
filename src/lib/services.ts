import { Gig } from '@/types/gig';
import { Creator } from '@/types/creator';
import { Application, User } from '@/types/common';

const API_BASE = 'http://localhost:3001/api/v1';

const isClient = typeof window !== 'undefined';

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

function setLocalStorageItem<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function isDemoMode(): boolean {
  if (!isClient) return false;
  return localStorage.getItem('igigster_demo_mode') === 'true';
}

// Helpers for headers
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (isClient) {
    const token = localStorage.getItem('igigster_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  return fetch(fullUrl, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
    credentials: 'include',
  });
}

// Model Mappers
function mapBackendGigToFrontend(g: any): Gig {
  return {
    id: g.id,
    title: g.title,
    slug: g.slug,
    description: g.description,
    category: g.category || 'ugc_creator',
    tags: g.tags || [],
    price: {
      INR: g.budget,
      USD: Math.round(g.budget / 80),
    },
    paymentType: g.paymentType || 'fixed',
    brandName: g.brand?.companyName || g.brandName || 'Brand Partner',
    brandLogo: g.brand?.user?.avatarUrl || g.brandLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100',
    brandId: g.brandId,
    postedAt: g.createdAt || new Date().toISOString(),
    deadline: g.deadline ? new Date(g.deadline).toISOString().split('T')[0] : undefined,
    applicantsCount: g.applicantsCount || 0,
    status: g.status ? g.status.toLowerCase() as any : 'active',
    requirements: g.requirements || [],
    deliverables: g.deliverables || [],
  };
}

function mapBackendCreatorToFrontend(c: any): Creator {
  return {
    id: c.id,
    name: c.user?.name || 'Content Creator',
    avatar: c.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    bio: c.bio || 'Welcome to my creator profile!',
    title: c.title || 'UGC Creator & Content Specialist',
    category: c.category || 'video_creator',
    location: c.location || 'Mumbai, India',
    rating: c.rating || 5.0,
    completedJobs: c.completedJobs || 0,
    skills: c.skills || [],
    startingRate: {
      INR: c.startingRateINR || 5000,
      USD: c.startingRateUSD || 70,
      period: c.startingRatePeriod || 'gig',
    },
    portfolio: (c.portfolio || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      videoUrl: p.videoUrl,
      thumbnailUrl: p.thumbnailUrl || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400',
      category: p.category,
    })),
    socials: {
      instagram: c.socials?.instagram || '',
      tiktok: c.socials?.tiktok || '',
      youtube: c.socials?.youtube || '',
      linkedin: c.socials?.linkedin || '',
    },
    isFeatured: c.isFeatured || false,
    isVerified: c.isVerified || false,
  };
}

function mapBackendApplicationToFrontend(app: any): Application {
  return {
    id: app.id,
    gigId: app.gigId,
    gigTitle: app.gig?.title || 'Gig Opportunity',
    brandId: app.gig?.brandId || '',
    brandName: app.gig?.brand?.companyName || app.brandName || 'Brand Partner',
    creatorId: app.creatorId,
    creatorName: app.creator?.user?.name || 'Creator',
    creatorAvatar: app.creator?.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    creatorTitle: app.creator?.title || 'Content Creator',
    pitch: app.pitch,
    portfolioLink: app.portfolioLink || '',
    rate: {
      INR: app.proposedRate,
      USD: Math.round(app.proposedRate / 80),
    },
    appliedAt: app.appliedAt || new Date().toISOString(),
    status: app.status ? (app.status.toLowerCase() as any) : 'pending',
    brandCategory: app.gig?.category || 'General',
    gigCategory: app.gig?.category || 'General',
    rateRange: {
      INR: `₹${app.proposedRate}`,
      USD: `$${Math.round(app.proposedRate / 80)}`,
    },
    relativeDate: 'Recent',
    thumbnailUrl: app.gig?.brand?.user?.avatarUrl || '',
    brandLogoBg: '#FDF2F8',
    brandLogoColor: '#EC4899',
    brandLogoText: app.gig?.brand?.companyName ? app.gig.brand.companyName[0] : 'B',
  } as any;
}

// Dummy sync function to keep page components compilation intact
export async function syncDatabaseWithApi() {}
export function seedMockDatabase() {}

// ----------------------
// AUTH SERVICE
// ----------------------
export function getCurrentUser(): User | null {
  return getLocalStorageItem<User | null>('igigster_user', null);
}

export async function getMe(): Promise<User | null> {
  const token = localStorage.getItem('igigster_token');
  const cachedUser = getCurrentUser();
  if (!token && !cachedUser) return null;

  try {
    const res = await apiFetch('/auth/me');
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('igigster_user');
        localStorage.removeItem('igigster_token');
      }
      return null;
    }
    const data = await res.json();
    if (data.success && data.user) {
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role.toLowerCase() as any,
        avatar: data.user.avatarUrl || '',
        companyName: data.user.brand?.companyName,
        title: data.user.creator?.title,
        joinedAt: data.user.createdAt,
        onboardingStatus: data.user.onboardingStatus,
      };
      setLocalStorageItem('igigster_user', user);
      return user;
    }
  } catch (err) {
    console.error('Error fetching auth state:', err);
  }
  return null;
}

export async function loginMockUser(email: string, role: 'creator' | 'brand' | 'admin', name?: string): Promise<User> {
  if (isClient) {
    const formattedName = name ? encodeURIComponent(name) : '';
    localStorage.setItem('igigster_token', `mock-jwt-${role}|${email}|${formattedName}`);
  }
  const user = await getMe();
  if (user) {
    return user;
  }
  throw new Error('Simulation authentication failed');
}

export async function signUpUser(payload: {
  email: string;
  name: string;
  role: 'creator' | 'brand' | 'admin';
  password?: string;
}): Promise<User> {
  const response = await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      role: payload.role.toUpperCase(),
      password: payload.password || 'password123',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to sign up');
  }

  const result = await response.json();
  
  if (result.session?.access_token) {
    if (isClient) {
      localStorage.setItem('igigster_token', result.session.access_token);
    }
  }

  const user: User = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    role: result.user.role.toLowerCase() as any,
    avatar: result.user.avatarUrl || '',
    companyName: result.user.brand?.companyName,
    title: result.user.creator?.title,
    joinedAt: result.user.createdAt,
    onboardingStatus: result.user.onboardingStatus,
  };

  setLocalStorageItem('igigster_user', user);
  return user;
}

export async function signInUser(payload: {
  email: string;
  password?: string;
}): Promise<User> {
  const response = await apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password || 'password123',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to sign in');
  }

  const result = await response.json();

  if (result.session?.access_token) {
    if (isClient) {
      localStorage.setItem('igigster_token', result.session.access_token);
    }
  }

  const user: User = {
    id: result.user.id,
    name: result.user.name,
    email: result.user.email,
    role: result.user.role.toLowerCase() as any,
    avatar: result.user.avatarUrl || '',
    companyName: result.user.brand?.companyName,
    title: result.user.creator?.title,
    joinedAt: result.user.createdAt,
    onboardingStatus: result.user.onboardingStatus,
  };

  setLocalStorageItem('igigster_user', user);
  return user;
}

export async function logoutUser(): Promise<void> {
  try {
    await apiFetch('/auth/logout', {
      method: 'POST',
    });
  } catch (e) {
    console.warn('API logout skipped or failed:', e);
  }
  if (isClient) {
    localStorage.removeItem('igigster_user');
    localStorage.removeItem('igigster_token');
    localStorage.removeItem('igigster_demo_mode');
  }
}

// ----------------------
// GIG SERVICE
// ----------------------
export async function getGigs(): Promise<Gig[]> {
  const user = getCurrentUser();
  const endpoint = user?.role === 'brand' ? '/brand/gigs' : '/creator/gigs';

  const response = await apiFetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch gigs from API');
  }
  const result = await response.json();
  return (result.data || []).map(mapBackendGigToFrontend);
}

export async function getGigBySlug(slug: string): Promise<Gig | undefined> {
  const gigs = await getGigs();
  return gigs.find((g) => g.slug === slug);
}

export async function createGig(
  gig: Omit<Gig, 'id' | 'postedAt' | 'applicantsCount' | 'status' | 'brandId' | 'brandName' | 'brandLogo'>,
): Promise<Gig> {
  const deadlineDate = gig.deadline ? new Date(gig.deadline).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const response = await apiFetch('/brand/gigs', {
    method: 'POST',
    body: JSON.stringify({
      title: gig.title,
      description: gig.description,
      category: gig.category,
      budget: gig.price?.INR || 10000,
      deadline: deadlineDate,
      status: 'ACTIVE',
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create gig on API');
  }
  const result = await response.json();
  return mapBackendGigToFrontend(result.data);
}

export async function updateGigStatus(gigId: string, status: Gig['status']): Promise<void> {
  const response = await apiFetch(`/brand/gigs/${gigId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: status.toUpperCase() === 'ACTIVE' ? 'ACTIVE' : 'CLOSED',
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update gig status on API');
  }
}

// ----------------------
// CREATOR SERVICE
// ----------------------
export async function getCreators(): Promise<Creator[]> {
  const response = await apiFetch('/creators');
  if (!response.ok) {
    throw new Error('Failed to fetch creators from API');
  }
  const result = await response.json();
  return (result.data?.creators || []).map(mapBackendCreatorToFrontend);
}

export async function getCreatorById(id: string): Promise<Creator | undefined> {
  const response = await apiFetch(`/creators/${id}`);
  if (!response.ok) {
    return undefined;
  }
  const result = await response.json();
  return mapBackendCreatorToFrontend(result.data);
}

export async function registerCreatorProfile(creatorData: Partial<Creator>): Promise<Creator> {
  const response = await apiFetch('/creator/profile', {
    method: 'PATCH',
    body: JSON.stringify({
      title: creatorData.title,
      bio: creatorData.bio,
      location: creatorData.location,
      skills: creatorData.skills || [],
      startingRateINR: creatorData.startingRate?.INR || 0,
      startingRateUSD: creatorData.startingRate?.USD || 0,
      startingRatePeriod: creatorData.startingRate?.period || 'gig',
      socials: creatorData.socials,
      portfolio: creatorData.portfolio,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to register/update creator profile on API');
  }
  const result = await response.json();
  return mapBackendCreatorToFrontend(result.data);
}

// ----------------------
// APPLICATIONS SERVICE
// ----------------------
export async function getApplications(): Promise<Application[]> {
  const user = getCurrentUser();
  const endpoint = user?.role === 'brand' ? '/brand/applications' : '/creator/applications';

  const response = await apiFetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch applications from API');
  }
  const result = await response.json();
  return (result.data || []).map(mapBackendApplicationToFrontend);
}

export async function applyToGig(applicationData: {
  gigId: string;
  pitch: string;
  portfolioLink: string;
  rate: { INR: number; USD: number };
}): Promise<Application> {
  const response = await apiFetch('/creator/applications', {
    method: 'POST',
    body: JSON.stringify({
      gigId: applicationData.gigId,
      pitch: applicationData.pitch,
      proposedRate: applicationData.rate?.INR || 10000,
      portfolioLink: applicationData.portfolioLink,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit application to API');
  }
  const result = await response.json();
  return mapBackendApplicationToFrontend(result.data);
}

export async function updateApplicationStatus(appId: string, status: Application['status']): Promise<void> {
  const response = await apiFetch(`/brand/applications/${appId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: status.toUpperCase(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update application status on API');
  }
}

export async function updateBrandProfile(brandData: Partial<User>): Promise<User> {
  const response = await apiFetch('/brand/profile', {
    method: 'PATCH',
    body: JSON.stringify({
      companyName: brandData.companyName,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update brand profile on API');
  }
  // Retrieve the updated user object from auth state
  const updatedUser = await getMe();
  if (updatedUser) {
    return updatedUser;
  }
  throw new Error('Failed to fetch updated brand user info');
}

