import { MultiCurrencyPrice } from './common';

export type GigCategory =
  | 'video_ad'
  | 'product_demo'
  | 'editor'
  | 'motion_designer'
  | 'ugc_creator'
  | 'video_creator'
  | 'other';

export interface Gig {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: GigCategory;
  tags: string[];
  price: MultiCurrencyPrice;
  paymentType: 'fixed' | 'milestone' | 'contract';
  brandName: string;
  brandLogo?: string;
  brandId: string;
  postedAt: string;
  deadline?: string;
  applicantsCount: number;
  isFeatured?: boolean;
  isUrgent?: boolean;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  requirements?: string[];
  deliverables?: string[];
}
