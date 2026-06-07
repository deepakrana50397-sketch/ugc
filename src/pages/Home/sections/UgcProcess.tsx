import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Search, PencilLine, PenTool, Tv, Video, Share2, Sparkles } from 'lucide-react';

interface ProcessStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  deliverables: string[];
  description: string;
}

export default function UgcProcess() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const steps: ProcessStep[] = [
    {
      id: '01',
      icon: <Compass className="w-5 h-5 text-brand-terracotta" />,
      title: 'Product & Brand Story Extraction',
      deliverables: ['USPs Extraction', 'Founder Interviews', 'Angles Blueprint'],
      description: 'We run structured interviews to extract what makes your product unique, translating features into visual hooks.'
    },
    {
      id: '02',
      icon: <Search className="w-5 h-5 text-brand-terracotta" />,
      title: 'Competitor & Angle Research',
      deliverables: ['Ad Account Auditing', 'Comment Mining', 'Hook Audits'],
      description: 'We audit competitor ad creative library logs, check visual structures, and discover what angle is converting right now.'
    },
    {
      id: '03',
      icon: <PencilLine className="w-5 h-5 text-brand-terracotta" />,
      title: 'Visual Storyboarding & Matching',
      deliverables: ['Storyboard Drafts', 'Creator Selection briefs', 'Visual Framing specs'],
      description: 'We storyboard the visual hooks, body demonstration, and closing CTA formats before writing the copy.'
    },
    {
      id: '04',
      icon: <PenTool className="w-5 h-5 text-brand-terracotta" />,
      title: 'Direct-Response Scripting',
      deliverables: ['Hook Variation Matrices', 'Native Auditory pacing', 'Callouts Copy'],
      description: 'We construct direct-response copy designed to stop scrolling, retaining native TikTok/Reels auditory pacing.'
    },
    {
      id: '05',
      icon: <Tv className="w-5 h-5 text-brand-terracotta" />,
      title: 'Computer Graphics & Overlays',
      deliverables: ['Native caption rendering', 'Watch-time bars', 'Skeuomorphic text blocks'],
      description: 'We add high-impact progress bars, native text tags, and vector graphics to maximize watch time.'
    },
    {
      id: '06',
      icon: <Video className="w-5 h-5 text-brand-terracotta" />,
      title: 'Vetted Shooting & Editing',
      deliverables: ['Creator Seeding', 'Native Mobile Editing', 'Splicing QC check'],
      description: 'Creators shoot footage based on storyboards, and our in-house team splices content with hook effects.'
    },
    {
      id: '07',
      icon: <Share2 className="w-5 h-5 text-brand-terracotta" />,
      title: 'Nano & Micro Seeding',
      deliverables: ['Creator Seeding', 'Spark/Partnership Ads', 'Direct Whitelisting'],
      description: 'We coordinate influencer whitelisting and direct seeding setups to run ads through creator handles.'
    }
  ];

  return (
    <section 
      id="process" 
      className="py-32 px-6 md:px-12 bg-brand-dark-green relative overflow-hidden text-white border-b border-brand-border"
    >
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-brand-terracotta filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-moss filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10 relative">
        
        {/* Left Side: Editorial Context & visual status block */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          <div className="inline-flex items-center space-x-2 bg-brand-moss/50 border border-brand-border/10 px-4 py-2 rounded-full text-[10px] font-mono font-black text-brand-bg uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>[ DYNAMIC WORKFLOW ]</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight">
            How we get it done, <br />
            <span className="italic font-normal text-brand-terracotta">step by step.</span>
          </h2>

          <p className="text-sm md:text-base text-brand-border/80 font-sans leading-relaxed">
            Hover over any process card on the right to examine deliverables, operational parameters, and how we extract direct response performance at each stage.
          </p>

          {/* Interactive display board corresponding to the active step */}
          <motion.div 
            key={activeStepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-[24px] bg-brand-moss/25 border border-brand-border/10 space-y-6 hidden lg:block text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-brand-terracotta uppercase">
                [ FOCUS WORKFLOW: STAGE {steps[activeStepIdx].id} ]
              </span>
              <span className="w-8 h-8 rounded-full bg-brand-dark-green flex items-center justify-center border border-brand-border/10">
                {steps[activeStepIdx].icon}
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wider">
                {steps[activeStepIdx].title}
              </h3>
              <p className="text-xs text-brand-border/90 leading-relaxed font-sans">
                {steps[activeStepIdx].description}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-brand-border/10">
              <span className="font-mono text-[9px] text-brand-border/60 block uppercase">STAGE DELIVERABLES LOG:</span>
              <div className="flex flex-wrap gap-1.5">
                {steps[activeStepIdx].deliverables.map((del, idx) => (
                  <span 
                    key={idx}
                    className="bg-brand-dark-green text-[9px] font-mono font-black uppercase text-brand-bg px-2.5 py-1 rounded border border-brand-border/10"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Interactive Stepper Accordion list */}
        <div className="lg:col-span-7 space-y-4 w-full">
          {steps.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStepIdx(idx)}
                className={`w-full rounded-2xl border transition-all duration-300 text-left overflow-hidden cursor-pointer ${
                  isActive 
                    ? 'bg-brand-moss/45 border-brand-terracotta/40 shadow-lg' 
                    : 'bg-brand-moss/10 border-brand-border/10 hover:border-brand-border/30'
                }`}
              >
                {/* Step trigger header */}
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <div className="flex items-center space-x-5">
                    <span className={`font-serif italic text-3xl font-extrabold transition-colors duration-300 ${
                      isActive ? 'text-brand-terracotta' : 'text-brand-border/40'
                    }`}>
                      {step.id}
                    </span>
                    <h3 className="font-sans font-black text-sm md:text-base uppercase tracking-wider text-white">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Circle status indicator */}
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'border-brand-terracotta bg-brand-terracotta text-white' : 'border-brand-border/20'
                  }`}>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    ) : (
                      <span className="text-[10px] text-brand-border/40">+</span>
                    )}
                  </div>
                </div>

                {/* Animated expandable content block (Framer Motion) */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-brand-border/10 space-y-4">
                    <p className="text-xs md:text-sm text-brand-border/90 leading-relaxed font-sans pt-4">
                      {step.description}
                    </p>
                    
                    {/* Mobile deliverables view */}
                    <div className="flex flex-wrap gap-1.5 lg:hidden pt-2">
                      {step.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="bg-brand-dark-green text-[9px] font-mono font-black uppercase text-brand-bg px-2.5 py-1 rounded border border-brand-border/10"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
