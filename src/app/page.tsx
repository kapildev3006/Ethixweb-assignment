import React from 'react';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import ServicesSection from '@/components/home/ServicesSection';
import ProcessSection from '@/components/home/ProcessSection';
import FeaturedWorkSection from '@/components/home/FeaturedWorkSection';
import WhyEthixwebSection from '@/components/home/WhyEthixwebSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaBanner from '@/components/home/CtaBanner';

import { getHomePageContent, getAllServices, getAllCaseStudies, getAllTestimonials, getSiteSettings } from '@/lib/cmsData';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function HomePage() {
  const [homeContent, services, caseStudies, testimonials, siteSettings] = await Promise.all([
    getHomePageContent(),
    getAllServices(),
    getAllCaseStudies(),
    getAllTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col">
      <Hero data={homeContent?.hero} />
      <StatsBar />
      <ServicesSection items={services} />
      <ProcessSection />
      <FeaturedWorkSection items={caseStudies} />
      <WhyEthixwebSection data={homeContent?.whyEthixweb} />
      <TestimonialsSection items={testimonials} />
      <CtaBanner data={homeContent?.cta} whatsappNumber={siteSettings?.whatsappNumber} />
    </div>
  );
}
