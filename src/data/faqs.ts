export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'brands' | 'creators' | 'general';
}

export const faqsData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How does pricing work?',
    answer: 'Posting a brief and reviewing talent is 100% free. Payouts are negotiated directly based on your selected execution model, and platform fees are simple, risk-free, and transparent.',
    category: 'general',
  },
  {
    id: 'faq2',
    question: 'Can I hire teams?',
    answer: 'Yes! You can hire individual creators, editors, or scriptwriters, or easily book pre-built multi-specialist teams and agencies to execute larger, coordinated campaigns.',
    category: 'brands',
  },
  {
    id: 'faq3',
    question: 'Do brands pay commission?',
    answer: 'Posting brief campaigns is completely free. We charge a standard success fee of only 5% on successful self-serve hires, with no monthly retainers or hidden costs.',
    category: 'brands',
  },
  {
    id: 'faq4',
    question: 'Can agencies join?',
    answer: 'Absolutely. Creative agencies, video production teams, and community marketing networks are welcome to register, list portfolios, and pitch for campaign briefs.',
    category: 'creators',
  },
  {
    id: 'faq5',
    question: 'Can students apply?',
    answer: 'Yes! Students are a vital part of our ecosystem, frequently executing campus activations, word-of-mouth community awareness, and raw UGC creation.',
    category: 'creators',
  },
  {
    id: 'faq6',
    question: 'Can I hire iGigster directly?',
    answer: 'Yes. If you prefer a hands-off approach, choose our Managed Services. We will take your brief, assemble the team, manage production, and deliver optimized final assets.',
    category: 'brands',
  },
];
