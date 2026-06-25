'use client';

import React, { useState, useEffect } from 'react';
import { getCreators, registerCreatorProfile } from '@/lib/services';
import { Creator, PortfolioItem } from '@/types/creator';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';
import { 
  Save, CheckCircle2, Video, Plus, Trash2, Edit, Eye, 
  MapPin, Star, HelpCircle, X, Calendar, Heart, FileText, 
  Globe, Layers, ArrowUpRight, Play, Check, ChevronDown,
  User, DollarSign
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

// Define custom extended portfolio item type for UI display
interface PremiumPortfolioItem extends PortfolioItem {
  views?: string;
  likes?: string;
  date?: string;
  duration?: string;
  isCaseStudy?: boolean;
  metrics?: {
    views: string;
    engagements: string;
    brands: string;
  };
}

const DEFAULT_PORTFOLIO_ITEMS: PremiumPortfolioItem[] = [
  {
    id: 'port-mock-1',
    title: 'Mamaearth UGC Video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600&auto=format&fit=crop&q=80',
    category: 'UGC Video',
    views: '2.4K',
    likes: '312',
    date: '20 May 2024',
    duration: '0:45'
  },
  {
    id: 'port-mock-2',
    title: 'The Derma Co. – Product Demo',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
    category: 'UGC Video',
    views: '1.8K',
    likes: '245',
    date: '15 May 2024',
    duration: '0:30'
  },
  {
    id: 'port-mock-3',
    title: 'Dot & Key – Skincare Review',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop&q=80',
    category: 'UGC Video',
    views: '3.1K',
    likes: '402',
    date: '10 May 2024',
    duration: '0:36'
  },
  {
    id: 'port-mock-4',
    title: 'Minimalist – Product Highlight',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    category: 'UGC Video',
    views: '1.2K',
    likes: '150',
    date: '05 May 2024',
    duration: '0:29'
  },
  {
    id: 'port-mock-5',
    title: 'Boat Lifestyle Photoshoot',
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    category: 'Photos',
    date: '12 May 2024'
  },
  {
    id: 'port-mock-6',
    title: 'Pilgrim – Flatlay Photography',
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80',
    category: 'Photos',
    date: '08 May 2024'
  },
  {
    id: 'port-mock-7',
    title: 'Goa Travel Content',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    category: 'Social Media',
    date: '01 May 2024',
    duration: '0:15'
  },
  {
    id: 'port-mock-8',
    title: 'UGC Case Study – Skincare Campaign',
    videoUrl: '',
    thumbnailUrl: '',
    category: 'Case Studies',
    date: '25 Apr 2024',
    isCaseStudy: true,
    metrics: {
      views: '2.3M+',
      engagements: '120K+',
      brands: '20+'
    }
  }
];

export default function CreatorProfilePage() {
  const { currency } = useCurrency();
  const { creator, user, loadDashboard, updateCreatorProfile } = useDashboardStore();
  const storeProfile = creator.profile;
  const [profile, setProfile] = useState<Creator | null>(null);
  
  // Tabs & filter states
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('Recent');
  
  // Preview mode toggles edit UI
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [editModalTab, setEditModalTab] = useState<'general' | 'rates' | 'socials'>('general');

  // Edit settings form fields
  const [editForm, setEditForm] = useState({
    name: '',
    title: '',
    location: '',
    bio: '',
    projectsCompleted: '28',
    collaboratedBrands: '21',
    avgRating: '4.8',
    totalReviews: '32',
    responseRate: '95',
    responseRateText: 'Very Responsive',
    rateINR: '5000',
    rateUSD: '70',
    instagram: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
    behance: '',
    dribbble: '',
    website: '',
    category: 'video_creator',
    skills: ''
  });

  // Add work item form fields
  const [addForm, setAddForm] = useState({
    title: '',
    category: 'UGC Video',
    format: 'Video', // Video, Image, CaseStudy
    videoUrl: '',
    thumbnailUrl: '',
    duration: '0:30',
    views: '1.2K',
    likes: '150',
    date: '25 Jun 2024',
    viewsMetric: '2.3M+',
    engagementsMetric: '120K+',
    brandsMetric: '20+'
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (storeProfile) {
      // Seed default mockup portfolio items if empty
      let updatedPortfolio = storeProfile.portfolio;
      if (!storeProfile.portfolio || storeProfile.portfolio.length === 0) {
        updatedPortfolio = DEFAULT_PORTFOLIO_ITEMS;
        updateCreatorProfile({
          portfolio: DEFAULT_PORTFOLIO_ITEMS
        });
      }

      setProfile(storeProfile);

      setEditForm({
        name: storeProfile.name || '',
        title: storeProfile.title || '',
        location: storeProfile.location || '',
        bio: storeProfile.bio || '',
        projectsCompleted: (storeProfile.completedJobs || 28).toString(),
        collaboratedBrands: Math.round((storeProfile.completedJobs || 28) * 0.75).toString(),
        avgRating: (storeProfile.rating || 4.8).toString(),
        totalReviews: '32',
        responseRate: '95',
        responseRateText: 'Very Responsive',
        rateINR: storeProfile.startingRate?.INR?.toString() || '5000',
        rateUSD: storeProfile.startingRate?.USD?.toString() || '70',
        instagram: storeProfile.socials?.instagram || '',
        youtube: storeProfile.socials?.youtube || '',
        tiktok: storeProfile.socials?.tiktok || '',
        linkedin: storeProfile.socials?.linkedin || '',
        behance: storeProfile.socials?.behance || '',
        dribbble: storeProfile.socials?.dribbble || '',
        website: storeProfile.socials?.website || '',
        category: storeProfile.category || 'video_creator',
        skills: storeProfile.skills?.join(', ') || ''
      });
    }
  }, [storeProfile]);

  if (!profile) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', fontSize: '15px', color: 'var(--secondary-text)' }}>
        Loading portfolio details...
      </div>
    );
  }

  // Handle saving creator profile modifications
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      updateCreatorProfile({
        name: editForm.name,
        title: editForm.title,
        location: editForm.location,
        bio: editForm.bio,
        category: editForm.category as any,
        completedJobs: parseInt(editForm.projectsCompleted) || 0,
        rating: parseFloat(editForm.avgRating) || 5.0,
        startingRate: {
          INR: parseFloat(editForm.rateINR) || 0,
          USD: parseFloat(editForm.rateUSD) || 0,
        },
        skills: editForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        socials: {
          instagram: editForm.instagram,
          youtube: editForm.youtube,
          tiktok: editForm.tiktok,
          linkedin: editForm.linkedin,
          behance: editForm.behance,
          dribbble: editForm.dribbble,
          website: editForm.website,
        }
      });

      setSaving(false);
      setSuccess(true);
      setIsEditModalOpen(false);
      
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  // Add work item implementation
  const handleAddWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title) return;

    const newItem: PremiumPortfolioItem = {
      id: `port-${Date.now()}`,
      title: addForm.title,
      category: addForm.category,
      videoUrl: addForm.format === 'Video' ? addForm.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4' : '',
      thumbnailUrl: addForm.thumbnailUrl || (addForm.format === 'Video' 
        ? 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop&q=80' 
        : 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80'),
      duration: addForm.format === 'Video' ? addForm.duration : undefined,
      views: addForm.format === 'Video' ? addForm.views : undefined,
      likes: addForm.format === 'Video' ? addForm.likes : undefined,
      date: addForm.date,
      isCaseStudy: addForm.format === 'CaseStudy',
      metrics: addForm.format === 'CaseStudy' ? {
        views: addForm.viewsMetric || '1M+',
        engagements: addForm.engagementsMetric || '50K+',
        brands: addForm.brandsMetric || '10+'
      } : undefined
    };

    const updatedPortfolio = [...(profile?.portfolio || []), newItem];
    updateCreatorProfile({
      portfolio: updatedPortfolio
    });
    setIsAddModalOpen(false);
    
    // Reset add form
    setAddForm({
      title: '',
      category: 'UGC Video',
      format: 'Video',
      videoUrl: '',
      thumbnailUrl: '',
      duration: '0:30',
      views: '1.2K',
      likes: '150',
      date: '25 Jun 2024',
      viewsMetric: '2.3M+',
      engagementsMetric: '120K+',
      brandsMetric: '20+'
    });
  };

  // Delete portfolio item
  const handleDeletePortfolioItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    const updatedPortfolio = (profile?.portfolio || []).filter(item => item.id !== id);
    updateCreatorProfile({
      portfolio: updatedPortfolio
    });
  };

  // Cast portfolio array to PremiumPortfolioItem type safely
  const portfolioItems = (profile.portfolio || []) as PremiumPortfolioItem[];

  // Filter items in the list dynamically
  const filteredItems = portfolioItems.filter(item => {
    // Category tabs filter
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    // Dropdown type filter
    if (selectedTypeFilter !== 'All') {
      if (selectedTypeFilter === 'Videos' && (!item.videoUrl || item.isCaseStudy)) return false;
      if (selectedTypeFilter === 'Photos' && (item.videoUrl || item.isCaseStudy)) return false;
      if (selectedTypeFilter === 'Case Studies' && !item.isCaseStudy) return false;
    }
    return true;
  });

  // Calculate dynamic stats
  const allCount = portfolioItems.length;
  const videoCount = portfolioItems.filter(i => i.category === 'UGC Video').length;
  const photoCount = portfolioItems.filter(i => i.category === 'Photos').length;
  const socialCount = portfolioItems.filter(i => i.category === 'Social Media').length;
  const caseCount = portfolioItems.filter(i => i.category === 'Case Studies').length;
  const otherCount = portfolioItems.filter(i => i.category === 'Other' || (!i.category && !i.isCaseStudy)).length;

  const categories = [
    { key: 'All', label: 'All Work', count: allCount, icon: <Layers size={16} />, color: '#ec4899', border: '#fbcfe8', bg: 'rgba(236,72,153,0.04)' },
    { key: 'UGC Video', label: 'UGC Videos', count: videoCount, icon: <Video size={16} />, color: '#10b981', border: '#a7f3d0', bg: 'rgba(16,185,129,0.04)' },
    { key: 'Photos', label: 'Photos', count: photoCount, icon: <ImageIconWrapper size={16} />, color: '#f59e0b', border: '#fde68a', bg: 'rgba(245,158,11,0.04)' },
    { key: 'Social Media', label: 'Social Media', count: socialCount, icon: <Globe size={16} />, color: '#8b5cf6', border: '#ddd6fe', bg: 'rgba(139,92,246,0.04)' },
    { key: 'Case Studies', label: 'Case Studies', count: caseCount, icon: <FileText size={16} />, color: '#3b82f6', border: '#bfdbfe', bg: 'rgba(59,130,246,0.04)' },
    { key: 'Other', label: 'Other', count: otherCount, icon: <Layers size={16} />, color: '#6b7280', border: '#e5e7eb', bg: 'rgba(107,114,128,0.04)' }
  ];

  return (
    <div className="portfolio-page" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Early Access Announcement Banner */}
      <div className="early-access-banner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF1F2',
        border: '1px solid #FFE4E6',
        borderRadius: '16px',
        padding: '12px 20px',
        color: '#9F1239',
        fontSize: '13.5px',
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(225, 29, 72, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: '#F43F5E',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '12px',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 4px rgba(244, 63, 94, 0.2)'
          }}>
            Early Access
          </span>
          <span style={{ color: '#4C0519' }}>
            New UGC tools: Auto briefs, AI caption helper & more
          </span>
        </div>
        <a href="#" style={{
          color: '#F43F5E',
          fontWeight: 700,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '13px'
        }} className="hover-arrow-move">
          <span>Explore</span>
          <ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} />
        </a>
      </div>

      {/* 2. Page Header Title Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary-text)', letterSpacing: '-0.02em', margin: 0 }}>
            My Portfolio
          </h1>
          <p style={{ color: 'var(--secondary-text)', fontSize: '14.5px', marginTop: '6px' }}>
            Showcase your work and attract the right brands.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isPreviewMode ? '#1e293b' : 'var(--card-bg)',
              border: `1px solid ${isPreviewMode ? '#334155' : 'var(--border-color)'}`,
              color: isPreviewMode ? '#ffffff' : 'var(--primary-text)',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-style)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="header-button border-hover"
          >
            <Eye size={15} />
            <span>{isPreviewMode ? 'Edit Mode' : 'Preview Portfolio'}</span>
          </button>
          
          {!isPreviewMode && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#EC4899',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="glow-button hover-scale"
            >
              <Edit size={15} />
              <span>Edit Portfolio</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Mode Alert Banner */}
      {isPreviewMode && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          padding: '10px 20px',
          borderRadius: '12px',
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: 500
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'inline-block', animation: 'ping 1.5s infinite' }}></span>
            <span>You are viewing your public portfolio. Edit controls are hidden.</span>
          </div>
          <button 
            onClick={() => setIsPreviewMode(false)}
            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Exit Preview
          </button>
        </div>
      )}

      {/* Success Notification */}
      {success && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px 18px', borderRadius: '12px', color: '#10b981', fontSize: '13.5px' }}>
          <CheckCircle2 size={16} />
          <span>Portfolio details successfully synchronized and updated!</span>
        </div>
      )}

      {/* 3. Bio Details Header Card */}
      <div className="glass-panel bio-card" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '24px',
        padding: '30px',
        borderRadius: '24px',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-style)'
      }}>
        {/* Profile Info Left Column */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #FFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <img 
              src={profile.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'} 
              alt={editForm.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--primary-text)', letterSpacing: '-0.01em' }}>
                {editForm.name}
              </h2>
              {profile.isVerified !== false && (
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    boxShadow: '0 1px 3px rgba(59,130,246,0.3)'
                  }}
                  title="Verified UGC Creator"
                >
                  ✓
                </span>
              )}
            </div>
            
            <span style={{ fontSize: '14px', fontWeight: 550, color: 'var(--secondary-text)' }}>
              {editForm.title}
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted-text)', fontSize: '13px', marginTop: '2px' }}>
              <MapPin size={14} style={{ color: '#ec4899' }} />
              <span>{editForm.location}</span>
            </div>

            {/* Social Icons row */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {editForm.instagram && (
                <a href={editForm.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Instagram" style={{ color: '#E1306C', borderColor: '#fbcfe8' }}>
                  <InstagramIcon size={15} />
                </a>
              )}
              {editForm.youtube && (
                <a href={editForm.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="YouTube" style={{ color: '#FF0000', borderColor: '#fecaca' }}>
                  <YoutubeIcon size={15} />
                </a>
              )}
              {editForm.tiktok && (
                <a href={editForm.tiktok} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="TikTok" style={{ color: '#000000', borderColor: '#e5e7eb' }}>
                  <TiktokIcon size={14} />
                </a>
              )}
              {editForm.linkedin && (
                <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="LinkedIn" style={{ color: '#0077B5', borderColor: '#bfdbfe' }}>
                  <LinkedinIcon size={14} />
                </a>
              )}
              {editForm.behance && (
                <a href={editForm.behance} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Behance" style={{ color: '#0057FF', borderColor: '#bfdbfe' }}>
                  <BehanceIcon size={15} />
                </a>
              )}
              {editForm.dribbble && (
                <a href={editForm.dribbble} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Dribbble" style={{ color: '#EA4C89', borderColor: '#fbcfe8' }}>
                  <DribbbleIcon size={15} />
                </a>
              )}
              {editForm.website && (
                <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Website" style={{ color: '#3b82f6', borderColor: '#bfdbfe' }}>
                  <WebsiteIcon size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Stats Grid Right Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          alignItems: 'center',
          borderLeft: '1px solid var(--border-color)',
          paddingLeft: '24px'
        }} className="stats-row">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: '1.3' }}>
              Projects Completed
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary-text)', lineHeight: 1 }}>
              {editForm.projectsCompleted}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: '1.3' }}>
              Collaborated Brands
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary-text)', lineHeight: 1 }}>
              {editForm.collaboratedBrands}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: '1.3' }}>
              Avg. Rating
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-text)', lineHeight: 1 }}>
                  {editForm.avgRating}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted-text)', fontWeight: 500 }}>
                ({editForm.totalReviews} reviews)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: '1.3' }}>
              Response Rate
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary-text)', lineHeight: 1 }}>
                {editForm.responseRate}%
              </span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, letterSpacing: '0.01em' }}>
                {editForm.responseRateText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Portfolio Sections Navigation Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-text)', margin: 0 }}>
          Portfolio Sections
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px'
        }} className="sections-grid">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--card-bg)',
                  border: `1px solid ${isActive ? cat.color : 'var(--border-color)'}`,
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isActive ? `0 4px 12px ${cat.bg}` : 'var(--shadow-style)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`section-tab-card ${isActive ? 'active' : 'border-hover'}`}
              >
                {/* Icon Wrapper */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: cat.bg,
                  color: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {cat.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-text)' }}>
                    {cat.label}
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--secondary-text)', fontWeight: 500 }}>
                    {cat.count} {cat.count === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4.5 External Profiles Card Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-text)', margin: 0 }}>
          External Profiles
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 260px))',
          gap: '16px'
        }} className="external-profiles-grid">
          
          {editForm.behance && (
            <a 
              href={editForm.behance} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-style)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="external-profile-card border-hover"
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#0057FF',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <BehanceIcon size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-text)' }}>Behance</span>
                <span style={{ fontSize: '12px', color: 'var(--muted-text)', marginTop: '2px' }}>View Profile</span>
              </div>
            </a>
          )}

          {editForm.youtube && (
            <a 
              href={editForm.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-style)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="external-profile-card border-hover"
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#FF0000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <YoutubeIcon size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-text)' }}>YouTube</span>
                <span style={{ fontSize: '12px', color: 'var(--muted-text)', marginTop: '2px' }}>View Channel</span>
              </div>
            </a>
          )}

          {editForm.dribbble && (
            <a 
              href={editForm.dribbble} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-style)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="external-profile-card border-hover"
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#EA4C89',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <DribbbleIcon size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-text)' }}>Dribbble</span>
                <span style={{ fontSize: '12px', color: 'var(--muted-text)', marginTop: '2px' }}>View Profile</span>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* 5. Sub-header List Actions (Filters & Sort Row) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-text)', margin: 0 }}>
          {activeCategory === 'All' ? 'All Work' : activeCategory} <span style={{ color: 'var(--muted-text)', fontSize: '15px', fontWeight: 500 }}>({filteredItems.length})</span>
        </h3>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Dropdown 1: All Types */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              style={{
                appearance: 'none',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                padding: '9px 36px 9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary-text)',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-style)'
              }}
              className="select-filter border-hover"
            >
              <option value="All">All Types</option>
              <option value="Videos">Videos Only</option>
              <option value="Photos">Photos Only</option>
              <option value="Case Studies">Case Studies</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)', pointerEvents: 'none' }} />
          </div>

          {/* Dropdown 2: Most Recent */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                appearance: 'none',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                padding: '9px 36px 9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--primary-text)',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-style)'
              }}
              className="select-filter border-hover"
            >
              <option value="Recent">Most Recent</option>
              <option value="Popular">Most Popular</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)', pointerEvents: 'none' }} />
          </div>

          {/* "+ Add Work" button on right */}
          {!isPreviewMode && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                backgroundColor: '#EC4899',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(236,72,153,0.2)',
                transition: 'all 0.2s'
              }}
              className="hover-scale"
            >
              <Plus size={14} />
              <span>Add Work</span>
            </button>
          )}
        </div>
      </div>

      {/* 6. Portfolio Cards Grid */}
      {filteredItems.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          backgroundColor: 'var(--card-bg)',
          border: '1px dashed var(--border-color)',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'var(--muted-text)'
        }}>
          <Layers size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary-text)', margin: 0 }}>No items in this section</h4>
          <p style={{ fontSize: '13px', marginTop: '4px' }}>Click "+ Add Work" to start uploading clips or case studies.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }} className="portfolio-grid">
          {filteredItems.map((item) => {
            
            // Format 1: Case Studies stats block card
            if (item.isCaseStudy) {
              return (
                <div 
                  key={item.id} 
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-style)',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    minHeight: '340px'
                  }}
                  className="portfolio-card hover-lift"
                >
                  {/* Delete Button (Hidden in Preview) */}
                  {!isPreviewMode && (
                    <button
                      onClick={(e) => handleDeletePortfolioItem(item.id, e)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.9)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '26px',
                        height: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}
                      title="Delete Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                  {/* Case Study Statistics Panel */}
                  <div style={{
                    backgroundColor: '#FFF1F2', // Soft pink tone
                    padding: '24px 20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    textAlign: 'center',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(236, 72, 153, 0.1)',
                    flex: 1
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#9F1239' }}>
                        {item.metrics?.views || '2.3M+'}
                      </span>
                      <span style={{ fontSize: '10px', color: '#BE123C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Total Views
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderLeft: '1px solid rgba(236,72,153,0.15)', borderRight: '1px solid rgba(236,72,153,0.15)' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#9F1239' }}>
                        {item.metrics?.engagements || '120K+'}
                      </span>
                      <span style={{ fontSize: '10px', color: '#BE123C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Engagements
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#9F1239' }}>
                        {item.metrics?.brands || '20+'}
                      </span>
                      <span style={{ fontSize: '10px', color: '#BE123C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        Brands Worked
                      </span>
                    </div>
                  </div>

                  {/* Case Study Details Info */}
                  <div style={{ padding: '16px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}>
                        {item.category || 'Case Studies'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--primary-text)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                      {item.title}
                    </h4>
                    
                    <p style={{ fontSize: '12.5px', color: 'var(--secondary-text)', margin: 0 }}>
                      Results and insights from campaign
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--muted-text)', fontSize: '11px', marginTop: '12px', fontWeight: 500 }}>
                      <Calendar size={12} />
                      <span>{item.date || '25 Apr 2024'}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Format 2: Normal Image / Video card
            const isVideo = !!item.videoUrl;

            return (
              <div
                key={item.id}
                onClick={() => isVideo && item.videoUrl && setActiveVideoUrl(item.videoUrl)}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-style)',
                  position: 'relative',
                  cursor: isVideo ? 'pointer' : 'default',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="portfolio-card hover-lift"
              >
                {/* Delete Button (Hidden in Preview) */}
                {!isPreviewMode && (
                  <button
                    onClick={(e) => handleDeletePortfolioItem(item.id, e)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                    title="Delete Item"
                  >
                    <Trash2 size={13} />
                  </button>
                )}

                {/* Card Media Preview Area */}
                <div style={{
                  position: 'relative',
                  height: '180px',
                  backgroundColor: '#18181b',
                  overflow: 'hidden'
                }} className="card-media-box">
                  <img
                    src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    className="card-thumbnail-img"
                  />

                  {/* Play Video button Overlay */}
                  {isVideo && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      transition: 'all 0.3s'
                    }} className="play-button-overlay">
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000000',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s'
                      }} className="play-icon-glow">
                        <Play size={18} fill="#000000" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                  )}

                  {/* Top Right Photo badge overlay if static */}
                  {!isVideo && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10.5px',
                      fontWeight: 600
                    }}>
                      <ImageIconWrapper size={12} />
                      <span>Photo</span>
                    </div>
                  )}

                  {/* Bottom Duration overlay for video */}
                  {isVideo && item.duration && (
                    <span style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontFamily: 'monospace'
                    }}>
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Card Text Content */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: item.category === 'Photos' ? '#fef3c7' : item.category === 'Social Media' ? '#ede9fe' : '#f5f3ff',
                      color: item.category === 'Photos' ? '#d97706' : item.category === 'Social Media' ? '#7c3aed' : '#5b21b6',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {item.category || 'UGC Video'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--primary-text)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                    {item.title}
                  </h4>
                  
                  <p style={{ fontSize: '12.5px', color: 'var(--secondary-text)', margin: 0, minHeight: '36px', lineHeight: 1.3 }}>
                    {item.category === 'Photos' ? 'Lifestyle product photos for campaign' : 
                     item.category === 'Social Media' ? 'Instagram post for travel brand' : 
                     'Skincare routine video clip for Reels'}
                  </p>

                  {/* Card Bottom Stats row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '12px',
                    marginTop: '8px',
                    fontSize: '11.5px',
                    color: 'var(--muted-text)',
                    fontWeight: 550
                  }}>
                    {isVideo ? (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={13} />
                          <span>{item.views || '1.2K'}</span>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Heart size={13} />
                          <span>{item.likes || '150'}</span>
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}

                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      <span>{item.date || '12 May 2024'}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================= */}
      {/* EDIT PORTFOLIO DETAILS DIALOG / MODAL */}
      {/* ========================================= */}
      {isEditModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }} onClick={() => setIsEditModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '28px',
            padding: '28px',
            width: '90%',
            maxWidth: '620px',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.35)',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-text)', margin: 0, letterSpacing: '-0.02em' }}>
                  Edit Profile Settings
                </h2>
                <p style={{ color: 'var(--secondary-text)', fontSize: '12.5px', marginTop: '4px', opacity: 0.85 }}>
                  Customize your credentials, social handles, and starting rates.
                </p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                style={{ 
                  background: 'var(--hover-bg)', 
                  border: `1px solid var(--border-color)`, 
                  color: 'var(--secondary-text)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  padding: '6px',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }}
                className="hover-white-bg"
              >
                <X size={16} />
              </button>
            </div>

            {/* Redesigned Tab Switcher */}
            <div style={{
              display: 'flex',
              gap: '4px',
              backgroundColor: 'var(--hover-bg)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              width: '100%'
            }}>
              {[
                { id: 'general', label: 'General Info', icon: <User size={14} /> },
                { id: 'rates', label: 'Rates & Skills', icon: <DollarSign size={14} /> },
                { id: 'socials', label: 'Social Handles', icon: <Globe size={14} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditModalTab(tab.id as any)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    height: '36px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: editModalTab === tab.id ? '#EC4899' : 'transparent',
                    color: editModalTab === tab.id ? '#FFFFFF' : 'var(--secondary-text)',
                    fontSize: '12.5px',
                    fontWeight: editModalTab === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  className="modal-tab-btn"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', gap: '16px', paddingRight: '4px' }} className="inner-scroller">
              
              {/* TAB 1: GENERAL INFO */}
              <div style={{ display: editModalTab === 'general' ? 'flex' : 'none', flexDirection: 'column', gap: '14px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Display Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="modal-input"
                      placeholder="Ananya Sharma"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Professional Title</label>
                    <input
                      type="text"
                      required
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="modal-input"
                      placeholder="e.g. UGC Creator & Editor"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Location (City, Country)</label>
                    <input
                      type="text"
                      required
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="modal-input"
                      placeholder="Bangalore, India"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Creator Category</label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="modal-input select-styled"
                      style={{ height: '39px' }}
                    >
                      <option value="video_creator">Video Creator</option>
                      <option value="editor">Video Editor</option>
                      <option value="motion_designer">Motion Designer</option>
                      <option value="voiceover">Voiceover Artist</option>
                      <option value="actor">UGC Actor</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Professional Biography</label>
                  <textarea
                    rows={4}
                    required
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      color: 'var(--primary-text)',
                      outline: 'none',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      resize: 'none',
                      lineHeight: '1.5'
                    }}
                    placeholder="Tell brands about your focus area, style, and creator experience..."
                  />
                </div>
              </div>

              {/* TAB 2: RATES & SKILLS */}
              <div style={{ display: editModalTab === 'rates' ? 'flex' : 'none', flexDirection: 'column', gap: '14px' }}>
                
                {/* Rate guide info banner */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '10px', 
                  backgroundColor: 'rgba(236, 72, 153, 0.04)', 
                  border: '1px dashed rgba(236, 72, 153, 0.25)', 
                  borderRadius: '12px', 
                  padding: '12px'
                }}>
                  <HelpCircle size={16} color="#EC4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ fontSize: '11.5px', color: 'var(--secondary-text)', margin: 0, lineHeight: '1.4' }}>
                    <strong>Starting Rates Tip:</strong> Set realistic starting rates to guide brands on your services pricing. Display stats like completed projects, brands, reviews, and response rates are updated automatically.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Starting Rate (INR)</label>
                      <span style={{ fontSize: '10px', color: 'var(--muted-text)', fontWeight: 600 }}>Default</span>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', fontSize: '12.5px', fontWeight: 700 }}>₹</span>
                      <input
                        type="number"
                        required
                        value={editForm.rateINR}
                        onChange={(e) => setEditForm({ ...editForm, rateINR: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '24px', width: '100%' }}
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Starting Rate (USD)</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', fontSize: '12.5px', fontWeight: 700 }}>$</span>
                      <input
                        type="number"
                        required
                        value={editForm.rateUSD}
                        onChange={(e) => setEditForm({ ...editForm, rateUSD: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '24px', width: '100%' }}
                        placeholder="e.g. 70"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Skills (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={editForm.skills}
                    onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                    className="modal-input"
                    placeholder="e.g. Video Editing, Directing, Product Styling, Copywriting"
                  />
                  <span style={{ fontSize: '10.5px', color: 'var(--muted-text)', marginTop: '2px' }}>
                    Separate multiple skills using commas.
                  </span>
                </div>
              </div>

              {/* TAB 3: SOCIAL HANDLES */}
              <div style={{ display: editModalTab === 'socials' ? 'flex' : 'none', flexDirection: 'column', gap: '12px' }}>
                
                {/* Instagram & Youtube Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Instagram Profile URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <InstagramIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.instagram}
                        onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>YouTube Channel URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <YoutubeIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.youtube}
                        onChange={(e) => setEditForm({ ...editForm, youtube: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://youtube.com/@channel"
                      />
                    </div>
                  </div>
                </div>

                {/* TikTok & LinkedIn Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>TikTok Profile URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <TiktokIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.tiktok}
                        onChange={(e) => setEditForm({ ...editForm, tiktok: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://tiktok.com/@handle"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>LinkedIn Profile URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <LinkedinIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.linkedin}
                        onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://linkedin.com/in/profile"
                      />
                    </div>
                  </div>
                </div>

                {/* Behance & Dribbble Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-form-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Behance Portfolio URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <BehanceIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.behance}
                        onChange={(e) => setEditForm({ ...editForm, behance: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://behance.net/portfolio"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Dribbble Portfolio URL</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                        <DribbbleIcon size={14} />
                      </span>
                      <input
                        type="url"
                        value={editForm.dribbble}
                        onChange={(e) => setEditForm({ ...editForm, dribbble: e.target.value })}
                        className="modal-input"
                        style={{ paddingLeft: '34px', width: '100%' }}
                        placeholder="https://dribbble.com/portfolio"
                      />
                    </div>
                  </div>
                </div>

                {/* Website Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--secondary-text)' }}>Personal Website URL</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: '12px', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
                      <WebsiteIcon size={14} />
                    </span>
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      className="modal-input"
                      style={{ paddingLeft: '34px', width: '100%' }}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary-text)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="hover-white-bg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '12px',
                    backgroundColor: '#EC4899',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.2)',
                    transition: 'all 0.2s'
                  }}
                  className="glow-button"
                >
                  <Save size={15} />
                  <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* "+ ADD WORK" DIALOG / MODAL */}
      {/* ========================================= */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }} onClick={() => setIsAddModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '30px',
            width: '90%',
            maxWidth: '520px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-text)', margin: 0 }}>
                Add New Portfolio Item
              </h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--secondary-text)', cursor: 'pointer', display: 'flex', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddWorkItem} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mamaearth UGC Video"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="modal-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>Category Tab</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="modal-input select-styled"
                  >
                    <option value="UGC Video">UGC Videos</option>
                    <option value="Photos">Photos</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>Format Style</label>
                  <select
                    value={addForm.format}
                    onChange={(e) => setAddForm({ ...addForm, format: e.target.value })}
                    className="modal-input select-styled"
                  >
                    <option value="Video">Video with Player</option>
                    <option value="Image">Static Image / Photo</option>
                    <option value="CaseStudy">Case Study Metrics Card</option>
                  </select>
                </div>
              </div>

              {/* Conditional render fields depending on style format selection */}
              {addForm.format === 'CaseStudy' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 800, margin: '0 0 4px 0' }}>Case Study Highlight Metrics</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--secondary-text)' }}>Total Views</label>
                      <input type="text" placeholder="e.g. 2.3M+" value={addForm.viewsMetric} onChange={(e) => setAddForm({ ...addForm, viewsMetric: e.target.value })} className="modal-input" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--secondary-text)' }}>Engagements</label>
                      <input type="text" placeholder="e.g. 120K+" value={addForm.engagementsMetric} onChange={(e) => setAddForm({ ...addForm, engagementsMetric: e.target.value })} className="modal-input" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--secondary-text)' }}>Brands</label>
                      <input type="text" placeholder="e.g. 20+" value={addForm.brandsMetric} onChange={(e) => setAddForm({ ...addForm, brandsMetric: e.target.value })} className="modal-input" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>Thumbnail Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={addForm.thumbnailUrl}
                      onChange={(e) => setAddForm({ ...addForm, thumbnailUrl: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  {addForm.format === 'Video' && (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>MP4 Video URL</label>
                        <input
                          type="url"
                          placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                          value={addForm.videoUrl}
                          onChange={(e) => setAddForm({ ...addForm, videoUrl: e.target.value })}
                          className="modal-input"
                        />
                      </div>

                      <div style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', display: 'grid' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary-text)' }}>Play Duration</label>
                          <input type="text" placeholder="e.g. 0:45" value={addForm.duration} onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })} className="modal-input" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary-text)' }}>Views Count</label>
                          <input type="text" placeholder="e.g. 2.4K" value={addForm.views} onChange={(e) => setAddForm({ ...addForm, views: e.target.value })} className="modal-input" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary-text)' }}>Likes Count</label>
                          <input type="text" placeholder="e.g. 312" value={addForm.likes} onChange={(e) => setAddForm({ ...addForm, likes: e.target.value })} className="modal-input" />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-text)' }}>Creation Date</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20 May 2024"
                  value={addForm.date}
                  onChange={(e) => setAddForm({ ...addForm, date: e.target.value })}
                  className="modal-input"
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary-text)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '11px 24px',
                    borderRadius: '12px',
                    backgroundColor: '#EC4899',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.2)'
                  }}
                >
                  Add Portfolio Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* GORGEOUS VIDEO PLAYER MODAL */}
      {/* ========================================= */}
      {activeVideoUrl && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }} onClick={() => setActiveVideoUrl(null)}>
          <div style={{
            position: 'relative',
            width: '90%',
            maxWidth: '800px',
            backgroundColor: '#000000',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close trigger overlay */}
            <button 
              onClick={() => setActiveVideoUrl(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20
              }}
            >
              <X size={18} />
            </button>

            {/* Video container */}
            <div style={{ width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                style={{ width: '100%', height: '100%' }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Styles Scoped in CSS */}
      <style jsx>{`
        .portfolio-page {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Social icon list buttons styling */
        .social-icon-link {
          display: flex;
          align-items: center;
          justifyContent: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          text-decoration: none;
          background-color: var(--card-bg);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .social-icon-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        /* Hover animations and transitions */
        .border-hover {
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }
        .border-hover:hover {
          border-color: #EC4899 !important;
          background-color: rgba(236,72,153,0.02) !important;
        }
        .hover-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.03) !important;
        }
        .portfolio-card:hover .card-thumbnail-img {
          transform: scale(1.05);
        }
        .portfolio-card:hover .play-button-overlay {
          background-color: rgba(0,0,0,0.3) !important;
        }
        .portfolio-card:hover .play-icon-glow {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255,255,255,0.4) !important;
        }

        /* Forms inputs in modal dialogs */
        .modal-input {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.02);
          color: var(--primary-text);
          outline: none;
          font-size: 13px;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .modal-input:focus {
          border-color: #EC4899;
        }
        .select-styled {
          cursor: pointer;
        }

        /* Select controls dropdown styling in filters */
        .select-filter {
          transition: all 0.2s;
        }
        .select-filter:hover {
          border-color: #ec4899 !important;
        }

        .hover-arrow-move:hover span {
          text-decoration: underline;
        }
        .hover-arrow-move:hover svg {
          transform: translate(2px, -2px) rotate(45deg) !important;
          transition: transform 0.2s;
        }

        @media (max-width: 992px) {
          .bio-card {
            grid-template-columns: 1fr !important;
          }
          .stats-row {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border-color);
            padding-top: 24px;
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .stats-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .sections-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// Subcomponent Wrapper for Image icon (avoids name clash with DOM Image)
function ImageIconWrapper({ size }: { size: number }) {
  return <Layers size={size} />;
}

// Custom TikTok SVG Icon
const TiktokIcon = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Manual SVGs for other socials to prevent Lucide resolution issues
const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h2a3 3 0 0 0 0-6H9v6zM9 18h3a3 3 0 0 0 0-6H9v6z" />
    <path d="M18 14a2 2 0 1 0 0 4h1a2 2 0 0 0 0-4h-1z" />
    <path d="M17 10h3" />
  </svg>
);

const DribbbleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const WebsiteIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
