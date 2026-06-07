export const creatorDashboardData = {
  stats: [
    { label: 'Total Earnings', value: { INR: '₹34,500', USD: '$450' }, change: '+12%', type: 'increase' },
    { label: 'Active Applications', value: '4', change: '2 pending', type: 'info' },
    { label: 'Shortlisted Gigs', value: '2', change: 'Action required', type: 'warning' },
    { label: 'Profile Views', value: '184', change: '+24% this week', type: 'increase' },
  ],
  suggestedGigs: [
    {
      id: 'gig-2',
      title: 'Short-Form Editor for High-Retention Tech Reels',
      brand: 'ByteSaaS',
      price: { INR: 4500, USD: 60, period: 'gig' },
      tags: ['Video Editing', 'Shorts'],
      urgency: 'Urgent'
    },
    {
      id: 'gig-5',
      title: 'Smart Home Gadget Product Unboxing & Demo Video',
      brand: 'CozyHome IoT',
      price: { INR: 8000, USD: 100 },
      tags: ['Gadget', 'Unboxing'],
      urgency: 'Standard'
    }
  ],
  applications: [
    {
      id: 'app-1',
      gigId: 'gig-1',
      gigTitle: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
      brandName: 'SkinGlow India',
      status: 'shortlisted',
      appliedDate: '2026-06-05',
      bidAmount: { INR: 12000, USD: 150 },
      connectionFee: { INR: 49, USD: 1 },
    },
    {
      id: 'app-2',
      gigId: 'gig-3',
      gigTitle: 'Motion Designer for B2B SaaS Launch Video',
      brandName: 'FinUp Fintech',
      status: 'pending',
      appliedDate: '2026-06-06',
      bidAmount: { INR: 18000, USD: 220 },
      connectionFee: { INR: 49, USD: 1 },
    },
    {
      id: 'app-3',
      gigId: 'gig-4',
      gigTitle: 'Male Creator for Fitness Gym Wear Try-On',
      brandName: 'AlphaFit Apparel',
      status: 'rejected',
      appliedDate: '2026-06-04',
      bidAmount: { INR: 10000, USD: 120 },
      connectionFee: { INR: 49, USD: 1 },
    }
  ],
  profileCompletion: 80,
  profileSteps: [
    { name: 'Upload profile image', done: true },
    { name: 'Write professional bio', done: true },
    { name: 'Add portfolio videos', done: true },
    { name: 'Add social accounts', done: false },
    { name: 'Verify identity', done: false },
  ]
};

export const brandDashboardData = {
  stats: [
    { label: 'Total Budget Spent', value: { INR: '₹28,000', USD: '$350' }, change: '2 hires', type: 'info' },
    { label: 'Active Gig Posts', value: '2', change: 'Vetted & live', type: 'info' },
    { label: 'Total Applicants', value: '21', change: '+5 new today', type: 'increase' },
    { label: 'Unlocking Fees Paid', value: { INR: '₹198', USD: '$4' }, change: '2 contacts unlocked', type: 'info' },
  ],
  gigs: [
    {
      id: 'gig-1',
      title: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
      status: 'active',
      applicantsCount: 12,
      postedDate: '2026-06-05',
      budget: { INR: 12000, USD: 150 },
    },
    {
      id: 'gig-4',
      title: 'Male Creator for Fitness Gym Wear Try-On & Review',
      status: 'active',
      applicantsCount: 9,
      postedDate: '2026-06-07',
      budget: { INR: 10000, USD: 120 },
    }
  ],
  applicants: [
    {
      id: 'appl-1',
      creatorName: 'Neha Kapoor',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      creatorTitle: 'Beauty & Lifestyle UGC Creator',
      gigTitle: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
      gigId: 'gig-1',
      pitch: 'Hey! I love SkinGlow and already use your sunscreen. I can create an aesthetic, natural 30-second reel showcasing the hydrating effect and glow on camera. I have a professional softbox setup.',
      rate: { INR: 12000, USD: 150 },
      appliedAt: '2026-06-06',
      status: 'shortlisted', // shortlisted means needs unlock payment from brand
    },
    {
      id: 'appl-2',
      creatorName: 'Emily Davis',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      creatorTitle: 'Tech & Gadget UGC Actor',
      gigTitle: 'Male Creator for Fitness Gym Wear Try-On & Review',
      gigId: 'gig-4',
      pitch: 'I have a home gym setup and high quality sound equipment. Ready to deliver the review and try-on video within 3 days.',
      rate: { INR: 10000, USD: 120 },
      appliedAt: '2026-06-07',
      status: 'pending',
    }
  ]
};

export const adminDashboardData = {
  metrics: [
    { label: 'Total Verified Users', value: '1,650', change: '+18% MoM', type: 'increase' },
    { label: 'Active Public Gigs', value: '48', change: '+12% this week', type: 'increase' },
    { label: 'Connections Made', value: '312', change: 'Unlocks & shortlists', type: 'info' },
    { label: 'Platform Revenue', value: { INR: '₹32,490', USD: '$412' }, change: 'Fees & Premium Addons', type: 'increase' },
  ],
  pendingGigs: [
    {
      id: 'gig-pending-1',
      title: 'Aesthetic Product Reels for Candle Brand',
      brandName: 'Lumina Candles',
      category: 'ugc_creator',
      budget: { INR: 5000, USD: 70 },
      submittedAt: '2026-06-07T10:00:00Z',
    },
    {
      id: 'gig-pending-2',
      title: '3D Logo Animation for Tech Startup',
      brandName: 'Apex Security',
      category: 'motion_designer',
      budget: { INR: 15000, USD: 200 },
      submittedAt: '2026-06-07T12:00:00Z',
    }
  ],
  pendingApplications: [
    {
      id: 'app-pending-1',
      creatorName: 'Aman Verma',
      gigTitle: 'Smart Home Gadget Product Unboxing',
      submittedAt: '2026-06-07T13:00:00Z',
    }
  ]
};
