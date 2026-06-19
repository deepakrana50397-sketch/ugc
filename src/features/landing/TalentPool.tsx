'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TalentPool() {
  const talents = [
    {
      id: 'p1',
      name: 'Elena',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      rotation: -8,
      yOffset: -10,
    },
    {
      id: 'p2',
      name: 'Marcus',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
      rotation: 4,
      yOffset: 15,
    },
    {
      id: 'p3',
      name: 'Sora',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300',
      rotation: -6,
      yOffset: -15,
    },
    {
      id: 'p4',
      name: 'Oliver',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      rotation: 6,
      yOffset: 10,
    },
    {
      id: 'p5',
      name: 'Amara',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      rotation: -4,
      yOffset: -5,
    },
    {
      id: 'p6',
      name: 'Zion',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      rotation: 8,
      yOffset: 20,
    },
  ];

  return (
    <section
      id="talent-pool-section"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '#fafaf9',
      }}
    >
      {/* Centered Content Container */}
      <div
        className="relative z-10 flex flex-col items-center gap-10 md:gap-16 text-center"
        style={{
          maxWidth: '1200px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4">
          <span
            className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
            style={{
              backgroundColor: 'rgba(219, 39, 119, 0.1)',
              color: '#db2777',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Our Talent
          </span>

          <h2
            className="text-4xl md:text-[56px] font-black leading-[1.05] tracking-tighter text-[#1c1917]"
            style={{
              fontFamily: 'var(--font-display)',
            }}
          >
            A pool of highly talented<br />creators and gigsters
          </h2>
        </div>

        {/* Overlapping Cards Cluster Container */}
        <div className="relative w-full py-12 flex items-center justify-center min-h-[340px]">
          {/* Wavy pink background stroke line */}
          <svg 
            className="absolute left-0 right-0 w-full pointer-events-none z-0" 
            style={{ top: '45%', height: '140px' }} 
            viewBox="0 0 1440 140" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path 
              d="M-100,70 C150,-20 350,160 600,70 C850,-20 1050,160 1300,70 C1450,20 1550,70 1640,70" 
              stroke="#ffa8f2" 
              strokeWidth="8" 
              strokeLinecap="round" 
            />
          </svg>

          {/* Cards Flex Row */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 md:gap-0 md:-space-x-5 max-w-full">
            {talents.map((talent, idx) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: talent.rotation,
                  y: talent.yOffset
                }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 90, 
                  damping: 14, 
                  delay: idx * 0.08 
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0, 
                  y: talent.yOffset - 15,
                  zIndex: 50,
                  transition: { duration: 0.25 }
                }}
                style={{
                  padding: '12px',
                  backgroundColor: '#9b7bfc',
                  borderRadius: '24px',
                  boxShadow: '0 20px 45px rgba(155, 123, 252, 0.15)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                className="w-[160px] md:w-[180px] z-10"
              >
                <img
                  src={talent.image}
                  alt={talent.name}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Description */}
        <div className="flex flex-col items-center gap-8 max-w-[650px] mt-4">
          <p
            className="text-[17px] md:text-[19px] font-semibold text-[#78716c] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Gigsters and UGC creators help brands scale performance, turn ideas into consistent, high-converting social video content.
          </p>

          {/* Custom double pill button */}
          <div className="flex items-center" style={{ gap: '10px' }}>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#000000' }}
              whileTap={{ scale: 0.98 }}
              style={{
                height: '56px',
                paddingLeft: '32px',
                paddingRight: '32px',
                borderRadius: '28px',
                backgroundColor: '#1c1917',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
              }}
            >
              Explore Gigsters
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#ffa8f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1c1917',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(255, 168, 242, 0.25)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
