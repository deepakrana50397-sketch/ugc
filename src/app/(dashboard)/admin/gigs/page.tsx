'use client';

import React, { useState, useEffect } from 'react';
import { getGigs, updateGigStatus } from '@/lib/services';
import { Gig } from '@/types/gig';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { 
  Calendar, UserCheck, ShieldAlert, CheckCircle, XCircle, Search, 
  AlertTriangle, Check, FileText, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';

export default function AdminGigsPage() {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'rejected'>('all');

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Theme subscription
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
      if (currentTheme) setTheme(currentTheme);
    };

    window.addEventListener('igigster-theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('igigster-theme-change', handleThemeChange);
    };
  }, []);


  // Rejection modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Pricing below UGC standard baseline ($100/₹8000)');

  // Colors
  const accentColor = '#EC4899';
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const shadowStyle = 'var(--shadow-style)';

  const fetchGigs = (selectGigId?: string) => {
    getGigs()
      .then((freshGigs) => {
        setGigs(freshGigs);
        if (selectGigId) {
          const updatedSelected = freshGigs.find(g => g.id === selectGigId);
          if (updatedSelected) {
            setSelectedGig(updatedSelected);
          }
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    if (gigs.length > 0 && !selectedGig) {
      setSelectedGig(gigs[0]);
    }
  }, [gigs]);

  const handleStatusChange = (gigId: string, status: Gig['status'], reasonText?: string) => {
    updateGigStatus(gigId, status)
      .then(() => {
        fetchGigs(gigId);
        setShowRejectModal(false);
      })
      .catch(console.error);
  };

  // Vetting checks
  const runVettingScanner = (gig: Gig) => {
    const alerts = [];
    const textToScan = `${gig.title} ${gig.description || ''} ${gig.requirements?.join(' ') || ''}`.toLowerCase();
    
    // Check contact leaks
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
    const hasComOrNet = textToScan.includes('.com') || textToScan.includes('.net') || textToScan.includes('.in') || textToScan.includes('http');
    const hasContactKeywords = textToScan.includes('whatsapp') || textToScan.includes('whatsapp number') || textToScan.includes('contact me') || textToScan.includes('dm me') || textToScan.includes('instagram dm');

    if (emailRegex.test(textToScan) || phoneRegex.test(textToScan) || hasComOrNet || hasContactKeywords) {
      alerts.push({
        type: 'critical',
        msg: 'Contact leak detected: Brief contains emails, phone triggers, URLs, or WhatsApp keywords.'
      });
    }

    // Check pricing baseline compliance
    const isINR = currency === 'INR';
    const budgetAmount = gig.price[isINR ? 'INR' : 'USD'];
    const minUSD = 100;
    const minINR = 8000;

    // Standard baseline compliance checks
    if (isINR) {
      if (budgetAmount < minINR) {
        alerts.push({
          type: 'pricing',
          msg: `Below Baseline: Budget ${displayPrice(gig.price, 'INR')} is less than UGC minimum baseline standard ₹${minINR.toLocaleString()}.`
        });
      }
    } else {
      if (budgetAmount < minUSD) {
        alerts.push({
          type: 'pricing',
          msg: `Below Baseline: Budget ${displayPrice(gig.price, 'USD')} is less than UGC minimum baseline standard $${minUSD}.`
        });
      }
    }

    return alerts;
  };

  // Filter Gigs
  const filteredGigs = gigs.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' ? true : 
                       activeTab === 'pending' ? g.status !== 'active' && g.status !== 'rejected' :
                       g.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>Campaign Brief Audit Vetting</h1>
        <p style={{ color: mutedText, fontSize: '14px', marginTop: '4px' }}>
          Verify that brand briefs conform to UGC pricing day-rate baselines and contain no contact leaks.
        </p>
      </div>

      {/* Action Filters Grid */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
          <input
            type="text"
            placeholder="Search campaigns or brand names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              paddingLeft: '38px',
              fontSize: '13px',
              color: primaryText,
              outline: 'none',
              transition: 'all 0.2s'
            }}
          />
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--hover-bg)', padding: '3px', borderRadius: '10px', border: `1px solid ${borderColor}` }}>
          {(['all', 'pending', 'active', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize',
                backgroundColor: activeTab === tab ? (theme === 'light' ? '#FFFFFF' : 'rgba(255,255,255,0.08)') : 'transparent',
                color: activeTab === tab ? primaryText : mutedText,
                transition: 'all 0.2s'
              }}
            >
              {tab === 'pending' ? 'Verification Queue' : tab === 'active' ? 'Approved' : tab}
            </button>
          ))}
        </div>

      </div>

      {/* Split Screen Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.6fr', gap: '24px', alignItems: 'start' }} className="admin-split-layout">
        
        {/* Left Column: Briefs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto' }} className="inner-scroller">
          {filteredGigs.length > 0 ? (
            filteredGigs.map((gig) => {
              const isSelected = selectedGig?.id === gig.id;
              const scanAlerts = runVettingScanner(gig);
              const hasAlerts = scanAlerts.length > 0;

              return (
                <div
                  key={gig.id}
                  onClick={() => setSelectedGig(gig)}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${isSelected ? accentColor : (hasAlerts ? 'rgba(245,158,11,0.25)' : borderColor)}`,
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: shadowStyle,
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', color: mutedText, fontWeight: 700 }}>Posted: {new Date(gig.postedAt).toLocaleDateString()}</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {hasAlerts && (
                        <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                          <AlertTriangle size={9} /> Scan Triggered
                        </span>
                      )}
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: gig.status === 'active' ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
                        color: gig.status === 'active' ? '#10B981' : '#EF4444',
                        border: gig.status === 'active' ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(239,68,68,0.1)'
                      }}>
                        {gig.status}
                      </span>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 750, color: primaryText, margin: '0 0 6px 0' }}>{gig.title}</h4>
                  <span style={{ fontSize: '11.5px', color: secondaryText, display: 'block' }}>Brand: {gig.brandName}</span>
                  
                  <div style={{ borderTop: `1px solid ${borderColor}`, marginTop: '12px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>Compensation</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: primaryText }}>{displayPrice(gig.price, currency)}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '32px', backgroundColor: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, textAlign: 'center', color: mutedText }}>
              No briefs match search selections.
            </div>
          )}
        </div>

        {/* Right Column: Detailed Vetting inspector */}
        {selectedGig ? (
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Brief Audit Sheet</span>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>ID: {selectedGig.id}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: '0 0 6px 0' }}>{selectedGig.title}</h3>
              <span style={{ fontSize: '12.5px', color: secondaryText }}>Brand: <strong>{selectedGig.brandName}</strong> • Budget: <strong>{displayPrice(selectedGig.price, currency)}</strong></span>
            </div>

            {/* AI Scanner Warnings */}
            {(() => {
              const alerts = runVettingScanner(selectedGig);
              if (alerts.length === 0) return null;

              return (
                <div style={{
                  backgroundColor: 'rgba(245,158,11,0.04)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  padding: '16px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={15} /> compliance scan warnings:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {alerts.map((al, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11.5px', color: secondaryText }}>
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          backgroundColor: al.type === 'critical' ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)',
                          color: al.type === 'critical' ? '#EF4444' : '#F59E0B',
                          border: al.type === 'critical' ? '1px solid rgba(239,68,68,0.1)' : '1px solid rgba(245,158,11,0.1)',
                          marginTop: '2px',
                          flexShrink: 0
                        }}>{al.type}</span>
                        <span>{al.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Campaign description & guidelines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Briefing & Guidelines</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700 }}>Description:</span>
                  <p style={{ fontSize: '13px', color: secondaryText, margin: '4px 0 0 0', lineHeight: '1.4' }}>
                    {selectedGig.description || 'No description uploaded for this brief.'}
                  </p>
                </div>

                {selectedGig.requirements && selectedGig.requirements.length > 0 && (
                  <div>
                    <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700 }}>Deliverable Requirements:</span>
                    <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {selectedGig.requirements.map((req, i) => (
                        <li key={i} style={{ fontSize: '12.5px', color: secondaryText }}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Audit Actions */}
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: mutedText, display: 'block' }}>Current Status</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: selectedGig.status === 'active' ? '#10B981' : '#EF4444',
                  marginTop: '4px',
                  display: 'block'
                }}>{selectedGig.status}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedGig.status !== 'active' && (
                  <button
                    onClick={() => handleStatusChange(selectedGig.id, 'active')}
                    style={{
                      height: '38px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0 16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle size={15} /> Approve & Publish
                  </button>
                )}

                {selectedGig.status !== 'rejected' && (
                  <button
                    onClick={() => setShowRejectModal(true)}
                    style={{
                      height: '38px',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0 16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <XCircle size={15} /> Reject / Delist Brief
                  </button>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div style={{ padding: '40px', backgroundColor: cardBg, borderRadius: '24px', border: `1px solid ${borderColor}`, textAlign: 'center', color: mutedText }}>
            Select a campaign from the vetting ledger.
          </div>
        )}

      </div>

      {/* Reject Reason Modal Dialog */}
      {showRejectModal && selectedGig && (
        <div
          onClick={() => setShowRejectModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '24px',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Select Delisting Reason</h3>
              <button
                onClick={() => setShowRejectModal(false)}
                style={{ background: 'none', border: 'none', color: secondaryText, cursor: 'pointer', padding: '4px' }}
              >
                <XCircle size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Reason template</label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{
                  height: '38px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#141417',
                  color: primaryText,
                  padding: '0 10px',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Pricing below UGC standard baseline ($100/₹8000)">Pricing below baseline standard ($100/₹8000)</option>
                <option value="Brief contains contact leaks (Email/Phone triggers)">Brief contains contact leaks (Email/Phone/WhatsApp)</option>
                <option value="Vague details or inadequate guidelines">Vague details or inadequate guidelines</option>
                <option value="Prohibited or inappropriate category items">Prohibited/Inappropriate items</option>
              </select>
            </div>

            <button
              onClick={() => handleStatusChange(selectedGig.id, 'rejected', rejectReason)}
              style={{
                height: '38px',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '19px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Confirm Delisting / Rejection
            </button>
          </div>
        </div>
      )}

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
        @media (max-width: 992px) {
          .admin-split-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
