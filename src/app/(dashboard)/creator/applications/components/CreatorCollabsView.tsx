'use client';

import React, { useState } from 'react';
import {
  Layers, Search, Sliders, ArrowUpRight, TrendingUp,
  ShoppingBag, Calendar, Star, DollarSign, ChevronLeft, ChevronRight,
  MoreVertical, Check, Eye, X, AlertCircle, Info, Sparkles, CheckCircle2
} from 'lucide-react';

interface CollabsViewProps {
  theme: 'dark' | 'light';
  isLight: boolean;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentColor: string;
  shadowStyle: string;
}

interface CollabItem {
  id: string;
  brand: string;
  project: string;
  tag: string;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Invitation';
  statusSub: string;
  statusType: 'live' | 'upcoming' | 'completed' | 'cancelled' | 'invitation';
  duration: string;
  durationSub: string;
  value: string;
  type: string;
  previewImage: string;
  logoBg: string;
  logoColor: string;
  logoText: string;
  verified: boolean;
}

const INITIAL_COLLABS: CollabItem[] = [
  {
    id: 'collab-1',
    brand: 'Plum Goodness',
    project: 'Skincare UGC Campaign',
    tag: 'UGC Videos + Photos',
    status: 'Active',
    statusSub: 'Live',
    statusType: 'live',
    duration: 'May 15 – Jun 15, 2024',
    durationSub: '31 days left',
    value: '₹35,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=200&auto=format&fit=crop&q=60',
    logoBg: '#111827',
    logoColor: '#F3F4F6',
    logoText: 'plum',
    verified: true
  },
  {
    id: 'collab-2',
    brand: 'boAt Lifestyle',
    project: 'Product Review Collaboration',
    tag: 'YouTube + Instagram',
    status: 'Active',
    statusSub: 'Live',
    statusType: 'live',
    duration: 'May 10 – Jun 10, 2024',
    durationSub: '26 days left',
    value: '₹50,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60',
    logoBg: '#F3F4F6',
    logoColor: '#000000',
    logoText: 'boAt',
    verified: true
  },
  {
    id: 'collab-3',
    brand: 'Mamaearth',
    project: 'Beauty Content Series',
    tag: 'Instagram Reels',
    status: 'Upcoming',
    statusSub: 'Starts in 7 days',
    statusType: 'upcoming',
    duration: 'Jun 01 – Jun 30, 2024',
    durationSub: '30 days',
    value: '₹40,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=60',
    logoBg: '#ECFDF5',
    logoColor: '#10B981',
    logoText: 'mama',
    verified: true
  },
  {
    id: 'collab-4',
    brand: 'Nykaa',
    project: 'Makeup UGC Campaign',
    tag: 'UGC Videos + Photos',
    status: 'Completed',
    statusSub: 'Completed on May 20',
    statusType: 'completed',
    duration: 'Apr 20 – May 20, 2024',
    durationSub: '31 days',
    value: '₹60,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FDF2F8',
    logoColor: '#EC4899',
    logoText: 'nykaa',
    verified: true
  },
  {
    id: 'collab-5',
    brand: 'Zomato',
    project: 'Food Reels Campaign',
    tag: 'Instagram Reels',
    status: 'Completed',
    statusSub: 'Completed on Apr 15',
    statusType: 'completed',
    duration: 'Mar 15 – Apr 15, 2024',
    durationSub: '31 days',
    value: '₹30,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FEE2E2',
    logoColor: '#EF4444',
    logoText: 'zomato',
    verified: true
  },
  {
    id: 'collab-6',
    brand: 'Philips India',
    project: 'Product Demo Series',
    tag: 'UGC Videos',
    status: 'Completed',
    statusSub: 'Completed on Mar 10',
    statusType: 'completed',
    duration: 'Feb 10 – Mar 10, 2024',
    durationSub: '29 days',
    value: '₹45,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=200&auto=format&fit=crop&q=60',
    logoBg: '#EFF6FF',
    logoColor: '#3B82F6',
    logoText: 'philips',
    verified: true
  },
  {
    id: 'collab-7',
    brand: "L'Oréal Paris",
    project: 'Haircare Campaign',
    tag: 'Instagram Reels + Photos',
    status: 'Cancelled',
    statusSub: 'Cancelled on May 5',
    statusType: 'cancelled',
    duration: 'Apr 20 – May 20, 2024',
    durationSub: '—',
    value: '₹40,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a3ef?w=200&auto=format&fit=crop&q=60',
    logoBg: '#000000',
    logoColor: '#FFFFFF',
    logoText: 'loreal',
    verified: true
  },
  {
    id: 'collab-8',
    brand: 'Swiggy',
    project: 'Food Delivery Reels',
    tag: 'Instagram Reels',
    status: 'Active',
    statusSub: 'Live',
    statusType: 'live',
    duration: 'May 22 – Jun 22, 2024',
    durationSub: '28 days left',
    value: '₹20,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FFF7ED',
    logoColor: '#EA580C',
    logoText: 'S',
    verified: true
  },
  {
    id: 'collab-9',
    brand: 'The Derma Co.',
    project: 'Acne Serum Campaign',
    tag: 'UGC Videos',
    status: 'Upcoming',
    statusSub: 'Starts in 10 days',
    statusType: 'upcoming',
    duration: 'Jun 05 – Jun 20, 2024',
    durationSub: '15 days',
    value: '₹28,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=60',
    logoBg: '#F0FDF4',
    logoColor: '#15803D',
    logoText: 'D',
    verified: false
  },
  {
    id: 'collab-10',
    brand: 'Pilgrim',
    project: 'Lip Balm Reel',
    tag: 'UGC Videos',
    status: 'Completed',
    statusSub: 'Completed on May 12',
    statusType: 'completed',
    duration: 'Apr 12 – Apr 26, 2024',
    durationSub: '14 days',
    value: '₹15,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FDF2F8',
    logoColor: '#BE185D',
    logoText: 'P',
    verified: false
  },
  {
    id: 'collab-11',
    brand: 'SkinGlow',
    project: 'Face Moisturizer Ad',
    tag: 'UGC Videos',
    status: 'Active',
    statusSub: 'Live',
    statusType: 'live',
    duration: 'May 12 – Jun 12, 2024',
    durationSub: '18 days left',
    value: '₹22,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FAF5FF',
    logoColor: '#7E22CE',
    logoText: 'SG',
    verified: false
  },
  {
    id: 'collab-12',
    brand: 'Organic Harvest',
    project: 'Aloe Gel Review',
    tag: 'UGC Videos',
    status: 'Completed',
    statusSub: 'Completed on May 02',
    statusType: 'completed',
    duration: 'Apr 10 – Apr 25, 2024',
    durationSub: '15 days',
    value: '₹18,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FFF7ED',
    logoColor: '#C2410C',
    logoText: 'OH',
    verified: false
  },
  {
    id: 'collab-13',
    brand: 'Tata CLiQ',
    project: 'Lifestyle Outfit Reel',
    tag: 'Instagram Reels',
    status: 'Active',
    statusSub: 'Live',
    statusType: 'live',
    duration: 'May 20 – Jun 20, 2024',
    durationSub: '25 days left',
    value: '₹30,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FFF1F2',
    logoColor: '#E11D48',
    logoText: 'C',
    verified: true
  },
  {
    id: 'collab-14',
    brand: 'The Pilgrim Body',
    project: 'Body Scrub UGC Series',
    tag: 'UGC Videos',
    status: 'Upcoming',
    statusSub: 'Starts in 12 days',
    statusType: 'upcoming',
    duration: 'Jun 07 – Jun 25, 2024',
    durationSub: '18 days',
    value: '₹25,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FCE7F3',
    logoColor: '#DB2777',
    logoText: 'P',
    verified: false
  },
  {
    id: 'collab-15',
    brand: 'Mamaearth',
    project: 'Hair Mask Content',
    tag: 'UGC Videos',
    status: 'Completed',
    statusSub: 'Completed on Apr 20',
    statusType: 'completed',
    duration: 'Mar 20 – Apr 20, 2024',
    durationSub: '31 days',
    value: '₹40,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200&auto=format&fit=crop&q=60',
    logoBg: '#ECFDF5',
    logoColor: '#10B981',
    logoText: 'm',
    verified: true
  },
  {
    id: 'collab-16',
    brand: 'Noise Fit',
    project: 'Smartwatch Launch',
    tag: 'Instagram Reels',
    status: 'Upcoming',
    statusSub: 'Starts in 4 days',
    statusType: 'upcoming',
    duration: 'May 29 – Jun 15, 2024',
    durationSub: '17 days',
    value: '₹40,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&auto=format&fit=crop&q=60',
    logoBg: '#EFF6FF',
    logoColor: '#1D4ED8',
    logoText: 'N',
    verified: true
  },
  {
    id: 'collab-inv-1',
    brand: 'Sugar Cosmetics',
    project: 'Lip Crayon Demo & Reels',
    tag: 'Instagram Reels',
    status: 'Invitation',
    statusSub: 'Response needed',
    statusType: 'invitation',
    duration: 'Jun 10 – Jun 25, 2024',
    durationSub: '15 days',
    value: '₹32,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FAF5FF',
    logoColor: '#7E22CE',
    logoText: 'sugar',
    verified: true
  },
  {
    id: 'collab-inv-2',
    brand: 'mCaffeine',
    project: 'Coffee Body Scrub Campaign',
    tag: 'UGC Videos + Photos',
    status: 'Invitation',
    statusSub: 'Response needed',
    statusType: 'invitation',
    duration: 'Jun 12 – Jun 30, 2024',
    durationSub: '18 days',
    value: '₹25,000',
    type: 'Fixed Price',
    previewImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=60',
    logoBg: '#FFF7ED',
    logoColor: '#C2410C',
    logoText: 'mCaf',
    verified: true
  }
];

