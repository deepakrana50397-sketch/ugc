'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { applyToGig } from '@/lib/services';
import { 
  Search, Calendar, Star, Compass, Filter, ChevronDown, 
  ChevronRight, Bookmark, BadgeCheck, Bell, X, Check, MoreVertical, Info
} from 'lucide-react';

const MOCK_GIGS_DATA = [
  {
    id: 'gig-mock-1',
    title: 'UGC Creator for Skincare Brand',
    brandName: 'Mamaearth',
    slug: 'ugc-creator-for-skincare-brand',
    price: { INR: 20000, USD: 250 },
    rateRange: { INR: '₹15,000 - ₹25,000', USD: '$180 - $300' },
    isVerified: true,
    badge: 'NEW',
    badgeColor: '#EC4899',
    badgeBg: 'rgba(236,72,153,0.1)',
    location: 'Remote',
    deadline: 'Due in 7 days',
    tags: ['UGC Creator', 'Skincare', 'Hindi +1'],
    applicantsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=350&auto=format&fit=crop&q=60',
    jobType: 'Remote',
    category: 'UGC Creator'
  },
  {
    id: 'gig-mock-2',
    title: 'Product Review - Tech Gadgets',
    brandName: 'boAt',
    slug: 'product-review-tech-gadgets',
    price: { INR: 12500, USD: 150 },
    rateRange: { INR: '₹10,000 - ₹15,000', USD: '$120 - $180' },
    isVerified: true,
    badge: 'FEATURED',
    badgeColor: '#8B5CF6',
    badgeBg: 'rgba(139,92,246,0.1)',
    location: 'Remote',
    deadline: 'Due in 5 days',
    tags: ['Review', 'Tech', 'English'],
    applicantsCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=350&auto=format&fit=crop&q=60',
    jobType: 'Remote',
    category: 'Video & Reels'
  },
  {
    id: 'gig-mock-3',
    title: 'Instagram Reels - Fashion Brand',
    brandName: 'Myntra',
    slug: 'instagram-reels-fashion-brand',
    price: { INR: 10000, USD: 120 },
    rateRange: { INR: '₹8,000 - ₹12,000', USD: '$100 - $150' },
    isVerified: true,
    badge: 'NEW',
    badgeColor: '#EC4899',
    badgeBg: 'rgba(236,72,153,0.1)',
    location: 'Bangalore',
    deadline: 'Due in 4 days',
    tags: ['Reels', 'Fashion', 'Hindi +1'],
    applicantsCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=350&auto=format&fit=crop&q=60',
    jobType: 'Hybrid',
    category: 'UGC Creator'
  },
  {
    id: 'gig-mock-4',
    title: 'Campus Ambassador Program',
    brandName: 'Swiggy',
    slug: 'campus-ambassador-program',
    price: { INR: 8000, USD: 100 },
    rateRange: { INR: '₹5,000 - ₹10,000 / month', USD: '$60 - $120 / month' },
    isVerified: true,
    badge: 'HOT',
    badgeColor: '#F97316',
    badgeBg: 'rgba(249,115,22,0.1)',
    location: 'Multiple Cities',
    deadline: 'Due in 10 days',
    tags: ['Campus Ambassador', 'On-ground', 'Hindi'],
    applicantsCount: 26,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=350&auto=format&fit=crop&q=60',
    jobType: 'On-site',
    category: 'Influencer Marketing'
  },
  {
    id: 'gig-mock-5',
    title: 'Short Video Creator - YouTube Shorts',
    brandName: 'Zomato',
    slug: 'short-video-creator-youtube-shorts',
    price: { INR: 16000, USD: 200 },
    rateRange: { INR: '₹12,000 - ₹20,000', USD: '$140 - $240' },
    isVerified: true,
    badge: 'FEATURED',
    badgeColor: '#8B5CF6',
    badgeBg: 'rgba(139,92,246,0.1)',
    location: 'Remote',
    deadline: 'Due in 6 days',
    tags: ['YouTube Shorts', 'Food', 'English'],
    applicantsCount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=350&auto=format&fit=crop&q=60',
    jobType: 'Remote',
    category: 'Video & Reels'
  },
  {
    id: 'gig-mock-6',
    title: 'Event Coverage - College Fest',
    brandName: 'Red Bull',
    slug: 'event-coverage-college-fest',
    price: { INR: 11000, USD: 130 },
    rateRange: { INR: '₹7,000 - ₹15,000', USD: '$85 - $180' },
    isVerified: true,
    badge: 'NEW',
    badgeColor: '#EC4899',
    badgeBg: 'rgba(236,72,153,0.1)',
    location: 'Mumbai',
    deadline: 'Due in 8 days',
    tags: ['Event', 'Photography', 'Video'],
    applicantsCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=350&auto=format&fit=crop&q=60',
    jobType: 'On-site',
    category: 'Photography'
  }
];

