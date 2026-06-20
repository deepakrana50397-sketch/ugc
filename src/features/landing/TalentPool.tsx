'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TalentPool() {
  const categories = [
    { name: 'Creators', color: '#db2777', x: '0%', y: '-35%' },
    { name: 'Influencers', color: '#7c3aed', x: '25%', y: '-25%' },
    { name: 'Students', color: '#2563eb', x: '35%', y: '0%' },
    { name: 'Agencies', color: '#10b981', x: '25%', y: '25%' },
    { name: 'Editors', color: '#f59e0b', x: '0%', y: '35%' },
    { name: 'Communities', color: '#ec4899', x: '-25%', y: '25%' },
    { name: 'Event Managers', color: '#06b6d4', x: '-35%', y: '0%' },
    { name: 'Production Teams', color: '#8b5cf6', x: '-25%', y: '-25%' },
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
              backgroundColor: 'rgba(79, 70, 229, 0.08)',
              color: 'rgb(79, 70, 229)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Talent Ecosystem
          </span>

          <h2
            className="text-4xl md:text-[56px] font-black leading-[1.05] tracking-tighter text-[#1c1917]"
            style={{
              fontFamily: 'var(--font-display)',
            }}
          >
            One campaign.<br />Multiple execution channels.
          </h2>
        </div>

        {/* Visual Network Graph Container */}
        <div 
          className="relative w-full max-w-[650px] aspect-square md:h-[450px] md:aspect-auto flex items-center justify-center my-8"
        >
          {/* Desktop orbit SVG lines connecting center to nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            {categories.map((cat, idx) => {
              return (
                <g key={idx}>
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2={`${50 + parseFloat(cat.x)}%`}
                    y2={`${50 + parseFloat(cat.y)}%`}
                    stroke={`${cat.color}25`}
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                  />
                  <motion.circle
                    cx={`${50 + parseFloat(cat.x)}%`}
                    cy={`${50 + parseFloat(cat.y)}%`}
                    r="4"
                    fill={cat.color}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 + 0.5 }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Node: Brands */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#1c1917',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '18px',
              letterSpacing: '-0.02em',
              zIndex: 30,
              boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 0 8px rgba(28,25,23,0.05)',
              position: 'relative'
            }}
          >
            Brands
            {/* Pulsing ring */}
            <span style={{
              position: 'absolute',
              inset: '-8px',
              border: '2px dashed rgba(28, 25, 23, 0.2)',
              borderRadius: '50%',
              animation: 'spin 30s linear infinite'
            }} />
          </motion.div>

          {/* Floating/Orbiting Talent Nodes (Desktop layout) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                className="pointer-events-auto"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 12, delay: idx * 0.08 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${cat.x} - 80px)`,
                  top: `calc(50% + ${cat.y} - 22px)`,
                  width: '160px',
                  height: '44px',
                  backgroundColor: '#ffffff',
                  border: `1.5px solid ${cat.color}40`,
                  borderRadius: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
                  zIndex: 20,
                  cursor: 'default'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: cat.color,
                  marginRight: '8px'
                }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#1c1917' }}>
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Fallback Mobile grid (Simple Orbit-like compact layout) */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[340px] md:hidden z-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${cat.color}30`,
                  borderRadius: '16px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.color }} />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#1c1917' }}>{cat.name}</span>
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
            One brief. Multiple execution channels. Connect your campaign with the right talent segment to unlock viral scale.
          </p>

          <Link
            href="/contact"
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
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            }}
            className="hover:bg-stone-800"
          >
            <span>Launch Campaign</span>
            <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
