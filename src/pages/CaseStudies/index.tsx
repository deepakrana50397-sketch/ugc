import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, X, BarChart3, TrendingUp, Users2 } from 'lucide-react';
import SEO from '../../components/seo/SEO';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import { caseStudiesSeo } from './seo';

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
}

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

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

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <>
      <SEO
        title={caseStudiesSeo.title}
        description={caseStudiesSeo.description}
        keywords={caseStudiesSeo.keywords}
      />
      <JsonLd data={caseStudiesSeo.schema} />

      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Breadcrumb Trail */}
          <Breadcrumb items={[{ label: 'Case Studies' }]} />

          {/* Heading */}
          <div className="text-left max-w-4xl space-y-6">
            <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl text-brand-text leading-[1.05] tracking-tight">
              Conversion <br />
              <span className="font-serif italic font-normal text-brand-terracotta">Case Studies</span> & Creatives
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl leading-relaxed">
              Explore how direct-response UGC creative structures perform in the wild. Check out demographic highlights, winning hooks, and exact ROI returns.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-sans font-bold text-[9px] tracking-widest transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-terracotta text-white shadow-sm'
                    : 'bg-brand-card border border-brand-border text-brand-text hover:bg-brand-bg'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 pt-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => setSelectedVideo(item)}
                className="group cursor-pointer flex flex-col items-center w-full"
              >
                <div className="relative w-full aspect-[9/16] rounded-[24px] overflow-hidden bg-zinc-950 shadow-md group-hover:scale-[1.02] group-hover:shadow-xl transition-all duration-500 ring-1 ring-brand-border/10">
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    src={item.videoUrl}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-white/95 text-brand-text flex items-center justify-center shadow-lg transform group-hover:scale-90 transition-transform">
                      <Play className="w-5 h-5 fill-brand-text translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left z-15 flex flex-col justify-end">
                    <div className="flex items-center space-x-2.5 mb-3.5">
                      <img
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        className="w-8 h-8 rounded-full border border-white/80 object-cover shadow"
                      />
                      <div>
                        <p className="text-xs font-bold">{item.creator.name}</p>
                        <p className="text-[10px] text-zinc-300">{item.creator.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-brand-terracotta text-white w-fit px-3 py-1 rounded-lg text-xs font-black mb-2 shadow-sm border border-brand-terracotta/25">
                      <TrendingUp className="w-4 h-4" />
                      <span>{item.metrics.ctr} CTR</span>
                    </div>
                    <p className="text-xs text-zinc-200 line-clamp-1 italic font-medium">
                      "{item.metrics.hook}"
                    </p>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <h3 className="font-sans font-bold text-[15px] tracking-wide text-brand-text leading-tight group-hover:text-brand-terracotta transition-colors duration-300 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-brand-muted font-sans font-extrabold mt-1 tracking-wider uppercase">
                    {categories.find(c => c.id === item.category)?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Case Study Modal Window */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-brand-text/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="bg-brand-bg rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl border border-brand-border grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] relative">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-brand-card border border-brand-border text-brand-text hover:bg-brand-terracotta hover:text-white transition-colors z-30 shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
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
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-5 right-5 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors z-20 border border-white/10"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between text-left overflow-y-auto max-h-[92vh]">
                  <div className="space-y-8">
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
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
                        Case Performance
                      </span>
                      <h3 className="font-serif font-medium text-2xl md:text-3xl text-brand-text mt-4">
                        {selectedVideo.title}
                      </h3>
                    </div>
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