export default function CreatorCollabsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: CollabsViewProps) {
  const [collabs, setCollabs] = useState<CollabItem[]>(INITIAL_COLLABS);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Invitations'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Selected Opportunity modal states
  const [selectedBrief, setSelectedBrief] = useState<{
    brand: string;
    project: string;
    tag: string;
    value: string;
    requirements: string;
    logoBg: string;
    logoColor: string;
    logoText: string;
  } | null>(null);

  // Tab Filtering counts
  // All tab counts show standard collabs (Active + Upcoming + Completed + Cancelled) = 16
  const allCount = collabs.filter(c => c.status !== 'Invitation').length;
  const activeCount = collabs.filter(c => c.status === 'Active').length;
  const upcomingCount = collabs.filter(c => c.status === 'Upcoming').length;
  const completedCount = collabs.filter(c => c.status === 'Completed').length;
  const cancelledCount = collabs.filter(c => c.status === 'Cancelled').length;
  const invitationsCount = collabs.filter(c => c.status === 'Invitation').length;

  const tabList = [
    { key: 'All', label: 'All Collaborations', count: allCount },
    { key: 'Active', label: 'Active', count: activeCount },
    { key: 'Upcoming', label: 'Upcoming', count: upcomingCount },
    { key: 'Completed', label: 'Completed', count: completedCount },
    { key: 'Cancelled', label: 'Cancelled', count: cancelledCount },
    { key: 'Invitations', label: 'Invitations', count: invitationsCount }
  ];

  // Filter items based on activeTab and searchQuery
  const filteredCollabs = collabs.filter(c => {
    // Tab Filter
    if (activeTab === 'Invitations') {
      if (c.status !== 'Invitation') return false;
    } else if (activeTab !== 'All') {
      if (c.status !== activeTab) return false;
    } else {
      // 'All' tab excludes invitations
      if (c.status === 'Invitation') return false;
    }

    // Search query matches brand name or campaign project
    const matchesSearch = c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination calculations
  const totalItems = filteredCollabs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollabs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAcceptInvitation = (id: string, brand: string) => {
    // Shift invitation to Active status
    setCollabs(collabs.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: 'Active',
          statusSub: 'Live',
          statusType: 'live',
          duration: 'Jun 15 – Jul 15, 2024',
          durationSub: '30 days left'
        };
      }
      return c;
    }));
    alert(`Collaboration with ${brand} has been accepted!`);
  };

  const handleDeclineInvitation = (id: string) => {
    setCollabs(collabs.filter(c => c.id !== id));
  };

  return (
    <div className="collabs-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Early Access announcement banner */}
      <div className="early-access-banner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF1F2',
        border: '1px solid #FFE4E6',
        borderRadius: '16px',
        padding: '12px 20px',
        color: '#9F1239',
        fontSize: '13.5px',
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(225, 29, 72, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: '#F43F5E',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '12px',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 4px rgba(244, 63, 94, 0.2)'
          }}>
            Early Access
          </span>
          <span style={{ color: '#4C0519' }}>
            New UGC tools: Auto briefs, AI caption helper & more
          </span>
        </div>
        <a href="#" style={{
          color: '#F43F5E',
          fontWeight: 700,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '13px'
        }} className="hover-arrow-move">
          <span>Explore</span>
          <span style={{ transition: 'transform 0.2s', display: 'inline-block' }} className="arrow-icon">→</span>
        </a>
      </div>

      {/* 2. Header title & subtitle */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
          Brand Collaborations
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px' }}>
          Manage past, active and upcoming collaborations with brands.
        </p>
      </div>

      {/* 3. Filters Navigation Tabs Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${borderColor}`,
        paddingBottom: '2px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }} className="inner-scroller">
          {tabList.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setCurrentPage(1); // Reset page on tab toggle
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `2.5px solid ${isActive ? '#EC4899' : 'transparent'}`,
                  color: isActive ? '#EC4899' : secondaryText,
                  padding: '12px 4px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 550,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                className={isActive ? "" : "hover-pink-text"}
              >
                {tab.label} <span style={{ color: mutedText, fontSize: '11.5px', marginLeft: '2px' }}>({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Right Search Box & Inline Filter */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                height: '34px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                paddingLeft: '32px',
                paddingRight: '12px',
                fontSize: '12.5px',
                color: primaryText,
                outline: 'none',
                boxShadow: shadowStyle
              }}
              className="search-input-styled border-hover"
            />
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            color: primaryText,
            height: '34px',
            padding: '0 14px',
            borderRadius: '10px',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: shadowStyle
          }} className="border-hover">
            <Sliders size={13} style={{ transform: 'rotate(90deg)' }} />
            <span>Filter</span>
          </button>
        </div>

      </div>

      {/* 4. Stats Breakdown Cards Summary Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px'
      }} className="stats-collabs-grid">
        
        {/* Total Collaborations */}
        <div className="glass-panel stat-card" style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: shadowStyle
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            color: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShoppingBag size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>Total Collabs</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>{allCount}</span>
            <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>All time</span>
          </div>
        </div>

        {/* Active Collaborations */}
        <div className="glass-panel stat-card" style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: shadowStyle
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>Active Collabs</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>{activeCount}</span>
            <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>Currently live</span>
          </div>
        </div>

        {/* Upcoming Collaborations */}
        <div className="glass-panel stat-card" style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: shadowStyle
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            color: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calendar size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>Upcoming Collabs</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>{upcomingCount}</span>
            <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>Next 30 days</span>
          </div>
        </div>

        {/* Completed Collaborations */}
        <div className="glass-panel stat-card" style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: shadowStyle
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Star size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>Completed</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>{completedCount}</span>
            <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>This year</span>
          </div>
        </div>

        {/* Total Earned */}
        <div className="glass-panel stat-card" style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: shadowStyle
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: 'rgba(236, 72, 153, 0.08)',
            color: '#EC4899',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DollarSign size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>Total Earned</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>₹4,25,000</span>
            <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>From brand collabs</span>
          </div>
        </div>

      </div>

      {/* 5. Main Content 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '24px', alignItems: 'start' }} className="collabs-layout-grid">
        
        {/* Left Column: Table List and Pagination */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          
          <div className="glass-panel inner-scroller" style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            boxShadow: shadowStyle,
            overflowX: 'auto',
            padding: '8px 0'
          }}>
            
            <div style={{ padding: '16px 20px', fontSize: '15px', fontWeight: 800, color: primaryText, borderBottom: `1px solid ${borderColor}` }}>
              Your Collaborations
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11.5px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 20px' }}>Brand / Project</th>
                  <th style={{ padding: '16px 12px' }}>Status</th>
                  <th style={{ padding: '16px 12px' }}>Duration</th>
                  <th style={{ padding: '16px 12px' }}>Value</th>
                  <th style={{ padding: '16px 12px' }}>Content</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: mutedText }}>
                      No collaborations found. Try switching tabs.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((collab) => (
                    <tr key={collab.id} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.2s' }} className="table-row-hover">
                      
                      {/* Brand / Project info */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          {/* Brand circular logo */}
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: collab.logoBg,
                            color: collab.logoColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '11px',
                            textTransform: 'lowercase',
                            letterSpacing: '-0.02em',
                            flexShrink: 0
                          }}>
                            {collab.logoText}
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>{collab.brand}</span>
                              {collab.verified && (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: '#3B82F6',
                                  color: '#FFFFFF',
                                  borderRadius: '50%',
                                  width: '12px',
                                  height: '12px',
                                  fontSize: '7px',
                                  fontWeight: 'bold'
                                }}>✓</span>
                              )}
                            </div>
                            <span style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 500 }}>{collab.project}</span>
                            <span style={{
                              width: 'fit-content',
                              fontSize: '9.5px',
                              backgroundColor: collab.tag.includes('YouTube') 
                                ? 'rgba(239, 68, 68, 0.08)' 
                                : collab.tag.includes('Instagram') 
                                  ? 'rgba(236, 72, 153, 0.08)' 
                                  : 'rgba(124, 58, 237, 0.08)',
                              color: collab.tag.includes('YouTube') 
                                ? '#EF4444' 
                                : collab.tag.includes('Instagram') 
                                  ? '#EC4899' 
                                  : '#7C3AED',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              fontWeight: 700,
                              marginTop: '2px'
                            }}>
                              {collab.tag}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: collab.statusType === 'live' ? '#10B981' :
                                   collab.statusType === 'upcoming' ? '#3B82F6' :
                                   collab.statusType === 'completed' ? '#6B7280' :
                                   collab.statusType === 'cancelled' ? '#EF4444' :
                                   '#7C3AED',
                            textTransform: 'capitalize'
                          }}>
                            {collab.status}
                          </span>
                          
                          {/* Dot status sub indicator */}
                          <span style={{
                            fontSize: '10.5px',
                            color: mutedText,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 500
                          }}>
                            <span style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: collab.statusType === 'live' ? '#10B981' :
                                              collab.statusType === 'upcoming' ? '#3B82F6' :
                                              collab.statusType === 'completed' ? '#6B7280' :
                                              collab.statusType === 'cancelled' ? '#EF4444' :
                                              '#F97316'
                            }}></span>
                            {collab.statusSub}
                          </span>
                        </div>
                      </td>

                      {/* Duration */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText }}>{collab.duration}</span>
                          <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 500 }}>{collab.durationSub}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>{collab.value}</span>
                          <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 500 }}>{collab.type}</span>
                        </div>
                      </td>

                      {/* Content Preview Image */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{
                          width: '64px',
                          height: '38px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: `1px solid ${borderColor}`,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          backgroundColor: '#F3F4F6'
                        }}>
                          <img
                            src={collab.previewImage}
                            alt="collab snap"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px' }}>
                        {collab.statusType === 'invitation' ? (
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button
                              onClick={() => handleAcceptInvitation(collab.id, collab.brand)}
                              style={{
                                backgroundColor: '#EC4899',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                              }}
                              className="hover-opacity"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDeclineInvitation(collab.id)}
                              style={{
                                backgroundColor: 'transparent',
                                border: `1px solid ${borderColor}`,
                                color: secondaryText,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                              className="border-hover"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button style={{
                              background: 'none',
                              border: 'none',
                              color: mutedText,
                              cursor: 'pointer',
                              padding: '4px'
                            }} className="hover-white-icon">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>

          {/* Pagination bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: secondaryText, padding: '0 8px' }}>
            <span>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} collaborations
            </span>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  color: currentPage === 1 ? mutedText : primaryText,
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === 1 ? 'default' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isPageActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      backgroundColor: isPageActive ? '#FFF1F2' : cardBg,
                      border: `1.5px solid ${isPageActive ? '#EC4899' : borderColor}`,
                      color: isPageActive ? '#EC4899' : primaryText,
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: isPageActive ? 'none' : shadowStyle
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  color: currentPage === totalPages ? mutedText : primaryText,
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === totalPages ? 'default' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Widget 1: Earnings Overview (with SVG graph) */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>Earnings Overview</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: secondaryText, cursor: 'pointer' }}>
                <span>This Year</span>
                <ChevronRight size={11} style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: primaryText }}>₹4,25,000</span>
              <span style={{ fontSize: '11px', color: mutedText, fontWeight: 500 }}>Total earned from brand collaborations</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10B981', fontSize: '11px', fontWeight: 700, marginTop: '6px' }}>
                <TrendingUp size={12} />
                <span>+28% vs last year</span>
              </div>
            </div>

            {/* Sparkline Line SVG Chart */}
            <div style={{ width: '100%', height: '110px', marginTop: '12px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid guide lines */}
                <line x1="0" y1="20" x2="280" y2="20" stroke={borderColor} strokeDasharray="3 3" strokeWidth="0.75" />
                <line x1="0" y1="50" x2="280" y2="50" stroke={borderColor} strokeDasharray="3 3" strokeWidth="0.75" />
                <line x1="0" y1="80" x2="280" y2="80" stroke={borderColor} strokeDasharray="3 3" strokeWidth="0.75" />

                {/* Path line trend */}
                <path
                  d="M 10 85 C 40 85, 50 65, 80 60 C 110 55, 120 40, 150 45 C 180 50, 190 30, 220 25 C 250 20, 260 10, 270 5"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* Area filled gradient */}
                <path
                  d="M 10 85 C 40 85, 50 65, 80 60 C 110 55, 120 40, 150 45 C 180 50, 190 30, 220 25 C 250 20, 260 10, 270 5 L 270 95 L 10 95 Z"
                  fill="url(#chartGradient)"
                />

                {/* Data point dots */}
                <circle cx="10" cy="85" r="3.5" fill="#EC4899" stroke={cardBg} strokeWidth="1" />
                <circle cx="80" cy="60" r="3.5" fill="#EC4899" stroke={cardBg} strokeWidth="1" />
                <circle cx="150" cy="45" r="3.5" fill="#EC4899" stroke={cardBg} strokeWidth="1" />
                <circle cx="220" cy="25" r="3.5" fill="#EC4899" stroke={cardBg} strokeWidth="1" />
                <circle cx="270" cy="5" r="3.5" fill="#EC4899" stroke={cardBg} strokeWidth="1" />
              </svg>

              {/* Month Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: mutedText, marginTop: '6px', padding: '0 4px', fontWeight: 600 }}>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

          </div>

          {/* Widget 2: Top Collaborating Brands */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>Top Collaborating Brands</span>
              <a href="#" style={{ fontSize: '11px', color: '#EC4899', fontWeight: 700, textDecoration: 'none' }} className="hover-underline">View all</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Mamaearth */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>m</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Mamaearth</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>3 Collaborations</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>₹1,20,000</span>
              </div>

              {/* Nykaa */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FDF2F8', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>N</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Nykaa</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>2 Collaborations</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>₹1,00,000</span>
              </div>

              {/* boAt */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3F4F6', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>boAt</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>boAt</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>2 Collaborations</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>₹90,000</span>
              </div>

              {/* Plum Goodness */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#111827', color: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '9px' }}>plum</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Plum Goodness</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>2 Collaborations</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>₹70,000</span>
              </div>

              {/* Philips */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>P</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Philips</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>1 Collaboration</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>₹45,000</span>
              </div>

            </div>

          </div>

          {/* Widget 3: Collaboration Opportunities */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>Collaboration Opportunities</span>
              <a href="#" style={{ fontSize: '11px', color: '#EC4899', fontWeight: 700, textDecoration: 'none' }} className="hover-underline">View all</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Minimalist Skincare */}
              <div style={{
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }} className="border-hover">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#111827', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 'bold' }}>Min</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: primaryText }}>Minimalist Skincare</span>
                    <span style={{ fontSize: '9.5px', color: mutedText }}>Seeking UGC Creator</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: primaryText }}>₹25,000 - ₹40,000</span>
                  <button
                    onClick={() => setSelectedBrief({
                      brand: 'Minimalist Skincare',
                      project: 'Seeking UGC Creator',
                      tag: 'Skincare',
                      value: '₹25,000 - ₹40,000',
                      requirements: 'Shoot 3 dynamic videos showcasing morning Skincare routines featuring Niacinamide serum and Sunscreen. Deliverables must include source vertical files + edited clips.',
                      logoBg: '#111827',
                      logoColor: '#FFFFFF',
                      logoText: 'Min'
                    })}
                    style={{
                      border: '1px solid #EC4899',
                      backgroundColor: 'transparent',
                      color: '#EC4899',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    className="hover-pink-bg-trans"
                  >
                    View Brief
                  </button>
                </div>
              </div>

              {/* mCaffeine */}
              <div style={{
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }} className="border-hover">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#C2410C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 'bold' }}>mCaf</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: primaryText }}>mCaffeine</span>
                    <span style={{ fontSize: '9.5px', color: mutedText }}>Instagram Reels Campaign</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: primaryText }}>₹20,000 - ₹35,000</span>
                  <button
                    onClick={() => setSelectedBrief({
                      brand: 'mCaffeine',
                      project: 'Instagram Reels Campaign',
                      tag: 'Beauty',
                      value: '₹20,000 - ₹35,000',
                      requirements: 'Produce 2 Instagram reels highlighting the exfoliating effects of Coffee Body Scrub. Creative theme: "Wake up your skin". Focus on texture close-ups and sensory application.',
                      logoBg: '#FFF7ED',
                      logoColor: '#C2410C',
                      logoText: 'mCaf'
                    })}
                    style={{
                      border: '1px solid #EC4899',
                      backgroundColor: 'transparent',
                      color: '#EC4899',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    className="hover-pink-bg-trans"
                  >
                    View Brief
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Widget 4: Invitations sidebar panel */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText }}>Invitations (2)</span>
              <button 
                onClick={() => {
                  setActiveTab('Invitations');
                  setCurrentPage(1);
                }}
                style={{ background: 'none', border: 'none', fontSize: '11px', color: '#EC4899', fontWeight: 700, cursor: 'pointer' }}
                className="hover-underline"
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {collabs.filter(c => c.status === 'Invitation').slice(0, 2).map((inv) => (
                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: inv.logoBg, color: inv.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '9px' }}>{inv.logoText}</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: primaryText }}>{inv.brand}</span>
                      <span style={{ fontSize: '10px', color: '#EC4899', fontWeight: 650 }}>{inv.value}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAcceptInvitation(inv.id, inv.brand)}
                    style={{
                      border: 'none',
                      backgroundColor: '#EC4899',
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    className="glow-button"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* OPPORTUNITY BRIEF DETAILS MODAL POPUP */}
      {/* ========================================= */}
      {selectedBrief && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }} onClick={() => setSelectedBrief(null)}>
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '30px',
            width: '90%',
            maxWidth: '480px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close trigger */}
            <button
              onClick={() => setSelectedBrief(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: secondaryText,
                cursor: 'pointer',
                padding: '4px'
              }}
              className="hover-white-icon"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: selectedBrief.logoBg,
                  color: selectedBrief.logoColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '12px'
                }}>{selectedBrief.logoText}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>{selectedBrief.brand}</h3>
                  <span style={{ fontSize: '12px', color: mutedText, marginTop: '2px' }}>{selectedBrief.project}</span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${borderColor}`, margin: '4px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>Format Tag</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText }}>{selectedBrief.tag}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>Campaign Budget</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#EC4899' }}>{selectedBrief.value}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>Creative Guidelines</span>
                <p style={{ fontSize: '12.5px', color: secondaryText, lineHeight: '1.5', margin: 0 }}>
                  {selectedBrief.requirements}
                </p>
              </div>

              <button
                onClick={() => {
                  alert('Your pitch/application has been sent to the brand!');
                  setSelectedBrief(null);
                }}
                style={{
                  backgroundColor: '#EC4899',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  boxShadow: '0 4px 12px rgba(236,72,153,0.2)'
                }}
                className="glow-button"
              >
                Send Proposal / Apply
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Styled CSS */}
      <style jsx>{`
        .collabs-view {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .border-hover {
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }
        .border-hover:hover {
          border-color: #EC4899 !important;
          background-color: rgba(236, 72, 153, 0.01) !important;
        }

        .hover-pink-text {
          transition: color 0.2s;
        }
        .hover-pink-text:hover {
          color: #EC4899 !important;
        }

        .hover-pink-bg-trans {
          transition: all 0.2s;
        }
        .hover-pink-bg-trans:hover {
          background-color: rgba(236, 72, 153, 0.08) !important;
        }

        .table-row-hover {
          background-color: transparent;
        }
        .table-row-hover:hover {
          background-color: rgba(0, 0, 0, 0.01);
        }
        .dark-theme .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.015);
        }

        .search-input-styled:focus {
          border-color: #EC4899 !important;
          box-shadow: none !important;
        }

        .hover-white-icon:hover {
          color: #EC4899 !important;
        }

        .hover-opacity:hover {
          opacity: 0.9;
        }

        .hover-arrow-move:hover span.arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 1200px) {
          .collabs-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-collabs-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .stats-collabs-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
