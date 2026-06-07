export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  popular: boolean;
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'ugc_creator',
    name: 'UGC Content Creator',
    slug: 'ugc-creator',
    description: 'Relatable, raw, and authentic videos created by real users to drive high conversions and social media engagement.',
    icon: 'Video',
    popular: true,
  },
  {
    id: 'editor',
    name: 'Short-Form Video Editor',
    slug: 'short-form-editor',
    description: 'Professional video editors specializing in high-retention TikTok, Instagram Reel, and YouTube Shorts pacing.',
    icon: 'Film',
    popular: true,
  },
  {
    id: 'motion_designer',
    name: 'Motion Designer',
    slug: 'motion-designer',
    description: 'Add dynamic animations, kinetic typography, customized effects, and high-end visual overlays to short videos.',
    icon: 'Sparkles',
    popular: false,
  },
  {
    id: 'product_demo',
    name: 'Product Demo Video',
    slug: 'product-demo',
    description: 'Step-by-step demonstrations showcasing your product’s key values, features, and unboxings in real-world scenarios.',
    icon: 'Package',
    popular: true,
  },
  {
    id: 'brand_awareness',
    name: 'Brand Awareness Video',
    slug: 'brand-awareness',
    description: 'High-production value narrative and engaging content tailored to tell your brand story and capture consumer interest.',
    icon: 'TrendingUp',
    popular: false,
  },
  {
    id: 'complete_reel',
    name: 'Complete Reel / Video Needed',
    slug: 'complete-reel-video',
    description: 'Full-service end-to-end video packages including scripting, filming, editing, and publishing-ready hook hooks.',
    icon: 'Tv',
    popular: true,
  },
];
