export const servicesSeo = {
  title: 'Our UGC & Social Media Growth Services',
  description:
    'Explore our professional UGC services including content creation, organic social management, and paid media advertising campaigns that scale.',
  keywords:
    'UGC creation, social media management, direct response ads, performance creatives, organic growth, paid social ads',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'UGC Content Creation & Ads Management',
    provider: {
      '@type': 'LocalBusiness',
      name: 'iGigster',
      image: '/og-image.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'UGC Content and Ads Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Short-Form Content Creation',
            description:
              'Vetted creators produce conversion-optimized short videos for TikTok, Instagram, and YouTube.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Management',
            description:
              'Posting schedule planning, copywriting, community engagement, and visual alignment.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Paid Media Campaigns',
            description:
              'Full ad setup, testing hooks, target bidding, and continuous ROAS optimization.',
          },
        },
      ],
    },
  },
};
