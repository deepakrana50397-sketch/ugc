import { Check, Star, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onNavigate: (sectionId: string) => void;
}

export default function PricingPackages({ onNavigate }: PricingProps) {
  const packages = [
    {
      name: 'Starter Package',
      price: '$150',
      period: 'per video asset',
      total: '1 video total',
      description: 'Ideal for DTC brands testing direct-response scroll hooks.',
      features: [
        '1 Vetted Creator profile matching',
        'Direct-response script copywriting',
        'Mobile-native professional editing',
        'TikTok-native caption overlays',
        '90-day Paid usage license',
        '7-day turnaround delivery'
      ],
      popular: false,
      comparison: { agency: '$350', saving: 'Save 57%' },
      cta: 'Book Starter Creative'
    },
    {
      name: 'Growth (Most Popular)',
      price: '$135',
      period: 'per video asset',
      total: '$405 total (3 videos)',
      description: 'Best choice. Test multiple creator handles & script hooks.',
      features: [
        '3 Vetted Creators matching (diverse)',
        '3 Custom direct-response scripts',
        'Competitor ad spying & hook audit',
        'Custom graphics, captions & SFX',
        'Full Whitelist partnership licensing',
        '6-day turnaround priority delivery'
      ],
      popular: true,
      comparison: { agency: '$950', saving: 'Save 57%' },
      cta: 'Book Growth Package'
    },
    {
      name: 'Scale Package',
      price: '$120',
      period: 'per video asset',
      total: '$600 total (5 videos)',
      description: 'Built for monthly creative testing & high ad-account scaling.',
      features: [
        '5 Vetted Creators matching (diverse)',
        '5 Script copywriting drafts + variations',
        'Full brand audio spying & audit',
        'Graphics, overlays, transition layouts',
        'Unlimited organic whitelist usage',
        'Dedicated brief asset manager',
        'Fast 5-day turnaround delivery'
      ],
      popular: false,
      comparison: { agency: '$1,500', saving: 'Save 60%' },
      cta: 'Book Scale Package'
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 md:px-12 bg-brand-bg relative border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-card border border-brand-border px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-text uppercase tracking-widest">
            <span>Transparent Pricing Matrix</span>
          </div>
          <h2 className="font-serif font-medium text-4xl sm:text-5xl text-brand-text leading-tight tracking-tight">
            Transparent pricing.<br />
            <span className="italic font-normal text-brand-terracotta">No agency retainer fees.</span>
          </h2>
          <p className="text-sm md:text-base text-brand-muted font-sans leading-relaxed">
            Order as a one-off campaign or refresh assets monthly. Vetted creator rates are passed directly with zero agency markup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto pt-8">
          {packages.map((pkg, index) => {
            const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5'];
            const cardRotation = rotations[index % rotations.length];
            const tapeClass = index % 2 === 0 ? 'washi-tape-top-left' : 'washi-tape-top-right';

            return (
              <div
                key={index}
                className={`paper-card p-10 rounded-[32px] flex flex-col justify-between transition-all duration-300 ${cardRotation} ${
                  pkg.popular 
                    ? 'border-brand-terracotta/80 shadow-md ring-1 ring-brand-terracotta/20 scale-[1.01] z-10' 
                    : 'border-brand-border'
                }`}
              >
                {/* Decorative Washi Tape strip */}
                <div className={`washi-tape ${tapeClass}`} />

                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-6 right-6 bg-brand-terracotta text-white px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 shadow-sm z-20">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Best Value</span>
                  </div>
                )}

                {/* Package Header */}
                <div>
                  <h3 className="font-sans font-black text-base uppercase tracking-wider text-brand-text text-left">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-brand-muted text-left mt-1 max-w-[200px] leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price block */}
                  <div className="my-8 text-left">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-sans font-black text-4xl md:text-5xl text-brand-text">
                        {pkg.price}
                      </span>
                      <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        / {pkg.period}
                      </span>
                    </div>
                    <p className="text-[10px] font-black text-brand-terracotta mt-2 tracking-widest uppercase">
                      {pkg.total}
                    </p>
                  </div>

                  {/* Direct price comparison */}
                  <div className="bg-brand-bg/50 border border-brand-border p-3.5 rounded-xl text-left text-xs mb-6 flex items-center justify-between">
                    <span className="text-brand-muted font-sans font-semibold text-[10px] uppercase tracking-wider">Agency Rate:</span>
                    <div className="text-right text-[10px] font-bold">
                      <span className="line-through text-brand-muted mr-1.5">{pkg.comparison.agency}</span>
                      <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 uppercase tracking-widest">{pkg.comparison.saving}</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-brand-border my-6"></div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 text-left">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-sm text-brand-text">
                        <div className="w-5 h-5 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center flex-shrink-0 text-brand-terracotta mt-0.5">
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span className="font-sans leading-tight font-medium text-xs text-brand-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onNavigate('creators')}
                  className={`w-full py-4 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? 'bg-brand-terracotta hover:bg-brand-text text-white shadow-sm'
                      : 'bg-brand-text hover:bg-brand-terracotta text-brand-bg hover:text-white'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing Trust Guarantee */}
        <div className="mt-16 text-center text-[10px] text-brand-muted flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 max-w-3xl mx-auto bg-brand-card p-5 rounded-2xl border border-brand-border">
          <span className="flex items-center uppercase font-black tracking-widest">
            <ShieldCheck className="w-4 h-4 text-brand-terracotta mr-2" />
            <span>No retainers</span>
          </span>
          <span className="flex items-center uppercase font-black tracking-widest">
            <ShieldCheck className="w-4 h-4 text-brand-terracotta mr-2" />
            <span>Money-back Briefing SLA</span>
          </span>
          <span className="flex items-center uppercase font-black tracking-widest">
            <ShieldCheck className="w-4 h-4 text-brand-terracotta mr-2" />
            <span>Secure Checkout</span>
          </span>
        </div>

      </div>
    </section>
  );
}
