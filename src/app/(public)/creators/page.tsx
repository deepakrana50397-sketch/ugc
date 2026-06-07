import React from 'react';
import { Metadata } from 'next';
import { getCreators } from '@/lib/services';
import CreatorsClient from '@/features/creators/CreatorsClient';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'UGC Content Creators & Editors Directory',
  description: 'Search and hire vetted UGC creators, short-form video editors, voiceover artists, and motion designers for your campaigns.',
  path: '/creators',
});

export default function CreatorsPage() {
  const creators = getCreators();

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', color: '#0f172a', marginBottom: '12px' }}>
          Find Vetted <span className="accent-gradient-text">UGC Creator Talent</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Browse verified short-form video creators, editors, and designers. View their portfolio works, rates, and stats.
        </p>
      </div>
      <CreatorsClient initialCreators={creators} />
    </div>
  );
}
