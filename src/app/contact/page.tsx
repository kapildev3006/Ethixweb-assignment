import React from 'react';
import type { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactExperience from '@/components/contact/ContactExperience';
import ContactProcess from '@/components/contact/ContactProcess';
import ContactFAQ from '@/components/contact/ContactFAQ';
import ContactCTA from '@/components/contact/ContactCTA';

export const metadata: Metadata = {
  title: 'Contact Us - Schedule an Engineering Consultation | Ethixweb',
  description:
    'Connect with the technical team at Ethixweb. Submit your project enquiry for custom website engineering, AI automation, or Google Ads growth funnels.',
  keywords: [
    'Contact Ethixweb',
    'Web Development Enquiry India',
    'AI Chatbot Consultation',
    'Google Ads Strategy India',
    'Hire Next.js Developers',
  ],
  openGraph: {
    title: 'Contact Us - Schedule an Engineering Consultation | Ethixweb',
    description:
      'Connect with the technical team at Ethixweb. Submit your project enquiry for custom website engineering, AI automation, or Google Ads growth.',
    url: 'https://ethixweb.com/contact',
    siteName: 'Ethixweb',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Schedule an Engineering Consultation | Ethixweb',
    description:
      'Connect with the technical team at Ethixweb. Submit your project enquiry for custom website engineering, AI automation, or Google Ads growth.',
  },
};

import { getContactPageContent } from '@/lib/cmsData';

export const revalidate = 60;

export default async function ContactPage() {
  const contactContent = await getContactPageContent();

  const hero = contactContent?.hero || {};
  const cd = contactContent?.contactDetails || {};

  const whatsappNumber = contactContent?.whatsappNumber || cd.whatsappNumber || '919876543210';
  const contactEmail = contactContent?.contactEmail || cd.contactEmail || 'info@ethixweb.com';
  const salesPhone = contactContent?.salesPhone || cd.salesPhone || '+1 (888) 555-ETHIX / +91 (80) 4123-ETHX';
  const operatingHours = contactContent?.operatingHours || cd.operatingHours || 'Monday – Friday · 9:00 AM – 7:00 PM IST';
  const calendlyUrl = contactContent?.calendlyUrl || cd.calendlyUrl || 'https://calendly.com/ethixweb-agency/30min';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Ethixweb',
    url: 'https://ethixweb.com/contact',
    description:
      'Submit a project enquiry or schedule a discovery consultation with the Ethixweb engineering and digital growth team.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ethixweb',
      legalName: 'Ethixweb USA LLC',
      email: contactEmail,
      url: 'https://ethixweb.com',
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
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'technical support and sales',
        email: contactEmail,
        telephone: salesPhone,
        availableLanguage: ['English', 'Hindi'],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        <ContactHero
          email={contactEmail}
          whatsappNumber={whatsappNumber}
          calendlyUrl={calendlyUrl}
          heroData={{
            heroEyebrow: hero.heroEyebrow || contactContent?.heroEyebrow,
            heroHeadline: hero.heroHeadline || contactContent?.heroHeadline,
            heroHeadlineHighlight: hero.heroHeadlineHighlight || contactContent?.heroHeadlineHighlight,
            heroDescription: hero.heroDescription || contactContent?.heroDescription,
          }}
        />
        <ContactExperience
          whatsappNumber={whatsappNumber}
          contactEmail={contactEmail}
          salesPhone={salesPhone}
          operatingHours={operatingHours}
          calendlyUrl={calendlyUrl}
        />
        <ContactProcess />
        <ContactFAQ faqs={contactContent?.faqs} />
        <ContactCTA />
      </div>
    </>
  );
}
