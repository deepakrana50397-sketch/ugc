import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGigBySlug, getGigs } from '@/lib/services';
import GigDetailClient from '@/features/gigs/GigDetailClient';
import JsonLd from '@/components/seo/JsonLd';
import { getJobPostingSchema, getBreadcrumbSchema } from '@/lib/seo/schema';
import { getPageMetadata } from '@/lib/seo/metadata';

interface GigPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GigPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gig = getGigBySlug(slug);

  if (!gig) {
    return getPageMetadata({
      title: 'Gig Not Found',
      path: `/gigs/${slug}`,
      noindex: true,
    });
  }

  return getPageMetadata({
    title: gig.title,
    description: `${gig.description.substring(0, 150)}... Apply as creator on iGigster. Budget: ${gig.price.INR} INR / ${gig.price.USD} USD.`,
    path: `/gigs/${slug}`,
  });
}

// Support Static Site Generation if required, by listing default paths
export async function generateStaticParams() {
  const gigs = getGigs();
  return gigs.map((gig) => ({
    slug: gig.slug,
  }));
}

export default async function GigDetailPage({ params }: GigPageProps) {
  const { slug } = await params;
  const gig = getGigBySlug(slug);

  if (!gig) {
    notFound();
  }

  // Generate structured schemas
  const jobSchema = getJobPostingSchema(gig, 'USD'); // default to USD base structure for schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Gigs', item: '/gigs' },
    { name: gig.title, item: `/gigs/${gig.slug}` }
  ]);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '24px' }}>
      <JsonLd data={jobSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <GigDetailClient gig={gig} />
    </div>
  );
}
