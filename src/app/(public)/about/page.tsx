import React from 'react';
import { Sparkles, Heart, Users, Target, CheckCircle2 } from 'lucide-react';
import { getPageMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = getPageMetadata({
  title: 'About Our UGC Marketplace',
  description: 'Learn about iGigster, our mission to simplify UGC video collaborations, and the team building the future of short-form commerce.',
  path: '/about',
});

export default function AboutPage() {
  const team = [
    {
      name: 'Deepak Singhal',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      bio: 'Ex-SaaS builder passionate about democratizing content creators economy.'
    },
    {
      name: 'Neha Kapoor',
      role: 'Head of Creator Relations',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      bio: 'Vetted UGC creator with 100+ active campaign integrations under her belt.'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Brand Success Lead',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      bio: 'E-commerce strategist managing client matching and milestone approvals.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '80px 24px 100px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Mission Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', padding: '6px 14px', borderRadius: '20px', alignSelf: 'center', color: 'rgb(99, 102, 241)', fontSize: '13px', fontWeight: 600 }}>
            <Sparkles size={14} />
            <span>OUR MISSION</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800 }}>
            Democratizing <span className="accent-gradient-text">Short-Form Creator Ads</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            We started iGigster because finding high-quality UGC talent shouldn’t require expensive subscriptions or endless negotiation. We build pay-as-you-go tech that helps e-commerce stores scale conversions instantly.
          </p>
        </div>

        {/* Vision Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {[
            { icon: <Target size={22} style={{ color: 'rgb(var(--primary))' }} />, title: 'Pre-Vetted Standard', desc: 'Every creator listed on iGigster has undergone portfolio audits for lightning, speech clarity, and scripting structure.' },
            { icon: <Heart size={22} style={{ color: '#ec4899' }} />, title: 'Direct Communications', desc: 'No contesting or gatekeeping. Once unlocked, get direct access to coordinate directly over script revisions.' },
            { icon: <Users size={22} style={{ color: '#10b981' }} />, title: 'Creator First Economy', desc: 'We help creators configure fair day rates in local currencies and receive timely milestone payouts.' },
          ].map((pillar, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--card-border)' }}>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '12px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{pillar.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
            Meet our <span className="accent-gradient-text">Core Team</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {team.map((member, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', border: '1px solid var(--card-border)' }}>
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgb(var(--primary))' }}
                />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{member.name}</h3>
                  <span style={{ color: 'rgb(99, 102, 241)', fontSize: '13px', fontWeight: 500 }}>{member.role}</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
