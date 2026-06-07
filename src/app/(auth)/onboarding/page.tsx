'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, registerCreatorProfile } from '@/lib/services';
import { User } from '@/types/common';
import { Video, Building, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

export default function OnboardingPage() {
  const router = useRouter();
  const { currency } = useCurrency();
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Creator onboarding state
  const [creatorForm, setCreatorForm] = useState({
    title: '',
    location: '',
    bio: '',
    category: 'video_creator',
    rateINR: '4000',
    rateUSD: '60',
    skills: '',
    portfolioVideo: '',
  });

  // Brand onboarding state
  const [brandForm, setBrandForm] = useState({
    industry: 'beauty_fashion',
    website: '',
    size: '1-10',
    description: '',
  });

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (!activeUser) {
      router.push('/login');
    } else {
      setUser(activeUser);
    }
  }, []);

  if (!user) return null;

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      registerCreatorProfile({
        name: user.name,
        title: creatorForm.title,
        location: creatorForm.location,
        bio: creatorForm.bio,
        category: creatorForm.category as any,
        startingRate: {
          INR: parseFloat(creatorForm.rateINR) || 2000,
          USD: parseFloat(creatorForm.rateUSD) || 30,
        },
        skills: creatorForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        portfolio: creatorForm.portfolioVideo ? [
          {
            id: `port-${Date.now()}`,
            title: `${user.name} Demo UGC Reel`,
            videoUrl: creatorForm.portfolioVideo,
            thumbnailUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
            category: 'UGC Demo'
          }
        ] : []
      });
      setLoading(false);
      router.push('/creator/dashboard');
    }, 1200);
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const updatedUser = {
        ...user,
        companyName: user.name,
        onboarded: true,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('igigster_user', JSON.stringify(updatedUser));
        
        // Save brand business profile details
        const profiles = JSON.parse(localStorage.getItem('igigster_brand_profiles') || '{}');
        profiles[user.id] = {
          ...brandForm,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('igigster_brand_profiles', JSON.stringify(profiles));
      }
      window.dispatchEvent(new Event('auth-change'));
      setLoading(false);
      router.push('/brand/dashboard');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div 
        className="glass-panel" 
        style={{
          maxWidth: '550px',
          width: '100%',
          padding: '40px',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgb(var(--primary))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Account Onboarding
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
              Welcome, {user.name}!
            </h2>
          </div>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Step {step} of 2</span>
        </div>

        {user.role === 'creator' ? (
          // CREATOR ONBOARDING WIZARD
          <form onSubmit={handleCreatorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Professional Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Beauty & Lifestyle UGC Expert"
                    value={creatorForm.title}
                    onChange={(e) => setCreatorForm({ ...creatorForm, title: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                    className="focus-border-primary"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Category</label>
                    <select
                      value={creatorForm.category}
                      onChange={(e) => setCreatorForm({ ...creatorForm, category: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', cursor: 'pointer' }}
                    >
                      <option value="video_creator">UGC Creator</option>
                      <option value="editor">Video Editor</option>
                      <option value="motion_designer">Motion Designer</option>
                      <option value="voiceover">Voiceover Artist</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, India"
                      value={creatorForm.location}
                      onChange={(e) => setCreatorForm({ ...creatorForm, location: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Short Biography *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell brands about your filming experience, voice range, or editing software retention hooks..."
                    value={creatorForm.bio}
                    onChange={(e) => setCreatorForm({ ...creatorForm, bio: e.target.value })}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical' }}
                    className="focus-border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!creatorForm.title || !creatorForm.location || !creatorForm.bio}
                  style={{
                    backgroundColor: 'rgb(var(--primary))',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '8px',
                  }}
                  className="glow-button"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Starting Rate (INR) *</label>
                    <input
                      type="number"
                      required
                      value={creatorForm.rateINR}
                      onChange={(e) => setCreatorForm({ ...creatorForm, rateINR: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Starting Rate (USD) *</label>
                    <input
                      type="number"
                      required
                      value={creatorForm.rateUSD}
                      onChange={(e) => setCreatorForm({ ...creatorForm, rateUSD: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                      className="focus-border-primary"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Skills Tags (Comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. CapCut, Voiceover, Scriptwriting, Lighting"
                    value={creatorForm.skills}
                    onChange={(e) => setCreatorForm({ ...creatorForm, skills: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                    className="focus-border-primary"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Portfolio MP4 Video URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                    value={creatorForm.portfolioVideo}
                    onChange={(e) => setCreatorForm({ ...creatorForm, portfolioVideo: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                    className="focus-border-primary"
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--card-border)',
                      color: '#0f172a',
                      padding: '12px',
                      borderRadius: '24px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 2,
                      backgroundColor: '#ec4899',
                      color: '#0f172a',
                      padding: '12px',
                      borderRadius: '24px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
                    }}
                    className="glow-button"
                  >
                    <span>{loading ? 'Saving Profile...' : 'Complete Profile'}</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          // BRAND ONBOARDING WIZARD
          <form onSubmit={handleBrandSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Industry</label>
                    <select
                      value={brandForm.industry}
                      onChange={(e) => setBrandForm({ ...brandForm, industry: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', cursor: 'pointer' }}
                    >
                      <option value="beauty_fashion">Beauty & Cosmetics</option>
                      <option value="tech_software">Tech / B2B SaaS</option>
                      <option value="health_fitness">Health & Fitness</option>
                      <option value="ecom_clothing">E-Commerce Fashion</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Company Size</label>
                    <select
                      value={brandForm.size}
                      onChange={(e) => setBrandForm({ ...brandForm, size: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', cursor: 'pointer' }}
                    >
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="201+">200+ Corporate</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Company Website *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourbrand.com"
                    value={brandForm.website}
                    onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                    className="focus-border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!brandForm.website}
                  style={{
                    backgroundColor: 'rgb(var(--primary))',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '8px',
                  }}
                  className="glow-button"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>What does your brand do? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide a quick overview of your e-commerce products or app platform. Creators review this to decide if they align with your brand voice."
                    value={brandForm.description}
                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical' }}
                    className="focus-border-primary"
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--card-border)',
                      color: '#0f172a',
                      padding: '12px',
                      borderRadius: '24px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 2,
                      backgroundColor: 'rgb(var(--primary))',
                      color: '#ffffff',
                      padding: '12px',
                      borderRadius: '24px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
                    }}
                    className="glow-button"
                  >
                    <span>{loading ? 'Completing Setup...' : 'Finish Setup'}</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
