import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import { servicesSeo } from './seo';
import { services } from '../../content/services';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title={servicesSeo.title}
        description={servicesSeo.description}
        keywords={servicesSeo.keywords}
      />
      <JsonLd data={servicesSeo.schema} />

      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Breadcrumb & Navigation helper */}
          <Breadcrumb items={[{ label: 'Services' }]} />

          {/* Page Hero Header */}
          <div className="text-left max-w-4xl space-y-6">
            <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl text-brand-text leading-[1.05] tracking-tight">
              Our Professional <br />
              <span className="font-serif italic font-normal text-brand-terracotta">UGC Growth</span> Services
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl leading-relaxed">
              We operate exclusively in short-form vertical video. By handling everything from native scriptwriting to micro-influencer whitelisting, we help DTC brand owners generate sales and lower customer acquisition costs.
            </p>
          </div>

          {/* Service Cards Grid (Detailed view for standalone page) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6">
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

                  {/* Details */}
                  <div className="space-y-5 text-left">
                    <div className="space-y-4">
                      <h3 className="font-sans font-extrabold text-2xl md:text-[26px] text-brand-text tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] text-brand-muted font-sans leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Highlights list */}
                    <ul className="space-y-2 pt-2 text-xs md:text-sm text-brand-text/90 font-medium">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                        <span>Dedicated Account Planner</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                        <span>Complete Scripting Rights Included</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                        <span>One Round of Free Video Re-editing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Bottom Section CTA */}
          <div className="bg-brand-card rounded-[32px] p-8 md:p-14 border border-brand-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
            <div className="space-y-3 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta">
                Launch a Campaign
              </span>
              <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-text leading-tight tracking-tight">
                Ready to scale your ad creatives?
              </h2>
              <p className="text-xs md:text-sm text-brand-muted max-w-lg leading-relaxed">
                Connect with our creative strategist today. We will write 3 hooks and outline a video structure for your brand completely free.
              </p>
            </div>
            <Link
              to="/#pricing"
              className="w-full md:w-auto px-8 py-4.5 rounded-full bg-black hover:bg-black/90 text-white font-sans font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
