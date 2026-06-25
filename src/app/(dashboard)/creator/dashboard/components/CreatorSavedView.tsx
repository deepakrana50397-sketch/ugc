'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, BookmarkCheck, Search, ChevronDown, Trash2, ExternalLink, 
  Sparkles, Plus, Play, Music, Video, FileText, CheckCircle2, ArrowUpRight, 
  MapPin, Heart, PlusCircle, AlertCircle, X, AlignLeft, Info
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface SavedViewProps {
  theme: 'dark' | 'light';
  isLight: boolean;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentColor: string;
  shadowStyle: string;
}

// Initial mock data
const INITIAL_SAVED_GIGS = [
  {
    id: 'saved-gig-1',
    title: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
    brand: 'Glow & Co.',
    category: 'ugc_creator',
    tags: ['Skincare', 'Beauty', 'Reel'],
    budgetINR: 18000,
    budgetUSD: 220,
    daysLeft: 5,
    brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=100',
    description: 'We are looking for a female UGC creator to film 3 organic-style Reels for our Vitamin C serum. Must show product texture and application.',
  },
  {
    id: 'saved-gig-2',
    title: 'Fitness Gym Apparel Try-On & Review',
    brand: 'AlphaFit Apparel',
    category: 'ugc_creator',
    tags: ['Fitness', 'Activewear', 'Try-On'],
    budgetINR: 10000,
    budgetUSD: 120,
    daysLeft: 8,
    brandLogo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    description: 'Athletic creators wanted to showcase our new sweat-wicking compression tees. Film try-on transitions, a squat test, and fit summary.',
  },
  {
    id: 'saved-gig-3',
    title: 'Short-Form Editor for High-Retention Tech Reels',
    brand: 'ByteSaaS Solutions',
    category: 'editor',
    tags: ['Video Editing', 'Shorts', 'Fast-Cut'],
    budgetINR: 4500,
    budgetUSD: 60,
    daysLeft: 10,
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
    description: 'Edit raw podcast recordings into high-impact, caption-heavy 9:16 Shorts. Ali Abdaal or Alex Hormozi style editing.',
  }
];

const INITIAL_SAVED_BRANDS = [
  {
    id: 'saved-brand-1',
    name: 'Mamaearth',
    category: 'Beauty & Cosmetics',
    rating: 4.9,
    reviewsCount: 42,
    activeCampaigns: 3,
    avgPayoutINR: 15000,
    avgPayoutUSD: 180,
    logoBg: 'rgba(22, 163, 74, 0.08)',
    logoColor: '#16a34a',
    logoText: 'M',
    location: 'Gurugram, India',
    responseRate: '98%',
    description: 'Leading Indian personal care brand focusing on toxin-free, natural skincare and haircare products.'
  },
  {
    id: 'saved-brand-2',
    name: 'boAt Lifestyle',
    category: 'Consumer Electronics',
    rating: 4.7,
    reviewsCount: 56,
    activeCampaigns: 1,
    avgPayoutINR: 12000,
    avgPayoutUSD: 150,
    logoBg: 'rgba(31, 41, 55, 0.05)',
    logoColor: '#1f2937',
    logoText: 'boAt',
    location: 'Mumbai, India',
    responseRate: '92%',
    description: 'India\'s fastest-growing audio brand specializing in fashionable consumer electronics like earphones and smartwatches.'
  },
  {
    id: 'saved-brand-3',
    name: 'Zomato',
    category: 'Food Tech & Delivery',
    rating: 4.8,
    reviewsCount: 28,
    activeCampaigns: 5,
    avgPayoutINR: 20000,
    avgPayoutUSD: 240,
    logoBg: 'rgba(220, 38, 38, 0.08)',
    logoColor: '#dc2626',
    logoText: 'Z',
    location: 'Bangalore, India',
    responseRate: '95%',
    description: 'Multinational food delivery and restaurant aggregation platform connecting millions of foodies with restaurants.'
  }
];

