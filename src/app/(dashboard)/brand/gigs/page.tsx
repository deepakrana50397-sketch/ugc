'use client';

import React, { useState, useEffect } from 'react';
import { getGigs, updateGigStatus } from '@/lib/services';
import { Gig } from '@/types/gig';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import {
  Calendar, Users, Trash2, Power, Eye, Search, Plus,
  ExternalLink, Briefcase, FileText, ChevronRight, AlertCircle, Clock
} from 'lucide-react';
import Link from 'next/link';

const categoryInfo: Record<string, { label: string; icon: string; bg: string; color: string }> = {
  video_ad: { label: 'Video Ad', icon: '🎥', bg: 'rgba(236, 72, 153, 0.1)', color: '#EC4899' },
  product_demo: { label: 'Product Demo', icon: '📦', bg: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' },
  editor: { label: 'Video Editor', icon: '✂️', bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981' },
  motion_designer: { label: 'Motion Designer', icon: '✨', bg: 'rgba(249, 115, 22, 0.1)', color: '#F97316' },
  ugc_creator: { label: 'UGC Creator', icon: '🙋‍♀️', bg: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' },
  video_creator: { label: 'Video Creator', icon: '📹', bg: 'rgba(79, 70, 229, 0.1)', color: '#4F46E5' },
  other: { label: 'Other', icon: '📝', bg: 'rgba(107, 114, 128, 0.1)', color: '#6B7280' }
};

export default function BrandGigsManagementPage() {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const loadGigs = (selectFirst: boolean = false) => {
    getGigs()
      .then((list) => {
        setGigs(list);
        if (list.length > 0 && (selectFirst || !selectedGigId)) {
          setSelectedGigId(list[0].id);
        } else if (list.length === 0) {
          setSelectedGigId(null);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadGigs(true);

    // Theme subscription
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
      if (currentTheme) setTheme(currentTheme);
    };

    window.addEventListener('igigster-theme-change', handleThemeChange);
    return () => window.removeEventListener('igigster-theme-change', handleThemeChange);
  }, []);

  const handleToggleStatus = (gigId: string, currentStatus: Gig['status']) => {
    const nextStatus: Gig['status'] = currentStatus === 'active' ? 'rejected' : 'active';
    updateGigStatus(gigId, nextStatus)
      .then(() => loadGigs())
      .catch(console.error);
  };

  const handleDeleteGig = (gigId: string) => {
    if (confirm('Are you sure you want to close this campaign brief?')) {
      updateGigStatus(gigId, 'rejected')
        .then(() => loadGigs(true))
        .catch(console.error);
    }
  };

  const isLight = theme === 'light';

  // Design System color definitions using CSS variables
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const accentColor = '#EC4899';
  const shadowStyle = 'var(--shadow-style)';

  // Tabs structure
  const tabs = [
    { id: 'all', label: 'All Briefs' },
    { id: 'active', label: 'Active Briefs' },
    { id: 'pending', label: 'Pending Briefs' },
    { id: 'completed', label: 'Completed Briefs' }
  ];

  // Filtering filter logic
  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gig.category && gig.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'active') {
      return gig.status === 'active';
    }
    if (activeTab === 'pending') {
      // rejection represents paused brief
      return gig.status === 'rejected' || gig.status === 'pending';
    }
    if (activeTab === 'completed') {
      return gig.status === 'completed';
    }
    return true;
  });

  const selectedGig = gigs.find(g => g.id === selectedGigId) || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
            My Campaigns
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Manage active briefs, evaluate creators applicants, or create new campaigns.
          </p>
        </div>

        <Link
          href="/brand/post-gig"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: accentColor,
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
            transition: 'all 0.2s'
          }}
          className="glow-button-gigs"
        >
          <Plus size={16} />
          <span>Post Campaign</span>
        </Link>
      </div>

      {/* Two-Column split screen container */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Left Side: Campaign List Panel */}
        <div style={{ flex: '2 1 500px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Controls Bar (Search and Tabs) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Search Briefs */}
            <div style={{ position: 'relative', width: '100%' }}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns by brief title or category..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: cardBg,
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: shadowStyle
                }}
              />
            </div>

            {/* Sub-filtering Tabs */}
            <div style={{ display: 'flex', gap: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px' }}>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive ? primaryText : mutedText,
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      padding: '8px 2px',
                      position: 'relative',
                      transition: 'color 0.2s'
                    }}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-9px',
                          left: 0,
                          right: 0,
                          height: '2.5px',
                          backgroundColor: accentColor,
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards List container */}
          {filteredGigs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredGigs.map((gig) => {
                const isSelected = gig.id === selectedGigId;
                const cat = categoryInfo[gig.category] || categoryInfo.other;
                const dateString = new Date(gig.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                return (
                  <div
                    key={gig.id}
                    onClick={() => setSelectedGigId(gig.id)}
                    style={{
                      backgroundColor: isSelected ? (isLight ? '#FFF5F7' : 'rgba(236, 72, 153, 0.06)') : cardBg,
                      border: `1px solid ${isSelected ? accentColor : borderColor}`,
                      borderRadius: '16px',
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 16px rgba(236, 72, 153, 0.06)' : shadowStyle
                    }}
                    className={`gig-list-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: cat.bg,
                          color: cat.color
                        }}>
                          {cat.icon} {cat.label}
                        </span>
                        
                        {/* Status tag */}
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 750,
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: gig.status === 'active' 
                            ? 'rgba(16,185,129,0.08)' 
                            : gig.status === 'rejected' 
                              ? 'rgba(239,68,68,0.08)' 
                              : 'rgba(245,158,11,0.08)',
                          color: gig.status === 'active' 
                            ? '#10B981' 
                            : gig.status === 'rejected' 
                              ? '#EF4444' 
                              : '#F59E0B'
                        }}>
                          {gig.status === 'rejected' ? 'Paused' : gig.status}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: 750,
                        color: primaryText,
                        margin: 0,
                        lineHeight: 1.3,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}>
                        {gig.title}
                      </h3>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontSize: '12px', color: secondaryText, marginTop: '2px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} style={{ color: mutedText }} />
                          {dateString}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={12} style={{ color: mutedText }} />
                          {gig.applicantsCount} applicants
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: primaryText }}>
                        {displayPrice(gig.price, currency)}
                      </span>
                      <ChevronRight size={16} style={{ color: mutedText, opacity: isSelected ? 1 : 0.4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              boxShadow: shadowStyle
            }}>
              <AlertCircle size={32} style={{ color: mutedText, opacity: 0.6, margin: '0 auto 12px' }} />
              <p style={{ color: secondaryText, fontSize: '15px', fontWeight: 600, margin: 0 }}>
                No campaigns match this status filter.
              </p>
              <p style={{ color: mutedText, fontSize: '12.5px', marginTop: '6px', margin: '6px 0 0' }}>
                Try modifying your query or adjust the status tabs.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Sticky detailed campaign panel */}
        <div style={{ flex: '1 1 350px', position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {selectedGig ? (
            <div style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: shadowStyle,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              {/* Detailed Header */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: categoryInfo[selectedGig.category]?.bg || 'rgba(0,0,0,0.05)',
                    color: categoryInfo[selectedGig.category]?.color || secondaryText
                  }}>
                    {categoryInfo[selectedGig.category]?.icon} {categoryInfo[selectedGig.category]?.label}
                  </span>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: 750,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: selectedGig.status === 'active' 
                      ? 'rgba(16,185,129,0.1)' 
                      : selectedGig.status === 'rejected' 
                        ? 'rgba(239,68,68,0.1)' 
                        : 'rgba(245,158,11,0.1)',
                    color: selectedGig.status === 'active' 
                      ? '#10b981' 
                      : selectedGig.status === 'rejected' 
                        ? '#ef4444' 
                        : '#f59e0b',
                    border: selectedGig.status === 'active' 
                      ? '1px solid rgba(16,185,129,0.2)' 
                      : selectedGig.status === 'rejected' 
                        ? '1px solid rgba(239,68,68,0.2)' 
                        : '1px solid rgba(245,158,11,0.2)'
                  }}>
                    {selectedGig.status === 'rejected' ? 'Paused' : selectedGig.status}
                  </span>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 850, color: primaryText, margin: 0, lineHeight: 1.3 }}>
                  {selectedGig.title}
                </h2>
              </div>

              {/* Stats Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '12px 6px',
                backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)'
              }}>
                <div style={{ textAlign: 'center', borderRight: `1px solid ${borderColor}` }}>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Budget</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText, display: 'block', marginTop: '4px' }}>
                    {displayPrice(selectedGig.price, currency)}
                  </span>
                </div>
                <div style={{ textAlign: 'center', borderRight: `1px solid ${borderColor}` }}>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Applicants</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText, display: 'block', marginTop: '4px' }}>
                    {selectedGig.applicantsCount}
                  </span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Timeline</span>
                  <span style={{ fontSize: '11px', fontWeight: 650, color: primaryText, display: 'block', marginTop: '6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {selectedGig.deadline ? new Date(selectedGig.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Flexible'}
                  </span>
                </div>
              </div>

              {/* Scrollable Description details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }} className="inner-scroller">
                
                {/* Description */}
                <div>
                  <h4 style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 750, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Campaign Objective</h4>
                  <p style={{ fontSize: '13px', color: secondaryText, lineHeight: 1.5, margin: 0 }}>
                    {selectedGig.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                {selectedGig.deliverables && selectedGig.deliverables.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 750, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Deliverables Checklist</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedGig.deliverables.map((del, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: secondaryText }}>
                          <Briefcase size={13} style={{ color: accentColor, marginTop: '3px', flexShrink: 0 }} />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {selectedGig.requirements && selectedGig.requirements.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 750, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Requirements & Rules</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedGig.requirements.map((req, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: secondaryText }}>
                          <FileText size={13} style={{ color: '#8B5CF6', marginTop: '3px', flexShrink: 0 }} />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags section */}
                {selectedGig.tags && selectedGig.tags.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 750, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Campaign tags</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedGig.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          fontSize: '11px',
                          color: secondaryText,
                          backgroundColor: isLight ? '#F3F4F6' : '#1F1F23',
                          border: `1px solid ${borderColor}`,
                          borderRadius: '6px',
                          padding: '3px 8px'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  
                  {/* View applicants button */}
                  <Link
                    href={`/brand/applicants?view=applicants`}
                    style={{
                      backgroundColor: 'rgba(236, 72, 153, 0.08)',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                      color: accentColor,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    className="action-btn-applicants"
                  >
                    <Users size={14} />
                    <span>Applicants</span>
                  </Link>

                  {/* External preview Link */}
                  <Link
                    href={`/gigs/${selectedGig.slug}`}
                    target="_blank"
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${borderColor}`,
                      color: primaryText,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    className="hover-white-bg"
                  >
                    <Eye size={14} />
                    <span>Live Page</span>
                  </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Toggle Status (Pause / Activate) */}
                  <button
                    onClick={() => handleToggleStatus(selectedGig.id, selectedGig.status)}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${borderColor}`,
                      color: selectedGig.status === 'active' ? '#EF4444' : '#10B981',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                    className="hover-white-bg"
                  >
                    <Power size={14} />
                    <span>{selectedGig.status === 'active' ? 'Pause Gig' : 'Activate Gig'}</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteGig(selectedGig.id)}
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.15)',
                      color: '#EF4444',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                    className="action-btn-delete"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '40px 20px',
              boxShadow: shadowStyle,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '280px'
            }}>
              <AlertCircle size={36} style={{ color: mutedText, opacity: 0.5, marginBottom: '14px' }} />
              <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: primaryText, margin: '0 0 6px' }}>
                No Campaign Selected
              </h3>
              <p style={{ fontSize: '13px', color: secondaryText, margin: 0, maxWidth: '220px', lineHeight: 1.4 }}>
                Select a brief from the left side panel list to view guidelines and manage active states.
              </p>
            </div>
          )}
        </div>

      </div>

      <style jsx global>{`
        .inner-scroller::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .inner-scroller {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        .glow-button-gigs:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .gig-list-card:hover {
          border-color: rgba(236, 72, 153, 0.4) !important;
        }
        .gig-list-card.selected:hover {
          border-color: #EC4899 !important;
        }

        .action-btn-applicants:hover {
          background-color: rgba(236, 72, 153, 0.12) !important;
          border-color: rgba(236, 72, 153, 0.35) !important;
        }
        .action-btn-delete:hover {
          background-color: rgba(239, 68, 68, 0.12) !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
        }
        
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
