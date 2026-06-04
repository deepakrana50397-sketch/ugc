import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ugcGigs } from '../../../content/gigs';
import { ArrowRight, DollarSign, Briefcase, Users } from 'lucide-react';

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

  return (
    <section id="gigs-preview" className="py-28 md:py-36 px-6 md:px-12 bg-brand-bg border-b border-brand-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-card border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-text uppercase tracking-widest">
            <span>Part-Time Opportunities</span>
          </div>
          <h2 className="font-serif font-medium text-4xl sm:text-5xl text-brand-text leading-tight tracking-tight">
            Live UGC <span className="italic font-normal text-brand-terracotta">Gigs board</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted font-sans leading-relaxed">
            Apply directly to video campaigns. Vetted part-time opportunities for students, housewives, and micro-creators. No agency markups.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-sans font-bold text-[9px] tracking-widest transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'bg-brand-card border border-brand-border text-brand-text hover:bg-brand-bg'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Gigs List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGigs.map((gig) => (
              <motion.div
                layout
                key={gig.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-8 md:p-10 flex flex-col justify-between hover:border-brand-terracotta/40 hover:-translate-y-2 transition-all duration-300 shadow-sm text-left"
              >
                <div className="space-y-6">
                  {/* Gig Header */}
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted px-2.5 py-1 rounded bg-brand-bg border border-brand-border">
                      {gig.niche}
                    </span>
                    <span className="text-xs font-black text-brand-terracotta flex items-center">
                      <DollarSign className="w-3.5 h-3.5" />
                      {gig.budget} / video
                    </span>
                  </div>

                  {/* Title & Brand */}
                  <div className="space-y-2">
                    <h3 className="font-sans font-extrabold text-xl md:text-2xl text-brand-text tracking-tight leading-tight">
                      {gig.title}
                    </h3>
                    <p className="text-xs font-bold text-brand-muted uppercase tracking-wider flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-1" />
                      {gig.brandName}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-brand-muted font-sans leading-relaxed line-clamp-3">
                    {gig.description}
                  </p>
                </div>

                {/* Footer specs / CTA */}
                <div className="pt-6 border-t border-brand-border/40 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand-text uppercase tracking-widest flex items-center bg-brand-bg px-2.5 py-1 rounded border border-brand-border">
                    <Users className="w-3.5 h-3.5 mr-1 text-brand-terracotta" />
                    {gig.category}
                  </span>
                  <Link
                    to={`/gigs#${gig.id}`}
                    className="text-xs font-bold text-brand-terracotta hover:text-brand-text transition-colors flex items-center space-x-1"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <div className="flex justify-center pt-4">
          <Link
            to="/gigs"
            className="px-8 py-4.5 rounded-full bg-black hover:bg-black/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <span>Browse All Live Gigs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
