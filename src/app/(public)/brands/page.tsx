'use client';

import React, { useState } from 'react';
import { Shield, Sparkles, Zap, Users, CheckCircle2, Building, MessageSquare, Send } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

export default function BrandsPage() {
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    website: '',
    budget: '5000-15000',
    niche: 'beauty_fashion',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.details) return;

    setIsSubmitting(true);
    // Simulate API save
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedLeads = JSON.parse(localStorage.getItem('igigster_brand_leads') || '[]');
        storedLeads.push({
          id: `lead-${Date.now()}`,
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('igigster_brand_leads', JSON.stringify(storedLeads));
      }
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const getBudgetText = (val: string) => {
    const prices = {
      'under-5000': currency === 'INR' ? 'Under ₹5,000' : 'Under $70',
      '5000-15000': currency === 'INR' ? '₹5,000 - ₹15,000' : '$70 - $200',
      '15000-50000': currency === 'INR' ? '₹15,000 - ₹50,000' : '$200 - $650',
      'above-50000': currency === 'INR' ? 'Above ₹50,000' : 'Above $650',
    };
    return prices[val as keyof typeof prices] || val;
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section 
        style={{
          padding: '100px 24px 60px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', padding: '6px 14px', borderRadius: '20px', alignSelf: 'center', color: 'rgb(99, 102, 241)', fontSize: '13px', fontWeight: 600 }}>
            <Building size={14} />
            <span>FOR BRANDS & E-COMMERCE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 52px)', lineHeight: 1.15, fontWeight: 800 }}>
            Get Viral UGC & Short-Form Video Ads <span className="accent-gradient-text">On Demand</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Connect with pre-vetted creators who know how to sell. Pay only when connection is established, and launch high-converting campaigns.
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section style={{ padding: '0 24px 60px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }} className="stats-grid">
          {[
            { value: '2.4x', label: 'Average CTR Boost' },
            { value: '24 hrs', label: 'Turnaround Option' },
            { value: '1,200+', label: 'Vetted UGC Talent' },
            { value: '0 upfront', label: 'Subscription Fees' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'rgb(var(--primary))', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid: Benefits & Lead Form */}
      <section style={{ padding: '40px 24px 100px 24px' }}>
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="brands-layout-grid"
        >
          {/* Left: Key features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Why top brands source UGC via iGigster</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { icon: <Shield size={24} style={{ color: '#10b981' }} />, title: 'Pre-Vetted Professional Creators', desc: 'No more checking sketchy profiles. We manually review and filter portfolios, ensuring high video resolution, good audio, and strong retention editing skills.' },
                { icon: <Zap size={24} style={{ color: 'rgb(var(--primary))' }} />, title: 'Zero Monthly Subscriptions', desc: 'Stop paying $299/month just to browse. Post your gig for free, view applicants for free, and unlock connection details only when you find the perfect match.' },
                { icon: <Users size={24} style={{ color: '#ec4899' }} />, title: 'Built-in Short-form Editors', desc: 'Need raw footage polished into TikToks? We host dedicated editors and motion graphic designers alongside creator talent to ship production-ready assets.' },
              ].map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '12px', height: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {benefit.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>{benefit.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.6 }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Lead Generation Form */}
          <div className="glass-panel" style={{ padding: '40px 32px', border: '1px solid rgba(124, 58, 237, 0.25)' }}>
            {isSuccess ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 0' }}>
                <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto' }} />
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>Campaign Proposal Submitted!</h3>
                <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Thank you! Our platform director will review your UGC campaign details. We will email you matched creator profiles and guide you on posting your public gig within 2-4 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--card-border)',
                    color: '#0f172a',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '12px',
                  }}
                >
                  Submit Another Campaign
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Kickstart your UGC Campaign</h3>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>Tell us what video you need. Get matched with relevant creators.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SkinGlow"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@skinglow.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Website / Landing Page</label>
                    <input
                      type="url"
                      placeholder="https://skinglow.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Niche / Category Needed</label>
                    <select
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="beauty_fashion">Beauty & Fashion</option>
                      <option value="tech_gadgets">Tech & Gadgets</option>
                      <option value="saas_product">SaaS & App UI Animation</option>
                      <option value="health_fitness">Health & Fitness</option>
                      <option value="lifestyle_food">Lifestyle & Food</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Estimated Budget ({currency})</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="under-5000">{getBudgetText('under-5000')}</option>
                      <option value="5000-15000">{getBudgetText('5000-15000')}</option>
                      <option value="15000-50000">{getBudgetText('15000-50000')}</option>
                      <option value="above-50000">{getBudgetText('above-50000')}</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Describe Video Deliverables *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="We need 3 organic TikTok style reels demonstrating our hydrating serum. Detail hooks, voiceover preferences, or editor specifications."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical', fontSize: '13.5px' }}
                    className="focus-border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: 'rgb(var(--primary))',
                    color: '#ffffff',
                    padding: '14px',
                    borderRadius: '24px',
                    fontWeight: 600,
                    fontSize: '14.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
                    marginTop: '8px',
                  }}
                  className="glow-button"
                >
                  {isSubmitting ? 'Submitting lead details...' : (
                    <>
                      <Send size={15} />
                      <span>Submit Campaign Details</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (min-width: 992px) {
          .brands-layout-grid {
            grid-template-columns: 1.1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
