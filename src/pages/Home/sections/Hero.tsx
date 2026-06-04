import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stories = [
    'https://framerusercontent.com/assets/9BKR8n5yij6np4F4fhXpbwixLWI.mp4',
    'https://framerusercontent.com/assets/0oniLdlZhN2RUR1zCzsqMbMHfQ8.mp4',
    'https://framerusercontent.com/assets/TR9SXrUqMBTLyfoDFBPUh4qvHfE.mp4',
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log('Autoplay play promise failed/interrupted:', err);
      });
    }
  }, [currentStoryIndex]);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in text elements
      gsap.from('.hero-fade-in', {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Float visuals column
      gsap.from(visualsRef.current, {
        opacity: 0,
        x: 40,
        y: 20,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Float micro badges
      gsap.from('.hero-badge', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.6,
        ease: 'back.out(1.4)',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.35) {
      // Prev story
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex((prev) => prev - 1);
      } else {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
        setProgress(0);
      }
    } else {
      // Next story
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1);
      } else {
        setCurrentStoryIndex(0);
      }
      setProgress(0);
    }
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
      ref={containerRef}
      id="hero"
      className="relative min-h-screen pt-36 pb-24 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-brand-bg border-b border-brand-border"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 flex-grow py-8">
        {/* Left Column: Headings & Copy */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col space-y-7 text-left pr-4">
          {/* Social Icons Badge (Viral Style) */}
          <div className="hero-fade-in inline-flex items-center space-x-3 bg-black/[0.04] px-4 py-2.5 rounded-[7px] w-fit shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text">
              Direct-Matching UGC Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-fade-in font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[70px] text-brand-text leading-[1.0] tracking-tight">
            High-converting UGC, <br />
            done <span className="font-serif italic font-normal text-brand-text">directly.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-fade-in text-base md:text-[18px] text-[#605856] max-w-xl font-sans leading-relaxed">
            Part-time UGC gigs for college students, housewives, and influencers. Custom conversion scripting, positioning, and editing services for high-growth brands.
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade-in pt-1 flex flex-wrap gap-4">
            <Link
              to="/creators"
              className="px-8.5 py-4 rounded-full bg-brand-terracotta hover:bg-brand-terracotta-light text-white font-sans font-bold text-[13px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              Apply as Creator
            </Link>
            <Link
              to="/brands"
              className="px-8.5 py-4 rounded-full bg-black hover:bg-black/85 text-white font-sans font-bold text-[13px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              Hire Creators & Post Gigs
            </Link>
          </div>
        </div>

        {/* Right Column: Single Portrait Card representing user story */}
        <div ref={visualsRef} className="lg:col-span-5 flex justify-center lg:justify-end relative pt-6 lg:pt-0">
          <div
            onClick={handleCardClick}
            className="relative w-[320px] sm:w-[340px] aspect-[9/16] border-[12px] border-white rounded-[40px] shadow-2xl bg-black overflow-hidden flex-shrink-0 cursor-pointer select-none group"
          >
            {/* Story video */}
            <video
              ref={videoRef}
              src={stories[currentStoryIndex]}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop={false}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
            />

            {/* Dark gradient overlay at top */}
            <div className="absolute top-0 left-0 w-full h-22 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

            {/* Story progress indicators */}
            <div className="absolute top-5 left-4.5 right-4.5 flex space-x-1.5 z-20 pointer-events-none">
              {stories.map((_, index) => (
                <div key={index} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden relative">
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

            {/* User details header */}
            <div className="absolute top-8.5 left-4.5 right-4.5 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                  className="w-5 h-5 rounded-full border border-white/50 object-cover"
                  alt="Jessica avatar"
                />
                <span className="text-white text-[12px] font-semibold tracking-tight">jessicasu</span>
                <span className="text-white/70 text-[12px]">6h</span>
              </div>
            </div>

            {/* Hover overlay navigation helpers */}
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-between opacity-0 group-hover:opacity-100 bg-black/15 transition-opacity duration-300">
              <div className="w-[35%] h-full flex items-center justify-start pl-4 cursor-pointer pointer-events-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 opacity-75">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </div>
              <div className="w-[35%] h-full flex items-center justify-end pr-4 cursor-pointer pointer-events-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 opacity-75">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* Interactive black dot on cheek (Visual accent) */}
            <div className="absolute left-[44%] top-[58%] z-20 cursor-pointer pointer-events-none">
              <div className="w-3.5 h-3.5 bg-black rounded-full shadow-md"></div>
            </div>

            {/* Asterisk/Flower bottom badge overlapping bottom border */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-15 h-15 bg-black rounded-[18px] flex items-center justify-center shadow-lg border-[3.5px] border-[#f5f2eb]">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" className="w-6 h-6 animate-spin-slow">
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
                  <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand logo Marquee */}
      <div className="max-w-7xl mx-auto w-full pt-16 border-t border-brand-border z-10 mt-auto">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-8">
          UGC produced for scaling brands
        </p>
        <div className="marquee-container relative w-full overflow-hidden py-3">
          <div className="marquee-content flex space-x-20 select-none">
            {brands.concat(brands).map((brand, idx) => (
              <span
                key={idx}
                className="text-2xl md:text-3xl font-serif font-medium text-brand-muted/30 hover:text-brand-terracotta/60 transition-colors duration-300 cursor-default tracking-tight"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
