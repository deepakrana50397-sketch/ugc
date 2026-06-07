import { MultiCurrencyPrice } from './common';

export type CreatorCategory =
  | 'video_creator'
  | 'editor'
  | 'motion_designer'
  | 'voiceover'
  | 'actor';

export interface PortfolioItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  category?: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  title: string;
  category: CreatorCategory;
  location: string;
  rating: number;
  completedJobs: number;
  skills: string[];
  startingRate: MultiCurrencyPrice;
  portfolio: PortfolioItem[];
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  isFeatured?: boolean;
  isVerified?: boolean;
}
