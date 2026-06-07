import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Briefcase, 
  PlusSquare, 
  Users, 
  ShieldAlert,
  Search,
  Settings,
  HelpCircle
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface DashboardMenuItem {
  label: string;
  href: string;
  iconName: string; // Storing icon identifiers so we can render them inside components
}

export const navItems: NavItem[] = [
  { label: 'Find Gigs', href: '/gigs' },
  { label: 'Find Creators', href: '/creators' },
  { label: 'For Brands', href: '/brands' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse UGC Gigs', href: '/gigs' },
      { label: 'Find Creators', href: '/creators' },
      { label: 'Post a Gig', href: '/brand/post-gig' },
      { label: 'Pricing Plans', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'UGC Marketing Blog', href: '/blog' },
      { label: 'Help Center & FAQ', href: '/how-it-works#faq' },
      { label: 'Creator Guidelines', href: '/how-it-works#creators' },
      { label: 'Brand Guidelines', href: '/how-it-works#brands' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Support', href: '/contact' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Success Stories', href: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export const creatorDashboardMenu: DashboardMenuItem[] = [
  { label: 'Dashboard', href: '/creator/dashboard', iconName: 'LayoutDashboard' },
  { label: 'My Profile', href: '/creator/profile', iconName: 'User' },
  { label: 'Applications', href: '/creator/applications', iconName: 'FileText' },
  { label: 'Explore Gigs', href: '/gigs', iconName: 'Briefcase' },
];

export const brandDashboardMenu: DashboardMenuItem[] = [
  { label: 'Dashboard', href: '/brand/dashboard', iconName: 'LayoutDashboard' },
  { label: 'Post a Gig', href: '/brand/post-gig', iconName: 'PlusSquare' },
  { label: 'Manage Gigs', href: '/brand/gigs', iconName: 'Briefcase' },
  { label: 'Review Applicants', href: '/brand/applicants', iconName: 'Users' },
];

export const adminDashboardMenu: DashboardMenuItem[] = [
  { label: 'Overview', href: '/admin/dashboard', iconName: 'LayoutDashboard' },
  { label: 'Vet Gigs', href: '/admin/gigs', iconName: 'Briefcase' },
  { label: 'Review Applications', href: '/admin/applications', iconName: 'FileText' },
  { label: 'Users Directory', href: '/admin/users', iconName: 'Users' },
];
