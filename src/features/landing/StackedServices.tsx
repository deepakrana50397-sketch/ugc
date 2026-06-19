'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import TextReveal from '@/components/animation/TextReveal';
import ScrollStack, { ScrollStackItem } from '@/components/animation/ScrollStack';

export default function StackedServices() {
  const servicesData = [
    {
      id: '01',
      tabTitle: 'SERVICE / 01',
      mobileTabTitle: '01',
      title: 'Short-Form Production',
      description: 'We produce high impact short form videos designed for how people actually consume content on social platforms. Built to grab attention.',
      stat: '242+',
      statLabel: 'Long Form Videos Clipped',
      bgColor: 'rgb(161, 143, 255)', // Purple/Lavender
      textColor: 'rgb(28, 25, 23)',
      image: 'https://framerusercontent.com/images/IQt3n4yCfVlf2LjLAgR6UTG97I.jpg?width=954&height=1084',
    },
    {
      id: '02',
      tabTitle: 'SERVICE / 02',
      mobileTabTitle: '02',
      title: 'Creator & UGC Campaigns',
      description: 'We turn data into direction. By analyzing performance, we refine formats, hooks, and storytelling to scale what works and cut what doesn\'t.',
      stat: '50M+',
      statLabel: 'Total Impressions',
      bgColor: 'rgb(255, 158, 237)', // Pink/Magenta
      textColor: 'rgb(28, 25, 23)',
      image: 'https://framerusercontent.com/images/QEvXFU7LLQGido9vvsIBugEh0.jpg?width=958&height=1084',
    },
    {
      id: '03',
      tabTitle: 'SERVICE / 03',
      mobileTabTitle: '03',
      title: 'Social Media Management',
      description: 'From content planning to publishing and optimization, we manage your social presence with consistency and intent. Relax and we handle the rest.',
      stat: '50M+',
      statLabel: 'Total Impressions',
      bgColor: 'rgb(214, 207, 199)', // Beige/Stone
      textColor: 'rgb(28, 25, 23)',
      image: 'https://framerusercontent.com/images/awOeL0yKNFgvqogsdV27KvNegc.jpg?width=958&height=1084',
    },
    {
      id: '04',
      tabTitle: 'SERVICE / 04',
      mobileTabTitle: '04',
      title: 'Performance Creative Strategy',
      description: 'We research, test, iterate, and scale creative based on real world data. We\'re the first agency that doesn\'t guess, no vibes, just what performs.',
      stat: '150%',
      statLabel: 'Increase in Leads',
      bgColor: 'rgb(157, 255, 130)', // Lime Green
      textColor: 'rgb(28, 25, 23)',
      image: 'https://framerusercontent.com/images/egBQUlNKV8uJcmRSjCVVWJPTG9I.jpg?width=958&height=1084',
    }
  ];

  const handleTabClick = (index: number) => {
    const cards = document.querySelectorAll('.scroll-stack-card');
    const card = cards[index] as HTMLElement;
    if (card) {
      const stackPositionPx = 120; // Pins at 120px sticky offset
      const itemStackDistance = 0; // Stacks exactly flush
      
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + window.scrollY;
      
      const targetScrollY = cardTop - stackPositionPx - (itemStackDistance * index);
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="stacked-services"
      className="relative w-full flex flex-col items-center border-b border-stone-200"
      style={{
        paddingTop: '120px',
        paddingBottom: '160px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Decorative Background Glow */}
      <div 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.02) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1080px] w-full mx-auto relative z-10 flex flex-col items-center gap-16 md:gap-24">
        
        {/* Section Header */}
        <div className="text-center flex flex-col gap-5 items-center">
          <div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: 'rgba(79, 70, 229, 0.06)',
              borderColor: 'rgba(79, 70, 229, 0.15)',
              color: 'rgb(79, 70, 229)',
            }}
          >
            <Sparkles size={13} />
            <span>Creative Solutions</span>
          </div>

          <div className="flex flex-col gap-2">
            <TextReveal
              text="Services designed to convert."
              tag="h2"
              mode="words"
              className="text-foreground text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-none"
              style={{
                fontFamily: 'var(--font-display)',
              }}
            />
            <TextReveal
              text="Engineered to scale."
              tag="h2"
              mode="words"
              delay={0.25}
              className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-none"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'rgb(219, 39, 119)',
              }}
            />
          </div>
          
          <p 
            className="text-stone-600 max-w-[600px] mx-auto text-base md:text-lg leading-relaxed mt-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A conversion-first post-production pipeline and performance creative engine built to scale your brand’s content cycles.
          </p>
        </div>

        {/* ScrollStack Component Integration */}
        <ScrollStack
          className="w-full"
          useWindowScroll={true}
          itemDistance={320}      // Spacing margin between cards in flow
          itemScale={0.04}        // Incremental scale difference per layer
          itemStackDistance={0}   // Card bodies stack exactly flush
          stackPosition={120}     // Pins cards at 120px sticky top
          scaleEndPosition={60}   // End scale threshold
          baseScale={0.88}        // Initial scale of the bottom card
          rotationAmount={0}      // Keep cards flat/unrotated
          blurAmount={0}          // Keep text crisp/unblurred
        >
          {servicesData.map((service, index) => (
            <ScrollStackItem
              key={service.id}
              itemClassName="pointer-events-none"
              style={{
                height: 'auto',
                boxShadow: 'none',
                margin: 0,
                borderRadius: 0,
                padding: 0,
              }}
            >
              {/* Folder Tab: Renders the tab, always visible at the top, horizontally offset */}
              <div className="w-full relative h-[44px] pointer-events-none">
                <button
                  onClick={() => handleTabClick(index)}
                  className="absolute bottom-0 h-[44px] flex items-center justify-center font-bold tracking-wider select-none w-[70px] text-[10px] md:w-[216px] md:text-xs md:tracking-widest cursor-pointer pointer-events-auto hover:brightness-95 transition-all border-none outline-none"
                  style={{
                    backgroundColor: service.bgColor,
                    color: service.textColor,
                    fontFamily: 'var(--font-display)',
                    left: `calc(var(--tab-start) + var(--tab-offset) * ${index})`,
                    borderTopLeftRadius: '32px',
                    borderTopRightRadius: '32px',
                  }}
                >
                  <span className="hidden md:inline">{service.tabTitle}</span>
                  <span className="inline md:hidden">{service.mobileTabTitle}</span>
                </button>
              </div>

              {/* Card Body */}
              <div
                style={{
                  backgroundColor: service.bgColor,
                  color: service.textColor,
                  borderRadius: '32px',
                  padding: '32px',
                  minHeight: 'var(--card-height)',
                }}
                className="pointer-events-auto w-full shadow-[0_25px_60px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center overflow-hidden"
              >
                {/* Left Side: Copy & Large Stat */}
                <div className="flex flex-col h-full justify-between gap-12 lg:gap-16 text-left">
                  <div className="flex flex-col gap-6 md:gap-8">
                    <h3
                      className="text-[34px] md:text-[47px] lg:text-[61px] font-black leading-[1.02] tracking-tighter max-w-[500px]"
                      style={{ fontFamily: 'var(--font-display)', color: 'rgb(28, 25, 23)' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-base md:text-lg lg:text-[19px] leading-[1.5] max-w-[480px] opacity-75"
                      style={{ fontFamily: 'var(--font-sans)', color: 'rgb(28, 25, 23)' }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Stat Wrapper */}
                  <div className="flex flex-col mt-auto">
                    <span
                      className="text-[54px] md:text-[86px] lg:text-[99px] font-black tracking-tighter leading-none"
                      style={{ fontFamily: 'var(--font-display)', color: 'rgb(28, 25, 23)' }}
                    >
                      {service.stat}
                    </span>
                    <span
                      className="text-[12px] md:text-[13.5px] font-bold tracking-tight opacity-90 mt-2"
                      style={{ fontFamily: 'var(--font-sans)', color: 'rgb(28, 25, 23)' }}
                    >
                      {service.statLabel}
                    </span>
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="relative w-full aspect-[4/5] md:aspect-[0.9] lg:aspect-[0.85] rounded-[32px] overflow-hidden bg-stone-100 shadow-sm border border-black/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
}
