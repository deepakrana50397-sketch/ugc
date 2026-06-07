import { PlatformPricing, PricingPlan } from '@/types/pricing';

export const platformPricing: PlatformPricing = {
  brand: {
    signup: { INR: 0, USD: 0 },
    gigPosting: { INR: 0, USD: 0 },
    applicantReview: { INR: 0, USD: 0 },
    connectionUnlock: { INR: 99, USD: 2 },
    successFeePercent: 5,
    featuredGig: { INR: 499, USD: 9 },
    urgentHiring: { INR: 999, USD: 19 },
    verifiedBrand: { INR: 999, USD: 19 },
  },
  creator: {
    signup: { INR: 0, USD: 0 },
    profile: { INR: 0, USD: 0 },
    application: { INR: 0, USD: 0 },
    connectionShortlist: { INR: 49, USD: 1 },
    successFeePercent: 10,
    featuredCreator: { INR: 299, USD: 5, period: 'week' },
    verifiedCreator: { INR: 199, USD: 4 },
    portfolioSpotlight: { INR: 499, USD: 9, period: 'month' },
  },
};

// Pricing plans displayed on /pricing public page
export const brandPricingPlans: PricingPlan[] = [
  {
    id: 'brand_free',
    name: 'Starter Brand',
    price: { INR: 0, USD: 0 },
    billing: 'forever',
    description: 'Post gigs, view proposals, and shortlist candidates with zero risk.',
    features: [
      'Unlimited Gig Postings',
      'View Unlimited Applicant Profiles',
      'Shortlist top matches for free',
      'Pay only ₹99 / $2 to unlock contact info',
      'Standard 5% platform success fee',
    ],
    ctaText: 'Post a Gig for Free',
    ctaLink: '/register?role=brand',
  },
  {
    id: 'brand_pro',
    name: 'Featured Growth',
    price: { INR: 1499, USD: 29 },
    billing: 'month',
    description: 'Boost visibility and get high-quality applicants faster.',
    features: [
      'Everything in Starter Brand',
      '3 Featured Gigs included (worth ₹1497 / $27)',
      '2 Urgent Hiring boosts included (worth ₹1998 / $38)',
      'Verified Brand Badge (worth ₹999 / $19)',
      'Reduced connection unlock fee (₹49 / $1)',
      'Priority Admin Approval & support',
    ],
    ctaText: 'Go Pro Brand',
    ctaLink: '/register?role=brand&plan=pro',
    popular: true,
  }
];

export const creatorPricingPlans: PricingPlan[] = [
  {
    id: 'creator_free',
    name: 'Gigster Free',
    price: { INR: 0, USD: 0 },
    billing: 'forever',
    description: 'Create your portfolio, apply to gigs, and get shortlisted.',
    features: [
      'Public UGC Creator Portfolio',
      'Apply to unlimited Gigs for free',
      'Get found by top brands',
      'Pay only ₹49 / $1 shortlist connection fee',
      '10% platform success fee on hired gigs',
    ],
    ctaText: 'Start for Free',
    ctaLink: '/register?role=creator',
  },
  {
    id: 'creator_pro',
    name: 'Pro Gigster',
    price: { INR: 799, USD: 12 },
    billing: 'month',
    description: 'Showcase your work and dominate the UGC gig list.',
    features: [
      'Everything in Gigster Free',
      'Featured Creator Badge (₹299/wk value)',
      'Portfolio Spotlight placement (₹499/mo value)',
      'Verified Creator Checkmark (₹199 value)',
      '0% short-listed connection fees',
      'Direct client invite option',
    ],
    ctaText: 'Upgrade to Pro',
    ctaLink: '/register?role=creator&plan=pro',
    popular: true,
  }
];
