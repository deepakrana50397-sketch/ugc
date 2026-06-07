'use client';

import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, BookOpen, Clock } from 'lucide-react';

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: '5 Scroll-Stopping UGC Hooks That Will Double Your TikTok CTR',
      excerpt: 'Struggling with high bounce rates on your social ads? Learn the top 5 hook formulas that immediately capture viewer attention in the first 3 seconds.',
      content: `
        <h2>The 3-Second Retention Rule</h2>
        <p>In short-form video advertising, the first three seconds dictate whether your ad converts or drains your budget. Viewers scroll mindlessly; your hook must break their pattern. Here are five proven patterns that immediately arrest attention.</p>
        
        <h3>1. The "Negative Outcome" Hook</h3>
        <p><em>Example: "Stop buying hyaluronic acid serums until you watch this."</em></p>
        <p>Humans are naturally loss-averse. Pointing out potential mistakes or wastes of money triggers a psychological urge to stop and verify.</p>
        
        <h3>2. The "Before and After" Visual Hook</h3>
        <p><em>Example: Split screen showing red, irritated skin vs. glowing skin.</em></p>
        <p>Showing the outcome first satisfies visual curiosity. Make sure the transition is raw and unedited—polished studio setups look like ads, which triggers ad-blindness.</p>
        
        <h3>3. The "Unpopular Opinion" Hook</h3>
        <p><em>Example: "Here is why your 10-step skincare routine is actually causing acne."</em></p>
        <p>Contrarian claims arouse instant debate and curiosity. Ensure you substantiate the claim with educational points immediately after.</p>

        <h3>4. The "Satisfying Sound" Hook</h3>
        <p><em>Example: ASMR spray taps, bottle pop, or textured serum drops.</em></p>
        <p>Sound design is highly neglected. An aesthetic tapping sound creates a satisfying, sensory bridge that hooks auditory viewers.</p>

        <h3>5. The "Visual Demonstration" Hook</h3>
        <p><em>Example: Applying an orange peel with foundation to demonstrate pore filling.</em></p>
        <p>Show, don't tell. A bizarre or extreme product demo proves efficacy instantly without needing a script.</p>
      `,
      author: 'Neha Kapoor',
      date: 'June 02, 2026',
      readTime: '4 min read',
      category: 'Growth Hacks',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      title: 'The Ultimate UGC Scriptwriting Template for E-Commerce',
      excerpt: 'Vetted templates for script structure: Hook, Problem, Solution, Benefits, and Call-to-Action. Master writing copy that sells.',
      content: `
        <h2>Script Structure that Converts</h2>
        <p>Writing a UGC script requires balancing authentic storytelling with direct-response copy. The standard e-commerce video length should be 30 to 45 seconds, segmented into five key pillars.</p>
        
        <h3>Pillar 1: The Pattern Interrupt (0-3s)</h3>
        <p>Introduce the hook. Make it visual or auditory. Avoid brand names or logos here; focus entirely on the viewer's immediate curiosity.</p>
        
        <h3>Pillar 2: The Problem Definition (4-12s)</h3>
        <p>Address a highly specific pain point. Speak about dry skin, patchy foundations, or high bills. The more relatable, the higher the empathy match.</p>
        
        <h3>Pillar 3: The Discovery & Solution (13-22s)</h3>
        <p>Introduce the product as the natural answer to the problem. Show the unboxing or application. Make the discovery look organic, like finding a hidden gem.</p>

        <h3>Pillar 4: Proof & Features (23-35s)</h3>
        <p>Showcase 2-3 key product benefits (e.g. lightweight, vegan, 24h hydration). Support this with dynamic close-up texture shots or before/after overlays.</p>

        <h3>Pillar 5: Direct Call-to-Action (36-45s)</h3>
        <p>Clear, single instruction. "Click the link below to get 10% off your first bottle." Avoid multiple options; keep the path to purchase straightforward.</p>
      `,
      author: 'Sarah Jenkins',
      date: 'May 28, 2026',
      readTime: '6 min read',
      category: 'Tutorials',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      title: 'How to Formulate Fair Day Rates as a UGC Creator',
      excerpt: 'Are you pricing yourself out of gigs or undercharging? A guide to evaluating editing complex tasks, raw video assets, and usage rights.',
      content: `
        <h2>The Creator Pricing Dilemma</h2>
        <p>Configuring your day rates is one of the hardest aspects of running a full-time UGC career. If you price too low, you undervalue your labor; too high, and brands pass you over. Let’s break down the perfect formula.</p>
        
        <h3>1. Calculate Base Video Cost</h3>
        <p>A standard 30-second organic UGC video should cover: scriptwriting, shooting setup, editing, and 1 round of revisions. A fair starting rate is typically ₹5,000 in India or $70-100 in international markets.</p>
        
        <h3>2. Adjust for Editing Complexity</h3>
        <p>If the client requests high-retention text animations, sound design, or specialized color grading, charge a 30% premium. Video editing takes time; factor this into your rate card.</p>
        
        <h3>3. Factor in Usage Rights</h3>
        <p>Organic posting vs paid ads are different. If a brand plans to run your video as a paid advertisement on TikTok or Meta for 30 days, charge an additional 20-30% licensing fee. Never give away perpetuity rights for free.</p>
      `,
      author: 'Deepak Singhal',
      date: 'May 15, 2026',
      readTime: '5 min read',
      category: 'Business Guides',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '80px 24px 100px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {selectedArticle !== null ? (
          // Single Article View
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button
              onClick={() => setSelectedArticle(null)}
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: 'rgb(var(--primary))',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <ArrowLeft size={16} /> Back to Insights list
            </button>

            {/* Banner details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(124,58,237,0.1)', color: 'rgb(99, 102, 241)', padding: '4px 10px', borderRadius: '12px', width: 'fit-content' }}>
                {articles.find(a => a.id === selectedArticle)?.category}
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                {articles.find(a => a.id === selectedArticle)?.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '13.5px', marginTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> By {articles.find(a => a.id === selectedArticle)?.author}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {articles.find(a => a.id === selectedArticle)?.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {articles.find(a => a.id === selectedArticle)?.readTime}</span>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--border)' }} />

            {/* Article Content Body */}
            <div 
              className="blog-content-body"
              style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: articles.find(a => a.id === selectedArticle)?.content || '' }}
            />
          </div>
        ) : (
          // Directory list view
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800 }}>
                UGC & Short-Form <span className="accent-gradient-text">Insights</span>
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                Read the latest trends, guides, and growth hacks compiled by industry-leading creators and e-commerce brands.
              </p>
            </div>

            {/* Articles Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onClick={() => setSelectedArticle(article.id)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgb(var(--primary))', textTransform: 'uppercase' }}>
                      {article.category}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                      {article.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>
                      {article.excerpt}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.02)' }}>
                    <span>{article.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={12} /> {article.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        .blog-content-body h2 { color: #ffffff; fontSize: 22px; fontWeight: 700; margin-top: 32px; margin-bottom: 12px; }
        .blog-content-body h3 { color: rgb(var(--primary)); fontSize: 18px; fontWeight: 600; margin-top: 24px; margin-bottom: 8px; }
        .blog-content-body p { margin-bottom: 16px; }
        .blog-content-body em { font-style: italic; color: #94a3b8; }
      `}</style>
    </div>
  );
}
