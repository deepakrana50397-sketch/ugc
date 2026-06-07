import React from 'react';
import { Metadata } from 'next';
import Hero from '@/features/landing/Hero';
import TrustedBrands from '@/features/landing/TrustedBrands';
import Services from '@/features/landing/Services';
import HowItWorks from '@/features/landing/HowItWorks';
import VideoTestingLab from '@/features/landing/VideoTestingLab';
import Stats from '@/features/landing/Stats';
import ClientResults from '@/features/landing/ClientResults';
import QuoteTestimonial from '@/features/landing/QuoteTestimonial';
import FeaturedGigs from '@/features/landing/FeaturedGigs';
import CreatorCategories from '@/features/landing/CreatorCategories';
import Testimonials from '@/features/landing/Testimonials';
import PricingPreview from '@/features/landing/PricingPreview';
import Faqs from '@/features/landing/Faqs';
import FinalCta from '@/features/landing/FinalCta';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo/schema';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'UGC & Short-Form Video Gig Marketplace',
  description: 'Connect directly with raw UGC creators, expert video editors, and motion designers. Post a gig for free, get high-converting video assets, and only pay when you connect.',
  path: '/',
});

export default function Home() {
  const orgSchema = getOrganizationSchema();
  const webSchema = getWebsiteSchema();

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={webSchema} />
      
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trusted by & Niches */}
      <TrustedBrands />

      {/* 3. Services */}
      <Services />

      {/* 4. How it works */}
      <HowItWorks />

      {/* 4.5. Video Testing Lab */}
      <VideoTestingLab />

      {/* 5. Stats / Results */}
      <Stats />

      {/* 5.5. Client Results / Case Study */}
      <ClientResults />

      {/* 5.6. Quote Testimonial */}
      <QuoteTestimonial />

      {/* 6. Featured Gigs Preview */}
      <FeaturedGigs />

      {/* 7. Creator Categories */}
      <CreatorCategories />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Pricing Preview */}
      <PricingPreview />

      {/* 10. FAQs */}
      <Faqs />

      {/* 11. Final CTA */}
      <FinalCta />
    </>
  );
}
