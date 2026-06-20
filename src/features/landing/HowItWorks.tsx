'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Check, Send, Users, UserCheck, Play, Award } from 'lucide-react';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  // Monitor scroll for SVG path drawing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useTransform(scaleY, [0.1, 0.85], [0, 1]);

  const steps = [
    {
      step: '01',
      title: 'Post Brief',
      description: 'Detail your campaign goals, budget, deliverables, and matching requirements.',
      icon: <Send size={18} />,
      color: '#db2777'
    },
    {
      step: '02',
      title: 'Get Matched',
      description: 'Our smart engine pairs your brief with qualified creators, students, or teams.',
      icon: <Users size={18} />,
      color: '#7c3aed'
    },
    {
      step: '03',
      title: 'Review Talent',
      description: 'Compare applicant pitches, verified portfolios, rates, and past performance.',
      icon: <UserCheck size={18} />,
      color: '#2563eb'
    },
    {
      step: '04',
      title: 'Approve Team',
      description: 'Select the perfect match and finalize campaign delivery schedules.',
      icon: <Check size={18} strokeWidth={3} />,
      color: '#10b981'
    },
    {
      step: '05',
      title: 'Launch Campaign',
      description: 'Deploy creators to build content, activate communities, and start generating buzz.',
      icon: <Play size={18} fill="currentColor" />,
      color: '#f59e0b'
    },
    {
      step: '06',
      title: 'Receive Deliverables',
      description: 'Receive, approve, and download final high-performing assets ready for social channels.',
      icon: <Award size={18} />,
      color: '#db2777'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="how-it-works"
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
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(219, 39, 119, 0.06)',
              border: '1px solid rgba(219, 39, 119, 0.15)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#db2777',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} />
            <span>Campaign Timeline</span>
          </div>

          <TextReveal
            text="How Campaigns Work"
            tag="h2"
            mode="words"
            className="text-foreground"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          />
          <p style={{ color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontSize: '16px', lineHeight: 1.55 }}>
            From posting your initial brief to acquiring final creative assets in simple, verified steps.
          </p>
        </div>

        {/* Unified Timeline Column */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px', paddingLeft: '48px', width: '100%' }}>
          {/* Continuous SVG scroll line drawing */}
          <div 
            style={{ 
              position: 'absolute', 
              left: '19px', 
              top: '20px', 
              bottom: '20px', 
              width: '2px', 
              backgroundColor: 'rgba(28, 25, 22, 0.08)',
              zIndex: 0,
            }}
          >
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <motion.line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="100%" 
                stroke="#ffa8f2" 
                strokeWidth="4"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              style={{ position: 'relative', zIndex: 1, width: '100%' }}
            >
              {/* Bullet Indicator */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '-48px', 
                  top: '12px', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--background)',
                  border: `2px solid ${step.color}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 900,
                  color: step.color,
                  boxShadow: `0 4px 12px ${step.color}15`,
                }}
              >
                {step.icon}
              </div>

              <GlowCard 
                glowColor={`${step.color}08`}
                style={{
                  padding: '24px 28px',
                  border: '1px solid rgba(231, 229, 228, 0.8)',
                  textAlign: 'left',
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.01em', margin: 0 }}>
                    {step.title}
                  </h4>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', fontFamily: 'monospace' }}>
                    STEP {step.step}
                  </span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                  {step.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