export default function CreatorBrowseGigsPage() {
  const { currency } = useCurrency();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Sidebar filters
  const [sidebarCategory, setSidebarCategory] = useState('all');
  const [sidebarLocation, setSidebarLocation] = useState('all');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  // Bookmark / Save state
  const [savedGigs, setSavedGigs] = useState<string[]>([]);

  // Apply Modal state
  const [applyGig, setApplyGig] = useState<any | null>(null);
  const [pitch, setPitch] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dropdowns
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSidebarLocationOpen, setIsSidebarLocationOpen] = useState(false);

  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const sidebarCategoryRef = useRef<HTMLDivElement>(null);
  const sidebarLocationRef = useRef<HTMLDivElement>(null);

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
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (sidebarCategoryRef.current && !sidebarCategoryRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (sidebarLocationRef.current && !sidebarLocationRef.current.contains(event.target as Node)) {
        setIsSidebarLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Saved bookmarks sync
    const stored = localStorage.getItem('igigster_saved_gigs');
    if (stored) {
      try {
        setSavedGigs(JSON.parse(stored));
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('igigster-theme-change', handleThemeChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isLight = theme === 'light';

  // Theme styling definitions
  const cardBg = isLight ? '#FFFFFF' : '#131316';
  const borderColor = isLight ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const primaryText = isLight ? '#0F172A' : '#FFFFFF';
  const secondaryText = isLight ? '#4B5563' : '#A1A1AA';
  const mutedText = isLight ? '#9CA3AF' : '#71717A';
  const accentColor = '#EC4899';

  const toggleBookmark = (gigId: string) => {
    const next = savedGigs.includes(gigId)
      ? savedGigs.filter(id => id !== gigId)
      : [...savedGigs, gigId];
    setSavedGigs(next);
    localStorage.setItem('igigster_saved_gigs', JSON.stringify(next));
  };

  const handleApplyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch || !portfolioLink || !expectedRate || !applyGig) return;

    setIsSubmitting(true);
    const rateNum = parseFloat(expectedRate);
    let rateINR = 0;
    let rateUSD = 0;
    if (currency === 'INR') {
      rateINR = rateNum;
      rateUSD = Math.round(rateNum / 85);
    } else {
      rateUSD = rateNum;
      rateINR = Math.round(rateNum * 85);
    }

    setTimeout(() => {
      try {
        applyToGig({
          gigId: applyGig.id,
          pitch,
          portfolioLink,
          rate: { INR: rateINR, USD: rateUSD }
        });
        
        setIsSubmitting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setApplyGig(null);
          setIsSuccess(false);
          setPitch('');
          setPortfolioLink('');
          setExpectedRate('');
        }, 1800);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Main filter calculation over mock gigs
  const filteredGigs = MOCK_GIGS_DATA.filter(gig => {
    // 1. Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = gig.title.toLowerCase().includes(q);
      const matchBrand = gig.brandName.toLowerCase().includes(q);
      const matchTags = gig.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchTags) return false;
    }

    // 2. Search location selector
    if (locationFilter !== 'all') {
      if (gig.location.toLowerCase() !== locationFilter.toLowerCase()) return false;
    }

    // 3. Category badges filter
    if (activeCategory !== 'all') {
      if (gig.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
    }

    // 4. Sidebar Category Filter
    if (sidebarCategory !== 'all') {
      if (gig.category.toLowerCase() !== sidebarCategory.toLowerCase()) return false;
    }

    // 5. Sidebar Location Filter
    if (sidebarLocation !== 'all') {
      if (gig.location.toLowerCase() !== sidebarLocation.toLowerCase()) return false;
    }

    // 6. Sidebar Job type checkboxes
    if (selectedJobTypes.length > 0) {
      if (!selectedJobTypes.includes(gig.jobType)) return false;
    }

    // 7. Sidebar budget ranges
    const budgetVal = currency === 'INR' ? gig.price.INR : gig.price.USD;
    if (budgetMin && budgetVal < parseFloat(budgetMin)) return false;
    if (budgetMax && budgetVal > parseFloat(budgetMax)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'gig_title') return a.title.localeCompare(b.title);
    return 1; // standard list order
  });

  const clearAllFilters = () => {
    setSidebarCategory('all');
    setSidebarLocation('all');
    setBudgetMin('');
    setBudgetMax('');
    setSelectedJobTypes([]);
    setSearchQuery('');
    setLocationFilter('all');
    setActiveCategory('all');
  };

  // Overlay avatars
  const mockAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            Find Gigs
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Discover exciting opportunities and work with amazing brands.
          </p>
        </div>

        {/* Top Right Card: Get Gigs in Inbox */}
        <div 
          style={{ 
            backgroundColor: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: '16px', 
            padding: '14px 20px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            maxWidth: '420px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 750, color: primaryText, margin: 0 }}>
              Get gigs in your inbox
            </h3>
            <p style={{ fontSize: '12px', color: secondaryText, margin: '4px 0 0 0', lineHeight: 1.4 }}>
              Create alerts and never miss new opportunities.
            </p>
          </div>
          <button
            onClick={() => alert('Created alert successfully! We will notify you of matching briefs.')}
            style={{
              backgroundColor: isLight ? '#FFF2F8' : 'rgba(236,72,153,0.1)',
              border: `1px solid ${isLight ? '#FBCFE8' : 'rgba(236,72,153,0.2)'}`,
              color: '#EC4899',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
            className="hover-opacity-90"
          >
            <Bell size={13} />
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Search bar at top level */}
      <div 
        style={{ 
          display: 'flex', 
          border: `1px solid ${borderColor}`, 
          borderRadius: '12px', 
          overflow: 'visible', 
          backgroundColor: cardBg, 
          boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: mutedText 
            }} 
          />
          <input 
            type="text" 
            placeholder="Search gigs, brands, categories or skills" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px 14px 44px', 
              border: 'none', 
              backgroundColor: 'transparent', 
              color: primaryText, 
              fontSize: '14px', 
              outline: 'none' 
            }}
          />
        </div>
        
        {/* Location dropdown inside search box */}
        <div 
          ref={locationDropdownRef}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            borderLeft: `1px solid ${borderColor}`, 
            padding: '0 18px', 
            gap: '8px', 
            cursor: 'pointer',
            position: 'relative'
          }} 
          onClick={() => setIsLocationOpen(!isLocationOpen)}
        >
          <MapPinWrapper size={14} style={{ color: mutedText }} />
          <span style={{ fontSize: '13px', color: secondaryText, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {locationFilter === 'all' 
              ? 'All Locations' 
              : locationFilter}
          </span>
          <ChevronDown size={14} style={{ color: mutedText }} />

          {isLocationOpen && (
            <div
              style={{
                position: 'absolute',
                top: '105%',
                right: 0,
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                zIndex: 100,
                width: '160px',
                padding: '6px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {[
                { key: 'all', label: 'All Locations' },
                { key: 'remote', label: 'Remote' },
                { key: 'mumbai', label: 'Mumbai' },
                { key: 'bangalore', label: 'Bangalore' }
              ].map((loc) => (
                <button
                  key={loc.key}
                  onClick={() => {
                    setLocationFilter(loc.key);
                    setIsLocationOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: locationFilter === loc.key 
                      ? (isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)') 
                      : 'transparent',
                    color: primaryText,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  className="hover-bg-white-002"
                >
                  <span>{loc.label}</span>
                  {locationFilter === loc.key && <Check size={12} style={{ color: accentColor }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Category Badges Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }} className="inner-scroller">
        {[
          { key: 'all', label: 'All Categories' },
          { key: 'ugc creator', label: 'UGC Creator' },
          { key: 'influencer marketing', label: 'Influencer Marketing' },
          { key: 'video & reels', label: 'Video & Reels' },
          { key: 'photography', label: 'Photography' },
          { key: 'content writing', label: 'Content Writing' },
          { key: 'graphic design', label: 'Graphic Design' }
        ].map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                backgroundColor: isActive ? accentColor : 'transparent',
                border: `1px solid ${isActive ? accentColor : borderColor}`,
                color: isActive ? '#FFFFFF' : secondaryText,
                borderRadius: '24px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              className={isActive ? '' : 'hover-bg-white-001'}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Metadata Row: Count & Sort */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 650, color: primaryText }}>
          {filteredGigs.length === MOCK_GIGS_DATA.length ? '124' : filteredGigs.length} gigs found
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Sort by selector */}
          <div ref={sortDropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: secondaryText,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Sort by: {sortBy === 'newest' ? 'Newest' : 'Gig Title'}</span>
              <ChevronDown size={14} style={{ opacity: 0.6 }} />
            </button>

            {isSortOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  right: 0,
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  zIndex: 100,
                  width: '130px',
                  padding: '4px'
                }}
              >
                {[
                  { key: 'newest', label: 'Newest' },
                  { key: 'gig_title', label: 'Gig Title' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSortBy(opt.key);
                      setIsSortOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: sortBy === opt.key 
                        ? (isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)') 
                        : 'transparent',
                      color: primaryText,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    className="hover-bg-white-002"
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.key && <Check size={11} style={{ color: accentColor }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Action shortcut */}
          <button
            onClick={clearAllFilters}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              color: secondaryText,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>

        </div>
      </div>

      {/* Main Split Column (Filters on Left, Gigs on Right) */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Side: Saved Searches, Alerts and Filters Panel (approx 300px width) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Filters Sidebar Panel */}
          <div 
            style={{ 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Filters
              </h3>
              <button 
                onClick={clearAllFilters}
                style={{ background: 'none', border: 'none', color: accentColor, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Clear all
              </button>
            </div>

            {/* Category Select input */}
            <div ref={sidebarCategoryRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Category
              </label>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                style={{
                  backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${borderColor}`,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: primaryText,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontWeight: 500
                }}
              >
                <span>
                  {sidebarCategory === 'all' 
                    ? 'All Categories' 
                    : sidebarCategory.charAt(0).toUpperCase() + sidebarCategory.slice(1)}
                </span>
                <ChevronDown size={14} style={{ opacity: 0.6 }} />
              </button>

              {isCategoryDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '100%',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    padding: '4px'
                  }}
                >
                  {[
                    { key: 'all', label: 'All Categories' },
                    { key: 'ugc creator', label: 'UGC Creator' },
                    { key: 'influencer marketing', label: 'Influencer Marketing' },
                    { key: 'video & reels', label: 'Video & Reels' },
                    { key: 'photography', label: 'Photography' }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setSidebarCategory(cat.key);
                        setIsCategoryDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: sidebarCategory === cat.key 
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
                      <span>{cat.label}</span>
                      {sidebarCategory === cat.key && <Check size={12} style={{ color: accentColor }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Select input */}
            <div ref={sidebarLocationRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Location
              </label>
              <button
                onClick={() => setIsSidebarLocationOpen(!isSidebarLocationOpen)}
                style={{
                  backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${borderColor}`,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: primaryText,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontWeight: 500
                }}
              >
                <span>
                  {sidebarLocation === 'all' 
                    ? 'All Locations' 
                    : sidebarLocation.charAt(0).toUpperCase() + sidebarLocation.slice(1)}
                </span>
                <ChevronDown size={14} style={{ opacity: 0.6 }} />
              </button>

              {isSidebarLocationOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    width: '100%',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    padding: '4px'
                  }}
                >
                  {[
                    { key: 'all', label: 'All Locations' },
                    { key: 'remote', label: 'Remote' },
                    { key: 'mumbai', label: 'Mumbai' },
                    { key: 'bangalore', label: 'Bangalore' }
                  ].map((loc) => (
                    <button
                      key={loc.key}
                      onClick={() => {
                        setSidebarLocation(loc.key);
                        setIsSidebarLocationOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: sidebarLocation === loc.key 
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
                      <span>{loc.label}</span>
                      {sidebarLocation === loc.key && <Check size={12} style={{ color: accentColor }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Min and Max */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Budget
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    width: '100%'
                  }}
                />
                <span style={{ fontSize: '12px', color: mutedText }}>to</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    width: '100%'
                  }}
                />
              </div>
            </div>

            {/* Job Type Checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Job Type
              </label>
              {['Remote', 'On-site', 'Hybrid'].map((type) => {
                const isChecked = selectedJobTypes.includes(type);
                return (
                  <label 
                    key={type}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      fontSize: '13px', 
                      color: primaryText,
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleJobTypeChange(type)}
                      style={{
                        accentColor: accentColor,
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>

            {/* Apply button */}
            <button
              onClick={() => alert(`Applying filters! Displaying ${filteredGigs.length} matching campaign briefs.`)}
              style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontWeight: 750,
                fontSize: '13.5px',
                cursor: 'pointer',
                marginTop: '6px',
                boxShadow: `0 4px 12px ${isLight ? 'rgba(236,72,153,0.15)' : 'rgba(0,0,0,0.25)'}`
              }}
            >
              Show {filteredGigs.length === MOCK_GIGS_DATA.length ? '124' : filteredGigs.length} Gigs
            </button>

          </div>

          {/* Card 2: Saved Searches */}
          <div 
            style={{ 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              padding: '20px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.01)' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 750, color: primaryText, margin: 0 }}>
                Saved Searches
              </h3>
              <button 
                onClick={() => alert('View all saved searches...')}
                style={{ background: 'none', border: 'none', color: accentColor, fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
              >
                View all
              </button>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { query: 'UGC creator in Mumbai', desc: '24 new gigs' },
                { query: 'Paid collaborations', desc: '12 new gigs' },
                { query: 'Fashion reels', desc: '8 new gigs' }
              ].map((saved, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSearchQuery(saved.query);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Search size={14} style={{ color: mutedText }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 650, color: primaryText }}>{saved.query}</div>
                      <div style={{ fontSize: '11px', color: mutedText, marginTop: '2px', fontWeight: 500 }}>{saved.desc}</div>
                    </div>
                  </div>
                  <button 
                    style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer', padding: '4px' }}
                    onClick={(e) => { e.stopPropagation(); alert('Search options...'); }}
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>



        </div>

        {/* Right Side: Gigs Job Board Feed (approx 70% width, 3 gigs per row) */}
        <div style={{ flex: '3 1 700px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Gigs Grid (Class .gigs-grid forces 3 gigs per row on desktop) */}
          {filteredGigs.length > 0 ? (
            <div className="gigs-grid">
              {filteredGigs.map((gig: any) => {
                const isSaved = savedGigs.includes(gig.id);
                return (
                  <div
                    key={gig.id}
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, border-color 0.2s'
                    }}
                    className="hover-glow-pink"
                  >
                    {/* Gig Image Header with Badges */}
                    <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                      <img 
                        src={gig.imageUrl} 
                        alt={gig.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      
                      {/* Badge (NEW, FEATURED, HOT) */}
                      <span 
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: gig.badgeBg || 'rgba(0,0,0,0.6)',
                          color: gig.badgeColor || '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '5px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {gig.badge}
                      </span>

                      {/* Bookmark Icon */}
                      <button
                        onClick={() => toggleBookmark(gig.id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSaved ? accentColor : '#6B7280',
                          cursor: 'pointer',
                          transition: 'color 0.2s'
                        }}
                      >
                        <Bookmark size={14} fill={isSaved ? accentColor : 'none'} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                      
                      {/* Title & Brand name */}
                      <div>
                        <h3 
                          style={{ 
                            fontSize: '13.5px', 
                            fontWeight: 750, 
                            color: primaryText, 
                            margin: 0,
                            lineHeight: 1.3
                          }}
                        >
                          {gig.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <span style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 550 }}>
                            {gig.brandName}
                          </span>
                          {gig.isVerified && (
                            <BadgeCheck size={12} fill="#3B82F6" color="#FFFFFF" style={{ flexShrink: 0 }} />
                          )}
                        </div>
                      </div>

                      {/* Price / Budget */}
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>
                        {currency === 'INR' ? gig.rateRange.INR : gig.rateRange.USD}
                      </div>

                      {/* Location & Deadline Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: mutedText, fontSize: '11px', fontWeight: 500 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPinWrapper size={11} />
                          <span>{gig.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Calendar size={11} />
                          <span>{gig.deadline}</span>
                        </div>
                      </div>

                      {/* Tag capsules */}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {gig.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span 
                            key={i} 
                            style={{ 
                              fontSize: '10px', 
                              backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.04)', 
                              color: secondaryText, 
                              padding: '3px 8px', 
                              borderRadius: '10px',
                              fontWeight: 500
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* applied rows & Apply button */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          borderTop: `1px solid ${borderColor}`, 
                          paddingTop: '12px',
                          marginTop: 'auto'
                        }}
                      >
                        
                        {/* Overlay profile avatars */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ display: 'flex', marginRight: '4px' }}>
                            {mockAvatars.map((av, idx) => (
                              <img 
                                key={idx}
                                src={av} 
                                alt="avatar" 
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: `2px solid ${cardBg}`,
                                  objectFit: 'cover',
                                  marginLeft: idx === 0 ? 0 : '-5px'
                                }} 
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: '11px', color: secondaryText, fontWeight: 550 }}>
                            {gig.applicantsCount} applied
                          </span>
                        </div>

                        {/* Apply Button */}
                        <button
                          onClick={() => setApplyGig(gig)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${accentColor}`,
                            color: accentColor,
                            padding: '5px 12px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 750,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          className="hover-glow-solid-pink"
                        >
                          Apply
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 24px', backgroundColor: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}` }}>
              <Info size={32} style={{ color: mutedText, margin: '0 auto 12px auto', display: 'block' }} />
              <p style={{ color: secondaryText, fontSize: '15px', fontWeight: 500, margin: 0 }}>
                No active gigs match your filters. Try clearing some constraints.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Application Pitch Modal Popup */}
      {applyGig && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '32px',
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
              backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
              color: primaryText,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Apply for Gig: {applyGig.title}</h2>
              <button
                onClick={() => setApplyGig(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: mutedText,
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {isSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '30px 0', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#E6FBF3', color: '#10B981', padding: '16px', borderRadius: '50%', display: 'flex' }}>
                  <Check size={32} style={{ strokeWidth: 3 }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: 0 }}>Application Submitted!</h3>
                <p style={{ color: secondaryText, fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                  Your pitch has been recorded successfully. You can track its status in the "My Applications" logs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplyFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Expected Rate */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: secondaryText }}>
                    Expected Rate ({currency === 'INR' ? '₹ INR' : '$ USD'})
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={currency === 'INR' ? 'e.g. 15000' : 'e.g. 200'}
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                      color: primaryText,
                      outline: 'none',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                {/* Video Portfolio Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: secondaryText }}>
                    UGC Portfolio Video URL (TikTok, Instagram, YouTube, Drive)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://tiktok.com/@yourusername/video/..."
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                      color: primaryText,
                      outline: 'none',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                {/* Pitch Letter */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: secondaryText }}>
                    Pitch Proposal / Why are you a good fit?
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your idea for this video, what equipment you will use, and your past experience with this niche..."
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                      color: primaryText,
                      outline: 'none',
                      resize: 'none',
                      fontSize: '13.5px',
                      lineHeight: 1.5
                    }}
                  />
                </div>

                {/* Fees notice */}
                <p style={{ fontSize: '11.5px', color: mutedText, lineHeight: 1.5, margin: 0 }}>
                  * Applying to this gig is <strong>free</strong>. A small Verified Connection Fee of{' '}
                  <strong>{currency === 'INR' ? '₹49' : '$1'}</strong> is only charged if the brand shortlists your application for direct chat.
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: `1px solid ${borderColor}`, paddingTop: '14px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setApplyGig(null)}
                    style={{
                      backgroundColor: 'transparent',
                      color: secondaryText,
                      border: `1px solid ${borderColor}`,
                      padding: '10px 20px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: accentColor,
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '20px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      boxShadow: `0 4px 10px ${isLight ? 'rgba(236,72,153,0.2)' : 'rgba(0,0,0,0.3)'}`
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Pitch'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .hover-bg-white-002:hover {
          background-color: ${isLight ? '#F3F4F6' : 'rgba(255, 255, 255, 0.04)'} !important;
        }
        .hover-bg-white-001:hover {
          background-color: ${isLight ? '#F9FAFB' : 'rgba(255, 255, 255, 0.02)'} !important;
        }
        .hover-glow-pink:hover {
          border-color: ${accentColor} !important;
          box-shadow: 0 4px 16px ${isLight ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.12)'} !important;
        }
        .hover-glow-solid-pink:hover {
          background-color: ${accentColor} !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 12px ${isLight ? 'rgba(236,72,153,0.2)' : 'rgba(0,0,0,0.3)'} !important;
        }
        .gigs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) {
          .gigs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .gigs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

// MapPin icon helper wrapper
function MapPinWrapper({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
