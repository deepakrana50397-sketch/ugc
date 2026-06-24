'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getApplications, updateApplicationStatus } from '@/lib/services';
import CreatorContractsView from './components/CreatorContractsView';
import CreatorCollabsView from './components/CreatorCollabsView';
import { Application } from '@/types/common';
import { 
  Search, Calendar, HelpCircle, ShieldAlert, Sparkles, 
  Bookmark, View, Info, ExternalLink, ChevronLeft, ChevronRight,
  User, Check, Filter, Clock, FileText, CheckCircle2, ChevronDown,
  Send, Star, MessageSquare, Download, X, Play, FileSpreadsheet
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

// Mock applications to seed and align with the metrics
const DEFAULT_24_APPLICATIONS: Application[] = [
  {
    id: 'app-mock-1',
    gigId: 'gig-mock-1',
    gigTitle: 'UGC Creator for Skincare Brand',
    brandId: 'brand-mock-1',
    brandName: 'Mamaearth',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hey team! I love Mamaearth products and use your sunscreen daily. I would love to make an Instagram reel highlighting your organic moisturizer, showing the light texture, quick absorption, and glow on camera. I have a professional softbox lighting setup and can deliver within 3 days.',
    portfolioLink: '',
    rate: { INR: 20000, USD: 250 },
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'shortlisted',
    brandCategory: 'Beauty',
    gigCategory: 'UGC • Instagram Reels',
    rateRange: { INR: '₹15,000 - ₹25,000', USD: '$180 - $300' },
    relativeDate: '2 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FDF2F8',
    brandLogoColor: '#EC4899',
    brandLogoText: 'M'
  } as any,
  {
    id: 'app-mock-2',
    gigId: 'gig-mock-2',
    gigTitle: 'Campus Ambassador Program',
    brandId: 'brand-mock-2',
    brandName: 'Swiggy',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hi Swiggy! As a college creator, I can drive massive engagement for the campus ambassador program. I plan to run campus food crawls and promote student discounts through reels. Let’s collaborate!',
    portfolioLink: '',
    rate: { INR: 8000, USD: 100 },
    appliedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    status: 'accepted', // Approved
    brandCategory: 'Food Delivery',
    gigCategory: 'Ambassador • College',
    rateRange: { INR: '₹8,000', USD: '$100' },
    relativeDate: '6 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FFF7ED',
    brandLogoColor: '#F97316',
    brandLogoText: 'S'
  } as any,
  {
    id: 'app-mock-3',
    gigId: 'gig-mock-3',
    gigTitle: 'Product Review - Tech Gadgets',
    brandId: 'brand-mock-3',
    brandName: 'boAt',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hey boAt! I would love to review your new noise-canceling headphones. I can create a crisp, high-audio-quality review showing active lifestyle usage, comfort, and bass test.',
    portfolioLink: '',
    rate: { INR: 12000, USD: 150 },
    appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    status: 'interview',
    brandCategory: 'Electronics',
    gigCategory: 'Review • YouTube',
    rateRange: { INR: '₹10,000 - ₹15,000', USD: '$120 - $180' },
    relativeDate: '8 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#F3F4F6',
    brandLogoColor: '#1F2937',
    brandLogoText: 'B'
  } as any,
  {
    id: 'app-mock-4',
    gigId: 'gig-mock-4',
    gigTitle: 'Food Reels Creator',
    brandId: 'brand-mock-4',
    brandName: 'Zomato',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hi Zomato! I specialize in food cinematography and lifestyle vlogs. I can create appetizing short videos highlighting local spots and delivery options for your handles.',
    portfolioLink: '',
    rate: { INR: 8000, USD: 100 },
    appliedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    status: 'pending', // Applied
    brandCategory: 'Food',
    gigCategory: 'Content • Instagram',
    rateRange: { INR: '₹6,000 - ₹10,000', USD: '$75 - $120' },
    relativeDate: '9 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FEF2F2',
    brandLogoColor: '#EF4444',
    brandLogoText: 'Z'
  } as any,
  {
    id: 'app-mock-5',
    gigId: 'gig-mock-5',
    gigTitle: 'Lifestyle Influencer Collaboration',
    brandId: 'brand-mock-5',
    brandName: 'Minimalist',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hello! As a skincare reviewer, I promote science-backed ingredients. I can shoot a morning skincare routine video featuring your serums.',
    portfolioLink: '',
    rate: { INR: 16000, USD: 200 },
    appliedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    status: 'rejected',
    brandCategory: 'Beauty',
    gigCategory: 'Reels • Instagram',
    rateRange: { INR: '₹12,000 - ₹20,000', USD: '$150 - $240' },
    relativeDate: '12 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#000000',
    brandLogoColor: '#FFFFFF',
    brandLogoText: 'M'
  } as any,
  {
    id: 'app-mock-6',
    gigId: 'gig-mock-6',
    gigTitle: 'Event Promotion - College Fest',
    brandId: 'brand-mock-6',
    brandName: 'Paytm',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creatorTitle: 'Beauty & Lifestyle UGC Creator',
    pitch: 'Hi Paytm! I can promote the fest ticket sales through payment discount reels and college campus story updates.',
    portfolioLink: '',
    rate: { INR: 6500, USD: 80 },
    appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    status: 'withdrawn',
    brandCategory: 'Finance',
    gigCategory: 'Promotion • Reels',
    rateRange: { INR: '₹5,000 - ₹8,000', USD: '$60 - $100' },
    relativeDate: '14 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#EFF6FF',
    brandLogoColor: '#3B82F6',
    brandLogoText: 'P'
  } as any,
  
  // 4 other shortlisted items (making a total of 5 shortlisted)
  {
    id: 'app-mock-7',
    gigId: 'gig-mock-7',
    gigTitle: 'Skincare Night Routine Showcase',
    brandId: 'brand-mock-7',
    brandName: 'LunaCare',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 12000, USD: 140 },
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'shortlisted',
    brandCategory: 'Beauty',
    gigCategory: 'UGC • Instagram',
    rateRange: { INR: '₹10,000 - ₹14,000', USD: '$120 - $170' },
    relativeDate: '3 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FAF5FF',
    brandLogoColor: '#A855F7',
    brandLogoText: 'L'
  } as any,
  {
    id: 'app-mock-8',
    gigId: 'gig-mock-8',
    gigTitle: 'Boho Chic Dress Lookbook Reel',
    brandId: 'brand-mock-8',
    brandName: 'BohoVibes',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 15000, USD: 180 },
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'shortlisted',
    brandCategory: 'Fashion',
    gigCategory: 'Lookbook • Reels',
    rateRange: { INR: '₹12,000 - ₹17,000', USD: '$140 - $210' },
    relativeDate: '5 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FFF7ED',
    brandLogoColor: '#F97316',
    brandLogoText: 'B'
  } as any,
  {
    id: 'app-mock-9',
    gigId: 'gig-mock-9',
    gigTitle: 'Cafeteria Vibe Vlog Creation',
    brandId: 'brand-mock-9',
    brandName: 'CafeSocial',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 8000, USD: 100 },
    appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'shortlisted',
    brandCategory: 'Food',
    gigCategory: 'Vlog • TikTok',
    rateRange: { INR: '₹7,000 - ₹10,000', USD: '$85 - $120' },
    relativeDate: '7 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FEF2F2',
    brandLogoColor: '#EF4444',
    brandLogoText: 'C'
  } as any,
  {
    id: 'app-mock-10',
    gigId: 'gig-mock-10',
    gigTitle: 'Aesthetic Product Reels for Candle Brand',
    brandId: 'brand-mock-10',
    brandName: 'Lumina Candles',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 5000, USD: 60 },
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'shortlisted',
    brandCategory: 'Decor',
    gigCategory: 'Reels • Instagram',
    rateRange: { INR: '₹4,000 - ₹6,000', USD: '$50 - $80' },
    relativeDate: '10 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FAF5FF',
    brandLogoColor: '#A855F7',
    brandLogoText: 'L'
  } as any,

  // 4 other approved items (making a total of 5 approved)
  {
    id: 'app-mock-11',
    gigId: 'gig-mock-11',
    gigTitle: 'Fitness Influencer Collaboration',
    brandId: 'brand-mock-11',
    brandName: 'FitLife India',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 16000, USD: 200 },
    appliedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'accepted',
    brandCategory: 'Health',
    gigCategory: 'Collab • Instagram',
    rateRange: { INR: '₹12,000 - ₹20,000', USD: '$150 - $240' },
    relativeDate: '11 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#F3F4F6',
    brandLogoColor: '#1F2937',
    brandLogoText: 'F'
  } as any,
  {
    id: 'app-mock-12',
    gigId: 'gig-mock-12',
    gigTitle: 'Aesthetic Coffee Making Reels',
    brandId: 'brand-mock-12',
    brandName: 'BlueTokai',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 9000, USD: 110 },
    appliedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'accepted',
    brandCategory: 'Beverages',
    gigCategory: 'Content • Reels',
    rateRange: { INR: '₹8,000 - ₹10,000', USD: '$100 - $130' },
    relativeDate: '13 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#EFF6FF',
    brandLogoColor: '#3B82F6',
    brandLogoText: 'B'
  } as any,
  {
    id: 'app-mock-13',
    gigId: 'gig-mock-13',
    gigTitle: 'Healthy Snack Reviews',
    brandId: 'brand-mock-13',
    brandName: 'YogaBar',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 7500, USD: 90 },
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'accepted',
    brandCategory: 'Food',
    gigCategory: 'Review • TikTok',
    rateRange: { INR: '₹7,000 - ₹9,000', USD: '$80 - $110' },
    relativeDate: '15 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FEF2F2',
    brandLogoColor: '#EF4444',
    brandLogoText: 'Y'
  } as any,
  {
    id: 'app-mock-14',
    gigId: 'gig-mock-14',
    gigTitle: 'Acoustic Guitar Cover Clips',
    brandId: 'brand-mock-14',
    brandName: 'Fender',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 18000, USD: 220 },
    appliedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'accepted',
    brandCategory: 'Music',
    gigCategory: 'Guitar • Cover',
    rateRange: { INR: '₹15,000 - ₹20,000', USD: '$180 - $250' },
    relativeDate: '17 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#F3F4F6',
    brandLogoColor: '#1F2937',
    brandLogoText: 'F'
  } as any,

  // 2 other interview items (making a total of 3 interview items)
  {
    id: 'app-mock-15',
    gigId: 'gig-mock-15',
    gigTitle: 'Sustainable Makeup Routine Video',
    brandId: 'brand-mock-15',
    brandName: 'EcoBeauty',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 13000, USD: 160 },
    appliedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'interview',
    brandCategory: 'Beauty',
    gigCategory: 'UGC • YouTube Shorts',
    rateRange: { INR: '₹10,000 - ₹15,000', USD: '$120 - $185' },
    relativeDate: '4 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#ECFDF5',
    brandLogoColor: '#10B981',
    brandLogoText: 'E'
  } as any,
  {
    id: 'app-mock-16',
    gigId: 'gig-mock-16',
    gigTitle: 'Gym Workout Routine Video',
    brandId: 'brand-mock-16',
    brandName: 'GoldGym',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 11000, USD: 130 },
    appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'interview',
    brandCategory: 'Health',
    gigCategory: 'Vlog • Reels',
    rateRange: { INR: '₹9,000 - ₹12,000', USD: '$110 - $145' },
    relativeDate: '7 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FFF7ED',
    brandLogoColor: '#F97316',
    brandLogoText: 'G'
  } as any,

  // 3 other rejected items (making a total of 4 rejected)
  {
    id: 'app-mock-17',
    gigId: 'gig-mock-17',
    gigTitle: 'Gym Supplement Review & Demo',
    brandId: 'brand-mock-17',
    brandName: 'GainzCorp',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 10000, USD: 120 },
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    brandCategory: 'Health',
    gigCategory: 'Review • Reels',
    rateRange: { INR: '₹9,000 - ₹12,000', USD: '$110 - $155' },
    relativeDate: '15 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FEF2F2',
    brandLogoColor: '#EF4444',
    brandLogoText: 'G'
  } as any,
  {
    id: 'app-mock-18',
    gigId: 'gig-mock-18',
    gigTitle: 'Lipstick Shade Swatches',
    brandId: 'brand-mock-18',
    brandName: 'NYX',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 6000, USD: 75 },
    appliedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    brandCategory: 'Beauty',
    gigCategory: 'Swatches • TikTok',
    rateRange: { INR: '₹5,000 - ₹7,000', USD: '$60 - $85' },
    relativeDate: '18 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FDF2F8',
    brandLogoColor: '#EC4899',
    brandLogoText: 'N'
  } as any,
  {
    id: 'app-mock-19',
    gigId: 'gig-mock-19',
    gigTitle: 'Active Wear Unboxing Video',
    brandId: 'brand-mock-19',
    brandName: 'Puma',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 9500, USD: 115 },
    appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    brandCategory: 'Apparel',
    gigCategory: 'Unboxing • Shorts',
    rateRange: { INR: '₹8,000 - ₹11,000', USD: '$95 - $130' },
    relativeDate: '20 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#000000',
    brandLogoColor: '#FFFFFF',
    brandLogoText: 'P'
  } as any,

  // 1 other withdrawn item (making a total of 2 withdrawn)
  {
    id: 'app-mock-20',
    gigId: 'gig-mock-20',
    gigTitle: 'Product Unboxing Vlog',
    brandId: 'brand-mock-20',
    brandName: 'Noise',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 7000, USD: 85 },
    appliedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'withdrawn',
    brandCategory: 'Gadgets',
    gigCategory: 'Vlog • YouTube',
    rateRange: { INR: '₹6,000 - ₹8,000', USD: '$70 - $100' },
    relativeDate: '19 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#EFF6FF',
    brandLogoColor: '#3B82F6',
    brandLogoText: 'N'
  } as any,

  // 4 other pending items (making a total of 5 pending/applied)
  {
    id: 'app-mock-21',
    gigId: 'gig-mock-21',
    gigTitle: '3D Logo Animation for Tech Startup',
    brandId: 'brand-mock-21',
    brandName: 'Apex Security',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 15000, USD: 180 },
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    brandCategory: 'Technology',
    gigCategory: 'Animation • YouTube',
    rateRange: { INR: '₹12,000 - ' + '₹18,000', USD: '$140 - $220' },
    relativeDate: '15 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#ECFDF5',
    brandLogoColor: '#10B981',
    brandLogoText: 'A'
  } as any,
  {
    id: 'app-mock-22',
    gigId: 'gig-mock-22',
    gigTitle: 'Smart Home Gadget Product Unboxing',
    brandId: 'brand-mock-22',
    brandName: 'CozyHome IoT',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 8000, USD: 100 },
    appliedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    brandCategory: 'Electronics',
    gigCategory: 'Unboxing • Instagram',
    rateRange: { INR: '₹7,000 - ' + '₹10,000', USD: '$85 - $120' },
    relativeDate: '16 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#F0FDFA',
    brandLogoColor: '#14B8A6',
    brandLogoText: 'C'
  } as any,
  {
    id: 'app-mock-23',
    gigId: 'gig-mock-23',
    gigTitle: 'Active Wear Review Video',
    brandId: 'brand-mock-23',
    brandName: 'PulseWear',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 9000, USD: 110 },
    appliedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    brandCategory: 'Apparel',
    gigCategory: 'Review • YouTube',
    rateRange: { INR: '₹8,000 - ' + '₹11,000', USD: '$90 - $130' },
    relativeDate: '17 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FFF1F2',
    brandLogoColor: '#F43F5E',
    brandLogoText: 'P'
  } as any,
  {
    id: 'app-mock-24',
    gigId: 'gig-mock-24',
    gigTitle: 'Glow Skin Sunscreen Showcase',
    brandId: 'brand-mock-24',
    brandName: 'PureGlow',
    creatorId: 'creator-1',
    creatorName: 'Neha Kapoor',
    rate: { INR: 7000, USD: 85 },
    appliedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    brandCategory: 'Beauty',
    gigCategory: 'UGC • TikTok',
    rateRange: { INR: '₹6,000 - ' + '₹9,000', USD: '$70 - $110' },
    relativeDate: '18 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=150&auto=format&fit=crop&q=60',
    brandLogoBg: '#FDF2F8',
    brandLogoColor: '#EC4899',
    brandLogoText: 'P'
  } as any
];

