import { Metadata } from 'next';
import { siteConfig } from '@/data/site';

interface MetadataOptions {
  title: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export function getPageMetadata({
  title,
  description = siteConfig.description,
  path,
  image = siteConfig.ogImage,
  noindex = false,
}: MetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonicalUrl = `${siteConfig.url}${path}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [image],
      creator: '@igigster',
    },
  };

  if (noindex) {
    metadata.robots = {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  } else {
    metadata.robots = {
      index: true,
      follow: true,
      nocache: false,
    };
  }

  return metadata;
}
