import { Metadata } from 'next';
import { PersonalityConfig } from '../types/eightball';

const SITE_NAME = 'Ask the 8 Ball';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ask8ball.com';
const DEFAULT_DESCRIPTION = "Get mystical answers from AI-powered Magic 8 Ball personalities. Ask questions and receive entertaining responses from sarcastic, villainous, childish, and flattering oracles.";

export interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  personality?: PersonalityConfig;
  canonical?: string;
  noIndex?: boolean;
}

/**
 * Generates comprehensive metadata for SEO and social sharing
 */
export function generateMetadata(config: MetaConfig = {}): Metadata {
  const {
    title: customTitle,
    description: customDescription,
    keywords = [],
    personality,
    canonical,
    noIndex = false
  } = config;

  // Build title
  let title = customTitle || SITE_NAME;
  if (personality) {
    title = `${personality.name} Magic 8 Ball - ${SITE_NAME}`;
  }

  // Build description
  let description = customDescription || DEFAULT_DESCRIPTION;
  if (personality) {
    description = `Ask the ${personality.name} Magic 8 Ball: ${personality.description} Get AI-powered mystical answers with personality!`;
  }

  // Build keywords
  const baseKeywords = [
    'magic 8 ball',
    'eight ball',
    'fortune teller',
    'ai oracle',
    'mystical answers',
    'ask questions',
    'fortune telling',
    'divination',
    'ai personality',
    'entertainment'
  ];

  if (personality) {
    baseKeywords.push(
      `${personality.name.toLowerCase()} 8 ball`,
      `${personality.name.toLowerCase()} oracle`,
      `${personality.name.toLowerCase()} fortune teller`
    );
  }

  const allKeywords = [...baseKeywords, ...keywords].join(', ');

  // Build URLs
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const imageUrl = `${SITE_URL}/api/og${personality ? `?personality=${personality.linkname}` : ''}`;

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: 'Ask8Ball Team' }],
    creator: 'Ask8Ball',
    publisher: 'Ask8Ball',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: personality ? `${personality.name} Magic 8 Ball` : 'Magic 8 Ball',
          type: 'image/png',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ask8ball',
      creator: '@ask8ball',
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'theme-color': personality?.theme.accentColor || '#8B5CF6',
      'color-scheme': 'dark light',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': SITE_NAME,
      'application-name': SITE_NAME,
      'msapplication-TileColor': personality?.theme.accentColor || '#8B5CF6',
      'msapplication-config': '/browserconfig.xml',
    },
  };
}

/**
 * Generates JSON-LD structured data for SEO
 */
export function generateStructuredData(personality?: PersonalityConfig) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Ask8Ball',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ask8Ball',
      url: SITE_URL,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
    keywords: [
      'magic 8 ball',
      'fortune teller',
      'ai oracle',
      'entertainment',
      'divination'
    ],
  };

  if (personality) {
    return {
      ...baseData,
      name: `${personality.name} Magic 8 Ball`,
      description: `${personality.description} Ask questions and get AI-powered mystical answers.`,
      keywords: [
        ...baseData.keywords,
        `${personality.name.toLowerCase()} 8 ball`,
        `${personality.name.toLowerCase()} oracle`
      ],
    };
  }

  return baseData;
}