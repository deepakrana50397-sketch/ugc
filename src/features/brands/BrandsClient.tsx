"use client";

import { useState } from "react";
import { CheckCircle2, TrendingUp, ShieldAlert, Sparkles, Send } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";

export default function BrandsClient() {
  const [formData, setFormData] = useState({
    brandName: "",
    contactEmail: "",
    categoryNeeded: "College Student",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb Trail */}
        <Breadcrumb items={[{ label: "For Brands" }]} />

        {/* Page Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
              Direct-Hiring Solutions
            </span>
            <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl text-brand-text leading-[1.05] tracking-tight">
              Creative positioning <br />
              that <span className="font-serif italic font-normal text-brand-terracotta">converts.</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl leading-relaxed">
              Connect directly with vetted part-time creators: college students, housewives, and micro-influencers. Pay creator rates directly, bypass middleman markup, and get custom hook scripts styled for immediate conversions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#post-gig"
                className="px-7 py-4 rounded-full bg-black hover:bg-black/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                Post a Gig & Hire
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-brand-card border border-brand-border rounded-[32px] p-8 shadow-sm space-y-6 text-left">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text">Platform Advantage</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-brand-terracotta mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text uppercase">Save up to 60% Payout</h4>
                  <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">By hiring college students and housewives directly at their real rates, you bypass standard marketing agency commissions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-brand-terracotta mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text uppercase">Correct Positioning</h4>
                  <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">We storyboard and script every angle before filming to ensure your product benefits are shown accurately to convert cold traffic.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-brand-terracotta mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-brand-text uppercase">Native Pacing & Graphics</h4>
                  <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">Our in-house editing team applies high-retention text banners, subtitles, and ASMR cuts to lower bounce rates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Bento Showcase */}
        <div className="space-y-8 text-center pt-8">
          <h2 className="font-serif font-medium text-3xl md:text-4xl text-brand-text tracking-tight">
            Solve your ad creative <span className="italic text-brand-terracotta font-normal">bottleneck</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Part-Time Creator Rates",
                price: "$150",
                desc: "Paid directly to college student or housewife creators. Zero markup.",
                benefits: ["Unboxing & demos", "Dorm/Home aesthetics", "Direct creator chat"],
              },
              {
                title: "Creative Briefing & Scripting",
                price: "$49",
                desc: "Per campaign. We research angles, hooks, and write full shooting guides.",
                benefits: ["Hook variations matrices", "Direct response scripting", "QC check on footage"],
              },
              {
                title: "High-Retention Video Editing",
                price: "$39",
                desc: "Optional. Professional editor overlays subtitles, progress bars, and filters.",
                benefits: ["Native captions style", "A/B hook cuts", "1 round of free tweaks"],
              },
            ].map((box, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-8 flex flex-col justify-between hover:border-brand-terracotta/40 hover:-translate-y-1 transition-all duration-300 shadow-sm text-left"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-brand-text tracking-tight uppercase">
                      {box.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">{box.desc}</p>
                  </div>
                  <div className="text-4xl font-sans font-black text-brand-terracotta">
                    {box.price}
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-brand-border/40 text-xs text-brand-text font-medium">
                    {box.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post a Gig form section */}
        <div id="post-gig" className="bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-8 md:p-14 shadow-sm text-left max-w-4xl mx-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-medium text-2xl text-brand-text">Gig Posted Successfully!</h3>
              <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                Your campaign briefing has been uploaded to our Creator Gig Database. Creators matching your criteria will begin submitting portfolios within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta">
                  Campaign Builder
                </span>
                <h2 className="font-serif font-medium text-3xl text-brand-text">Post a Part-Time UGC Gig</h2>
                <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                  Detail what your product does, the style of content you need (lifestyle, ASMR, review), and the budget. Creators will apply directly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    placeholder="e.g. Linen & Loom"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    placeholder="e.g. campaigns@linenandloom.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Target Creator Category</label>
                  <select
                    value={formData.categoryNeeded}
                    onChange={(e) => setFormData({ ...formData, categoryNeeded: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                  >
                    <option value="College Student">College Student</option>
                    <option value="Housewife">Housewife</option>
                    <option value="Influencer">Influencer / Micro-Creator</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Payout Budget ($ per video)</label>
                  <input
                    type="number"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    placeholder="e.g. 180"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Gig Description & Deliverables</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta resize-none"
                  placeholder="e.g. dorm routine making protein smoothies. Fast cut, close up shots of shake mixer, healthy ingredient closeups. 1x 15s hook, 1x 30s body loop."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black hover:bg-black/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Upload & Launch Gig Opportunity</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
