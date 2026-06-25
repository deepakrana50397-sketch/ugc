'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, AlertTriangle, Eye, ShieldCheck, UserX, Check } from 'lucide-react';

interface RiskAlertItem {
  id: string;
  entityName: string;
  entityType: 'Creator' | 'Brand' | 'Campaign brief';
  riskFactor: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  reportedDate: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Banned';
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

export default function AdminRiskView({
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
  const [alerts, setAlerts] = useState<RiskAlertItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_risk');
    if (cached) {
      setAlerts(JSON.parse(cached));
    } else {
      const defaultAlerts: RiskAlertItem[] = [
        { id: 'risk-551', entityName: 'StyleNova Winter Video', entityType: 'Campaign brief', riskFactor: 'Brief contains prohibited external checkout links requesting off-platform payments.', severity: 'Critical', reportedDate: '2026-06-25', status: 'Open' },
        { id: 'risk-552', entityName: 'Aman Verma', entityType: 'Creator', riskFactor: 'Suspicious multiple login devices from distinct IP locations within 10 minutes.', severity: 'High', reportedDate: '2026-06-24', status: 'Under Review' },
        { id: 'risk-553', entityName: 'Gloxo Cosmetics', entityType: 'Brand', riskFactor: 'Unusually high transaction size deposit split that failed risk verification.', severity: 'High', reportedDate: '2026-06-23', status: 'Open' },
        { id: 'risk-554', entityName: 'FitLife Challenge Post', entityType: 'Campaign brief', riskFactor: 'Content description uses flagged health statements claiming medical curing.', severity: 'Medium', reportedDate: '2026-06-21', status: 'Resolved' }
      ];
      setAlerts(defaultAlerts);
      localStorage.setItem('igigster_admin_risk', JSON.stringify(defaultAlerts));
    }
  }, []);

  const handleUpdateStatus = (id: string, nextStatus: 'Open' | 'Under Review' | 'Resolved' | 'Banned') => {
    const updated = alerts.map(a => a.id === id ? { ...a, status: nextStatus } : a);
    setAlerts(updated);
    localStorage.setItem('igigster_admin_risk', JSON.stringify(updated));
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'Critical': return '#EF4444';
      case 'High': return '#F97316';
      case 'Medium': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  const filtered = alerts.filter(a => {
    const matchesSearch = 
      a.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.riskFactor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'All' || a.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Risk Supervision & Content Moderation</h1>
          <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
            Audit compliance infractions, flag off-platform payment attempts, and ban suspicious accounts.
          </p>
        </div>

        {/* Severity filters */}
        <div style={{
          display: 'flex',
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          padding: '2px',
          boxShadow: shadowStyle
        }}>
          {['All', 'Critical', 'High', 'Medium'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              style={{
                border: 'none',
                backgroundColor: severityFilter === sev ? accentColor : 'transparent',
                color: severityFilter === sev ? '#FFFFFF' : secondaryText,
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {sev} Severity
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Filter compliance alerts..."
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
              <th style={{ padding: '8px' }}>Alert ID / Date</th>
              <th style={{ padding: '8px' }}>Target Entity</th>
              <th style={{ padding: '8px' }}>Risk Description</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Risk Severity</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Infraction State</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Resolution Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px' }}>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{a.id}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{a.reportedDate}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 650, color: primaryText, display: 'block' }}>{a.entityName}</span>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: a.entityType === 'Creator' ? '#3B82F6' : a.entityType === 'Brand' ? '#8B5CF6' : '#EC4899',
                    display: 'block',
                    marginTop: '2px'
                  }}>{a.entityType}</span>
                </td>
                <td style={{ padding: '8px', color: secondaryText, fontSize: '12px', maxWidth: '300px', lineHeight: 1.4 }}>
                  {a.riskFactor}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: getSeverityColor(a.severity),
                    backgroundColor: `${getSeverityColor(a.severity)}06`,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: `1px solid ${getSeverityColor(a.severity)}20`
                  }}>{a.severity}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      a.status === 'Resolved' ? 'rgba(16,185,129,0.06)' :
                      a.status === 'Banned' ? 'rgba(239,68,68,0.06)' :
                      a.status === 'Under Review' ? 'rgba(245,158,11,0.06)' : 'rgba(220,38,38,0.06)',
                    color: 
                      a.status === 'Resolved' ? '#10B981' :
                      a.status === 'Banned' ? '#EF4444' :
                      a.status === 'Under Review' ? '#F59E0B' : '#DC2626',
                    border: `1px solid ${
                      a.status === 'Resolved' ? 'rgba(16,185,129,0.1)' :
                      a.status === 'Banned' ? 'rgba(239,68,68,0.1)' :
                      a.status === 'Under Review' ? 'rgba(245,158,11,0.1)' : 'rgba(220,38,38,0.1)'
                    }`
                  }}>{a.status}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    {a.status !== 'Resolved' && a.status !== 'Banned' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(a.id, 'Under Review')}
                          style={{ backgroundColor: 'var(--hover-bg)', border: `1px solid ${borderColor}`, color: primaryText, borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 650, cursor: 'pointer' }}
                        >
                          Mark Review
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(a.id, 'Resolved')}
                          style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: 'none', color: '#10B981', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <ShieldCheck size={12} /> Dismiss Warning
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(a.id, 'Banned')}
                          style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: 'none', color: '#EF4444', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <UserX size={12} /> Suspend/Ban
                        </button>
                      </>
                    )}
                    {a.status === 'Resolved' && (
                      <span style={{ fontSize: '11.5px', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}><Check size={14} /> Resolved</span>
                    )}
                    {a.status === 'Banned' && (
                      <span style={{ fontSize: '11.5px', color: '#EF4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}><AlertTriangle size={14} /> Suspended</span>
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
