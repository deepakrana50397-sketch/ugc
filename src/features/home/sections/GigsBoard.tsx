import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ugcGigs } from '@/content/gigs';
import { ArrowRight, DollarSign, Briefcase, Sparkles } from 'lucide-react';

export default function GigsBoard() {
  const [filter, setFilter] = useState<'All' | 'College Student' | 'Housewife' | 'Influencer'>('All');

  const filteredGigs =
    filter === 'All'
      ? ugcGigs.slice(0, 3)
      : ugcGigs.filter((gig) => gig.category === filter).slice(0, 3);

  const categories: ('All' | 'College Student' | 'Housewife' | 'Influencer')[] = [
    'All',
    'College Student',
    'Housewife',
    'Influencer',
  ];

  // Random rotations for the cards to make them feel organic and hand-placed
  const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5', '-rotate-0.5', 'rotate-1.5', '-rotate-1.5'];

  return (
    <section 
      id="gigs-preview" 
      className="py-28 md:py-36 px-6 md:px-12 bg-brand-dark-green relative overflow-hidden"
    >
      {/* Decorative Grid Lines to make it feel like an engineering brief board */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/3 w-[1px] h-full border-l border-dashed border-white" />
        <div className="absolute top-0 left-2/3 w-[1px] h-full border-l border-dashed border-white" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-white" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 bg-brand-moss/50 border border-brand-border/10 px-4 py-2 rounded-full text-[10px] font-mono font-black text-brand-bg uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-brand-terracotta" />
            <span>[ OPEN GIG DIRECTORY ]</span>
          </div>
          
          <h2 className="font-serif font-normal text-4xl sm:text-5xl text-white leading-tight tracking-tight">
            Live creator <span className="italic font-normal text-brand-terracotta">gigs board.</span>
          </h2>
          
          <p className="text-sm md:text-base text-brand-border/80 font-sans leading-relaxed">
            Students, homemakers, and micro-influencers apply directly to vetted brands. 
            No agency representation required. All payouts go directly to your bank account.
          </p>
        </div>

        {/* Filters (Organic tabs style) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, idx) => {
            const isSelected = filter === cat;
            const rotationClass = rotations[idx % rotations.length];
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-md font-mono font-black text-[9px] tracking-wider transition-all duration-300 cursor-pointer ${rotationClass} ${
                  isSelected
                    ? 'bg-brand-terracotta text-white shadow-md border-brand-terracotta ring-2 ring-brand-terracotta/20'
                    : 'bg-brand-card/90 border border-brand-border text-brand-text hover:bg-white'
                }`}
              >
                [{cat.toUpperCase()}]
              </button>
            );
          })}
        </div>

        {/* Gigs List / Corkboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <AnimatePresence mode="popLayout">
            {filteredGigs.map((gig, idx) => {
              // Alternate rotations and tape configurations for tactile organic layout
              const cardRotation = rotations[(idx + 2) % rotations.length];
              const tapeClass = idx % 2 === 0 ? 'washi-tape-top-left' : 'washi-tape-top-right';
              
              return (
                <motion.div
                  layout
                  key={gig.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className={`paper-card p-8 md:p-10 flex flex-col justify-between text-left rounded-[32px] border border-brand-border ${cardRotation}`}
                >
                  {/* Decorative Washi Tape strip */}
                  <div className={`washi-tape ${tapeClass}`} />

                  {/* Decorative Pushpin (Tactile feel) */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="w-3.5 h-3.5 bg-brand-terracotta rounded-full border border-white shadow flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-65" />
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    {/* Monospace Metadata Tag */}
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-mono font-black uppercase tracking-wider text-brand-muted px-2 py-0.75 bg-brand-bg/50 border border-brand-border rounded">
                        #{gig.id.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono font-black text-brand-terracotta flex items-center">
                        <DollarSign className="w-3.5 h-3.5" />
                        {gig.budget}
                      </span>
                    </div>

                    {/* Title & Brand */}
                    <div className="space-y-2.5">
                      <h3 className="font-sans font-black text-lg md:text-xl text-brand-text tracking-tight leading-tight">
                        {gig.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-brand-muted uppercase">
                        <Briefcase className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span>{gig.brandName}</span>
                        <span>•</span>
                        <span className="text-brand-moss">{gig.niche}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-brand-muted font-sans leading-relaxed line-clamp-3">
                      {gig.description}
                    </p>
                  </div>

                  {/* Footer specs / CTA */}
                  <div className="pt-6 border-t border-brand-border/60 mt-8 flex items-center justify-between">
                    <span className="text-[8px] font-mono font-black text-brand-text uppercase tracking-widest bg-brand-bg px-2.5 py-1 rounded border border-brand-border/60">
                      [{gig.category.toUpperCase()}]
                    </span>
                    <Link
                      href={`/gigs#${gig.id}`}
                      className="text-xs font-mono font-black text-brand-terracotta hover:text-brand-dark-green transition-colors flex items-center space-x-1"
                    >
                      <span>APPLY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <div className="flex justify-center pt-6">
          <Link
            href="/gigs"
            className="group px-9 py-5 rounded-full bg-brand-terracotta hover:bg-brand-moss text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <span>Browse All Live Gigs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
