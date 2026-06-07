'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { statsData } from '@/data/stats';
import GlowCard from '@/components/animation/GlowCard';

function AnimatedCounter({ endValue }: { endValue: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, endValue, { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] as const // Custom easeOutExpo
      });
      return controls.stop;
    }
  }, [isInView, endValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section 
      style={{
        padding: '100px 24px',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <motion.div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {statsData.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
          >
            <GlowCard 
              glowColor="rgba(219, 39, 119, 0.08)"
              style={{
                padding: '32px 40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: '1px solid rgba(231, 229, 228, 0.8)',
              }}
            >
              <h3 
                style={{ 
                  fontSize: '48px', 
                  fontWeight: 800, 
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.04em',
                }}
              >
                <AnimatedCounter endValue={stat.value} />
                <span className="accent-gradient-text" style={{ fontWeight: 800 }}>{stat.suffix}</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {stat.description}
                </span>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
