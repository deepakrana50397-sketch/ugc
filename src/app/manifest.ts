import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'igigster',
    short_name: 'igigster',
    description: 'Connect directly with vetted micro-creators, students, and influencers. Zero agency markup. Pay exact creator rates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050609',
    theme_color: '#050609',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
