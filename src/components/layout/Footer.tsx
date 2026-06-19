'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 flex-shrink-0">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FooterLogoIcon = () => (
  <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#1c1917] transition-transform duration-300 hover:scale-105">
    <rect width="100" height="100" rx="28" fill="currentColor" />
    <path d="M35 65C36.5 58 42.5 54 50 54C57.5 54 65 50.5 65 41C65 31.5 55 30 50 30C41 30 36.5 35.5 35 43M65 33C63.5 40 57.5 44 50 44C42.5 44 35 47.5 35 57C35 66.5 45 68 50 68C59 68 63.5 62.5 65 54" stroke="#ffa8f2" style={{ stroke: '#ffa8f2' }} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  // Track scroll position of the footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Grow path by animating strokeDashoffset from 2475.29 to 0 as user scrolls
  const strokeDashoffset = useTransform(scrollYProgress, [0.0, 0.85], [2475.29, 0]);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/brands' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: '404', href: '/404' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Condition', href: '#' }
  ];

  return (
    <footer 
      ref={footerRef}
      id="footer-section"
      className="relative w-full lg:h-screen min-h-screen bg-[#ffa8f2] text-[#1c1917] px-6 md:px-12 lg:px-20 py-8 lg:py-12 flex flex-col justify-between overflow-hidden z-10"
    >
      {/* Growing SVG Winding Line background overlay */}
      <svg 
        className="absolute right-[-10%] md:right-[-5%] top-[-25%] w-[600px] h-[600px] md:w-[850px] md:h-[850px] lg:w-[1050px] lg:h-[1050px] pointer-events-none z-0 overflow-visible text-[#ab8bec]"
        role="presentation" 
        viewBox="0 0 1170 1170"
      >
        <motion.path 
          d="M 1012 0 C 1012 0 685.114 76.915 628.183 300.778 C 592.343 441.706 652.378 586.306 761.118 561.104 C 831.495 544.792 841.921 423.437 796.958 340.577 C 733.921 224.409 506.014 255.052 431.387 459.974 C 299.755 821.429 481.563 1014.553 0 1147" 
          fill="transparent" 
          stroke="currentColor" 
          strokeWidth="30" 
          strokeLinecap="butt" 
          strokeLinejoin="miter" 
          strokeMiterlimit="10" 
          transform="translate(80 12)" 
          style={{
            strokeDasharray: "2475.29 2475.29",
            strokeDashoffset,
          }}
        />
      </svg>

      <div className="max-w-[1280px] w-full mx-auto flex flex-col justify-between flex-1 relative z-10 mt-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 w-full">
          
          {/* Left Column (Brand title & Contact info) */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 
                className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05] text-[#1c1917]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                UGC that grows<br />your brand.
              </h2>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-widest uppercase text-[#1c1917]/50 font-bold font-mono">
                CONTACT
              </span>
              <div className="flex flex-col gap-1">
                <a 
                  href="mailto:contact@shinta.com" 
                  className="text-2xl md:text-3xl font-extrabold hover:opacity-80 transition-opacity tracking-tight"
                >
                  contact@shinta.com
                </a>
                <a 
                  href="tel:+12345678" 
                  className="text-xl md:text-2xl font-extrabold hover:opacity-80 transition-opacity tracking-tight text-[#1c1917]/80"
                >
                  +12 345 678
                </a>
              </div>
            </div>
          </div>

          {/* Center Column (Navigation & Legal stacked) */}
          <div className="lg:col-span-4 flex flex-col items-center gap-10">
            {/* Navigation */}
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="text-[10px] tracking-widest uppercase text-[#1c1917]/50 font-bold font-mono text-center">
                NAVIVGATION
              </span>
              <div className="flex flex-col items-center gap-2.5 w-full">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label}
                    href={link.href}
                    className="inline-flex border border-[#1c1917] rounded-full px-5 py-2 text-xs md:text-sm font-semibold hover:bg-[#1c1917] hover:text-[#ffa8f2] transition-all duration-300 text-center justify-center min-w-[110px]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="text-[10px] tracking-widest uppercase text-[#1c1917]/50 font-bold font-mono text-center">
                LEGAL
              </span>
              <div className="flex flex-col items-center gap-2.5 w-full">
                {legalLinks.map((link) => (
                  <Link 
                    key={link.label}
                    href={link.href}
                    className="inline-flex border border-[#1c1917] rounded-full px-5 py-2 text-xs md:text-sm font-semibold hover:bg-[#1c1917] hover:text-[#ffa8f2] transition-all duration-300 text-center justify-center min-w-[145px]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social Column (Follow Us) */}
          <div className="lg:col-span-3 flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase text-[#1c1917]/50 font-bold font-mono">
                FOLLOW US
              </span>
              <div className="flex gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener"
                  className="w-10 h-10 rounded-full bg-[#1c1917] text-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener"
                  className="w-10 h-10 rounded-full bg-[#1c1917] text-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  aria-label="X (Twitter)"
                >
                  <XIcon />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener"
                  className="w-10 h-10 rounded-full bg-[#1c1917] text-white flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section (Logo & Newsletter side-by-side) */}
        <div className="flex flex-col gap-12 mt-16 w-full">
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 w-full">
            
            {/* Logo Image */}
            <div className="w-full lg:w-[60%] select-none max-w-[640px]">
              <Link href="/">
                <img 
                  src="https://framerusercontent.com/images/osXTQmLx6RntsX7CfW3A94lUHo.png" 
                  alt="Shinta Logo" 
                  className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
            </div>

            {/* White Newsletter Card */}
            <div className="w-full max-w-[360px] bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col gap-6 relative z-20">
              <div className="flex flex-col gap-2.5">
                <h3 
                  className="text-2xl font-bold tracking-tight text-[#1c1917]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Newsletter
                </h3>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                  Sign up for our newsletter to stay up to date with the latest motion design & studio news
                </p>
              </div>

              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 p-4 rounded-2xl text-emerald-700 text-xs font-semibold">
                  <CheckIcon />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 rounded-full border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#1c1917] text-xs font-medium bg-stone-50/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#1c1917] text-white text-xs font-bold hover:bg-[#1c1917]/90 active:scale-[0.98] transition-all duration-200"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Copyright details and designer credits */}
          <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-semibold text-[#1c1917]/60 pt-6 border-t border-[#1c1917]/10 pb-4 w-full">
            <p>© 2026 Shinta. All Rights Reserved.</p>
            <div className="flex items-center gap-1.5 font-bold hover:text-[#1c1917] transition-colors">
              <span className="text-[#1c1917]/50 font-semibold">Made by</span>
              <a 
                href="https://veloxthemes.com" 
                target="_blank" 
                rel="noopener"
                className="tracking-wide text-[#1c1917] border-b border-[#1c1917]/20 hover:border-[#1c1917] transition-all"
              >
                Velox Themes
              </a>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1c1917]/50">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
