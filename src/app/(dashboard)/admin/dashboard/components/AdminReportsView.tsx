'use client';

import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Search, ShieldCheck, Check } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  category: 'Financial' | 'Users & Vetting' | 'Platform Audits';
  format: 'CSV' | 'PDF';
  description: string;
  recordsCount: number;
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

export default function AdminReportsView({
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
  const [searchQuery, setSearchQuery] = useState('');
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const reportTemplates: ReportTemplate[] = [
    { id: 'rep-01', name: 'Creator Payouts Ledger', category: 'Financial', format: 'CSV', description: 'Monthly settlements breakdown including bank details, transaction references, and completion status.', recordsCount: 148 },
    { id: 'rep-02', name: 'Inbound Escrow Deposits Log', category: 'Financial', format: 'CSV', description: 'List of all advertising capital deposits, client invoicing reference numbers, and active balances.', recordsCount: 82 },
    { id: 'rep-03', name: 'Brand Spend & Campaign Audits', category: 'Platform Audits', format: 'PDF', description: 'Summary report of total active marketing budgets, creator recruitment counts, and SLA progress stats.', recordsCount: 386 },
    { id: 'rep-04', name: 'Vetted UGC Creators Directory', category: 'Users & Vetting', format: 'CSV', description: 'Detailed list of verified creator profiles, starting day-rates, social rating index, and emails.', recordsCount: 1248 },
    { id: 'rep-05', name: 'Disputes & Escrow Holds Summary', category: 'Platform Audits', format: 'PDF', description: 'Compliance audit documentation of open escrow disputes, support tickets, and moderator release histories.', recordsCount: 28 }
  ];

  const handleTriggerExport = (id: string) => {
    setExportingId(id);
    setTimeout(() => {
      setExportingId(null);
      setDownloadedId(id);
      setTimeout(() => {
        setDownloadedId(null);
      }, 3000);
    }, 1500);
  };

  const filtered = reportTemplates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>System Reports & Directory Exports</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Generate cryptographic audit sheets, download user listings, and export financial balance statements.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Filter report templates..."
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map((rep) => {
          const isCsv = rep.format === 'CSV';
          const isExporting = exportingId === rep.id;
          const isDownloaded = downloadedId === rep.id;

          return (
            <div 
              key={rep.id} 
              style={{ 
                backgroundColor: cardBg, 
                border: `1px solid ${borderColor}`, 
                borderRadius: '20px', 
                padding: '20px', 
                boxShadow: shadowStyle, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: '14px' 
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: rep.category === 'Financial' ? '#10B981' : rep.category === 'Users & Vetting' ? '#3B82F6' : '#8B5CF6',
                    backgroundColor: rep.category === 'Financial' ? 'rgba(16,185,129,0.06)' : rep.category === 'Users & Vetting' ? 'rgba(59,130,246,0.06)' : 'rgba(139,92,246,0.06)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: `1px solid ${rep.category === 'Financial' ? 'rgba(16,185,129,0.1)' : rep.category === 'Users & Vetting' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)'}`
                  }}>{rep.category}</span>
                  
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 750,
                    color: isCsv ? '#10B981' : '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isCsv ? <FileSpreadsheet size={13} /> : <FileText size={13} />}
                    {rep.format}
                  </span>
                </div>

                <h3 style={{ fontSize: '15.5px', fontWeight: 750, color: primaryText, margin: '4px 0 0' }}>{rep.name}</h3>
                <p style={{ fontSize: '12.5px', color: secondaryText, margin: 0, lineHeight: 1.4 }}>{rep.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${borderColor}`, paddingTop: '14px' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>{rep.recordsCount} items ready</span>
                
                <button
                  onClick={() => handleTriggerExport(rep.id)}
                  disabled={isExporting || isDownloaded}
                  style={{
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: isDownloaded ? 'rgba(16,185,129,0.1)' : isExporting ? 'rgba(59,130,246,0.1)' : accentColor,
                    color: isDownloaded ? '#10B981' : isExporting ? '#3B82F6' : '#FFFFFF',
                    border: isDownloaded ? '1px solid rgba(16,185,129,0.2)' : isExporting ? '1px solid rgba(59,130,246,0.2)' : 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    padding: '0 16px',
                    cursor: isExporting || isDownloaded ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isExporting || isDownloaded ? 'none' : '0 4px 12px rgba(236,72,153,0.15)'
                  }}
                >
                  {isExporting ? (
                    <>Generating...</>
                  ) : isDownloaded ? (
                    <><Check size={14} /> Downloaded</>
                  ) : (
                    <><Download size={14} /> Export Report</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
