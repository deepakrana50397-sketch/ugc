'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealWordProps {
  word: string;
  index: number;
  scrollYProgress: any;
}

function ScrollRevealWord({ word, index, scrollYProgress }: ScrollRevealWordProps) {
  // Calculate staggered animation ranges based on word index
  const startRange = 0.15 + index * 0.025;
  const endRange = 0.25 + index * 0.025;

  // Cap values so they don't exceed 1.0 bounds
  const start = Math.min(startRange, 0.9);
  const end = Math.min(endRange, 0.95);

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [15, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block relative">
      {word}
    </motion.span>
  );
}

export default function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]
  });

  // SVGs dash array logic
  const pinkDasharray = 341.431;
  const pinkDashoffset = useTransform(scrollYProgress, [0.1, 0.6], [pinkDasharray, 0]);

  const blueDasharray = 255.095;
  const blueDashoffset = useTransform(scrollYProgress, [0.2, 0.7], [blueDasharray, 0]);

  const titleText = "We made social media into a consistent, high-performing growth channel.";
  const words = titleText.split(" ");

  // Parallax for video cards
  const video1Y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const video2Y = useTransform(scrollYProgress, [0, 1], [250, -50]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-6 overflow-hidden flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: 'rgb(244, 244, 243)' }}
    >
      <div className="max-w-[600px] w-full mx-auto relative z-10 flex flex-col items-center justify-center text-center">

        {/* Pink Badge */}
        <div
          className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8"
          style={{
            backgroundColor: 'rgba(219, 39, 119, 0.1)',
            color: 'rgb(219, 39, 119)',
            fontFamily: 'var(--font-sans)'
          }}
        >
          OUR MISSION
        </div>

        {/* The Text Reveal */}
        <h2
          className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight max-w-[1000px] leading-[1.15] flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]"
          style={{ fontFamily: 'var(--font-display)', color: 'rgb(28, 25, 23)' }}
        >
          {words.map((word, idx) => (
            <ScrollRevealWord 
              key={idx} 
              word={word} 
              index={idx} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </h2>

      </div>

      {/* Decorative Pink SVG Path */}
      <div className="absolute left-[2%] md:left-[10%] top-[10%] md:top-[15%] w-[120px] md:w-[180px] h-[90px] md:h-[137px] pointer-events-none opacity-90 rotate-[-15deg] z-0">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" overflow="visible" viewBox="0.9482954939248494 0.45830549796842845 180.68381710846378 137.6843359072919">
          <g>
            <motion.path
              d="M180.79 1.30042C163.471 65.6046 110.061 102.919 78.3233 105.455C51.3324 107.612 61.0037 65.4235 78.3233 76.7446C89.9026 84.3135 103.169 118.769 59.3715 133.984C33.4678 142.984 1.79041 130.815 1.79041 130.815"
              stroke="var(--token-b9b29e69-e997-4651-b982-7d2578af98ba, rgb(255, 168, 242))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="1"
              fill="none"
              style={{
                strokeDasharray: pinkDasharray,
                strokeDashoffset: pinkDashoffset
              }}
            />
          </g>
        </svg>
      </div>

      {/* Decorative Blue/Lavender SVG Path */}
      <div className="absolute right-[2%] md:right-[15%] bottom-[15%] md:bottom-[20%] w-[40px] md:w-[60px] h-[100px] md:h-[150px] pointer-events-none opacity-90 rotate-[10deg] z-0">
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" overflow="visible" viewBox="4.370647270047903 4.371990043485403 60.25848325378847 150.25824674255801">
          <g>
            <motion.path
              d="M63.9999 5.00122C47.0795 12.4205 11.734 36.6747 5.71552 74.3371C0.138539 109.237 28.6566 98.5154 39.3176 87.1384C43.0379 83.1683 46.2823 77.1531 43.446 74.9339C41.1216 73.1153 36.2184 78.3559 34.7325 85.3414C31.9664 98.3458 35.1567 124.208 61.0698 154.001"
              stroke="var(--token-36691d6b-fd51-40c3-90d4-8c2b90652b0a, rgb(170, 148, 255))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="1"
              fill="none"
              style={{
                strokeDasharray: blueDasharray,
                strokeDashoffset: blueDashoffset
              }}
            />
          </g>
        </svg>
      </div>

      {/* Video Card 1 (Left - Floats up) */}
      <motion.div
        style={{ y: video1Y, rotate: -3 }}
        className="hidden md:block absolute left-[3%] lg:left-[8%] top-[25%] w-[220px] lg:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_25px_55px_rgba(0,0,0,0.12)] border border-stone-200/50 z-20 pointer-events-none"
      >
        <video
          src="https://framerusercontent.com/assets/Lz2KK6tJvaSwPqt8CILUTfpWU.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Video Card 2 (Right - Floats up) */}
      <motion.div
        style={{ y: video2Y, rotate: 4 }}
        className="hidden md:block absolute right-[3%] lg:right-[8%] top-[10%] w-[200px] lg:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_25px_55px_rgba(0,0,0,0.12)] border border-stone-200/50 z-20 pointer-events-none"
      >
        <video
          src="https://framerusercontent.com/assets/aPqDWQqPVRqGBPXrnqHff4IYY.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

    </section>
  );
}
