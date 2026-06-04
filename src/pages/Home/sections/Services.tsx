import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  title: string;
  description: string;
  videoUrl: string;
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services: ServiceCard[] = [
    {
      title: 'Content Creation',
      description:
        'Short-form video, UGC, reels, and visuals designed to stop the scroll and spark engagement.',
      videoUrl:
        'https://framerusercontent.com/assets/SCuqi0qyfpukKLtZm0jURfE.mp4',
    },
    {
      title: 'Social Management',
      description:
        'We handle your content calendar, posting, and day-to-day management of your socials.',
      videoUrl:
        'https://framerusercontent.com/assets/64ZMhO5aQtuzPw6cPEGQKIEos.mp4',
    },
    {
      title: 'Paid Media',
      description:
        'We build and manage targeted ad campaigns that turn attention into results and help you scale.',
      videoUrl:
        'https://framerusercontent.com/assets/u0e0HQVXrB8r4Av9RYEjAmZ7rw.mp4',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge fade-in
      gsap.from('.services-badge', {
        scrollTrigger: {
          trigger: '.services-badge',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Heading fade-in
      gsap.from('.services-heading', {
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Stagger service cards
      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 md:py-36 px-6 md:px-12 bg-brand-bg border-b border-brand-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="services-badge inline-flex items-center bg-brand-card border border-brand-border px-5 py-2 rounded-full text-[11px] font-bold text-brand-text uppercase tracking-widest">
            Services
          </div>
        </div>

        {/* Heading */}
        <h2 className="services-heading font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-brand-text text-center leading-[1.08] tracking-tight mb-16 md:mb-20">
          How we can
          <br />
          help you <span className="font-serif italic font-normal">grooow</span>
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-10 flex flex-col justify-between transition-all duration-500 hover:border-brand-terracotta/40 hover:-translate-y-2 shadow-sm"
            >
              <div>
                {/* Video Asset Area */}
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black mb-10 shadow-sm">
                  <video
                    src={service.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Text Area */}
                <div className="space-y-4 text-left">
                  <h3 className="font-sans font-extrabold text-2xl md:text-[26px] text-brand-text tracking-tight leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-brand-muted font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
