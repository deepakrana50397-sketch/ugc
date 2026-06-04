export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What makes UGC-Direct different from traditional agencies?',
    answer:
      'Traditional agencies act as middlemen—they buy video content from creators for $150 and sell it to you for $400, pocketing a large markup. UGC-Direct is a direct-hiring directory. You pay creators their exact, affordable rates directly. We only charge a small flat booking fee ($19) to coordinate, script, and edit the final videos, saving you up to 60% on your content budget.',
  },
  {
    question: 'How do you vet creators on your website?',
    answer:
      'We accept less than 8% of creators who apply. We test each creator on: camera sensor quality (1080p/4K native mobile), natural lighting setup, voice articulation, hook pacing, and editing awareness. Every creator listed has completed at least 3 successful direct-response campaigns.',
  },
  {
    question: 'What is the typical turnaround time?',
    answer:
      'Our standard turnaround is 6 to 7 working days. The timeline begins the moment the creator receives your physical product. This includes 2 days for creator shooting, 2 days for our professional editors to apply graphics/subtitles, and 1 day for final QC check before delivery.',
  },
  {
    question: 'How does whitelisting / influencer seeding work?',
    answer:
      'All creators on our platform support seeding. You can run ads directly through their social handles (Spark Ads on TikTok or Partnership Ads on Instagram). The standard usage license covers 90 days of paid distribution, with options to extend for unlimited whitelisting directly in the booking panel.',
  },
  {
    question: 'What if I am not satisfied with the final video?',
    answer:
      'We offer a 100% satisfaction guarantee. If the creator misses a script detail or mispronounces a brand term outlined in the creative brief, they will re-shoot the footage for free. If you want to adjust the pacing, captions, or music, our in-house editing team provides one round of edits free of charge.',
  },
];
