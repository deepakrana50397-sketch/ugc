import { useEffect, useRef } from 'react';
import { Search, Compass, PencilLine, PenTool, Tv, Video, Share2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  deliverables: string[];
  description: string;
}

export default function UgcProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps: ProcessStep[] = [
    {
      icon: <Compass className="w-5 h-5 text-brand-terracotta" />,
      title: 'Product & Brand Story',
      deliverables: ['Product USPs', 'Founder Origin Story', 'Consumer Hook Points'],
      description: 'We run structured interviews to extract what makes your product unique, translating features into visual hooks.'
    },
    {
      icon: <Search className="w-5 h-5 text-brand-terracotta" />,
      title: 'Competitor & Angle Research',
      deliverables: ['Ad Account Spying', 'Comment Mining', 'Hook Variation Auditing'],
      description: 'We audit competitor ad creative library logs, check visual structures, and discover what is working right now.'
    },
    {
      icon: <PencilLine className="w-5 h-5 text-brand-terracotta" />,
      title: 'Content Planning',
      deliverables: ['Visual Storyboarding', 'Creator Matching Briefs', 'Angle Outlines'],
      description: 'We storyboard the visual hooks, body demonstration, and closing CTA formats before writing the copy.'
    },
    {
      icon: <PenTool className="w-5 h-5 text-brand-terracotta" />,
      title: 'Direct-Response Scripting',
      deliverables: ['Native Script Writing', 'Hook Variation Matrices', 'Auditory cues'],
      description: 'We construct direct-response copy designed to stop scrolling, retaining native TikTok/Reels auditory pacing.'
    },
    {
      icon: <Tv className="w-5 h-5 text-brand-terracotta" />,
      title: 'Computer Graphics & Overlays',
      deliverables: ['Captions Rendering', 'Text-Banners design', 'Visual callouts'],
      description: 'We add high-impact progress bars, native text tags, and vector graphics to maximize watch time.'
    },
    {
      icon: <Video className="w-5 h-5 text-brand-terracotta" />,
      title: 'Vetted Shooting & Editing',
      deliverables: ['Creator Seeding', 'Native Mobile Editing', 'Splicing QC'],
      description: 'Creators shoot footage based on storyboards, and our in-house team splices content with hook effects.'
    },
    {
      icon: <Share2 className="w-5 h-5 text-brand-terracotta" />,
      title: 'Nano & Micro Seeding',
      deliverables: ['Creator Seeding Seeding', 'Spark/Partnership Ads', 'Direct Whitelisting'],
      description: 'We coordinate influencer whitelisting and direct seeding setups to run ads through creator handles.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in sticky panel
      gsap.from('.process-sticky', {
        scrollTrigger: {
          trigger: '.process-sticky',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Stagger timeline bento cards
      const cards = gsap.utils.toArray('.process-framer-card');
      cards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-32 px-6 md:px-12 bg-brand-bg border-b border-brand-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Sticky Title (Viral template: Serif headers and Sand pill tags) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 text-left process-sticky">
          <div className="inline-flex items-center space-x-1.5 bg-brand-card border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-text uppercase tracking-widest">
            <span>Our Services</span>
          </div>
          
          <h2 className="font-serif font-medium text-4xl sm:text-5xl text-brand-text leading-[1.08] tracking-tight">
            How we grow<br />
            your brand.
          </h2>
          
          <p className="text-sm md:text-base text-brand-muted font-sans leading-relaxed max-w-sm">
            We operate in a single niche: vertical video UGC. We manage the entire pipeline from story research to influencer whitelisting.
          </p>

          {/* SLA Card */}
          <div className="p-6 rounded-[20px] bg-brand-card border border-brand-border max-w-sm shadow-sm space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-ping"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text">Creative Guarantee</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              We write complete storyboards and script copies for your approval before creators start shooting.
            </p>
            <div className="flex items-center text-xs font-bold text-brand-terracotta space-x-1.5">
              <span>Direct Rates Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Right Column: Bento Cards (Linen background with thin borders) */}
        <div className="lg:col-span-7 space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="process-framer-card framer-card flex flex-col md:flex-row gap-6 items-start text-left"
            >
              {/* index number overlay */}
              <span className="absolute right-6 top-3 font-serif italic text-6xl font-extrabold text-brand-border/40 select-none">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-[16px] bg-brand-bg border border-brand-border flex items-center justify-center flex-shrink-0 shadow-sm">
                {step.icon}
              </div>

              {/* Copy */}
              <div className="space-y-2.5 flex-grow max-w-md">
                <h3 className="font-sans font-bold text-[15px] tracking-wide text-brand-text uppercase">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-brand-muted font-sans">
                  {step.description}
                </p>
                
                {/* Deliverables tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {step.deliverables.map((del, dIdx) => (
                    <span 
                      key={dIdx}
                      className="bg-brand-bg text-[9px] font-bold uppercase tracking-wider text-brand-text/80 border border-brand-border px-2.5 py-1 rounded-md"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
