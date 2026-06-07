import { MetadataRoute } from 'next';
import { getGigs } from '@/lib/services';
import { siteConfig } from '@/data/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Public static routes
  const staticPaths = [
    '',
    '/gigs',
    '/creators',
    '/brands',
    '/how-it-works',
    '/pricing',
    '/about',
    '/contact',
    '/blog',
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  // Dynamic gigs routes
  let gigUrls: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly'; priority: number }> = [];
  try {
    const gigs = getGigs();
    gigUrls = gigs.map((gig) => ({
      url: `${siteConfig.url}/gigs/${gig.slug}`,
      lastModified: new Date(gig.postedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching sitemap dynamic gigs:', error);
  }

  return [...staticUrls, ...gigUrls];
}
