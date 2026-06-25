'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, Sparkles, Star, BadgeCheck, Globe,
  ArrowRight, ShieldCheck, MapPin, Smile, ChevronRight, Loader2, Link as LinkIcon
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';

interface ProfileStrengthViewProps {
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

export default function CreatorProfileStrengthView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ProfileStrengthViewProps) {
  const { user, creator, loadDashboard } = useDashboardStore();
  const profile = creator.profile;

  // Track state of complete checklist items
  const [socialLinked, setSocialLinked] = useState(false);
  const [tagsAdded, setTagsAdded] = useState(false);
  
  // Input triggers
  const [isLinking, setIsLinking] = useState(false);
  const [socialInput, setSocialInput] = useState('');
  const [showSocialForm, setShowSocialForm] = useState(false);

  const [isAddingTags, setIsAddingTags] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('Fashion');
  const [showTagForm, setShowTagForm] = useState(false);

  // Sync completion states with local storage for persistence across tabs
  useEffect(() => {
    const isInstaLinked = localStorage.getItem('igigster_social_linked') === 'true';
    const areTagsAdded = localStorage.getItem('igigster_tags_added') === 'true';
    if (isInstaLinked) setSocialLinked(true);
    if (areTagsAdded) setTagsAdded(true);
  }, []);

  const handleLinkSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialInput.trim()) return;
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setSocialLinked(true);
      setShowSocialForm(false);
      localStorage.setItem('igigster_social_linked', 'true');
      
      // Dispatch update event for dashboard widget sync
      window.dispatchEvent(new Event('creator-profile-updated'));
    }, 1500);
  };

  const handleAddTags = () => {
    setIsAddingTags(true);
    setTimeout(() => {
      setIsAddingTags(false);
      setTagsAdded(true);
      setShowTagForm(false);
      localStorage.setItem('igigster_tags_added', 'true');
      
      // Dispatch update event for dashboard widget sync
      window.dispatchEvent(new Event('creator-profile-updated'));
    }, 1000);
  };

  // Calculate dynamic strength percentage
  let strengthPercent = 85;
  if (socialLinked) strengthPercent += 10;
  if (tagsAdded) strengthPercent += 5;

  // Determine Badge Level
  const getBadgeInfo = () => {
    if (strengthPercent === 100) {
      return {
        label: 'Pro Creator Elite',
        color: '#10B981',
        desc: 'Fully unlocked reach. Your profile is ranked on top of matchmaking algorithms.'
      };
    }
    if (strengthPercent >= 95) {
      return {
        label: 'Vetted Rising Star',
        color: '#8B5CF6',
        desc: 'Highly matching visibility. Link your social account to hit maximum rating.'
      };
    }
    return {
      label: 'Emerging Talent',
      color: '#EC4899',
      desc: 'Standard visibility. Complete specialty tags and socials to reach next tier.'
    };
  };

  const badgeInfo = getBadgeInfo();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
          Profile Strength Hub
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
          Increase your matching visibility, get featured on brand discovery feeds, and earn more.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px', alignItems: 'start' }} className="strength-grid-stack">
        
        {/* Left Column Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '0 0 16px 0' }}>Profile Completion Checklist</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Item 1: Title and Bio */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: 'line-through', opacity: 0.6 }}>Bio & Title Setup</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>+25%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    Profile title "{profile?.title || 'UGC Creator'}" and bios are fully declared.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: borderColor, opacity: 0.5 }} />

              {/* Item 2: Rate Cards */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: 'line-through', opacity: 0.6 }}>Video Rate Cards</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>+25%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    Starting price configurations are mapped in standard currency formats.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: borderColor, opacity: 0.5 }} />

              {/* Item 3: Portfolio Reels */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: 'line-through', opacity: 0.6 }}>Portfolio Video Reels</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>+20%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    Active visual samples have been uploaded to showcase creative production quality.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: borderColor, opacity: 0.5 }} />

              {/* Item 4: Phone verification */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} style={{ color: '#10B981', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: 'line-through', opacity: 0.6 }}>Mobile Contact Verification</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}>+15%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    OTP confirmation completed for brief proposal outboxes.
                  </p>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: borderColor, opacity: 0.5 }} />

              {/* Item 5: Link social handles (Interactive) */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>
                  {socialLinked ? (
                    <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${borderColor}` }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: socialLinked ? 'line-through' : 'none', opacity: socialLinked ? 0.6 : 1 }}>Link Instagram Handle</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: socialLinked ? '#10B981' : accentColor }}>+10%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    Link your active Instagram handle to display reel feeds directly to brand portfolios.
                  </p>

                  {!socialLinked && (
                    <div style={{ marginTop: '10px' }}>
                      {!showSocialForm ? (
                        <button
                          onClick={() => setShowSocialForm(true)}
                          style={{
                            backgroundColor: 'rgba(236,72,153,0.06)',
                            border: `1.5px solid ${accentColor}`,
                            color: accentColor,
                            fontSize: '11.5px',
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Link Instagram
                        </button>
                      ) : (
                        <form onSubmit={handleLinkSocial} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '300px' }}>
                          <input
                            type="text"
                            placeholder="@username"
                            value={socialInput}
                            onChange={(e) => setSocialInput(e.target.value)}
                            required
                            style={{
                              flex: 1,
                              height: '32px',
                              borderRadius: '6px',
                              border: `1px solid ${borderColor}`,
                              backgroundColor: isLight ? '#FFFFFF' : '#141417',
                              color: primaryText,
                              padding: '0 10px',
                              fontSize: '12px',
                              outline: 'none'
                            }}
                          />
                          <button
                            type="submit"
                            disabled={isLinking}
                            style={{
                              backgroundColor: accentColor,
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0 12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isLinking ? <Loader2 size={12} className="animate-spin" /> : 'Connect'}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: borderColor, opacity: 0.5 }} />

              {/* Item 6: Specialty tags */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>
                  {tagsAdded ? (
                    <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                  ) : (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${borderColor}` }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText, textDecoration: tagsAdded ? 'line-through' : 'none', opacity: tagsAdded ? 0.6 : 1 }}>Add Primary Specialties</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: tagsAdded ? '#10B981' : accentColor }}>+5%</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>
                    Tag your key skills (such as Fashion, Skincare, Food reviews) to guide AI matchmaking filters.
                  </p>

                  {!tagsAdded && (
                    <div style={{ marginTop: '10px' }}>
                      {!showTagForm ? (
                        <button
                          onClick={() => setShowTagForm(true)}
                          style={{
                            backgroundColor: 'rgba(236,72,153,0.06)',
                            border: `1.5px solid ${accentColor}`,
                            color: accentColor,
                            fontSize: '11.5px',
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Add Niche Specialties
                        </button>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '340px' }}>
                          <select
                            value={selectedNiche}
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            style={{
                              flex: 1,
                              height: '32px',
                              borderRadius: '6px',
                              border: `1px solid ${borderColor}`,
                              backgroundColor: isLight ? '#FFFFFF' : '#141417',
                              color: primaryText,
                              padding: '0 8px',
                              fontSize: '12px',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Fashion">Fashion & Apparel</option>
                            <option value="Skincare">Skincare & Beauty</option>
                            <option value="Tech">Tech reviews</option>
                            <option value="Fitness">Fitness & Wellness</option>
                          </select>
                          <button
                            onClick={handleAddTags}
                            disabled={isAddingTags}
                            style={{
                              backgroundColor: accentColor,
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0 12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isAddingTags ? <Loader2 size={12} className="animate-spin" /> : 'Confirm'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column Radial Ring */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Radial Card */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '28px 24px',
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            
            {/* SVG Radial circle progress ring */}
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '20px' }}>
              <svg width="100%" height="100%" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)'}
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={accentColor}
                  strokeDasharray={`${strengthPercent}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease-out' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', lineHeight: 1 }}>{strengthPercent}%</span>
                <span style={{ fontSize: '9px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', marginTop: '4px' }}>Strength</span>
              </div>
            </div>

            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              color: badgeInfo.color,
              backgroundColor: `${badgeInfo.color}08`,
              border: `1.5px solid ${badgeInfo.color}18`,
              padding: '4px 10px',
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}>{badgeInfo.label}</span>

            <p style={{ fontSize: '12px', color: secondaryText, margin: '12px 0 0 0', lineHeight: '1.4' }}>
              {badgeInfo.desc}
            </p>
          </div>

          {/* Stats details card */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <ShieldCheck size={18} style={{ color: '#10B981' }} />
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Vetted Creator Verification</h4>
            </div>

            <p style={{ fontSize: '11.5px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
              Vetted creators with a complete 100% profile score receive exclusive privileges:
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                'First-priority ranking in AI Talent Matchmaking filters',
                'Featured badge listing on brand search directories',
                'Ability to pitch custom pricing directly for locked briefs',
                'Direct notifications when brands review script boards'
              ].map((benefit, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: secondaryText }}>
                  <Star size={11} fill="currentColor" style={{ color: '#F59E0B', marginTop: '2.5px', flexShrink: 0 }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      <style jsx global>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .strength-grid-stack {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
