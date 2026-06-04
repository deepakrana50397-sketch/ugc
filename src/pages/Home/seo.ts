export const homeSeo = {
  title: 'DTC UGC Production & Direct Creator Hiring',
  description:
    'Get direct-response UGC videos from vetted creators. Direct rates, direct hiring, zero markup. Scale your TikTok, Instagram, and Facebook ads.',
  keywords:
    'UGC, User Generated Content, DTC marketing, creator hiring, short form video, TikTok ads, Reels, direct response marketing',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UGC-Direct',
    url: 'https://ugc-direct.com', // Placeholder for actual domain
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ugc-direct.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
  faqSchema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes UGC-Direct different from traditional agencies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional agencies act as middlemen—they buy video content from creators for $150 and sell it to you for $400, pocketing a large markup. UGC-Direct is a direct-hiring directory. You pay creators their exact, affordable rates directly. We only charge a small flat booking fee ($19) to coordinate, script, and edit the final videos, saving you up to 60% on your content budget.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you vet creators on your website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept less than 8% of creators who apply. We test each creator on: camera sensor quality, natural lighting setup, voice articulation, hook pacing, and editing awareness. Every creator listed has completed at least 3 successful direct-response campaigns.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the typical turnaround time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our standard turnaround is 6 to 7 working days. The timeline begins the moment the creator receives your physical product. This includes 2 days for creator shooting, 2 days for our professional editors to apply graphics/subtitles, and 1 day for final QC check before delivery.',
        },
      },
    ],
  },
};
