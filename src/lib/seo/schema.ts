import { Gig } from '@/types/gig';
import { Currency } from '@/types/common';
import { siteConfig } from '@/data/site';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    'name': siteConfig.name,
    'url': siteConfig.url,
    'logo': `${siteConfig.url}/favicon.ico`,
    'sameAs': [
      siteConfig.socials.twitter,
      siteConfig.socials.instagram,
      siteConfig.socials.linkedin
    ],
    'email': siteConfig.contactEmail,
    'telephone': siteConfig.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'HSR Layout',
      'addressLocality': 'Bangalore',
      'addressRegion': 'Karnataka',
      'postalCode': '560102',
      'addressCountry': 'IN'
    }
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    'url': siteConfig.url,
    'name': siteConfig.name,
    'description': siteConfig.description,
    'publisher': {
      '@id': `${siteConfig.url}/#organization`
    }
  };
}

export function getJobPostingSchema(gig: Gig, currency: Currency) {
  const priceAmount = gig.price[currency];
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': gig.title,
    'description': gig.description,
    'datePosted': gig.postedAt,
    'validThrough': gig.deadline ? `${gig.deadline}T23:59:59Z` : undefined,
    'employmentType': gig.paymentType === 'contract' ? 'CONTRACTOR' : 'PART_TIME',
    'hiringOrganization': {
      '@type': 'Organization',
      'name': gig.brandName,
      'logo': gig.brandLogo || `${siteConfig.url}/favicon.ico`
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'IN',
        'addressLocality': 'Remote'
      }
    },
    'baseSalary': {
      '@type': 'MonetaryAmount',
      'currency': currency,
      'value': {
        '@type': 'QuantitativeValue',
        'value': priceAmount,
        'unitText': gig.price.period === 'hour' ? 'HOUR' : 'PROJECT'
      }
    }
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${siteConfig.url}${item.item}`
    }))
  };
}
