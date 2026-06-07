export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  text: string;
  rating: number;
  type: 'brand' | 'creator';
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Aanya Sharma',
    role: 'Marketing Manager',
    company: 'SkinGlow India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    text: 'iGigster made sourcing UGC video creators incredibly easy. We got 15+ high-quality applicant videos in 48 hours and unlocked the perfect creator for only ₹99! The product demo video converted 2.5x better than our studio ads.',
    rating: 5,
    type: 'brand',
  },
  {
    id: 't2',
    name: 'David K.',
    role: 'Growth Lead',
    company: 'AlphaFit Apparel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'The absolute best platform for hiring short-form video editors. The dynamic layout allowed us to filter editors by their portfolio and test their pacing quickly. Highly recommended!',
    rating: 5,
    type: 'brand',
  },
  {
    id: 't3',
    name: 'Rohan Mehta',
    role: 'UGC Video Creator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    text: 'I started my part-time UGC journey here. Got shortlisted for a makeup brand demo gig, paid a small ₹49 connection fee, and signed a ₹15,000 contract! The portfolio spotlight definitely helped me stand out.',
    rating: 5,
    type: 'creator',
  },
  {
    id: 't4',
    name: 'Sarah Jenkins',
    role: 'Motion Graphics Artist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    text: 'I love that iGigster doesn’t charge hefty monthly subscriptions. I apply for free and only pay $1 when a client actually shortlists my pitch. I’ve worked on 12 different Reels and TikToks so far.',
    rating: 5,
    type: 'creator',
  },
];
