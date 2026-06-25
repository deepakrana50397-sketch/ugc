'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';
import { 
  Star, Search, ChevronDown, Clock, Lightbulb, MessageSquare, 
  CheckCircle2, ArrowUpRight, MoreVertical, Calendar, Layers, Check
} from 'lucide-react';

interface ReviewsViewProps {
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

const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    title: 'UGC Creator for Skincare Brand',
    brand: 'Mamaearth',
    date: 'May 20, 2024',
    rating: 5.0,
    text: "Ananya delivered amazing UGC videos that perfectly aligned with our brand's tone. Highly professional and super creative!",
    logoBg: 'rgba(22, 163, 74, 0.1)',
    logoColor: '#16a34a',
    logoText: 'm',
    ratings: { quality: 5.0, communication: 5.0, delivery: 5.0 }
  },
  {
    id: 'rev-2',
    title: 'Campus Ambassador Program',
    brand: 'Swiggy',
    date: 'Apr 28, 2024',
    rating: 5.0,
    text: 'Great energy and excellent communication throughout the campaign. Would love to work again!',
    logoBg: 'rgba(249, 115, 22, 0.1)',
    logoColor: '#ea580c',
    logoText: 'S',
    ratings: { quality: 5.0, communication: 5.0, delivery: 5.0 }
  },
  {
    id: 'rev-3',
    title: 'Product Review – boAt Airdopes',
    brand: 'boAt Lifestyle',
    date: 'Apr 12, 2024',
    rating: 4.5,
    text: 'Good quality content and met the requirements. Delivered on time with minor revisions.',
    logoBg: 'rgba(31, 41, 55, 0.05)',
    logoColor: '#1f2937',
    logoText: 'boAt',
    ratings: { quality: 4.5, communication: 4.5, delivery: 5.0 }
  },
  {
    id: 'rev-4',
    title: 'Instagram Reels – Food Campaign',
    brand: 'Zomato',
    date: 'Mar 30, 2024',
    rating: 4.0,
    text: 'Creative reels and good storytelling. Would be perfect with a bit more attention to details.',
    logoBg: 'rgba(220, 38, 38, 0.1)',
    logoColor: '#dc2626',
    logoText: 'zomato',
    ratings: { quality: 4.0, communication: 4.0, delivery: 4.0 }
  }
];

const SKILLS_RATINGS = [
  { name: 'UGC Videos', rating: 4.9, count: 26, percentage: 95 },
  { name: 'Video Editing', rating: 4.7, count: 18, percentage: 88 },
  { name: 'Content Creation', rating: 4.8, count: 16, percentage: 90 },
  { name: 'Instagram Reels', rating: 4.8, count: 15, percentage: 90 },
  { name: 'Product Photography', rating: 4.6, count: 10, percentage: 82 }
];

