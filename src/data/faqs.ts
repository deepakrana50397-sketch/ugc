export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'brands' | 'creators' | 'general';
}

export const faqsData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How does the pricing work for brands?',
    answer: 'Signing up, viewing portfolios, and posting gigs is 100% free. When you shortlist a candidate and want to unlock their contact information/chat, you pay a small connection fee of ₹99 (or $2). If you hire them, a standard 5% success fee is applied to the contract amount.',
    category: 'brands',
  },
  {
    id: 'faq2',
    question: 'How do creators get paid?',
    answer: 'Creators apply to gigs for free. If shortlisted, a small Verified Connection Fee of ₹49 (or $1) is charged to secure the communication. You negotiate the payout terms directly with the brand, and iGigster deducts a 10% platform fee on completion.',
    category: 'creators',
  },
  {
    id: 'faq3',
    question: 'What types of gigs can brands post?',
    answer: 'Brands can hire for any UGC or short-form video need: complete Instagram Reels/TikToks, YouTube Shorts editors, product unboxings, motion design, video effects overlays, actor-led product demos, and brand awareness packages.',
    category: 'brands',
  },
  {
    id: 'faq4',
    question: 'Is there a contract and disputing system?',
    answer: 'For Phase 1 and Phase 2, we provide manual contract structures and milestone tracking templates. We handle invoicing and communication templates directly to help facilitate safe collaborations.',
    category: 'general',
  },
  {
    id: 'faq5',
    question: 'How does location-based currency work?',
    answer: 'Our platform automatically detects your region (using browser indicators/locale) and displays prices in INR for users in India, and USD for international users. You can also manually override the active currency using the header toggle.',
    category: 'general',
  },
];
