'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { brandDashboardData } from '@/data/dashboard';
import { mockCreators } from '@/data/creators';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import {
  CheckCircle2, Play, Users, MessageSquare, ShieldCheck, Search,
  Briefcase, Star, MapPin, X, Heart, Sparkles, SlidersHorizontal,
  Eye, Send, Award, Phone, Mail, FileText, HelpCircle, ExternalLink,
  FolderOpen
} from 'lucide-react';
import BrandTalentMatchView from '../dashboard/components/BrandTalentMatchView';

// Seed mock agencies list
const mockAgencies = [
  {
    id: 'agency-1',
    name: 'Vibe UGC Agency',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=200',
    domain: 'ugc',
    category: 'UGC Creator',
    poolSize: '45+ Creators',
    location: 'Mumbai, India',
    rating: 4.9,
    completedCampaigns: 120,
    startingBudget: { INR: 40000, USD: 500 },
    specialties: ['TikTok/Reels Ads', 'Product Hooks', 'Creator Sourcing', 'Ad Strategy'],
    clients: ['Mamaearth', 'boAt', 'Mama Organics'],
    description: 'Top-tier creative agency delivering organic-style video ads that convert. Specializing in lifestyle, beauty, and app demonstrations.'
  },
  {
    id: 'agency-2',
    name: 'Luminate Media',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200',
    domain: 'social_media',
    category: 'Social Media Management',
    poolSize: '80+ Creators',
    location: 'New York, USA',
    rating: 4.8,
    completedCampaigns: 310,
    startingBudget: { INR: 80000, USD: 1000 },
    specialties: ['Instagram Growth', 'TikTok Strategy', 'Daily Engagement', 'Content Calendars'],
    clients: ['Duolingo', 'Gymshark', 'Vercel'],
    description: 'Data-driven short-form content agency focused on maximizing ROI. We handle everything from script creation to editing and post-analytics.'
  },
  {
    id: 'agency-3',
    name: 'Studio Spark',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=200',
    domain: 'ugc',
    category: 'Food & Wellness UGC',
    poolSize: '25+ Creators',
    location: 'London, UK',
    rating: 5.0,
    completedCampaigns: 64,
    startingBudget: { INR: 50000, USD: 600 },
    specialties: ['Aesthetic Recipes', 'Wellness Routines', 'Stop-Motion', 'Eco Styling'],
    clients: ['Lululemon', 'Whole Foods', 'Rituals'],
    description: 'Bespoke content studio specializing in aesthetic storytelling, recipe videos, and organic wellness routines.'
  },
  {
    id: 'agency-4',
    name: 'Focus & Frame Studio',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=200',
    domain: 'photography',
    category: 'Photography Studio',
    poolSize: '12+ Photographers',
    location: 'Mumbai, India',
    rating: 4.8,
    completedCampaigns: 145,
    startingBudget: { INR: 25000, USD: 300 },
    specialties: ['Product Photography', 'Studio Shoots', 'Outdoor Lookbooks', 'Editorial Retouching'],
    clients: ['Vogue India', 'Zara', 'Nykaa'],
    description: 'Premium commercial photography studio catering to fashion lookbooks, catalog shoots, and high-end product styling.'
  },
  {
    id: 'agency-5',
    name: 'CinemaCraft Productions',
    logo: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=200',
    domain: 'production_house',
    category: 'Production House',
    poolSize: '30+ Videographers',
    location: 'Los Angeles, USA',
    rating: 4.9,
    completedCampaigns: 210,
    startingBudget: { INR: 120000, USD: 1500 },
    specialties: ['Commercial Ads', 'Brand Storytelling', 'Cinematic Shoots', 'Post-Production'],
    clients: ['Mercedes Benz', 'Nike', 'Netflix'],
    description: 'Full-service video production company producing cinematic TV ads, digital web commercials, and premium corporate narratives.'
  },
  {
    id: 'agency-6',
    name: 'Nebula VFX Labs',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    domain: 'vfx',
    category: 'VFX Agency',
    poolSize: '18+ CGI Artists',
    location: 'London, UK',
    rating: 5.0,
    completedCampaigns: 88,
    startingBudget: { INR: 95000, USD: 1200 },
    specialties: ['CGI Product Renders', '3D Motion Graphics', 'Green Screen Compositing', 'Immersive Animations'],
    clients: ['Samsung', 'Intel', 'PlayStation'],
    description: 'Specialized visual effects and CGI studio turning static product ideas into futuristic, photorealistic animations and simulations.'
  },
  {
    id: 'agency-7',
    name: 'Peak Brand Communications',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=200',
    domain: 'advertising',
    category: 'Advertising Agency',
    poolSize: '35+ Marketers',
    location: 'Mumbai, India',
    rating: 4.8,
    completedCampaigns: 290,
    startingBudget: { INR: 60000, USD: 750 },
    specialties: ['Media Buying', 'Google/Meta PPC Ads', 'Growth Marketing', 'Copywriting & Concepting'],
    clients: ['HDFC Bank', 'Flipkart', 'Unacademy'],
    description: 'Creative and performance advertising agency planning integrated digital marketing strategies, copy, and cross-channel campaign runs.'
  },
  {
    id: 'agency-8',
    name: 'Luminate Outdoor (DOOH)',
    logo: 'https://images.unsplash.com/photo-1572945281869-9739d7881c12?auto=format&fit=crop&q=80&w=200',
    domain: 'billboard',
    category: 'Digital Billboard Company',
    poolSize: '15+ Planners',
    location: 'New York, USA',
    rating: 4.9,
    completedCampaigns: 75,
    startingBudget: { INR: 160000, USD: 2000 },
    specialties: ['DOOH Placement', '3D Anamorphic Billboards', 'Urban Interactive Ads', 'Location-Targeted Outdoor'],
    clients: ['Apple', 'Disney', 'Hyundai'],
    description: 'Next-gen digital out-of-home (DOOH) advertiser specializing in hyper-visible 3D anamorphic billboards in premium metropolitan spaces.'
  }
];

