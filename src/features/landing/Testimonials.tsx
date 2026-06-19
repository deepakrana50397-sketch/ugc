'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonialsData } from '@/data/testimonials';
import TextReveal from '@/components/animation/TextReveal';
import GlowCard from '@/components/animation/GlowCard';

export default function Testimonials() {
  const [filterType, setFilterType] = useState<'brand' | 'creator'>('brand');
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filteredTestimonials = testimonialsData.filter(t => t.type === filterType);
  // Duplicate testimonials for infinite effect
  const repeatedTestimonials = [...filteredTestimonials, ...filteredTestimonials, ...filteredTestimonials];

  const controls = useAnimation();
  const x = useMotionValue(0);

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) {
      controls.stop();
      return;
    }

    const duration = filterType === 'brand' ? 30 : 25; // scroll duration
    controls.start({
      x: ['0%', '-33.33%'],
      transition: {
        ease: 'linear',
        duration,
        repeat: Infinity,
      }
    });
  }, [filterType, isPaused, controls]);

  const handleNext = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({ left: scrollLeft + clientWidth / 2, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      containerRef.current.scrollTo({ left: scrollLeft - clientWidth / 2, behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextReveal
              text="Stories from Both Sides"
              tag="h2"
              mode="words"
              className="text-foreground"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            />
            <motion.p 
              style={{ color: 'var(--muted)', maxWidth: '600px', fontSize: '16.5px', lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              See how e-commerce brands scale production and how creators build their independent UGC careers.
            </motion.p>
          </div>

          {/* Toggle */}
          <div 
            style={{
              display: 'inline-flex',
              padding: '4px',
              backgroundColor: 'rgba(28, 25, 22, 0.04)',
              border: '1px solid rgba(28, 25, 22, 0.08)',
              borderRadius: '30px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <button
              onClick={() => setFilterType('brand')}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '8px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                borderRadius: '20px',
                backgroundColor: filterType === 'brand' ? 'rgb(79, 70, 229)' : 'transparent',
                color: filterType === 'brand' ? '#ffffff' : 'var(--muted)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              For Brands
            </button>
            <button
              onClick={() => setFilterType('creator')}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '8px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                borderRadius: '20px',
                backgroundColor: filterType === 'creator' ? 'rgb(79, 70, 229)' : 'transparent',
                color: filterType === 'creator' ? '#ffffff' : 'var(--muted)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              For Creators
            </button>
          </div>
        </div>

        {/* Testimonial Auto Scroll Tracker */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            style={{
              display: 'flex',
              gap: '24px',
              x,
            }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -3000, right: 0 }}
          >
            {repeatedTestimonials.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                style={{
                  minWidth: t.video ? 'min(100%, 480px)' : 'min(100%, 320px)',
                  width: t.video ? 'min(100%, 580px)' : 'min(100%, 380px)',
                  flexShrink: 0,
                }}
              >
                <GlowCard
                  glowColor={filterType === 'brand' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(219, 39, 119, 0.08)'}
                  style={{
                    padding: '24px',
                    height: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '32px',
                    border: '1px solid rgba(229, 225, 222, 0.6)',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.04)',
                    position: 'relative',
                  }}
                  tiltActive={false}
                >
                  {t.video ? (
                    /* Card Design 1: Video Review */
                    <div className="flex flex-col md:flex-row gap-5 w-full h-full text-left">
                      {/* Left: Video Thumbnail */}
                      <div className="w-full md:w-[210px] shrink-0">
                        <div 
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '3/4',
                            borderRadius: '16px',
                            overflow: 'hidden',
                          }}
                        >
                          <img 
                            src={t.video} 
                            alt={t.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer">
                            <div 
                              style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(28, 25, 23, 0.75)',
                                backdropFilter: 'blur(2px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                transition: 'transform 0.3s ease',
                              }}
                              className="hover:scale-110"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Content details */}
                      <div className="flex flex-col justify-between flex-grow text-left">
                        <div>
                          {/* Rating */}
                          <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={15} fill="#f97316" color="#f97316" />
                            ))}
                          </div>
                          
                          {t.title && (
                            <h3 style={{
                              fontSize: '20px',
                              fontWeight: 800,
                              color: '#1c1917',
                              lineHeight: '1.25',
                              letterSpacing: '-0.02em',
                              marginBottom: '10px',
                              fontFamily: 'var(--font-sans)',
                            }}>
                              {t.title}
                            </h3>
                          )}

                          <p style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#44403c',
                            lineHeight: '1.6',
                            marginBottom: '16px',
                            fontFamily: 'var(--font-sans)',
                          }}>
                            "{t.text}"
                          </p>
                        </div>

                        {/* Author Info (Without small avatar) */}
                        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                          <h4 style={{ color: '#1c1917', fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '2px' }}>
                            {t.name}
                          </h4>
                          <p style={{ color: '#78716c', fontSize: '12.5px', fontWeight: 500 }}>
                            {t.role} {t.company ? `at ${t.company}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Card Design 2: Text-Only Review */
                    <div className="flex flex-col justify-between w-full h-full text-left" style={{ gap: '20px' }}>
                      <div>
                        {/* Rating */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={15} fill="#f97316" color="#f97316" />
                          ))}
                        </div>
                        
                        {t.title && (
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: '#1c1917',
                            lineHeight: '1.25',
                            letterSpacing: '-0.02em',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-sans)',
                            marginTop: '4px',
                          }}>
                            {t.title}
                          </h3>
                        )}

                        <p style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#44403c',
                          lineHeight: '1.6',
                          marginBottom: '16px',
                          fontFamily: 'var(--font-sans)',
                        }}>
                          "{t.text}"
                        </p>
                      </div>

                      {/* Author Info (With small avatar) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                        <img
                          src={t.avatar}
                          alt={t.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border)' }}
                        />
                        <div>
                          <h4 style={{ color: '#1c1917', fontSize: '15.5px', fontWeight: 800, letterSpacing: '-0.01em' }}>
                            {t.name}
                          </h4>
                          <p style={{ color: '#78716c', fontSize: '12.5px', fontWeight: 500 }}>
                            {t.role} {t.company ? `at ${t.company}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </GlowCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Drag Cue Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', color: 'var(--muted)', fontSize: '13px' }}>
          <span>← Swipe or drag to browse →</span>
        </div>
      </div>
    </section>
  );
}
