export interface UgcGig {
  id: string;
  brandName: string;
  logoColor: string;
  category: 'College Student' | 'Housewife' | 'Influencer';
  budget: number;
  niche: string;
  title: string;
  description: string;
  deliverable: string;
  requirements: string[];
  status: 'Open' | 'Applying' | 'Filled';
}

export const ugcGigs: UgcGig[] = [
  {
    id: 'gig-1',
    brandName: 'FitGlow Nutrition',
    logoColor: 'bg-emerald-600',
    category: 'College Student',
    budget: 180,
    niche: 'Fitness & Supplements',
    title: 'Protein Smoothie ASMR & Morning Routine',
    description:
      'Looking for a college student creator to film a native dorm room/apartment aesthetic morning routine making our protein smoothie. Pacing should be fast-cut ASMR.',
    deliverable: '1x 9:16 Video + raw cuts',
    requirements: [
      'Must have dorm/apartment kitchen aesthetic',
      'Good natural lighting',
      'No background noise',
    ],
    status: 'Open',
  },
  {
    id: 'gig-2',
    brandName: 'Linen & Loom',
    logoColor: 'bg-amber-800',
    category: 'Housewife',
    budget: 250,
    niche: 'Home & Bedding',
    title: 'Bed Sheet Unboxing & Fold Demonstration',
    description:
      'We need a housewife creator to demonstrate the unboxing, texture test, and quick sheet changing of our premium cotton sets. Highlighting dust resistance.',
    deliverable: '1x 30s TikTok/Reels edit',
    requirements: [
      'Neat bedroom background',
      'Clear close-up hand shots demonstrating fiber texture',
      'Voiceover with warm tone',
    ],
    status: 'Open',
  },
  {
    id: 'gig-3',
    brandName: 'Aura Skincare',
    logoColor: 'bg-pink-600',
    category: 'Influencer',
    budget: 320,
    niche: 'Beauty & Wellness',
    title: '7-Day Hydration Glow Challenge Review',
    description:
      'Beauty influencer needed for a progress comparison review of our hyaluronic serum. Need before-after shots showing skin brightness.',
    deliverable: '1x 45s High CTR ad hook + review body',
    requirements: [
      'High-quality camera setup (1080p+)',
      'Clean face lighting',
      'Experience in direct response hook pacing',
    ],
    status: 'Open',
  },
  {
    id: 'gig-4',
    brandName: 'Nova Charge',
    logoColor: 'bg-sky-600',
    category: 'College Student',
    budget: 150,
    niche: 'Tech Accessories',
    title: 'Magnetic Cable ASMR Unboxing',
    description:
      'Tech lifestyle creator to showcase our magnetic charging stand desk setup. Focus on the snapping sounds and aesthetic workspace.',
    deliverable: '1x 15s short hook loop',
    requirements: [
      'Clean desk setup background',
      'Crisp audio capture for cable snap ASMR',
    ],
    status: 'Open',
  },
  {
    id: 'gig-5',
    brandName: 'KitchPro',
    logoColor: 'bg-red-600',
    category: 'Housewife',
    budget: 220,
    niche: 'Kitchen Gadgets',
    title: '5-Minute Prep Bowl Meal Demonstration',
    description:
      'Housewife creator to prepare a healthy family salad using our quick-chopper bowl. Focus on speed, convenience, and child safety aspects.',
    deliverable: '1x 60s cooking demo',
    requirements: [
      'Family kitchen setting',
      'Natural cooking demonstration flow',
      'Include child eating reaction if possible',
    ],
    status: 'Open',
  },
  {
    id: 'gig-6',
    brandName: 'Velo Apparel',
    logoColor: 'bg-indigo-600',
    category: 'Influencer',
    budget: 350,
    niche: 'Athleisure Fashion',
    title: 'High-Impact Gymwear Fit Check Loop',
    description:
      'Activewear influencer to model our squat-proof seamless sets. Show seamless stretches and highlight sweat-wicking materials.',
    deliverable: '2x Hook variations + 1x Body transition loop',
    requirements: [
      'Fitness setting (gym or outdoor track)',
      'Dynamic transitions matching beat drops',
    ],
    status: 'Open',
  },
];
