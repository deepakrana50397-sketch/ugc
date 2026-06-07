'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDownRight, Compass, Heart, ArrowRight, Video, Star, Award } from 'lucide-react';
import { landingPageContent } from '@/data/landing';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';
import GlowCard from '@/components/animation/GlowCard';

export default function Hero() {
  const { niches } = landingPageContent;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll Parallax effect
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -60]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0.4]);

  // Track mouse coordinates for grid movement
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

  // Stories State & Logic (from origin/main)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stories = [
    'https://framerusercontent.com/assets/9BKR8n5yij6np4F4fhXpbwixLWI.mp4',
    'https://framerusercontent.com/assets/0oniLdlZhN2RUR1zCzsqMbMHfQ8.mp4',
    'https://framerusercontent.com/assets/TR9SXrUqMBTLyfoDFBPUh4qvHfE.mp4',
  ];

  const storyDetails = [
    { name: 'jessicasu', role: 'College Creator', match: '98%', time: '6h', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { name: 'marcus.tech', role: 'Tech Influencer', match: '95%', time: '2h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'elena.style', role: 'Fashion / Housewife', match: '92%', time: '1d', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log('Autoplay play promise failed/interrupted:', err);
      });
    }
  }, [currentStoryIndex]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage = videoRef.current.duration
        ? (videoRef.current.currentTime / videoRef.current.duration) * 100
        : 0;
      setProgress(percentage);
    }
  };

  const handleVideoEnded = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0);
    }
    setProgress(0);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0);
    }
    setProgress(0);
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      setCurrentStoryIndex(stories.length - 1);
    }
    setProgress(0);
  };

  return (
    <section 
      style={{
        position: 'relative',
        padding: '160px 24px 120px 24px',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        minHeight: '98vh',
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

      {/* Custom Floating Orbit lines */}
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
        <defs>
          <linearGradient id="hero-gradient-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(79, 70, 229)" />
            <stop offset="50%" stopColor="rgb(219, 39, 119)" />
            <stop offset="100%" stopColor="rgb(13, 148, 136)" />
          </linearGradient>
        </defs>
      </svg>

      <div 
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headings & copy */}
          <motion.div 
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
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
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={13} className="text-secondary" />
              <span style={{ textTransform: 'uppercase' }}>[ Direct UGC Matchmaking ]</span>
            </motion.div>

            {/* Title with hand-drawn underline SVG */}
            <h1 
              style={{
                fontSize: 'clamp(38px, 5.5vw, 68px)', 
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-display)',
              }}
            >
              High-converting UGC, <br />
              done{' '}
              <span style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
                <span 
                  style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontStyle: 'italic', 
                    fontWeight: 500,
                    color: 'rgb(79, 70, 229)',
                  }}
                >
                  directly.
                </span>
                {/* Underline SVG */}
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '14px',
                    color: 'rgb(219, 39, 119)',
                    zIndex: 0,
                  }}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0,7 C30,10 70,4 100,6 C75,8 25,9 0,7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <div style={{ position: 'relative' }}>
              <p 
                style={{ 
                  fontSize: '17px', 
                  color: 'var(--muted)', 
                  lineHeight: 1.6, 
                  maxWidth: '560px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                We connect brands directly with vetted college students, housewives, and micro-influencers. 
                No agency markups. Complete scripting, positioning, and mobile-native editing included.
              </p>
              {/* Hand-drawn heart element */}
              <div 
                style={{ 
                  position: 'absolute', 
                  right: '-40px', 
                  top: 0, 
                  color: 'rgb(219, 39, 119)', 
                  transform: 'rotate(12deg)' 
                }}
                className="hidden md:block"
              >
                <Heart size={20} fill="rgba(219, 39, 119, 0.1)" />
              </div>
            </div>

            {/* Value Props */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '20px', 
                paddingTop: '8px' 
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', color: 'rgb(219, 39, 119)', marginTop: '2px' }}>[01]</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>Zero Agency Retainers</h4>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Pay creators directly at their exact rate.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', color: 'rgb(219, 39, 119)', marginTop: '2px' }}>[02]</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>Direct Communication</h4>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Chat, brief, and revise directly in the portal.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginTop: '12px' }}>
              <Magnetic strength={0.15}>
                <Link
                  href="/brand/post-gig"
                  style={{
                    backgroundColor: 'rgb(79, 70, 229)',
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4)',
                  }}
                  className="glow-button"
                >
                  <span>Post a Gig (Free)</span>
                  <ArrowRight size={16} />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="/register?role=creator"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(28, 25, 22, 0.1)',
                    color: 'var(--foreground)',
                    padding: '16px 32px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(10px)',
                  }}
                  className="premium-btn-secondary"
                >
                  <span>Apply as Creator</span>
                </Link>
              </Magnetic>
            </div>

            {/* Active Creators indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '13.5px', marginTop: '4px' }}>
              <div style={{ display: 'flex', position: 'relative', width: '36px', height: '20px' }}>
                <div style={{ position: 'absolute', left: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#fb7185', border: '2px solid var(--background)' }} />
                <div style={{ position: 'absolute', left: '12px', width: '20px', height: '20px', borderRadius: '50%', background: '#60a5fa', border: '2px solid var(--background)' }} />
              </div>
              <span>Active: <strong style={{ color: 'var(--foreground)' }}>1,200+ vetted profile rate cards</strong> online.</span>
            </div>
          </motion.div>

          {/* Right Column: Polaroid Story Video Card Stack (remixed from origin/main) */}
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
            {/* Card 1: Match Engine Description (Back Card) */}
            <motion.div
              initial={{ opacity: 0, rotate: -6, x: -15 }}
              animate={{ opacity: 1, rotate: -4, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              style={{
                position: 'absolute',
                transform: 'rotate(-4deg)',
                width: '310px',
                aspectRatio: '9 / 16',
                backgroundColor: '#1c1917', // Elegant neutral warm black
                borderRadius: '32px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'between',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                zIndex: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <span style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.15em', opacity: 0.6 }}>[ MATCH ENGINE ]</span>
                <Sparkles size={16} style={{ color: 'rgb(219, 39, 119)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto 0' }}>
                <div style={{ display: 'inline-flex', padding: '4px 10px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.08em', width: 'fit-content' }}>
                  CRITERIA: COLLEGE STUDENT
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 500, lineHeight: 1.25, color: '#ffffff' }}>
                  Authentic voices, <br />
                  no actor vibes.
                </h3>
                <p style={{ fontSize: '12px', color: '#a8a29e', lineHeight: 1.5 }}>
                  Our database filters by life stage. Get real UGC videos from college dorms, busy kitchen counters, and native daily vlogs.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '9px', opacity: 0.5 }}>IGIGSTER.COM</span>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'rgb(219, 39, 119)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Vetted catalog</span>
                  <ArrowDownRight size={12} />
                </span>
              </div>
            </motion.div>

            {/* Card 2: Interactive Polaroid Video Card (Front Overlapping Card) */}
            <motion.div
              initial={{ opacity: 0, rotate: 3, y: 15 }}
              animate={{ opacity: 1, rotate: 2, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              style={{
                position: 'relative',
                width: '310px',
                aspectRatio: '9 / 16',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(28, 25, 22, 0.08)',
                borderRadius: '32px',
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.12), var(--shadow-glow)',
                overflow: 'hidden',
                cursor: 'pointer',
                zIndex: 10,
              }}
              className="group"
            >
              {/* Progress Indicator Bars */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  left: '20px', 
                  right: '20px', 
                  display: 'flex', 
                  gap: '6px', 
                  zIndex: 20, 
                  pointerEvents: 'none' 
                }}
              >
                {stories.map((_, index) => (
                  <div key={index} style={{ height: '3px', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
                    {index < currentStoryIndex && (
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff' }} />
                    )}
                    {index === currentStoryIndex && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          backgroundColor: '#ffffff',
                          width: `${progress}%`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Creator details header */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '38px', 
                  left: '20px', 
                  right: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  zIndex: 20, 
                  pointerEvents: 'none',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={storyDetails[currentStoryIndex].avatar}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.8)', objectFit: 'cover' }}
                    alt="avatar"
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold' }}>
                        {storyDetails[currentStoryIndex].name}
                      </span>
                      <span style={{ backgroundColor: 'rgb(219, 39, 119)', color: '#ffffff', fontSize: '7px', fontWeight: 'bold', padding: '1px 4px', borderRadius: '4px' }}>
                        {storyDetails[currentStoryIndex].match} MATCH
                      </span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9px', display: 'block', marginTop: '2px' }}>
                      {storyDetails[currentStoryIndex].role}
                    </span>
                  </div>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontFamily: 'monospace' }}>{storyDetails[currentStoryIndex].time}</span>
              </div>

              {/* Video Player */}
              <video
                ref={videoRef}
                src={stories[currentStoryIndex]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#0c0a09' }}
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
              />

              {/* Gradients */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '96px', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '96px', backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />

              {/* Hover Navigation Triggers */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  zIndex: 30, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  transition: 'opacity 0.3s ease',
                }}
                className="opacity-0 group-hover:opacity-100"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevStory();
                  }}
                  style={{ width: '30%', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '12px', cursor: 'pointer' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1c1917', fontWeight: 'bold' }}>
                    ‹
                  </div>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextStory();
                  }}
                  style={{ width: '30%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px', cursor: 'pointer' }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1c1917', fontWeight: 'bold' }}>
                    ›
                  </div>
                </div>
              </div>

              {/* Bottom Badge overlay */}
              <div style={{ position: 'absolute', right: '20px', bottom: '20px', zIndex: 20, pointerEvents: 'none' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(28,25,22,0.08)' }}>
                  <Compass size={20} style={{ color: 'rgb(219, 39, 119)' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Bottom Niches Tags */}
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
            maxWidth: '1200px',
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
