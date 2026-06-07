'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { servicesData } from '@/data/services';
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

  return (
    <section 
      id="services"
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
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
          maxWidth: '1280px',
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
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextReveal
            text="Transform Your Brand with UGC Services"
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
            style={{ color: 'var(--muted)', maxWidth: '640px', margin: '0 auto', fontSize: '17px', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Direct access to talented short-form creators, video editors, and motion designers. Scale production without standard agency retainers.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            width: '100%',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {servicesData.map((service) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Video;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                style={{ height: '100%' }}
              >
                <GlowCard
                  glowColor="rgba(79, 70, 229, 0.12)"
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
                  {/* Decorative Background Path Line */}
                  <svg 
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      width: '120px',
                      height: '120px',
                      pointerEvents: 'none',
                      zIndex: 0,
                      opacity: 0.08,
                    }}
                    viewBox="0 0 100 100"
                  >
                    <path 
                      d="M100,50 Q75,100 50,50 T0,50" 
                      fill="none" 
                      stroke="rgb(79, 70, 229)" 
                      strokeWidth="2" 
                    />
                  </svg>

                  {/* Popular Badge */}
                  {service.popular && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '24px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: 'rgba(79, 70, 229, 0.08)',
                        color: 'rgb(79, 70, 229)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(79, 70, 229, 0.15)',
                        zIndex: 2,
                      }}
                    >
                      Popular
                    </span>
                  )}

                  {/* Icon wrapper */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(79, 70, 229, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(79, 70, 229)',
                      transition: 'all 0.3s ease',
                      zIndex: 2,
                    }}
                    className="service-icon-wrapper"
                  >
                    <IconComponent size={26} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 2 }}>
                    <h3 style={{ color: 'var(--foreground)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      {service.name}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                      {service.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