const INITIAL_SAVED_INSPIRATIONS = [
  {
    id: 'saved-insp-1',
    title: '3-Second Hook: The Pattern Interrupt',
    category: 'Video Hook',
    platform: 'TikTok/Reels',
    content: 'Start with a fast zoom and say: "Don\'t buy this product unless you want..." followed by a visual shock. Perfect for cosmetics or tech items.',
    note: 'Use for the upcoming Glow & Co. campaign.',
    savedAt: '2 days ago',
    iconType: 'hook'
  },
  {
    id: 'saved-insp-2',
    title: 'Water Splash Transition Concept',
    category: 'Transition',
    platform: 'Instagram Reels',
    content: 'Flick water drops onto the camera lens, then cut/wipe to a clean, macro shot of the product with slow-motion background lighting.',
    note: 'Test this with Mamaearth product review.',
    savedAt: '5 days ago',
    iconType: 'transition'
  },
  {
    id: 'saved-insp-3',
    title: 'Aesthetic Morning Routine Audio',
    category: 'Trending Audio',
    platform: 'TikTok',
    content: 'Lofi acoustic beats with ambient coffee brewing sound effects. Search ID: "sound-routine-924-lofi". Perfect background track.',
    note: 'Great for lifestyle and daily-vlog sponsorship briefs.',
    savedAt: '1 week ago',
    iconType: 'audio'
  }
];

