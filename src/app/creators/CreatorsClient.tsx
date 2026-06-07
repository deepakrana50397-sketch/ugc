"use client";

import { useState } from "react";
import { CheckCircle2, GraduationCap, Home, Heart, Send } from "lucide-react";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BentoCard from "@/components/ui/bento-card";

export default function CreatorsClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    category: "College Student",
    nicheSpecialties: "",
    portfolioLink: "",
    cameraDevice: "",
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
        <Breadcrumb items={[{ label: "For Creators" }]} />

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
              Earn Part-Time
            </span>
            <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl text-brand-text leading-[1.05] tracking-tight">
              Flexible UGC gigs, <br />
              paid <span className="font-serif italic font-normal text-brand-terracotta">directly.</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed">
              Whether you are a college student, housewife, or micro-influencer, brands on iGigster want your real, raw style. Receive brief storyboards, shoot content on your mobile phone, and get paid 100% of your rate with zero agency markup fees.
            </p>
            {/* Creator Categories Bento Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <BentoCard hoverEffect="lift" className="p-5 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-brand-terracotta mb-2" />
                <h4 className="text-xs font-black uppercase text-brand-text">Students</h4>
                <p className="text-[10px] text-brand-muted mt-1 leading-relaxed">Showcase dorm setups, tech reviews, lifestyle morning routines.</p>
              </BentoCard>
              <BentoCard hoverEffect="lift" className="p-5 rounded-2xl">
                <Home className="w-6 h-6 text-brand-terracotta mb-2" />
                <h4 className="text-xs font-black uppercase text-brand-text">Housewives</h4>
                <p className="text-[10px] text-brand-muted mt-1 leading-relaxed">Film cooking hacks, cleaning organization, home decor tests.</p>
              </BentoCard>
              <BentoCard hoverEffect="lift" className="p-5 rounded-2xl">
                <Heart className="w-6 h-6 text-brand-terracotta mb-2" />
                <h4 className="text-xs font-black uppercase text-brand-text">Influencers</h4>
                <p className="text-[10px] text-brand-muted mt-1 leading-relaxed">Produce skincare reviews, fitting hauls, high CTR ad hooks.</p>
              </BentoCard>
            </div>
          </div>

          {/* Right Column: Portal Application Form */}
          <div className="lg:col-span-6 bg-[#FAF8F5] border border-[#e5dec9]/60 rounded-[32px] p-8 md:p-10 shadow-sm text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-medium text-2xl text-brand-text">Application Submitted!</h3>
                <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                  Our creative vetting directors will review your camera sensor specs and portfolio link. We will contact you within 48 hours to activate your gig application access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta">
                    Creator Portal
                  </span>
                  <h2 className="font-serif font-medium text-3xl text-brand-text">Join the Database</h2>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Enter your details, select your creator category, and share a video sample. We accept applicants weekly.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                      placeholder="Sarah Jenkins"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                      placeholder="sarah@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">I am applying as:</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    >
                      <option value="College Student">College Student</option>
                      <option value="Housewife">Housewife</option>
                      <option value="Influencer">Influencer / Micro-Creator</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Camera Device / Model</label>
                    <input
                      type="text"
                      required
                      value={formData.cameraDevice}
                      onChange={(e) => setFormData({ ...formData, cameraDevice: e.target.value })}
                      className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                      placeholder="e.g. iPhone 15 Pro Max"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Specialty Niches (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={formData.nicheSpecialties}
                    onChange={(e) => setFormData({ ...formData, nicheSpecialties: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    placeholder="e.g. beauty, home organization, tech ASMR"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Sample Video Link / Portfolio URL</label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                    className="w-full bg-brand-bg/40 border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text focus:outline-none focus:border-brand-terracotta"
                    placeholder="e.g. https://tiktok.com/@myhandle/video/..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brand-terracotta hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Submit Vetting Onboarding Form</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
