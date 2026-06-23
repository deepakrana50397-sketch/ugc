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
      className="relative w-full lg:h-screen min-h-screen bg-[#ffa8f2] text-[#1c1917] flex flex-col justify-between overflow-hidden z-0 lg:sticky lg:bottom-0 lg:z-0 -mt-12"
      style={{
        padding: '40px',
        width: '101%',
        left: '-0.5%',
      }}
    >
      {/* Growing SVG Winding Line background overlay */}
      <svg
        className="absolute right-[-10%] md:right-[-5%] top-[-25%] w-[600px] h-[600px] md:w-[850px] md:h-[850px] lg:w-[1050px] lg:h-[1050px] pointer-events-none z-0 overflow-visible"
        role="presentation"
        viewBox="0 0 1170 1170"
        style={{
          transform: 'translate(10%, 5%)',
        }}
      >
        <motion.path
          d="M 1012 0 C 1012 0 685.114 76.915 628.183 300.778 C 592.343 441.706 652.378 586.306 761.118 561.104 C 831.495 544.792 841.921 423.437 796.958 340.577 C 733.921 224.409 506.014 255.052 431.387 459.974 C 299.755 821.429 481.563 1014.553 0 1147"
          fill="transparent"
          stroke="var(--token-36691d6b-fd51-40c3-90d4-8c2b90652b0a, rgb(170, 148, 255))"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">

          {/* Left Column (Brand title, Contact, Socials) */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-left">
            <div>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#1c1917]"
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
                  href="mailto:contact@iGigster.com"
                  className="text-2xl font-extrabold hover:opacity-80 transition-opacity tracking-tight"
                >
                  contact@iGigster.com
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
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

          {/* Right Column: 6 Columns Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-8 text-left">
            {[
              {
                title: 'FOR BRANDS',
                links: [
                  { label: 'Post Campaign', href: '/contact' },
                  { label: 'Browse Creators', href: '/creators' },
                  { label: 'Managed Services', href: '/contact' },
                  { label: 'Pricing Plans', href: '/pricing' }
                ]
              },
              {
                title: 'FOR TALENT',
                links: [
                  { label: 'Become Talent', href: '/register?role=creator' },
                  { label: 'Find Gigs', href: '/gigs' },
                  { label: 'Creator Toolkit', href: '/' },
                  { label: 'Earning Calculator', href: '/' }
                ]
              },
              {
                title: 'FOR AGENCIES',
                links: [
                  { label: 'Agency Register', href: '/register' },
                  { label: 'Bulk Campaigns', href: '/contact' },
                  { label: 'Partner Program', href: '/' },
                  { label: 'Brand Connect', href: '/contact' }
                ]
              },
              {
                title: 'COMPANY',
                links: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact Support', href: '/contact' },
                  { label: 'Careers', href: '/about#careers' },
                  { label: 'Press Kit', href: '/' }
                ]
              },
              {
                title: 'RESOURCES',
                links: [
                  { label: 'UGC Blog', href: '/blog' },
                  { label: 'Help Center', href: '/how-it-works' },
                  { label: 'FAQs', href: '/how-it-works#faq' },
                  { label: 'Creator Guides', href: '/' }
                ]
              },
              {
                title: 'LEGAL',
                links: [
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Refund Policy', href: '#' },
                  { label: 'Cookie Policy', href: '#' }
                ]
              }
            ].map((section) => (
              <div key={section.title} className="flex flex-col items-start gap-4">
                <span className="text-[11px] tracking-widest uppercase text-[#1c1917]/60 font-bold font-mono">
                  {section.title}
                </span>
                <div className="flex flex-col items-start gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[#1c1917] text-[14px] font-bold relative group py-0.5"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1c1917] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Section (Logo & Newsletter side-by-side) */}
        <div className="flex flex-col gap-12 mt-16 w-full">

          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 w-full">

            {/* Logo Image */}
            <div className="w-full lg:w-[65%] select-none max-w-[640px] z-10">
              <Link href="/" className="block w-full">
                <div className="flex items-center gap-[4%] select-none hover:scale-[1.01] transition-transform duration-300 w-full">
                  <svg
                    viewBox="0 0 38 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[24%] max-w-[160px] min-w-[60px] h-auto flex-shrink-0"
                  >
                    <rect width="38" height="26" rx="13" fill="url(#igigster-footer-logo-grad)" />
                    <path
                      d="M13 17.5C13.5 15.5 15.5 14.5 18 14.5C20.5 14.5 23 13.5 23 11C23 8.5 20 8 18 8C15 8 13.5 9.5 13 11.5M23 8.5C22.5 10.5 20.5 11.5 18 11.5C15.5 11.5 13 12.5 13 15C13 17.5 16 18 18 18C21 18 22.5 16.5 23 14.5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="igigster-footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#db2777" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span
                    className="text-[#1c1917] font-black leading-none tracking-tighter"
                    style={{
                      fontSize: 'clamp(44px, 8vw, 120px)',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    iGigster.
                  </span>
                </div>
              </Link>
            </div>

            {/* Newsletter Card */}
            <div
              style={{
                width: '100%',
                maxWidth: '360px',
                backgroundColor: '#f5f5f4', // Warm off-white/light grey matching mockup
                borderRadius: '32px',
                padding: '32px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                zIndex: 20,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3
                  className="text-2xl font-bold tracking-tight text-[#1c1917]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#1c1917',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  Newsletter
                </h3>
                <p style={{ color: '#78716c', fontSize: '13.5px', lineHeight: 1.5 }}>
                  Sign up for our newsletter to stay up to date with the latest motion design & studio news
                </p>
              </div>

              {subscribed ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  padding: '16px',
                  borderRadius: '16px',
                  color: '#047857',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  <CheckIcon />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '20px',
                      border: '1px solid rgba(0, 0, 0, 0.04)',
                      backgroundColor: '#ffffff', // Pure white background
                      color: '#1c1917',
                      fontSize: '14px',
                      fontWeight: 500,
                      outline: 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    }}
                    className="placeholder-stone-400 focus:border-stone-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '9999px',
                      backgroundColor: '#1c1917', // Black background
                      color: '#ffffff',
                      fontSize: '14.5px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="hover:bg-black/95 active:scale-[0.98]"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Copyright details and designer credits */}
          <div
            style={{
              paddingTop: '24px',
              paddingBottom: '8px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Small mini logo icon */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#1c1917',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffa8f2',
                  fontSize: '11px',
                  fontWeight: 900,
                }}
              >
                iG
              </div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(28, 25, 22, 0.6)', margin: 0 }}>
                © 2026 iGigster. All Rights Reserved.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'rgba(28, 25, 22, 0.6)' }}>
              <span>Made by</span>
              <a
                href="https://x10cify.com"
                target="_blank"
                rel="noopener"
                style={{
                  color: '#1c1917',
                  borderBottom: '1px solid rgba(28, 25, 22, 0.2)',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
                className="hover:border-black group"
              >
                <span>x10cify.</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transition: 'transform 0.2s' }}
                  className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                >
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
