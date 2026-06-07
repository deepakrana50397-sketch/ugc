'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Cpu, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      }
    },
  };

  const modules = [
    {
      id: '01',
      tag: 'UGC MATCHMAKING',
      icon: <Sparkles size={22} />,
      title: 'UGC Sourcing & Seeding',
      description: 'We match your brand brief with vetted creators. No actor vibes—just real consumers creating authentic mobile-native content.',
      bullets: [
        'Vetted profiles (8% pass rate)',
        '100% rate transparency',
        'Physical product seeding logistics'
      ],
      videoUrl: 'https://framerusercontent.com/assets/SCuqi0qyfpukKLtZm0jURfE.mp4',
    },
    {
      id: '02',
      tag: 'DR SCRIPTING',
      icon: <FileText size={22} />,
      title: 'Direct-Response Scripting',
      description: 'Our copywriting team drafts custom storyboards and visual scripts designed to hook viewers in 1.5 seconds. We test multiple hooks.',
      bullets: [
        'High-retention hooks formula',
        'Auditory pacing structures',
        'Storyboards approved before shooting'
      ],
      videoUrl: 'https://framerusercontent.com/assets/64ZMhO5aQtuzPw6cPEGQKIEos.mp4',
    },
    {
      id: '03',
      tag: 'NATIVE EDITING',
      icon: <Cpu size={22} />,
      title: 'Conversion-First Editing',
      description: 'Raw footage is spliced in-house. We apply native captions, zoom-cuts, and custom sound effects to optimize watch time.',
      bullets: [
        'Caption overlays & text graphics',
        'Lighting & grading correction',
        '90-day paid media usage rights'
      ],
      videoUrl: 'https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4',
    }
  ];

  return (
    <section 
      id="services"
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Decorative Radial Grid Background Accent */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '72px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(79, 70, 229, 0.06)',
              border: '1px solid rgba(79, 70, 229, 0.15)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: 'rgb(79, 70, 229)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} className="text-secondary" />
            <span>Conversion Mechanics</span>
          </div>

          <TextReveal
            text="Designed to convert."
            tag="h2"
            mode="words"
            className="text-foreground"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          />
          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontStyle: 'italic', 
              fontWeight: 500,
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              color: 'rgb(219, 39, 119)',
              marginTop: '-16px',
              letterSpacing: '-0.02em',
            }}
          >
            Structured to scale.
          </h2>
          
          <motion.p 
            style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16.5px', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A complete sourcing, scripting, and mobile-native post-production pipeline built to scale your creative testing cycle.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            width: '100%',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {modules.map((module) => (
            <motion.div
              key={module.id}
              variants={cardVariants}
              style={{ height: '100%' }}
            >
              <GlowCard
                glowColor="rgba(79, 70, 229, 0.08)"
                style={{
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  height: '100%',
                  position: 'relative',
                  border: '1px solid rgba(231, 229, 228, 0.7)',
                }}
              >
                {/* Meta details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span 
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: 'var(--muted)',
                      backgroundColor: 'var(--muted-bg)',
                      border: '1px solid var(--border)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    [{module.tag}]
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(79, 70, 229, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(79, 70, 229)',
                      border: '1px solid rgba(79, 70, 229, 0.12)',
                    }}
                  >
                    {module.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  <h3 style={{ color: 'var(--foreground)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {module.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.5 }}>
                    {module.description}
                  </p>
                </div>

                {/* Video Preview */}
                <div 
                  style={{ 
                    position: 'relative', 
                    width: '100%', 
                    aspectRatio: '4 / 3', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    backgroundColor: '#0c0a09',
                    border: '1px solid var(--border)',
                  }}
                >
                  <video
                    src={module.videoUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Bullets */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', listStyle: 'none' }}>
                  {module.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--muted)' }}>
                      <div 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(79, 70, 229, 0.06)', 
                          border: '1px solid rgba(79, 70, 229, 0.15)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'rgb(79, 70, 229)',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA */}
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                  <Link
                    href="/pricing"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '30px',
                      backgroundColor: 'var(--foreground)',
                      color: 'var(--background)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease',
                    }}
                    className="hover-bg-primary-btn"
                  >
                    <span>View rate guidelines</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
