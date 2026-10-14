import { connectDB } from './db';
import PageContent, { IPageContent } from './models/PageContent';
import Service, { IService } from './models/Service';
import CaseStudy, { ICaseStudy } from './models/CaseStudy';
import Testimonial, { ITestimonial } from './models/Testimonial';
import SiteSettings, { ISiteSettings } from './models/SiteSettings';

export async function getHomePageContent() {
  try {
    await connectDB();
    const doc = await PageContent.findOne({ pageSlug: 'home' }).lean();
    return doc?.sections || null;
  } catch (error) {
    console.error('Error fetching home page content from MongoDB:', error);
    return null;
  }
}

export async function getAboutPageContent() {
  try {
    await connectDB();
    const doc = await PageContent.findOne({ pageSlug: 'about' }).lean();
    return doc?.sections || null;
  } catch (error) {
    console.error('Error fetching about page content from MongoDB:', error);
    return null;
  }
}

export async function getContactPageContent() {
  try {
    await connectDB();
    const doc = await PageContent.findOne({ pageSlug: 'contact' }).lean();
    return doc?.sections || null;
  } catch (error) {
    console.error('Error fetching contact page content from MongoDB:', error);
    return null;
  }
}

export async function getAllServices(): Promise<any[]> {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error('Error fetching services from MongoDB:', error);
    return [];
  }
}

export async function getAllCaseStudies(): Promise<any[]> {
  try {
    await connectDB();
    const items = await CaseStudy.find({ isVisible: true }).sort({ displayOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching case studies from MongoDB:', error);
    return [];
  }
}

export async function getAllTestimonials(): Promise<any[]> {
  try {
    await connectDB();
    const items = await Testimonial.find({ isVisible: true }).sort({ displayOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching testimonials from MongoDB:', error);
    return [];
  }
}

export async function getSiteSettings(): Promise<any | null> {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' }).lean();
    return settings ? JSON.parse(JSON.stringify(settings)) : null;
  } catch (error) {
    console.error('Error fetching site settings from MongoDB:', error);
    return null;
  }
}
