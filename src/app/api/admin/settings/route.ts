import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import SiteSettings from '@/lib/models/SiteSettings';
import { z } from 'zod';

const SiteSettingsSchema = z.object({
  websiteTitle: z.string().min(2, 'Website title is required'),
  seoDescription: z.string().min(5, 'SEO description is required'),
  keywords: z.array(z.string()).default([]),
  legalEntityName: z.string().default('Ethixweb USA LLC'),
  copyrightText: z.string().default('© 2026 Ethixweb. All rights reserved.'),
  supportEmail: z.string().email('Valid support email required'),
  salesPhone: z.string().min(3, 'Phone is required'),
  officeAddress: z.string().min(5, 'Address is required'),
  operatingHours: z.string().min(3, 'Hours are required'),
  calendlyUrl: z.string().min(1).default('#contact-form'),
  primaryBrandColor: z.string().default('#C0272D'),
  socialLinks: z.object({
    linkedin: z.string().url().or(z.literal('')),
    twitter: z.string().url().or(z.literal('')),
    instagram: z.string().url().or(z.literal('')),
    trustpilot: z.string().url().or(z.literal('')),
  }),
  logoUrl: z.string().optional().default('/assets/ethixweb-logo.webp'),
  logoCloudinaryPublicId: z.string().optional().default(''),
});

export async function GET(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'global' }).lean();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    console.error('Error fetching settings for admin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = SiteSettingsSchema.parse(body);

    await connectDB();
    const updated = await SiteSettings.findOneAndUpdate(
      { key: 'global' },
      { $set: validated },
      { new: true, upsert: true }
    );

    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Site settings updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