interface Applicant {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTitle: string;
  gigTitle: string;
  gigId: string;
  pitch: string;
  rate: { INR: number; USD: number };
  appliedAt: string;
  status: 'pending' | 'shortlisted' | 'unlocked' | string;
}

function ApplicantsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();

  // Tab View Configuration
  const currentView = searchParams.get('view') || 'talent';

  // State configurations
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [activeUnlock, setActiveUnlock] = useState<Applicant | null>(null);
  
  // Talent states
  const [searchQuery, setSearchQuery] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [shortlistedCreators, setShortlistedCreators] = useState<string[]>([]);
  
  // Agency states
  const [agencySearchQuery, setAgencySearchQuery] = useState('');
  const [agencyDomainFilter, setAgencyDomainFilter] = useState('all');
  const [agencyLocationFilter, setAgencyLocationFilter] = useState('all');
  const [agencySortBy, setAgencySortBy] = useState('rating');
  const [inquireAgency, setInquireAgency] = useState<any | null>(null);
  const [inquiryGoal, setInquiryGoal] = useState('');
  const [inquiryBudget, setInquiryBudget] = useState('');
  const [inquiryDetails, setInquiryDetails] = useState('');
  
  // Modal configurations
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [inviteCreator, setInviteCreator] = useState<any | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Theme alignment
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
      if (currentTheme) setTheme(currentTheme);
    };
    window.addEventListener('igigster-theme-change', handleThemeChange);

    // Seed/Load Applicants
    const localApps = localStorage.getItem('igigster_brand_applicants');
    if (localApps) {
      setApplicants(JSON.parse(localApps));
    } else {
      setApplicants(brandDashboardData.applicants);
    }

    // Load shortlisted creators
    const localShortlist = localStorage.getItem('igigster_shortlisted_creators');
    if (localShortlist) {
      setShortlistedCreators(JSON.parse(localShortlist));
    }

    return () => window.removeEventListener('igigster-theme-change', handleThemeChange);
  }, []);

  const handleTabChange = (viewName: string) => {
    router.push(`/brand/applicants?view=${viewName}`);
  };

  // Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Applicants Actions
  const handleShortlistApplicant = (id: string) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, status: 'shortlisted' };
      }
      return app;
    });
    setApplicants(updated);
    localStorage.setItem('igigster_brand_applicants', JSON.stringify(updated));
    triggerToast('Creator shortlisted successfully!');
  };

  const handleUnlockConnection = (id: string) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, status: 'unlocked' };
      }
      return app;
    });
    setApplicants(updated);
    localStorage.setItem('igigster_brand_applicants', JSON.stringify(updated));
    setActiveUnlock(null);
    triggerToast('Contact details unlocked successfully!');

    // Dispatch update notification
    window.dispatchEvent(new Event('brand-profile-updated'));
  };

  // Shortlist Creator Directory
  const toggleShortlistCreator = (creatorId: string) => {
    let updated;
    if (shortlistedCreators.includes(creatorId)) {
      updated = shortlistedCreators.filter(id => id !== creatorId);
      triggerToast('Removed from saved list.');
    } else {
      updated = [...shortlistedCreators, creatorId];
      triggerToast('Added to saved list.');
    }
    setShortlistedCreators(updated);
    localStorage.setItem('igigster_shortlisted_creators', JSON.stringify(updated));
  };

  // Invite Creator Directory
  const handleInviteCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId || !inviteCreator) return;
    const gig = brandDashboardData.gigs.find(g => g.id === selectedCampaignId);
    triggerToast(`Invitation sent to ${inviteCreator.name} for "${gig?.title || 'Campaign Brief'}"!`);
    setInviteCreator(null);
    setSelectedCampaignId('');
  };

  // Filtered Creators calculation
  const filteredCreators = mockCreators
    .filter(creator => {
      // Search query filter
      const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Niche filter
      let matchesNiche = true;
      if (nicheFilter !== 'all') {
        matchesNiche = creator.category === nicheFilter;
      }

      // Location filter
      let matchesLocation = true;
      if (locationFilter !== 'all') {
        const loc = creator.location.toLowerCase();
        if (locationFilter === 'india') matchesLocation = loc.includes('india') || loc.includes('mumbai') || loc.includes('bangalore');
        else if (locationFilter === 'usa') matchesLocation = loc.includes('usa') || loc.includes('angeles') || loc.includes('york');
        else if (locationFilter === 'uk') matchesLocation = loc.includes('uk') || loc.includes('london');
      }

      return matchesSearch && matchesNiche && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'jobs') return b.completedJobs - a.completedJobs;
      if (sortBy === 'rate_asc') {
        const rateA = (currency === 'INR' ? a.startingRate.INR : a.startingRate.USD) || 0;
        const rateB = (currency === 'INR' ? b.startingRate.INR : b.startingRate.USD) || 0;
        return rateA - rateB;
      }
      if (sortBy === 'rate_desc') {
        const rateA = (currency === 'INR' ? a.startingRate.INR : a.startingRate.USD) || 0;
        const rateB = (currency === 'INR' ? b.startingRate.INR : b.startingRate.USD) || 0;
        return rateB - rateA;
      }
      return 0;
    });

  // Filtered Agencies calculation
  const filteredAgencies = mockAgencies
    .filter(agency => {
      // Search filter
      const matchesSearch = agency.name.toLowerCase().includes(agencySearchQuery.toLowerCase()) ||
        agency.category.toLowerCase().includes(agencySearchQuery.toLowerCase()) ||
        agency.description.toLowerCase().includes(agencySearchQuery.toLowerCase()) ||
        agency.specialties.some(s => s.toLowerCase().includes(agencySearchQuery.toLowerCase()));

      // Domain filter
      let matchesDomain = true;
      if (agencyDomainFilter !== 'all') {
        matchesDomain = agency.domain === agencyDomainFilter;
      }

      // Location filter
      let matchesLocation = true;
      if (agencyLocationFilter !== 'all') {
        const loc = agency.location.toLowerCase();
        if (agencyLocationFilter === 'india') matchesLocation = loc.includes('india') || loc.includes('mumbai') || loc.includes('bangalore');
        else if (agencyLocationFilter === 'usa') matchesLocation = loc.includes('usa') || loc.includes('york') || loc.includes('angeles');
        else if (agencyLocationFilter === 'uk') matchesLocation = loc.includes('uk') || loc.includes('london');
      }

      return matchesSearch && matchesDomain && matchesLocation;
    })
    .sort((a, b) => {
      if (agencySortBy === 'rating') return b.rating - a.rating;
      if (agencySortBy === 'campaigns') return b.completedCampaigns - a.completedCampaigns;
      if (agencySortBy === 'budget_asc') {
        const budgetA = (currency === 'INR' ? a.startingBudget.INR : a.startingBudget.USD) || 0;
        const budgetB = (currency === 'INR' ? b.startingBudget.INR : b.startingBudget.USD) || 0;
        return budgetA - budgetB;
      }
      if (agencySortBy === 'budget_desc') {
        const budgetA = (currency === 'INR' ? a.startingBudget.INR : a.startingBudget.USD) || 0;
        const budgetB = (currency === 'INR' ? b.startingBudget.INR : b.startingBudget.USD) || 0;
        return budgetB - budgetA;
      }
      return 0;
    });

  const isLight = theme === 'light';

  // Design Variables
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const shadowStyle = 'var(--shadow-style)';
  const accentColor = '#EC4899';

  // Dynamic header based on active view
  const getHeaderInfo = () => {
    switch (currentView) {
      case 'agencies':
        return {
          title: 'Find Agencies',
          subtitle: 'Partner with top-tier agencies for photography, SMM, VFX, advertising, and digital billboards.'
        };
      case 'applicants':
        return {
          title: 'Campaign Applicants',
          subtitle: 'Review and evaluate creators who have applied to your active campaign briefs.'
        };
      case 'talent-match':
        return {
          title: 'AI Talent Match',
          subtitle: 'Match and sort creator profiles automatically based on target demographics and brief keyword alignment.'
        };
      case 'talent':
      default:
        return {
          title: 'Find Talent',
          subtitle: 'Browse and hire vetted UGC creators, influencers, and videographers.'
        };
    }
  };
  const headerInfo = getHeaderInfo();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Header Info */}
      {currentView !== 'talent-match' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em' }}>{headerInfo.title}</h1>
              <p style={{ color: secondaryText, fontSize: '13px', marginTop: '6px' }}>
                {headerInfo.subtitle}
              </p>
            </div>
          </div>

          <div style={{ borderBottom: `1px solid ${borderColor}`, opacity: 0.5 }} />
        </>
      )}

      {/* VIEW PANEL 1: BROWSE CREATORS (FIND TALENT) */}
      {currentView === 'talent' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Filters Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '16px 20px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            boxShadow: shadowStyle
          }}>
            {/* Search bar */}
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
              <input
                type="text"
                placeholder="Search creator name, niche, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: isLight ? '#F4F4F5' : '#131316',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  fontSize: '13px',
                  color: primaryText,
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                className="filter-input-field"
              />
            </div>

            {/* Dropdowns */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Niche Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Niche:</span>
                <select
                  value={nicheFilter}
                  onChange={(e) => setNicheFilter(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Specialties</option>
                  <option value="video_creator">Video Creators</option>
                  <option value="editor">Editors</option>
                  <option value="motion_designer">Motion Designers</option>
                </select>
              </div>

              {/* Location Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Location:</span>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Locations</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="rating">Rating ★</option>
                  <option value="jobs">Completed Jobs</option>
                  <option value="rate_asc">Rate: Low to High</option>
                  <option value="rate_desc">Rate: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Creators Directory Grid */}
          {filteredCreators.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {filteredCreators.map((creator) => {
                const isShortlisted = shortlistedCreators.includes(creator.id);
                return (
                  <div
                    key={creator.id}
                    className="glass-panel creator-card-hover"
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '20px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      boxShadow: shadowStyle,
                      transition: 'all 0.25s'
                    }}
                  >
                    {/* Top Row: Info & Shortlist Heart */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }}
                          />
                          {creator.isVerified && (
                            <span style={{
                              position: 'absolute',
                              bottom: '-2px',
                              right: '-2px',
                              backgroundColor: '#3B82F6',
                              color: '#ffffff',
                              borderRadius: '50%',
                              padding: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <ShieldCheck size={10} />
                            </span>
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>
                              {creator.name}
                            </h3>
                            {creator.isFeatured && (
                              <span style={{
                                backgroundColor: isLight ? '#FDF2F8' : 'rgba(236,72,153,0.1)',
                                color: '#EC4899',
                                fontSize: '8px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                letterSpacing: '0.04em'
                              }}>
                                TOP
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>
                            {creator.title}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleShortlistCreator(creator.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isShortlisted ? '#EC4899' : mutedText,
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.2s'
                        }}
                        className="scale-icon-hover"
                      >
                        <Heart size={18} fill={isShortlisted ? '#EC4899' : 'none'} />
                      </button>
                    </div>

                    {/* Meta Row: Rating, Location, Jobs */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11.5px', color: secondaryText }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EAB308', fontWeight: 600 }}>
                        <Star size={13} fill="#EAB308" /> {creator.rating.toFixed(1)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Briefcase size={13} /> {creator.completedJobs} campaigns
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {creator.location}
                      </span>
                    </div>

                    {/* Bio snippet */}
                    <p style={{ fontSize: '12.5px', color: secondaryText, lineHeight: 1.5, margin: 0 }}>
                      {creator.bio.length > 120 ? `${creator.bio.substring(0, 115)}...` : creator.bio}
                    </p>

                    {/* Skills inline list */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {creator.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 500,
                            color: isLight ? '#4F46E5' : '#818CF8',
                            backgroundColor: isLight ? '#EEF2FF' : 'rgba(79, 70, 229, 0.1)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: `1px solid ${isLight ? '#E0E7FF' : 'rgba(79, 70, 229, 0.15)'}`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Portfolio Reel Section */}
                    {creator.portfolio && creator.portfolio.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 650, color: mutedText, textTransform: 'uppercase' }}>
                          Video Portfolio Reel ({creator.portfolio.length})
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          {creator.portfolio.map((clip) => (
                            <div
                              key={clip.id}
                              onClick={() => setActiveVideoUrl(clip.videoUrl)}
                              style={{
                                position: 'relative',
                                height: '70px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: `1px solid ${borderColor}`
                              }}
                              className="video-clip-wrapper"
                            >
                              <img
                                src={clip.thumbnailUrl}
                                alt={clip.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                className="video-thumbnail"
                              />
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <span style={{
                                  backgroundColor: 'rgba(255,255,255,0.2)',
                                  backdropFilter: 'blur(4px)',
                                  borderRadius: '50%',
                                  padding: '4px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff'
                                }}>
                                  <Play size={12} fill="#ffffff" />
                                </span>
                              </div>
                              <span style={{
                                position: 'absolute',
                                bottom: '3px',
                                left: '4px',
                                fontSize: '8.5px',
                                fontWeight: 700,
                                backgroundColor: 'rgba(0,0,0,0.65)',
                                color: '#ffffff',
                                padding: '1px 4px',
                                borderRadius: '3px'
                              }}>
                                {clip.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ borderTop: `1px solid ${borderColor}`, margin: '8px 0 0 0' }} />

                    {/* Starting Rate & Direct Invite Action */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Starting rate</span>
                        <strong style={{ fontSize: '15px', color: primaryText, fontWeight: 750 }}>
                          {displayPrice(creator.startingRate, currency)}
                        </strong>
                      </div>

                      <button
                        onClick={() => setInviteCreator(creator)}
                        style={{
                          backgroundColor: 'rgba(236,72,153,0.08)',
                          border: '1.5px solid #EC4899',
                          color: '#EC4899',
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        className="invite-hover-glow"
                      >
                        <Send size={12} />
                        <span>Invite to Brief</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`
            }}>
              <Search size={32} style={{ color: mutedText, marginBottom: '12px' }} />
              <p style={{ color: secondaryText, fontSize: '14px', margin: 0 }}>No creators match your query or filters.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW PANEL 2: CAMPAIGN APPLICANTS (EVALUATION PANEL) */}
      {currentView === 'applicants' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: secondaryText, fontWeight: 500 }}>
              Showing {applicants.length} creator applications submitted to your active briefs.
            </span>
          </div>

          {applicants.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {applicants.map((appl) => (
                <div
                  key={appl.id}
                  className="glass-panel"
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '20px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: shadowStyle
                  }}
                >
                  {/* Creator Info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img
                        src={appl.creatorAvatar}
                        alt={appl.creatorName}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }}
                      />
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>
                          {appl.creatorName}
                        </h3>
                        <span style={{ color: isLight ? '#4F46E5' : '#818CF8', fontSize: '11.5px', marginTop: '2px', display: 'block' }}>
                          {appl.creatorTitle}
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '15px', fontWeight: 750, color: primaryText, display: 'block' }}>
                        {displayPrice(appl.rate, currency)}
                      </span>
                      <span style={{ color: mutedText, fontSize: '10px' }}>Bid rate card</span>
                    </div>
                  </div>

                  {/* Campaign Reference Tag */}
                  <div style={{
                    backgroundColor: isLight ? '#F4F4F5' : '#141416',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    fontSize: '12px',
                    color: secondaryText
                  }}>
                    Applied brief: <strong style={{ color: primaryText }}>{appl.gigTitle}</strong>
                  </div>

                  {/* Proposal Pitch Text */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Proposal Pitch
                    </span>
                    <p style={{ color: secondaryText, fontSize: '13px', lineHeight: 1.6, margin: 0, paddingLeft: '8px', borderLeft: `2.5px solid ${isLight ? '#E5E7EB' : '#27272A'}` }}>
                      "{appl.pitch}"
                    </p>
                  </div>

                  {/* Action Buttons Row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: `1px solid ${borderColor}`,
                    paddingTop: '16px',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <span style={{ fontSize: '11.5px', color: mutedText }}>
                      Applied {new Date(appl.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {appl.status === 'pending' && (
                        <button
                          onClick={() => handleShortlistApplicant(appl.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1.5px solid ${borderColor}`,
                            color: primaryText,
                            padding: '7px 14px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 650,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          className="hover-white-bg"
                        >
                          Shortlist Creator
                        </button>
                      )}

                      {appl.status === 'shortlisted' && (
                        <button
                          onClick={() => setActiveUnlock(appl)}
                          style={{
                            backgroundColor: '#EC4899',
                            color: '#ffffff',
                            padding: '7px 14px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(236,72,153,0.2)',
                            transition: 'transform 0.2s'
                          }}
                          className="glow-button"
                        >
                          Unlock Contact Details ({currency === 'INR' ? '₹99' : '$2'})
                        </button>
                      )}

                      {appl.status === 'unlocked' && (
                        <div style={{
                          fontSize: '12.5px',
                          color: '#10B981',
                          fontWeight: 700,
                          backgroundColor: 'rgba(16,185,129,0.08)',
                          border: '1px solid rgba(16,185,129,0.15)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <CheckCircle2 size={14} />
                          <span>Coordinates: ananya.sharma@ugc.com • +91 9988776655</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`
            }}>
              <p style={{ color: secondaryText, fontSize: '14px', margin: 0 }}>
                No active creator pitches have been submitted yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* VIEW PANEL 3: FIND AGENCIES */}
      {currentView === 'agencies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Agency Filters Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '16px 20px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            boxShadow: shadowStyle
          }}>
            {/* Search bar */}
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
              <input
                type="text"
                placeholder="Search agency name, specialties, description..."
                value={agencySearchQuery}
                onChange={(e) => setAgencySearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: isLight ? '#F4F4F5' : '#131316',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  fontSize: '13px',
                  color: primaryText,
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                className="filter-input-field"
              />
            </div>

            {/* Dropdowns */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Domain classification filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Classification:</span>
                <select
                  value={agencyDomainFilter}
                  onChange={(e) => setAgencyDomainFilter(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Domains</option>
                  <option value="photography">Photography Studios</option>
                  <option value="production_house">Production Houses</option>
                  <option value="vfx">VFX Agencies</option>
                  <option value="social_media">Social Media SMM</option>
                  <option value="advertising">Advertising Agencies</option>
                  <option value="billboard">Digital Billboard (DOOH)</option>
                  <option value="ugc">UGC Creator Agencies</option>
                </select>
              </div>

              {/* Location filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Location:</span>
                <select
                  value={agencyLocationFilter}
                  onChange={(e) => setAgencyLocationFilter(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Locations</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>

              {/* Sort filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 500 }}>Sort by:</span>
                <select
                  value={agencySortBy}
                  onChange={(e) => setAgencySortBy(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '12.5px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="rating">Rating ★</option>
                  <option value="campaigns">Completed Campaigns</option>
                  <option value="budget_asc">Budget: Low to High</option>
                  <option value="budget_desc">Budget: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Agencies Grid */}
          {filteredAgencies.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {filteredAgencies.map((agency) => {
                // Determine domain visual badge colors
                const getDomainStyle = (dom: string) => {
                  switch (dom) {
                    case 'photography':
                      return { color: '#EC4899', bg: isLight ? '#FDF2F8' : 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.15)' };
                    case 'production_house':
                      return { color: '#F97316', bg: isLight ? '#FFF7ED' : 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.15)' };
                    case 'vfx':
                      return { color: '#8B5CF6', bg: isLight ? '#F5F3FF' : 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.15)' };
                    case 'social_media':
                      return { color: '#10B981', bg: isLight ? '#ECFDF5' : 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' };
                    case 'advertising':
                      return { color: '#3B82F6', bg: isLight ? '#EFF6FF' : 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.15)' };
                    case 'billboard':
                      return { color: '#6366F1', bg: isLight ? '#EEF2FF' : 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.15)' };
                    case 'ugc':
                      return { color: '#14B8A6', bg: isLight ? '#E6FFFA' : 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.15)' };
                    default:
                      return { color: '#6B7280', bg: isLight ? '#F3F4F6' : 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.15)' };
                  }
                };
                const badgeStyle = getDomainStyle(agency.domain);

                return (
                  <div
                    key={agency.id}
                    className="glass-panel agency-card-hover"
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '20px',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      boxShadow: shadowStyle,
                      transition: 'all 0.25s'
                    }}
                  >
                    {/* Agency Branding info */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img
                        src={agency.logo}
                        alt={agency.name}
                        style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: `1px solid ${borderColor}` }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>
                            {agency.name}
                          </h3>
                          <span style={{
                            backgroundColor: '#3B82F6',
                            color: '#ffffff',
                            borderRadius: '50%',
                            padding: '1.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <ShieldCheck size={8} />
                          </span>
                        </div>
                        
                        {/* Domain Classification Badge */}
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: 700,
                          color: badgeStyle.color,
                          backgroundColor: badgeStyle.bg,
                          border: `1px solid ${badgeStyle.border}`,
                          padding: '1.5px 6px',
                          borderRadius: '5px',
                          display: 'inline-block',
                          marginTop: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em'
                        }}>
                          {agency.category}
                        </span>
                      </div>
                    </div>

                    {/* Rating & Size stats */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11.5px', color: secondaryText }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EAB308', fontWeight: 600 }}>
                        <Star size={13} fill="#EAB308" /> {agency.rating.toFixed(1)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} /> {agency.poolSize} Pool
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Briefcase size={13} /> {agency.completedCampaigns} campaigns
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {agency.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '12.5px', color: secondaryText, lineHeight: 1.5, margin: 0 }}>
                      {agency.description}
                    </p>

                    {/* Specialties Badges */}
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {agency.specialties.map((spec, spIdx) => (
                        <span
                          key={spIdx}
                          style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            color: isLight ? '#64748B' : '#9CA3AF',
                            backgroundColor: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.03)',
                            padding: '2.5px 7px',
                            borderRadius: '5px',
                            border: `1px solid ${borderColor}`
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Past Clients / Portfolios */}
                    {agency.clients && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: mutedText }}>
                        <span>Clients:</span>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {agency.clients.map((cl, clIdx) => (
                            <span key={clIdx} style={{
                              fontWeight: 600,
                              color: secondaryText,
                              backgroundColor: isLight ? '#E4E4E7' : '#27272A',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontSize: '10.5px'
                            }}>
                              {cl}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ borderTop: `1px solid ${borderColor}`, margin: '8px 0 0 0' }} />

                    {/* Budget & Collaboration button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Campaign packages from</span>
                        <strong style={{ fontSize: '15px', color: primaryText, fontWeight: 750 }}>
                          {displayPrice(agency.startingBudget, currency)}
                        </strong>
                      </div>

                      <button
                        onClick={() => setInquireAgency(agency)}
                        style={{
                          backgroundColor: 'rgba(79,70,229,0.06)',
                          border: '1.5px solid rgba(79,70,229,0.2)',
                          color: isLight ? '#4F46E5' : '#818CF8',
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s'
                        }}
                        className="agency-btn-hover"
                      >
                        <span>Contact Agency</span>
                        <ExternalLink size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`
            }}>
              <Search size={32} style={{ color: mutedText, marginBottom: '12px' }} />
              <p style={{ color: secondaryText, fontSize: '14px', margin: 0 }}>No agency partners match your filters.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW PANEL 4: AI TALENT MATCH */}
      {currentView === 'talent-match' && (
        <BrandTalentMatchView
          theme={theme}
          isLight={isLight}
          cardBg={cardBg}
          borderColor={borderColor}
          primaryText={primaryText}
          secondaryText={secondaryText}
          mutedText={mutedText}
          accentColor={accentColor}
          shadowStyle={shadowStyle}
        />
      )}

      {/* POPUP 1: PORTFOLIO VIDEO MODAL */}
      {activeVideoUrl && (
        <div
          onClick={() => setActiveVideoUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#000000',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <button
              onClick={() => setActiveVideoUrl(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={15} />
            </button>
            <video
              src={activeVideoUrl}
              controls
              autoPlay
              style={{ width: '100%', display: 'block', maxHeight: '72vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}

      {/* POPUP 2: INVITE TO CAMPAIGN MODAL */}
      {inviteCreator && (
        <div
          onClick={() => setInviteCreator(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              border: `1px solid ${borderColor}`,
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: primaryText, margin: 0 }}>Invite to Campaign</h2>
              <button
                onClick={() => setInviteCreator(null)}
                style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: secondaryText, fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
              Select which active campaign brief you want to invite <strong>{inviteCreator.name}</strong> to apply for.
            </p>

            <form onSubmit={handleInviteCreator} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                  Select Campaign Brief
                </span>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '42px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">-- Choose Campaign --</option>
                  {brandDashboardData.gigs.map((g) => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setInviteCreator(null)}
                  style={{
                    flex: 1,
                    height: '40px',
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${borderColor}`,
                    color: primaryText,
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedCampaignId}
                  style={{
                    flex: 2,
                    height: '40px',
                    backgroundColor: '#EC4899',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
                    opacity: selectedCampaignId ? 1 : 0.6
                  }}
                  className="glow-button"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 3: APPLICANT COORDINATE UNLOCK CONNECTION MODAL */}
      {activeUnlock && (
        <div
          onClick={() => setActiveUnlock(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '24px',
              border: `1px solid ${borderColor}`,
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Hiring unlock
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: primaryText, margin: 0 }}>
                Unlock Contact Coordinates
              </h2>
              <p style={{ color: secondaryText, fontSize: '12.5px', lineHeight: 1.5, margin: 0 }}>
                Pay a flat unlock connection fee to retrieve direct phone, email, and script worksheets for <strong>{activeUnlock.creatorName}</strong>.
              </p>
            </div>

            <div style={{
              backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${borderColor}`,
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '13px', color: secondaryText }}>Unlock connection fee:</span>
              <strong style={{ fontSize: '16px', color: '#EC4899' }}>
                {currency === 'INR' ? '₹99 INR' : '$2 USD'}
              </strong>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveUnlock(null)}
                style={{
                  flex: 1,
                  height: '40px',
                  backgroundColor: 'transparent',
                  border: `1.5px solid ${borderColor}`,
                  color: primaryText,
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 650,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnlockConnection(activeUnlock.id)}
                style={{
                  flex: 2,
                  height: '40px',
                  backgroundColor: '#EC4899',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(236,72,153,0.3)'
                }}
                className="glow-button"
              >
                Pay & Reveal Contact
              </button>
            </div>
          </div>
        </div>
      )}
      {/* POPUP 4: AGENCY INQUIRY & CONSULTATION MODAL */}
      {inquireAgency && (
        <div
          onClick={() => {
            setInquireAgency(null);
            setInquiryGoal('');
            setInquiryBudget('');
            setInquiryDetails('');
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '24px',
              border: `1px solid ${borderColor}`,
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={inquireAgency.logo} alt={inquireAgency.name} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: primaryText, margin: 0 }}>Consult {inquireAgency.name}</h2>
                  <span style={{ fontSize: '11px', color: secondaryText }}>{inquireAgency.category} Agency Partner</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setInquireAgency(null);
                  setInquiryGoal('');
                  setInquiryBudget('');
                  setInquiryDetails('');
                }}
                style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: secondaryText, fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
              Send an advertising brief or consultation inquiry to align on production scale, campaign goals, and budgets.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast(`Inquiry sent to ${inquireAgency.name}! They will review and contact you within 24 hours.`);
                setInquireAgency(null);
                setInquiryGoal('');
                setInquiryBudget('');
                setInquiryDetails('');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Inquiry Goal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                  What are you looking to build?
                </span>
                <select
                  value={inquiryGoal}
                  onChange={(e) => setInquiryGoal(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">-- Select Requirement Type --</option>
                  <option value="photography">Commercial Product Photography</option>
                  <option value="production">Full Production & Studio Filming</option>
                  <option value="vfx">CGI & 3D Render Advertising</option>
                  <option value="smm">Social Channel SMM & Content Routine</option>
                  <option value="dooh">3D Anamorphic Billboard (DOOH) Booking</option>
                  <option value="ugc">High-Scale UGC Creator Campaign</option>
                </select>
              </div>

              {/* Estimated Budget */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                  Estimated Campaign Budget
                </span>
                <select
                  value={inquiryBudget}
                  onChange={(e) => setInquiryBudget(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '0 12px',
                    fontSize: '13px',
                    color: primaryText,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">-- Select Budget Range --</option>
                  <option value="low">{currency === 'INR' ? '₹25,000 - ₹50,000' : '$300 - $600'}</option>
                  <option value="medium">{currency === 'INR' ? '₹50,000 - ₹1,50,000' : '$600 - $2,000'}</option>
                  <option value="high">{currency === 'INR' ? '₹1,50,000 - ₹3,00,000' : '$2,000 - $4,000'}</option>
                  <option value="custom">Enterprise / Custom Budget</option>
                </select>
              </div>

              {/* Campaign / Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                  Requirement Details & Timeline
                </span>
                <textarea
                  value={inquiryDetails}
                  onChange={(e) => setInquiryDetails(e.target.value)}
                  placeholder="Describe your creative requirements, target platforms, timeline, and deliverables..."
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    backgroundColor: isLight ? '#F4F4F5' : '#131316',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '13px',
                    color: primaryText,
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Form buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setInquireAgency(null);
                    setInquiryGoal('');
                    setInquiryBudget('');
                    setInquiryDetails('');
                  }}
                  style={{
                    flex: 1,
                    height: '40px',
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${borderColor}`,
                    color: primaryText,
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    height: '40px',
                    backgroundColor: '#EC4899',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.3)'
                  }}
                  className="glow-button"
                >
                  Send Inquiry Brief
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* TOAST SYSTEM POPUPS */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#09090B',
          color: '#ffffff',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '10px 16px',
          fontSize: '12.5px',
          fontWeight: 600,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 99999,
          animation: 'slideUp 0.2s ease-out'
        }}>
          <CheckCircle2 size={14} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      <style jsx global>{`
        /* TOGGLE BUTTON STYLE PILLS */
        .tab-toggle-button {
          background-color: transparent;
          color: var(--secondary-text);
        }
        .tab-toggle-button:hover {
          color: var(--primary-text);
          background-color: rgba(0, 0, 0, 0.03);
        }
        .dark-theme .tab-toggle-button:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }
        .tab-toggle-button.active {
          background-color: #FFFFFF;
          color: #09090B;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04);
        }
        .dark-theme .tab-toggle-button.active {
          background-color: #1C1C1F;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        /* CARD HOVERS */
        .creator-card-hover:hover {
          transform: translateY(-2px);
          border-color: rgba(236,72,153,0.3) !important;
        }
        .light-theme .creator-card-hover:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.03) !important;
        }
        .agency-card-hover:hover {
          transform: translateY(-2px);
          border-color: rgba(79,70,229,0.3) !important;
        }

        /* BUTTON EFFECTS */
        .glow-button:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
        }
        
        .invite-hover-glow:hover {
          background-color: #EC4899 !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 12px rgba(236,72,153,0.2);
          transform: translateY(-1px);
        }

        .agency-btn-hover:hover {
          background-color: rgba(79,70,229,0.12) !important;
          transform: translateY(-1px);
        }

        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }

        /* SCALE ICONS */
        .scale-icon-hover:hover {
          transform: scale(1.1);
        }

        /* VIDEO THUMB ANIMATION */
        .video-clip-wrapper:hover .video-thumbnail {
          transform: scale(1.05);
        }

        /* INPUT STATES */
        .filter-input-field:focus {
          border-color: rgba(236,72,153,0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default function BrandApplicantsPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--secondary-text)' }}>
        <span>Loading talent directory...</span>
      </div>
    }>
      <ApplicantsClient />
    </Suspense>
  );
}
