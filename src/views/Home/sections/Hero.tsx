import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDownRight, Compass, Heart, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stories = [
    'https://framerusercontent.com/assets/9BKR8n5yij6np4F4fhXpbwixLWI.mp4',
    'https://framerusercontent.com/assets/0oniLdlZhN2RUR1zCzsqMbMHfQ8.mp4',
    'https://framerusercontent.com/assets/TR9SXrUqMBTLyfoDFBPUh4qvHfE.mp4',
  ];

  const storyDetails = [
    { name: 'jessicasu', role: 'College Creator', match: '98%', time: '6h', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { name: 'marcus.tech', role: 'Tech Influencer', match: '95%', time: '2h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'elena.style', role: 'Fashion / Housewife', match: '92%', time: '1d', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log('Autoplay play promise failed/interrupted:', err);
      });
    }
  }, [currentStoryIndex]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percentage = videoRef.current.duration
        ? (videoRef.current.currentTime / videoRef.current.duration) * 100
        : 0;
      setProgress(percentage);
    }
  };

  const handleVideoEnded = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0);
    }
    setProgress(0);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(0);
    }
    setProgress(0);
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    } else {
      setCurrentStoryIndex(stories.length - 1);
    }
    setProgress(0);
  };

  const brands = [
    'Gymshark',
    'Glossier',
    'Liquid Death',
    'Hims & Hers',
    'Olipop',
    'Hexclad',
    'Caraway',
    'True Classic',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-brand-bg"
    >
      {/* Decorative Grid Overlay / Lines (Bespoke organic grid) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[1px] h-full border-l border-dashed border-brand-border/60" />
        <div className="absolute top-0 left-2/3 w-[1px] h-full border-l border-dashed border-brand-border/60" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] border-t border-dashed border-brand-border/60" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center z-10 flex-grow py-8 relative">
        
        {/* Left Column: Headings & Copy */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left pr-4">
          
          {/* Social Tag / Badge (Viral Style) */}
          <div className="inline-flex items-center space-x-2 bg-brand-card border border-brand-border/80 px-4 py-2 rounded-full w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-brand-text">
              [ DIRECT UGC MATCHMAKING ]
            </span>
          </div>

          {/* Heading with organic underlines & accents */}
          <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] text-brand-text leading-[0.95] tracking-tight relative">
            High-converting UGC, <br />
            done{' '}
            <span className="relative inline-block px-1">
              <span className="relative z-10 font-serif italic font-normal text-brand-dark-green">
                directly.
              </span>
              {/* Hand-drawn underline SVG */}
              <svg
                className="absolute bottom-[-6px] left-0 w-full h-4 text-brand-terracotta z-0"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0,7 C30,10 70,4 100,6 C75,8 25,9 0,7"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <div className="relative max-w-xl">
            <p className="text-base md:text-lg text-brand-muted font-sans leading-relaxed">
              We connect brands directly with vetted college students, housewives, and micro-influencers. 
              No agency markups. Complete scripting, positioning, and mobile-native editing included.
            </p>
            {/* Tiny organic hand-drawn heart element */}
            <div className="absolute right-[-40px] top-0 hidden md:block text-brand-terracotta rotate-12">
              <Heart className="w-5 h-5 fill-brand-terracotta/10" />
            </div>
          </div>

          {/* Value props bullets (Editorial Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start space-x-3">
              <span className="font-mono text-xs text-brand-terracotta font-bold mt-1">[01]</span>
              <div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-brand-text">Zero Agency Retainers</h4>
                <p className="text-xs text-brand-muted">Pay creators directly at their exact rate.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-mono text-xs text-brand-terracotta font-bold mt-1">[02]</span>
              <div>
                <h4 className="font-sans font-black text-[12px] uppercase tracking-wider text-brand-text">Vetted in-house quality</h4>
                <p className="text-xs text-brand-muted">Only the top 8% of video content applicants matched.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/creators"
              className="group px-8 py-4.5 rounded-full bg-brand-terracotta hover:bg-brand-dark-green text-white font-sans font-bold text-[12px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-2"
            >
              <span>Apply as Creator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/brands"
              className="px-8 py-4.5 rounded-full bg-brand-dark-green hover:bg-brand-dark-green/90 text-white font-sans font-bold text-[12px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-2"
            >
              <span>Hire Creators & Post Gigs</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Tactile Overlapping Cards */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative pt-12 lg:pt-0">
          
          {/* Card 1: The Dark Green Backing Card (Overlapping layout) */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, x: -10 }}
            animate={{ opacity: 1, rotate: -4, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="absolute -rotate-4 translate-x-[-12px] translate-y-[8px] w-[310px] sm:w-[330px] aspect-[9/16] bg-brand-dark-green rounded-[40px] p-8 flex flex-col justify-between text-white border border-brand-moss/40 shadow-xl z-0"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] tracking-widest text-brand-border/60 uppercase">[ MATCH ENGINE ]</span>
              <Sparkles className="w-4.5 h-4.5 text-brand-terracotta" />
            </div>

            <div className="space-y-4 text-left">
              <div className="inline-block px-2.5 py-1 bg-brand-moss rounded-md border border-brand-border/10 font-mono text-[8px] tracking-wider uppercase">
                CRITERIA: COLLEGE STUDENT
              </div>
              <h3 className="font-serif text-3xl font-medium leading-tight">
                Authentic voices, <br />
                no actor vibes.
              </h3>
              <p className="text-xs text-brand-bg/85 leading-relaxed font-sans">
                Our database filters by life stage. Get real UGC videos from college dorms, busy kitchen counters, and native daily vlogs.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-brand-border/10">
              <span className="font-mono text-[9px] text-[#ded6ca]/70">IGIGSTER.COM</span>
              <span className="text-[10px] font-bold text-brand-terracotta flex items-center space-x-1">
                <span>Vetted catalog</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Card 2: Interactive Polaroid Video Card (Front Overlapping Card) */}
          <motion.div
            initial={{ opacity: 0, rotate: 3, y: 15 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative w-[310px] sm:w-[330px] aspect-[9/16] bg-white border border-brand-border rounded-[40px] shadow-2xl overflow-hidden flex-shrink-0 cursor-pointer z-10 group"
          >
            {/* Washi Tape (Decorative Accent) */}
            <div className="washi-tape washi-tape-top-left" />

            {/* Stories progress indicators */}
            <div className="absolute top-5 left-5 right-5 flex space-x-1.5 z-20 pointer-events-none">
              {stories.map((_, index) => (
                <div key={index} className="h-0.75 flex-1 bg-white/30 rounded-full overflow-hidden relative">
                  {index < currentStoryIndex && (
                    <div className="absolute inset-0 bg-white" />
                  )}
                  {index === currentStoryIndex && (
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Creator details header */}
            <div className="absolute top-9.5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none text-left">
              <div className="flex items-center space-x-2.5">
                <img
                  src={storyDetails[currentStoryIndex].avatar}
                  className="w-7 h-7 rounded-full border border-white/80 object-cover shadow-sm"
                  alt="creator avatar"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-white text-[11px] font-bold tracking-tight">
                      {storyDetails[currentStoryIndex].name}
                    </span>
                    <span className="bg-brand-terracotta text-white font-mono text-[7px] font-bold px-1 py-0.25 rounded">
                      {storyDetails[currentStoryIndex].match} MATCH
                    </span>
                  </div>
                  <span className="text-white/80 text-[9px] font-sans block leading-none mt-0.5">
                    {storyDetails[currentStoryIndex].role}
                  </span>
                </div>
              </div>
              <span className="text-white/70 text-[10px] font-mono">{storyDetails[currentStoryIndex].time}</span>
            </div>

            {/* Story video */}
            <video
              ref={videoRef}
              src={stories[currentStoryIndex]}
              className="w-full h-full object-cover bg-neutral-950"
              autoPlay
              muted
              loop={false}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
            />

            {/* Dark gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

            {/* Hover overlay navigation helpers */}
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-between opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity duration-300">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevStory();
                }}
                className="w-[30%] h-full flex items-center justify-start pl-3 cursor-pointer pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-brand-text">
                  ‹
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextStory();
                }}
                className="w-[30%] h-full flex items-center justify-end pr-3 cursor-pointer pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-brand-text">
                  ›
                </div>
              </div>
            </div>

            {/* Interactive check badge */}
            <div className="absolute right-5 bottom-5 z-20 pointer-events-none">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-brand-border">
                <Compass className="w-5 h-5 text-brand-terracotta" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand logo Marquee with Physical Paper Tape strip background */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-brand-border/60 z-10 mt-auto relative">
        
        {/* Paper Tape Ticker Label */}
        <p className="text-center font-mono text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-6">
          [ BRAND ENGAGEMENT LOGS ]
        </p>

        {/* Marquee ticker style */}
        <div className="marquee-container relative w-full overflow-hidden py-4 border-y border-brand-border bg-brand-card rounded-md shadow-xs">
          <div className="marquee-content flex space-x-20 select-none">
            {brands.concat(brands).map((brand, idx) => (
              <span
                key={idx}
                className="text-xl md:text-2xl font-serif font-medium text-brand-muted/40 hover:text-brand-terracotta/70 transition-colors duration-300 cursor-default tracking-tight flex items-center space-x-2"
              >
                <span>{brand}</span>
                <span className="text-[10px] text-brand-border">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
