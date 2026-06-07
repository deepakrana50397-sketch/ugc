import { Gig } from '@/types/gig';

export const mockGigs: Gig[] = [
  {
    id: 'gig-1',
    title: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
    slug: 'ugc-creator-organic-skincare-reel-tiktok',
    description: 'We are looking for a female UGC creator aged 20-35 to film 3 organic-style Reels for our upcoming Vitamin C serum launch. You will need to show the product application, talk about texture, and film a "before & after" texture shot. Script and directions will be provided. The video needs to feel raw, aesthetic, and authentic.',
    category: 'ugc_creator',
    tags: ['Skincare', 'TikTok Ad', 'Product Demo', 'Female Creator'],
    price: { INR: 12000, USD: 150 },
    paymentType: 'fixed',
    brandName: 'SkinGlow India',
    brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=100',
    brandId: 'brand-skinglow',
    postedAt: '2026-06-05T10:00:00Z',
    deadline: '2026-06-20',
    applicantsCount: 12,
    isFeatured: true,
    isUrgent: false,
    status: 'active',
    requirements: [
      'Good natural lighting & camera setup (minimum iPhone 13 or similar)',
      'Clean bathroom or vanity aesthetic background',
      'Comfortable speaking clearly to the camera',
      'Ability to edit basic cuts and sync audio is a plus'
    ],
    deliverables: [
      '3 Edited 9:16 videos (15-30s each)',
      'All raw footages (B-rolls & talking heads)',
      'Usage rights for paid social ads for 90 days'
    ]
  },
  {
    id: 'gig-2',
    title: 'Short-Form Editor for High-Retention Tech Reels',
    slug: 'short-form-editor-high-retention-tech-reels',
    description: 'Looking for a skilled video editor who can take our raw 5-minute talking head podcasts/reviews and cut them into 3 high-impact, caption-heavy, fast-paced Instagram Reels & YouTube Shorts. Think Ali Abdaal / Alex Hormozi style edits with popups, emojis, and sound design. Must have a quick turnaround time.',
    category: 'editor',
    tags: ['Video Editing', 'Shorts', 'Hormozi Style', 'Sound Design'],
    price: { INR: 4500, USD: 60, period: 'gig' },
    paymentType: 'fixed',
    brandName: 'ByteSaaS',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
    brandId: 'brand-bytesaas',
    postedAt: '2026-06-06T09:00:00Z',
    deadline: '2026-06-15',
    applicantsCount: 8,
    isFeatured: false,
    isUrgent: true,
    status: 'active',
    requirements: [
      'Expertise in Premiere Pro, CapCut, or DaVinci Resolve',
      'Deep understanding of short-form retention hooks',
      'Excellent typography and subtitle styling',
      'Quick response and ability to deliver within 24 hours of receiving assets'
    ],
    deliverables: [
      '3 finalized short-form videos with burned-in captions',
      'Project files if requested',
      '1 round of revisions per video'
    ]
  },
  {
    id: 'gig-3',
    title: 'Motion Designer for B2B SaaS Launch Video',
    slug: 'motion-designer-b2b-saas-launch-video',
    description: 'We are launching a new financial dashboard SaaS and need a skilled motion designer to animate our UI interfaces. You will create smooth transitions, cursor hover zooms, animated data charts, and highlight specific workflows. We will supply Figma files and a recorded walkthrough of the UI. No voiceover needed; we have licensed background tracks.',
    category: 'motion_designer',
    tags: ['Motion Graphics', 'UI Animation', 'SaaS', 'After Effects'],
    price: { INR: 20000, USD: 250 },
    paymentType: 'milestone',
    brandName: 'FinUp Fintech',
    brandLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100',
    brandId: 'brand-finup',
    postedAt: '2026-06-04T14:30:00Z',
    deadline: '2026-06-25',
    applicantsCount: 4,
    isFeatured: true,
    isUrgent: false,
    status: 'active',
    requirements: [
      'Proven portfolio of SaaS or UI animation work',
      'Expert-level After Effects or Rive skills',
      'Ability to export high-quality, lightweight MP4s and Lottie/JSON animations',
      'Adherence to corporate branding guidelines (colors, fonts)'
    ],
    deliverables: [
      '1 main 60-second animated explainer video (16:9)',
      '3 promotional cutdowns (9:16 format, 15 seconds each)',
      'Clean source files (.aep)'
    ]
  },
  {
    id: 'gig-4',
    title: 'Male Creator for Fitness Gym Wear Try-On & Review',
    slug: 'male-creator-fitness-gym-wear-try-on-review',
    description: 'AlphaFit is seeking fitness-focused male creators to showcase our new sweat-wicking compression tees and gym shorts. You will film a high-energy try-on transition, a squat test/stretch test, and a brief talking head summarizing the fabric feel. Background should be a modern gym or aesthetic workout area.',
    category: 'ugc_creator',
    tags: ['Fitness', 'Activewear', 'Male Creator', 'Try-On'],
    price: { INR: 10000, USD: 120 },
    paymentType: 'fixed',
    brandName: 'AlphaFit Apparel',
    brandLogo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    brandId: 'brand-alphafit',
    postedAt: '2026-06-07T08:15:00Z',
    deadline: '2026-06-18',
    applicantsCount: 19,
    isFeatured: false,
    isUrgent: true,
    status: 'active',
    requirements: [
      'Athletic physique, comfortable modeling activewear',
      'Access to a commercial or well-equipped home gym for filming',
      'Clear vocal projection (wireless lapel mic preferred)',
      'Capable of capturing dynamic high-fps motion shots'
    ],
    deliverables: [
      '1 main review video (45 seconds)',
      '2 B-roll montage reels with trending audio',
      'Raw footage uploads'
    ]
  },
  {
    id: 'gig-5',
    title: 'Smart Home Gadget Product Unboxing & Demo Video',
    slug: 'smart-home-gadget-product-unboxing-demo-video',
    description: 'Create an engaging product demo for our new Smart Water Leaking Detector. You will film an unboxing, show how easy it is to pair with the mobile app, and simulate a water leak to show the instant siren and mobile notifications. The video should look helpful, natural, and focus heavily on home safety and peace of mind.',
    category: 'product_demo',
    tags: ['Gadget', 'Smart Home', 'Unboxing', 'Tech Review'],
    price: { INR: 8000, USD: 100 },
    paymentType: 'fixed',
    brandName: 'CozyHome IoT',
    brandLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100',
    brandId: 'brand-cozyhome',
    postedAt: '2026-06-02T11:00:00Z',
    deadline: '2026-06-12',
    applicantsCount: 6,
    isFeatured: false,
    isUrgent: false,
    status: 'active',
    requirements: [
      'Neutral kitchen or laundry room setup for leak simulation',
      'Ability to do screen-record overlays of the mobile app onboarding',
      'Friendly and clear explaining tone',
      'High-definition camera quality with stable tripod shots'
    ],
    deliverables: [
      '1 walkthrough demo video (60-90 seconds)',
      '1 hook-focused TikTok version (20 seconds)',
      'All voiceover audio tracks separately'
    ]
  }
];
