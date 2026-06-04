import { useState } from 'react';
import { Search, ArrowRight, UserCheck, ShieldCheck, Mail, Check, ChevronRight } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  location: string;
  handle: string;
  niche: string;
  tier: 'Nano (5k-20k)' | 'Micro (20k-100k)';
  followers: string;
  platforms: ('tiktok' | 'instagram' | 'youtube')[];
  rate: number;
  engagement: number; // e.g. 6.4
  audience: string;
  tags: string[];
  bio: string;
}

export default function InfluencerCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  
  // Drawer states
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Brief, 3: Summary, 4: Done
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    productLink: '',
    brief: '',
    videoQuantity: 1
  });

  const creators: Creator[] = [
    {
      id: 'c1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      location: 'Los Angeles, CA',
      handle: '@sarah.skincare',
      niche: 'beauty',
      tier: 'Nano (5k-20k)',
      followers: '12.4K',
      platforms: ['tiktok', 'instagram'],
      rate: 150,
      engagement: 6.4,
      audience: 'Female 18-24 (65%)',
      tags: ['Skincare Routine', 'Product Review', 'Aesthetic'],
      bio: 'Esthetician creating native, educational beauty routines and honest skincare reviews.'
    },
    {
      id: 'c2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      location: 'New York, NY',
      handle: '@marcus.tech',
      niche: 'tech',
      tier: 'Micro (20k-100k)',
      followers: '45.2K',
      platforms: ['tiktok', 'youtube'],
      rate: 220,
      engagement: 5.8,
      audience: 'Male 18-24 (55%)',
      tags: ['ASMR Unboxing', 'Setup Guide', 'Tech Hacks'],
      bio: 'Tech enthusiast focusing on minimal setups, unboxings, and gadget performance.'
    },
    {
      id: 'c3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      location: 'Miami, FL',
      handle: '@elena.style',
      niche: 'fashion',
      tier: 'Micro (20k-100k)',
      followers: '68.0K',
      platforms: ['instagram', 'tiktok'],
      rate: 250,
      engagement: 7.2,
      audience: 'Female 18-24 (70%)',
      tags: ['Try-On Haul', 'Outfit Styling', 'OOTD'],
      bio: 'Fashion content creator showcasing styling hacks and aesthetic lookbooks.'
    },
    {
      id: 'c4',
      name: 'David Kojo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      location: 'Austin, TX',
      handle: '@david.eats',
      niche: 'food',
      tier: 'Nano (5k-20k)',
      followers: '18.9K',
      platforms: ['tiktok', 'youtube'],
      rate: 160,
      engagement: 8.1,
      audience: 'Female 25-34 (40%)',
      tags: ['Recipe Hook', 'ASMR Cooking', 'Taste Test'],
      bio: 'Home chef creating quick, high-retention protein recipes and unboxings.'
    },
    {
      id: 'c5',
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
      location: 'San Francisco, CA',
      handle: '@maya.glow',
      niche: 'beauty',
      tier: 'Nano (5k-20k)',
      followers: '9.8K',
      platforms: ['tiktok', 'instagram'],
      rate: 150,
      engagement: 6.9,
      audience: 'Female 18-24 (60%)',
      tags: ['Get Ready With Me', 'Dry Skin Hacks', 'Aesthetic'],
      bio: 'Slow-living skin prep content and morning glow routines.'
    },
    {
      id: 'c6',
      name: 'Julian Vance',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
      location: 'Seattle, WA',
      handle: '@julian.setups',
      niche: 'tech',
      tier: 'Micro (20k-100k)',
      followers: '82.4K',
      platforms: ['tiktok', 'youtube', 'instagram'],
      rate: 280,
      engagement: 5.1,
      audience: 'Male 25-34 (50%)',
      tags: ['Desk Setup', 'Ergonomic Hack', 'WFH Tech'],
      bio: 'Workspace setups and productivity hacks built for SaaS/hardware brands.'
    },
    {
      id: 'c7',
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      location: 'Denver, CO',
      handle: '@emma.fitness',
      niche: 'wellness',
      tier: 'Nano (5k-20k)',
      followers: '15.6K',
      platforms: ['instagram', 'tiktok'],
      rate: 170,
      engagement: 8.4,
      audience: 'Female 18-24 (65%)',
      tags: ['Gym Routine', 'Healthy Meal Prep', 'Supplement'],
      bio: 'Certified trainer sharing gym routines, activewear unboxing, and macro plans.'
    },
    {
      id: 'c8',
      name: 'Liam Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      location: 'Chicago, IL',
      handle: '@liam.home',
      niche: 'home',
      tier: 'Nano (5k-20k)',
      followers: '14.1K',
      platforms: ['tiktok'],
      rate: 155,
      engagement: 6.8,
      audience: 'Female 25-34 (45%)',
      tags: ['DIY Decor', 'Room Makeover', 'Cleaning Hack'],
      bio: 'Minimalist home styling, quick organization systems, and rental DIY hacks.'
    }
  ];

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesNiche = selectedNiche === 'all' || creator.niche === selectedNiche;
    const matchesTier = selectedTier === 'all' || creator.tier.includes(selectedTier);

    return matchesSearch && matchesNiche && matchesTier;
  });

  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setBookingStep((prev) => prev - 1);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(4);
  };

  const handleCloseDrawer = () => {
    setSelectedCreator(null);
    setBookingStep(1);
    setFormData({ brandName: '', email: '', productLink: '', brief: '', videoQuantity: 1 });
  };

  return (
    <section id="creators" className="py-32 px-6 md:px-12 bg-brand-bg relative border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-card border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-text uppercase tracking-widest">
            <span>Direct Hiring Panel</span>
          </div>
          <h2 className="font-serif font-medium text-4xl sm:text-5xl text-brand-text leading-tight tracking-tight">
            Direct creator directory.<br />
            <span className="italic font-normal text-brand-terracotta">Zero middleman fees.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted font-sans leading-relaxed">
            Hire vetted creators at their exact rate. We only charge a flat <span className="font-bold text-brand-text underline">$19 processing fee</span> to format the brief, script, and edit.
          </p>
        </div>

        {/* Search & Filter bar (Linen panel) */}
        <div className="bg-brand-card p-4 rounded-[20px] md:rounded-full mb-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 max-w-5xl mx-auto border border-brand-border shadow-sm">
          {/* Search */}
          <div className="flex-grow flex items-center space-x-3 px-4 py-2.5 bg-brand-bg rounded-xl md:rounded-full border border-brand-border/40">
            <Search className="w-4 h-4 text-brand-muted" />
            <input
              type="text"
              placeholder="Search creators, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[11px] font-bold tracking-wider text-brand-text placeholder-brand-muted/70 w-full uppercase"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Niche */}
            <div className="flex items-center space-x-2 px-4 py-2 md:py-0 border-t md:border-t-0 md:border-l border-brand-border">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Niche:</span>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] font-black text-brand-text font-sans cursor-pointer focus:ring-0 uppercase tracking-wider"
              >
                <option value="all">All Niches</option>
                <option value="beauty">Beauty & Skincare</option>
                <option value="fashion">Fashion & Style</option>
                <option value="tech">Tech & Workspace</option>
                <option value="food">Food & Beverage</option>
                <option value="wellness">Wellness & Gym</option>
                <option value="home">Home & DIY</option>
              </select>
            </div>

            {/* Tier */}
            <div className="flex items-center space-x-2 px-4 py-2 md:py-0 border-t md:border-t-0 md:border-l border-brand-border">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Tier:</span>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] font-black text-brand-text font-sans cursor-pointer focus:ring-0 uppercase tracking-wider"
              >
                <option value="all">All Tiers</option>
                <option value="Nano">Nano (5k-20k)</option>
                <option value="Micro">Micro (20k-100k)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Creators Dossier List */}
        <div className="max-w-7xl mx-auto space-y-4 pt-6">
          {/* Header Row (Desktop Only) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 font-mono text-[9px] font-black uppercase text-brand-muted tracking-widest border-b border-brand-border/60">
            <div className="col-span-4 text-left">CREATOR DETAILS</div>
            <div className="col-span-2 text-left">LOCATION</div>
            <div className="col-span-2 text-left">NICHE & AUDIENCE</div>
            <div className="col-span-2 text-center">METRICS (FOLL. / ENG.)</div>
            <div className="col-span-2 text-right">DIRECT RATE & BOOKING</div>
          </div>

          {/* Creators Rows */}
          {filteredCreators.map((creator, idx) => {
            const rotations = ['rotate-0.5', '-rotate-0.5', 'rotate-[0.25deg]', '-rotate-[0.25deg]'];
            const cardRotation = rotations[idx % rotations.length];
            return (
              <div 
                key={creator.id}
                className={`paper-card px-6 py-5 md:px-8 md:py-6 rounded-[32px] transition-all duration-300 hover:scale-[1.015] hover:z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center text-left ${cardRotation}`}
              >
                {/* Washi Tape Accent */}
                <div className="washi-tape washi-tape-top-left opacity-30 scale-75 -left-4 -top-3" />

                {/* Col 1: Creator Bio & Name */}
                <div className="col-span-1 lg:col-span-4 flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-brand-border flex-shrink-0 shadow-xs">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-sans font-black text-sm md:text-base text-brand-text uppercase leading-none">
                        {creator.name}
                      </h3>
                      <span className="bg-brand-card text-brand-terracotta font-mono text-[7px] font-black px-1 py-0.25 rounded border border-brand-border">
                        {creator.tier.split(' ')[0].toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono font-bold text-brand-terracotta leading-none">{creator.handle}</p>
                    <p className="text-xs text-brand-muted font-sans leading-relaxed line-clamp-1 max-w-xs pt-1 hidden md:block">
                      {creator.bio}
                    </p>
                  </div>
                </div>

                {/* Col 2: Location */}
                <div className="col-span-1 lg:col-span-2">
                  <span className="text-[9px] font-mono text-brand-muted block lg:hidden uppercase tracking-wider">[LOCATION]:</span>
                  <p className="text-xs font-bold text-brand-text uppercase tracking-wide">
                    {creator.location}
                  </p>
                </div>

                {/* Col 3: Niche & Audience */}
                <div className="col-span-1 lg:col-span-2 space-y-1 text-left">
                  <span className="text-[9px] font-mono text-brand-muted block lg:hidden uppercase tracking-wider">[NICHE & AUDIENCE]:</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-brand-bg px-2 py-0.5 border border-brand-border rounded text-[9px] font-mono font-black uppercase text-brand-text">
                      {creator.niche}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-muted font-sans leading-none">
                    Audience: <span className="font-semibold text-brand-text">{creator.audience.split(' ')[0]}</span>
                  </p>
                </div>

                {/* Col 4: Metrics */}
                <div className="col-span-1 lg:col-span-2 flex items-center justify-between lg:justify-around py-2 lg:py-0 border-y lg:border-none border-brand-border/40">
                  <div>
                    <span className="text-[9px] font-mono text-brand-muted block uppercase tracking-wider">Followers:</span>
                    <span className="text-xs font-sans font-black text-brand-text">{creator.followers}</span>
                  </div>
                  <div className="text-right lg:text-center">
                    <span className="text-[9px] font-mono text-brand-muted block uppercase tracking-wider">Engagement:</span>
                    <span className="text-xs font-mono font-black text-brand-terracotta">{creator.engagement}%</span>
                  </div>
                </div>

                {/* Col 5: Rate & CTA */}
                <div className="col-span-1 lg:col-span-2 flex items-center justify-between lg:justify-end gap-4 text-right">
                  <div className="text-left lg:text-right">
                    <span className="text-[9px] font-mono text-brand-muted block uppercase tracking-wider">DIRECT RATE:</span>
                    <span className="text-sm font-sans font-black text-brand-text">${creator.rate} <span className="text-[9px] font-sans font-normal text-brand-muted">/ video</span></span>
                  </div>
                  <button
                    onClick={() => { setSelectedCreator(creator); setBookingStep(1); }}
                    className="px-5 py-3 rounded-full bg-brand-text text-brand-bg hover:bg-brand-terracotta hover:text-white font-sans font-bold text-[9px] tracking-wider uppercase transition-colors duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Hire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Sliding Booking Drawer Panel */}
        {selectedCreator && (
          <div className="fixed inset-0 bg-brand-text/50 backdrop-blur-sm z-50 flex justify-end">
            <div className="w-full max-w-xl bg-brand-bg h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between border-l border-brand-border shadow-2xl relative transition-transform duration-500">
              
              {/* Close Button */}
              <button
                onClick={handleCloseDrawer}
                className="absolute top-6 right-6 p-2 rounded-full bg-brand-card border border-brand-border text-brand-text hover:bg-brand-terracotta hover:text-white transition-colors z-30 shadow-md cursor-pointer"
              >
                Close ×
              </button>

              {/* Drawer Content */}
              <div className="flex-grow">
                {/* Header Profile Info */}
                <div className="flex items-center space-x-4 mb-8">
                  <img
                    src={selectedCreator.avatar}
                    alt={selectedCreator.name}
                    className="w-14 h-14 rounded-full object-cover border border-brand-border"
                  />
                  <div>
                    <h3 className="font-sans font-black text-base uppercase tracking-wider text-brand-text">Direct Booking</h3>
                    <p className="text-xs text-brand-muted mt-0.5">Creator: <span className="font-bold text-brand-text">{selectedCreator.name}</span> (${selectedCreator.rate}/video)</p>
                  </div>
                </div>

                {/* Interactive Flow Progress Steps */}
                <div className="flex items-center justify-between mb-10 max-w-sm mx-auto text-[10px] font-black uppercase tracking-wider text-brand-muted border-b border-brand-border pb-4">
                  <div className={`flex items-center space-x-1.5 ${bookingStep >= 1 ? 'text-brand-terracotta' : ''}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] ${bookingStep >= 1 ? 'bg-brand-card border-brand-terracotta' : 'border-brand-border'}`}>1</span>
                    <span>Package</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-border" />
                  <div className={`flex items-center space-x-1.5 ${bookingStep >= 2 ? 'text-brand-terracotta' : ''}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] ${bookingStep >= 2 ? 'bg-brand-card border-brand-terracotta' : 'border-brand-border'}`}>2</span>
                    <span>Brief</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-border" />
                  <div className={`flex items-center space-x-1.5 ${bookingStep >= 3 ? 'text-brand-terracotta' : ''}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] ${bookingStep >= 3 ? 'bg-brand-card border-brand-terracotta' : 'border-brand-border'}`}>3</span>
                    <span>Summary</span>
                  </div>
                </div>

                {/* Step 1: Package Selection */}
                {bookingStep === 1 && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-sans font-black text-[14px] uppercase tracking-wider text-brand-text mb-4">Select Video Package Quantity</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Select how many custom vertical UGC video creatives you need Sarah to shoot. Testing multiple scripts increases conversion.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { qty: 1, label: '1 Video asset', saving: 'Base tier' },
                        { qty: 3, label: '3 Video assets', saving: 'Angle Hook Matrix test' },
                        { qty: 5, label: '5 Video assets', saving: 'Scaling campaign refresh' }
                      ].map((pkg) => (
                        <button
                          key={pkg.qty}
                          type="button"
                          onClick={() => setFormData({ ...formData, videoQuantity: pkg.qty })}
                          className={`p-5 rounded-2xl border text-left flex justify-between items-center transition-all ${
                            formData.videoQuantity === pkg.qty
                              ? 'bg-brand-card border-brand-terracotta shadow-sm ring-2 ring-brand-terracotta/10'
                              : 'bg-brand-card border-brand-border hover:bg-brand-bg/50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-brand-text">{pkg.label}</p>
                            <p className="text-[10px] text-brand-muted mt-0.5">{pkg.saving}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-sans font-black text-brand-text">${selectedCreator.rate * pkg.qty}</p>
                            <p className="text-[9px] text-brand-terracotta font-bold uppercase tracking-wider">${selectedCreator.rate}/video</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="w-full py-4 mt-6 rounded-full bg-brand-text text-brand-bg hover:bg-brand-terracotta hover:text-white font-sans font-bold text-[10px] tracking-widest uppercase transition-all flex items-center justify-center space-x-1"
                    >
                      <span>Continue to Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2: Briefing Details */}
                {bookingStep === 2 && (
                  <div className="space-y-5 text-left">
                    <h4 className="font-sans font-black text-[14px] uppercase tracking-wider text-brand-text mb-2">Campaign Script Briefing</h4>
                    
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-muted mb-2">Brand Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gymshark"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-brand-border bg-white text-brand-text text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-muted mb-2">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-brand-border bg-white text-brand-text text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-muted mb-2">Product Landing Page URL</label>
                      <input
                        type="url"
                        placeholder="https://brand.com/product"
                        value={formData.productLink}
                        onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-brand-border bg-white text-brand-text text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-muted mb-2">Creative Direction Brief</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="ASMR unboxing, skincare routine transformation, etc..."
                        value={formData.brief}
                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-brand-border bg-white text-brand-text text-xs outline-none focus:border-brand-terracotta resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-4 rounded-full border border-brand-border text-brand-text hover:bg-brand-card font-sans font-bold text-[10px] tracking-widest uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!formData.brandName || !formData.email || !formData.brief}
                        className="w-2/3 py-4 rounded-full bg-brand-text text-brand-bg hover:bg-brand-terracotta hover:text-white font-sans font-bold text-[10px] tracking-widest uppercase transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center space-x-1"
                      >
                        <span>Continue to Summary</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Checkout Summary */}
                {bookingStep === 3 && (
                  <div className="space-y-6 text-left">
                    <h4 className="font-sans font-black text-[14px] uppercase tracking-wider text-brand-text mb-4">Direct Billing Summary</h4>

                    {/* Direct Highlight */}
                    <div className="bg-brand-card border border-brand-border p-4.5 rounded-2xl mb-6">
                      <div className="flex items-center space-x-2 text-brand-terracotta mb-1">
                        <ShieldCheck className="w-4.5 h-4.5" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">No Markup Agency Guarantee</span>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        You pay the creator rate directly. We only collect a flat booking coordination fee of $19.
                      </p>
                    </div>

                    {/* Cost Calculation Panel */}
                    <div className="bg-brand-card border border-brand-border p-5 rounded-2xl space-y-3.5 text-xs shadow-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-muted font-sans font-medium">Creator Fee (${selectedCreator.rate} × {formData.videoQuantity})</span>
                        <span className="font-bold text-brand-text">${selectedCreator.rate * formData.videoQuantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted font-sans font-medium">UGC-Direct Processing Fee</span>
                        <span className="font-bold text-brand-text">$19</span>
                      </div>
                      <div className="h-[1px] bg-brand-border my-2"></div>
                      <div className="flex justify-between font-sans font-black text-sm text-brand-text uppercase tracking-wider">
                        <span>Total Due</span>
                        <span>${(selectedCreator.rate * formData.videoQuantity) + 19}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Included Deliverables:</p>
                      <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-brand-text">
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-brand-terracotta stroke-[3px]" />
                          <span>Direct-Response Scripting</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-brand-terracotta stroke-[3px]" />
                          <span>Professional Editing</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-brand-terracotta stroke-[3px]" />
                          <span>Caption/Subtitles graphic</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-brand-terracotta stroke-[3px]" />
                          <span>90-Day Whitelist usage</span>
                        </li>
                      </ul>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-1/3 py-4 rounded-full border border-brand-border text-brand-text hover:bg-brand-card font-sans font-bold text-[10px] tracking-widest uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-4 rounded-full bg-brand-terracotta hover:bg-brand-text text-white font-sans font-bold text-[10px] tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-1.5"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Confirm Booking</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 4: Finished Done */}
                {bookingStep === 4 && (
                  <div className="py-16 text-center flex flex-col items-center justify-center space-y-5">
                    <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-brand-terracotta shadow-sm">
                      <UserCheck className="w-10 h-10" />
                    </div>
                    <h4 className="font-sans font-black text-lg uppercase tracking-wider text-brand-text">Booking Confirmed!</h4>
                    <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
                      We have processed the brief for <span className="font-bold text-brand-text">{selectedCreator.name}</span>. You will receive script layout drafts at <span className="font-bold text-brand-text">{formData.email}</span> in less than 24 hours.
                    </p>
                    
                    <div className="bg-brand-card border border-brand-border p-4 rounded-2xl text-[10px] text-brand-muted max-w-xs space-y-1 mt-4">
                      <p>✓ Order reference ID: #UGC-{Math.floor(Math.random() * 90000) + 10000}</p>
                      <p>✓ Product shipping brief emailed</p>
                    </div>

                    <button
                      onClick={handleCloseDrawer}
                      className="px-8 py-3.5 mt-8 rounded-full border border-brand-border text-brand-text hover:bg-brand-card font-sans font-bold text-[10px] tracking-widest uppercase cursor-pointer"
                    >
                      Close Panel
                    </button>
                  </div>
                )}
              </div>

              {/* Guarantees */}
              {bookingStep !== 4 && (
                <div className="mt-8 pt-6 border-t border-brand-border text-center text-[10px] text-brand-muted flex flex-col space-y-1">
                  <p>✓ 100% Satisfaction SLA Guarantee: re-shoot if brief directions are missed.</p>
                  <p>✓ Secure direct checkout, zero agent retainers, cancel anytime.</p>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
