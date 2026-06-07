import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, X, BarChart3, TrendingUp, Users2, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioItem {
  id: string;
  category: string;
  creator: {
    name: string;
    avatar: string;
    handle: string;
  };
  metrics: {
    hook: string;
    bodyAngle: string;
    ctr: string;
    views: string;
    roi: string;
  };
  demographics: {
    label: string;
    percentage: number;
  }[];
  videoUrl: string;
  title: string;
  rate?: number;
}

export default function VideoPortfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [comparisonState, setComparisonState] = useState<'raw' | 'edited'>('edited');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'ALL CREATIVES' },
    { id: 'beauty', label: 'BEAUTY & SKINCARE' },
    { id: 'fashion', label: 'FASHION & APPAREL' },
    { id: 'tech', label: 'TECH & GADGETS' },
    { id: 'food', label: 'FOOD & BEVERAGE' }
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'v1',
      category: 'beauty',
      creator: {
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        handle: '@sarah.skincare'
      },
      metrics: {
        hook: '3 reasons why your skin is dry...',
        bodyAngle: 'Problem-solution serum texture showing skincare layers.',
        ctr: '+185%',
        views: '450K',
        roi: '3.4x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 65 },
        { label: 'Female 25-34', percentage: 25 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/SCuqi0qyfpukKLtZm0jURfE.mp4',
      title: 'Dry Skin Routine Hook'
    },
    {
      id: 'v2',
      category: 'tech',
      creator: {
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        handle: '@marcus.tech'
      },
      metrics: {
        hook: 'Stop buying cheap charging cables...',
        bodyAngle: 'ASMR unboxing showcasing braided aluminum connectors.',
        ctr: '+142%',
        views: '1.2M',
        roi: '4.8x'
      },
      demographics: [
        { label: 'Male 18-24', percentage: 55 },
        { label: 'Male 25-34', percentage: 30 },
        { label: 'Others', percentage: 15 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/0oniLdlZhN2RUR1zCzsqMbMHfQ8.mp4',
      title: 'ASMR Tech Unboxing'
    },
    {
      id: 'v3',
      category: 'fashion',
      creator: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        handle: '@elena.style'
      },
      metrics: {
        hook: 'TikTok made me buy these summer fits...',
        bodyAngle: 'Transition loops showing 3 outfits with pricing subtitles.',
        ctr: '+94%',
        views: '240K',
        roi: '2.9x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 70 },
        { label: 'Female 25-34', percentage: 20 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/TR9SXrUqMBTLyfoDFBPUh4qvHfE.mp4',
      title: 'Summer Fitting Transitions'
    },
    {
      id: 'v4',
      category: 'food',
      creator: {
        name: 'David Kojo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        handle: '@david.eats'
      },
      metrics: {
        hook: 'The secret ingredient in this protein bowl...',
        bodyAngle: 'Fast cooking cuts focusing on final sauce pour and bite reaction.',
        ctr: '+210%',
        views: '890K',
        roi: '5.2x'
      },
      demographics: [
        { label: 'Female 25-34', percentage: 40 },
        { label: 'Male 18-24', percentage: 35 },
        { label: 'Others', percentage: 25 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4',
      title: 'Protein Bowl Recipe Hook'
    },
    {
      id: 'v5',
      category: 'beauty',
      creator: {
        name: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
        handle: '@maya.glow'
      },
      metrics: {
        hook: 'This oil-free serum is a cheat code...',
        bodyAngle: 'Half-face review application demonstrating glow comparison.',
        ctr: '+120%',
        views: '320K',
        roi: '3.1x'
      },
      demographics: [
        { label: 'Female 18-24', percentage: 60 },
        { label: 'Female 25-34', percentage: 30 },
        { label: 'Others', percentage: 10 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/9BKR8n5yij6np4F4fhXpbwixLWI.mp4',
      title: 'Serum Glow Split Screen'
    },
    {
      id: 'v6',
      category: 'tech',
      creator: {
        name: 'Julian Vance',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
        handle: '@julian.setups'
      },
      metrics: {
        hook: 'I threw away my desk organizers for this...',
        bodyAngle: 'Desk sweep followed by magnetic tray snapping ASMR.',
        ctr: '+175%',
        views: '1.8M',
        roi: '6.1x'
      },
      demographics: [
        { label: 'Male 25-34', percentage: 50 },
        { label: 'Male 18-24', percentage: 35 },
        { label: 'Others', percentage: 15 }
      ],
      videoUrl: 'https://framerusercontent.com/assets/64ZMhO5aQtuzPw6cPEGQKIEos.mp4',
      title: 'Workspace Magnetic Organizer'
    }
  ];

  const handleMouseEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch((e) => console.log('Autoplay blocked:', e));
    }
  };

  const handleMouseLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 bg-brand-bg relative border-b border-brand-border">
      <div className="max-w-7xl mx-auto space-y-28">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-card border border-brand-border px-4 py-2 rounded-full text-[10px] font-mono font-black text-brand-text uppercase tracking-widest">
            <span>[ VIDEO TESTING LAB ]</span>
          </div>
          <h2 className="font-serif font-normal text-4xl sm:text-5xl text-brand-text leading-tight tracking-tight">
            Designed for conversions, <br />
            <span className="italic font-normal text-brand-terracotta">vetted for watch time.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted max-w-xl">
            Swipe or scroll through our live ad archive. Hover to play. Click to inspect full case metrics and script hooks.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-sans font-bold text-[10px] tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'bg-brand-card border border-brand-border text-brand-text hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Slider Carousel Wrapper */}
        <div className="relative pt-6">
          
          {/* Controls */}
          <div className="absolute top-[-30px] right-4 flex space-x-2.5 z-20">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Draggable/Scrollable Carousel container */}
          <div 
            ref={carouselRef}
            className="flex space-x-8 overflow-x-auto pb-10 scrollbar-none snap-x snap-mandatory px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {filteredItems.map((item, idx) => {
              const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5', '-rotate-0.5'];
              const cardRotation = rotations[idx % rotations.length];
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  onClick={() => setSelectedVideo(item)}
                  className={`group cursor-pointer flex flex-col items-center w-[290px] sm:w-[320px] flex-shrink-0 relative snap-start ${cardRotation} transition-transform duration-300 hover:rotate-0`}
                >
                  {/* Decorative Washi Tape strip */}
                  <div className="washi-tape washi-tape-top z-30" />

                  {/* Video Container (Phone body removed) */}
                  <div className="relative w-full aspect-[9/16] rounded-[24px] overflow-hidden bg-zinc-950 shadow-md group-hover:shadow-xl transition-all duration-500 ring-1 ring-brand-border/20">

                    {/* Video Tag */}
                    <video
                      ref={(el) => { videoRefs.current[item.id] = el; }}
                      src={item.videoUrl}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                      loop
                      muted
                      playsInline
                    />

                    {/* Cover Overlay before hover */}
                    <div className="absolute inset-0 bg-black/35 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-brand-text flex items-center justify-center shadow-lg transform group-hover:scale-90 transition-transform">
                        <Play className="w-4 h-4 fill-brand-text translate-x-0.5" />
                      </div>
                    </div>

                    {/* Creator & Metrics Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white text-left z-15 flex flex-col justify-end">
                      
                      {/* Creator info */}
                      <div className="flex items-center space-x-2.5 mb-3">
                        <img
                          src={item.creator.avatar}
                          alt={item.creator.name}
                          className="w-7 h-7 rounded-full border border-white/80 object-cover shadow"
                        />
                        <div>
                          <p className="text-[11px] font-bold">{item.creator.name}</p>
                          <p className="text-[9px] text-zinc-300">{item.creator.handle}</p>
                        </div>
                      </div>

                      {/* CTR Performance Overlay */}
                      <div className="flex items-center space-x-1 bg-brand-terracotta text-white w-fit px-2 py-0.5 rounded text-[10px] font-black mb-1.5 shadow-sm">
                        <TrendingUp className="w-3 h-3" />
                        <span>{item.metrics.ctr} CTR</span>
                      </div>

                      {/* Title / Hook */}
                      <p className="text-[11px] text-zinc-200 line-clamp-1 italic font-medium">
                        "{item.metrics.hook}"
                      </p>
                    </div>
                  </div>

                  {/* Text Description underneath */}
                  <div className="mt-4 text-center">
                    <h3 className="font-sans font-bold text-[14px] tracking-wide text-brand-text leading-tight group-hover:text-brand-terracotta transition-colors duration-300 uppercase">
                      {item.title}
                    </h3>
                    <p className="text-[9px] text-brand-muted font-sans font-extrabold mt-0.5 tracking-wider uppercase">
                      {categories.find(c => c.id === item.category)?.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- PART B: Before/After Conversion Splicer (INTERACTIVE BENCHMARK) --- */}
        <div className="bg-[#FAF8F5] border border-brand-border rounded-[28px] p-8 md:p-12 text-left relative overflow-hidden">
          
          <div className="absolute top-6 right-8 hidden md:block">
            <span className="font-mono text-[9px] text-brand-muted tracking-widest uppercase">
              [ EDITING DEMONSTRATION UNIT ]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Description Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white border border-brand-border px-3 py-1.5 rounded-full text-[9px] font-mono font-black text-brand-terracotta uppercase">
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Before vs After Splicing</span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-brand-text leading-tight">
                How we convert <br />
                <span className="italic font-normal text-brand-dark-green">raw clips into sales.</span>
              </h3>

              <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-sans">
                Most creators shoot good video but lack direct-response scripting knowledge. 
                Toggle the state on the right to see how our editors format visual layout hooks, timing loops, and captions to optimize watch-time performance.
              </p>

              {/* Toggle Buttons */}
              <div className="inline-flex p-1.5 bg-brand-bg border border-brand-border rounded-full w-full sm:w-auto">
                <button
                  onClick={() => setComparisonState('raw')}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    comparisonState === 'raw'
                      ? 'bg-brand-dark-green text-white shadow-xs'
                      : 'text-brand-text hover:bg-white/50'
                  }`}
                >
                  Raw Footage
                </button>
                <button
                  onClick={() => setComparisonState('edited')}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    comparisonState === 'edited'
                      ? 'bg-brand-terracotta text-white shadow-xs'
                      : 'text-brand-text hover:bg-white/50'
                  }`}
                >
                  Optimized Ad Edit
                </button>
              </div>
            </div>

            {/* Simulated Live Viewport */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[16/10] bg-brand-dark-green rounded-[24px] p-6 border border-brand-border/40 shadow-xl overflow-hidden flex flex-col justify-between">
                
                {/* Simulated Screen header */}
                <div className="flex justify-between items-center text-[9px] font-mono text-brand-border/50 uppercase pb-3 border-b border-white/5">
                  <span>[ SIMULATED PLAYBACK ]</span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span>0:00 / 0:15</span>
                  </span>
                </div>

                {/* Main Video Frame Simulation */}
                <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                  
                  {/* Backdrop video mockup representation */}
                  <div className="absolute inset-0 z-0">
                    <video
                      src="https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4"
                      className="w-full h-full object-cover opacity-70"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>

                  {/* Overlays triggered by comparisonState */}
                  <AnimatePresence mode="wait">
                    {comparisonState === 'edited' ? (
                      <motion.div
                        key="edited-overlays"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none text-left"
                      >
                        {/* 1. Hook Banner Overlay */}
                        <div className="bg-yellow-400 border-2 border-brand-text text-brand-text px-3 py-1.5 rounded-md font-sans font-black text-[11px] uppercase tracking-wide w-fit mx-auto mt-2 shadow-md animate-bounce">
                          ⚠️ DON'T BUY LUNCH BEFORE WATCHING THIS
                        </div>

                        {/* 2. Vector circular hook highlighter (simulated with border) */}
                        <div className="absolute left-[30%] top-[40%] w-24 h-24 border-3 border-dashed border-red-500 rounded-full animate-pulse flex items-center justify-center">
                          <span className="bg-red-500 text-white font-mono text-[7px] font-black px-1 py-0.5 rounded shadow">
                            HOOK TARGET
                          </span>
                        </div>

                        {/* 3. Captions Overlay */}
                        <div className="text-center w-full mt-auto mb-3">
                          <span className="bg-black/90 text-white border border-white/10 px-3 py-1 rounded font-sans font-black text-xs uppercase tracking-wide shadow-md">
                            "So I made this bowl in <span className="text-yellow-400">30 seconds</span>..."
                          </span>
                        </div>

                        {/* 4. Watch time progress bar */}
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden absolute bottom-0 left-0">
                          <div className="h-full bg-brand-terracotta w-1/3" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="raw-overlays"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                      >
                        <span className="bg-black/40 text-[#FAF8F5] border border-white/10 px-4 py-2 rounded font-mono text-[9px] uppercase tracking-widest">
                          [ Raw Footage - No Edits ]
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Simulated Screen footer controls */}
                <div className="flex justify-between items-center text-[9px] font-mono text-[#ded6ca]/70 pt-3 border-t border-white/5">
                  <span className="uppercase text-brand-border/60">SOURCE: RAW_MOBILE_042.MOV</span>
                  <span className="text-brand-terracotta font-bold uppercase">
                    {comparisonState === 'edited' ? '✓ OPTIMIZED +185% CTR' : '0% EXTRA DETAILS'}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Case Study Modal Window */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-brand-text/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-brand-bg rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl border border-brand-border grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] relative text-left">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-card border border-brand-border text-brand-text hover:bg-brand-terracotta hover:text-white transition-colors z-30 shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Phone Frame Video Player */}
              <div className="lg:col-span-5 bg-zinc-950 flex items-center justify-center relative p-8 border-r border-brand-border">
                <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-[24px] overflow-hidden bg-black shadow-2xl border border-white/10">
                  <video
                    src={selectedVideo.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  
                  {/* Mute toggle button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-5 right-5 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors z-20 border border-white/10"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Right Column: Case Performance Dashboard */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[92vh]">
                <div className="space-y-8">
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center space-x-3.5 pb-6 border-b border-brand-border">
                    <img
                      src={selectedVideo.creator.avatar}
                      alt={selectedVideo.creator.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-border"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-sans font-bold text-[15px] tracking-wide text-brand-text uppercase">{selectedVideo.creator.name}</h4>
                        <span className="bg-brand-card text-brand-terracotta text-[9px] font-bold px-2.5 py-0.5 rounded-md border border-brand-border uppercase tracking-widest">Vetted</span>
                      </div>
                      <p className="text-xs text-brand-muted font-medium mt-1">{selectedVideo.creator.handle}</p>
                    </div>
                  </div>

                  {/* Video Case Title */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
                      Case Performance
                    </span>
                    <h3 className="font-serif font-medium text-2xl md:text-3xl text-brand-text mt-4">
                      {selectedVideo.title}
                    </h3>
                  </div>

                  {/* Analytical Metrics */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center">
                      <BarChart3 className="w-4 h-4 text-brand-terracotta mr-2" />
                      Live Ad Performance Metrics
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-brand-card border border-brand-border p-4 rounded-xl shadow-sm text-center">
                        <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">CTR Boost</p>
                        <p className="text-xl font-sans font-black text-brand-terracotta mt-1">{selectedVideo.metrics.ctr}</p>
                      </div>
                      <div className="bg-brand-card border border-brand-border p-4 rounded-xl shadow-sm text-center">
                        <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Views</p>
                        <p className="text-xl font-sans font-black text-brand-text mt-1">{selectedVideo.metrics.views}</p>
                      </div>
                      <div className="bg-brand-card border border-brand-border p-4 rounded-xl shadow-sm text-center">
                        <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">ROAS Return</p>
                        <p className="text-xl font-sans font-black text-brand-terracotta-light mt-1">{selectedVideo.metrics.roi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Demographics Bar Chart */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center">
                      <Users2 className="w-4.5 h-4.5 text-brand-terracotta mr-2" />
                      Audience Demographics Breakdown
                    </p>
                    <div className="bg-brand-card border border-brand-border p-5 rounded-2xl shadow-sm space-y-4">
                      {selectedVideo.demographics.map((demo, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-brand-text">
                            <span>{demo.label}</span>
                            <span>{demo.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden border border-brand-border">
                            <div 
                              className="h-full bg-brand-terracotta rounded-full transition-all duration-1000"
                              style={{ width: `${demo.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Copywriting Script Angles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-brand-card p-4 rounded-xl border border-brand-border text-xs">
                      <p className="font-bold uppercase tracking-wider text-brand-muted mb-1 text-[9px]">Winning Hook Angle</p>
                      <p className="font-sans font-semibold text-brand-text leading-relaxed italic">
                        "{selectedVideo.metrics.hook}"
                      </p>
                    </div>
                    <div className="bg-brand-card p-4 rounded-xl border border-brand-border text-xs">
                      <p className="font-bold uppercase tracking-wider text-brand-muted mb-1 text-[9px]">Body Narrative Angle</p>
                      <p className="font-sans text-brand-muted leading-relaxed">
                        {selectedVideo.metrics.bodyAngle}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Booking Call-To-Action */}
                <div className="pt-8 border-t border-brand-border mt-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-brand-muted">Base Creator Rate</p>
                    <p className="text-xl font-sans font-black text-brand-text">${selectedVideo.rate || 150} <span className="text-xs font-sans font-semibold text-brand-muted">/ video</span></p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVideo(null);
                      const el = document.getElementById('creators');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-7 py-3.5 rounded-full bg-brand-terracotta hover:bg-brand-text text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Hire {selectedVideo.creator.name} Directly
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
