import { Creator } from '@/types/creator';

export const mockCreators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Neha Kapoor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Professional UGC content creator specializing in lifestyle, beauty, and wellness short-form videos. Over 3 years of experience writing hooks that stop the scroll and filming highly relatable aesthetic content.',
    title: 'Beauty & Lifestyle UGC Creator',
    category: 'video_creator',
    location: 'Mumbai, India',
    rating: 4.9,
    completedJobs: 84,
    skills: ['Directing', 'Scriptwriting', 'Color Grading', 'Voiceover', 'Product Styling'],
    startingRate: { INR: 5000, USD: 70 },
    portfolio: [
      {
        id: 'port-1-1',
        title: 'SkinGlow Hydrating Serum - Reel/TikTok',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
        category: 'Beauty'
      },
      {
        id: 'port-1-2',
        title: 'Morning Skincare Routine - VLog',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
        category: 'Lifestyle'
      }
    ],
    socials: {
      instagram: 'https://instagram.com/nehakapoor_ugc',
      tiktok: 'https://tiktok.com/@nehacreates',
      youtube: 'https://youtube.com/@nehakapoor'
    },
    isFeatured: true,
    isVerified: true
  },
  {
    id: 'creator-2',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Dynamic short-form video editor and retention strategist. I edit TikToks, YouTube Shorts, and Reels that keep viewers glued to the screen. Expert in text animation, transitions, and audio design.',
    title: 'Short-Form Retention Video Editor',
    category: 'editor',
    location: 'London, UK',
    rating: 4.8,
    completedJobs: 112,
    skills: ['CapCut Pro', 'Premiere Pro', 'Audio Design', 'Subtitle Styling', 'Retention Hooks'],
    startingRate: { INR: 3000, USD: 40, period: 'hour' },
    portfolio: [
      {
        id: 'port-2-1',
        title: 'SaaS Founder Podcast Snippet Edit',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
        category: 'Podcast Edit'
      },
      {
        id: 'port-2-2',
        title: 'E-commerce Clothes Hype Reels',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
        category: 'Fashion Edit'
      }
    ],
    socials: {
      instagram: 'https://instagram.com/marcusv_edits',
      youtube: 'https://youtube.com/@marcusv_shorts'
    },
    isFeatured: true,
    isVerified: true
  },
  {
    id: 'creator-3',
    name: 'Karan Singhal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Motion designer specializing in SaaS UI animation and dynamic typography. I turn static screens and Figma files into engaging explanatory videos and product promos.',
    title: 'SaaS UI Motion Designer',
    category: 'motion_designer',
    location: 'Bangalore, India',
    rating: 5.0,
    completedJobs: 45,
    skills: ['After Effects', 'Lottie Animations', 'Figma Animate', '3D Element', 'Illustrator'],
    startingRate: { INR: 8000, USD: 110 },
    portfolio: [
      {
        id: 'port-3-1',
        title: 'Fintech App Landing Animation',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
        category: 'SaaS Promo'
      }
    ],
    socials: {
      instagram: 'https://instagram.com/karan_motion',
      linkedin: 'https://linkedin.com/in/karansinghal'
    },
    isFeatured: false,
    isVerified: true
  },
  {
    id: 'creator-4',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    bio: 'High-energy UGC actor and content creator. I specialize in unboxings, product demonstrations, and voiceover reviews for tech gadgets, home goods, and mobile games.',
    title: 'Tech & Gadget UGC Actor',
    category: 'video_creator',
    location: 'Los Angeles, USA',
    rating: 4.7,
    completedJobs: 62,
    skills: ['Product Unboxing', 'Screencasting', 'Humorous Skits', 'TikTok Voiceover', 'Lighting Setup'],
    startingRate: { INR: 10000, USD: 130 },
    portfolio: [
      {
        id: 'port-4-1',
        title: 'Smart Leak Detector Demonstration',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400',
        category: 'Tech'
      }
    ],
    socials: {
      tiktok: 'https://tiktok.com/@emilytechugc',
      youtube: 'https://youtube.com/@emilycreates'
    },
    isFeatured: false,
    isVerified: false
  }
];
