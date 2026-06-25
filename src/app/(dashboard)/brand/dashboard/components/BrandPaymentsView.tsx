'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import {
  Wallet, CreditCard, Clock, Calendar, ArrowUpRight, ArrowDownRight,
  Plus, Info, Check, CheckCircle2, ChevronRight, X, Building, Search, Download, AlertCircle
} from 'lucide-react';

interface PaymentsViewProps {
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

interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  creatorName?: string;
  creatorAvatar?: string;
  type: 'deposit' | 'payout' | 'escrow_lock' | 'refund';
  amountINR: number;
  amountUSD: number;
  status: 'Completed' | 'Released' | 'Held in Escrow' | 'Refunding';
}

interface EscrowMilestone {
  id: string;
  campaignTitle: string;
  creatorName: string;
  creatorAvatar: string;
  milestoneName: string;
  amountINR: number;
  amountUSD: number;
  status: 'locked' | 'requested_release' | 'released';
  dueDate: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  details: string;
  isPrimary: boolean;
}

export default function BrandPaymentsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: PaymentsViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'history'>('overview');

  // Modals state
  const [showAddFundsModal, setShowAddFundsModal] = useState<boolean>(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Add Funds form state
  const [fundAmountINR, setFundAmountINR] = useState<string>('');
  const [fundAmountUSD, setFundAmountUSD] = useState<string>('');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('method_1');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  // Filter query states
  const [txSearch, setTxSearch] = useState<string>('');
  const [txTypeFilter, setTxTypeFilter] = useState<'all' | 'deposit' | 'payout' | 'escrow_lock'>('all');

  // Main balance & financial stats metrics state
  const [metrics, setMetrics] = useState({
    escrowBalanceINR: 250000,
    escrowBalanceUSD: 3125,
    totalSpentINR: 520000,
    totalSpentUSD: 65000,
    escrowLockedINR: 60000,
    escrowLockedUSD: 750,
    activeBudgetINR: 120000,
    activeBudgetUSD: 1500
  });

  // Funding Methods List
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'method_1', type: 'card', name: 'Visa Corporate', details: '•••• •••• •••• 8902', isPrimary: true },
    { id: 'method_2', type: 'bank', name: 'HDFC Corporate Account', details: 'Acct ••••••••3456', isPrimary: false },
    { id: 'method_3', type: 'card', name: 'Mastercard Business', details: '•••• •••• •••• 5612', isPrimary: false }
  ]);

  // Escrow Milestones List
  const [milestones, setMilestones] = useState<EscrowMilestone[]>([
    {
      id: 'mile_1',
      campaignTitle: 'UGC Skincare Routine reels',
      creatorName: 'Ananya Sharma',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
      milestoneName: 'Reels Draft Video Approval',
      amountINR: 10000,
      amountUSD: 125,
      status: 'requested_release',
      dueDate: '28 Jun 2026'
    },
    {
      id: 'mile_2',
      campaignTitle: 'College Fest Vlog Series',
      creatorName: 'Rahul Verma',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
      milestoneName: 'Raw Footage & Story Uploads',
      amountINR: 8000,
      amountUSD: 100,
      status: 'locked',
      dueDate: '02 Jul 2026'
    },
    {
      id: 'mile_3',
      campaignTitle: 'Tech Gadget Hands-on Video',
      creatorName: 'Priya Nair',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
      milestoneName: 'YouTube Review Post Publish',
      amountINR: 12000,
      amountUSD: 150,
      status: 'requested_release',
      dueDate: '29 Jun 2026'
    }
  ]);

  // Transaction History List
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx_1',
      date: '24 Jun 2026',
      time: '04:15 PM',
      description: 'Deposited funds via Visa Corporate',
      type: 'deposit',
      amountINR: 100000,
      amountUSD: 1250,
      status: 'Completed'
    },
    {
      id: 'tx_2',
      date: '20 Jun 2026',
      time: '11:30 AM',
      description: 'Milestone Release - UGC Skincare Routine',
      creatorName: 'Ananya Sharma',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
      type: 'payout',
      amountINR: 15000,
      amountUSD: 187,
      status: 'Released'
    },
    {
      id: 'tx_3',
      date: '18 Jun 2026',
      time: '02:00 PM',
      description: 'Milestone Release - Swiggy Campus Ambassador',
      creatorName: 'Ananya Sharma',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
      type: 'payout',
      amountINR: 8000,
      amountUSD: 100,
      status: 'Released'
    },
    {
      id: 'tx_4',
      date: '15 Jun 2026',
      time: '10:10 AM',
      description: 'Escrow Locked - College Fest Vlog',
      creatorName: 'Rahul Verma',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
      type: 'escrow_lock',
      amountINR: 8000,
      amountUSD: 100,
      status: 'Held in Escrow'
    },
    {
      id: 'tx_5',
      date: '12 Jun 2026',
      time: '09:00 AM',
      description: 'Deposited funds via HDFC Bank Transfer',
      type: 'deposit',
      amountINR: 150000,
      amountUSD: 1875,
      status: 'Completed'
    }
  ]);

  // Synchronise currency inputs (1 USD = 80 INR)
  const handleInrAmountChange = (val: string) => {
    setFundAmountINR(val);
    if (!val || isNaN(Number(val))) {
      setFundAmountUSD('');
    } else {
      setFundAmountUSD((Number(val) / 80).toFixed(0));
    }
  };

  const handleUsdAmountChange = (val: string) => {
    setFundAmountUSD(val);
    if (!val || isNaN(Number(val))) {
      setFundAmountINR('');
    } else {
      setFundAmountINR((Number(val) * 80).toFixed(0));
    }
  };

  // Add Funds form handler
  const handleAddFundsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inrValue = Number(fundAmountINR);
    const usdValue = Number(fundAmountUSD);
    if (!inrValue || inrValue <= 0) return;

    // Update balances
    setMetrics(prev => ({
      ...prev,
      escrowBalanceINR: prev.escrowBalanceINR + inrValue,
      escrowBalanceUSD: prev.escrowBalanceUSD + usdValue
    }));

    // Add transaction record
    const selectedMethod = paymentMethods.find(m => m.id === selectedMethodId);
    const methodDetails = selectedMethod ? `via ${selectedMethod.name} (${selectedMethod.details.slice(-4)})` : '';
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      description: `Deposited funds ${methodDetails}`.trim(),
      type: 'deposit',
      amountINR: inrValue,
      amountUSD: usdValue,
      status: 'Completed'
    };

    setTransactions(prev => [newTx, ...prev]);
    setShowAddFundsModal(false);

    // Reset inputs
    setFundAmountINR('');
    setFundAmountUSD('');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');

    // Launch success prompt
    setSuccessMessage(`Successfully deposited ${isINR ? `₹${inrValue.toLocaleString()}` : `$${usdValue.toLocaleString()}`} into your escrow account balance!`);
    setShowSuccessOverlay(true);
  };

  // Release Escrow payment milestone handler
  const handleReleaseEscrow = (mileId: string) => {
    const target = milestones.find(m => m.id === mileId);
    if (!target) return;

    if (confirm(`Are you sure you want to approve and release the milestone payment of ${isINR ? `₹${target.amountINR.toLocaleString()}` : `$${target.amountUSD.toLocaleString()}`} to creator ${target.creatorName}?`)) {
      // 1. Update milestones status
      setMilestones(prev => prev.map(m => m.id === mileId ? { ...m, status: 'released' } : m));

      // 2. Adjust metrics
      setMetrics(prev => ({
        ...prev,
        escrowBalanceINR: prev.escrowBalanceINR - target.amountINR,
        escrowBalanceUSD: prev.escrowBalanceUSD - target.amountUSD,
        escrowLockedINR: prev.escrowLockedINR - target.amountINR,
        escrowLockedUSD: prev.escrowLockedUSD - target.amountUSD,
        totalSpentINR: prev.totalSpentINR + target.amountINR,
        totalSpentUSD: prev.totalSpentUSD + target.amountUSD
      }));

      // 3. Add to Transactions list
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        description: `Milestone Released - ${target.milestoneName}`,
        creatorName: target.creatorName,
        creatorAvatar: target.creatorAvatar,
        type: 'payout',
        amountINR: target.amountINR,
        amountUSD: target.amountUSD,
        status: 'Released'
      };

      setTransactions(prev => [newTx, ...prev]);

      setSuccessMessage(`Payment of ${isINR ? `₹${target.amountINR.toLocaleString()}` : `$${target.amountUSD.toLocaleString()}`} released successfully to ${target.creatorName}.`);
      setShowSuccessOverlay(true);
    }
  };

  // Filtering transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(txSearch.toLowerCase()) ||
      (tx.creatorName && tx.creatorName.toLowerCase().includes(txSearch.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (txTypeFilter === 'deposit' && tx.type !== 'deposit') return false;
    if (txTypeFilter === 'payout' && tx.type !== 'payout') return false;
    if (txTypeFilter === 'escrow_lock' && tx.type !== 'escrow_lock') return false;

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title & Add Funds row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
            Payments & Billing
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Monitor billing statements, add funds to escrow, and release creator payments.
          </p>
        </div>

        <button
          onClick={() => setShowAddFundsModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: accentColor,
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
            transition: 'all 0.2s'
          }}
          className="glow-button-payments"
        >
          <Plus size={16} />
          <span>Add Funds</span>
        </button>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        {/* Metric 1: Available Escrow Balance */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>Escrow Balance</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 850, color: primaryText, marginTop: '14px' }}>
            {isINR ? `₹${metrics.escrowBalanceINR.toLocaleString('en-IN')}` : `$${metrics.escrowBalanceUSD.toLocaleString('en-US')}`}
          </div>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Available for campaigns</span>
        </div>

        {/* Metric 2: Total Spent to date */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isLight ? '#EEF2FF' : 'rgba(79, 70, 229, 0.1)', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={18} />
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>Total Outflow</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 850, color: primaryText, marginTop: '14px' }}>
            {isINR ? `₹${metrics.totalSpentINR.toLocaleString('en-IN')}` : `$${metrics.totalSpentUSD.toLocaleString('en-US')}`}
          </div>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Paid to creators</span>
        </div>

        {/* Metric 3: Escrow Locked */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isLight ? '#FFF7ED' : 'rgba(249, 115, 22, 0.1)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>Locked in Escrow</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 850, color: primaryText, marginTop: '14px' }}>
            {isINR ? `₹${metrics.escrowLockedINR.toLocaleString('en-IN')}` : `$${metrics.escrowLockedUSD.toLocaleString('en-US')}`}
          </div>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Active milestones contracts</span>
        </div>

        {/* Metric 4: Allocated Campaign Budget */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: isLight ? '#FCE7F3' : 'rgba(236, 72, 153, 0.1)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>Allocated Budget</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 850, color: primaryText, marginTop: '14px' }}>
            {isINR ? `₹${metrics.activeBudgetINR.toLocaleString('en-IN')}` : `$${metrics.activeBudgetUSD.toLocaleString('en-US')}`}
          </div>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Reserved for active briefs</span>
        </div>

      </div>

      {/* Main split details: Left content tables, Right linked payment details */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left main content panel: Switchable views */}
        <div style={{ flex: '2 1 600px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Sub Navigation tabs */}
          <div style={{ display: 'flex', gap: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '4px' }}>
            {[
              { id: 'overview', label: 'Financial Overview' },
              { id: 'milestones', label: 'Milestones & Escrows' },
              { id: 'history', label: 'Transaction Invoices' }
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
                    fontSize: '14.5px',
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

          {/* TAB 1: Financial Overview */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Payment Info Banner */}
              <div style={{
                backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)',
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}>
                <Info size={20} style={{ color: accentColor, flexShrink: 0, marginTop: '2px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 750, color: primaryText, margin: 0 }}>Escrow Protection Active</h4>
                  <p style={{ fontSize: '12.5px', color: secondaryText, lineHeight: 1.5, margin: 0 }}>
                    All creative budgets are held securely in escrow. Funds are locked once a contract begins and are only released to creators after you inspect and approve their completed content submissions.
                  </p>
                </div>
              </div>

              {/* Pending Milestones preview */}
              <div style={{ border: `1px solid ${borderColor}`, borderRadius: '20px', backgroundColor: cardBg, padding: '24px', boxShadow: shadowStyle }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Escrow Milestone Approvals</h3>
                  <button onClick={() => setActiveTab('milestones')} style={{ background: 'none', border: 'none', color: accentColor, fontSize: '13px', fontWeight: 650, cursor: 'pointer' }} className="hover-underline">
                    View all
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {milestones.filter(m => m.status === 'requested_release').slice(0, 2).map(mile => (
                    <div key={mile.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', border: `1px solid ${borderColor}`, borderRadius: '12px', flexWrap: 'wrap', gap: '14px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={mile.creatorAvatar} alt={mile.creatorName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: 750, color: primaryText, display: 'block' }}>{mile.milestoneName}</span>
                          <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>Creator: {mile.creatorName} • Brief: {mile.campaignTitle}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: primaryText }}>
                          {isINR ? `₹${mile.amountINR.toLocaleString()}` : `$${mile.amountUSD.toLocaleString()}`}
                        </span>
                        <button
                          onClick={() => handleReleaseEscrow(mile.id)}
                          style={{
                            backgroundColor: '#10B981',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.1)'
                          }}
                        >
                          Approve Release
                        </button>
                      </div>
                    </div>
                  ))}
                  {milestones.filter(m => m.status === 'requested_release').length === 0 && (
                    <p style={{ color: mutedText, fontSize: '13px', margin: 0 }}>No pending milestone approvals requested.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Milestones & Escrows */}
          {activeTab === 'milestones' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {milestones.map(mile => (
                <div key={mile.id} style={{
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
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={mile.creatorAvatar} alt={mile.creatorName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 750, color: primaryText }}>{mile.milestoneName}</span>
                      <span style={{ fontSize: '11.5px', color: secondaryText }}>Creator: <strong>{mile.creatorName}</strong> • {mile.campaignTitle}</span>
                      <span style={{ fontSize: '11px', color: mutedText, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Calendar size={11} /> Due Date: {mile.dueDate}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: primaryText, display: 'block' }}>
                        {isINR ? `₹${mile.amountINR.toLocaleString()}` : `$${mile.amountUSD.toLocaleString()}`}
                      </span>
                      {/* Status indicator */}
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 750,
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginTop: '4px',
                        display: 'inline-block',
                        backgroundColor: mile.status === 'requested_release' 
                          ? 'rgba(245,158,11,0.08)' 
                          : mile.status === 'released' 
                            ? 'rgba(16,185,129,0.08)' 
                            : 'rgba(59,130,246,0.08)',
                        color: mile.status === 'requested_release' 
                          ? '#F59E0B' 
                          : mile.status === 'released' 
                            ? '#10B981' 
                            : '#3B82F6'
                      }}>
                        {mile.status === 'requested_release' ? 'Pending Approval' : mile.status}
                      </span>
                    </div>

                    {mile.status === 'requested_release' && (
                      <button
                        onClick={() => handleReleaseEscrow(mile.id)}
                        style={{
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(16, 185, 129, 0.15)'
                        }}
                      >
                        Approve Payment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Transaction Invoices */}
          {activeTab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Controls bar */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '340px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
                  <input
                    type="text"
                    value={txSearch}
                    onChange={(e) => setTxSearch(e.target.value)}
                    placeholder="Search transactions, creators..."
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Filter Selector */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['all', 'deposit', 'payout', 'escrow_lock'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setTxTypeFilter(type)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: txTypeFilter === type ? (isLight ? '#F3E8FF' : 'rgba(139,92,246,0.15)') : cardBg,
                        color: txTypeFilter === type ? '#8B5CF6' : secondaryText,
                        fontSize: '11.5px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type === 'all' ? 'All Types' : type === 'escrow_lock' ? 'Escrow Held' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions Table panel */}
              <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '10px 0', boxShadow: shadowStyle }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${borderColor}`, color: mutedText, fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                        <th style={{ padding: '16px 20px' }}>Reference Details</th>
                        <th style={{ padding: '16px 20px' }}>Type</th>
                        <th style={{ padding: '16px 20px' }}>Date</th>
                        <th style={{ padding: '16px 20px', textAlign: 'right' }}>Amount</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center' }}>Invoices</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '13px', color: secondaryText }} className="table-row-hover">
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {tx.creatorAvatar && (
                                <img src={tx.creatorAvatar} alt={tx.creatorName} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                              )}
                              <div>
                                <span style={{ fontWeight: 700, color: primaryText, display: 'block' }}>{tx.description}</span>
                                {tx.creatorName && (
                                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>Creator: {tx.creatorName}</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              color: tx.type === 'deposit' ? '#10B981' : tx.type === 'payout' ? '#8B5CF6' : '#F97316'
                            }}>
                              {tx.type === 'escrow_lock' ? 'Escrow' : tx.type}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ display: 'block' }}>{tx.date}</span>
                            <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>{tx.time}</span>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: 800, color: primaryText }}>
                            {tx.type === 'deposit' ? '+' : '-'} {isINR ? `₹${tx.amountINR.toLocaleString()}` : `$${tx.amountUSD.toLocaleString()}`}
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                            <button
                              onClick={() => alert(`Downloading Statement Invoice for ${tx.id}...`)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: accentColor,
                                cursor: 'pointer',
                                padding: '6px',
                                borderRadius: '6px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              className="hover-bg-white-002"
                            >
                              <Download size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredTransactions.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: mutedText }}>
                            No transactions record found matching criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right side panel: Linked corporate account details */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Linked Methods Panel */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '20px',
            padding: '24px',
            boxShadow: shadowStyle
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: '0 0 16px' }}>
              Linked Payment Methods
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {paymentMethods.map(method => (
                <div key={method.id} style={{
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: method.isPrimary ? (isLight ? '#FFF5F7' : 'rgba(236,72,153,0.05)') : 'transparent'
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {method.type === 'card' ? (
                      <CreditCard size={18} style={{ color: method.isPrimary ? accentColor : mutedText }} />
                    ) : (
                      <Building size={18} style={{ color: method.isPrimary ? accentColor : mutedText }} />
                    )}
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText, display: 'block' }}>{method.name}</span>
                      <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>{method.details}</span>
                    </div>
                  </div>

                  {method.isPrimary && (
                    <span style={{
                      fontSize: '9.5px',
                      color: accentColor,
                      backgroundColor: 'rgba(236,72,153,0.08)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 750
                    }}>
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => alert('New payment method mapping flow initiated.')}
              style={{
                width: '100%',
                marginTop: '16px',
                backgroundColor: 'transparent',
                border: `1px dashed ${borderColor}`,
                color: secondaryText,
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 650,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              className="hover-white-bg"
            >
              <Plus size={14} />
              <span>Link Payment Method</span>
            </button>
          </div>

          {/* Quick statement report card */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '20px',
            padding: '24px',
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: primaryText, margin: 0 }}>Statement Reports</h4>
            <p style={{ fontSize: '12px', color: secondaryText, lineHeight: 1.4, margin: 0 }}>
              Export financial billing sheets, tax statements, and active escrow holds records.
            </p>
            <button
              onClick={() => alert('Exporting Q2 Statement Summary...')}
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                color: primaryText,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 650,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              className="hover-white-bg"
            >
              Export statements (PDF)
            </button>
          </div>

        </div>

      </div>

      {/* POPUP MODAL: Add Funds Deposit Simulation */}
      {showAddFundsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          padding: '16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 850, color: primaryText, margin: 0 }}>
                Deposit Funds to Escrow
              </h3>
              <button
                onClick={() => setShowAddFundsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: mutedText,
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50%'
                }}
                className="hover-bg-white-002"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddFundsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Currency inputs (Linked) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Amount in INR</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText, fontSize: '13px' }}>₹</span>
                    <input
                      type="number"
                      required
                      value={fundAmountINR}
                      onChange={(e) => handleInrAmountChange(e.target.value)}
                      placeholder="e.g. 50000"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 24px',
                        borderRadius: '10px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isLight ? '#F9FAFB' : '#141416',
                        color: primaryText,
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Amount in USD</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText, fontSize: '13px' }}>$</span>
                    <input
                      type="number"
                      required
                      value={fundAmountUSD}
                      onChange={(e) => handleUsdAmountChange(e.target.value)}
                      placeholder="e.g. 625"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 24px',
                        borderRadius: '10px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isLight ? '#F9FAFB' : '#141416',
                        color: primaryText,
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Select method */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Select Payment Method</label>
                <select
                  value={selectedMethodId}
                  onChange={(e) => setSelectedMethodId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {paymentMethods.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.details})</option>
                  ))}
                </select>
              </div>

              {/* Card inputs decoration (simulated gate) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>Simulate Gateway Authorization</span>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: cardBg,
                    color: primaryText,
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="Expiry (MM/YY)"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="CVV"
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Security info disclaimer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: mutedText }}>
                <span style={{ color: '#10B981' }}>🛡️</span>
                <span>Payments are encrypted with bank-grade corporate security.</span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
                  transition: 'all 0.2s',
                  marginTop: '6px'
                }}
                className="glow-button-payments"
              >
                Confirm Deposit
              </button>

            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL: Success notification overlay */}
      {showSuccessOverlay && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={32} />
            </div>
            
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Payment Update Success</h4>
            
            <p style={{ fontSize: '13px', color: secondaryText, lineHeight: 1.4, margin: 0 }}>
              {successMessage}
            </p>

            <button
              onClick={() => setShowSuccessOverlay(false)}
              style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 24px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(236,72,153,0.2)',
                width: '100%'
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .glow-button-payments:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .table-row-hover:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-bg-white-002:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }
      `}</style>

    </div>
  );
}
