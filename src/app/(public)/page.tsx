import React from 'react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Hero from '@/features/landing/Hero';
import TrustedBrands from '@/features/landing/TrustedBrands';
import ScrollRevealSection from '@/features/landing/ScrollRevealSection';
import PerformanceSection from '@/features/landing/PerformanceSection';
import CreatorContentSection from '@/features/landing/CreatorContentSection';
import Services from '@/features/landing/Services';
import StackedServices from '@/features/landing/StackedServices';
import DontSettle from '@/features/landing/DontSettle';
import OurProcess from '@/features/landing/OurProcess';
import TalentPool from '@/features/landing/TalentPool';
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
import GrowContent from '@/features/landing/GrowContent';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo/schema';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'UGC & Short-Form Video Gig Marketplace',
  description: 'Connect directly with raw UGC creators, expert video editors, and motion designers. Post a gig for free, get high-converting video assets, and only pay when you connect.',
  path: '/',
});

export default async function Home() {
  const orgSchema = getOrganizationSchema();
  const webSchema = getWebsiteSchema();

  const cookieStore = await cookies();
  const mode = (cookieStore.get('igigster_mode')?.value as 'brand' | 'talent') || 'brand';

  if (mode === 'talent') {
    return (
      <>
        <JsonLd data={orgSchema} />
        <JsonLd data={webSchema} />

        {/* 1. Hero */}
        <Hero />

        {/* 2. Trusted by & Niches */}
        <TrustedBrands />

        {/* PROMOTED: Featured Gigs (crucial for creators looking for work) */}
        <FeaturedGigs />

        {/* 2.5. Scroll Reveal Section */}
        <ScrollRevealSection />

        {/* 3. Services */}
        <Services />

        {/* 3.7. Our Process Section */}
        <OurProcess />

        {/* 3.8. Talent Pool Section */}
        <TalentPool />

        {/* 4. How it works */}
        <HowItWorks />

        {/* 7. Creator Categories */}
        <CreatorCategories />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 10. FAQs */}
        <Faqs />

        {/* 11. Final CTA */}
        <FinalCta />
      </>
    );
  }

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={webSchema} />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Trusted by & Niches */}
      <TrustedBrands />

      {/* 2.5. Scroll Reveal Section */}
      <ScrollRevealSection />

      {/* 2.6. Combined Performance & Creator Content Section */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: 'rgb(244, 244, 243)' }}>
        <PerformanceSection />
        <CreatorContentSection />
      </div>

      {/* 3. Services (Older Grid Version) */}
      <Services />

      {/* 3.5. Stacked Services (New Cards Version) */}
      <StackedServices />

      {/* 3.6. Comparison Section */}
      <DontSettle />

      {/* 3.7. Our Process Section */}
      <OurProcess />

      {/* 3.8. Talent Pool Section */}
      <TalentPool />

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

      {/* 12. Split CTA Section */}
      <GrowContent />
    </>
  );
}

