/**
 * Ethixweb Production CMS TypeScript Interfaces & Default Empty Templates
 */

export interface HomePageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  primaryCtaLabel: string;
  primaryCtaDestination: string;
  secondaryCtaLabel: string;
  secondaryCtaDestination: string;
  valueProps: {
    id: string;
    number: string;
    title: string;
    description: string;
  }[];
  whyEthixweb: {
    eyebrow: string;
    headline: string;
    description: string;
    pillars: {
      id: string;
      title: string;
      description: string;
      tag: string;
    }[];
  };
}

export interface ServiceItem {
  id: string;
  _id?: string;
  number: string;
  category: string;
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  indianUseCase: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  companyStory: {
    heading: string;
    paragraphs: string[];
  };
  dualShoreModel: {
    usHeadquarters: string;
    indiaEngineeringHub: string;
    advantage: string;
  };
  coreValues: {
    id: string;
    title: string;
    description: string;
  }[];
  indiaOpportunity: {
    heading?: string;
    headline?: string;
    description: string;
    bulletPoints?: string[];
    metrics?: {
      label: string;
      value: string;
    }[];
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export interface ContactPageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  contactEmail: string;
  salesPhone: string;
  whatsappNumber: string;
  officeAddress: string;
  operatingHours: string;
  calendlyUrl: string;
  faqs: FAQItem[];
}

export interface FeaturedProjectItem {
  id: string;
  _id?: string;
  client: string;
  badge: string;
  category: string;
  headline: string;
  description: string;
  screenshot: string;
  websiteUrl: string;
  metrics: string[];
  displayOrder: number;
  isVerified: boolean;
}

export interface TestimonialItem {
  id: string;
  _id?: string;
  name: string;
  role: string;
  date: string;
  impact: string;
  quote: string;
  sourceUrl: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface SiteSettingsContent {
  websiteTitle: string;
  seoDescription: string;
  keywords: string[];
  legalEntityName: string;
  copyrightText: string;
  supportEmail: string;
  salesPhone?: string;
  whatsappNumber?: string;
  officeAddress?: string;
  operatingHours?: string;
  calendlyUrl?: string;
  primaryBrandColor: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
    trustpilot: string;
  };
  logoUrl?: string;
}

export const emptyHomePageContent: HomePageContent = {
  heroEyebrow: '',
  heroHeadline: '',
  heroHeadlineHighlight: '',
  heroDescription: '',
  primaryCtaLabel: '',
  primaryCtaDestination: '',
  secondaryCtaLabel: '',
  secondaryCtaDestination: '',
  valueProps: [],
  whyEthixweb: {
    eyebrow: '',
    headline: '',
    description: '',
    pillars: [],
  },
};

export const emptyAboutPageContent: AboutPageContent = {
  heroEyebrow: '',
  heroHeadline: '',
  heroHeadlineHighlight: '',
  heroDescription: '',
  companyStory: {
    heading: '',
    paragraphs: [],
  },
  dualShoreModel: {
    usHeadquarters: '',
    indiaEngineeringHub: '',
    advantage: '',
  },
  coreValues: [],
  indiaOpportunity: {
    heading: '',
    headline: '',
    description: '',
    bulletPoints: [],
    metrics: [],
  },
};

export const emptyContactPageContent: ContactPageContent = {
  heroEyebrow: '',
  heroHeadline: '',
  heroHeadlineHighlight: '',
  heroDescription: '',
  contactEmail: '',
  salesPhone: '',
  whatsappNumber: '',
  officeAddress: '',
  operatingHours: '',
  calendlyUrl: '',
  faqs: [],
};

export const emptySiteSettingsContent: SiteSettingsContent = {
  websiteTitle: '',
  seoDescription: '',
  keywords: [],
  legalEntityName: '',
  copyrightText: '',
  supportEmail: '',
  salesPhone: '',
  whatsappNumber: '',
  officeAddress: '',
  operatingHours: '',
  calendlyUrl: '',
  primaryBrandColor: '#C0272D',
  socialLinks: {
    linkedin: '',
    twitter: '',
    instagram: '',
    trustpilot: '',
  },
  logoUrl: '/assets/ethixweb-logo.webp',
};
