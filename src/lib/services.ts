import { Gig } from '@/types/gig';
import { Creator } from '@/types/creator';
import { Application, User } from '@/types/common';
import { mockGigs } from '@/data/gigs';
import { mockCreators } from '@/data/creators';

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

// Background sync function connecting local storage cache with server-side Next.js mock API routes
export async function syncDatabaseWithApi() {
  if (!isClient) return;
  try {
    // 1. Sync auth user
    const resAuth = await fetch('/api/auth/me');
    const authData = await resAuth.json();
    if (authData.success && authData.user) {
      setLocalStorageItem('igigster_user', authData.user);
    }

    // 2. Sync gigs
    const resGigs = await fetch('/api/gigs');
    const gigsData = await resGigs.json();
    if (gigsData.success && gigsData.gigs) {
      setLocalStorageItem('igigster_gigs', gigsData.gigs);
    }

    // 3. Sync creators
    const resCreators = await fetch('/api/creators');
    const creatorsData = await resCreators.json();
    if (creatorsData.success && creatorsData.creators) {
      setLocalStorageItem('igigster_creators', creatorsData.creators);
    }

    // 4. Sync applications
    const resApps = await fetch('/api/applications');
    const appsData = await resApps.json();
    if (appsData.success && appsData.applications) {
      setLocalStorageItem('igigster_applications', appsData.applications);
    }

    // 5. Sync escrow audits
    const resEscrow = await fetch('/api/escrow');
    const escrowData = await resEscrow.json();
    if (escrowData.success && escrowData.escrow) {
      setLocalStorageItem('igigster_admin_escrow', escrowData.escrow);
    }

    // 6. Sync payouts queue
    const resPayouts = await fetch('/api/payouts');
    const payoutsData = await resPayouts.json();
    if (payoutsData.success && payoutsData.payouts) {
      setLocalStorageItem('igigster_admin_payouts', payoutsData.payouts);
    }

    // 7. Sync risk moderation
    const resRisk = await fetch('/api/risk');
    const riskData = await resRisk.json();
    if (riskData.success && riskData.risk) {
      setLocalStorageItem('igigster_admin_risk', riskData.risk);
    }
  } catch (err) {
    console.warn('API Sync unavailable, relying on local cache:', err);
  }
}

export function seedMockDatabase() {
  if (!isClient) return;

  // Initialize synchronous cache values if empty
  if (!localStorage.getItem('igigster_gigs')) {
    setLocalStorageItem('igigster_gigs', mockGigs);
  }
  if (!localStorage.getItem('igigster_creators')) {
    setLocalStorageItem('igigster_creators', mockCreators);
  }

  // Trigger background sync with Next.js route endpoints
  syncDatabaseWithApi();
}

// ----------------------
// AUTH SIMULATION SERVICE
// ----------------------
export function getCurrentUser(): User | null {
  seedMockDatabase();
  return getLocalStorageItem<User | null>('igigster_user', null);
}

export async function loginMockUser(email: string, role: 'creator' | 'brand' | 'admin'): Promise<User> {
  const response = await fetch('/api/auth/me', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role })
  });
  const data = await response.json();
  if (data.success && data.user) {
    setLocalStorageItem('igigster_user', data.user);
    return data.user;
  }
  throw new Error('Login API failed');
}

export async function logoutUser(): Promise<void> {
  if (isClient) {
    localStorage.removeItem('igigster_user');
  }
  await fetch('/api/auth/me', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: '', role: '' })
  });
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

export async function createGig(gig: Omit<Gig, 'id' | 'postedAt' | 'applicantsCount' | 'status' | 'brandId' | 'brandName' | 'brandLogo'>): Promise<Gig> {
  const response = await fetch('/api/gigs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gig)
  });
  const data = await response.json();
  if (data.success && data.gig) {
    // Sync cache locally
    const gigs = getGigs();
    setLocalStorageItem('igigster_gigs', [data.gig, ...gigs]);
    return data.gig;
  }
  throw new Error('Create Gig brief API failed');
}

export async function updateGigStatus(gigId: string, status: Gig['status']): Promise<void> {
  const gigs = getGigs();
  const updated = gigs.map(g => g.id === gigId ? { ...g, status } : g);
  setLocalStorageItem('igigster_gigs', updated);

  // Sync to database
  await fetch('/api/gigs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: gigId, status })
  });
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

export async function registerCreatorProfile(creatorData: Partial<Creator>): Promise<Creator> {
  const response = await fetch('/api/creators', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creatorData)
  });
  const data = await response.json();
  if (data.success && data.creator) {
    const creators = getCreators();
    const exists = creators.some(c => c.id === data.creator.id);
    const updatedCreators = exists
      ? creators.map(c => c.id === data.creator.id ? data.creator : c)
      : [data.creator, ...creators];

    setLocalStorageItem('igigster_creators', updatedCreators);
    if (data.user) {
      setLocalStorageItem('igigster_user', data.user);
    }
    return data.creator;
  }
  throw new Error('Register Creator profile API failed');
}

// ----------------------
// APPLICATIONS SERVICE
// ----------------------
export function getApplications(): Application[] {
  seedMockDatabase();
  return getLocalStorageItem<Application[]>('igigster_applications', []);
}

export async function applyToGig(applicationData: {
  gigId: string;
  pitch: string;
  portfolioLink: string;
  rate: { INR: number; USD: number };
}): Promise<Application> {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  const data = await response.json();
  if (data.success && data.application) {
    // Update count in gigs locally
    const gigs = getGigs();
    const updatedGigs = gigs.map(g => {
      if (g.id === applicationData.gigId) {
        return { ...g, applicantsCount: g.applicantsCount + 1 };
      }
      return g;
    });
    setLocalStorageItem('igigster_gigs', updatedGigs);

    // Sync app locally
    const applications = getApplications();
    setLocalStorageItem('igigster_applications', [data.application, ...applications]);
    return data.application;
  }
  throw new Error('Apply pitch to Gig API failed');
}

export async function updateApplicationStatus(appId: string, status: Application['status']): Promise<void> {
  const applications = getApplications();
  const updated = applications.map(app => app.id === appId ? { ...app, status } : app);
  setLocalStorageItem('igigster_applications', updated);

  await fetch('/api/applications', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: appId, status })
  });
}
