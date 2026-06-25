'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Clock, Check, X, Calendar, 
  ArrowUpRight, FileText, Upload, HelpCircle, Eye, Download, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

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
  creatorName: string;
  creatorAvatar: string;
  projectTitle: string;
  categoryLabel: string;
  type: string;
  contractNumber: string;
  valueINR: number;
  valueUSD: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'In Review' | 'Completed' | 'Pending Signature' | 'Cancelled';
}

const INITIAL_CONTRACTS: ContractItem[] = [
  {
    id: 'ctr_1',
    creatorName: 'Ananya Sharma',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
    projectTitle: 'Vitamin C Serum Video Campaign',
    categoryLabel: 'UGC Video Reel',
    type: 'Project Based',
    contractNumber: 'CTR-2026-0089',
    valueINR: 25000,
    valueUSD: 312,
    startDate: '20 May 2026',
    endDate: '15 Jun 2026',
    status: 'Active'
  },
  {
    id: 'ctr_2',
    creatorName: 'Rahul Verma',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
    projectTitle: 'Tech Earbuds Review Reel',
    categoryLabel: 'Video Review',
    type: 'Project Based',
    contractNumber: 'CTR-2026-0090',
    valueINR: 12000,
    valueUSD: 150,
    startDate: '10 Jun 2026',
    endDate: '30 Jun 2026',
    status: 'Active'
  },
  {
    id: 'ctr_3',
    creatorName: 'Priya Nair',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
    projectTitle: 'Apparel Lookbook Try-On',
    categoryLabel: 'Instagram Stories',
    type: 'Retainer',
    contractNumber: 'CTR-2026-0091',
    valueINR: 30000,
    valueUSD: 375,
    startDate: '01 Jun 2026',
    endDate: '01 Sep 2026',
    status: 'Pending Signature'
  },
  {
    id: 'ctr_4',
    creatorName: 'Amit Patel',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    projectTitle: 'Weekend Food Reels Cinemtaography',
    categoryLabel: 'Video Editing',
    type: 'Project Based',
    contractNumber: 'CTR-2026-0082',
    valueINR: 8000,
    valueUSD: 100,
    startDate: '15 May 2026',
    endDate: '28 May 2026',
    status: 'Completed'
  }
];

export default function BrandContractsView({
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
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  const [contracts, setContracts] = useState<ContractItem[]>(INITIAL_CONTRACTS);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (inrVal: number, usdVal: number) => {
    return isINR ? `₹${inrVal.toLocaleString()}` : `$${usdVal.toLocaleString()}`;
  };

  const handleUpdateStatus = (id: string, newStatus: ContractItem['status']) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredContracts = contracts.filter(ctr => {
    const matchesQuery = ctr.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctr.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctr.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesQuery) return false;

    if (activeTab === 'active' && ctr.status !== 'Active') return false;
    if (activeTab === 'pending' && ctr.status !== 'Pending Signature') return false;
    if (activeTab === 'completed' && ctr.status !== 'Completed') return false;

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
          Contracts & Agreements
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
          Track and authorize digital legal agreements, milestones, and active campaigns retainers with creators.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        {/* Metric 1 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Active Agreements</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>
            {contracts.filter(c => c.status === 'Active').length} Contracts
          </span>
          <span style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: 550 }}>Currently in production</span>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Value Under Contract</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>
            {formatPrice(
              contracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.valueINR, 0),
              contracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.valueUSD, 0)
            )}
          </span>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Locked in active milestones</span>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Pending Authorisation</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>
            {contracts.filter(c => c.status === 'Pending Signature').length} Pending
          </span>
          <span style={{ fontSize: '11px', color: '#F59E0B', marginTop: '4px', fontWeight: 550 }}>Awaiting signature copy</span>
        </div>

      </div>

      {/* Filters and List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Row controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '4px' }}>
            {[
              { id: 'all', label: 'All Agreements' },
              { id: 'active', label: 'Active' },
              { id: 'pending', label: 'Awaiting Signature' },
              { id: 'completed', label: 'Completed' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? primaryText : mutedText,
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    padding: '8px 2px',
                    position: 'relative',
                    transition: 'color 0.2s'
                  }}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: 0,
                        right: 0,
                        height: '2.5px',
                        backgroundColor: accentColor,
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts reference..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 30px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: primaryText,
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Contracts List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredContracts.map(ctr => {
            const dateString = `${ctr.startDate} - ${ctr.endDate}`;
            return (
              <div
                key={ctr.id}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: shadowStyle,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                {/* Creator Profile & Title details */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img src={ctr.creatorAvatar} alt={ctr.creatorName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: primaryText }}>{ctr.creatorName}</span>
                      <span style={{ fontSize: '10px', color: mutedText, border: `1px solid ${borderColor}`, padding: '1px 6px', borderRadius: '4px' }}>{ctr.contractNumber}</span>
                    </div>
                    <span style={{ fontSize: '13px', color: secondaryText, display: 'block', marginTop: '2px' }}>{ctr.projectTitle}</span>
                    <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '4px' }}>Timeline: {dateString} ({ctr.type})</span>
                  </div>
                </div>

                {/* Values & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: primaryText, display: 'block' }}>
                      {formatPrice(ctr.valueINR, ctr.valueUSD)}
                    </span>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 750,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginTop: '4px',
                      display: 'inline-block',
                      backgroundColor: ctr.status === 'Active' 
                        ? 'rgba(16,185,129,0.08)' 
                        : ctr.status === 'Pending Signature' 
                          ? 'rgba(245,158,11,0.08)' 
                          : 'rgba(59,130,246,0.08)',
                      color: ctr.status === 'Active' 
                        ? '#10B981' 
                        : ctr.status === 'Pending Signature' 
                          ? '#F59E0B' 
                          : '#3B82F6'
                    }}>
                      {ctr.status === 'Pending Signature' ? 'Awaiting Signature' : ctr.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {ctr.status === 'Pending Signature' ? (
                      <button
                        onClick={() => {
                          handleUpdateStatus(ctr.id, 'Active');
                          alert('Signing and executing agreement CTR-2026-0091...');
                        }}
                        style={{
                          backgroundColor: accentColor,
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(236,72,153,0.15)'
                        }}
                      >
                        Sign Contract
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Downloading signed copy PDF for ${ctr.contractNumber}...`)}
                        style={{
                          backgroundColor: 'transparent',
                          border: `1px solid ${borderColor}`,
                          color: primaryText,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 650,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        className="hover-white-bg"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
          {filteredContracts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px' }}>
              <p style={{ color: mutedText, fontSize: '14.5px', margin: 0 }}>No contracts agreements found matching criteria.</p>
            </div>
          )}
        </div>

      </div>

      <style jsx global>{`
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
