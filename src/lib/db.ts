import fs from 'fs';
import path from 'path';
import { mockGigs } from '@/data/gigs';
import { mockCreators } from '@/data/creators';

const DB_FILE = path.join(process.cwd(), 'igigster_db.json');

export interface DatabaseSchema {
  gigs: any[];
  creators: any[];
  applications: any[];
  escrow: any[];
  contracts: any[];
  payments: any[];
  payouts: any[];
  risk: any[];
  user: any | null;
}

export function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const defaultDb: DatabaseSchema = {
        gigs: mockGigs,
        creators: mockCreators,
        applications: [
          {
            id: 'app-1',
            gigId: 'gig-1',
            gigTitle: 'UGC Creator for Organic Skincare Brand (Reel/TikTok)',
            brandId: 'brand-skinglow',
            brandName: 'SkinGlow India',
            creatorId: mockCreators[0].id,
            creatorName: mockCreators[0].name,
            creatorAvatar: mockCreators[0].avatar,
            creatorTitle: mockCreators[0].title,
            pitch: 'I would love to align on the skincare reels brief. I have 3+ years experience creating health content.',
            portfolioLink: mockCreators[0].portfolio[0]?.videoUrl || '',
            rate: { INR: 12000, USD: 150 },
            appliedAt: new Date().toISOString(),
            status: 'pending'
          }
        ],
        escrow: [
          { id: 'esc-001', brandName: 'Mamaearth Cosmetics', creatorName: 'Ananya Sharma', dealTitle: 'Serum Reels Campaign', totalINR: 150000, totalUSD: 1800, lockedINR: 150000, lockedUSD: 1800, releasableINR: 0, releasableUSD: 0, status: 'Secured', lastUpdated: '2026-06-24' },
          { id: 'esc-002', brandName: 'FitLife Wellness', creatorName: 'Karan Mehra', dealTitle: 'Yoga Challenge Series', totalINR: 90000, totalUSD: 1080, lockedINR: 0, lockedUSD: 0, releasableINR: 90000, releasableUSD: 1080, status: 'Releasing', lastUpdated: '2026-06-25' },
          { id: 'esc-003', brandName: 'boAt Lifestyle', creatorName: 'Neha Kapoor', dealTitle: 'Airdopes Launch Review', totalINR: 250000, totalUSD: 3000, lockedINR: 250000, lockedUSD: 3000, releasableINR: 0, releasableUSD: 0, status: 'Hold', lastUpdated: '2026-06-23' },
          { id: 'esc-004', brandName: 'Mamaearth Cosmetics', creatorName: 'Riya Mishra', dealTitle: 'Hair Oil Integration', totalINR: 120000, totalUSD: 1440, lockedINR: 0, lockedUSD: 0, releasableINR: 0, releasableUSD: 0, status: 'Completed', lastUpdated: '2026-06-21' }
        ],
        contracts: [
          { id: 'con-4081', brandName: 'Mamaearth Cosmetics', creatorName: 'Ananya Sharma', type: 'UGC Reel Video Licensing', signedDate: '2026-06-15', milestonesCount: 3, completedMilestones: 2, status: 'Active' },
          { id: 'con-4082', brandName: 'FitLife Wellness', creatorName: 'Karan Mehra', type: 'Exclusive Ambassador Pack', signedDate: '2026-06-10', milestonesCount: 5, completedMilestones: 5, status: 'Completed' },
          { id: 'con-4083', brandName: 'boAt Lifestyle', creatorName: 'Neha Kapoor', type: 'Social Video Shorts integration', signedDate: '2026-06-22', milestonesCount: 2, completedMilestones: 0, status: 'Pending Signatures' },
          { id: 'con-4084', brandName: 'Mamaearth Cosmetics', creatorName: 'Riya Mishra', type: 'Influencer Post Series', signedDate: '2026-06-01', milestonesCount: 4, completedMilestones: 1, status: 'Breached' }
        ],
        payments: [
          { id: 'dep-9021', brandName: 'Mamaearth Cosmetics', amountINR: 150000, amountUSD: 1800, feeINR: 7500, feeUSD: 90, date: '2026-06-24', method: 'NetBanking', invoiceId: 'INV-2026-042', status: 'Succeeded' },
          { id: 'dep-9022', brandName: 'FitLife Wellness', amountINR: 90000, amountUSD: 1080, feeINR: 4500, feeUSD: 54, date: '2026-06-25', method: 'UPI Pay', invoiceId: 'INV-2026-043', status: 'Pending Verification' },
          { id: 'dep-9023', brandName: 'boAt Lifestyle', amountINR: 250000, amountUSD: 3000, feeINR: 12500, feeUSD: 150, date: '2026-06-23', method: 'Corporate Card', invoiceId: 'INV-2026-044', status: 'Succeeded' },
          { id: 'dep-9024', brandName: 'FitLife Wellness', amountINR: 50000, amountUSD: 600, feeINR: 2500, feeUSD: 30, date: '2026-06-20', method: 'UPI Pay', invoiceId: 'INV-2026-041', status: 'Failed' }
        ],
        payouts: [
          { id: 'pay-7701', creatorName: 'Riya Mishra', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80', projectName: 'Gloxo Summer Campaign', amountINR: 125000, amountUSD: 1500, date: '2026-06-25', routeType: 'UPI', routeDetails: 'riya@okhdfcbank', status: 'Pending Approval' },
          { id: 'pay-7702', creatorName: 'Aman Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80', projectName: 'StyleNova Winter Video', amountINR: 85000, amountUSD: 1020, date: '2026-06-24', routeType: 'Bank Transfer', routeDetails: 'A/c **4021 - HDFC', status: 'Processing' },
          { id: 'pay-7703', creatorName: 'Neha Kapoor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&auto=format&fit=crop&q=80', projectName: 'FitLife Challenge Post', amountINR: 95000, amountUSD: 1140, date: '2026-06-25', routeType: 'UPI', routeDetails: 'nehak@oksbi', status: 'Pending Approval' },
          { id: 'pay-7704', creatorName: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80', projectName: 'Greenly Drive Reel', amountINR: 65000, amountUSD: 780, date: '2026-06-20', routeType: 'UPI', routeDetails: 'ananya@okaxis', status: 'Succeeded' }
        ],
        risk: [
          { id: 'risk-551', entityName: 'StyleNova Winter Video', entityType: 'Campaign brief', riskFactor: 'Brief contains prohibited external checkout links requesting off-platform payments.', severity: 'Critical', reportedDate: '2026-06-25', status: 'Open' },
          { id: 'risk-552', entityName: 'Aman Verma', entityType: 'Creator', riskFactor: 'Suspicious multiple login devices from distinct IP locations within 10 minutes.', severity: 'High', reportedDate: '2026-06-24', status: 'Under Review' },
          { id: 'risk-553', entityName: 'Gloxo Cosmetics', entityType: 'Brand', riskFactor: 'Unusually high transaction size deposit split that failed risk verification.', severity: 'High', reportedDate: '2026-06-23', status: 'Open' },
          { id: 'risk-554', entityName: 'FitLife Challenge Post', entityType: 'Campaign brief', riskFactor: 'Content description uses flagged health statements claiming medical curing.', severity: 'Medium', reportedDate: '2026-06-21', status: 'Resolved' }
        ],
        user: {
          id: 'creator-1',
          name: 'Ananya Sharma',
          email: 'ananya@creator.com',
          role: 'creator',
          title: 'UGC Creator & Content Strategist',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
          joinedAt: new Date().toISOString()
        }
      };
      writeDatabase(defaultDb);
      return defaultDb;
    }

    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading filesystem db, returning empty template:', error);
    return {
      gigs: [],
      creators: [],
      applications: [],
      escrow: [],
      contracts: [],
      payments: [],
      payouts: [],
      risk: [],
      user: null
    };
  }
}

export function writeDatabase(db: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing filesystem db:', error);
  }
}
