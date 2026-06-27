'use client';

import React, { useState, useEffect } from 'react';
import { getCreators } from '@/lib/services';
import { Creator } from '@/types/creator';
import { 
  CheckCircle2, Shield, User, Trash2, Search, Filter, Mail, Phone,
  Globe, ShieldCheck, ShieldAlert, Star, Award, Check, FileText, X
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { MultiCurrencyPrice } from '@/types/common';


interface ExtendedUser {
  id: string;
  name: string;
  avatar: string;
  title: string;
  email: string;
  role: 'creator' | 'brand' | 'agency';
  isVerified: boolean;
  startingRate: MultiCurrencyPrice;
  completedJobs: number;
  location: string;
  tier: 'emerging' | 'rising' | 'elite' | 'enterprise';
  docStatus: 'submitted' | 'approved' | 'missing';
  taxId?: string;
  socialsConnected: {
    instagram: boolean;
    tiktok: boolean;
    youtube: boolean;
  }
}


export default function AdminUsersPage() {
  const { currency } = useCurrency();
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRoleTab, setActiveRoleTab] = useState<'all' | 'creator' | 'brand' | 'agency'>('all');

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


  // Styling Variables
  const accentColor = '#EC4899';
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const shadowStyle = 'var(--shadow-style)';

  useEffect(() => {
    getCreators()
      .then((originalCreators) => {
        const extendedList: ExtendedUser[] = [
          ...originalCreators.map((c, i) => ({
            id: c.id,
            name: c.name,
            avatar: c.avatar,
            title: c.title,
            email: `${c.name.toLowerCase().replace(' ', '')}@igigster.com`,
            role: 'creator' as const,
            isVerified: c.isVerified || false,
            startingRate: c.startingRate,
            completedJobs: c.completedJobs,
            location: c.location,
            tier: i === 0 ? ('elite' as const) : ('rising' as const),
            docStatus: i === 0 ? ('approved' as const) : ('submitted' as const),
            taxId: `TX-CR-${1000 + i}`,
            socialsConnected: {
              instagram: true,
              tiktok: i % 2 === 0,
              youtube: false
            }
          })),
          {
            id: 'brand-u1',
            name: 'Mamaearth Cosmetics',
            avatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60',
            title: 'Brand Manager',
            email: 'campaigns@mamaearth.in',
            role: 'brand' as const,
            isVerified: true,
            startingRate: { INR: 0, USD: 0 },
            completedJobs: 14,
            location: 'Gurugram, India',
            tier: 'enterprise' as const,
            docStatus: 'approved' as const,
            taxId: 'GST-ME-9022A',
            socialsConnected: { instagram: true, tiktok: false, youtube: true }
          },
          {
            id: 'brand-u2',
            name: 'FitLife Wellness',
            avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60',
            title: 'Influencer Coordinator',
            email: 'collabs@fitlife.co',
            role: 'brand' as const,
            isVerified: false,
            startingRate: { INR: 0, USD: 0 },
            completedJobs: 8,
            location: 'Mumbai, India',
            tier: 'enterprise' as const,
            docStatus: 'submitted' as const,
            taxId: 'GST-FL-7033B',
            socialsConnected: { instagram: true, tiktok: true, youtube: false }
          },
          {
            id: 'agency-u1',
            name: 'Alpha UGC Talent Agency',
            avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=60',
            title: 'Agency Principal',
            email: 'partners@alphaugc.com',
            role: 'agency' as const,
            isVerified: true,
            startingRate: { INR: 0, USD: 0 },
            completedJobs: 42,
            location: 'New Delhi, India',
            tier: 'elite' as const,
            docStatus: 'approved' as const,
            taxId: 'PAN-AL-3921Z',
            socialsConnected: { instagram: true, tiktok: true, youtube: true }
          }
        ];

        const cached = localStorage.getItem('igigster_admin_users');
        if (cached) {
          setUsers(JSON.parse(cached));
        } else {
          setUsers(extendedList);
          localStorage.setItem('igigster_admin_users', JSON.stringify(extendedList));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching creators for admin users:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  const handleToggleVerify = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextVerified = !u.isVerified;
        return { 
          ...u, 
          isVerified: nextVerified, 
          docStatus: nextVerified ? ('approved' as const) : u.docStatus 
        };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('igigster_admin_users', JSON.stringify(updated));

    const updatedSelected = updated.find(u => u.id === id);
    if (updatedSelected) {
      setSelectedUser(updatedSelected);
    }
  };

  const handleUpdateTier = (id: string, newTier: ExtendedUser['tier']) => {
    const updated = users.map(u => {
      if (u.id === id) {
        return { ...u, tier: newTier };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('igigster_admin_users', JSON.stringify(updated));

    const updatedSelected = updated.find(u => u.id === id);
    if (updatedSelected) {
      setSelectedUser(updatedSelected);
    }
  };

  // Search & Filter Query
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRoleTab === 'all' ? true : u.role === activeRoleTab;
    return matchesSearch && matchesRole;
  });

  const getTierBadge = (tier: ExtendedUser['tier']) => {
    switch (tier) {
      case 'elite': return { label: 'Elite Creator', color: '#8B5CF6' };
      case 'rising': return { label: 'Rising Star', color: '#3B82F6' };
      case 'enterprise': return { label: 'Enterprise Partner', color: '#10B981' };
      default: return { label: 'Emerging Talent', color: '#EC4899' };
    }
  };

  if (loading) return <div style={{ color: primaryText }}>Loading platform users directory...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>Platform Users Manager</h1>
        <p style={{ color: mutedText, fontSize: '14px', marginTop: '4px' }}>
          Verify identities, audit tax registrations, connect visual socials, and moderate platform rankings.
        </p>
      </div>

      {/* Filters bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
          <input
            type="text"
            placeholder="Search by name, email or skills..."
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
          {(['all', 'creator', 'brand', 'agency'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRoleTab(role)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'capitalize',
                backgroundColor: activeRoleTab === role ? (theme === 'light' ? '#FFFFFF' : 'rgba(255,255,255,0.08)') : 'transparent',
                color: activeRoleTab === role ? primaryText : mutedText,
                transition: 'all 0.2s'
              }}
            >
              {role === 'all' ? 'All Accounts' : role === 'creator' ? 'Creators' : role === 'brand' ? 'Brands' : 'Agencies'}
            </button>
          ))}
        </div>

      </div>

      {/* Split Screen Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.6fr', gap: '24px', alignItems: 'start' }} className="admin-split-layout">
        
        {/* Left Column: Users list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '680px', overflowY: 'auto' }} className="inner-scroller">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => {
              const isSelected = selectedUser?.id === u.id;
              const badge = getTierBadge(u.tier);

              return (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${isSelected ? accentColor : borderColor}`,
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: shadowStyle,
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img 
                      src={u.avatar} 
                      alt={u.name} 
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${borderColor}` }} 
                    />
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 750, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                        {u.isVerified && <CheckCircle2 size={13} fill="#10B981" color="#ffffff" />}
                      </h4>
                      <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{u.title}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{
                        fontSize: '8.5px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        backgroundColor: `${badge.color}06`,
                        color: badge.color,
                        border: `1px solid ${badge.color}15`
                      }}>{u.role}</span>
                      <span style={{ fontSize: '10.5px', color: primaryText, fontWeight: 700 }}>
                        {u.role === 'creator' ? displayPrice(u.startingRate, currency) : `${u.completedJobs} hires`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '32px', backgroundColor: cardBg, borderRadius: '16px', border: `1px solid ${borderColor}`, textAlign: 'center', color: mutedText }}>
              No members found matching query parameters.
            </div>
          )}
        </div>

        {/* Right Column: User detailed inspector */}
        {selectedUser ? (
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
            {/* Main Header Card */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <img 
                src={selectedUser.avatar} 
                alt={selectedUser.name} 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${borderColor}` }} 
              />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {selectedUser.name}
                  {selectedUser.isVerified && <CheckCircle2 size={16} fill="#10B981" color="#ffffff" />}
                </h3>
                <span style={{ fontSize: '12.5px', color: secondaryText, display: 'block', marginTop: '2px' }}>{selectedUser.title}</span>
                <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>Location: {selectedUser.location}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, opacity: 0.5 }} />

            {/* Verification & KYC Documents Check */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Account Vetting</span>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="admin-vetting-checks">
                {/* Tax ID */}
                <div style={{ backgroundColor: 'var(--hover-bg)', padding: '14px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Taxpayer ID Audits</span>
                  <span style={{ fontSize: '13px', fontWeight: 750, color: primaryText, marginTop: '4px', display: 'block' }}>
                    {selectedUser.taxId || 'Missing Tax Registration'}
                  </span>
                </div>

                {/* Doc status */}
                <div style={{ backgroundColor: 'var(--hover-bg)', padding: '14px', borderRadius: '12px', border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: selectedUser.docStatus === 'approved' ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)',
                    color: selectedUser.docStatus === 'approved' ? '#10B981' : '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {selectedUser.docStatus === 'approved' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Identity Papers</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText, marginTop: '2px', display: 'block', textTransform: 'capitalize' }}>
                      {selectedUser.docStatus === 'approved' ? 'Docs Approved' : 'Submitted (Awaiting Review)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social connections */}
            {selectedUser.role !== 'brand' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Linked Visual Channels</span>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {Object.entries(selectedUser.socialsConnected).map(([platform, connected]) => (
                    <div 
                      key={platform}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: connected ? 'rgba(16,185,129,0.04)' : 'var(--hover-bg)',
                        border: `1px solid ${connected ? 'rgba(16,185,129,0.15)' : borderColor}`,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        color: connected ? '#10B981' : mutedText,
                        fontWeight: 700,
                        textTransform: 'capitalize'
                      }}
                    >
                      {connected ? <Check size={12} /> : <X size={12} />}
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: `1px solid ${borderColor}`, opacity: 0.5 }} />

            {/* Account Tiers configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Modify Platform Tier</span>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedUser.role === 'creator' ? (
                  (['emerging', 'rising', 'elite'] as const).map((tier) => {
                    const isCurrent = selectedUser.tier === tier;
                    return (
                      <button
                        key={tier}
                        onClick={() => handleUpdateTier(selectedUser.id, tier)}
                        style={{
                          height: '32px',
                          borderRadius: '8px',
                          border: `1.5px solid ${isCurrent ? accentColor : borderColor}`,
                          backgroundColor: isCurrent ? `${accentColor}06` : 'transparent',
                          color: isCurrent ? accentColor : primaryText,
                          fontSize: '11.5px',
                          fontWeight: 750,
                          padding: '0 12px',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                          transition: 'all 0.2s'
                        }}
                      >
                        {tier}
                      </button>
                    );
                  })
                ) : (
                  <button
                    disabled
                    style={{
                      height: '32px',
                      borderRadius: '8px',
                      border: `1.5px solid ${borderColor}`,
                      backgroundColor: 'var(--hover-bg)',
                      color: mutedText,
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '0 12px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {selectedUser.tier} Tier (Auto assigned)
                  </button>
                )}
              </div>
            </div>

            {/* Main Action verification checkbox */}
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: mutedText }}>Account Verification Status</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: selectedUser.isVerified ? '#10B981' : '#F59E0B', display: 'block', marginTop: '4px' }}>
                  {selectedUser.isVerified ? 'Verified' : 'Verification Pending'}
                </span>
              </div>

              <button
                onClick={() => handleToggleVerify(selectedUser.id)}
                style={{
                  height: '38px',
                  backgroundColor: selectedUser.isVerified ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
                  border: selectedUser.isVerified ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(16,185,129,0.15)',
                  color: selectedUser.isVerified ? '#EF4444' : '#10B981',
                  borderRadius: '10px',
                  padding: '0 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {selectedUser.isVerified ? 'Revoke Verification' : 'Approve & Verify User'}
              </button>
            </div>

          </div>
        ) : (
          <div style={{ padding: '40px', backgroundColor: cardBg, borderRadius: '24px', border: `1px solid ${borderColor}`, textAlign: 'center', color: mutedText }}>
            Select a profile directory user to audit.
          </div>
        )}

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
        @media (max-width: 992px) {
          .admin-split-layout {
            grid-template-columns: 1fr !important;
          }
          .admin-vetting-checks {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
