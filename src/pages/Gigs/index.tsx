import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import { gigsSeo } from './seo';
import { ugcGigs, type UgcGig } from '../../content/gigs';
import { DollarSign, Briefcase, Users, CheckCircle, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GigsPage() {
  const location = useLocation();
  const [filter, setFilter] = useState<'All' | 'College Student' | 'Housewife' | 'Influencer'>('All');
  const [selectedGig, setSelectedGig] = useState<UgcGig>(ugcGigs[0]);
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [appliedGigs, setAppliedGigs] = useState<string[]>([]);

  // Handle hash navigation directly to a gig
  useEffect(() => {
    if (location.hash) {
      const gigId = location.hash.replace('#', '');
      const foundGig = ugcGigs.find((g) => g.id === gigId);
      if (foundGig) {
        setSelectedGig(foundGig);
        setFilter('All');
      }
    }
  }, [location.hash]);

  const filteredGigs =
    filter === 'All'
      ? ugcGigs
      : ugcGigs.filter((gig) => gig.category === filter);

  const categories: ('All' | 'College Student' | 'Housewife' | 'Influencer')[] = [
    'All',
    'College Student',
    'Housewife',
    'Influencer',
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedGigs([...appliedGigs, selectedGig.id]);
    setTimeout(() => {
      setApplyName('');
      setApplyEmail('');
      setPortfolioLink('');
    }, 4000);
  };

  return (
    <>
      <SEO
        title={gigsSeo.title}
        description={gigsSeo.description}
        keywords={gigsSeo.keywords}
      />
      <JsonLd data={gigsSeo.schema} />

      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg min-h-screen">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Breadcrumb Trail */}
          <Breadcrumb items={[{ label: 'Gigs Board' }]} />

          {/* Heading */}
          <div className="text-left max-w-4xl space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
              Live Gig Database
            </span>
            <h1 className="font-sans font-extrabold text-5xl sm:text-6xl text-brand-text leading-[1.05] tracking-tight">
              Browse Active <br />
              <span className="font-serif italic font-normal text-brand-terracotta">UGC Gigs</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl leading-relaxed">
              Find flexible, part-time content creator gigs. View requirements, check product niches, and submit your portfolio directly to brands.
            </p>
          </div>

          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
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

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
            {/* Left Column: Gigs List */}
            <div className="lg:col-span-5 space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredGigs.map((gig) => {
                  const isSelected = selectedGig.id === gig.id;
                  const isApplied = appliedGigs.includes(gig.id);

                  return (
                    <motion.div
                      layout
                      key={gig.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        setSelectedGig(gig);
                      }}
                      className={`cursor-pointer rounded-[24px] p-6 text-left border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-brand-terracotta shadow-md'
                          : 'bg-[#FAF8F5]/80 border-[#e5dec9]/60 hover:bg-[#FAF8F5] hover:border-[#e5dec9] shadow-sm'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted px-2 py-0.5 rounded bg-brand-bg border border-brand-border">
                            {gig.niche}
                          </span>
                          <span className="text-xs font-black text-brand-terracotta flex items-center">
                            <DollarSign className="w-3.5 h-3.5" />
                            {gig.budget}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-sans font-extrabold text-lg text-brand-text leading-tight tracking-tight">
                            {gig.title}
                          </h3>
                          <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mt-1 flex items-center">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {gig.brandName}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-brand-border/40 mt-2">
                          <span className="text-[9px] font-bold text-brand-text uppercase tracking-widest flex items-center bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
                            <Users className="w-3 h-3 mr-1 text-brand-terracotta" />
                            {gig.category}
                          </span>
                          {isApplied ? (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-0.5">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Applied</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-brand-terracotta flex items-center space-x-0.5">
                              <span>Select</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right Column: Detailed View & Application Drawer */}
            <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-8 md:p-10 shadow-sm text-left sticky top-32">
              <div className="space-y-6">
                {/* Brand Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta font-black text-sm uppercase">
                      {selectedGig.brandName.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-sans font-extrabold text-base text-brand-text uppercase">
                        {selectedGig.brandName}
                      </h4>
                      <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                        Niche: {selectedGig.niche}
                      </p>
                    </div>
                  </div>
                  <div className="bg-brand-card px-4 py-2 rounded-xl border border-brand-border text-center">
                    <p className="text-[8px] font-bold text-brand-muted uppercase tracking-wider">Payout Payout</p>
                    <p className="text-xl font-sans font-black text-brand-terracotta flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                      {selectedGig.budget}
                    </p>
                  </div>
                </div>

                {/* Gig Payout Spec */}
                <div className="space-y-3">
                  <h2 className="font-serif font-medium text-2xl md:text-3xl text-brand-text">
                    {selectedGig.title}
                  </h2>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-sans">
                    {selectedGig.description}
                  </p>
                </div>

                {/* Requirements / Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-brand-bg/10 border border-brand-border/40 p-5 rounded-2xl">
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider mb-3">Requirements</p>
                    <ul className="space-y-2 text-xs text-brand-text font-medium">
                      {selectedGig.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-terracotta mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-bg/10 border border-brand-border/40 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider mb-2">Deliverable</p>
                      <p className="text-sm font-sans font-extrabold text-brand-text leading-snug">
                        {selectedGig.deliverable}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-brand-border/40">
                      <p className="text-[8px] font-bold text-brand-muted uppercase tracking-wider">Target Creator</p>
                      <p className="text-xs font-bold text-brand-terracotta uppercase tracking-wider">
                        {selectedGig.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Drawer */}
                <div className="pt-6 border-t border-brand-border/60">
                  {appliedGigs.includes(selectedGig.id) ? (
                    <div className="py-6 text-center space-y-3 bg-brand-bg/10 rounded-2xl border border-brand-border/40">
                      <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-serif font-medium text-lg text-brand-text">Application Submitted</h4>
                      <p className="text-xs text-brand-muted max-w-sm mx-auto">
                        Your profile and portfolio link were sent directly to {selectedGig.brandName}. They will contact you inside 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-text">
                        Apply to this Gig
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          value={applyName}
                          onChange={(e) => setApplyName(e.target.value)}
                          className="bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta"
                          placeholder="Your Full Name"
                        />
                        <input
                          type="email"
                          required
                          value={applyEmail}
                          onChange={(e) => setApplyEmail(e.target.value)}
                          className="bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta"
                          placeholder="Email Address"
                        />
                      </div>
                      <input
                        type="url"
                        required
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta"
                        placeholder="Video Portfolio / Social Link (TikTok/Insta)"
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-brand-terracotta hover:bg-brand-text text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                      >
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
