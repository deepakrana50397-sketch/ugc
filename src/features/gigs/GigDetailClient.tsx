'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Briefcase, ArrowLeft, Check, Send, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Gig } from '@/types/gig';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, formatPrice } from '@/lib/currency';
import { applyToGig, getCurrentUser } from '@/lib/services';
import { User } from '@/types/common';

interface GigDetailClientProps {
  gig: Gig;
}

export default function GigDetailClient({ gig }: GigDetailClientProps) {
  const { currency } = useCurrency();
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [pitch, setPitch] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch || !portfolioLink || !expectedRate) return;

    setIsSubmitting(true);
    
    // Estimate exchange rate for storing both currency values
    // Assume 1 USD = 85 INR for mockup conversions
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
          gigId: gig.id,
          pitch,
          portfolioLink,
          rate: { INR: rateINR, USD: rateUSD }
        });
        
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Refresh page or update data
        setTimeout(() => {
          setShowApplyModal(false);
          setIsSuccess(false);
          setPitch('');
          setPortfolioLink('');
          setExpectedRate('');
          router.refresh();
        }, 2000);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div style={{ color: '#0f172a', padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* Back button */}
      <Link
        href="/gigs"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#64748b',
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '32px',
          transition: 'color 0.2s',
        }}
        className="hover-white"
      >
        <ArrowLeft size={16} />
        Back to Gigs Job Board
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="detail-layout">
        
        {/* Main Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Header Card */}
          <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'rgb(99, 102, 241)', padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                {gig.category.replace('_', ' ')}
              </span>
              {gig.isUrgent && (
                <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '4px 10px', borderRadius: '12px' }}>
                  🔥 Urgent Hiring
                </span>
              )}
            </div>

            <div>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#0f172a', marginBottom: '12px' }}>
                {gig.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '14px' }}>
                <span>Brand: <strong style={{ color: '#0f172a' }}>{gig.brandName}</strong></span>
                <span>•</span>
                <span>Posted {new Date(gig.postedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Quick stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', backgroundColor: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Budget</span>
                <span style={{ color: '#0f172a', fontSize: '18px', fontWeight: 700 }}>
                  {displayPrice(gig.price, currency)}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Deadline</span>
                <span style={{ color: '#0f172a', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> {gig.deadline || 'Flexible'}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Applicants</span>
                <span style={{ color: '#0f172a', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} /> {gig.applicantsCount} Applied
                </span>
              </div>
            </div>

            {/* Actions */}
            <div>
              {user ? (
                user.role === 'creator' ? (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    style={{
                      backgroundColor: 'rgb(var(--primary))',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '24px',
                      padding: '12px 32px',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
                    }}
                    className="glow-button"
                  >
                    Apply for this Gig (Free)
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '14px', backgroundColor: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', padding: '12px 16px', borderRadius: '8px' }}>
                    <Lock size={16} />
                    <span>You are logged in as a <strong>{user.role}</strong>. Only Creators can apply to open gigs.</span>
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                  <Link
                    href={`/login?redirect=/gigs/${gig.slug}`}
                    style={{
                      backgroundColor: 'rgb(var(--primary))',
                      color: '#ffffff',
                      borderRadius: '24px',
                      padding: '12px 32px',
                      fontWeight: 600,
                      fontSize: '15px',
                      display: 'inline-block',
                    }}
                    className="glow-button"
                  >
                    Log In to Apply
                  </Link>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>
                    Don't have an account? <Link href="/register?role=creator" style={{ color: 'rgb(var(--primary))', textDecoration: 'underline' }}>Register as Creator</Link>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Description */}
            <div>
              <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} style={{ color: 'rgb(var(--primary))' }} />
                Project Description
              </h3>
              <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.7 }}>
                {gig.description}
              </p>
            </div>

            {/* Requirements */}
            {gig.requirements && gig.requirements.length > 0 && (
              <div>
                <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} style={{ color: '#ec4899' }} />
                  Applicant Requirements
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {gig.requirements.map((req, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', color: '#64748b', fontSize: '14px' }}>
                      <Check size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deliverables */}
            {gig.deliverables && gig.deliverables.length > 0 && (
              <div>
                <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: '#06b6d4' }} />
                  Deliverables & Usage Rights
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {gig.deliverables.map((del, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', color: '#64748b', fontSize: '14px' }}>
                      <Check size={16} style={{ color: '#06b6d4', flexShrink: 0, marginTop: '2px' }} />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal Popup */}
      {showApplyModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '32px',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              backgroundColor: '#f8fafc',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', color: '#0f172a' }}>Apply for Gig</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>

            {isSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 0', textAlign: 'center' }}>
                <CheckCircle2 size={56} color="#10b981" />
                <h3 style={{ fontSize: '20px', color: '#0f172a' }}>Application Submitted!</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  Your pitch has been recorded. You can track this in your dashboard applications log.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Expected Rate */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                    Expected Rate ({currency === 'INR' ? '₹ INR' : '$ USD'})
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={currency === 'INR' ? 'e.g. 10000' : 'e.g. 120'}
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      color: '#0f172a',
                      outline: 'none',
                    }}
                    className="focus-border-primary"
                  />
                </div>

                {/* Video Portfolio Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
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
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      color: '#0f172a',
                      outline: 'none',
                    }}
                    className="focus-border-primary"
                  />
                </div>

                {/* Pitch Letter */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
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
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      color: '#0f172a',
                      outline: 'none',
                      resize: 'none',
                    }}
                    className="focus-border-primary"
                  />
                </div>

                {/* Fees notice */}
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                  * Applying to this gig is <strong>free</strong>. A small Verified Connection Fee of{' '}
                  <strong>{currency === 'INR' ? '₹49' : '$1'}</strong> is only charged if the brand shortlists your application for direct chat.
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#64748b',
                      border: '1px solid var(--border)',
                      padding: '10px 20px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: 'rgb(var(--primary))',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '20px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Pitch'}
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .hover-white:hover { color: #ffffff !important; }
        .focus-border-primary:focus { border-color: rgb(var(--primary)) !important; }
        @media (min-width: 768px) {
          .detail-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
