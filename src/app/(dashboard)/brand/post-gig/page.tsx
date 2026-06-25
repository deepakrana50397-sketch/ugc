'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createGig } from '@/lib/services';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  Check, 
  Flame, 
  Award, 
  Coins, 
  Clock, 
  Camera, 
  Scissors, 
  Layers, 
  Volume2, 
  Tv, 
  Eye, 
  Zap, 
  Briefcase,
  Lightbulb
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

// Define friendly names and icons for categories
const CATEGORIES = [
  { id: 'video_creator', label: 'UGC Video Creator', description: 'Raw clips, reels, product tests', icon: Camera },
  { id: 'video_ad', label: 'Video Ad Creator', description: 'Fully directed & styled commercials', icon: Tv },
  { id: 'product_demo', label: 'Product Demo Review', description: 'Feature walkthroughs & tutorial videos', icon: Zap },
  { id: 'editor', label: 'Video Editor', description: 'Trimming, transitions, captions', icon: Scissors },
  { id: 'motion_designer', label: 'Motion Designer', description: 'Animated titles, intro/outro, VFX', icon: Layers },
  { id: 'other', label: 'Voiceover & Audio', description: 'Voiceovers, podcasts, sound bytes', icon: Volume2 },
];

export default function BrandPostGigPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  
  // Basic states
  const [formData, setFormData] = useState({
    title: '',
    category: 'video_creator',
    description: '',
    rateINR: '6000',
    rateUSD: '75',
    deadline: 'ASAP',
    isUrgent: false,
    isFeatured: false,
  });

  const [paymentType, setPaymentType] = useState<'fixed' | 'milestone' | 'contract'>('fixed');
  
  // Custom checklist states
  const [tagsList, setTagsList] = useState<string[]>(['Skincare', 'UGC', 'Reel']);
  const [tagInput, setTagInput] = useState('');
  
  const [deliverablesList, setDeliverablesList] = useState<string[]>([
    '1x Edited 9:16 vertical video (30-45s)',
    'Raw b-roll footage of product application'
  ]);
  const [delivInput, setDelivInput] = useState('');
  
  const [requirementsList, setRequirementsList] = useState<string[]>([
    'Must have bright natural lighting setup',
    'High-resolution vertical smartphone video (1080p, 60fps)'
  ]);
  const [reqInput, setReqInput] = useState('');

  // AI assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Sync with AI view query parameter if present
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'brief-ai') {
      // Smooth scroll to guidelines/AI section or activate preset
      const element = document.getElementById('ai-assistant-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  // Handle budget currency syncing
  const handleBudgetChange = (val: string, type: 'INR' | 'USD') => {
    if (type === 'INR') {
      setFormData(prev => ({
        ...prev,
        rateINR: val,
        rateUSD: val ? Math.round(parseFloat(val) / 80).toString() : '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        rateUSD: val,
        rateINR: val ? Math.round(parseFloat(val) * 80).toString() : '',
      }));
    }
  };

  // Tag compiler helpers
  const handleAddTag = (tagText: string) => {
    const cleaned = tagText.replace(/#/g, '').trim();
    if (!cleaned) return;
    if (tagsList.includes(cleaned)) {
      setTagInput('');
      return;
    }
    setTagsList(prev => [...prev, cleaned]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagsList(prev => prev.filter(t => t !== tagToRemove));
  };

  // Deliverables helpers
  const handleAddDeliverable = () => {
    if (!delivInput.trim()) return;
    setDeliverablesList(prev => [...prev, delivInput.trim()]);
    setDelivInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverablesList(prev => prev.filter((_, i) => i !== index));
  };

  // Requirements helpers
  const handleAddRequirement = () => {
    if (!reqInput.trim()) return;
    setRequirementsList(prev => [...prev, reqInput.trim()]);
    setReqInput('');
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirementsList(prev => prev.filter((_, i) => i !== index));
  };

  // AI Brief generator logic
  const generateBriefWithAI = (templateType: string, customText?: string) => {
    setAiGenerating(true);
    setAiSuccessMessage('');

    let mockBrief = {
      title: '',
      category: 'video_creator',
      tags: [] as string[],
      description: '',
      requirements: [] as string[],
      deliverables: [] as string[],
      rateINR: '6000',
      rateUSD: '75',
    };

    if (templateType === 'custom' && customText) {
      const lower = customText.toLowerCase();
      if (lower.includes('skin') || lower.includes('serum') || lower.includes('beauty') || lower.includes('face') || lower.includes('hair') || lower.includes('cream')) {
        mockBrief = {
          title: `Aesthetic UGC Showcase: ${customText.substring(0, 30)}`,
          category: 'video_creator',
          tags: ['Skincare', 'SelfCare', 'TextureASMR', 'Glow', 'UGC'],
          description: `Looking for an aesthetic, authentic creator to capture a morning/night routine featuring our brand new skincare serum: "${customText}". The video should highlight the application texture (close-up droplet shot) and showcase natural, filtered-free skin. Tone should be relaxing, cozy, and aspirational.`,
          requirements: [
            'Neat bathroom or vanity space with plenty of natural daylight',
            'No heavy makeup or skin filters during product application',
            'Clean vertical recording at 1080p, 60fps',
            'Full 6 months organic social amplification rights'
          ],
          deliverables: [
            '1x Edited vertical 9:16 Video (30-45 seconds) with caption tracks',
            '3x High-quality aesthetic vanity counter staging photographs',
            'Raw unedited aesthetic textures B-roll footage (30 seconds)'
          ],
          rateINR: '6400',
          rateUSD: '80',
        };
      } else if (lower.includes('app') || lower.includes('software') || lower.includes('saas') || lower.includes('website') || lower.includes('finance') || lower.includes('mobile')) {
        mockBrief = {
          title: `${customText.substring(0, 30)} SaaS Tool Walkthrough`,
          category: 'product_demo',
          tags: ['SaaS', 'Fintech', 'AppTutorial', 'Walkthrough', 'TechReview'],
          description: `We need a tech-savvy UGC host to do a screen walkthrough and energetic review of our platform: "${customText}". Explain how the app solves a budget/productivity problem within the first 5 seconds. Use screen overlays, captions, and dynamic zoom effects.`,
          requirements: [
            'Crystal-clear microphone audio setup (no room echo)',
            'Smooth screen recording capture at 1080p resolution',
            'Enthusiastic and professional direct-to-camera presenter style',
            'No blur or lag on visual interfaces shown'
          ],
          deliverables: [
            '1x Final edited app tutorial video (60 seconds) with graphic overlays',
            '1x Clean voiceover narration MP3 audio track file',
            '3x Action-shot UI layout social media banners'
          ],
          rateINR: '8000',
          rateUSD: '100',
        };
      } else if (lower.includes('unboxing') || lower.includes('earbuds') || lower.includes('gadget') || lower.includes('keyboard') || lower.includes('tech') || lower.includes('charge')) {
        mockBrief = {
          title: `Premium Tech Unboxing: ${customText.substring(0, 30)}`,
          category: 'product_demo',
          tags: ['TechUnboxing', 'Gadgets', 'ProductDemo', 'Setup', 'Unboxing'],
          description: `Create an clean aesthetic unboxing sequence of our gadget: "${customText}". Showcase the outer packaging slides, immediate design close-ups, case aesthetics, and a live demonstration of it in use. Keep pacing snappy, focusing on premium build quality and sound effects.`,
          requirements: [
            'Clear table setup with ambient desktop backlighting',
            'Extremely sharp focal depth on product close-up shots',
            'High-quality audio capturing the physical product clicks and unwrapping sounds',
            'Experience creating premium tech-review style aesthetics'
          ],
          deliverables: [
            '1x Snappy tech unboxing and review reel (45-60 seconds)',
            '5x High-quality flatlay product setups',
            'All raw unboxing sound clips'
          ],
          rateINR: '9600',
          rateUSD: '120',
        };
      } else if (lower.includes('fashion') || lower.includes('clothing') || lower.includes('dress') || lower.includes('try') || lower.includes('lookbook') || lower.includes('wear')) {
        mockBrief = {
          title: `Summer Lookbook Styling: ${customText.substring(0, 30)}`,
          category: 'video_creator',
          tags: ['Fashion', 'Lookbook', 'Styling', 'TryOn', 'Outfits'],
          description: `Looking for a fashion creator to style 3 seasonal outfits featuring "${customText}". The video should feature quick style transitions, fabric details, and a commentary describing how the garment fits and coordinates. Let your personal style shine!`,
          requirements: [
            'Clean minimalist room or bright modern backdrop',
            'High-energy styling transitions matched to lofi beats',
            'Show outfits head-to-toe with stylish shoe coordination',
            'Bright lighting showing true textile and color representation'
          ],
          deliverables: [
            '1x Fast-cut transition styling reel (30-60s) with captions',
            '3x Curated lookbook photos of each complete outfit',
            'Raw close-up video clips of stitching and fabrics'
          ],
          rateINR: '7200',
          rateUSD: '90',
        };
      } else {
        // General Campaign Template
        mockBrief = {
          title: `UGC Brand Brief: ${customText.substring(0, 30)}`,
          category: 'video_creator',
          tags: ['UGC', 'BrandCampaign', 'CreativeReview', 'Unboxing'],
          description: `We are launching a new promotional drive for "${customText}" and want authentic UGC creators to share how this fits into their daily routine. Capture an engaging hook, a brief problem-statement, and demonstrate the product in action. Style should feel like a personal recommendation.`,
          requirements: [
            'Conversational, natural tone of voice (avoid hard-sales)',
            'Clear sound quality and brightly lit setup',
            'Show the actual packaging and product logo clearly',
            'Non-exclusive organic digital usage rights'
          ],
          deliverables: [
            '1x Edited organic vertical video brief (30-60s)',
            '2x High-resolution product lifestyle photos',
            'Raw B-roll of product usage shots'
          ],
          rateINR: '5000',
          rateUSD: '62',
        };
      }
    } else {
      // Pre-seeded template mappings
      switch (templateType) {
        case 'skincare':
          mockBrief = {
            title: "Aesthetic ASMR Skincare Routine Review",
            category: 'video_creator',
            tags: ['Skincare', 'ASMR', 'MorningRoutine', 'Glow', 'SelfCare'],
            description: "Looking for an aesthetic UGC creator to highlight our new Hydrating Vitamin C Glow Serum in a morning routine format. Showcase the product application texture (ASMR drops, glowing skin close-up) and a quick 3-step routine. Background music should be calm lofi, and natural light is preferred. The hook must focus on solving dry morning skin in under 10 seconds.",
            requirements: [
              'Must have good natural lighting and a neat bathroom/vanity setup.',
              'Deliver high-resolution vertical video (1080x1920) in 9:16 aspect ratio.',
              'Show product texture clearly on skin with close-up shots.',
              'Non-exclusive usage rights for organic social channels for 6 months.'
            ],
            deliverables: [
              '1x Edited 9:16 Video (30-45 seconds) with captions',
              '1x Raw unedited clip of product application (texture shot)',
              '3x High-quality aesthetic product staging photos'
            ],
            rateINR: '6000',
            rateUSD: '75'
          };
          break;
        case 'tech':
          mockBrief = {
            title: "Premium Wireless Noise-Cancelling Earbuds Demo",
            category: 'product_demo',
            tags: ['Tech', 'Unboxing', 'ProductDemo', 'Earbuds', 'Audio'],
            description: "We need an engaging, tech-savvy creator to shoot an unboxing and features walkthrough for our next-gen active noise-cancelling (ANC) earbuds. Focus on the sleek case design, comfort fit, and the transparency sound mode. The tone should be conversational, authentic, and direct-to-camera, explaining why these are the ultimate daily-driver earbuds.",
            requirements: [
              'Clear, crisp audio (no echo or room noise).',
              'High-quality close-ups showing the earbuds build quality.',
              'Include B-roll footage showing earbuds being worn in an office/commute setup.',
              'Experience in tech/gadget content style reviews.'
            ],
            deliverables: [
              '1x Video review (60 seconds) with dynamic cuts',
              'All raw B-roll clips (minimum 5 clips)',
              '1x Product thumbnail shot holding the charging case'
            ],
            rateINR: '8000',
            rateUSD: '100'
          };
          break;
        case 'fashion':
          mockBrief = {
            title: "Summer Capsule Wardrobe Try-On Haul & Styling",
            category: 'video_creator',
            tags: ['Fashion', 'Haul', 'Styling', 'SummerOutfit', 'TryOn'],
            description: "Create a styling video highlighting 3 outfits from our new organic cotton Summer Capsule Collection. Show transitions between outfits, describe the breathable fabric feel, and give styling tips (e.g. casual vs semi-formal styling). We want an upbeat, high-energy fashion lover who can make clothing fit transitions look satisfying and fluid.",
            requirements: [
              'Clean, aesthetic background (minimalist room or plain wall).',
              'Show complete outfits from head-to-toe with suitable styling accessories.',
              'Add active on-screen styling notes or subtitles.',
              'Bright, well-lit shots showing true fabric colors.'
            ],
            deliverables: [
              '1x High-energy styling reel (30-60 seconds) with transitions',
              '3x High-res outfit photos showcasing clothing fit',
              'Raw footage of apparel close-up textures'
            ],
            rateINR: '7000',
            rateUSD: '85'
          };
          break;
        case 'voiceover':
          mockBrief = {
            title: "Finance Budgeting App Voiceover & Screen Tutorial",
            category: 'other',
            tags: ['AppPromo', 'Tutorial', 'Finance', 'Voiceover', 'SaaS'],
            description: "Looking for a creator to record an engaging screen recording walk-through of our personal finance budgeting app with a friendly, professional voiceover. Walk the audience through the quick setup, adding a budget category, and viewing the analytics chart. The screen capture must be clean and smooth, and the voiceover should be enthusiastic and clear.",
            requirements: [
              'Professional microphone for high-quality voiceover.',
              'Smooth screen capture at 1080p, 60fps (no lag).',
              'Friendly, conversational, and trustworthy tone of voice.',
              'Ability to blur out any test personal data from the UI.'
            ],
            deliverables: [
              '1x Complete Tutorial Video (60-90 seconds) with overlay subtitles',
              '1x Clean voiceover audio track file (WAV format)',
              '1x App screenshot collage for promotional usage'
            ],
            rateINR: '5000',
            rateUSD: '60'
          };
          break;
      }
    }

    // Simulate AI thinking and drafting
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: mockBrief.title,
        category: mockBrief.category,
        description: mockBrief.description,
        rateINR: mockBrief.rateINR,
        rateUSD: mockBrief.rateUSD,
      }));
      setTagsList(mockBrief.tags);
      setRequirementsList(mockBrief.requirements);
      setDeliverablesList(mockBrief.deliverables);
      
      setAiGenerating(false);
      setAiSuccessMessage('✨ Brief successfully drafted! Check the fields below.');
      
      // Auto-clear success message after 4s
      setTimeout(() => setAiSuccessMessage(''), 4000);
    }, 1500);
  };

  // Submit BRIEF handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setLoading(true);
    
    // Simulate database write
    setTimeout(() => {
      createGig({
        title: formData.title,
        category: formData.category as any,
        description: formData.description,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        price: {
          INR: parseFloat(formData.rateINR) || 2000,
          USD: parseFloat(formData.rateUSD) || 30,
        },
        tags: tagsList,
        deadline: formData.deadline,
        isUrgent: formData.isUrgent,
        isFeatured: formData.isFeatured,
        paymentType: paymentType,
        requirements: requirementsList,
        deliverables: deliverablesList,
      });

      setLoading(false);
      setSuccess(true);
    }, 1600);
  };

  // Start countdown when success screen is active
  useEffect(() => {
    if (!success) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/brand/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [success]);

  // Selected category info for preview
  const activeCategoryObject = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[0];
  const CategoryIcon = activeCategoryObject.icon;

  return (
    <div className="post-campaign-container">
      
      {/* Header Row */}
      <div className="campaign-header-row">
        <button
          onClick={() => router.push('/brand/dashboard')}
          className="back-btn-circle"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="campaign-page-title">Post a Campaign Brief</h1>
          <p className="campaign-page-subtitle">
            Compile deliverables, define budget rewards, and find creators tailored for your product needs.
          </p>
        </div>
      </div>

      {success ? (
        /* SUCCESS ANIMATION SCREEN */
        <div className="glass-panel success-card-screen">
          <div className="success-checkmark-wrapper">
            <CheckCircle2 size={72} className="success-icon-pulse" />
            <div className="success-confetti-ring"></div>
          </div>
          <h2 className="success-title">Campaign Brief Published!</h2>
          <p className="success-desc">
            Your campaign details are now live on the public briefs board. Creators are being matched.
          </p>

          <div className="success-summary-box">
            <h3 className="summary-title">Brief Summary</h3>
            <div className="summary-row">
              <span className="summary-label">Title</span>
              <span className="summary-val">{formData.title}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Category</span>
              <span className="summary-val">{activeCategoryObject.label}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Budget Reward</span>
              <span className="summary-val text-primary-accent">
                ₹{parseFloat(formData.rateINR).toLocaleString()} / ${parseFloat(formData.rateUSD).toLocaleString()}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Deliverables</span>
              <span className="summary-val">{deliverablesList.length} items listed</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Placement</span>
              <span className="summary-val">
                {formData.isFeatured ? '⭐️ Featured' : ''} {formData.isUrgent ? '🔥 Urgent' : ''} {!formData.isFeatured && !formData.isUrgent ? 'Standard' : ''}
              </span>
            </div>
          </div>

          <p className="success-countdown">
            Redirecting back to dashboard in <span className="countdown-number">{countdown}</span> seconds...
          </p>
        </div>
      ) : (
        /* MAIN CAMPAIGN BUILDER GRID */
        <div className="campaign-grid">
          
          {/* Left Column: Form Builder */}
          <form onSubmit={handleSubmit} className="campaign-form-section">
            
            {/* Step 1: Campaign Basics */}
            <div className="glass-panel form-card">
              <div className="form-card-header">
                <span className="step-badge">1</span>
                <div>
                  <h2 className="section-title">Campaign Basics</h2>
                  <p className="section-subtitle">Categorize and name your brief to attract target creators.</p>
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Campaign Title <span className="required-star">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SkinGlow Organic Vitamin C Serum TikTok Reel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="premium-input text-normal"
                />
                <span className="input-helper">Keep it clear and specific with the product name and platform.</span>
              </div>

              <div className="form-group">
                <label className="field-label">Content Specialization / Category</label>
                <div className="category-cards-grid">
                  {CATEGORIES.map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`category-item-card ${isSelected ? 'active' : ''}`}
                      >
                        <div className="category-card-icon-wrapper">
                          <CatIcon size={18} />
                        </div>
                        <div className="category-card-content">
                          <span className="category-card-title">{cat.label}</span>
                          <span className="category-card-desc">{cat.description}</span>
                        </div>
                        {isSelected && (
                          <div className="active-card-check">
                            <Check size={10} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Tags & Keywords</label>
                <div className="tags-compiler-wrapper">
                  <div className="tags-chips-container">
                    {tagsList.map((tag, idx) => (
                      <span key={idx} className="tag-chip">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="remove-tag-btn"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input-row">
                    <input
                      type="text"
                      placeholder="Add tag and press Enter or Comma"
                      value={tagInput}
                      onChange={(e) => {
                        if (e.target.value.endsWith(',') || e.target.value.endsWith(' ')) {
                          handleAddTag(e.target.value.slice(0, -1));
                        } else {
                          setTagInput(e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag(tagInput);
                        }
                      }}
                      className="premium-tag-input"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag(tagInput)}
                      className="tag-add-btn"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="tag-suggestions-row">
                  <span className="suggestion-label">Suggested:</span>
                  {['Skincare', 'SaaS', 'ASMR', 'Unboxing', 'Tech', 'TryOn', 'Aesthetic'].map(suggestion => {
                    const exists = tagsList.includes(suggestion);
                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => exists ? handleRemoveTag(suggestion) : handleAddTag(suggestion)}
                        className={`suggestion-pill ${exists ? 'active' : ''}`}
                      >
                        {exists ? '-' : '+'} {suggestion}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: AI Assistant & Guidelines */}
            <div id="ai-assistant-section" className="glass-panel form-card">
              <div className="form-card-header">
                <span className="step-badge bg-ai-gradient">2</span>
                <div style={{ flex: 1 }}>
                  <h2 className="section-title">AI Brief Assistant</h2>
                  <p className="section-subtitle">Draft high-converting briefs instantly using templates or custom prompts.</p>
                </div>
                <Sparkles className="icon-ai-glow animate-pulse" size={20} />
              </div>

              {/* Preset templates selector */}
              <div className="ai-presets-box">
                <span className="presets-label">Click a preset brief template to auto-fill:</span>
                <div className="presets-grid">
                  <button
                    type="button"
                    onClick={() => generateBriefWithAI('skincare')}
                    disabled={aiGenerating}
                    className="ai-preset-btn"
                  >
                    💄 Skincare Routine (ASMR)
                  </button>
                  <button
                    type="button"
                    onClick={() => generateBriefWithAI('tech')}
                    disabled={aiGenerating}
                    className="ai-preset-btn"
                  >
                    🎧 Tech Earbuds Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => generateBriefWithAI('fashion')}
                    disabled={aiGenerating}
                    className="ai-preset-btn"
                  >
                    👗 Summer Outfit Styling
                  </button>
                  <button
                    type="button"
                    onClick={() => generateBriefWithAI('voiceover')}
                    disabled={aiGenerating}
                    className="ai-preset-btn"
                  >
                    📊 Finance App Voiceover
                  </button>
                </div>
              </div>

              {/* Custom Prompter */}
              <div className="ai-custom-prompt-container">
                <div className="prompt-label-row">
                  <Lightbulb size={13} className="text-primary-accent" />
                  <span>Or enter custom product keywords (e.g. Organic Matcha Tea, Yoga Mat):</span>
                </div>
                <div className="ai-prompt-input-row">
                  <input
                    type="text"
                    placeholder="Enter product details..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="prompt-input"
                    disabled={aiGenerating}
                  />
                  <button
                    type="button"
                    onClick={() => generateBriefWithAI('custom', aiPrompt)}
                    disabled={aiGenerating || !aiPrompt.trim()}
                    className="draft-ai-action-btn"
                  >
                    {aiGenerating ? (
                      <div className="ai-loading-spinner" />
                    ) : (
                      <>
                        <Sparkles size={13} />
                        <span>Draft Brief</span>
                      </>
                    )}
                  </button>
                </div>
                
                {aiGenerating && (
                  <div className="ai-progress-status-container">
                    <span className="shimmering-ai-text">🧠 AI Brief Assistant is compiling structured guidelines...</span>
                  </div>
                )}
                
                {aiSuccessMessage && (
                  <div className="ai-success-toast">
                    {aiSuccessMessage}
                  </div>
                )}
              </div>

              <hr className="divider-line" />

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="field-label">Campaign Brief Description <span className="required-star">*</span></label>
                <textarea
                  required
                  rows={6}
                  placeholder="Provide context about your product, what makes it special, style directions, visual pacing, and hooks you want the creator to focus on..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="premium-textarea"
                />
              </div>
            </div>

            {/* Step 3: Key Deliverables & Requirements Checklist */}
            <div className="glass-panel form-card">
              <div className="form-card-header">
                <span className="step-badge">3</span>
                <div>
                  <h2 className="section-title">Guidelines Checklist</h2>
                  <p className="section-subtitle">List exactly what the creator will deliver and who is eligible.</p>
                </div>
              </div>

              {/* Deliverables compiler */}
              <div className="form-group checklist-group-box">
                <label className="field-label">Creator Deliverables Checklist</label>
                <ul className="checklist-render-list">
                  {deliverablesList.map((deliv, index) => (
                    <li key={index} className="checklist-item">
                      <span className="check-bullet">•</span>
                      <span className="checklist-text">{deliv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(index)}
                        className="delete-list-item-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="checklist-input-row">
                  <input
                    type="text"
                    placeholder="e.g. 1x Edited video with caption tracks"
                    value={delivInput}
                    onChange={(e) => setDelivInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    className="checklist-text-input"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="add-list-item-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Requirements compiler */}
              <div className="form-group checklist-group-box" style={{ marginTop: '16px' }}>
                <label className="field-label">Creator Requirements Checklist</label>
                <ul className="checklist-render-list">
                  {requirementsList.map((req, index) => (
                    <li key={index} className="checklist-item">
                      <span className="check-bullet">•</span>
                      <span className="checklist-text">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(index)}
                        className="delete-list-item-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="checklist-input-row">
                  <input
                    type="text"
                    placeholder="e.g. Active Instagram/TikTok portfolio"
                    value={reqInput}
                    onChange={(e) => setReqInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRequirement();
                      }
                    }}
                    className="checklist-text-input"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="add-list-item-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Budget & Timeline */}
            <div className="glass-panel form-card">
              <div className="form-card-header">
                <span className="step-badge">4</span>
                <div>
                  <h2 className="section-title">Timeline & Compensation</h2>
                  <p className="section-subtitle">Specify project deadlines and financial budgets.</p>
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Payment Arrangement</label>
                <div className="payment-toggle-grid">
                  <button
                    type="button"
                    onClick={() => setPaymentType('fixed')}
                    className={`payment-toggle-btn ${paymentType === 'fixed' ? 'active' : ''}`}
                  >
                    <Coins size={14} />
                    <span>Fixed Price Reward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('milestone')}
                    className={`payment-toggle-btn ${paymentType === 'milestone' ? 'active' : ''}`}
                  >
                    <Layers size={14} />
                    <span>Milestone Installments</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('contract')}
                    className={`payment-toggle-btn ${paymentType === 'contract' ? 'active' : ''}`}
                  >
                    <Briefcase size={14} />
                    <span>Hourly Contract</span>
                  </button>
                </div>
              </div>

              <div className="two-column-form-row">
                <div className="form-group flex-1">
                  <label className="field-label">Budget Reward (INR ₹) <span className="required-star">*</span></label>
                  <div className="currency-input-wrapper">
                    <span className="currency-input-prefix">₹</span>
                    <input
                      type="number"
                      required
                      min="1000"
                      placeholder="INR budget"
                      value={formData.rateINR}
                      onChange={(e) => handleBudgetChange(e.target.value, 'INR')}
                      className="premium-input-currency"
                    />
                  </div>
                </div>

                <div className="form-group flex-1">
                  <label className="field-label">Budget Reward (USD $) <span className="required-star">*</span></label>
                  <div className="currency-input-wrapper">
                    <span className="currency-input-prefix">$</span>
                    <input
                      type="number"
                      required
                      min="15"
                      placeholder="USD budget"
                      value={formData.rateUSD}
                      onChange={(e) => handleBudgetChange(e.target.value, 'USD')}
                      className="premium-input-currency"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Timeline Deadline</label>
                <div className="timeline-input-wrapper">
                  <Clock size={15} className="timeline-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Due within 2 weeks / ASAP"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="premium-input-timeline"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Placement Enhancements */}
            <div className="glass-panel form-card">
              <div className="form-card-header">
                <span className="step-badge">5</span>
                <div>
                  <h2 className="section-title">Upgrade Placements</h2>
                  <p className="section-subtitle">Boost application volume and get verified matching quickly.</p>
                </div>
              </div>

              <div className="upgrades-horizontal-grid">
                
                {/* Urgent Card */}
                <label className={`upgrade-card-label ${formData.isUrgent ? 'urgent-active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                    className="hidden-checkbox-input"
                  />
                  <div className="upgrade-checkbox-dummy">
                    {formData.isUrgent && <Check size={12} className="check-color" />}
                  </div>
                  <div className="upgrade-card-icon urgent-badge-color">
                    <Flame size={16} />
                  </div>
                  <div className="upgrade-card-body">
                    <span className="upgrade-title-text">🔥 Flag as Urgent</span>
                    <span className="upgrade-desc-text">Boost creator response rates within 24 hours (+₹999 / $13)</span>
                  </div>
                </label>

                {/* Featured Card */}
                <label className={`upgrade-card-label ${formData.isFeatured ? 'featured-active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="hidden-checkbox-input"
                  />
                  <div className="upgrade-checkbox-dummy">
                    {formData.isFeatured && <Check size={12} className="check-color" />}
                  </div>
                  <div className="upgrade-card-icon featured-badge-color">
                    <Award size={16} />
                  </div>
                  <div className="upgrade-card-body">
                    <span className="upgrade-title-text">⭐️ Pin as Featured</span>
                    <span className="upgrade-desc-text">Pin to top of the dashboard feed for maximum visibility (+₹499 / $6)</span>
                  </div>
                </label>

              </div>

              {/* Submit CTA button */}
              <div className="submit-actions-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="glow-button submit-campaign-btn"
                >
                  {loading ? (
                    <>
                      <div className="submitting-spinner" />
                      <span>Publishing Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Post UGC Brief</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

          {/* Right Column: Sticky Live Creator Preview */}
          <div className="preview-pane-sticky-column">
            <div className="preview-sticky-card glass-panel">
              <div className="preview-title-row">
                <Eye size={14} className="text-secondary-accent" />
                <h3 className="preview-title">Live Creator Feed Preview</h3>
              </div>
              <p className="preview-subtitle">This is how your brief looks to creators browsing the job board.</p>

              {/* Live Mock Card representing Gig item */}
              <div className={`mock-feed-card ${formData.isFeatured ? 'featured-bordered' : ''}`}>
                
                {formData.isUrgent && (
                  <div className="mock-urgent-ribbon">
                    <Flame size={12} />
                    <span>URGENT CAMPAIGN BRIEF</span>
                  </div>
                )}

                <div className="mock-card-header">
                  <div className="mock-brand-monogram">
                    <span>SG</span>
                  </div>
                  <div className="mock-brand-info">
                    <span className="mock-brand-name">SkinGlow India</span>
                    <span className="mock-post-time">Posted just now</span>
                  </div>
                  
                  {formData.isFeatured && (
                    <span className="mock-featured-badge">
                      <Award size={11} />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="mock-card-content">
                  <h4 className="mock-campaign-title">
                    {formData.title ? formData.title : 'Untitled UGC Campaign Brief'}
                  </h4>
                  
                  <div className="mock-category-row">
                    <div className="mock-category-pill">
                      <CategoryIcon size={12} />
                      <span>{activeCategoryObject.label}</span>
                    </div>
                    <div className="mock-payment-pill">
                      <span>Fixed Price</span>
                    </div>
                  </div>

                  <p className="mock-description-preview">
                    {formData.description 
                      ? (formData.description.length > 150 ? formData.description.substring(0, 150) + '...' : formData.description)
                      : 'Provide a product description and instructions to show a description preview here.'}
                  </p>

                  <div className="mock-deliverables-indicators">
                    <span className="deliverable-count">
                      💼 {deliverablesList.length} Deliverable{deliverablesList.length !== 1 ? 's' : ''} Required
                    </span>
                    <span className="requirement-count">
                      ✔ {requirementsList.length} Requirement{requirementsList.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {tagsList.length > 0 && (
                    <div className="mock-tags-list">
                      {tagsList.slice(0, 3).map((tag, i) => (
                        <span key={i} className="mock-tag-item">#{tag}</span>
                      ))}
                      {tagsList.length > 3 && (
                        <span className="mock-tag-excess">+{tagsList.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <hr className="mock-divider" />

                  <div className="mock-card-footer">
                    <div className="mock-budget-reward">
                      <span className="mock-budget-label">Compensation</span>
                      <span className="mock-budget-value">
                        {currency === 'INR' 
                          ? `₹${parseFloat(formData.rateINR || '0').toLocaleString()}`
                          : `$${parseFloat(formData.rateUSD || '0').toLocaleString()}`}
                      </span>
                      <span className="mock-sub-budget">
                        {currency === 'INR' 
                          ? `($${parseFloat(formData.rateUSD || '0').toLocaleString()} USD equivalent)`
                          : `(₹${parseFloat(formData.rateINR || '0').toLocaleString()} INR equivalent)`}
                      </span>
                    </div>

                    <div className="mock-deadline-badge">
                      <Clock size={11} />
                      <span>{formData.deadline || 'ASAP'}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Extra details about listing visibility */}
              <div className="preview-tips-box">
                <h4 className="tips-title">💡 Did you know?</h4>
                <p className="tips-text">
                  Briefs containing dynamic checklists receive up to <strong>45% higher quality application pitches</strong> from creators.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* STYLED JSX STYLESHEET */}
      <style jsx global>{`
        .post-campaign-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1300px;
          margin: 0 auto;
          padding: 8px 0 40px 0;
          font-family: var(--font-sans);
          color: var(--primary-text);
        }

        .campaign-header-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 8px;
        }

        .back-btn-circle {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          width: 42px;
          height: 42px;
          color: var(--primary-text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.2s ease;
        }

        .back-btn-circle:hover {
          background-color: var(--hover-bg);
          transform: translateX(-2px);
        }

        .campaign-page-title {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--primary-text);
          margin: 0;
        }

        .campaign-page-subtitle {
          color: var(--secondary-text);
          font-size: 14px;
          margin-top: 3px;
        }

        /* GRID LAYOUT */
        .campaign-grid {
          display: grid;
          grid-template-columns: 7fr 4fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .campaign-grid {
            grid-template-columns: 1fr;
          }
        }

        .campaign-form-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* CARD STYLINGS */
        .form-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border: 1px solid var(--border-color);
          background-color: var(--card-bg);
        }

        .form-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin-bottom: 4px;
        }

        .step-badge {
          background-color: rgb(var(--primary));
          color: #ffffff;
          font-size: 13px;
          font-weight: 750;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
        }

        .bg-ai-gradient {
          background: linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(219, 39, 119) 100%) !important;
        }

        .icon-ai-glow {
          color: rgb(219, 39, 119);
          filter: drop-shadow(0 0 4px rgba(219, 39, 119, 0.4));
        }

        .section-title {
          font-size: 17px;
          font-weight: 750;
          color: var(--primary-text);
          margin: 0;
        }

        .section-subtitle {
          font-size: 12px;
          color: var(--secondary-text);
          margin-top: 1px;
        }

        /* FORM ELEMENTS */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field-label {
          font-size: 13px;
          font-weight: 650;
          color: var(--primary-text);
        }

        .required-star {
          color: #ef4444;
          font-weight: 700;
        }

        .premium-input {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.015);
          color: var(--primary-text);
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s ease;
        }

        .dark-theme .premium-input {
          background-color: rgba(255,255,255,0.02);
        }

        .input-helper {
          font-size: 11px;
          color: var(--muted-text);
          margin-top: -1px;
        }

        /* CATEGORY CARDS GRID */
        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
          margin-top: 4px;
        }

        .category-item-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.01);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark-theme .category-item-card {
          background-color: rgba(255,255,255,0.015);
        }

        .category-item-card:hover {
          background-color: var(--hover-bg);
          transform: translateY(-2px);
          border-color: rgba(var(--primary), 0.4);
        }

        .category-item-card.active {
          background-color: rgba(var(--primary), 0.04);
          border-color: rgb(var(--primary));
          box-shadow: 0 0 12px rgba(var(--primary), 0.08);
        }

        .category-card-icon-wrapper {
          color: var(--secondary-text);
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justifyContent: center;
          margin-bottom: 10px;
          transition: all 0.2s ease;
        }

        .category-item-card.active .category-card-icon-wrapper {
          background-color: rgb(var(--primary));
          color: #ffffff;
          border-color: rgb(var(--primary));
        }

        .category-card-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .category-card-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--primary-text);
        }

        .category-card-desc {
          font-size: 10.5px;
          color: var(--secondary-text);
          line-height: 1.3;
        }

        .active-card-check {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgb(var(--primary));
          color: #ffffff;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        /* TAGS COMPILER */
        .tags-compiler-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 10px;
          background-color: rgba(0,0,0,0.015);
        }

        .dark-theme .tags-compiler-wrapper {
          background-color: rgba(255,255,255,0.02);
        }

        .tags-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          background-color: rgba(var(--primary), 0.08);
          color: rgb(var(--primary));
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(var(--primary), 0.15);
        }

        .remove-tag-btn {
          background: none;
          border: none;
          color: rgb(var(--primary));
          cursor: pointer;
          font-size: 14px;
          padding: 0 0 2px 0;
          line-height: 1;
          font-weight: 700;
        }

        .remove-tag-btn:hover {
          color: #ef4444;
        }

        .tag-input-row {
          display: flex;
          gap: 8px;
          align-items: center;
          border-top: 1px dashed var(--border-color);
          padding-top: 8px;
          margin-top: 4px;
        }

        .premium-tag-input {
          background: none;
          border: none;
          flex: 1;
          color: var(--primary-text);
          font-size: 12.5px;
          outline: none;
        }

        .tag-add-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--primary-text);
          width: 24px;
          height: 24px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.2s;
        }

        .tag-add-btn:hover {
          background-color: var(--hover-bg);
          color: rgb(var(--primary));
        }

        .tag-suggestions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }

        .suggestion-label {
          font-size: 11px;
          color: var(--muted-text);
          margin-right: 4px;
        }

        .suggestion-pill {
          font-size: 10.5px;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--secondary-text);
          padding: 3px 8px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-pill:hover {
          border-color: rgb(var(--primary));
          color: rgb(var(--primary));
        }

        .suggestion-pill.active {
          background-color: rgba(var(--primary), 0.08);
          border-color: rgb(var(--primary));
          color: rgb(var(--primary));
        }

        /* AI PRESETS & PROMPT PANEL */
        .ai-presets-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: rgba(var(--primary), 0.02);
          border: 1px solid rgba(var(--primary), 0.08);
          border-radius: 12px;
          padding: 14px;
        }

        .presets-label {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--secondary-text);
        }

        .presets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
        }

        .ai-preset-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--primary-text);
          font-size: 12px;
          font-weight: 650;
          padding: 8px 12px;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-preset-btn:hover {
          border-color: rgb(219, 39, 119);
          background-color: rgba(219, 39, 119, 0.03);
          transform: translateY(-1px);
        }

        .ai-custom-prompt-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        .prompt-label-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--secondary-text);
        }

        .ai-prompt-input-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .prompt-input {
          flex: 1;
          padding: 9px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: var(--card-bg);
          color: var(--primary-text);
          font-size: 12.5px;
          outline: none;
        }

        .draft-ai-action-btn {
          background: linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(219, 39, 119) 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 0 16px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .draft-ai-action-btn:hover:not(:disabled) {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(219, 39, 119, 0.3);
        }

        .draft-ai-action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ai-loading-spinner {
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          animation: spin 1s linear infinite;
        }

        .ai-progress-status-container {
          background-color: rgba(219, 39, 119, 0.05);
          border-radius: 6px;
          padding: 8px 12px;
          border-left: 3px solid rgb(219, 39, 119);
          margin-top: 4px;
        }

        .shimmering-ai-text {
          font-size: 11.5px;
          color: rgb(219, 39, 119);
          font-weight: 600;
        }

        .ai-success-toast {
          background-color: rgba(16, 185, 129, 0.06);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 11.5px;
          font-weight: 700;
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.15);
          margin-top: 4px;
          animation: fadeIn 0.3s ease;
        }

        .divider-line {
          border: 0;
          height: 1px;
          background-color: var(--border-color);
          margin: 4px 0;
        }

        .premium-textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.015);
          color: var(--primary-text);
          font-size: 13.5px;
          outline: none;
          resize: vertical;
          transition: all 0.2s ease;
        }

        .dark-theme .premium-textarea {
          background-color: rgba(255,255,255,0.02);
        }

        /* CHECKLIST COMPILERS */
        .checklist-group-box {
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          background-color: rgba(0,0,0,0.005);
        }

        .dark-theme .checklist-group-box {
          background-color: rgba(255,255,255,0.01);
        }

        .checklist-render-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
          padding: 0;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          color: var(--secondary-text);
          background-color: var(--card-bg);
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .check-bullet {
          color: rgb(var(--primary));
          font-weight: 800;
        }

        .checklist-text {
          flex: 1;
        }

        .delete-list-item-btn {
          background: none;
          border: none;
          color: var(--muted-text);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .delete-list-item-btn:hover {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.08);
        }

        .checklist-input-row {
          display: flex;
          gap: 8px;
        }

        .checklist-text-input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: var(--card-bg);
          color: var(--primary-text);
          font-size: 12.5px;
          outline: none;
        }

        .add-list-item-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--primary-text);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.2s;
        }

        .add-list-item-btn:hover {
          border-color: rgb(var(--primary));
          color: rgb(var(--primary));
          background-color: rgba(var(--primary), 0.04);
        }

        /* BUDGETS AND TIMELINES */
        .payment-toggle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 10px;
          margin-bottom: 4px;
        }

        .payment-toggle-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--secondary-text);
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 650;
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .payment-toggle-btn:hover {
          background-color: var(--hover-bg);
          color: var(--primary-text);
        }

        .payment-toggle-btn.active {
          border-color: rgb(var(--primary));
          background-color: rgba(var(--primary), 0.04);
          color: rgb(var(--primary));
        }

        .two-column-form-row {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 600px) {
          .two-column-form-row {
            flex-direction: column;
            gap: 12px;
          }
        }

        .currency-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .currency-input-prefix {
          position: absolute;
          left: 12px;
          font-size: 14px;
          font-weight: 700;
          color: var(--muted-text);
        }

        .premium-input-currency {
          width: 100%;
          padding: 10px 12px 10px 28px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.015);
          color: var(--primary-text);
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s;
        }

        .dark-theme .premium-input-currency {
          background-color: rgba(255,255,255,0.02);
        }

        .timeline-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .timeline-icon {
          position: absolute;
          left: 12px;
          color: var(--muted-text);
        }

        .premium-input-timeline {
          width: 100%;
          padding: 10px 12px 10px 34px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.015);
          color: var(--primary-text);
          font-size: 13.5px;
          outline: none;
        }

        .dark-theme .premium-input-timeline {
          background-color: rgba(255,255,255,0.02);
        }

        /* UPGRADES CARDS */
        .upgrades-horizontal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .upgrades-horizontal-grid {
            grid-template-columns: 1fr;
          }
        }

        .upgrade-card-label {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.008);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark-theme .upgrade-card-label {
          background-color: rgba(255,255,255,0.01);
        }

        .upgrade-card-label:hover {
          background-color: var(--hover-bg);
          transform: translateY(-1px);
        }

        .hidden-checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .upgrade-checkbox-dummy {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 2px solid var(--border-color);
          background-color: var(--card-bg);
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .upgrade-card-label.urgent-active .upgrade-checkbox-dummy {
          border-color: #f97316;
          background-color: #f97316;
        }

        .upgrade-card-label.featured-active .upgrade-checkbox-dummy {
          border-color: #eab308;
          background-color: #eab308;
        }

        .check-color {
          color: #ffffff;
        }

        .upgrade-card-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
        }

        .urgent-badge-color {
          background-color: rgba(249, 115, 22, 0.08);
          color: #f97316;
        }

        .featured-badge-color {
          background-color: rgba(234, 179, 8, 0.08);
          color: #eab308;
        }

        .upgrade-card-label.urgent-active {
          border-color: #f97316;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.06);
          background-color: rgba(249, 115, 22, 0.02);
        }

        .upgrade-card-label.featured-active {
          border-color: #eab308;
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.06);
          background-color: rgba(234, 179, 8, 0.02);
        }

        .upgrade-card-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .upgrade-title-text {
          font-size: 13px;
          font-weight: 700;
        }

        .upgrade-desc-text {
          font-size: 10.5px;
          color: var(--secondary-text);
          line-height: 1.3;
        }

        .submit-actions-row {
          display: flex;
          justifyContent: flex-end;
          width: 100%;
          margin-top: 8px;
        }

        .submit-campaign-btn {
          background-color: rgb(var(--primary));
          color: #ffffff;
          border: none;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(var(--primary), 0.25);
          transition: all 0.3s ease;
        }

        .submit-campaign-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(var(--primary), 0.35);
        }

        .submitting-spinner {
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          animation: spin 1s linear infinite;
        }

        /* PREVIEW STICKY COLUMN */
        .preview-pane-sticky-column {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .preview-sticky-card {
          padding: 24px;
          border: 1px solid var(--border-color);
          background-color: var(--card-bg);
        }

        .preview-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-text);
          margin-bottom: 4px;
        }

        .text-secondary-accent {
          color: rgb(219, 39, 119);
        }

        .preview-title {
          font-size: 14px;
          font-weight: 750;
          margin: 0;
        }

        .preview-subtitle {
          font-size: 11.5px;
          color: var(--secondary-text);
          margin-bottom: 20px;
        }

        /* LIVE GIG FEED CARD */
        .mock-feed-card {
          position: relative;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px;
          box-shadow: var(--shadow-style, 0 4px 12px rgba(0,0,0,0.03));
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .mock-feed-card.featured-bordered {
          border: 2px solid #eab308;
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.12);
        }

        .mock-urgent-ribbon {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #ea580c, #f97316);
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 4px 12px;
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 4px;
        }

        .mock-feed-card.featured-bordered .mock-urgent-ribbon {
          top: 0;
        }

        .mock-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 0;
          margin-bottom: 14px;
        }

        .mock-urgent-ribbon + .mock-card-header {
          margin-top: 14px;
        }

        .mock-brand-monogram {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(219, 39, 119) 100%);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .mock-brand-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
          flex: 1;
        }

        .mock-brand-name {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--primary-text);
        }

        .mock-post-time {
          font-size: 10px;
          color: var(--muted-text);
        }

        .mock-featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: rgba(234, 179, 8, 0.08);
          border: 1px solid rgba(234, 179, 8, 0.15);
          color: #eab308;
          font-size: 9.5px;
          font-weight: 750;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .mock-card-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mock-campaign-title {
          font-size: 14.5px;
          font-weight: 800;
          color: var(--primary-text);
          line-height: 1.25;
          margin: 0;
        }

        .mock-category-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .mock-category-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: var(--hover-bg);
          border: 1px solid var(--border-color);
          color: var(--secondary-text);
          font-size: 10.5px;
          font-weight: 650;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .mock-payment-pill {
          background-color: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.12);
          color: #10b981;
          font-size: 9.5px;
          font-weight: 700;
          padding: 2.5px 7px;
          border-radius: 4px;
        }

        .mock-description-preview {
          font-size: 11.5px;
          color: var(--secondary-text);
          line-height: 1.4;
          margin: 0;
        }

        .mock-deliverables-indicators {
          display: flex;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          color: var(--secondary-text);
        }

        .mock-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .mock-tag-item {
          font-size: 10.5px;
          color: rgb(var(--primary));
          font-weight: 650;
        }

        .mock-tag-excess {
          font-size: 10px;
          color: var(--muted-text);
        }

        .mock-divider {
          border: 0;
          height: 1px;
          background-color: var(--border-color);
          margin: 4px 0;
        }

        .mock-card-footer {
          display: flex;
          justifyContent: space-between;
          align-items: center;
        }

        .mock-budget-reward {
          display: flex;
          flex-direction: column;
        }

        .mock-budget-label {
          font-size: 9.5px;
          color: var(--muted-text);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .mock-budget-value {
          font-size: 16px;
          font-weight: 800;
          color: rgb(var(--primary));
          line-height: 1.2;
        }

        .mock-sub-budget {
          font-size: 9.5px;
          color: var(--secondary-text);
        }

        .mock-deadline-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--secondary-text);
          font-size: 10.5px;
          font-weight: 650;
          background-color: var(--hover-bg);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .preview-tips-box {
          background-color: rgba(79, 70, 229, 0.02);
          border: 1px solid rgba(79, 70, 229, 0.08);
          border-radius: 12px;
          padding: 14px;
        }

        .tips-title {
          font-size: 12px;
          font-weight: 750;
          color: rgb(var(--primary));
          margin: 0 0 4px 0;
        }

        .tips-text {
          font-size: 11px;
          color: var(--secondary-text);
          line-height: 1.35;
          margin: 0;
        }

        /* SUCCESS CARD SCREEN */
        .success-card-screen {
          max-width: 580px;
          margin: 40px auto;
          padding: 48px 36px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          border: 1px solid #10b981;
          box-shadow: 0 20px 40px -15px rgba(16, 185, 129, 0.1);
        }

        .success-checkmark-wrapper {
          position: relative;
          color: #10b981;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .success-icon-pulse {
          animation: scalePulse 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes scalePulse {
          0% { transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .success-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--primary-text);
          margin: 0;
        }

        .success-desc {
          font-size: 13.5px;
          color: var(--secondary-text);
          max-width: 440px;
          margin: 0;
        }

        .success-summary-box {
          width: 100%;
          border: 1px solid var(--border-color);
          background-color: rgba(0,0,0,0.01);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }

        .dark-theme .success-summary-box {
          background-color: rgba(255,255,255,0.015);
        }

        .summary-title {
          font-size: 12.5px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted-text);
          margin: 0 0 4px 0;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 6px;
        }

        .summary-row {
          display: flex;
          justifyContent: space-between;
          font-size: 12.5px;
        }

        .summary-label {
          color: var(--secondary-text);
        }

        .summary-val {
          font-weight: 700;
          color: var(--primary-text);
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .text-primary-accent {
          color: rgb(var(--primary));
        }

        .success-countdown {
          font-size: 12.5px;
          color: var(--muted-text);
          margin-top: 8px;
        }

        .countdown-number {
          font-weight: 800;
          color: rgb(var(--primary));
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
