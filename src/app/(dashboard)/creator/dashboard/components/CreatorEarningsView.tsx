'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import {
  Wallet, CreditCard, Clock, Calendar, ArrowUpRight, ArrowDownRight, 
  Plus, Info, Check, CheckCircle2, ChevronRight, X, Building
} from 'lucide-react';

interface EarningsViewProps {
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
  brand: string;
  logo: string;
  logoBg: string;
  logoColor: string;
  type: 'credit' | 'debit';
  amountINR: number;
  amountUSD: number;
  status: 'Completed' | 'Paid Out' | 'Pending';
}

interface PayoutMethod {
  id: string;
  type: 'bank' | 'upi';
  name: string;
  details: string;
  isPrimary: boolean;
}

export default function CreatorEarningsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: EarningsViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'payout_history'>('overview');

  // Modals state
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [showAddMethodModal, setShowAddMethodModal] = useState<boolean>(false);
  
  // Withdrawal flow state
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [selectedMethodId, setSelectedMethodId] = useState<string>('method_1');

  // Add payout method form state
  const [newMethodType, setNewMethodType] = useState<'bank' | 'upi'>('bank');
  const [newBankName, setNewBankName] = useState<string>('');
  const [newBankDetails, setNewBankDetails] = useState<string>('');
  const [newUpiId, setNewUpiId] = useState<string>('');

  // Values from Mockup
  const [metrics, setMetrics] = useState({
    totalEarningsINR: 84350,
    totalEarningsUSD: 1050,
    amountPaidINR: 45200,
    amountPaidUSD: 565,
    pendingPayoutINR: 24150,
    pendingPayoutUSD: 300,
    availableBalanceINR: 24150,
    availableBalanceUSD: 300
  });

  // Recent Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx_1',
      date: '20 Jun 2024',
      time: '10:30 AM',
      description: 'UGC Creator for Mamaearth',
      brand: 'Mamaearth',
      logo: 'M',
      logoBg: '#22C55E',
      logoColor: '#FFFFFF',
      type: 'credit',
      amountINR: 15000,
      amountUSD: 187,
      status: 'Completed'
    },
    {
      id: 'tx_2',
      date: '18 Jun 2024',
      time: '02:15 PM',
      description: 'Campus Ambassador Program',
      brand: 'Swiggy',
      logo: 'S',
      logoBg: '#FC8019',
      logoColor: '#FFFFFF',
      type: 'credit',
      amountINR: 8000,
      amountUSD: 100,
      status: 'Completed'
    },
    {
      id: 'tx_3',
      date: '15 Jun 2024',
      time: '11:45 AM',
      description: 'Product Review - boAt',
      brand: 'boAt Lifestyle',
      logo: 'boAt',
      logoBg: '#09090B',
      logoColor: '#FFFFFF',
      type: 'credit',
      amountINR: 12000,
      amountUSD: 150,
      status: 'Completed'
    },
    {
      id: 'tx_4',
      date: '12 Jun 2024',
      time: '09:20 AM',
      description: 'Payout to Bank **** 4567',
      brand: 'Bank Transfer',
      logo: 'Bank',
      logoBg: '#F3E8FF',
      logoColor: '#8B5CF6',
      type: 'debit',
      amountINR: 10000,
      amountUSD: 125,
      status: 'Paid Out'
    },
    {
      id: 'tx_5',
      date: '10 Jun 2024',
      time: '04:30 PM',
      description: 'UGC Video Reels',
      brand: 'Mamaearth',
      logo: 'M',
      logoBg: '#22C55E',
      logoColor: '#FFFFFF',
      type: 'credit',
      amountINR: 6000,
      amountUSD: 75,
      status: 'Completed'
    },
    {
      id: 'tx_6',
      date: '08 Jun 2024',
      time: '01:00 PM',
      description: 'Food Reels Creator',
      brand: 'Zomato',
      logo: 'Z',
      logoBg: '#EF4444',
      logoColor: '#FFFFFF',
      type: 'credit',
      amountINR: 7000,
      amountUSD: 88,
      status: 'Completed'
    }
  ]);

  // Payout Methods
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: 'method_1',
      type: 'bank',
      name: 'HDFC Bank',
      details: '**** **** **** 4567',
      isPrimary: true
    },
    {
      id: 'method_2',
      type: 'upi',
      name: 'UPI ID',
      details: 'ananya@upi',
      isPrimary: false
    }
  ]);

  // Currency helper formatting
  const formatMoney = (inrVal: number, usdVal: number) => {
    return isINR 
      ? `₹${inrVal.toLocaleString('en-IN')}` 
      : `$${usdVal.toLocaleString('en-US')}`;
  };

  const formatRawMoney = (amount: number) => {
    return isINR 
      ? `₹${amount.toLocaleString('en-IN')}` 
      : `$${Math.round(amount / 80).toLocaleString('en-US')}`;
  };

  // Request payout handler
  const handleRequestPayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmt = parseFloat(withdrawAmount);
    if (!numericAmt || isNaN(numericAmt)) return;

    const maxLimit = isINR ? metrics.availableBalanceINR : metrics.availableBalanceUSD;
    const minLimit = isINR ? 1000 : 12;

    if (numericAmt < minLimit) {
      alert(`Minimum withdrawal amount is ${isINR ? '₹1,000' : '$12'}`);
      return;
    }
    if (numericAmt > maxLimit) {
      alert(`Amount exceeds available balance of ${formatMoney(metrics.availableBalanceINR, metrics.availableBalanceUSD)}`);
      return;
    }

    // Process Withdrawal
    const selectedMethod = payoutMethods.find(m => m.id === selectedMethodId);
    const inrWithdrawn = isINR ? numericAmt : numericAmt * 80;
    const usdWithdrawn = isINR ? Math.round(numericAmt / 80) : numericAmt;

    // Create debit transaction
    const newTx: Transaction = {
      id: `tx_payout_${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Payout to ${selectedMethod?.name || 'Bank'} ${selectedMethod?.details || ''}`,
      brand: selectedMethod?.name || 'Bank Transfer',
      logo: selectedMethod?.type === 'bank' ? 'Bank' : 'UPI',
      logoBg: '#FCE7F3',
      logoColor: '#EC4899',
      type: 'debit',
      amountINR: inrWithdrawn,
      amountUSD: usdWithdrawn,
      status: 'Pending'
    };

    // Update state
    setMetrics(prev => ({
      ...prev,
      availableBalanceINR: prev.availableBalanceINR - inrWithdrawn,
      availableBalanceUSD: prev.availableBalanceUSD - usdWithdrawn,
      pendingPayoutINR: prev.pendingPayoutINR + inrWithdrawn,
      pendingPayoutUSD: prev.pendingPayoutUSD + usdWithdrawn
    }));

    setTransactions([newTx, ...transactions]);
    setShowRequestModal(false);
    setWithdrawAmount('');
    alert('Payout request submitted successfully! Funds will reach your primary account within 2-3 business days.');
  };

  // Add payout method handler
  const handleAddMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newMethod: PayoutMethod;
    if (newMethodType === 'bank') {
      if (!newBankName || !newBankDetails) return;
      newMethod = {
        id: `method_${Date.now()}`,
        type: 'bank',
        name: newBankName,
        details: `**** **** **** ${newBankDetails.slice(-4)}`,
        isPrimary: payoutMethods.length === 0
      };
    } else {
      if (!newUpiId) return;
      newMethod = {
        id: `method_${Date.now()}`,
        type: 'upi',
        name: 'UPI ID',
        details: newUpiId,
        isPrimary: payoutMethods.length === 0
      };
    }

    setPayoutMethods([...payoutMethods, newMethod]);
    setShowAddMethodModal(false);
    setNewBankName('');
    setNewBankDetails('');
    setNewUpiId('');
    alert('Payout method added successfully!');
  };

  // Delete payout method
  const handleDeleteMethod = (id: string) => {
    if (confirm('Are you sure you want to delete this payout method?')) {
      const updated = payoutMethods.filter(m => m.id !== id);
      // Make another primary if we deleted the primary
      if (updated.length > 0 && !updated.some(m => m.isPrimary)) {
        updated[0].isPrimary = true;
      }
      setPayoutMethods(updated);
    }
  };

  // Filter transactions based on tab
  const getFilteredTransactions = () => {
    if (activeTab === 'payout_history') {
      return transactions.filter(t => t.type === 'debit');
    }
    return transactions;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText, transition: 'all 0.3s' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            Earnings
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Track your earnings, transactions and payouts
          </p>
        </div>

        {/* Date Filter Selector */}
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: secondaryText,
            cursor: 'pointer',
            boxShadow: shadowStyle
          }}
        >
          <Calendar size={14} style={{ color: mutedText }} />
          <span>22 May 2024 - 21 Jun 2024</span>
        </div>
      </div>

      {/* Grid: 4 Metric Cards + Request Payout Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Metric 1: Total Earnings */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: isLight ? '#DCFCE7' : 'rgba(34,197,94,0.1)', color: '#22C55E', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <Wallet size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Earnings
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, marginTop: '4px' }}>
              {formatMoney(metrics.totalEarningsINR, metrics.totalEarningsUSD)}
            </div>
            <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span>▲ 12.5%</span>
              <span style={{ color: mutedText, fontWeight: 500 }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Amount Paid */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: isLight ? '#FFEDD5' : 'rgba(249,115,22,0.1)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CreditCard size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Amount Paid
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, marginTop: '4px' }}>
              {formatMoney(metrics.amountPaidINR, metrics.amountPaidUSD)}
            </div>
            <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span>▲ 8.7%</span>
              <span style={{ color: mutedText, fontWeight: 500 }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Pending Payout */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: isLight ? '#F3E8FF' : 'rgba(139,92,246,0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Payout
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, marginTop: '4px' }}>
              {formatMoney(metrics.pendingPayoutINR, metrics.pendingPayoutUSD)}
            </div>
            <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span>▲ 15.3%</span>
              <span style={{ color: mutedText, fontWeight: 500 }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Available Balance */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: isLight ? '#DBEAFE' : 'rgba(59,130,246,0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Available Balance
              </span>
              <Info size={12} style={{ color: mutedText, opacity: 0.6 }} />
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: primaryText, marginTop: '4px' }}>
              {formatMoney(metrics.availableBalanceINR, metrics.availableBalanceUSD)}
            </div>
            <div style={{ fontSize: '10.5px', color: mutedText, fontWeight: 500, marginTop: '6px' }}>
              * Minimum {isINR ? '₹1,000' : '$12'}
            </div>
          </div>
        </div>

        {/* Metric 5: Request Payout Action Card */}
        <div 
          style={{ 
            backgroundColor: cardBg, 
            border: `2px solid ${borderColor}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: shadowStyle, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            gap: '12px',
            backgroundImage: isLight ? 'none' : 'linear-gradient(rgba(236,72,153,0.02), transparent)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  Available Balance
                </span>
                <Info size={11} style={{ color: mutedText }} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '4px' }}>
                {formatMoney(metrics.availableBalanceINR, metrics.availableBalanceUSD)}
              </div>
            </div>
            <span style={{ fontSize: '10.5px', color: mutedText, textAlign: 'right' }}>
              Min withdrawal: {isINR ? '₹1,000' : '$12'}
            </span>
          </div>

          <button
            onClick={() => {
              if (metrics.availableBalanceINR <= 0) {
                alert('No balance available for payout');
                return;
              }
              setWithdrawAmount(isINR ? metrics.availableBalanceINR.toString() : metrics.availableBalanceUSD.toString());
              setShowRequestModal(true);
            }}
            style={{
              backgroundColor: accentColor,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '13px',
              fontWeight: 750,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(236,72,153,0.15)',
              width: '100%'
            }}
          >
            Request Payout
          </button>
        </div>

      </div>

      {/* Main Split Layout: Left (Transactions) & Right (Payout Methods/Summary) */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Recent Transactions Table (approx 70%) */}
        <div style={{ flex: '3 1 700px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header Row with Tabs and View All Link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'transactions', label: 'Transactions' },
                { key: 'payout_history', label: 'Payout History' }
              ].map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
                      color: isActive ? primaryText : secondaryText,
                      fontWeight: isActive ? 750 : 500,
                      fontSize: '14.5px',
                      cursor: 'pointer',
                      padding: '8px 4px 10px 4px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setActiveTab('transactions')}
              style={{ background: 'none', border: 'none', color: accentColor, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              className="hover-underline"
            >
              View all
            </button>
          </div>

          {/* Transactions List Container */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: '0 0 20px 0' }}>
              Recent Transactions
            </h3>

            <div style={{ overflowX: 'auto' }} className="inner-scroller">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px' }}>
                    <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Description</th>
                    <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Type</th>
                    <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Amount</th>
                    <th style={{ padding: '0 12px 12px 12px', fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredTransactions().map((tx) => {
                    const isCredit = tx.type === 'credit';
                    return (
                      <tr 
                        key={tx.id} 
                        style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.2s' }}
                        className="hover-bg-white-001"
                      >
                        {/* Date column */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>{tx.date}</div>
                          <div style={{ fontSize: '10.5px', color: mutedText, marginTop: '2px', fontWeight: 500 }}>{tx.time}</div>
                        </td>

                        {/* Description & Brand logo column */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: tx.logoBg,
                                color: tx.logoColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 800,
                                flexShrink: 0
                              }}
                            >
                              {tx.logo}
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>{tx.description}</div>
                              <div style={{ fontSize: '11px', color: mutedText, marginTop: '2px', fontWeight: 500 }}>{tx.brand}</div>
                            </div>
                          </div>
                        </td>

                        {/* Type badge column */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <span
                            style={{
                              backgroundColor: isCredit 
                                ? (isLight ? '#DCFCE7' : 'rgba(34,197,94,0.15)') 
                                : (isLight ? '#FCE7F3' : 'rgba(236,72,153,0.15)'),
                              color: isCredit ? '#22C55E' : '#EC4899',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              textTransform: 'capitalize'
                            }}
                          >
                            {tx.type}
                          </span>
                        </td>

                        {/* Amount column */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle', fontSize: '13.5px', fontWeight: 750, color: isCredit ? '#22C55E' : primaryText }}>
                          {isCredit ? '+' : '-'} {formatRawMoney(isCredit ? (isINR ? tx.amountINR : tx.amountUSD * 80) : (isINR ? tx.amountINR : tx.amountUSD * 80))}
                        </td>

                        {/* Status column */}
                        <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                          <span
                            style={{
                              backgroundColor: tx.status === 'Completed' 
                                ? (isLight ? '#D1FAE5' : 'rgba(16,185,129,0.15)') 
                                : tx.status === 'Paid Out' 
                                  ? (isLight ? '#DBEAFE' : 'rgba(59,130,246,0.15)')
                                  : (isLight ? '#FEF3C7' : 'rgba(245,158,11,0.15)'),
                              color: tx.status === 'Completed' 
                                ? '#10B981' 
                                : tx.status === 'Paid Out' 
                                  ? '#3B82F6'
                                  : '#F59E0B',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '4px 8px',
                              borderRadius: '6px'
                            }}
                          >
                            {tx.status}
                          </span>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* View all transactions dropdown button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={() => alert('Opening full transaction history...')}
                style={{
                  background: 'none',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  color: secondaryText,
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                className="hover-bg-white-002"
              >
                <span>View all transactions</span>
                <ChevronRight size={14} style={{ transform: 'rotate(90deg)', opacity: 0.7 }} />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Payout Methods & Summary (approx 30%) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Box 1: Payout Methods */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Payout Methods
              </h3>
              <button
                onClick={() => setShowAddMethodModal(true)}
                style={{ background: 'none', border: 'none', color: accentColor, fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                className="hover-underline"
              >
                <Plus size={13} />
                <span>Add New</span>
              </button>
            </div>

            {/* Methods List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {payoutMethods.map((method) => (
                <div
                  key={method.id}
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.01)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        backgroundColor: method.type === 'bank' ? '#EFF6FF' : '#ECFDF5',
                        color: method.type === 'bank' ? '#3B82F6' : '#10B981',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '9px',
                        border: `1px solid rgba(0,0,0,0.02)`
                      }}
                    >
                      {method.type === 'bank' ? 'BANK' : 'UPI'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>
                          {method.name}
                        </span>
                        {method.isPrimary && (
                          <span
                            style={{
                              backgroundColor: isLight ? '#DCFCE7' : 'rgba(34,197,94,0.15)',
                              color: '#22C55E',
                              fontSize: '9px',
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}
                          >
                            Primary
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: mutedText, marginTop: '2px', fontWeight: 500 }}>
                        {method.details}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Delete if not primary/only) */}
                  {payoutMethods.length > 1 && (
                    <button
                      onClick={() => handleDeleteMethod(method.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: mutedText,
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px'
                      }}
                      className="hover-color-accent"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: Payout Summary */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
              Payout Summary
            </h3>

            {/* Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: secondaryText }}>
                <span>Total Earnings</span>
                <span style={{ fontWeight: 650, color: primaryText }}>{formatMoney(metrics.totalEarningsINR, metrics.totalEarningsUSD)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: secondaryText }}>
                <span>Amount Paid</span>
                <span style={{ fontWeight: 650, color: primaryText }}>- {formatMoney(metrics.amountPaidINR, metrics.amountPaidUSD)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: secondaryText }}>
                <span>Pending Payouts</span>
                <span style={{ fontWeight: 650, color: primaryText }}>- {formatMoney(metrics.pendingPayoutINR, metrics.pendingPayoutUSD)}</span>
              </div>
              
              <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800 }}>
                <span>Available Balance</span>
                <span style={{ color: '#22C55E' }}>{formatMoney(metrics.availableBalanceINR, metrics.availableBalanceUSD)}</span>
              </div>
            </div>

            {/* Footer alert message */}
            <div
              style={{
                backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.01)',
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginTop: '4px'
              }}
            >
              <Info size={14} style={{ color: mutedText, marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontSize: '11px', color: mutedText, margin: 0, lineHeight: 1.4 }}>
                Payouts are processed within 2-3 business days.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* REQUEST PAYOUT POPUP DIALOG MODAL */}
      {showRequestModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999
          }}
          onClick={() => setShowRequestModal(false)}
        >
          <form
            onSubmit={handleRequestPayoutSubmit}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Request Payout
              </h3>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Input field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Withdrawal Amount ({currency})
              </label>
              <input
                type="number"
                min={isINR ? 1000 : 12}
                max={isINR ? metrics.availableBalanceINR : metrics.availableBalanceUSD}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{
                  backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: primaryText,
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none'
                }}
                required
              />
              <span style={{ fontSize: '11px', color: mutedText }}>
                Available balance: {formatMoney(metrics.availableBalanceINR, metrics.availableBalanceUSD)}
              </span>
            </div>

            {/* Payout method choice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: secondaryText }}>
                Send to Account
              </label>
              <select
                value={selectedMethodId}
                onChange={(e) => setSelectedMethodId(e.target.value)}
                style={{
                  backgroundColor: isLight ? '#FFFFFF' : '#1C1C1F',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: primaryText,
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                {payoutMethods.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.details})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: secondaryText,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '10px',
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
                  flex: 1,
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: 750,
                  cursor: 'pointer'
                }}
              >
                Confirm Payout
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ADD PAYOUT METHOD DIALOG MODAL */}
      {showAddMethodModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999
          }}
          onClick={() => setShowAddMethodModal(false)}
        >
          <form
            onSubmit={handleAddMethodSubmit}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Add Payout Method
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMethodModal(false)}
                style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Choice: Bank vs UPI */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['bank', 'upi'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNewMethodType(type)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: newMethodType === type 
                      ? (isLight ? '#FFF2F8' : 'rgba(236,72,153,0.1)') 
                      : 'transparent',
                    border: `1px solid ${newMethodType === type ? accentColor : borderColor}`,
                    color: newMethodType === type ? accentColor : secondaryText,
                    textTransform: 'uppercase'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Inputs based on selection */}
            {newMethodType === 'bank' ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank, ICICI Bank"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    style={{
                      backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: primaryText,
                      fontSize: '13px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Account Number (min 10 digits)"
                    value={newBankDetails}
                    onChange={(e) => setNewBankDetails(e.target.value)}
                    style={{
                      backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: primaryText,
                      fontSize: '13px',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. username@upi"
                  value={newUpiId}
                  onChange={(e) => setNewUpiId(e.target.value)}
                  style={{
                    backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none'
                  }}
                  required
                />
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowAddMethodModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: secondaryText,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px',
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
                  flex: 1,
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '13px',
                  fontWeight: 750,
                  cursor: 'pointer'
                }}
              >
                Add Method
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
