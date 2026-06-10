
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Compass } from 'lucide-react';

const PinkAsterisk = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="#ec4899" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

interface CardItem {
  id: number;
  videoUrl: string;
  poster: string;
  bgColor: string;
  name: string;
  role: string;
  match: string;
  time: string;
  avatar: string;
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const cardsData: CardItem[] = [
    {
      id: 0,
      videoUrl: 'https://framerusercontent.com/assets/ifg3JJylN40L3Ktt7fc7uhNA.mp4',
      poster: '/ugc_creator_hero.png',
      bgColor: '#db2777',
      name: 'marcus.tech',
      role: 'Tech Influencer',
      match: '95%',
      time: '2h',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 1,
      videoUrl: 'https://framerusercontent.com/assets/0xZ363kYUXAzmMvtmoGEUWzbm40.mp4',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=900&fit=crop',
      bgColor: '#4c1d95',
      name: 'jessicasu',
      role: 'College Creator',
      match: '98%',
      time: '6h',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      videoUrl: 'https://framerusercontent.com/assets/W2Rujgt14CX4MJRHRhuoYaS4YQc.mp4',
      poster: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=900&fit=crop',
      bgColor: '#2e1065',
      name: 'elena.style',
      role: 'Fashion / Housewife',
      match: '92%',
      time: '1d',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    }
  ];

  const handleNextCard = () => {
    setIsPlaying(false);
    setVideoProgress(0);
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
  };

