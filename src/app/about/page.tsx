import React from 'react';
import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import OurValues from '@/components/about/OurValues';
import IndiaOpportunity from '@/components/about/IndiaOpportunity';
import CollaborationProcess from '@/components/about/CollaborationProcess';
import AboutExpertise from '@/components/about/AboutExpertise';
import GlobalFootprint from '@/components/about/GlobalFootprint';
import AboutCta from '@/components/about/AboutCta';

export const metadata: Metadata = {
  title: 'About Us - Digital Engineering for Indian Growth | Ethixweb',
  description:
    'Learn about Ethixweb&apos;s dual-shore engineering model, our core philosophy, and how we engineer high-performance web platforms and digital acquisition for Indian businesses.',
  keywords: [
    'About Ethixweb',
    'Digital Engineering India',
    'Web Development Agency India',
    'Next.js Developers India',
    'Ethixweb USA LLC',
    'Ethixweb Story',
  ],
  openGraph: {
    title: 'About Us - Digital Engineering for Indian Growth | Ethixweb',
    description:
      'Learn about Ethixweb&apos;s dual-shore engineering model, our core philosophy, and how we engineer high-performance web platforms and digital acquisition for Indian businesses.',
    url: 'https://ethixweb.com/about',
    siteName: 'Ethixweb',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Digital Engineering for Indian Growth | Ethixweb',
    description:
      'Learn about Ethixweb&apos;s dual-shore engineering model, our core philosophy, and how we engineer high-performance web platforms for Indian businesses.',
  },
};

import { getAboutPageContent, getSiteSettings } from '@/lib/cmsData';

export const revalidate = 60;

export default async function AboutPage() {
  const [aboutContent, siteSettings] = await Promise.all([
    getAboutPageContent(),
    getSiteSettings(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ethixweb',
      legalName: 'Ethixweb USA LLC',
      url: 'https://ethixweb.com',
      foundingDate: '2020',
      description:
        'Digital engineering and growth agency building high-performance web platforms, AI chatbots, and Google Ads funnels for Indian businesses and global clients.',
      areaServed: [
        {
          '@type': 'Country',
          name: 'India',
        },
        {
          '@type': 'Country',
          name: 'United States',
        },
      ],
      knowsAbout: [
        'Web Development',
        'Next.js',
        'AI Automation',
        'Google Ads',
        'SEO',
        'Conversion Rate Optimization',
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
        <AboutHero data={aboutContent?.hero} />
        <OurStory story={aboutContent?.companyStory} />
        <OurValues />
        <IndiaOpportunity />
        <CollaborationProcess />
        <AboutExpertise />
        <GlobalFootprint />
        <AboutCta whatsappNumber={siteSettings?.whatsappNumber} />
      </div>
    </>
  );
}
