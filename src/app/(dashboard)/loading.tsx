'use client';

import React, { useEffect, useState } from 'react';

export default function DashboardLoading() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isLight = document.body.classList.contains('light-theme');
      setTheme(isLight ? 'light' : 'dark');
    }
  }, []);

  const isLight = theme === 'light';

  // Theme-specific colors matching the dashboard design system
  const bg = isLight ? '#F8F8FA' : '#09090B';
  const cardBg = isLight ? '#FFFFFF' : '#131316';
  const borderColor = isLight ? '#E5E7EB' : 'rgba(255,255,255,0.08)';
  const skeletonColor = isLight ? '#E5E7EB' : '#27272A';
  const skeletonPulse = isLight ? 'pulse-light' : 'pulse-dark';

  return (
    <div style={{
      backgroundColor: bg,
      color: isLight ? '#09090B' : '#FFFFFF',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      fontFamily: 'var(--font-sans)',
      transition: 'background-color 0.3s'
    }}>
      
      {/* 1. Left Sidebar Skeleton */}
      <aside style={{
        width: '224px',
        minWidth: '224px',
        height: '100%',
        backgroundColor: isLight ? '#FFFFFF' : '#0F0F11',
        borderRight: `1px solid ${borderColor}`,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        boxSizing: 'border-box'
      }}>
        {/* Logo slot */}
        <div className={skeletonPulse} style={{
          height: '24px',
          width: '100px',
          borderRadius: '6px',
          backgroundColor: skeletonColor
        }} />

        {/* Action Button slot */}
        <div className={skeletonPulse} style={{
          height: '38px',
          width: '100%',
          borderRadius: '10px',
          backgroundColor: skeletonColor
        }} />

        {/* Sidebar Nav Items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={skeletonPulse} style={{
                height: '16px',
                width: '16px',
                borderRadius: '4px',
                backgroundColor: skeletonColor
              }} />
              <div className={skeletonPulse} style={{
                height: '12px',
                width: i % 2 === 0 ? '80px' : '100px',
                borderRadius: '4px',
                backgroundColor: skeletonColor,
                flex: 1
              }} />
            </div>
          ))}
        </div>

        {/* Sidebar Footer slot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className={skeletonPulse} style={{
            height: '12px',
            width: '80px',
            borderRadius: '4px',
            backgroundColor: skeletonColor
          }} />
          <div className={skeletonPulse} style={{
            height: '32px',
            width: '100%',
            borderRadius: '8px',
            backgroundColor: skeletonColor
          }} />
        </div>
      </aside>

      {/* 2. Main content area skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        {/* Top Header Skeleton */}
        <header style={{
          height: '72px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}>
          {/* Left search bar placeholder */}
          <div className={skeletonPulse} style={{
            height: '42px',
            width: '280px',
            borderRadius: '999px',
            backgroundColor: skeletonColor
          }} />

          {/* Right action slots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className={skeletonPulse} style={{
              height: '38px',
              width: '38px',
              borderRadius: '10px',
              backgroundColor: skeletonColor
            }} />
            <div className={skeletonPulse} style={{
              height: '38px',
              width: '38px',
              borderRadius: '10px',
              backgroundColor: skeletonColor
            }} />
            <div className={skeletonPulse} style={{
              height: '38px',
              width: '38px',
              borderRadius: '50%',
              backgroundColor: skeletonColor
            }} />
          </div>
        </header>

        {/* Page Content Skeleton Area */}
        <main style={{ padding: '24px', flex: 1, overflowY: 'auto', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title / Greeting row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className={skeletonPulse} style={{
                height: '28px',
                width: '320px',
                borderRadius: '8px',
                backgroundColor: skeletonColor
              }} />
              <div className={skeletonPulse} style={{
                height: '14px',
                width: '180px',
                borderRadius: '4px',
                backgroundColor: skeletonColor
              }} />
            </div>

            {/* Quick Actions Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className={skeletonPulse} style={{
                  height: '135px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '20px'
                }} />
              ))}
            </div>

            {/* Main grid skeletons */}
            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '24px', alignItems: 'start' }}>
              {/* Left Column blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className={skeletonPulse} style={{
                  height: '140px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px'
                }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className={skeletonPulse} style={{
                    height: '320px',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '24px'
                  }} />
                  <div className={skeletonPulse} style={{
                    height: '320px',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '24px'
                  }} />
                </div>
              </div>

              {/* Right Column blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className={skeletonPulse} style={{
                  height: '280px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px'
                }} />
                <div className={skeletonPulse} style={{
                  height: '200px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px'
                }} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes pulse-light-kf {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.95; }
        }
        @keyframes pulse-dark-kf {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.55; }
        }
        .pulse-light {
          animation: pulse-light-kf 1.5s ease-in-out infinite;
        }
        .pulse-dark {
          animation: pulse-dark-kf 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
