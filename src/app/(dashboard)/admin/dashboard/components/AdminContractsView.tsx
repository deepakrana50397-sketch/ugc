'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Search, FileSignature, AlertTriangle, ShieldCheck, Download } from 'lucide-react';

interface ContractItem {
  id: string;
  brandName: string;
  creatorName: string;
  type: string;
  signedDate: string;
  milestonesCount: number;
  completedMilestones: number;
  status: 'Active' | 'Pending Signatures' | 'Completed' | 'Breached' | 'Terminated';
}

interface ViewProps {
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

export default function AdminContractsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ViewProps) {
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_contracts');
    if (cached) {
      setContracts(JSON.parse(cached));
    } else {
      const defaultContracts: ContractItem[] = [
        { id: 'con-4081', brandName: 'Mamaearth Cosmetics', creatorName: 'Ananya Sharma', type: 'UGC Reel Video Licensing', signedDate: '2026-06-15', milestonesCount: 3, completedMilestones: 2, status: 'Active' },
        { id: 'con-4082', brandName: 'FitLife Wellness', creatorName: 'Karan Mehra', type: 'Exclusive Ambassador Pack', signedDate: '2026-06-10', milestonesCount: 5, completedMilestones: 5, status: 'Completed' },
        { id: 'con-4083', brandName: 'boAt Lifestyle', creatorName: 'Neha Kapoor', type: 'Social Video Shorts integration', signedDate: '2026-06-22', milestonesCount: 2, completedMilestones: 0, status: 'Pending Signatures' },
        { id: 'con-4084', brandName: 'Mamaearth Cosmetics', creatorName: 'Riya Mishra', type: 'Influencer Post Series', signedDate: '2026-06-01', milestonesCount: 4, completedMilestones: 1, status: 'Breached' }
      ];
      setContracts(defaultContracts);
      localStorage.setItem('igigster_admin_contracts', JSON.stringify(defaultContracts));
    }
  }, []);

  const handleUpdateStatus = (id: string, nextStatus: 'Active' | 'Completed' | 'Breached' | 'Terminated') => {
    const updated = contracts.map(c => c.id === id ? { ...c, status: nextStatus } : c);
    setContracts(updated);
    localStorage.setItem('igigster_admin_contracts', JSON.stringify(updated));
  };

  const filtered = contracts.filter(c => 
    c.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Contract & SLA Legal Registry</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Inspect legal agreements signed on-platform, track deliverable SLA fulfillment, and flag contractual breaches.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search contracts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: '38px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            paddingLeft: '38px',
            fontSize: '13px',
            color: primaryText,
            outline: 'none'
          }}
        />
      </div>

      <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '20px 24px', boxShadow: shadowStyle, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11px', color: mutedText, textTransform: 'uppercase', height: '36px', fontWeight: 700 }}>
              <th style={{ padding: '8px' }}>Contract ID / Date</th>
              <th style={{ padding: '8px' }}>Parties Involved</th>
              <th style={{ padding: '8px' }}>Agreement Type</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>SLA Deliverables</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>SLA Status</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px' }}>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{c.id}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>Signed: {c.signedDate}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 650, color: primaryText, display: 'block' }}>{c.brandName}</span>
                  <span style={{ fontSize: '11.5px', color: mutedText, display: 'block', marginTop: '2px' }}>Creator: {c.creatorName}</span>
                </td>
                <td style={{ padding: '8px', color: secondaryText, fontWeight: 550 }}>
                  {c.type}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{ fontWeight: 700, color: primaryText }}>
                    {c.completedMilestones} / {c.milestonesCount} Completed
                  </span>
                  <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '2px', overflow: 'hidden', margin: '4px auto 0' }}>
                    <div style={{ width: `${(c.completedMilestones / c.milestonesCount) * 100}%`, height: '100%', backgroundColor: c.status === 'Breached' ? '#EF4444' : '#10B981' }} />
                  </div>
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      c.status === 'Completed' ? 'rgba(16,185,129,0.06)' :
                      c.status === 'Breached' ? 'rgba(239,68,68,0.06)' :
                      c.status === 'Terminated' ? 'rgba(113,113,122,0.06)' :
                      c.status === 'Active' ? 'rgba(59,130,246,0.06)' : 'rgba(245,158,11,0.06)',
                    color: 
                      c.status === 'Completed' ? '#10B981' :
                      c.status === 'Breached' ? '#EF4444' :
                      c.status === 'Terminated' ? '#71717A' :
                      c.status === 'Active' ? '#3B82F6' : '#F59E0B',
                    border: `1px solid ${
                      c.status === 'Completed' ? 'rgba(16,185,129,0.1)' :
                      c.status === 'Breached' ? 'rgba(239,68,68,0.1)' :
                      c.status === 'Terminated' ? 'rgba(113,113,122,0.1)' :
                      c.status === 'Active' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)'
                    }`
                  }}>{c.status}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    <button
                      style={{ backgroundColor: 'var(--hover-bg)', border: `1px solid ${borderColor}`, color: primaryText, borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 650, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={12} /> Registry
                    </button>
                    {c.status === 'Active' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(c.id, 'Breached')}
                          style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: 'none', color: '#EF4444', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Flag Breach
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(c.id, 'Terminated')}
                          style={{ backgroundColor: 'rgba(113,113,122,0.08)', border: 'none', color: '#71717A', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Terminate
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
