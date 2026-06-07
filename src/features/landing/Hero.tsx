'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Sparkles, Users, Video, Award, Star } from 'lucide-react';
import { landingPageContent } from '@/data/landing';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';
import GlowCard from '@/components/animation/GlowCard';

export default function Hero() {
  const { hero, niches } = landingPageContent;
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll Parallax effect
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -60]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Track mouse coordinates for subtle grid movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      style={{
        position: 'relative',
        padding: '160px 24px 100px 24px',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        minHeight: '95vh',
      }}
    >
      {/* Premium Ambient Light Glow Blobs */}
      <div 
        className="morphing-blob-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(219, 39, 119, 0.04) 70%, transparent 100%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div 
        className="morphing-blob-2"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(79, 70, 229, 0.05) 70%, transparent 100%)',
          filter: 'blur(70px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern Background with Mouse Parallax */}
      <motion.div 
        className="bg-grid-pattern"
        style={{
          position: 'absolute',
          top: -20,
          left: -20,
          right: -20,
          bottom: -20,
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      />

      {/* Custom Vector Art - Floating Geometric Orbits */}
      <svg 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '600px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.15,
        }}
        viewBox="0 0 1200 600"
        fill="none"
      >
        <motion.path 
          d="M-100,300 C300,50 600,550 900,150 C1100,-50 1200,450 1400,200" 
          stroke="url(#hero-gradient-line-1)" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <motion.path 
          d="M-50,200 C250,550 500,-50 850,450 C1050,150 1150,250 1300,50" 
          stroke="url(#hero-gradient-line-2)" 
          strokeWidth="1.5"
          strokeDasharray="8 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="hero-gradient-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(79, 70, 229)" />
            <stop offset="50%" stopColor="rgb(219, 39, 119)" />
            <stop offset="100%" stopColor="rgb(13, 148, 136)" />
          </linearGradient>
          <linearGradient id="hero-gradient-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(13, 148, 136)" />
            <stop offset="50%" stopColor="rgb(79, 70, 229)" />
            <stop offset="100%" stopColor="rgb(219, 39, 119)" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <motion.div 
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated Badge */}
            <motion.div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(79, 70, 229, 0.06)',
                border: '1px solid rgba(79, 70, 229, 0.15)',
                padding: '6px 14px',
                borderRadius: '20px',
                alignSelf: 'flex-start',
                color: 'rgb(79, 70, 229)',
                fontSize: '13px',
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={14} className="text-secondary" />
              <span>{hero.badge}</span>
            </motion.div>

            {/* Character Reveal Heading */}
            <TextReveal 
              text={hero.title} 
              tag="h1" 
              className="text-foreground"
              mode="words"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 64px)', 
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            />

            {/* Subheading anim */}
            <motion.p 
              style={{ 
                fontSize: '18px', 
                color: 'var(--muted)', 
                lineHeight: 1.6, 
                maxWidth: '560px' 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {hero.subtitle}
            </motion.p>

            {/* CTA Buttons with Magnetic effect */}
            <motion.div 
              style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Magnetic strength={0.2}>
                <Link
                  href={hero.primaryLink}
                  style={{
                    backgroundColor: 'rgb(79, 70, 229)',
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(79, 70, 229, 0.25)',
                  }}
                  className="glow-button"
                >
                  <span>{hero.primaryCta}</span>
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Link
                  href={hero.secondaryLink}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(28, 25, 22, 0.1)',
                    color: 'var(--foreground)',
                    padding: '16px 32px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(10px)',
                  }}
                  className="premium-btn-secondary"
                >
                  <span>{hero.secondaryCta}</span>
                </Link>
              </Magnetic>
            </motion.div>

            {/* Micro-indicator */}
            <motion.div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '13px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div style={{ display: 'flex', position: 'relative', width: '36px', height: '20px' }}>
                <div style={{ position: 'absolute', left: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#fb7185', border: '2px solid var(--background)' }} />
                <div style={{ position: 'absolute', left: '12px', width: '20px', height: '20px', borderRadius: '50%', background: '#60a5fa', border: '2px solid var(--background)' }} />
              </div>
              <span>Active Creators: <strong style={{ color: 'var(--foreground)' }}>1,200+ vetted profile rate cards</strong> online now.</span>
            </motion.div>
          </motion.div>

          {/* Right Media / Creator Mockup (3D & Parallax) */}
          <motion.div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'relative',
              y: yParallax,
              opacity: opacityParallax
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Custom 3D GlowCard */}
            <GlowCard 
              style={{
                padding: '20px',
                width: '100%',
                maxWidth: '430px',
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.08), var(--shadow-glow)',
                border: '1px solid rgba(231, 229, 228, 0.8)',
              }}
            >
              {/* Creator Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={hero.videoThumbnail} 
                      alt="Creator Avatar" 
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgb(79, 70, 229)' }}
                    />
                    <span style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', border: '2px solid white' }} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--foreground)', fontSize: '15px', fontWeight: 600 }}>Tanya R.</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Video size={12} /> Skincare UGC Expert • ₹6,000/vid
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                  <Star size={12} fill="#059669" />
                  <span>Top Vetted</span>
                </div>
              </div>

              {/* Video Player Mockup with Hover Trigger */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#1c1917',
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    autoPlay
                    controls
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <>
                    <img 
                      src={hero.videoThumbnail} 
                      alt="Video Thumbnail" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
                    />
                    
                    {/* Glowing Pulsing Play Button */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(79, 70, 229, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow: '0 0 30px rgba(79, 70, 229, 0.6)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="play-btn"
                    >
                      <Play size={30} fill="#ffffff" style={{ marginLeft: '4px' }} />
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        padding: '24px 20px 20px 20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        color: '#ffffff',
                      }}
                    >
                      <p style={{ fontSize: '14px', fontWeight: 500, fontStyle: 'italic', opacity: 0.9 }}>
                        "This serum completely cleared my acne marks in 2 weeks. The conversion lift was insane!"
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Floating micro stats block */}
              <div 
                style={{
                  position: 'absolute',
                  top: '120px',
                  left: '-30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(231, 229, 228, 0.8)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 10,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ backgroundColor: 'rgba(219, 39, 119, 0.1)', color: 'rgb(219, 39, 119)', padding: '6px', borderRadius: '8px' }}>
                  <Award size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>CTR INCREASE</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground)' }}>+340%</div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>

      {/* Floating Niche Tags Slider (Interactive bottom) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 0,
          width: '100%',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {niches.map((tag, idx) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
            >
              <Link
                href={`/gigs?search=${encodeURIComponent(tag)}`}
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--muted)',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(231, 229, 228, 0.7)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(4px)',
                }}
                className="hover-tag"
              >
                #{tag}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
