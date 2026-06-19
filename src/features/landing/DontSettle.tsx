'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Shinta logo icon matching the mockup (black rectangle with white stylized S)
const ShintaLogoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <rect width="100" height="100" rx="26" fill="#1c1917" />
    <path
      d="M35 65C36.5 58 42.5 54 50 54C57.5 54 65 50.5 65 41C65 31.5 55 30 50 30C41 30 36.5 35.5 35 43M65 33C63.5 40 57.5 44 50 44C42.5 44 35 47.5 35 57C35 66.5 45 68 50 68C59 68 63.5 62.5 65 54"
      stroke="white"
      strokeWidth="8.5"
      strokeLinecap="round"
    />
  </svg>
);

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TiltCard({ children, className = '', style = {} }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.x !== 0 ? 1.02 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 20
      }}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DontSettle() {
  const otherPoints = [
    'Ad-like, brand-heavy',
    'Posting volume',
    'Based on follower count',
    'Trend-chasing',
    'Basic metrics'
  ];

  const shintaPoints = [
    'Platform-native, organic-first',
    'Engagement & relevance',
    'Performance-based selection',
    'Strategic & brand-aligned',
    'Clear insights & learnings'
  ];

  return (
    <section
      id="dont-settle-section"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        paddingTop: '140px',
        paddingBottom: '160px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '#fafaf9'
      }}
    >
      {/* Decorative Radial Background Accent */}
      <div
        className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[80%] h-[60%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 168, 242, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 flex flex-col items-center gap-16 md:gap-24">

        {/* Centered Heading */}
        <div className="text-center flex flex-col gap-4">
          <h2
            className="text-4xl md:text-[56px] font-black leading-none tracking-tighter"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#1c1917'
            }}
          >
            Don’t settle for less
          </h2>
        </div>

        {/* Cards Overlap Grid */}
        <div className="relative w-full max-w-[840px] flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 mt-4">

          {/* Card 1: Other Agencies */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.1 }}
            className="relative w-full md:w-[420px] z-10 md:translate-x-[20px] flex"
          >

            <TiltCard
              style={{
                padding: '20px',
                borderRadius: '32px',
                border: '1px solid rgba(28, 25, 23, 0.1)',
                backgroundColor: '#ffffff',
                boxShadow: '0 25px 60px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                color: '#1c1917'
              }}
            >
              <div>
                <h3
                  className="text-3xl md:text-[34px] font-bold tracking-tight mb-8"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: '#3c3531ff',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Other Agencies
                </h3>

                <ul className="flex flex-col gap-6">
                  {otherPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-[18px] text-stone-500 font-medium text-base md:text-[20px]"
                      style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em' }}
                    >
                      <div className="w-[28px] h-[28px] rounded-full bg-stone-300/80 flex items-center justify-center flex-shrink-0 text-white">
                        <Check size={15} strokeWidth={3} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Shinta */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.2 }}
            className="relative w-full md:w-[440px] z-20 md:translate-x-[-20px] flex"
          >
            <TiltCard
              style={{
                padding: '20px',
                borderRadius: '32px',
                backgroundColor: '#ffa8f2',
                boxShadow: '0 25px 60px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                color: '#1c1917'
              }}
            >
              <div>
                {/* Brand Header with Shinta Logo */}
                <div className="flex items-center gap-3.5 mb-8">
                  <ShintaLogoIcon />
                  <h3
                    className="text-3xl md:text-[34px] font-extrabold tracking-tight"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: '#1c1917',
                      lineHeight: '1'
                    }}
                  >
                    Shinta
                  </h3>
                </div>

                <ul className="flex flex-col gap-6">
                  {shintaPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-[18px] font-medium text-base md:text-[20px] text-[#1c1917]"
                      style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em' }}
                    >
                      <div className="w-[28px] h-[28px] rounded-full bg-[#1c1917] flex items-center justify-center flex-shrink-0 text-white">
                        <Check size={15} strokeWidth={3.5} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

