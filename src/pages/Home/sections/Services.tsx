import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Video, FileText, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const serviceCards = [
    {
      id: '01',
      tag: 'CREATOR SOURCE',
      icon: <Video className="w-5 h-5 text-brand-terracotta" />,
      title: 'Targeted Creator Sourcing',
      description:
        'We seed your product directly to vetted college students, housewives, and micro-influencers. Get real aesthetic dorm rooms, cozy kitchens, and native daily setups.',
      bullets: [
        'Vetted profiles (8% pass rate)',
        '100% rate transparency',
        'Physical product seeding logistics'
      ],
      videoUrl: 'https://framerusercontent.com/assets/SCuqi0qyfpukKLtZm0jURfE.mp4',
      theme: 'light' // cream card
    },
    {
      id: '02',
      tag: 'DR SCRIPTING',
      icon: <FileText className="w-5 h-5 text-white" />,
      title: 'Direct-Response Scripting',
      description:
        'Our copywriting team drafts custom storyboards and visual scripts designed to hook viewers in 1.5 seconds. We script multiple hook variations for every test run.',
      bullets: [
        'High-retention hooks formula',
        'Auditory pacing structures',
        'Storyboards approved before shooting'
      ],
      videoUrl: 'https://framerusercontent.com/assets/64ZMhO5aQtuzPw6cPEGQKIEos.mp4',
      theme: 'dark' // deep forest green card
    },
    {
      id: '03',
      tag: 'NATIVE EDITING',
      icon: <Cpu className="w-5 h-5 text-brand-terracotta" />,
      title: 'Conversion-First Editing',
      description:
        'Raw footage is spliced in-house. We apply native TikTok/Reels captions, callout banners, zoom-cuts, and custom sound effects (SFX) to optimize watch time.',
      bullets: [
        'Caption overlays & text graphics',
        'Lighting & grading correction',
        '90-day paid media usage rights'
      ],
      videoUrl: 'https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4',
      theme: 'light' // cream card
    }
  ];

  return (
    <section
      id="services"
      className="py-28 md:py-36 px-6 md:px-12 bg-brand-bg relative overflow-hidden border-b border-brand-border"
    >
      {/* Background grid details */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full border-l border-dashed border-brand-border" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full border-l border-dashed border-brand-border" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-card border border-brand-border px-4 py-2 rounded-full text-[10px] font-mono font-black text-brand-text uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>[ CONVERSION MECHANICS ]</span>
          </div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-brand-text leading-[1.05] tracking-tight">
            Designed to convert. <br />
            <span className="font-serif italic font-normal text-brand-terracotta">Structured to scale.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted max-w-xl mx-auto">
            A complete sourcing, scripting, and mobile-native post-production pipeline built to scale your creative testing cycle.
          </p>
        </div>

        {/* 3-Column Grid of Beautifully Rounded Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {serviceCards.map((card, idx) => {
            const isDark = card.theme === 'dark';
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[36px] border transition-all duration-300 shadow-md ${
                  isDark 
                    ? 'bg-brand-dark-green border-brand-moss/30 text-white shadow-xl' 
                    : 'bg-[#ffffff] border-brand-border text-brand-text'
                }`}
              >
                {/* Washi Tape strip for design accents */}
                <div className={`washi-tape washi-tape-top opacity-30 ${isDark ? 'mix-blend-overlay' : ''}`} />

                <div className="space-y-6">
                  {/* Card Header metadata */}
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${
                      isDark 
                        ? 'bg-brand-moss/45 border-white/10 text-brand-bg' 
                        : 'bg-brand-bg border-brand-border text-brand-muted'
                    }`}>
                      [{card.tag}]
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-xs ${
                      isDark ? 'bg-brand-moss border-white/10' : 'bg-brand-bg border-brand-border'
                    }`}>
                      {card.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-sans font-black text-xl md:text-2xl tracking-tight leading-tight">
                      {card.title}
                    </h3>
                    <p className={`text-xs md:text-sm font-sans leading-relaxed ${
                      isDark ? 'text-brand-bg/85' : 'text-brand-muted'
                    }`}>
                      {card.description}
                    </p>
                  </div>

                  {/* Fully Rounded Video Mockup */}
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black border border-brand-border/10 shadow-inner">
                    <video
                      src={card.videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 text-left pt-2">
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-3 text-xs md:text-sm">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isDark 
                            ? 'bg-brand-moss/50 border-white/10 text-brand-terracotta' 
                            : 'bg-brand-bg border-brand-border text-brand-terracotta'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span className={`font-sans leading-tight font-medium ${
                          isDark ? 'text-brand-bg/80' : 'text-brand-muted'
                        }`}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action Button */}
                <div className="pt-8 border-t mt-8 border-brand-border/10">
                  <Link
                    to="/services"
                    className={`w-full py-4 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isDark
                        ? 'bg-brand-terracotta hover:bg-white text-white hover:text-brand-text shadow-sm'
                        : 'bg-brand-text hover:bg-brand-terracotta text-brand-bg hover:text-white'
                    }`}
                  >
                    <span>View rate guidelines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
