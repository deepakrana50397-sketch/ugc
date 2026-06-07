import { MultiCurrencyPrice } from './common';

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: MultiCurrencyPrice;
  billing: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

export interface PlatformPricing {
  brand: {
    signup: MultiCurrencyPrice;
    gigPosting: MultiCurrencyPrice;
    applicantReview: MultiCurrencyPrice;
    connectionUnlock: MultiCurrencyPrice;
    successFeePercent: number;
    featuredGig: MultiCurrencyPrice;
    urgentHiring: MultiCurrencyPrice;
    verifiedBrand: MultiCurrencyPrice;
  };
  creator: {
    signup: MultiCurrencyPrice;
    profile: MultiCurrencyPrice;
    application: MultiCurrencyPrice;
    connectionShortlist: MultiCurrencyPrice;
    successFeePercent: number;
    featuredCreator: MultiCurrencyPrice;
    verifiedCreator: MultiCurrencyPrice;
    portfolioSpotlight: MultiCurrencyPrice;
  };
}
