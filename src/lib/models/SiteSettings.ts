import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  key: string;
  websiteTitle: string;
  seoDescription: string;
  keywords: string[];
  legalEntityName: string;
  copyrightText: string;
  supportEmail: string;
  salesPhone: string;
  whatsappNumber?: string;
  officeAddress: string;
  operatingHours: string;
  calendlyUrl: string;
  primaryBrandColor: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
    trustpilot: string;
  };
  logoUrl?: string;
  logoCloudinaryPublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: {
      type: String,
      default: 'global',
      unique: true,
      index: true,
    },
    websiteTitle: {
      type: String,
      required: true,
      default: 'Ethixweb - Digital Growth for Indian Businesses',
    },
    seoDescription: {
      type: String,
      required: true,
      default:
        'We build high-performing websites, run result-driven Google Ads, and create digital marketing strategies that help Indian businesses grow, get more customers, and increase revenue.',
    },
    keywords: {
      type: [String],
      default: [
        'Web Development India',
        'Google Ads India',
        'Digital Marketing Agency India',
        'D2C Web Development',
        'Next.js Development India',
        'Ethixweb',
      ],
    },
    legalEntityName: {
      type: String,
      default: 'Ethixweb USA LLC',
    },
    copyrightText: {
      type: String,
      default: '© 2026 Ethixweb. All rights reserved.',
    },
    supportEmail: {
      type: String,
      default: 'info@ethixweb.com',
    },
    salesPhone: {
      type: String,
      default: '+1 (888) 555-ETHIX / +91 (80) 4123-ETHX',
    },
    whatsappNumber: {
      type: String,
      default: '919876543210',
      trim: true,
    },
    officeAddress: {
      type: String,
      default: 'Ethixweb USA LLC · Operational Headquarters (Dual-Shore Model)',
    },
    operatingHours: {
      type: String,
      default: 'Mon - Fri: 9:00 AM - 7:00 PM IST / EST Support Active',
    },
    calendlyUrl: {
      type: String,
      default: 'https://calendly.com/ethixweb/discovery-call',
    },
    primaryBrandColor: {
      type: String,
      default: '#C0272D',
    },
    socialLinks: {
      linkedin: {
        type: String,
        default: 'https://www.linkedin.com/company/ethixweb',
      },
      twitter: {
        type: String,
        default: 'https://twitter.com/ethixweb',
      },
      instagram: {
        type: String,
        default: 'https://instagram.com/ethixweb',
      },
      trustpilot: {
        type: String,
        default: 'https://www.trustpilot.com/review/ethixweb.com',
      },
    },
    logoUrl: {
      type: String,
      default: '/assets/ethixweb-logo.webp',
    },
    logoCloudinaryPublicId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'sitesettings',
  }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models && mongoose.models.SiteSettings
    ? (mongoose.models.SiteSettings as Model<ISiteSettings>)
    : mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
