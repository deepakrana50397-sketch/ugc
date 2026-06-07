export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const statsData: StatItem[] = [
  {
    id: 's1',
    value: 1200,
    suffix: '+',
    label: 'Verified UGC Creators',
    description: 'Vetted videographers, actors, and editors.',
  },
  {
    id: 's2',
    value: 450,
    suffix: '+',
    label: 'Brands Active',
    description: 'E-commerce, SaaS, and retail startups.',
  },
  {
    id: 's3',
    value: 3800,
    suffix: '',
    label: 'Gigs Completed',
    description: 'High-converting short-form videos delivered.',
  },
  {
    id: 's4',
    value: 85,
    suffix: '%',
    label: 'Lower Video CAC',
    description: 'Compared to traditional agency pricing.',
  },
];
