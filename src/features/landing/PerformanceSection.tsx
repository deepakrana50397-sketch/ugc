'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]
  });

  // Pink Ribbon SVG path scroll offset animation
  const ribbonDasharray = 1000;
  const ribbonDashoffset = useTransform(scrollYProgress, [0.1, 0.6], [ribbonDasharray, 0]);

  // Video card tilt / parallax floating effect on scroll
  const videoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      id="performance-section"
      className="relative w-full flex items-center justify-center"
      style={{ paddingTop: '120px', paddingBottom: '120px', paddingLeft: '20px', paddingRight: '20px' }}
    >
      <div className="max-w-[1200px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 section-grid-gap items-center">

        {/* Left Column: Video Card & Stats Card Overlay */}
        <div className="flex justify-center md:justify-end relative w-full">

          {/* Decorative Pink SVG path above the video card */}
          <div className="absolute left-[50%] md:left-[60%] bottom-[85%] w-[80%] h-[120%] pointer-events-none z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 300"
              fill="none"
              overflow="visible"
            >
              <motion.path
                d="M 20 300 Q 60 150 180 0"
                stroke="rgb(255, 168, 242)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: ribbonDasharray,
                  strokeDashoffset: ribbonDashoffset
                }}
              />
            </svg>
          </div>

          {/* Floating Video Wrapper */}
          <motion.div
            style={{ y: videoY }}
            className="relative w-full max-w-[336px] lg:max-w-[360px] aspect-[9/16] z-10 md:-left-9"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-stone-100">
              <video
                src="https://framerusercontent.com/assets/Lz2KK6tJvaSwPqt8CILUTfpWU.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlaid Pink Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
              className="absolute z-20 select-none"
              style={{
                backgroundColor: 'rgb(255, 168, 242)',
                left: '-18%',
                bottom: '8%',
                width: '220px',
                padding: '20px',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(255, 168, 242, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <span
                className="text-4xl md:text-[44px] font-extrabold tracking-tight leading-none mb-0.5"
                style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-display)' }}
              >
                200%
              </span>
              <span
                className="text-[12px] md:text-xs font-semibold leading-tight"
                style={{ color: '#c2429a', fontFamily: 'var(--font-sans)' }}
              >
                Organic Follower Growth
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Why Brands Choose igigister */}
        <div className="flex flex-col justify-center gap-8 relative z-10 text-left max-w-[520px] md-mr-auto-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
            style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-display)' }}
          >
            Why Brands Choose iGigster
          </motion.h2>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px 20px',
            }}
            className="why-choose-grid"
          >
            {[
              { emoji: '⚡', title: 'Faster execution', desc: 'Launch campaigns in days, not weeks.' },
              { emoji: '🎯', title: 'Qualified talent', desc: 'Vetted creators, students, and agencies.' },
              { emoji: '📈', title: 'Scalable campaigns', desc: 'Easily scale delivery as your brand grows.' },
              { emoji: '🧠', title: 'Smart matching', desc: 'Automated pairing based on data.' },
              { emoji: '🛡', title: 'Verified network', desc: 'Secure hiring with verified credentials.' },
              { emoji: '🤝', title: 'Managed services', desc: 'We execute and manage campaigns end to end.' }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{item.emoji}</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'rgb(28, 25, 23)' }}>{item.title}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#57534e', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