export default function CreatorApplicationsPage() {
  const { currency } = useCurrency();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isMyProjects = view === 'my-projects';

  const [applications, setApplications] = useState<Application[]>([]);
  const [activeUnlockApp, setActiveUnlockApp] = useState<Application | null>(null);
  
  // Interactive UI Filter States
  // Default to Approved tab if viewing projects
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'shortlisted' | 'interview' | 'approved' | 'rejected' | 'withdrawn'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'applied' | 'shortlisted' | 'interview' | 'approved' | 'rejected' | 'withdrawn'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'gig_title'>('newest');
  
  // Split-screen select details state
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Modal / Dropdown States
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  // Bookmarks state (persistent)
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  // Theme support
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme sync
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
      if (currentTheme) setTheme(currentTheme);
    };
    window.addEventListener('igigster-theme-change', handleThemeChange);

    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Initial applications seeding / fetching
    const stored = localStorage.getItem('igigster_applications');
    let parsed: Application[] = [];
    try {
      parsed = stored ? JSON.parse(stored) : [];
    } catch (e) {
      parsed = [];
    }

    // Checking for v3 seeding (to support 24 items with swiggy/boat/zomato)
    const hasMock = parsed.some(app => app.id === 'app-mock-1' && app.brandName === 'Mamaearth');
    if (parsed.length === 0 || !hasMock) {
      localStorage.setItem('igigster_applications', JSON.stringify(DEFAULT_24_APPLICATIONS));
      setApplications(DEFAULT_24_APPLICATIONS);
      setSelectedAppId('app-mock-1');
    } else {
      setApplications(parsed);
      setSelectedAppId(parsed[0]?.id || null);
    }

    // Bookmarks fetch
    const storedBookmarks = localStorage.getItem('igigster_app_bookmarks');
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('igigster-theme-change', handleThemeChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update default tab and selected item based on view query
  useEffect(() => {
    if (isMyProjects) {
      setActiveTab('approved');
      // Set first approved item as selected if available
      const approvedItems = applications.filter(a => a.status === 'accepted' || a.status === 'unlocked');
      if (approvedItems.length > 0) {
        setSelectedAppId(approvedItems[0].id);
      }
    } else {
      setActiveTab('all');
      if (applications.length > 0) {
        setSelectedAppId(applications[0].id);
      }
    }
    setCurrentPage(1);
  }, [isMyProjects, applications.length]);

  if (view === 'contracts') {
    return (
      <CreatorContractsView
        theme={theme}
        isLight={theme === 'light'}
        cardBg={theme === 'light' ? '#FFFFFF' : '#131316'}
        borderColor={theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}
        primaryText={theme === 'light' ? '#09090B' : '#FFFFFF'}
        secondaryText={theme === 'light' ? '#52525B' : '#A1A1AA'}
        mutedText={theme === 'light' ? '#71717A' : '#71717A'}
        accentColor="#EC4899"
        shadowStyle={theme === 'light' ? '0 1px 2px rgba(0,0,0,.04)' : 'none'}
      />
    );
  }

  if (view === 'collabs') {
    return (
      <CreatorCollabsView
        theme={theme}
        isLight={theme === 'light'}
        cardBg={theme === 'light' ? '#FFFFFF' : '#131316'}
        borderColor={theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}
        primaryText={theme === 'light' ? '#09090B' : '#FFFFFF'}
        secondaryText={theme === 'light' ? '#52525B' : '#A1A1AA'}
        mutedText={theme === 'light' ? '#71717A' : '#71717A'}
        accentColor="#EC4899"
        shadowStyle={theme === 'light' ? '0 1px 2px rgba(0,0,0,.04)' : 'none'}
      />
    );
  }

  const isLight = theme === 'light';

  // Theme styling definitions
  const cardBg = isLight ? '#FFFFFF' : '#131316';
  const borderColor = isLight ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const primaryText = isLight ? '#0F172A' : '#FFFFFF';
  const secondaryText = isLight ? '#4B5563' : '#A1A1AA';
  const mutedText = isLight ? '#9CA3AF' : '#71717A';
  const accentColor = '#EC4899';
  const pageBg = isLight ? '#F8F8FA' : '#09090B';

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click select
    const next = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem('igigster_app_bookmarks', JSON.stringify(next));
  };

  const handlePayConnectionFee = (appId: string) => {
    updateApplicationStatus(appId, 'accepted');
    // Reload local state from updated localStorage
    const stored = localStorage.getItem('igigster_applications');
    if (stored) {
      const updatedApps = JSON.parse(stored);
      setApplications(updatedApps);
      // Keep item selected
      const currentSelected = updatedApps.find((a: any) => a.id === appId);
      if (currentSelected) {
        setSelectedAppId(currentSelected.id);
      }
    }
    setActiveUnlockApp(null);
  };

  // Helper formatting for rate range based on active currency
  const formatRateRange = (app: any) => {
    if (app.rateRange) {
      return currency === 'INR' ? app.rateRange.INR : app.rateRange.USD;
    }
    const inrVal = app.rate?.INR || 0;
    const usdVal = app.rate?.USD || 0;
    return currency === 'INR' ? `₹${inrVal.toLocaleString()}` : `$${usdVal.toLocaleString()}`;
  };

  // Get dynamic counts for the metrics cards and tabs
  const countAll = applications.length;
  const countApplied = applications.filter(a => a.status === 'pending').length;
  const countShortlisted = applications.filter(a => a.status === 'shortlisted').length;
  const countInterview = applications.filter(a => a.status === 'interview').length;
  const countApproved = applications.filter(a => a.status === 'accepted' || a.status === 'unlocked').length;
  const countRejected = applications.filter(a => a.status === 'rejected').length;
  const countWithdrawn = applications.filter(a => a.status === 'withdrawn').length;

  // Filter application list based on Active Tab, Search Query, Status dropdown, Sort settings
  const filteredApplications = applications.filter(app => {
    // 1. Tab filter
    if (activeTab === 'applied' && app.status !== 'pending') return false;
    if (activeTab === 'shortlisted' && app.status !== 'shortlisted') return false;
    if (activeTab === 'interview' && app.status !== 'interview') return false;
    if (activeTab === 'approved' && app.status !== 'accepted' && app.status !== 'unlocked') return false;
    if (activeTab === 'rejected' && app.status !== 'rejected') return false;
    if (activeTab === 'withdrawn' && app.status !== 'withdrawn') return false;

    // 2. Status dropdown filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'applied' && app.status !== 'pending') return false;
      if (statusFilter === 'shortlisted' && app.status !== 'shortlisted') return false;
      if (statusFilter === 'interview' && app.status !== 'interview') return false;
      if (statusFilter === 'approved' && app.status !== 'accepted' && app.status !== 'unlocked') return false;
      if (statusFilter === 'rejected' && app.status !== 'rejected') return false;
      if (statusFilter === 'withdrawn' && app.status !== 'withdrawn') return false;
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = app.gigTitle.toLowerCase().includes(q);
      const matchBrand = app.brandName.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand) return false;
    }

    return true;
  }).sort((a, b) => {
    // 4. Sort settings
    if (sortBy === 'gig_title') {
      return a.gigTitle.localeCompare(b.gigTitle);
    }
    if (sortBy === 'oldest') {
      return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
    }
    // Default sort by newest applied date
    return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
  });

  // Calculate Paginated applications
  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / itemsPerPage));
  // Reset current page if it is out of range
  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginatedApplications = filteredApplications.slice(
    (validCurrentPage - 1) * itemsPerPage,
    validCurrentPage * itemsPerPage
  );

  // Selected application object
  const selectedApp = (applications.find(a => a.id === selectedAppId) || null) as any;

  // Status pills background & text colors
  const getStatusStyle = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
      case 'unlocked':
        return { bullet: '#10B981', bg: isLight ? '#E6FBF3' : 'rgba(16, 185, 129, 0.15)', color: '#10B981', label: 'Approved' };
      case 'shortlisted':
        return { bullet: '#F59E0B', bg: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.15)', color: '#D97706', label: 'Shortlisted' };
      case 'interview':
        return { bullet: '#8B5CF6', bg: isLight ? '#F5F3FF' : 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', label: 'Interview' };
      case 'rejected':
        return { bullet: '#EF4444', bg: isLight ? '#FEE2E2' : 'rgba(239, 68, 68, 0.15)', color: '#EF4444', label: 'Rejected' };
      case 'withdrawn':
        return { bullet: '#6B7280', bg: isLight ? '#F3F4F6' : 'rgba(107, 114, 128, 0.15)', color: '#6B7280', label: 'Withdrawn' };
      case 'pending':
      default:
        return { bullet: '#3B82F6', bg: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', label: 'Applied' };
    }
  };

  // Mock export handler
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Gig Title,Brand,Rate,Applied Date,Status"].join("\n") + "\n"
      + applications.map(app => `"${app.id}","${app.gigTitle}","${app.brandName}","${formatRateRange(app)}","${app.appliedAt}","${app.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `my_applications_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText }}>
      
      {/* Title Header with Export Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            {isMyProjects ? 'My Projects' : 'My Applications'}
          </h1>
          <p style={{ color: secondaryText, fontSize: '14px', marginTop: '6px', fontWeight: 400 }}>
            {isMyProjects ? 'Monitor active gig assignments and manage work delivery.' : "Track the status of gigs you've applied to."}
          </p>
        </div>
        <button
          onClick={handleExport}
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            padding: '10px 18px',
            borderRadius: '12px',
            color: primaryText,
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
            transition: 'all 0.2s'
          }}
          className="hover-opacity-90"
        >
          <Download size={15} />
          <span>Export</span>
        </button>
      </div>

      {/* Top Metrics Cards Row */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Card 1: Total Applied */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, padding: '18px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
          <div style={{ backgroundColor: isLight ? '#FFF2F8' : 'rgba(236,72,153,0.1)', color: '#EC4899', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <FileText size={18} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, lineHeight: 1.1 }}>24</div>
            <div style={{ fontSize: '12.5px', color: secondaryText, marginTop: '3px', fontWeight: 500 }}>Total Applied</div>
          </div>
        </div>

        {/* Card 2: Active */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, padding: '18px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
          <div style={{ backgroundColor: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.1)', color: '#D97706', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, lineHeight: 1.1 }}>8</div>
            <div style={{ fontSize: '12.5px', color: secondaryText, marginTop: '3px', fontWeight: 500 }}>Active</div>
          </div>
        </div>

        {/* Card 3: Approved */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, padding: '18px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
          <div style={{ backgroundColor: isLight ? '#E6FBF3' : 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <Check size={18} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, lineHeight: 1.1 }}>5</div>
            <div style={{ fontSize: '12.5px', color: secondaryText, marginTop: '3px', fontWeight: 500 }}>Approved</div>
          </div>
        </div>

        {/* Card 4: Rejected */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, padding: '18px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
          <div style={{ backgroundColor: isLight ? '#FEE2E2' : 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <X size={18} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, lineHeight: 1.1 }}>4</div>
            <div style={{ fontSize: '12.5px', color: secondaryText, marginTop: '3px', fontWeight: 500 }}>Rejected</div>
          </div>
        </div>

        {/* Card 5: Response Rate */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, padding: '18px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.01)' }}>
          <div style={{ backgroundColor: isLight ? '#F5F3FF' : 'rgba(139,92,246,0.1)', color: '#8B5CF6', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <Star size={18} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, lineHeight: 1.1 }}>21%</div>
            <div style={{ fontSize: '12.5px', color: secondaryText, marginTop: '3px', fontWeight: 500 }}>Response Rate</div>
          </div>
        </div>
      </div>

      {/* Tabs list menu */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, paddingBottom: '2px', overflowX: 'auto', gap: '24px' }} className="inner-scroller">
        {[
          { key: 'all', label: 'All', count: countAll },
          { key: 'applied', label: 'Applied', count: countApplied },
          { key: 'shortlisted', label: 'Shortlisted', count: countShortlisted },
          { key: 'interview', label: 'Interview', count: countInterview },
          { key: 'approved', label: 'Approved', count: countApproved },
          { key: 'rejected', label: 'Rejected', count: countRejected },
          { key: 'withdrawn', label: 'Withdrawn', count: countWithdrawn }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                setCurrentPage(1);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 4px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? accentColor : secondaryText,
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {tab.label} <span style={{ opacity: 0.7, fontSize: '12.5px' }}>({tab.count})</span>
              {isActive && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: accentColor,
                    borderRadius: '2px'
                  }} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Split-Screen layout container */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Column: List and Filters */}
        <div style={{ flex: '2 1 650px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Filters Control row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            
            {/* Search Input bar */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '380px' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: mutedText 
                }} 
              />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by gig title or brand"
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 40px',
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: cardBg,
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }} 
              />
            </div>

            {/* Right Buttons Filter & Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              
              {/* Filter dropdown */}
              <div ref={statusDropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: secondaryText,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Filter size={14} />
                  <span>
                    {statusFilter === 'all' 
                      ? 'Filter' 
                      : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </span>
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </button>

                {isStatusOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      zIndex: 100,
                      width: '150px',
                      padding: '4px'
                    }}
                  >
                    {[
                      { key: 'all', label: 'All Status' },
                      { key: 'applied', label: 'Applied' },
                      { key: 'shortlisted', label: 'Shortlisted' },
                      { key: 'interview', label: 'Interview' },
                      { key: 'approved', label: 'Approved' },
                      { key: 'rejected', label: 'Rejected' },
                      { key: 'withdrawn', label: 'Withdrawn' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setStatusFilter(opt.key as any);
                          setIsStatusOpen(false);
                          setCurrentPage(1);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: statusFilter === opt.key 
                            ? (isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)') 
                            : 'transparent',
                          color: primaryText,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        className="hover-bg-white-002"
                      >
                        <span>{opt.label}</span>
                        {statusFilter === opt.key && <Check size={12} style={{ color: accentColor }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort dropdown */}
              <div ref={sortDropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 650,
                    color: secondaryText,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>
                    Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Gig Title'}
                  </span>
                  <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </button>

                {isSortOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      zIndex: 100,
                      width: '140px',
                      padding: '4px'
                    }}
                  >
                    {[
                      { key: 'newest', label: 'Newest' },
                      { key: 'oldest', label: 'Oldest' },
                      { key: 'gig_title', label: 'Gig Title' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setSortBy(opt.key as any);
                          setIsSortOpen(false);
                          setCurrentPage(1);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: sortBy === opt.key 
                            ? (isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)') 
                            : 'transparent',
                          color: primaryText,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        className="hover-bg-white-002"
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.key && <Check size={12} style={{ color: accentColor }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Applications list table */}
          <div 
            style={{ 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.01)'
            }}
          >
            {/* Headers */}
            <div 
              style={{ 
                display: 'flex', 
                padding: '14px 24px', 
                borderBottom: `1px solid ${borderColor}`, 
                backgroundColor: isLight ? '#FAF9FB' : '#161619',
                fontSize: '12px', 
                fontWeight: 700, 
                color: secondaryText, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}
              className="desktop-only-flex"
            >
              <div style={{ flex: 4 }}>Gig / Brand</div>
              <div style={{ flex: 2 }}>Applied On</div>
              <div style={{ flex: 2 }}>Status</div>
              <div style={{ flex: 2, textAlign: 'right' }}>Action</div>
            </div>

            {/* Rows list */}
            {paginatedApplications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {paginatedApplications.map((app: any, idx) => {
                  const statusStyle = getStatusStyle(app.status);
                  const isBookmarked = bookmarks.includes(app.id);
                  const isApproved = app.status === 'accepted' || app.status === 'unlocked';
                  const isSelected = selectedAppId === app.id;

                  return (
                    <div 
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      style={{
                        display: 'flex',
                        padding: '16px 24px',
                        borderBottom: idx === paginatedApplications.length - 1 ? 'none' : `1px solid ${borderColor}`,
                        alignItems: 'center',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '12px',
                        backgroundColor: isSelected 
                          ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.04)') 
                          : 'transparent',
                        borderLeft: isSelected ? `3px solid ${accentColor}` : '3px solid transparent'
                      }}
                      className="hover-bg-white-001"
                    >
                      {/* Column 1: Gig/Brand thumbnail and info */}
                      <div style={{ flex: '4 1 240px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                        <img 
                          src={app.thumbnailUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=60'} 
                          alt="thumbnail" 
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            border: `1px solid ${borderColor}`
                          }} 
                        />
                        <div style={{ minWidth: 0 }}>
                          <h3 
                            style={{ 
                              fontSize: '14px', 
                              fontWeight: 700, 
                              color: primaryText, 
                              margin: 0, 
                              textOverflow: 'ellipsis', 
                              overflow: 'hidden', 
                              whiteSpace: 'nowrap' 
                            }}
                          >
                            {app.gigTitle}
                          </h3>
                          <span 
                            style={{ 
                              color: secondaryText, 
                              fontSize: '12.5px', 
                              display: 'block', 
                              marginTop: '2px',
                              fontWeight: 500
                            }}
                          >
                            {app.brandName}
                          </span>
                          <span 
                            style={{ 
                              color: secondaryText, 
                              fontSize: '12.5px', 
                              fontWeight: 650, 
                              display: 'block', 
                              marginTop: '3px' 
                            }}
                          >
                            {formatRateRange(app)}
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Applied Date */}
                      <div style={{ flex: '2 1 110px' }}>
                        <div style={{ fontSize: '13px', color: primaryText, fontWeight: 600 }}>
                          {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }) : 'Date unavailable'}
                        </div>
                        <div style={{ fontSize: '12px', color: secondaryText, marginTop: '2px' }}>
                          {app.relativeDate || 'Recently'}
                        </div>
                      </div>

                      {/* Column 3: Status bullet */}
                      <div style={{ flex: '2 1 110px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div 
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: statusStyle.bullet,
                            flexShrink: 0
                          }} 
                        />
                        <span 
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: secondaryText
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </div>

                      {/* Column 4: Actions */}
                      <div 
                        style={{ 
                          flex: '2 1 110px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'flex-end', 
                          gap: '10px' 
                        }}
                        onClick={(e) => e.stopPropagation()} // Stop selected parent triggers
                      >
                        <button
                          onClick={() => setSelectedAppId(app.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${isApproved ? '#FBCFE8' : borderColor}`,
                            color: isApproved ? accentColor : primaryText,
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                          }}
                          className="hover-opacity-80"
                        >
                          {isApproved ? 'Open Project' : 'View Details'}
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(app.id, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            color: isBookmarked ? accentColor : mutedText,
                            cursor: 'pointer',
                            display: 'flex',
                            transition: 'color 0.2s'
                          }}
                          title={isBookmarked ? 'Remove Bookmark' : 'Save Application'}
                        >
                          <Bookmark 
                            size={16} 
                            fill={isBookmarked ? accentColor : 'none'} 
                          />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <Info size={30} style={{ color: mutedText, margin: '0 auto 10px auto', display: 'block' }} />
                <p style={{ color: secondaryText, fontSize: '14.5px', fontWeight: 500, margin: 0 }}>
                  No applications found.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
              <button
                disabled={validCurrentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  padding: '6px',
                  borderRadius: '8px',
                  color: validCurrentPage === 1 ? mutedText : secondaryText,
                  cursor: validCurrentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: validCurrentPage === 1 ? 0.5 : 1
                }}
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const isSelected = validCurrentPage === pg;
                return (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: isSelected ? 'none' : `1px solid ${borderColor}`,
                      backgroundColor: isSelected ? accentColor : cardBg,
                      color: isSelected ? '#FFFFFF' : secondaryText,
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '12.5px',
                      cursor: 'pointer'
                    }}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                disabled={validCurrentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  padding: '6px',
                  borderRadius: '8px',
                  color: validCurrentPage === totalPages ? mutedText : secondaryText,
                  cursor: validCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: validCurrentPage === totalPages ? 0.5 : 1
                }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          <div style={{ fontSize: '13px', color: secondaryText, fontWeight: 500 }}>
            Showing {(validCurrentPage - 1) * itemsPerPage + 1} to {Math.min(validCurrentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
          </div>

        </div>

        {/* Right Column: Split-screen details panel */}
        {selectedApp && (
          <div 
            style={{ 
              flex: '1 1 350px', 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative'
            }}
          >
            {/* Header Close button and title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <h2 
                  style={{ 
                    fontSize: '17px', 
                    fontWeight: 800, 
                    color: primaryText, 
                    margin: 0,
                    lineHeight: 1.3
                  }}
                >
                  {selectedApp.gigTitle}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAppId(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: mutedText,
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                className="hover-bg-white-002"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selected item metadata card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src={selectedApp.thumbnailUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=60'} 
                alt="thumbnail" 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: `1px solid ${borderColor}`,
                  flexShrink: 0
                }}
              />
              <div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: primaryText, margin: 0 }}>
                  {selectedApp.brandName}
                </h4>
                <div style={{ fontSize: '13px', color: secondaryText, fontWeight: 700, marginTop: '4px' }}>
                  {formatRateRange(selectedApp)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: mutedText, marginTop: '4px' }}>
                  <MapPinWrapper size={11} />
                  <span>Remote</span>
                </div>
              </div>
            </div>

            {/* Application Status Timeline block */}
            <div 
              style={{ 
                border: `1px solid ${borderColor}`, 
                borderRadius: '12px', 
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>
                  Application Status
                </span>
                <span 
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: getStatusStyle(selectedApp.status).color,
                    backgroundColor: getStatusStyle(selectedApp.status).bg,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: getStatusStyle(selectedApp.status).bullet }} />
                  {getStatusStyle(selectedApp.status).label}
                </span>
              </div>
              
              <p style={{ fontSize: '12.5px', color: secondaryText, margin: 0, lineHeight: 1.45 }}>
                {selectedApp.status === 'shortlisted' && "Great! You've been shortlisted by the brand."}
                {selectedApp.status === 'accepted' && "Congratulations! Your application has been approved by the brand."}
                {selectedApp.status === 'unlocked' && "Congratulations! Your application has been approved by the brand."}
                {selectedApp.status === 'interview' && "Awesome! The brand wants to schedule an interview with you."}
                {selectedApp.status === 'pending' && "Your application has been submitted successfully."}
                {selectedApp.status === 'rejected' && "Unfortunately, the brand decided to proceed with other creators."}
                {selectedApp.status === 'withdrawn' && "You have withdrawn your application for this campaign."}
              </p>

              {/* Timeline graphic steps */}
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '24px', gap: '20px', marginTop: '6px' }}>
                
                {/* Connecting Line vertical bar */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '7px',
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    backgroundColor: isLight ? '#E5E7EB' : 'rgba(255,255,255,0.06)'
                  }} 
                />

                {/* Step 1: Applied */}
                <TimelineStep 
                  title="Applied" 
                  desc="You applied for this gig" 
                  date={selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Recently'} 
                  isPassed={true} 
                  isCurrent={selectedApp.status === 'pending'}
                  accentColor={accentColor}
                  mutedText={mutedText}
                  secondaryText={secondaryText}
                  primaryText={primaryText}
                />

                {/* Step 2: Viewed by Brand */}
                <TimelineStep 
                  title="Viewed by Brand" 
                  desc="Brand viewed your application" 
                  date={selectedApp.status !== 'pending' ? new Date(new Date(selectedApp.appliedAt).getTime() + 24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''} 
                  isPassed={selectedApp.status !== 'pending'} 
                  isCurrent={false}
                  accentColor={accentColor}
                  mutedText={mutedText}
                  secondaryText={secondaryText}
                  primaryText={primaryText}
                />

                {/* Step 3: Shortlisted */}
                <TimelineStep 
                  title="Shortlisted" 
                  desc="You've been shortlisted" 
                  date={['shortlisted', 'interview', 'accepted', 'unlocked'].includes(selectedApp.status) ? new Date(new Date(selectedApp.appliedAt).getTime() + 2*24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''} 
                  isPassed={['shortlisted', 'interview', 'accepted', 'unlocked'].includes(selectedApp.status)} 
                  isCurrent={selectedApp.status === 'shortlisted'}
                  accentColor={accentColor}
                  mutedText={mutedText}
                  secondaryText={secondaryText}
                  primaryText={primaryText}
                  isYellowIndicator={selectedApp.status === 'shortlisted'}
                />

                {/* Step 4: Interview */}
                <TimelineStep 
                  title="Interview" 
                  desc="Interview pending or scheduled" 
                  date={['interview', 'accepted', 'unlocked'].includes(selectedApp.status) ? new Date(new Date(selectedApp.appliedAt).getTime() + 3*24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''} 
                  isPassed={['interview', 'accepted', 'unlocked'].includes(selectedApp.status)} 
                  isCurrent={selectedApp.status === 'interview'}
                  accentColor={accentColor}
                  mutedText={mutedText}
                  secondaryText={secondaryText}
                  primaryText={primaryText}
                  isPurpleIndicator={selectedApp.status === 'interview'}
                />

                {/* Step 5: Approved */}
                <TimelineStep 
                  title="Approved" 
                  desc="Hired and project ready" 
                  date={['accepted', 'unlocked'].includes(selectedApp.status) ? new Date(new Date(selectedApp.appliedAt).getTime() + 4*24*60*60*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''} 
                  isPassed={['accepted', 'unlocked'].includes(selectedApp.status)} 
                  isCurrent={['accepted', 'unlocked'].includes(selectedApp.status)}
                  accentColor={accentColor}
                  mutedText={mutedText}
                  secondaryText={secondaryText}
                  primaryText={primaryText}
                  isGreenIndicator={['accepted', 'unlocked'].includes(selectedApp.status)}
                />

              </div>
            </div>

            {/* My Application pitch and attachments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', color: secondaryText, fontWeight: 650 }}>My Application</span>
                <button 
                  onClick={() => setShowCoverLetter(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: accentColor, 
                    fontWeight: 750, 
                    cursor: 'pointer', 
                    fontSize: '13px' 
                  }}
                >
                  View Cover Letter
                </button>
              </div>

              {/* Attachments (Video + PDF) */}
              <div>
                <span style={{ fontSize: '11.5px', color: mutedText, display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  Attachments (2)
                </span>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  
                  {/* Play Video icon attachment box */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: `1px solid ${borderColor}`, padding: '8px 12px', borderRadius: '8px', backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)' }}>
                    <div style={{ backgroundColor: '#F5F3FF', color: '#8B5CF6', padding: '4px', borderRadius: '6px', display: 'flex' }}>
                      <Play size={13} fill="#8B5CF6" />
                    </div>
                    <span style={{ fontSize: '11.5px', color: secondaryText, fontWeight: 500 }}>Intro.mp4</span>
                  </div>

                  {/* PDF doc attachment box */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: `1px solid ${borderColor}`, padding: '8px 12px', borderRadius: '8px', backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)' }}>
                    <div style={{ backgroundColor: '#FFF2F8', color: '#EC4899', padding: '4px', borderRadius: '6px', display: 'flex' }}>
                      <FileSpreadsheet size={13} />
                    </div>
                    <span style={{ fontSize: '11.5px', color: secondaryText, fontWeight: 500 }}>Resume.pdf</span>
                  </div>

                  {/* +1 more indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', padding: '8px 4px', fontSize: '11.5px', color: mutedText, fontWeight: 500 }}>
                    +1 more
                  </div>
                </div>
              </div>

            </div>

            {/* Verify shortlist button or Message Brand trigger */}
            {selectedApp.status === 'shortlisted' ? (
              <button
                onClick={() => setActiveUnlockApp(selectedApp)}
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#000000',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.25)',
                  transition: 'opacity 0.2s',
                  marginTop: 'auto'
                }}
                className="hover-opacity-90"
              >
                Verify Connection (INR 49 / $1)
              </button>
            ) : (
              <button
                onClick={() => alert(`Starting direct chat gateway with ${selectedApp.brandName} support...`)}
                style={{
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: `0 4px 12px ${isLight ? 'rgba(236,72,153,0.2)' : 'rgba(0,0,0,0.3)'}`,
                  transition: 'all 0.2s',
                  marginTop: 'auto'
                }}
                className="hover-opacity-90"
              >
                Message Brand
              </button>
            )}

          </div>
        )}

      </div>

      {/* Verification Shortlist Payment Drawer Modal */}
      {activeUnlockApp && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
        >
          <div 
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              maxWidth: '480px',
              width: '100%',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '32px',
              color: primaryText,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Secure Gateway
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Unlock Shortlist Connection</h2>
              <p style={{ color: secondaryText, fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                Pay the small shortlist validation fee to instantly retrieve email coordinates for <strong>{activeUnlockApp.brandName}</strong>.
              </p>
            </div>

            <div 
              style={{ 
                backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)', 
                padding: '16px', 
                borderRadius: '12px', 
                border: `1px solid ${borderColor}`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}
            >
              <span style={{ fontSize: '14px', color: secondaryText }}>Shortlist connection fee:</span>
              <strong style={{ fontSize: '18px', color: '#f59e0b', fontFamily: 'var(--font-display)' }}>
                {currency === 'INR' ? '₹49 INR' : '$1 USD'}
              </strong>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => setActiveUnlockApp(null)}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  color: secondaryText,
                  padding: '12px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13.5px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handlePayConnectionFee(activeUnlockApp.id)}
                style={{
                  flex: 2,
                  backgroundColor: '#f59e0b',
                  color: '#000000',
                  padding: '12px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
              >
                Pay & Unlock Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Letter View Dialog */}
      {showCoverLetter && selectedApp && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            padding: '24px',
          }}
        >
          <div 
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              maxWidth: '520px',
              width: '100%',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '28px',
              color: primaryText,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>Cover Letter Pitch</h3>
              <button
                onClick={() => setShowCoverLetter(false)}
                style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '13.5px', color: secondaryText, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
              "{selectedApp.pitch}"
            </p>
            <button
              onClick={() => setShowCoverLetter(false)}
              style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                alignSelf: 'flex-end',
                marginTop: '10px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Timeline Step component
interface TimelineStepProps {
  title: string;
  desc: string;
  date: string;
  isPassed: boolean;
  isCurrent: boolean;
  accentColor: string;
  mutedText: string;
  secondaryText: string;
  primaryText: string;
  isYellowIndicator?: boolean;
  isPurpleIndicator?: boolean;
  isGreenIndicator?: boolean;
}

function TimelineStep({
  title, desc, date, isPassed, isCurrent, accentColor,
  mutedText, secondaryText, primaryText, 
  isYellowIndicator, isPurpleIndicator, isGreenIndicator
}: TimelineStepProps) {
  
  // Icon style selection
  let dotBg = 'transparent';
  let dotBorder = '2px solid #9CA3AF';
  let dotColor = '#9CA3AF';
  let hasIcon = false;

  if (isPassed && !isCurrent) {
    dotBg = accentColor;
    dotBorder = `2px solid ${accentColor}`;
    dotColor = '#FFFFFF';
    hasIcon = true;
  } else if (isCurrent) {
    if (isYellowIndicator) {
      dotBg = '#F59E0B';
      dotBorder = '2px solid #F59E0B';
    } else if (isPurpleIndicator) {
      dotBg = '#8B5CF6';
      dotBorder = '2px solid #8B5CF6';
    } else if (isGreenIndicator) {
      dotBg = '#10B981';
      dotBorder = '2px solid #10B981';
    } else {
      dotBg = accentColor;
      dotBorder = `2px solid ${accentColor}`;
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', width: '100%' }}>
      {/* Circle Icon Bullet */}
      <div 
        style={{
          position: 'absolute',
          left: '-23px',
          top: '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: dotBg,
          border: dotBorder,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        {hasIcon && <Check size={10} style={{ strokeWidth: 3 }} />}
      </div>

      <div style={{ minWidth: 0 }}>
        <h5 style={{ fontSize: '13px', fontWeight: 700, color: isCurrent ? primaryText : (isPassed ? primaryText : secondaryText), margin: 0 }}>
          {title}
        </h5>
        <p style={{ fontSize: '11.5px', color: mutedText, margin: '2px 0 0 0', fontWeight: 500 }}>
          {desc}
        </p>
      </div>

      {date && (
        <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          {date}
        </span>
      )}
    </div>
  );
}

// Micro icons wraps to maintain safety
function MapPinWrapper({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