export default function CreatorSavedView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: SavedViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  const [activeTab, setActiveTab] = useState<'all' | 'gigs' | 'brands' | 'inspiration'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'budget' | 'name'>('recent');
  
  // State for items
  const [savedGigs, setSavedGigs] = useState(INITIAL_SAVED_GIGS);
  const [savedBrands, setSavedBrands] = useState(INITIAL_SAVED_BRANDS);
  const [savedInspirations, setSavedInspirations] = useState<any[]>(INITIAL_SAVED_INSPIRATIONS);
  
  // Load and sync inspirations from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igigster_saved_inspirations');
      if (stored) {
        try {
          setSavedInspirations(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        localStorage.setItem('igigster_saved_inspirations', JSON.stringify(INITIAL_SAVED_INSPIRATIONS));
      }

      const handleUpdate = () => {
        const updated = localStorage.getItem('igigster_saved_inspirations');
        if (updated) {
          try {
            setSavedInspirations(JSON.parse(updated));
          } catch (e) {
            console.error(e);
          }
        }
      };
      window.addEventListener('saved-inspirations-updated', handleUpdate);
      return () => {
        window.removeEventListener('saved-inspirations-updated', handleUpdate);
      };
    }
  }, []);

  const saveInspirations = (list: any[]) => {
    setSavedInspirations(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_saved_inspirations', JSON.stringify(list));
      window.dispatchEvent(new Event('saved-inspirations-updated'));
    }
  };

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRemovedItem, setLastRemovedItem] = useState<{
    type: 'gig' | 'brand' | 'inspiration';
    item: any;
  } | null>(null);

  // New Inspiration Dialog/Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInspTitle, setNewInspTitle] = useState('');
  const [newInspCategory, setNewInspCategory] = useState('Video Hook');
  const [newInspPlatform, setNewInspPlatform] = useState('Instagram Reels');
  const [newInspContent, setNewInspContent] = useState('');
  const [newInspNote, setNewInspNote] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUnsaveGig = (id: string) => {
    const gigToUnsave = savedGigs.find(g => g.id === id);
    if (gigToUnsave) {
      setLastRemovedItem({ type: 'gig', item: gigToUnsave });
      setSavedGigs(savedGigs.filter(g => g.id !== id));
      triggerToast(`Removed "${gigToUnsave.title}" from saved gigs.`);
    }
  };

  const handleUnsaveBrand = (id: string) => {
    const brandToUnsave = savedBrands.find(b => b.id === id);
    if (brandToUnsave) {
      setLastRemovedItem({ type: 'brand', item: brandToUnsave });
      setSavedBrands(savedBrands.filter(b => b.id !== id));
      triggerToast(`Removed ${brandToUnsave.name} from saved brands.`);
    }
  };

  const handleUnsaveInspiration = (id: string) => {
    const inspToUnsave = savedInspirations.find(i => i.id === id);
    if (inspToUnsave) {
      setLastRemovedItem({ type: 'inspiration', item: inspToUnsave });
      saveInspirations(savedInspirations.filter(i => i.id !== id));
      triggerToast(`Deleted inspiration card: "${inspToUnsave.title}".`);
    }
  };

  const handleUndoRemove = () => {
    if (!lastRemovedItem) return;

    const { type, item } = lastRemovedItem;
    if (type === 'gig') {
      setSavedGigs(prev => [...prev, item]);
      triggerToast(`Restored "${item.title}"`);
    } else if (type === 'brand') {
      setSavedBrands(prev => [...prev, item]);
      triggerToast(`Restored ${item.name}`);
    } else if (type === 'inspiration') {
      saveInspirations([...savedInspirations, item]);
      triggerToast(`Restored inspiration: "${item.title}"`);
    }
    setLastRemovedItem(null);
  };

  const handleAddInspiration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInspTitle.trim() || !newInspContent.trim()) {
      alert('Please fill out the Title and Idea/Content fields.');
      return;
    }

    const iconType = 
      newInspCategory.toLowerCase().includes('hook') ? 'hook' :
      newInspCategory.toLowerCase().includes('audio') || newInspCategory.toLowerCase().includes('music') ? 'audio' :
      newInspCategory.toLowerCase().includes('transition') ? 'transition' : 'idea';

    const newItem = {
      id: `saved-insp-${Date.now()}`,
      title: newInspTitle,
      category: newInspCategory,
      platform: newInspPlatform,
      content: newInspContent,
      note: newInspNote,
      savedAt: 'Just now',
      iconType
    };

    saveInspirations([newItem, ...savedInspirations]);
    triggerToast(`Added inspiration: "${newInspTitle}"`);
    
    // Reset Form
    setNewInspTitle('');
    setNewInspContent('');
    setNewInspNote('');
    setShowAddForm(false);
  };

  // Pricing format utility
  const formatVal = (inrVal: number, usdVal: number) => {
    return isINR ? `₹${inrVal.toLocaleString('en-IN')}` : `$${usdVal.toLocaleString('en-US')}`;
  };

  // Filtering
  const filteredGigs = savedGigs.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBrands = savedBrands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInspirations = savedInspirations.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Combine and Sort for 'all' tab
  // Sort Gigs by budget/recent, Brands by name/recent, etc.
  const getSortedGigs = () => {
    if (sortBy === 'budget') {
      return [...filteredGigs].sort((a, b) => isINR ? b.budgetINR - a.budgetINR : b.budgetUSD - a.budgetUSD);
    }
    if (sortBy === 'name') {
      return [...filteredGigs].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filteredGigs; // default recent/order
  };

  const getSortedBrands = () => {
    if (sortBy === 'name') {
      return [...filteredBrands].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'budget') {
      return [...filteredBrands].sort((a, b) => isINR ? b.avgPayoutINR - a.avgPayoutINR : b.avgPayoutUSD - a.avgPayoutUSD);
    }
    return filteredBrands;
  };

  const getSortedInspirations = () => {
    if (sortBy === 'name') {
      return [...filteredInspirations].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filteredInspirations;
  };

  const gigsCount = filteredGigs.length;
  const brandsCount = filteredBrands.length;
  const inspirationsCount = filteredInspirations.length;
  const totalCount = gigsCount + brandsCount + inspirationsCount;

  return (
    <div className="saved-view-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 9999,
          fontSize: '13.5px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10B981" />
            <span>{toastMessage}</span>
          </div>
          {lastRemovedItem && (
            <button 
              onClick={handleUndoRemove}
              style={{
                background: 'none',
                border: 'none',
                color: '#EC4899',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '12.5px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(236,72,153,0.1)'
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            Saved Items
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px' }}>
            Access all your bookmarked creator gigs, preferred brands, and aesthetic inspirations.
          </p>
        </div>
        
        {/* Quick action button to add inspiration */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: showAddForm ? 'transparent' : '#EC4899',
            border: showAddForm ? `1px solid ${borderColor}` : 'none',
            color: showAddForm ? primaryText : '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: showAddForm ? 'none' : '0 4px 14px rgba(236, 72, 153, 0.25)'
          }}
          className={showAddForm ? 'hover-white-bg' : 'glow-button'}
        >
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showAddForm ? 'Close Creative Box' : 'Save Inspiration'}</span>
        </button>
      </div>

      {/* Add Inspiration Form (Collapsible Creative Box) */}
      {showAddForm && (
        <div 
          className="glass-panel" 
          style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: '2px solid rgba(236, 72, 153, 0.3)',
            boxShadow: shadowStyle,
            animation: 'fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={18} color="#EC4899" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Save New Inspiration Idea</h3>
          </div>
          
          <form onSubmit={handleAddInspiration} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="add-insp-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText }}>Title</label>
              <input 
                type="text" 
                placeholder="e.g. Cinematic Product Reveal Hook"
                value={newInspTitle}
                onChange={e => setNewInspTitle(e.target.value)}
                style={{
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--hover-bg)',
                  border: `1px solid ${borderColor}`,
                  padding: '0 14px',
                  color: primaryText,
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText }}>Type</label>
                <select
                  value={newInspCategory}
                  onChange={e => setNewInspCategory(e.target.value)}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--hover-bg)',
                    border: `1px solid ${borderColor}`,
                    padding: '0 10px',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Video Hook</option>
                  <option>Transition</option>
                  <option>Trending Audio</option>
                  <option>Scene Concept</option>
                  <option>General Idea</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText }}>Platform</label>
                <select
                  value={newInspPlatform}
                  onChange={e => setNewInspPlatform(e.target.value)}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--hover-bg)',
                    border: `1px solid ${borderColor}`,
                    padding: '0 10px',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Instagram Reels</option>
                  <option>TikTok</option>
                  <option>YouTube Shorts</option>
                  <option>General Notes</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }} className="span-all-col">
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText }}>Idea Details / Content Reference</label>
              <textarea 
                rows={3}
                placeholder="Paste the audio link, hook lines, or describe the sequence details here..."
                value={newInspContent}
                onChange={e => setNewInspContent(e.target.value)}
                style={{
                  borderRadius: '10px',
                  backgroundColor: 'var(--hover-bg)',
                  border: `1px solid ${borderColor}`,
                  padding: '12px 14px',
                  color: primaryText,
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }} className="span-all-col">
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText }}>Quick Note / Campaign Linkage (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Try this water drop transition on Mamaearth face serum video next week."
                value={newInspNote}
                onChange={e => setNewInspNote(e.target.value)}
                style={{
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--hover-bg)',
                  border: `1px solid ${borderColor}`,
                  padding: '0 14px',
                  color: primaryText,
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '4px' }} className="span-all-col">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  color: primaryText,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                className="hover-white-bg"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: '#EC4899',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                className="glow-button"
              >
                Add to Creative Bookmarks
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      <div 
        className="glass-panel" 
        style={{
          padding: '16px 24px',
          borderRadius: '20px',
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          boxShadow: shadowStyle,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }} className="inner-scroller">
          {[
            { id: 'all', label: 'All Items', count: totalCount },
            { id: 'gigs', label: 'Saved Gigs', count: gigsCount },
            { id: 'brands', label: 'Saved Brands', count: brandsCount },
            { id: 'inspiration', label: 'Creative Ideas', count: inspirationsCount },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                height: '34px',
                padding: '0 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === tab.id ? 'rgba(236,72,153,0.08)' : 'transparent',
                color: activeTab === tab.id ? '#EC4899' : secondaryText,
                border: activeTab === tab.id ? '1px solid rgba(236,72,153,0.25)' : '1px solid transparent',
                fontSize: '12.5px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              className="tab-button"
            >
              <span>{tab.label}</span>
              <span 
                style={{
                  fontSize: '9.5px',
                  backgroundColor: activeTab === tab.id ? '#EC4899' : 'var(--hover-bg)',
                  color: activeTab === tab.id ? '#FFFFFF' : mutedText,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  fontWeight: 700
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort Panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }} className="search-sort-section">
          {/* Inner Search Box */}
          <div style={{ position: 'relative', width: '220px' }} className="search-input-box">
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              placeholder="Search saved..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '34px',
                backgroundColor: 'var(--hover-bg)',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                paddingLeft: '34px',
                paddingRight: '12px',
                fontSize: '12.5px',
                color: primaryText,
                outline: 'none',
                transition: 'all 0.2s'
              }}
            />
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: secondaryText, fontSize: '12.5px' }}>
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              style={{
                height: '34px',
                borderRadius: '8px',
                backgroundColor: 'var(--hover-bg)',
                border: `1px solid ${borderColor}`,
                padding: '0 8px',
                color: primaryText,
                fontSize: '12.5px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="recent">Recently Saved</option>
              <option value="name">Alphabetical</option>
              <option value="budget">Average Budget</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Render Saved Gigs */}
        {(activeTab === 'all' || activeTab === 'gigs') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeTab === 'all' && getSortedGigs().length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px', marginBottom: '4px' }}>
                <BookmarkCheck size={16} color="#EC4899" />
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Saved Gigs ({getSortedGigs().length})</h3>
              </div>
            )}

            {getSortedGigs().length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {getSortedGigs().map(gig => (
                  <div
                    key={gig.id}
                    className="glass-panel hover-card"
                    style={{
                      borderRadius: '20px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      boxShadow: shadowStyle,
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      position: 'relative',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top Row: Brand & Logo & Action */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={gig.brandLogo} 
                          alt={gig.brand} 
                          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} 
                        />
                        <div>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: primaryText, display: 'block' }}>{gig.brand}</span>
                          <span style={{ fontSize: '11px', color: mutedText, display: 'block' }}>{gig.daysLeft} days left to apply</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnsaveGig(gig.id)}
                        title="Unsave Gig"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '6px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        className="hover-danger-bg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Middle: Title & Description */}
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: primaryText, margin: '0 0 6px 0', lineHeight: '1.4' }}>
                        {gig.title}
                      </h4>
                      <p style={{ fontSize: '11.5px', color: secondaryText, margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                        {gig.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {gig.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '9.5px',
                            fontWeight: 650,
                            backgroundColor: 'var(--hover-bg)',
                            color: secondaryText,
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${borderColor}`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: `1px solid ${borderColor}`, marginTop: '4px' }} />

                    {/* Bottom: Budget & Apply */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '9px', color: mutedText, textTransform: 'uppercase', fontWeight: 700 }}>Project Budget</span>
                        <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText }}>
                          {formatVal(gig.budgetINR, gig.budgetUSD)}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => triggerToast(`Navigating to application process for ${gig.title}...`)}
                        style={{
                          backgroundColor: 'transparent',
                          border: `1px solid ${accentColor}`,
                          color: accentColor,
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                        className="hover-accent-bg"
                      >
                        <span>Apply Now</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              activeTab === 'gigs' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg }}>
                  <Bookmark size={40} color={mutedText} style={{ opacity: 0.5, marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '0 0 6px 0' }}>No Saved Gigs</h3>
                  <p style={{ fontSize: '13px', color: secondaryText, maxWidth: '340px', margin: 0 }}>
                    Search active campaigns and bookmark them to keep track of applications.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Render Saved Brands */}
        {(activeTab === 'all' || activeTab === 'brands') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: activeTab === 'all' && getSortedGigs().length > 0 ? '12px' : 0 }}>
            {activeTab === 'all' && getSortedBrands().length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px', marginBottom: '4px' }}>
                <Heart size={16} color="#EC4899" fill="#EC4899" />
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Saved Brands ({getSortedBrands().length})</h3>
              </div>
            )}

            {getSortedBrands().length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {getSortedBrands().map(brand => (
                  <div
                    key={brand.id}
                    className="glass-panel hover-card"
                    style={{
                      borderRadius: '20px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      boxShadow: shadowStyle,
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      position: 'relative',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top Row: Logo, Info, Unsave */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '8px', 
                            backgroundColor: brand.logoBg, 
                            color: brand.logoColor,
                            fontWeight: 800,
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${borderColor}`
                          }}
                        >
                          {brand.logoText}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 800, color: primaryText }}>{brand.name}</span>
                            <span style={{ fontSize: '10px', color: '#EAB308', fontWeight: 700 }}>★ {brand.rating}</span>
                          </div>
                          <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '1px' }}>{brand.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnsaveBrand(brand.id)}
                        title="Unsave Brand"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '6px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        className="hover-danger-bg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '11.5px', color: secondaryText, margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                      {brand.description}
                    </p>

                    {/* Location & Response rate info row */}
                    <div style={{ display: 'flex', gap: '14px', fontSize: '10.5px', color: secondaryText }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color={accentColor} /> {brand.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Info size={12} /> Response: <strong>{brand.responseRate}</strong>
                      </span>
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: `1px solid ${borderColor}` }} />

                    {/* Stats section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '9px', color: mutedText, textTransform: 'uppercase', fontWeight: 700 }}>Average Payout</span>
                        <span style={{ fontSize: '13.5px', fontWeight: 750, color: primaryText }}>
                          {formatVal(brand.avgPayoutINR, brand.avgPayoutUSD)}
                        </span>
                      </div>

                      <button
                        onClick={() => triggerToast(`Opening collaboration pitch helper for ${brand.name}...`)}
                        style={{
                          backgroundColor: 'transparent',
                          border: `1.5px solid ${accentColor}`,
                          color: accentColor,
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                        className="hover-accent-bg"
                      >
                        <span>Pitch Brand</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              activeTab === 'brands' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg }}>
                  <Heart size={40} color={mutedText} style={{ opacity: 0.5, marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '0 0 6px 0' }}>No Saved Brands</h3>
                  <p style={{ fontSize: '13px', color: secondaryText, maxWidth: '340px', margin: 0 }}>
                    Add preferred brands to your bookmarks to keep track of active openings or pitch details.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Render Saved Inspirations */}
        {(activeTab === 'all' || activeTab === 'inspiration') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: activeTab === 'all' && (getSortedGigs().length > 0 || getSortedBrands().length > 0) ? '12px' : 0 }}>
            {activeTab === 'all' && getSortedInspirations().length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px', marginBottom: '4px' }}>
                <Sparkles size={16} color="#EC4899" />
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Creative Ideas & Inspirations ({getSortedInspirations().length})</h3>
              </div>
            )}

            {getSortedInspirations().length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {getSortedInspirations().map(insp => {
                  let icon = <FileText size={16} />;
                  let iconBg = 'rgba(139, 92, 246, 0.08)';
                  let iconColor = '#8B5CF6';
                  if (insp.iconType === 'hook') {
                    icon = <Video size={16} />;
                    iconBg = 'rgba(236, 72, 153, 0.08)';
                    iconColor = '#EC4899';
                  } else if (insp.iconType === 'audio') {
                    icon = <Music size={16} />;
                    iconBg = 'rgba(16, 185, 129, 0.08)';
                    iconColor = '#10B981';
                  } else if (insp.iconType === 'transition') {
                    icon = <Play size={16} />;
                    iconBg = 'rgba(59, 130, 246, 0.08)';
                    iconColor = '#3B82F6';
                  } else if (insp.iconType === 'idea') {
                    icon = <Sparkles size={16} />;
                    iconBg = 'rgba(236, 72, 153, 0.08)';
                    iconColor = '#EC4899';
                  }

                  return (
                    <div
                      key={insp.id}
                      className="glass-panel hover-card"
                      style={{
                        borderRadius: '20px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: cardBg,
                        boxShadow: shadowStyle,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        position: 'relative',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Top Row: Icon Type Tag & Unsave */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div 
                            style={{ 
                              width: '28px', 
                              height: '28px', 
                              borderRadius: '6px', 
                              backgroundColor: iconBg, 
                              color: iconColor, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center' 
                            }}
                          >
                            {icon}
                          </div>
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: iconColor }}>{insp.category}</span>
                            <span style={{ fontSize: '9px', color: mutedText, display: 'block' }}>{insp.platform}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleUnsaveInspiration(insp.id)}
                          title="Delete Inspiration"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          className="hover-danger-bg"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Content: Title & details */}
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: primaryText, margin: '0 0 6px 0', lineHeight: '1.4' }}>
                          {insp.title}
                        </h4>
                        <div 
                          style={{ 
                            fontSize: '12px', 
                            color: secondaryText, 
                            lineHeight: '1.5',
                            backgroundColor: 'var(--hover-bg)', 
                            padding: '10px 12px', 
                            borderRadius: '10px',
                            borderLeft: `3px solid ${iconColor}`,
                            fontStyle: 'italic'
                          }}
                        >
                          "{insp.content}"
                        </div>
                      </div>

                      {/* Custom note linked */}
                      {insp.note && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', backgroundColor: 'rgba(236,72,153,0.03)', padding: '8px 10px', borderRadius: '8px', border: `1px dashed ${borderColor}` }}>
                          <AlignLeft size={12} color={accentColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                          <p style={{ fontSize: '10.5px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
                            <strong>Creator Note:</strong> {insp.note}
                          </p>
                        </div>
                      )}

                      {/* Date saved footer */}
                      <span style={{ fontSize: '9px', color: mutedText, textAlign: 'right', display: 'block', marginTop: 'auto' }}>
                        Saved {insp.savedAt}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              activeTab === 'inspiration' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg }}>
                  <Sparkles size={40} color={mutedText} style={{ opacity: 0.5, marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '0 0 6px 0' }}>No Saved Inspirations</h3>
                  <p style={{ fontSize: '13px', color: secondaryText, maxWidth: '340px', margin: 0, marginBottom: '16px' }}>
                    Save custom video hooks, transitions, and audio ideas here to build your creative catalog.
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    style={{
                      backgroundColor: '#EC4899',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    className="glow-button"
                  >
                    Save First Idea
                  </button>
                </div>
              )
            )}
          </div>
        )}

        {/* Empty State for "All Items" tab if all columns are empty */}
        {activeTab === 'all' && totalCount === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg }}>
            <Bookmark size={48} color={mutedText} style={{ opacity: 0.5, marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: '0 0 8px 0' }}>Your Saved Space is Empty</h3>
            <p style={{ fontSize: '13.5px', color: secondaryText, maxWidth: '380px', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Bookmarks help you keep track of high-paying creator gigs, connect with partner brands, and store creative ideas.
            </p>
            <button
              onClick={() => {
                setSavedGigs(INITIAL_SAVED_GIGS);
                setSavedBrands(INITIAL_SAVED_BRANDS);
                setSavedInspirations(INITIAL_SAVED_INSPIRATIONS);
                triggerToast('Restored default mock items.');
              }}
              style={{
                backgroundColor: 'transparent',
                border: `1.5px solid ${accentColor}`,
                color: accentColor,
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              className="hover-accent-bg"
            >
              Restore Mock Data
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Animations */
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hover actions */
        .hover-card:hover {
          transform: translateY(-2px);
          border-color: rgba(236, 72, 153, 0.25) !important;
          box-shadow: var(--shadow-style), 0 8px 20px rgba(0,0,0,0.04) !important;
        }
        .light-theme .hover-card:hover {
          box-shadow: var(--shadow-style), 0 8px 20px rgba(236,72,153,0.05) !important;
        }

        .hover-danger-bg:hover {
          background-color: rgba(239, 68, 68, 0.15) !important;
          color: #EF4444 !important;
        }

        .hover-accent-bg:hover {
          background-color: rgba(236, 72, 153, 0.08) !important;
          border-color: #DB2777 !important;
          color: #DB2777 !important;
        }

        .tab-button:hover {
          background-color: rgba(236, 72, 153, 0.04) !important;
        }

        /* Responsive styling hacks */
        @media (max-width: 768px) {
          .add-insp-grid {
            grid-template-columns: 1fr !important;
          }
          .span-all-col {
            grid-column: span 1 !important;
          }
        }
      `}</style>

    </div>
  );
}
