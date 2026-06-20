'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GlowCard from '@/components/animation/GlowCard';

export default function GrowContent() {
  return (
    <section
      id="grow-content"
      style={{
        padding: '0 20px 120px 20px', // Spacing above the footer, seamless background
        backgroundColor: '#fafaf9',
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: '48px',
        borderBottomRightRadius: '48px',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Split Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          style={{
            display: 'grid',
            gap: '32px',
          }}
        >
          {/* Left Dark Card */}
          <div style={{ height: '100%' }}>
            <GlowCard
              glowColor="rgba(255, 255, 255, 0.04)"
              style={{
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '40px',
                height: '100%',
                borderRadius: '32px',
                backgroundColor: '#1c1917', // Dark charcoal/black background
                border: '1px solid rgba(255, 255, 255, 0.04)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                textAlign: 'left',
              }}
              tiltActive={true}
            >
              {/* Top swirly pink loop path */}
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <svg
                  viewBox="0 0 200 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '180px', height: 'auto' }}
                >
                  <path
                    d="M 0,55 C 50,55 60,20 75,20 C 95,20 90,60 70,60 C 50,60 120,25 150,25 C 180,25 190,10 200,10"
                    stroke="#ffa8f2"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2
                  style={{
                    fontSize: 'clamp(36px, 4.5vw, 52px)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Don’t want to<br />manage creators?
                </h2>
                <p
                  style={{
                    color: '#a8a29e', // Muted stone color
                    fontSize: '16.5px',
                    lineHeight: 1.6,
                    maxWidth: '440px',
                    margin: 0,
                  }}
                >
                  Tell us your goal. We build and manage the team.
                </p>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                <Link
                  href="/contact"
                  style={{
                    padding: '16px 36px',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '14.5px',
                    backgroundColor: '#ffffff', // White pill button
                    color: '#1c1917',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    textAlign: 'center',
                  }}
                  className="hover:bg-stone-100"
                >
                  Hire iGigster
                </Link>
                <Link
                  href="/contact"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#ffa8f2', // Pink arrow button
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#1c1917',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="hover:scale-105"
                >
                  <ArrowUpRight size={22} style={{ strokeWidth: 2.5 }} />
                </Link>
              </div>
            </GlowCard>
          </div>

          {/* Right Image Card */}
          <div
            style={{
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.04)',
              minHeight: '380px',
              height: '100%',
            }}
          >
            <img
              src="https://framerusercontent.com/images/Ng72SfQHklNByTeJTtQUtBwT8.png?width=1152&height=896"
              alt="Grow thorough content"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
