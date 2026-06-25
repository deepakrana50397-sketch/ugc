'use client';

import React, { useState } from 'react';
import { Sparkles, Users, Star, MapPin, ChevronRight, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface TalentMatchViewProps {
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

interface MatchCandidate {
  id: string;
  name: string;
  title: string;
  rating: number;
  avatar: string;
  location: string;
  rateINR: number;
  rateUSD: number;
  matchScore: number;
  tagsMatched: string[];
  mismatchReason?: string;
}

export default function BrandTalentMatchView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: TalentMatchViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  const [selectedBrief, setSelectedBrief] = useState<string>(' Mamaearth Vitamin C Serum ASMR');
  const [candidates, setCandidates] = useState<MatchCandidate[]>([
    {
      id: 'mc_1',
      name: 'Ananya Sharma',
      title: 'Beauty & Skincare UGC Creator',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
      location: 'Delhi, India',
      rateINR: 20000,
      rateUSD: 250,
      matchScore: 96,
      tagsMatched: ['Skincare', 'Beauty', 'Reels']
    },
    {
      id: 'mc_2',
      name: 'Priya Nair',
      title: 'Lifestyle & Fashion Influencer',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
      location: 'Bangalore, India',
      rateINR: 16000,
      rateUSD: 200,
      matchScore: 88,
      tagsMatched: ['Beauty', 'Reels']
    },
    {
      id: 'mc_3',
      name: 'Rahul Verma',
      title: 'Commercial Product Reviewer',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
      location: 'Mumbai, India',
      rateINR: 12000,
      rateUSD: 150,
      matchScore: 72,
      tagsMatched: ['Reels'],
      mismatchReason: 'Niche overlap discrepancy (mainly tech focus)'
    }
  ]);

  const formatPrice = (inrVal: number, usdVal: number) => {
    return isINR ? `₹${inrVal.toLocaleString()}` : `$${usdVal.toLocaleString()}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
          AI Talent Match
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
          Match and sort creator profiles automatically based on target demographics and brief keyword alignment.
        </p>
      </div>

      {/* Brief selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '400px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Select active brief target</label>
        <select
          value={selectedBrief}
          onChange={(e) => setSelectedBrief(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '10px',
            border: `1px solid ${borderColor}`,
            backgroundColor: cardBg,
            color: primaryText,
            fontSize: '13px',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: shadowStyle
          }}
        >
          <option value="Mamaearth Vitamin C Serum ASMR">Mamaearth Vitamin C Serum ASMR</option>
          <option value="boAt Rockerz Launch Review">boAt Rockerz Launch Review</option>
          <option value="Wow Skin Organic Try-On">Wow Skin Organic Try-On</option>
        </select>
      </div>

      {/* Candidates List layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Matched Creator Rankings</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {candidates.map(candidate => (
            <div key={candidate.id} style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: shadowStyle,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              {/* Creator details and match rings */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                
                {/* SVG Match circle ring */}
                <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                  <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={isLight ? '#F3F4F6' : 'rgba(255,255,255,0.06)'}
                      strokeWidth="2.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={candidate.matchScore >= 90 ? '#10B981' : candidate.matchScore >= 80 ? '#8B5CF6' : '#F59E0B'}
                      strokeDasharray={`${candidate.matchScore}, 100`}
                      strokeWidth="2.5"
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '11px', fontWeight: 800, color: primaryText }}>
                    {candidate.matchScore}%
                  </div>
                </div>

                {/* Info details */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img src={candidate.avatar} alt={candidate.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>{candidate.name}</h4>
                    <span style={{ fontSize: '12px', color: secondaryText, display: 'block', marginTop: '2px' }}>{candidate.title}</span>
                    <span style={{ fontSize: '11px', color: mutedText, display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={11} fill="currentColor" style={{ color: '#F59E0B' }} /> {candidate.rating}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {candidate.location}</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Tag analysis & Ctas */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, display: 'block' }}>
                    {formatPrice(candidate.rateINR, candidate.rateUSD)}
                  </span>
                  
                  {/* Match tags lists */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    {candidate.tagsMatched.map((tag, idx) => (
                      <span key={idx} style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        color: '#10B981',
                        padding: '2px 5px',
                        borderRadius: '4px'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {candidate.mismatchReason && (
                    <span style={{ fontSize: '10px', color: '#F59E0B', display: 'block', marginTop: '6px' }}>⚠️ {candidate.mismatchReason}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => alert(`Sending dynamic brief offer invitation to ${candidate.name}...`)}
                    style={{
                      backgroundColor: accentColor,
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(236,72,153,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    className="glow-button-match"
                  >
                    <Sparkles size={12} />
                    <span>Invite</span>
                  </button>

                  <button
                    onClick={() => alert(`Direct messaging with ${candidate.name}...`)}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${borderColor}`,
                      color: primaryText,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    className="hover-white-bg"
                  >
                    <MessageSquare size={13} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .glow-button-match:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
