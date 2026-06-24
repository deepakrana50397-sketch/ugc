'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Clock, Check, X, Calendar, 
  ArrowUpRight, FileText, Upload, HelpCircle, Edit, MoreVertical,
  CheckCircle2, AlertCircle, Trash2, Sliders
} from 'lucide-react';

interface ContractsViewProps {
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

interface ContractItem {
  id: string;
  brand: string;
  project: string;
  tag: string;
  type: string;
  contractId: string;
  value: string;
  duration: string;
  daysText: string;
  status: 'Active' | 'In Review' | 'Completed' | 'Pending' | 'Cancelled' | 'Draft';
  nextStep: string;
  nextStepSub: string;
  nextStepType: 'upload' | 'inbox' | 'clock' | 'checkmark' | 'sign' | 'cancelled';
  logoBg: string;
  logoColor: string;
  logoText: string;
}

const INITIAL_CONTRACTS: ContractItem[] = [
  {
    id: 'ctr-12',
    brand: 'Nykaa',
    project: 'Skincare UGC Campaign',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0012',
    value: '₹25,000',
    duration: 'May 20 – Jun 10, 2024',
    daysText: '22 days',
    status: 'Active',
    nextStep: 'Submit Deliverables',
    nextStepSub: 'Due in 5 days',
    nextStepType: 'upload',
    logoBg: '#FCE7F3',
    logoColor: '#DB2777',
    logoText: 'N'
  },
  {
    id: 'ctr-11',
    brand: 'Mamaearth',
    project: 'Product Review Videos',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0011',
    value: '₹18,000',
    duration: 'May 18 – Jun 1, 2024',
    daysText: '15 days',
    status: 'Active',
    nextStep: 'Brand Feedback',
    nextStepSub: 'Due in 2 days',
    nextStepType: 'inbox',
    logoBg: '#DCFCE7',
    logoColor: '#16A34A',
    logoText: 'm'
  },
  {
    id: 'ctr-10',
    brand: 'Boat Lifestyle',
    project: 'YouTube Review Video',
    tag: 'YouTube',
    type: 'Project Based',
    contractId: 'CTR-2024-0010',
    value: '₹15,000',
    duration: 'May 15 – May 29, 2024',
    daysText: '14 days',
    status: 'In Review',
    nextStep: 'Waiting for Approval',
    nextStepSub: 'Submitted on May 26',
    nextStepType: 'clock',
    logoBg: '#F3F4F6',
    logoColor: '#1F2937',
    logoText: 'boAt'
  },
  {
    id: 'ctr-9',
    brand: 'Zomato',
    project: 'Food Reels Campaign',
    tag: 'Instagram Reels',
    type: 'Project Based',
    contractId: 'CTR-2024-0009',
    value: '₹12,000',
    duration: 'May 10 – May 20, 2024',
    daysText: '10 days',
    status: 'Completed',
    nextStep: 'Completed',
    nextStepSub: 'May 20, 2024',
    nextStepType: 'checkmark',
    logoBg: '#FEE2E2',
    logoColor: '#DC2626',
    logoText: 'Z'
  },
  {
    id: 'ctr-8',
    brand: 'Philips India',
    project: 'Product Demo Video',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0008',
    value: '₹20,000',
    duration: 'May 5 – May 18, 2024',
    daysText: '14 days',
    status: 'Active', // Active in stats box breakdown
    nextStep: 'Completed',
    nextStepSub: 'May 18, 2024',
    nextStepType: 'checkmark',
    logoBg: '#DBEAFE',
    logoColor: '#2563EB',
    logoText: 'P'
  },
  {
    id: 'ctr-7',
    brand: 'Wow Skin Science',
    project: 'UGC Content Series',
    tag: 'UGC Photo',
    type: 'Retainer',
    contractId: 'CTR-2024-0007',
    value: '₹30,000 /mo',
    duration: 'May 1 – Jul 31, 2024',
    daysText: '3 months',
    status: 'Pending',
    nextStep: 'Review & Sign',
    nextStepSub: 'Sent on May 24',
    nextStepType: 'sign',
    logoBg: '#F4F4F5',
    logoColor: '#18181B',
    logoText: 'W'
  },
  {
    id: 'ctr-6',
    brand: 'Tata CLiQ',
    project: 'Lifestyle Product Video',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0006',
    value: '₹17,500',
    duration: 'Apr 28 – May 10, 2024',
    daysText: '12 days',
    status: 'Cancelled',
    nextStep: '-',
    nextStepSub: 'Cancelled on May 8',
    nextStepType: 'cancelled',
    logoBg: '#FFF1F2',
    logoColor: '#E11D48',
    logoText: 'T'
  },
  {
    id: 'ctr-5',
    brand: 'The Derma Co.',
    project: 'Skincare Testimonial Videos',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0005',
    value: '₹22,000',
    duration: 'Apr 25 – May 10, 2024',
    daysText: '16 days',
    status: 'Active',
    nextStep: 'Completed',
    nextStepSub: 'May 10, 2024',
    nextStepType: 'checkmark',
    logoBg: '#ECFDF5',
    logoColor: '#059669',
    logoText: 'D'
  },
  {
    id: 'ctr-4',
    brand: 'Noise',
    project: 'Smartwatch Launch Reels',
    tag: 'Instagram Reels',
    type: 'Project Based',
    contractId: 'CTR-2024-0004',
    value: '₹19,000',
    duration: 'Apr 20 – Apr 30, 2024',
    daysText: '10 days',
    status: 'Active',
    nextStep: 'Completed',
    nextStepSub: 'Apr 30, 2024',
    nextStepType: 'checkmark',
    logoBg: '#EFF6FF',
    logoColor: '#1D4ED8',
    logoText: 'No'
  },
  {
    id: 'ctr-3',
    brand: 'Pilgrim',
    project: 'Beauty Unboxing Video',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0003',
    value: '₹11,500',
    duration: 'Apr 15 – Apr 25, 2024',
    daysText: '10 days',
    status: 'Pending',
    nextStep: 'Completed',
    nextStepSub: 'Apr 25, 2024',
    nextStepType: 'checkmark',
    logoBg: '#FDF2F8',
    logoColor: '#BE185D',
    logoText: 'Pi'
  },
  {
    id: 'ctr-2',
    brand: 'SkinGlow',
    project: 'Face Cream Reel',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0002',
    value: '₹8,000',
    duration: 'Apr 10 – Apr 18, 2024',
    daysText: '8 days',
    status: 'Pending',
    nextStep: 'Completed',
    nextStepSub: 'Apr 18, 2024',
    nextStepType: 'checkmark',
    logoBg: '#FAF5FF',
    logoColor: '#7E22CE',
    logoText: 'SG'
  },
  {
    id: 'ctr-1',
    brand: 'Organic Harvest',
    project: 'Hair Oil Ad Review',
    tag: 'UGC Video',
    type: 'Project Based',
    contractId: 'CTR-2024-0001',
    value: '₹14,000',
    duration: 'Apr 1 – Apr 12, 2024',
    daysText: '11 days',
    status: 'Completed',
    nextStep: 'Completed',
    nextStepSub: 'Apr 12, 2024',
    nextStepType: 'checkmark',
    logoBg: '#FFF7ED',
    logoColor: '#C2410C',
    logoText: 'O'
  }
];

export default function CreatorContractsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ContractsViewProps) {

  const [contracts, setContracts] = useState<ContractItem[]>(INITIAL_CONTRACTS);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Active' | 'Completed' | 'Cancelled' | 'Drafts'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Add new contract Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    brand: '',
    project: '',
    tag: 'UGC Video',
    type: 'Project Based',
    value: '₹15,000',
    duration: 'Jun 1 – Jun 15, 2024',
    daysText: '14 days',
    status: 'Active' as ContractItem['status'],
    nextStep: 'Submit Deliverables',
    nextStepSub: 'Due in 7 days',
    nextStepType: 'upload' as ContractItem['nextStepType']
  });

  // Handle addition of new contract item
  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.brand || !addForm.project) return;

    const newCtr: ContractItem = {
      id: `ctr-${Date.now()}`,
      brand: addForm.brand,
      project: addForm.project,
      tag: addForm.tag,
      type: addForm.type,
      contractId: `CTR-2024-00${contracts.length + 1}`,
      value: addForm.value,
      duration: addForm.duration,
      daysText: addForm.daysText,
      status: addForm.status,
      nextStep: addForm.nextStep,
      nextStepSub: addForm.nextStepSub,
      nextStepType: addForm.nextStepType,
      logoBg: 'rgba(236, 72, 153, 0.08)',
      logoColor: '#EC4899',
      logoText: addForm.brand.substring(0, 2)
    };

    setContracts([newCtr, ...contracts]);
    setIsAddModalOpen(false);
    
    // Reset Form
    setAddForm({
      brand: '',
      project: '',
      tag: 'UGC Video',
      type: 'Project Based',
      value: '₹15,000',
      duration: 'Jun 1 – Jun 15, 2024',
      daysText: '14 days',
      status: 'Active',
      nextStep: 'Submit Deliverables',
      nextStepSub: 'Due in 7 days',
      nextStepType: 'upload'
    });
  };

  // Delete Contract handler
  const handleDeleteContract = (id: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) return;
    setContracts(contracts.filter(c => c.id !== id));
  };

  // Tab Filtering counts (Dynamic mapping)
  const allCount = contracts.length;
  const pendingCount = contracts.filter(c => c.status === 'Pending').length;
  const activeCount = contracts.filter(c => c.status === 'Active' || c.status === 'In Review').length;
  const completedCount = contracts.filter(c => c.status === 'Completed').length;
  const cancelledCount = contracts.filter(c => c.status === 'Cancelled').length;
  const draftsCount = contracts.filter(c => c.status === 'Draft').length;

  const tabList = [
    { key: 'All', label: 'All Contracts', count: allCount },
    { key: 'Pending', label: 'Pending', count: pendingCount },
    { key: 'Active', label: 'Active', count: activeCount },
    { key: 'Completed', label: 'Completed', count: completedCount },
    { key: 'Cancelled', label: 'Cancelled', count: cancelledCount },
    { key: 'Drafts', label: 'Drafts', count: draftsCount }
  ];

  // Filter items based on activeTab and searchQuery
  const filteredContracts = contracts.filter(c => {
    // Tab Filter
    if (activeTab !== 'All') {
      if (activeTab === 'Pending' && c.status !== 'Pending') return false;
      if (activeTab === 'Active' && c.status !== 'Active' && c.status !== 'In Review') return false;
      if (activeTab === 'Completed' && c.status !== 'Completed') return false;
      if (activeTab === 'Cancelled' && c.status !== 'Cancelled') return false;
      if (activeTab === 'Drafts' && c.status !== 'Draft') return false;
    }
    
    // Search Filter
    const matchesSearch = c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.contractId.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination Logic
  const totalItems = filteredContracts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContracts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="contracts-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
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

      {/* 2. Header Title & Action Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            Contracts
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px' }}>
            Manage your contracts and active agreements with brands.
          </p>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#EC4899',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(236,72,153,0.3)',
            transition: 'all 0.2s'
          }}
          className="glow-button hover-scale"
        >
          <Plus size={15} />
          <span>New Contract</span>
        </button>
      </div>

      {/* 3. Filters Navigation Tabs Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${borderColor}`,
        paddingBottom: '2px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }} className="inner-scroller">
          {tabList.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setCurrentPage(1); // Reset page on tab toggle
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `2.5px solid ${isActive ? '#EC4899' : 'transparent'}`,
                  color: isActive ? '#EC4899' : secondaryText,
                  padding: '12px 4px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 550,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                className={isActive ? "" : "hover-pink-text"}
              >
                {tab.label} <span style={{ color: mutedText, fontSize: '11.5px', marginLeft: '2px' }}>({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Right Search Box & Inline Filter */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                height: '34px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                paddingLeft: '32px',
                paddingRight: '12px',
                fontSize: '12.5px',
                color: primaryText,
                outline: 'none',
                boxShadow: shadowStyle
              }}
              className="search-input-styled border-hover"
            />
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            color: primaryText,
            height: '34px',
            padding: '0 14px',
            borderRadius: '10px',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: shadowStyle
          }} className="border-hover">
            <Sliders size={13} style={{ transform: 'rotate(90deg)' }} />
            <span>Filter</span>
          </button>
        </div>

      </div>

      {/* 4. Main 2-Column Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '24px', alignItems: 'start' }} className="contracts-layout-grid">
        
        {/* Left Column: Table and Pagination */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          
          {/* Contracts Table Panel */}
          <div className="glass-panel inner-scroller" style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            boxShadow: shadowStyle,
            overflowX: 'auto'
          }}>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '12px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 20px' }}>Brand / Project</th>
                  <th style={{ padding: '16px 12px' }}>Contract Details</th>
                  <th style={{ padding: '16px 12px' }}>Value</th>
                  <th style={{ padding: '16px 12px' }}>Duration</th>
                  <th style={{ padding: '16px 12px' }}>Status</th>
                  <th style={{ padding: '16px 12px' }}>Next Step</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '48px 20px', textAlign: 'center', color: mutedText }}>
                      No contracts match the filters. Click "+ New Contract" to create one.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((ctr) => (
                    <tr key={ctr.id} style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.2s' }} className="table-row-hover">
                      
                      {/* Brand / Project */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: ctr.logoBg,
                            color: ctr.logoColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '14px',
                            flexShrink: 0
                          }}>
                            {ctr.logoText}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText }}>{ctr.brand}</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '50%', width: '12px', height: '12px', fontSize: '7px', fontWeight: 'bold' }}>✓</span>
                            </div>
                            <span style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 500 }}>{ctr.project}</span>
                            <span style={{
                              width: 'fit-content',
                              fontSize: '9.5px',
                              backgroundColor: ctr.tag === 'YouTube' ? 'rgba(239, 68, 68, 0.08)' : ctr.tag === 'Instagram Reels' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(139, 92, 246, 0.08)',
                              color: ctr.tag === 'YouTube' ? '#EF4444' : ctr.tag === 'Instagram Reels' ? '#EC4899' : '#8B5CF6',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              fontWeight: 700,
                              marginTop: '2px'
                            }}>
                              {ctr.tag}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Details */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 550 }}>Contract Type</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText }}>{ctr.type}</span>
                          <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 550, marginTop: '2px' }}>Contract ID</span>
                          <span style={{ fontSize: '11px', color: secondaryText, fontFamily: 'monospace' }}>{ctr.contractId}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText }}>{ctr.value}</span>
                          <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 500 }}>
                            {ctr.type === 'Retainer' ? 'Monthly' : 'Fixed Price'}
                          </span>
                        </div>
                      </td>

                      {/* Duration */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 600, color: primaryText }}>{ctr.duration}</span>
                          <span style={{ fontSize: '11px', color: mutedText, fontWeight: 500 }}>{ctr.daysText}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: ctr.status === 'Active' ? 'rgba(16, 185, 129, 0.08)' :
                                           ctr.status === 'In Review' ? 'rgba(59, 130, 246, 0.08)' :
                                           ctr.status === 'Pending' ? 'rgba(249, 115, 22, 0.08)' :
                                           ctr.status === 'Cancelled' ? 'rgba(244, 63, 94, 0.08)' :
                                           'rgba(107, 114, 128, 0.08)',
                          color: ctr.status === 'Active' ? '#10B981' :
                                 ctr.status === 'In Review' ? '#3B82F6' :
                                 ctr.status === 'Pending' ? '#F97316' :
                                 ctr.status === 'Cancelled' ? '#F43F5E' :
                                 '#6B7280',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          border: 'none',
                          display: 'inline-block'
                        }}>
                          {ctr.status}
                        </span>
                      </td>

                      {/* Next Step */}
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* Render icon based on type */}
                          {ctr.nextStepType === 'upload' && <Upload size={14} style={{ color: '#EC4899', flexShrink: 0 }} />}
                          {ctr.nextStepType === 'inbox' && <Clock size={14} style={{ color: '#F97316', flexShrink: 0 }} />}
                          {ctr.nextStepType === 'clock' && <Clock size={14} style={{ color: '#3B82F6', flexShrink: 0 }} />}
                          {ctr.nextStepType === 'checkmark' && <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />}
                          {ctr.nextStepType === 'sign' && <FileText size={14} style={{ color: '#7C3AED', flexShrink: 0 }} />}
                          {ctr.nextStepType === 'cancelled' && <AlertCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />}
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText }}>{ctr.nextStep}</span>
                            <span style={{ fontSize: '10.5px', color: mutedText }}>{ctr.nextStepSub}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center' }}>
                          <button 
                            onClick={() => handleDeleteContract(ctr.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'rgba(239, 68, 68, 0.7)',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '6px'
                            }}
                            className="hover-delete"
                            title="Delete Contract"
                          >
                            <Trash2 size={13} />
                          </button>
                          
                          <button style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer', padding: '4px' }} className="hover-white-icon">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>

          {/* Pagination bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: secondaryText, padding: '0 8px' }}>
            <span>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} contracts
            </span>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  color: currentPage === 1 ? mutedText : primaryText,
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === 1 ? 'default' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isPageActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      backgroundColor: isPageActive ? '#FFF1F2' : cardBg,
                      border: `1.5px solid ${isPageActive ? '#EC4899' : borderColor}`,
                      color: isPageActive ? '#EC4899' : primaryText,
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: isPageActive ? 'none' : shadowStyle
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  color: currentPage === totalPages ? mutedText : primaryText,
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentPage === totalPages ? 'default' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                ›
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Widget 1: Contracts Overview */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
              Contracts Overview
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650 }}>Total Contracts</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText }}>{contracts.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span> Active
                </span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText }}>{activeCount}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F97316' }}></span> Pending
                </span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText }}>{pendingCount}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6B7280' }}></span> Completed
                </span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText }}>{completedCount}</span>
              </div>
            </div>

            <a href="#" style={{
              color: '#EC4899',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px'
            }} className="hover-arrow-move">
              <span>View Contract Analytics</span>
              <ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} />
            </a>

          </div>

          {/* Widget 2: Upcoming Deadlines */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
              Upcoming Deadlines
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Nykaa */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#FCE7F3', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px' }}>N</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Nykaa</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>Skincare UGC Campaign</span>
                    <span style={{ fontSize: '10px', color: '#E11D48', fontWeight: 650, marginTop: '2px' }}>Due in 5 days</span>
                  </div>
                </div>
                
                {/* Date stamp box */}
                <div style={{ border: '1px solid #FFE4E6', backgroundColor: '#FFF5F5', borderRadius: '8px', padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '40px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>Jun</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>01</span>
                </div>
              </div>

              {/* Mamaearth */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px' }}>M</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Mamaearth</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>Product Review Videos</span>
                    <span style={{ fontSize: '10px', color: '#E11D48', fontWeight: 650, marginTop: '2px' }}>Due in 2 days</span>
                  </div>
                </div>
                
                <div style={{ border: '1px solid #FFE4E6', backgroundColor: '#FFF5F5', borderRadius: '8px', padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '40px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>May</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>29</span>
                </div>
              </div>

              {/* Wow Skin Science */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#F4F4F5', color: '#18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px' }}>W</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>Wow Skin Science</span>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>UGC Content Series</span>
                    <span style={{ fontSize: '10px', color: '#E11D48', fontWeight: 650, marginTop: '2px' }}>Due in 6 days</span>
                  </div>
                </div>
                
                <div style={{ border: '1px solid #FFE4E6', backgroundColor: '#FFF5F5', borderRadius: '8px', padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '40px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>May</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>31</span>
                </div>
              </div>

            </div>

            <a href="#" style={{
              color: '#EC4899',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px'
            }} className="hover-arrow-move">
              <span>View all deadlines</span>
              <ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} />
            </a>

          </div>

          {/* Widget 3: Quick Actions */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
              Quick Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'none', border: 'none', padding: '6px 0', textAlign: 'left', cursor: 'pointer', fontSize: '12.5px', color: secondaryText, fontWeight: 600 }}
                className="hover-pink-text"
              >
                <Edit size={14} />
                <span>Create New Contract</span>
              </button>
              <button 
                style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'none', border: 'none', padding: '6px 0', textAlign: 'left', cursor: 'pointer', fontSize: '12.5px', color: secondaryText, fontWeight: 600 }}
                className="hover-pink-text"
              >
                <Upload size={14} />
                <span>Upload Signed Contract</span>
              </button>
              <button 
                style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'none', border: 'none', padding: '6px 0', textAlign: 'left', cursor: 'pointer', fontSize: '12.5px', color: secondaryText, fontWeight: 600 }}
                className="hover-pink-text"
              >
                <FileText size={14} />
                <span>View Contract Templates</span>
              </button>
              <button 
                style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'none', border: 'none', padding: '6px 0', textAlign: 'left', cursor: 'pointer', fontSize: '12.5px', color: secondaryText, fontWeight: 600 }}
                className="hover-pink-text"
              >
                <HelpCircle size={14} />
                <span>Help & Support</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* "+ NEW CONTRACT" DIALOG / MODAL */}
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
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
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
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Create New Contract
              </h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: secondaryText, cursor: 'pointer', display: 'flex', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddContract} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nykaa"
                    value={addForm.brand}
                    onChange={(e) => setAddForm({ ...addForm, brand: e.target.value })}
                    className="modal-input"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skincare UGC Campaign"
                    value={addForm.project}
                    onChange={(e) => setAddForm({ ...addForm, project: e.target.value })}
                    className="modal-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Format Tag</label>
                  <select
                    value={addForm.tag}
                    onChange={(e) => setAddForm({ ...addForm, tag: e.target.value })}
                    className="modal-input select-styled"
                  >
                    <option value="UGC Video">UGC Video</option>
                    <option value="UGC Photo">UGC Photo</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Instagram Reels">Instagram Reels</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Contract Type</label>
                  <select
                    value={addForm.type}
                    onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                    className="modal-input select-styled"
                  >
                    <option value="Project Based">Project Based</option>
                    <option value="Retainer">Retainer</option>
                    <option value="Launch Based">Launch Based</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Contract Value</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹25,000"
                    value={addForm.value}
                    onChange={(e) => setAddForm({ ...addForm, value: e.target.value })}
                    className="modal-input"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Duration Text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. May 20 – Jun 10, 2024"
                    value={addForm.duration}
                    onChange={(e) => setAddForm({ ...addForm, duration: e.target.value })}
                    className="modal-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Days Count Text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 22 days"
                    value={addForm.daysText}
                    onChange={(e) => setAddForm({ ...addForm, daysText: e.target.value })}
                    className="modal-input"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Contract Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value as any })}
                    className="modal-input select-styled"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Next Action</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Submit Deliverables"
                    value={addForm.nextStep}
                    onChange={(e) => setAddForm({ ...addForm, nextStep: e.target.value })}
                    className="modal-input"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Next Action Target</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Due in 5 days"
                    value={addForm.nextStepSub}
                    onChange={(e) => setAddForm({ ...addForm, nextStepSub: e.target.value })}
                    className="modal-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Next Action Icon Style</label>
                <select
                  value={addForm.nextStepType}
                  onChange={(e) => setAddForm({ ...addForm, nextStepType: e.target.value as any })}
                  className="modal-input select-styled"
                >
                  <option value="upload">Upload Deliverables Icon (Pink)</option>
                  <option value="inbox">Brand Feedback Clock Icon (Orange)</option>
                  <option value="clock">Waiting clock Icon (Blue)</option>
                  <option value="checkmark">Completed Icon (Green Check)</option>
                  <option value="sign">Signature Icon (Purple)</option>
                </select>
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
                    border: `1px solid ${borderColor}`,
                    color: primaryText,
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
                  Create Contract
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Styled JSX Scoped Styles */}
      <style jsx>{`
        .contracts-view {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .border-hover {
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }
        .border-hover:hover {
          border-color: #EC4899 !important;
          background-color: rgba(236,72,153,0.02) !important;
        }

        .hover-pink-text {
          transition: color 0.2s;
        }
        .hover-pink-text:hover {
          color: #EC4899 !important;
        }

        .table-row-hover {
          background-color: transparent;
        }
        .table-row-hover:hover {
          background-color: rgba(0, 0, 0, 0.01);
        }
        .dark-theme .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.01);
        }

        .select-filter {
          transition: all 0.2s;
        }
        .select-filter:hover {
          border-color: #ec4899 !important;
        }

        .search-input-styled:focus {
          border-color: #EC4899 !important;
          box-shadow: none !important;
        }

        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
          border-color: #EC4899 !important;
          color: #EC4899 !important;
        }

        .hover-white-icon:hover {
          color: #EC4899 !important;
        }

        .hover-delete:hover {
          color: #EF4444 !important;
          background-color: rgba(239, 68, 68, 0.08) !important;
        }

        .hover-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }

        .hover-arrow-move:hover span {
          text-decoration: underline;
        }
        .hover-arrow-move:hover svg {
          transform: translate(2px, -2px) rotate(45deg) !important;
          transition: transform 0.2s;
        }

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

        @media (max-width: 1200px) {
          .contracts-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
