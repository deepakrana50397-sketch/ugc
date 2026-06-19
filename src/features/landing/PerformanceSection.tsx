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

        {/* Right Column: Title & Text Block */}
        <div className="flex flex-col justify-center gap-6 relative z-10 text-left max-w-[480px] md-mr-auto-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[40px] md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-[1.05] max-w-[420px]"
            style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-display)' }}
          >
            Performance-driven UGC that delivers results
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg leading-relaxed max-w-[470px] opacity-75"
            style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-sans)' }}
          >
            Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
