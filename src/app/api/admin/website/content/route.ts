import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import PageContent from '@/lib/models/PageContent';
import { z } from 'zod';

const UpdatePageContentSchema = z.object({
  pageSlug: z.enum(['home', 'about', 'contact']),
  title: z.string().min(1, 'Title is required'),
  sections: z.record(z.any()),
  action: z.enum(['draft', 'publish']).default('publish'),
  isPublished: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get('page');

  if (!pageSlug || !['home', 'about', 'contact'].includes(pageSlug)) {
    return NextResponse.json(
      { success: false, error: 'Invalid page parameter. Must be home, about, or contact.' },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const doc = await PageContent.findOne({ pageSlug }).lean();
    if (!doc) {
      return NextResponse.json({ success: false, error: 'Page content not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: doc,
    });
  } catch (error: any) {
    console.error(`Error fetching page content for ${pageSlug}:`, error);
    return NextResponse.json(
      { success: false, error: error.message || 'Database error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = UpdatePageContentSchema.parse(body);

    await connectDB();

    if (validated.action === 'draft') {
      // 1. SAVE DRAFT: Persist draft to MongoDB Atlas without modifying live published content
      const updated = await PageContent.findOneAndUpdate(
        { pageSlug: validated.pageSlug },
        {
          $set: {
            title: validated.title,
            draftSections: validated.sections,
            hasDraft: true,
            draftUpdatedAt: new Date(),
            updatedBy: admin.email,
          },
        },
        { new: true, upsert: true }
      );

      return NextResponse.json({
        success: true,
        message: `Draft for ${validated.pageSlug.toUpperCase()} page successfully saved in MongoDB Atlas. Public website remains on previous published version.`,
        status: 'draft',
        data: updated,
      });
    }

    // 2. PUBLISH: Update live sections in MongoDB Atlas and revalidate public Next.js caches
    const updated = await PageContent.findOneAndUpdate(
      { pageSlug: validated.pageSlug },
      {
        $set: {
          title: validated.title,
          sections: validated.sections,
          draftSections: validated.sections,
          hasDraft: false,
          isPublished: validated.isPublished !== undefined ? validated.isPublished : true,
          lastPublishedAt: new Date(),
          updatedBy: admin.email,
        },
      },
      { new: true, upsert: true }
    );

    // Revalidate public page caches
    if (validated.pageSlug === 'home') {
      revalidatePath('/');
    } else if (validated.pageSlug === 'contact') {
      revalidatePath('/contact');
      // If whatsappNumber was updated, sync to global SiteSettings and revalidate pages with WhatsApp CTAs
      if (validated.sections.whatsappNumber) {
        try {
          const SiteSettings = (await import('@/lib/models/SiteSettings')).default;
          await SiteSettings.findOneAndUpdate(
            { key: 'global' },
            { $set: { whatsappNumber: validated.sections.whatsappNumber } },
            { upsert: true }
          );
          revalidatePath('/');
          revalidatePath('/services');
          revalidatePath('/about');
        } catch (e) {
          console.warn('Could not sync whatsappNumber to SiteSettings:', e);
        }
      }
    } else {
      revalidatePath(`/${validated.pageSlug}`);
    }

    return NextResponse.json({
      success: true,
      message: `${validated.pageSlug.toUpperCase()} page content successfully published to MongoDB Atlas and live public website.`,
      status: 'published',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating page content:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}
