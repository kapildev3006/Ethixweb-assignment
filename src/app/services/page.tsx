import React from 'react';
import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesCatalog from '@/components/services/ServicesCatalog';
import IndiaSolutionsSection from '@/components/services/IndiaSolutionsSection';
import ServicesWhyUs from '@/components/services/ServicesWhyUs';
import ServicesCta from '@/components/services/ServicesCta';

export const metadata: Metadata = {
  title: 'Our Services - 22 Digital Capabilities | Ethixweb',
  description:
    'Explore Ethixweb&apos;s 22 digital capabilities across Website Engineering, AI & Automation, Growth Marketing, Analytics, Accessibility, and Ongoing Support for Indian businesses.',
  keywords: [
    'Web Development Services India',
    'AI Chatbot Development India',
    'Google Ads Management India',
    'Full Funnel Analytics',
    'Website Accessibility WCAG',
    'Ethixweb Services',
  ],
  openGraph: {
    title: 'Our Services - 22 Digital Capabilities | Ethixweb',
    description:
      'Explore Ethixweb&apos;s 22 digital capabilities across Website Engineering, AI & Automation, Growth Marketing, Analytics, Accessibility, and Ongoing Support.',
    url: 'https://ethixweb.com/services',
    siteName: 'Ethixweb',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - 22 Digital Capabilities | Ethixweb',
    description:
      'Explore Ethixweb&apos;s 22 digital capabilities across Website Engineering, AI & Automation, Growth Marketing, Analytics, and Support.',
  },
};

import { getAllServices, getSiteSettings } from '@/lib/cmsData';

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, siteSettings] = await Promise.all([
    getAllServices(),
    getSiteSettings(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Digital Engineering & Marketing Services',
    provider: {
      '@type': 'Organization',
      name: 'Ethixweb',
      url: 'https://ethixweb.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ethixweb Digital Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Engineering',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Automation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth Engine & Digital Marketing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Data & Analytics',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Accessibility Testing & Improvements',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Operations & Technical Support',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        <ServicesHero />
        <ServicesCatalog initialServices={services} />
        <IndiaSolutionsSection />
        <ServicesWhyUs />
        <ServicesCta whatsappNumber={siteSettings?.whatsappNumber} />
      </div>
    </>
  );
}
