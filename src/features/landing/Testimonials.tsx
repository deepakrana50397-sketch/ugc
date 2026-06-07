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
                  minWidth: '340px',
                  width: '400px',
                  flexShrink: 0,
                }}
              >
                <GlowCard
                  glowColor={filterType === 'brand' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(219, 39, 119, 0.08)'}
                  style={{
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                    border: '1px solid rgba(231, 229, 228, 0.8)',
                    position: 'relative',
                  }}
                  tiltActive={false}
                >
                  <Quote 
                    size={36} 
                    style={{ 
                      position: 'absolute', 
                      top: '24px', 
                      right: '24px', 
                      color: 'rgba(79, 70, 229, 0.06)',
                      transform: 'rotate(180deg)' 
                    }} 
                  />

                  {/* Rating */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#d97706" color="#d97706" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p style={{ color: 'var(--foreground)', fontSize: '15px', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 400, flexGrow: 1 }}>
                    "{t.text}"
                  </p>

                  {/* Author Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border)' }}
                    />
                    <div>
                      <h4 style={{ color: 'var(--foreground)', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>{t.name}</h4>
                      <p style={{ color: 'var(--muted)', fontSize: '12.5px' }}>
                        {t.role} {t.company ? `at ${t.company}` : ''}
                      </p>
                    </div>
                  </div>
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
