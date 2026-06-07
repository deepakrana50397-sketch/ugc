import React from 'react';
import { Metadata } from 'next';
import { getGigs } from '@/lib/services';
import GigsClient from '@/features/gigs/GigsClient';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'Find UGC & Short-Form Video Gigs',
  description: 'Search open gigs for UGC creators, TikTok video editors, and motion designers. Browse part-time or full-time short-form video positions.',
  path: '/gigs',
});

export default function GigsPage() {
  const gigs = getGigs();

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', color: '#0f172a', marginBottom: '12px' }}>
          Explore Open <span className="accent-gradient-text">UGC Gigs</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Apply to client campaigns for free. Check active budgets, requirements, and deadlines.
        </p>
      </div>
      <GigsClient initialGigs={gigs} />
    </div>
  );
}
