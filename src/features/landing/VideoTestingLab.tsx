'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, BarChart3, Users2, Sparkles, ArrowRight } from 'lucide-react';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

interface PortfolioItem {
  id: string;
  category: string;
  creator: {
    name: string;
    avatar: string;
    handle: string;
  };
  metrics: {
    hook: string;
    bodyAngle: string;
    ctr: string;
    views: string;
    roi: string;
  };
  demographics: {
    label: string;
    percentage: number;
  }[];
  videoUrl: string;
  title: string;
  rate?: number;
}

export default function VideoTestingLab() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const categories = [
    { id: 'all', label: 'ALL CREATIVES' },
    { id: 'beauty', label: 'BEAUTY & SKINCARE' },
    { id: 'fashion', label: 'FASHION & APPAREL' },
    { id: 'tech', label: 'TECH & GADGETS' },
    { id: 'food', label: 'FOOD & BEVERAGE' }
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'v1',
      category: 'beauty',
      creator: {
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        handle: '@sarah.skincare'
      },
      metrics: {
        hook: '3 reasons why your skin is dry...',
        bodyAngle: 'Problem-solution serum texture showing skincare layers.',
        ctr: '+185%',
        views: '450K',
        roi: '3.4x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 65 },
        { label: 'Female 25-34', percentage: 25 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/SCuqi0qyfpukKLtZm0jURfE.mp4',
      title: 'Dry Skin Routine Hook',
      rate: 150
    },
    {
      id: 'v2',
      category: 'tech',
      creator: {
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        handle: '@marcus.tech'
      },
      metrics: {
        hook: 'Stop buying cheap charging cables...',
        bodyAngle: 'ASMR unboxing showcasing braided aluminum connectors.',
        ctr: '+142%',
        views: '1.2M',
        roi: '4.8x'
      },
      demographics: [
        { label: 'Male 18-24', percentage: 55 },
        { label: 'Male 25-34', percentage: 30 },
        { label: 'Others', percentage: 15 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/0oniLdlZhN2RUR1zCzsqMbMHfQ8.mp4',
      title: 'ASMR Tech Unboxing',
      rate: 220
    },
    {
      id: 'v3',
      category: 'fashion',
      creator: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        handle: '@elena.style'
      },
      metrics: {
        hook: 'TikTok made me buy these summer fits...',
        bodyAngle: 'Transition loops showing 3 outfits with pricing subtitles.',
        ctr: '+94%',
        views: '240K',
        roi: '2.9x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 70 },
        { label: 'Female 25-34', percentage: 20 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/TR9SXrUqMBTLyfoDFBPUh4qvHfE.mp4',
      title: 'Summer Fitting Transitions',
      rate: 250
    },
    {
      id: 'v4',
      category: 'food',
      creator: {
        name: 'David Kojo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        handle: '@david.eats'
      },
      metrics: {
        hook: 'The secret ingredient in this protein bowl...',
        bodyAngle: 'Fast cooking cuts focusing on final sauce pour and bite reaction.',
        ctr: '+210%',
        views: '890K',
        roi: '5.2x'
      },
      demographics: [
        { label: 'Female 25-34', percentage: 40 },
        { label: 'Male 18-24', percentage: 35 },
        { label: 'Others', percentage: 25 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4',
      title: 'Protein Bowl Recipe Hook',
      rate: 160
    },
    {
      id: 'v5',
      category: 'beauty',
      creator: {
        name: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
        handle: '@maya.glow'
      },
      metrics: {
        hook: 'This oil-free serum is a cheat code...',
        bodyAngle: 'Half-face review application demonstrating glow comparison.',
        ctr: '+120%',
        views: '320K',
        roi: '3.1x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 60 },
        { label: 'Female 25-34', percentage: 30 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/6XfEmiD6m02yjpZAyc2nDmmOA.mp4',
      title: 'Oil-Free Serum Review',
      rate: 150
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleHoverStart = (id: string) => {
    setHoveredVideoId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleHoverEnd = (id: string) => {
    setHoveredVideoId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section 
      id="video-lab"
      style={{
        padding: '120px 24px',
        backgroundColor: '#F5F2EC', // Premium beige matching casing results
        borderTop: '1px solid rgba(28, 25, 22, 0.08)',
        borderBottom: '1px solid rgba(28, 25, 22, 0.08)',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '56px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#E6E2DA',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#1c1917',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} style={{ color: 'rgb(79, 70, 229)' }} />
            <span>Video Testing Lab</span>
          </div>

          <TextReveal
            text="High-Converting Ads Showcase"
            tag="h2"
            mode="words"
            className="text-foreground"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          />
          
          <p style={{ color: '#57534e', maxWidth: '600px', fontSize: '16.5px', lineHeight: 1.6 }}>
            Hover over cards to see creatives in action. Click any asset to inspect performance metrics, hooks, and demographic breakdowns.
          </p>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                borderRadius: '8px',
                backgroundColor: activeCategory === cat.id ? '#1c1917' : '#E6E2DA',
                color: activeCategory === cat.id ? '#ffffff' : '#1c1917',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Creatives Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            width: '100%',
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              onHoverStart={() => handleHoverStart(item.id)}
              onHoverEnd={() => handleHoverEnd(item.id)}
              style={{
                backgroundColor: '#FAF8F5',
                borderRadius: '20px',
                padding: '16px',
                border: '1px solid rgba(28, 25, 22, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Creator details header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                <img
                  src={item.creator.avatar}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  alt="avatar"
                />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1c1917', display: 'block' }}>{item.creator.name}</span>
                  <span style={{ fontSize: '11px', color: '#78716c' }}>{item.creator.handle}</span>
                </div>
              </div>

              {/* Video thumbnail / hover play */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '9 / 16',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backgroundColor: '#0c0a09',
                }}
              >
                <video
                  ref={el => { videoRefs.current[item.id] = el; }}
                  src={item.videoUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  muted
                  loop
                  playsInline
                />
                {hoveredVideoId !== item.id && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1c1917', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                      <Play size={16} fill="#1c1917" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Hook snippet */}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#78716c', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  CTR: <strong style={{ color: 'rgb(79, 70, 229)' }}>{item.metrics.ctr}</strong> • ROAS: {item.metrics.roi}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics Detail Modal Drawer (AnimatePresence) */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(28, 25, 22, 0.4)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                style={{
                  backgroundColor: '#FAF8F5',
                  width: '100%',
                  maxWidth: '920px',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(28, 25, 22, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  maxHeight: '90vh',
                  textAlign: 'left',
                }}
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left side: Video playback */}
                <div style={{ backgroundColor: '#0c0a09', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '32px' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: '280px', aspectRatio: '9/16', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <video
                      src={selectedVideo.videoUrl}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                    />
                    
                    {/* Audio controller */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                  </div>
                  
                  {/* Close modal */}
                  <button
                    onClick={() => setSelectedVideo(null)}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      border: 'none',
                      cursor: 'pointer',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Right side: Dashboard specs */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(28,25,22,0.06)', paddingBottom: '20px' }}>
                    <img
                      src={selectedVideo.creator.avatar}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      alt="avatar"
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1c1917' }}>{selectedVideo.creator.name}</h4>
                        <span style={{ backgroundColor: 'rgba(79, 70, 229, 0.06)', color: 'rgb(79, 70, 229)', fontSize: '8px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(79,70,229,0.12)', textTransform: 'uppercase' }}>Vetted</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#78716c', marginTop: '2px' }}>{selectedVideo.creator.handle}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgb(219, 39, 119)', backgroundColor: 'rgba(219, 39, 119, 0.06)', border: '1px solid rgba(219, 39, 119, 0.15)', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Case Performance</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#1c1917', marginTop: '14px', letterSpacing: '-0.02em' }}>{selectedVideo.title}</h3>
                  </div>

                  {/* Analytical Metrics */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#78716c', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BarChart3 size={14} style={{ color: 'rgb(79, 70, 229)' }} />
                      Ad Performance Metrics
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>CTR Boost</span>
                        <p style={{ fontSize: '18px', fontWeight: 800, color: 'rgb(79, 70, 229)', marginTop: '4px' }}>{selectedVideo.metrics.ctr}</p>
                      </div>
                      <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Views</span>
                        <p style={{ fontSize: '18px', fontWeight: 800, color: '#1c1917', marginTop: '4px' }}>{selectedVideo.metrics.views}</p>
                      </div>
                      <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>ROI</span>
                        <p style={{ fontSize: '18px', fontWeight: 800, color: 'rgb(219, 39, 119)', marginTop: '4px' }}>{selectedVideo.metrics.roi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Demographics */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#78716c', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users2 size={14} style={{ color: 'rgb(79, 70, 229)' }} />
                      Audience Demographics
                    </p>
                    <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedVideo.demographics.map((demo, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>
                            <span>{demo.label}</span>
                            <span>{demo.percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', backgroundColor: '#E6E2DA', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', backgroundColor: 'rgb(79, 70, 229)', width: `${demo.percentage}%`, borderRadius: '9999px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Copywriting Script Hooks */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '14px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Winning Hook</span>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#1c1917', fontStyle: 'italic', marginTop: '6px', lineHeight: 1.4 }}>"{selectedVideo.metrics.hook}"</p>
                    </div>
                    <div style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(28,25,22,0.06)', padding: '14px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Body Narrative</span>
                      <p style={{ fontSize: '12px', color: '#57534e', marginTop: '6px', lineHeight: 1.4 }}>{selectedVideo.metrics.bodyAngle}</p>
                    </div>
                  </div>

                  {/* Footer booking */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(28,25,22,0.06)' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#78716c' }}>Creator rate</span>
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#1c1917', marginTop: '2px' }}>${selectedVideo.rate || 150} <span style={{ fontSize: '12px', fontWeight: 500, color: '#78716c' }}>/ video</span></p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedVideo(null);
                        const el = document.getElementById('creators');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        padding: '14px 28px',
                        backgroundColor: 'rgb(79, 70, 229)',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '30px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 8px 16px rgba(79,70,229,0.25)',
                      }}
                    >
                      <span>Hire creator directly</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
