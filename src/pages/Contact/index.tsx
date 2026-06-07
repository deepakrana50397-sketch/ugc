import { useState } from 'react';
import SEO from '../../components/seo/SEO';
import JsonLd from '../../components/seo/JsonLd';
import Breadcrumb from '../../components/seo/Breadcrumb';
import { contactSeo } from './seo';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submit
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title={contactSeo.title}
        description={contactSeo.description}
        keywords={contactSeo.keywords}
      />
      <JsonLd data={contactSeo.schema} />

      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-bg min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Breadcrumb Trail */}
          <Breadcrumb items={[{ label: 'Contact' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-card border border-brand-border px-3 py-1 rounded-md">
                  Get In Touch
                </span>
                <h1 className="font-sans font-extrabold text-5xl sm:text-6xl text-brand-text leading-[1.05] tracking-tight">
                  Let's discuss <br />
                  your <span className="font-serif italic font-normal text-brand-terracotta">brand.</span>
                </h1>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-md">
                  Have questions about creator matches, custom video lengths, or whitelisting licenses? Fill out the form or email us directly.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center space-x-4 bg-brand-card border border-brand-border p-5 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-terracotta">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Email Address</p>
                    <p className="text-xs font-sans font-bold text-brand-text mt-0.5">hello@igigster.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-brand-card border border-brand-border p-5 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-terracotta">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Live Chat Support</p>
                    <p className="text-xs font-sans font-bold text-brand-text mt-0.5">Response time: &lt; 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Premium Form Layout */}
            <div className="lg:col-span-7 bg-brand-card border border-brand-border rounded-[32px] p-8 md:p-12 shadow-sm text-left">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-terracotta/10 text-brand-terracotta mb-4">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-medium text-2xl text-brand-text">Thank you!</h3>
                  <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. Our creative strategist will analyze your brand and get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta transition-colors"
                        placeholder="Sarah Jenkins"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Work Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta transition-colors"
                        placeholder="sarah@yourbrand.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="brand" className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Brand / Website URL</label>
                    <input
                      type="text"
                      id="brand"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta transition-colors"
                      placeholder="yourbrand.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">How can we help you?</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta transition-colors resize-none"
                      placeholder="Tell us about your product, desired video concepts, or queries."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-black hover:bg-black/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Submit Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
