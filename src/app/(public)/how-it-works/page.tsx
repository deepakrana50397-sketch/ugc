'use client';

import React, { useState } from 'react';
import { Briefcase, CheckSquare, Sparkles, Key, Video, Star, Send, Handshake, Heart } from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'creator' | 'brand'>('brand');

  const brandSteps = [
    {
      icon: <Briefcase size={22} style={{ color: 'rgb(var(--primary))' }} />,
      step: '01',
      title: 'Post a UGC Gig (Free)',
      description: 'Fill out our lightweight gig-posting wizard. Specify budget in local currency, platforms (TikTok/Instagram), unboxing/routine types, and editor tasks.'
    },
    {
      icon: <CheckSquare size={22} style={{ color: '#10b981' }} />,
      step: '02',
      title: 'Review Applications for Free',
      description: 'Watch video portfolio items directly, read custom creator proposals, and evaluate applicant experience indicators without locking yourself into any contracts.'
    },
    {
      icon: <Key size={22} style={{ color: '#fbbf24' }} />,
      step: '03',
      title: 'Shortlist & Unlock Contact',
      description: 'Once you find the ideal creator(s), pay a flat unlock connection fee (₹99 or $2) to get their custom email details, script sheets, and start discussions.'
    },
    {
      icon: <Handshake size={22} style={{ color: '#ec4899' }} />,
      step: '04',
      title: 'Approve & Release (5% Fee)',
      description: 'Confirm video milestones. Standard 5% brand success fee is charged only when video deliverables are approved. Download the final raw & edited assets!'
    }
  ];

  const creatorSteps = [
    {
      icon: <Sparkles size={22} style={{ color: 'rgb(99, 102, 241)' }} />,
      step: '01',
      title: 'Build your UGC Portfolio',
      description: 'Register and set up your rates, bio, categories, and past unboxing/routine video links. Showcase your content niches so brands can locate you directly.'
    },
    {
      icon: <Send size={22} style={{ color: 'rgb(var(--primary))' }} />,
      step: '02',
      title: 'Apply to Open Gigs (Free)',
      description: 'Browse the public job board, check brand budgets, and pitch your hooks. Applications are 100% free with zero token constraints.'
    },
    {
      icon: <Key size={22} style={{ color: '#10b981' }} />,
      step: '03',
      title: 'Get Shortlisted & Connect',
      description: 'When a brand shortlists you, confirm the connection. Secure verification for a minor ₹49 / $1 shortlist fee and coordinate deliverables.'
    },
    {
      icon: <Video size={22} style={{ color: '#ec4899' }} />,
      step: '04',
      title: 'Filming & Earn (10% Service)',
      description: 'Shoot the hooks and demo videos. Submit files directly for brand review. Payouts are safely dispatched minus a standard 10% platform success fee.'
    }
  ];

  const activeSteps = activeTab === 'brand' ? brandSteps : creatorSteps;

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '80px 24px 100px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800 }}>
          How <span className="accent-gradient-text">iGigster</span> Works
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          A simplified pay-as-you-go workflow keeping UGC campaigns fast, cost-efficient, and direct.
        </p>

        {/* Tab Toggle */}
        <div 
          style={{
            display: 'inline-flex',
            padding: '4px',
            backgroundColor: 'rgba(0,0,0,0.02)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            alignSelf: 'center',
            marginTop: '12px'
          }}
        >
          <button
            onClick={() => setActiveTab('brand')}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '20px',
              backgroundColor: activeTab === 'brand' ? 'rgb(var(--primary))' : 'transparent',
              color: activeTab === 'brand' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            For Brands
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '20px',
              backgroundColor: activeTab === 'creator' ? 'rgb(var(--primary))' : 'transparent',
              color: activeTab === 'creator' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            For Creators
          </button>
        </div>
      </div>

      {/* Steps Timeline Grid */}
      <div 
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
        }}
      >
        {/* Timeline Connecting Vertical Line (Desktop only effect simulated in flex) */}
        {activeSteps.map((step, idx) => (
          <div 
            key={idx}
            className="reveal-on-scroll glass-panel"
            style={{
              padding: '32px',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            {/* Step Count Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgb(var(--primary))', backgroundColor: 'rgba(124,58,237,0.1)', padding: '4px 10px', borderRadius: '12px' }}>
                STEP {step.step}
              </span>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }}>
                {step.icon}
              </div>
            </div>

            {/* Step details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{step.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.6 }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