  const handlePrevCard = () => {
    setIsPlaying(false);
    setVideoProgress(0);
    setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play().catch(err => console.log('Autoplay error:', err));
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      setVideoProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    handleNextCard();
  };

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, videoEl]) => {
      const idx = parseInt(key, 10);
      if (videoEl) {
        if (idx === activeIndex && isPlaying) {
          videoEl.play().catch(err => {
            console.log('Error playing video:', err);
          });
        } else {
          videoEl.pause();
        }
      }
    });
  }, [activeIndex, isPlaying]);

  const services = [
    'SHORT FORM CONTENT',
    'SOCIAL MEDIA MANAGEMENT',
    'INFLUENCER MARKETING'
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: '120px 24px 80px 24px',
        backgroundColor: '#fafaf9',
        overflow: 'hidden',
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Curved Marquee Text Ribbon (Behind the cards) */}
      <div
        style={{
          position: 'absolute',
          left: '-5%',
          right: '-5%',
          width: '110%',
          height: '400px',
          top: '25%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        className="hidden md:block"
      >
        <svg width="100%" height="100%" viewBox="-7.1991 -28.74635 1564.4991 405.47935" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <path id="textPath" d="M12.8009 194.615C12.8009 194.615 111.532 356.733 371.301 334.115C705.301 305.035 906.801 -8.74635 1201.3 16.4344C1405.06 33.8564 1537.3 189.615 1537.3 189.615"></path>
          </defs>
          <path d="M12.8009 194.615C12.8009 194.615 111.532 356.733 371.301 334.115C705.301 305.035 906.801 -8.74635 1201.3 16.4344C1405.06 33.8564 1537.3 189.615 1537.3 189.615" fill="none" stroke="rgb(255, 168, 242)" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round"></path>
          <text className="curved-marquee-text">
            <motion.textPath
              href="#textPath"
              startOffset="0%"
              animate={{ startOffset: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'linear',
              }}
            >
              SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •  SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •  SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •  SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •  SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •  SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING •
            </motion.textPath>
          </text>
        </svg>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-stretch items-center"
        >
          {/* Left Column: Heading & Services */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-start gap-8 text-left lg:pt-16">
            <h1
              style={{
                fontSize: 'clamp(44px, 4.8vw, 60px)',
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#1c1917',
                fontFamily: 'var(--font-display)',
              }}
            >
              UGC that<br />
              grows your<br />
              brand.
            </h1>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {services.map((service) => (
                <li
                  key={service}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#44403c',
                    letterSpacing: '0.05em',
                  }}
                >
                  <PinkAsterisk />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: 3D Stacked Creator Video Cards */}
          <div className="col-span-1 lg:col-span-4 flex justify-center items-center relative py-12 lg:py-0">
            <div
              className="card-stack-container"
              style={{
                position: 'relative',
                width: 'clamp(300px, 90vw, 360px)',
                height: 'clamp(533px, 160vw, 640px)',
                cursor: isHovered && !isPlaying ? 'none' : 'default',
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence initial={false}>
                {cardsData.map((card, idx) => {
                  const position = (idx - activeIndex + cardsData.length) % cardsData.length;
                  const isFront = position === 0;

                  return (
                    <motion.div
                      key={card.id}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: card.bgColor,
                        borderRadius: '28px',
                        overflow: 'hidden',
                        boxShadow: isFront
                          ? '0 30px 60px -15px rgba(0,0,0,0.22)'
                          : '0 15px 30px -10px rgba(0,0,0,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformOrigin: 'bottom center',
                      }}
                      animate={{
                        x: position === 0 ? 0 : position === 1 ? -22 : -44,
                        y: position === 0 ? 0 : position === 1 ? -8 : -16,
                        rotate: position === 0 ? 1 : position === 1 ? -4 : -8,
                        scale: position === 0 ? 1 : position === 1 ? 0.96 : 0.92,
                        zIndex: position === 0 ? 30 : position === 1 ? 20 : 10,
                        opacity: position === 0 ? 1 : position === 1 ? 0.95 : 0.9,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 28,
                      }}
                      drag={isFront ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.65}
                      onDragEnd={(event, info) => {
                        const threshold = 100;
                        if (info.offset.x > threshold) {
                          handlePrevCard();
                        } else if (info.offset.x < -threshold) {
                          handleNextCard();
                        }
                      }}
                    >
                      {/* Video Player */}
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={card.videoUrl}
                        loop
                        playsInline
                        preload="auto"
                        muted={!isFront || !isPlaying}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          pointerEvents: isFront ? 'auto' : 'none',
                        }}
                        onTimeUpdate={isFront ? handleTimeUpdate : undefined}
                        onEnded={isFront ? handleVideoEnded : undefined}
                        onClick={isFront ? togglePlay : undefined}
                      />

                      {/* --- ORIGINAL CARD LOOK OVERLAYS --- */}

                      {/* Gradients */}
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '96px', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '96px', backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />

                      {/* Creator Details Header */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '24px',
                          left: '20px',
                          right: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          zIndex: 20,
                          pointerEvents: 'none',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={card.avatar}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.8)', objectFit: 'cover' }}
                            alt="avatar"
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold' }}>
                                {card.name}
                              </span>
                              <span style={{ backgroundColor: 'rgb(219, 39, 119)', color: '#ffffff', fontSize: '7px', fontWeight: 'bold', padding: '1px 4px', borderRadius: '4px' }}>
                                {card.match} MATCH
                              </span>
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9px', display: 'block', marginTop: '2px' }}>
                              {card.role}
                            </span>
                          </div>
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontFamily: 'monospace' }}>{card.time}</span>
                      </div>

                      {/* Centered Play Button (Visible on front card when not playing) */}
                      {isFront && !isPlaying && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 15,
                            pointerEvents: 'none',
                          }}
                        >
                          <div
                            className="animate-play-pulse"
                            style={{
                              width: '72px',
                              height: '72px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(28, 25, 23, 0.82)',
                              backdropFilter: 'blur(4px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffffff',
                              border: '1px solid rgba(255,255,255,0.12)',
                            }}
                          >
                            <Play size={26} fill="#ffffff" style={{ marginLeft: '4px' }} />
                          </div>
                        </div>
                      )}

                      {/* Compass badge overlay bottom right */}
                      <div style={{ position: 'absolute', right: '20px', bottom: '20px', zIndex: 20, pointerEvents: 'none' }}>
                        <div style={{ width: '48px', height: '48px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(28,25,22,0.08)' }}>
                          <Compass size={20} style={{ color: 'rgb(219, 39, 119)' }} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Custom floating Swipe indicator cursor */}
              {isHovered && !isPlaying && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: mousePos.x,
                    top: mousePos.y,
                    x: '-50%',
                    y: '-50%',
                    pointerEvents: 'none',
                    zIndex: 100,
                    backgroundColor: '#0c0a09',
                    color: '#ffffff',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span style={{ fontSize: '13px' }}>←</span>
                  <span style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.02em' }}>Swipe</span>
                  <span style={{ fontSize: '13px' }}>→</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Project Preview Card & Bio/CTA */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-between text-left lg:py-2">
            {/* Top Project Preview Box */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e7e5e4',
                borderRadius: '24px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                position: 'relative',
              }}
            >
              {/* Puffer Image */}
              <img
                src="/puffer_jacket_project.png"
                alt="Puffer project preview"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  backgroundColor: '#f5f5f4'
                }}
              />

              {/* Text content */}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#6366f1',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  NEW PROJECT!
                </span>
                <h3
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#1c1917',
                    lineHeight: '1.3',
                  }}
                >
                  Making Rama unmistakable on...
                </h3>
              </div>

              {/* Top Right Arrow Badge */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#e7e5e4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1c1917',
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                }}
              >
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-8 lg:mt-0 lg:mb-4 ">
              {/* Description Text */}
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: '#44403c',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  maxWidth: '330px',
                }}
              >
                iGigster. helps brands create content that truly connects with their audience, consistently and strategically across social media.
              </p>

              {/* Book a Call Action and Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1c1917',
                    color: '#ffffff',
                    padding: '18px 40px',
                    borderRadius: '9999px',
                    fontSize: '17px',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  className="hover:bg-stone-800"
                >
                  Book a call
                </Link>
                <Link
                  href="/contact"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#ffa5ec',
                    color: '#1c1917',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(255, 165, 236, 0.2)',
                  }}
                  className="hover:scale-105"
                >
                  <ArrowUpRight size={28} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>




    </section>
  );
}

