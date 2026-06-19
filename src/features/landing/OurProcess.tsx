'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Hidden SVG sprite declarations to host the user-provided symbol IDs
const SymbolDefinitions = () => (
  <svg style={{ display: 'none' }}>
    <defs>
      {/* svg1: Speech bubble with lines */}
      <symbol id="2502757080" viewBox="0 0 24 24">
        <path 
          d="M21 11.5a8.5 8.5 0 1 1-8.5-8.5h.5a8.5 8.5 0 0 1 8 8.5z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        <path 
          d="M12 18l-3 3v-3" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </symbol>
      
      {/* svg2: Video player capsule */}
      <symbol id="3761207643" viewBox="0 0 24 24">
        <rect 
          x="3" 
          y="5" 
          width="18" 
          height="14" 
          rx="4" 
          ry="4" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        <polygon points="10,9 15,12 10,15" fill="currentColor" />
      </symbol>
      
      {/* svg3: Checkmark */}
      <symbol id="1850400172" viewBox="0 0 24 24">
        <path 
          d="M20 6L9 17L4 12" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </symbol>
      
      {/* svg4: Increasing bar charts */}
      <symbol id="1074007029" viewBox="0 0 24 24">
        <rect x="3" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="10" y="9" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="17" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      </symbol>
    </defs>
  </svg>
);

interface TiltCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function TiltCard({ children, style = {} }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;

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
        scale: tilt.x !== 0 ? 1.015 : 1
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
    >
      {children}
    </motion.div>
  );
}

export default function OurProcess() {
  const processSteps = [
    {
      number: '01',
      svgId: '2502757080',
      title: 'Planing',
      description: "We do the research so it's likely to go viral.",
      bgColor: '#ffa8f2', // Pink
    },
    {
      number: '02',
      svgId: '3761207643',
      title: 'Contents',
      description: 'We create native content that fits the platform.',
      bgColor: '#9b7bfc', // Lavender/Purple
    },
    {
      number: '03',
      svgId: '1850400172',
      title: 'Optimization',
      description: 'We track performance and refine what works.',
      bgColor: '#d1ccc8', // Warm Grey
    },
    {
      number: '04',
      svgId: '1074007029',
      title: 'Scale',
      description: "We push what performs and drop what doesn't.",
      bgColor: '#8eff8f', // Green
    },
  ];

  return (
    <section 
      id="our-process-section"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '#fafaf9'
      }}
    >
      <SymbolDefinitions />

      <div 
        className="relative z-10 flex flex-col gap-10 md:gap-16"
        style={{
          maxWidth: '1200px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        
        {/* Header Block */}
        <div className="flex flex-col items-start gap-4">
          {/* Pink pill badge */}
          <span 
            className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
            style={{
              backgroundColor: 'rgba(219, 39, 119, 0.1)',
              color: '#db2777',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Our Process
          </span>

          <h2 
            className="text-4xl md:text-[56px] font-black leading-[1.05] tracking-tighter text-[#1c1917]"
            style={{
              fontFamily: 'var(--font-display)',
            }}
          >
            From strategy to<br />scroll-stopping content.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: idx * 0.1 }}
              className="w-full flex"
            >
              <TiltCard
                style={{
                  padding: '20px',
                  borderRadius: '32px',
                  backgroundColor: step.bgColor,
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  minHeight: '380px',
                }}
              >
                {/* Top Rounded Header Bar */}
                <div 
                  style={{
                    backgroundColor: '#ffffff',
                    border: '2.5px solid #1c1917',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span 
                    className="text-2xl font-black tracking-tight text-[#1c1917]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {step.number}
                  </span>

                  {/* Render the user requested SVG with custom href */}
                  <svg 
                    className="w-6 h-6 text-[#1c1917]" 
                    role="presentation" 
                    style={{ opacity: 1 }}
                    viewBox="0 0 24 24"
                  >
                    <use href={`#${step.svgId}`} />
                  </svg>
                </div>

                {/* Bottom Text Content */}
                <div className="px-1 pb-2 mt-auto text-left">
                  <h3 
                    className="text-[32px] font-black tracking-tight mb-2 text-[#1c1917] leading-none"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-[16px] font-semibold text-[#1c1917]/85 leading-snug"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