export default function CreatorReviewsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ReviewsViewProps) {
  const { user, creator } = useDashboardStore();
  const profile = creator.profile;
  const firstName = profile?.name ? profile.name.split(' ')[0] : (user?.name ? user.name.split(' ')[0] : 'Ananya');

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recent');

  // Filter & Sort reviews dynamically
  const filteredReviews = MOCK_REVIEWS.filter(rev => {
    // Search query filter
    const matchesSearch = rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rev.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rev.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Rating filter
    const matchesRating = ratingFilter === 'All' || 
                          (ratingFilter === '5' && rev.rating === 5.0) ||
                          (ratingFilter === '4' && rev.rating >= 4.0 && rev.rating < 5.0);

    return matchesSearch && matchesRating;
  }).sort((a, b) => {
    if (selectedSort === 'Recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (selectedSort === 'Highest') {
      return b.rating - a.rating;
    }
    if (selectedSort === 'Lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="reviews-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Early Access Announcement Banner */}
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
          <ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} />
        </a>
      </div>

      {/* 2. Page Header Row */}
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
          Reviews
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px' }}>
          See what brands and clients say about your work.
        </p>
      </div>

      {/* 3. Overall Rating Stats Card */}
      <div className="glass-panel stats-card" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.5fr 1fr 1fr 1fr 1fr',
        gap: '24px',
        padding: '24px 30px',
        borderRadius: '24px',
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        boxShadow: shadowStyle
      }}>
        
        {/* Col 1: Overall rating average */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: `1px solid ${borderColor}`, paddingRight: '20px' }}>
          <span style={{ fontSize: '12px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Overall Rating
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', marginBottom: '8px' }}>
            <Star size={26} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontSize: '36px', fontWeight: 900, color: primaryText, lineHeight: 1, letterSpacing: '-0.02em' }}>
              4.8
            </span>
          </div>
          
          {/* Gold Star Icons */}
          <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
            <Star size={14} fill="#EC4899" color="#EC4899" />
            <Star size={14} fill="#EC4899" color="#EC4899" />
            <Star size={14} fill="#EC4899" color="#EC4899" />
            <Star size={14} fill="#EC4899" color="#EC4899" />
            <Star size={14} fill="#EC4899" color="none" strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>(32 reviews)</span>
        </div>

        {/* Col 2: Star breakdown lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', borderRight: `1px solid ${borderColor}`, paddingRight: '20px' }}>
          {[
            { stars: '5 Stars', percent: 78, count: 25 },
            { stars: '4 Stars', percent: 16, count: 5 },
            { stars: '3 Stars', percent: 3, count: 1 },
            { stars: '2 Stars', percent: 0, count: 0 },
            { stars: '1 Star', percent: 3, count: 1 }
          ].map((bar, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: secondaryText, fontWeight: 500 }}>
              <span style={{ width: '45px', flexShrink: 0, textAlign: 'right' }}>{bar.stars}</span>
              <div style={{ flex: 1, height: '5px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${bar.percent}%`, height: '100%', backgroundColor: '#EC4899', borderRadius: '3px' }} />
              </div>
              <span style={{ width: '20px', flexShrink: 0, color: primaryText, fontWeight: 600 }}>{bar.count}</span>
            </div>
          ))}
        </div>

        {/* Col 3: Response Rate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'left', borderRight: `1px solid ${borderColor}`, paddingRight: '12px', paddingLeft: '8px' }}>
          <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Response Rate
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, lineHeight: 1 }}>96%</span>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>Very Responsive</span>
          </div>
        </div>

        {/* Col 4: On-time Delivery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'left', borderRight: `1px solid ${borderColor}`, paddingRight: '12px', paddingLeft: '8px' }}>
          <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            On-time Delivery
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, lineHeight: 1 }}>98%</span>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>On Time</span>
          </div>
        </div>

        {/* Col 5: Repeat Clients */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'left', borderRight: `1px solid ${borderColor}`, paddingRight: '12px', paddingLeft: '8px' }}>
          <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Repeat Clients
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, lineHeight: 1 }}>18</span>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>56% of total clients</span>
          </div>
        </div>

        {/* Col 6: Projects Completed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', textAlign: 'left', paddingLeft: '8px' }}>
          <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Projects Completed
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, lineHeight: 1 }}>24</span>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>Total projects</span>
          </div>
        </div>

      </div>

      {/* 4. Filters & Controls Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Dropdowns filters */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {/* Dropdown 1: All Reviews */}
          <div style={{ position: 'relative' }}>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              style={{
                appearance: 'none',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                padding: '9px 36px 9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: primaryText,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: shadowStyle
              }}
              className="select-filter border-hover"
            >
              <option value="All">All Reviews (32)</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars & Above</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText, pointerEvents: 'none' }} />
          </div>

          {/* Dropdown 2: All Ratings */}
          <div style={{ position: 'relative' }}>
            <select
              style={{
                appearance: 'none',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                padding: '9px 36px 9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: primaryText,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: shadowStyle
              }}
              className="select-filter border-hover"
            >
              <option>All Ratings</option>
              <option>5.0 Rating</option>
              <option>4.0 Rating</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText, pointerEvents: 'none' }} />
          </div>

        </div>

        {/* Search bar & Sorting */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {/* Search bar */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '36px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                paddingLeft: '34px',
                paddingRight: '12px',
                fontSize: '13px',
                color: primaryText,
                outline: 'none',
                boxShadow: shadowStyle
              }}
              className="border-hover search-input-styled"
            />
          </div>

          {/* Sorting */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                appearance: 'none',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                padding: '9px 36px 9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: primaryText,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: shadowStyle
              }}
              className="select-filter border-hover"
            >
              <option value="Recent">Sort by: Most Recent</option>
              <option value="Highest">Sort by: Highest Rating</option>
              <option value="Lowest">Sort by: Lowest Rating</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText, pointerEvents: 'none' }} />
          </div>

        </div>

      </div>

      {/* 5. Main Double Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.3fr 1fr', gap: '24px', alignItems: 'start' }} className="reviews-layout-grid">
        
        {/* Left Column: Review Cards Listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredReviews.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              backgroundColor: cardBg,
              border: `1px dashed ${borderColor}`,
              borderRadius: '20px',
              textAlign: 'center',
              color: mutedText
            }}>
              <Layers size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>No matching reviews</h4>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: shadowStyle,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
                className="review-card hover-lift"
              >
                {/* Header info row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  
                  {/* Left: Avatar initial and campaign details */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: rev.logoBg,
                      color: rev.logoColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '18px',
                      textTransform: 'uppercase',
                      border: `1px solid ${rev.logoColor}15`,
                      flexShrink: 0
                    }}>
                      {rev.logoText}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText }}>
                          {rev.title}
                        </span>
                        <span style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                          color: '#3B82F6',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          Verified Client
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 550 }}>
                        {rev.brand}
                      </span>
                      <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={11} />
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Right: Stars rating and Action Menu */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={13} 
                            fill={i < Math.floor(rev.rating) ? "#EC4899" : "none"} 
                            color="#EC4899" 
                            strokeWidth={i < Math.floor(rev.rating) ? 0 : 1.5}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                    
                    <button style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer', display: 'flex', padding: '4px' }} className="hover-white-icon">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                </div>

                {/* Review Text */}
                <p style={{ fontSize: '13.5px', color: secondaryText, margin: '4px 0', lineHeight: 1.5, fontWeight: 400 }}>
                  {rev.text.replace(/Ananya/g, firstName)}
                </p>

                {/* Sub ratings row tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '11px',
                    color: secondaryText,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontWeight: 550
                  }}>
                    Quality of Work <span style={{ fontWeight: 800, color: primaryText, marginLeft: '2px' }}>{rev.ratings.quality.toFixed(1)}</span>
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: secondaryText,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontWeight: 550
                  }}>
                    Communication <span style={{ fontWeight: 800, color: primaryText, marginLeft: '2px' }}>{rev.ratings.communication.toFixed(1)}</span>
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: secondaryText,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontWeight: 550
                  }}>
                    On-time Delivery <span style={{ fontWeight: 800, color: primaryText, marginLeft: '2px' }}>{rev.ratings.delivery.toFixed(1)}</span>
                  </span>
                </div>

              </div>
            ))
          )}

          {/* Load More Button */}
          {filteredReviews.length > 0 && (
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                alignSelf: 'center',
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                color: primaryText,
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 650,
                cursor: 'pointer',
                marginTop: '12px',
                transition: 'all 0.2s',
                boxShadow: shadowStyle
              }}
              className="hover-white-bg"
            >
              <span>Load more reviews</span>
              <ChevronDown size={14} />
            </button>
          )}

        </div>

        {/* Right Column: Widgets Side Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Widget 1: Top Reviewed Skills */}
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
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>
              Top Reviewed Skills
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SKILLS_RATINGS.map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', fontWeight: 650 }}>
                    <span style={{ color: primaryText }}>{skill.name}</span>
                    <span style={{ color: primaryText, fontWeight: 800 }}>
                      {skill.rating} <span style={{ color: mutedText, fontSize: '11px', fontWeight: 550 }}>({skill.count})</span>
                    </span>
                  </div>
                  
                  {/* Progress slide */}
                  <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.percentage}%`, height: '100%', backgroundColor: '#EC4899', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>

            <a href="#" style={{
              color: '#EC4899',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '12.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '6px'
            }} className="hover-arrow-move">
              <span>View all skills</span>
              <ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} />
            </a>

          </div>

          {/* Widget 2: What clients love */}
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
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>
              What clients love
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Creativity */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Lightbulb size={16} fill="none" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>Creativity</span>
                  <span style={{ fontSize: '11.5px', color: secondaryText, lineHeight: 1.4 }}>
                    Clients love your creative ideas and content quality
                  </span>
                </div>
              </div>

              {/* Communication */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                  color: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MessageSquare size={15} fill="none" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>Communication</span>
                  <span style={{ fontSize: '11.5px', color: secondaryText, lineHeight: 1.4 }}>
                    You're responsive and easy to work with
                  </span>
                </div>
              </div>

              {/* On-time Delivery */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={15} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>On-time Delivery</span>
                  <span style={{ fontSize: '11.5px', color: secondaryText, lineHeight: 1.4 }}>
                    You consistently deliver work on time
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Styled JSX */}
      <style jsx>{`
        .reviews-view {
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
          background-color: rgba(236,72,153,0.02) !important;
        }
        
        .select-filter {
          transition: all 0.2s;
        }
        .select-filter:hover {
          border-color: #ec4899 !important;
        }

        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.02) !important;
        }

        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
          border-color: #EC4899 !important;
          color: #EC4899 !important;
        }

        .hover-white-icon:hover {
          color: #EC4899 !important;
        }

        .search-input-styled:focus {
          border-color: #EC4899 !important;
          box-shadow: none !important;
        }

        .hover-arrow-move:hover span {
          text-decoration: underline;
        }
        .hover-arrow-move:hover svg {
          transform: translate(2px, -2px) rotate(45deg) !important;
          transition: transform 0.2s;
        }

        @media (max-width: 1200px) {
          .stats-card {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px !important;
          }
          .stats-card > div {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }

        @media (max-width: 992px) {
          .reviews-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .stats-card {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
