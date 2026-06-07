'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { landingPageContent } from '@/data/landing';
import { ArrowRight, CheckCircle2, Video, Rocket, Unlock, Briefcase, Award } from 'lucide-react';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

export default function HowItWorks() {
  const { howItWorks } = landingPageContent;
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

  const pathLength = useTransform(scaleY, [0.1, 0.8], [0, 1]);

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
      {/* Background patterns */}
      <div 
        className="bg-dot-pattern"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextReveal
            text="How iGigster Works"
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
            style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {howItWorks.subtitle}
          </motion.p>
        </div>

        {/* Brand vs Creator Grids */}
        <div 
          className="timeline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            position: 'relative',
          }}
        >
          {/* Channel 1: For Brands */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
            <motion.div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'rgb(79, 70, 229)', padding: '10px', borderRadius: '12px' }}>
                <Rocket size={24} />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>For Brands</span>
                <ArrowRight size={20} className="text-secondary" />
              </h3>
            </motion.div>

            {/* Steps Timeline Container */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px', paddingLeft: '40px' }}>
              {/* Continuous SVG scroll line drawing */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '15px', 
                  bottom: '15px', 
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
                    stroke="rgb(79, 70, 229)" 
                    strokeWidth="3"
                    style={{ pathLength }}
                  />
                </svg>
              </div>

              {howItWorks.brandSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  {/* Bullet Indicator */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: '-40px', 
                      top: '10px', 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--background)',
                      border: '2px solid rgb(79, 70, 229)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'rgb(79, 70, 229)',
                      boxShadow: '0 4px 10px rgba(79, 70, 229, 0.1)',
                    }}
                  >
                    {step.step}
                  </div>

                  <GlowCard 
                    glowColor="rgba(79, 70, 229, 0.1)"
                    style={{
                      padding: '28px',
                      border: '1px solid rgba(231, 229, 228, 0.8)',
                    }}
                  >
                    <h4 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                      {step.title}
                    </h4>
                    <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Channel 2: For Creators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
            <motion.div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ backgroundColor: 'rgba(219, 39, 119, 0.1)', color: 'rgb(219, 39, 119)', padding: '10px', borderRadius: '12px' }}>
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>For Creators</span>
                <ArrowRight size={20} className="text-primary" />
              </h3>
            </motion.div>

            {/* Steps Timeline Container */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px', paddingLeft: '40px' }}>
              {/* Continuous SVG scroll line drawing */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '15px', 
                  top: '15px', 
                  bottom: '15px', 
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
                    stroke="rgb(219, 39, 119)" 
                    strokeWidth="3"
                    style={{ pathLength }}
                  />
                </svg>
              </div>

              {howItWorks.creatorSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  {/* Bullet Indicator */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: '-40px', 
                      top: '10px', 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--background)',
                      border: '2px solid rgb(219, 39, 119)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'rgb(219, 39, 119)',
                      boxShadow: '0 4px 10px rgba(219, 39, 119, 0.1)',
                    }}
                  >
                    {step.step}
                  </div>

                  <GlowCard 
                    glowColor="rgba(219, 39, 119, 0.08)"
                    style={{
                      padding: '28px',
                      border: '1px solid rgba(231, 229, 228, 0.8)',
                    }}
                  >
                    <h4 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                      {step.title}
                    </h4>
                    <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
