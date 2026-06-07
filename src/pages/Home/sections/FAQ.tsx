import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'What makes iGigster different from traditional agencies?',
      answer: 'Traditional agencies act as middlemen—they buy video content from creators for $150 and sell it to you for $400, pocketing a large markup. iGigster is a direct-hiring directory. You pay creators their exact, affordable rates directly. We only charge a small flat booking fee ($19) to coordinate, script, and edit the final videos, saving you up to 60% on your content budget.'
    },
    {
      question: 'How do you vet creators on your website?',
      answer: 'We accept less than 8% of creators who apply. We test each creator on: camera sensor quality (1080p/4K native mobile), natural lighting setup, voice articulation, hook pacing, and editing awareness. Every creator listed has completed at least 3 successful direct-response campaigns.'
    },
    {
      question: 'What is the typical turnaround time?',
      answer: 'Our standard turnaround is 6 to 7 working days. The timeline begins the moment the creator receives your physical product. This includes 2 days for creator shooting, 2 days for our professional editors to apply graphics/subtitles, and 1 day for final QC check before delivery.'
    },
    {
      question: 'How does whitelisting / influencer seeding work?',
      answer: 'All creators on our platform support seeding. You can run ads directly through their social handles (Spark Ads on TikTok or Partnership Ads on Instagram). The standard usage license covers 90 days of paid distribution, with options to extend for unlimited whitelisting directly in the booking panel.'
    },
    {
      question: 'What if I am not satisfied with the final video?',
      answer: 'We offer a 100% satisfaction guarantee. If the creator misses a script detail or mispronounces a brand term outlined in the creative brief, they will re-shoot the footage for free. If you want to adjust the pacing, captions, or music, our in-house editing team provides one round of edits free of charge.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-6 md:px-12 bg-brand-bg relative border-b border-brand-border">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-card border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-text uppercase tracking-widest">
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif font-medium text-4xl sm:text-5xl text-brand-text leading-tight tracking-tight">
            Frequently asked<br />
            <span className="italic font-normal text-brand-terracotta">questions.</span>
          </h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-muted">
            Everything you need to know about creator whitelisting, scripting rights, and turnaround times.
          </p>
        </div>

        {/* Accordions (Linen card base with thin borders) */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-brand-card border border-brand-border rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between space-x-4 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm md:text-base text-brand-text uppercase tracking-wide">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-brand-card text-brand-terracotta border-brand-terracotta/40' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                {/* Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-brand-border/40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-6 md:p-8 text-xs md:text-sm leading-relaxed text-brand-muted font-sans bg-brand-bg/10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
