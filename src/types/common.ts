export type Currency = 'INR' | 'USD';

export interface MultiCurrencyPrice {
  INR: number;
  USD: number;
  period?: string; // e.g., 'week', 'month', 'gig'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'brand' | 'admin';
  avatar?: string;
  companyName?: string;
  title?: string;
  joinedAt: string;
}

export interface Application {
  id: string;
  gigId: string;
  gigTitle: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTitle: string;
  pitch: string;
  portfolioLink: string;
  rate: MultiCurrencyPrice;
  appliedAt: string;
  status: 'pending' | 'shortlisted' | 'unlocked' | 'rejected' | 'accepted';
}
