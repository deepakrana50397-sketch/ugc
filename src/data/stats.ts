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
    value: 350,
    suffix: '+',
    label: 'Campaigns completed',
    description: 'Successful organic and paid community campaigns.',
  },
  {
    id: 's2',
    value: 1200,
    suffix: '+',
    label: 'Creators active',
    description: 'Vetted creators, students, and agencies.',
  },
  {
    id: 's3',
    value: 4800,
    suffix: '+',
    label: 'Applications',
    description: 'Connections made between brands and executing talent.',
  },
];

