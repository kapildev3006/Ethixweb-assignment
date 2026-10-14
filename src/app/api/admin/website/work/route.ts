import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import CaseStudy from '@/lib/models/CaseStudy';
import { z } from 'zod';

const CaseStudySchema = z.object({
  slug: z.string().min(2, 'Slug is required'),
  client: z.string().min(2, 'Client name is required'),
  badge: z.string().default('Verified Client Project'),
  category: z.string().min(2, 'Category is required'),
  headline: z.string().min(3, 'Headline is required'),
  description: z.string().min(5, 'Description is required'),
  websiteUrl: z.string().optional().default(''),
  metrics: z.array(z.string()).default([]),
  imageUrl: z.string().min(1, 'Image URL is required'),
  cloudinaryPublicId: z.string().optional().default(''),
  altText: z.string().optional().default(''),
  displayOrder: z.number().int().default(0),
  isVerified: z.boolean().default(true),
  isBlueprint: z.boolean().default(false),
  isVisible: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const items = await CaseStudy.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    console.error('Error fetching work for admin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = CaseStudySchema.parse(body);

    await connectDB();
    const existing = await CaseStudy.findOne({ slug: validated.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Project with slug "${validated.slug}" already exists.` },
        { status: 409 }
      );
    }

    const created = await CaseStudy.create(validated);
    revalidatePath('/');

    return NextResponse.json(
      { success: true, message: 'Project created successfully', data: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 400 });
    }
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
    const { _id, ...rest } = body;
    const validated = CaseStudySchema.parse(rest);

    await connectDB();
    const query = _id ? { _id } : { slug: validated.slug };
    const updated = await CaseStudy.findOneAndUpdate(query, { $set: validated }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found to update.' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error: any) {
    console.error('Error updating project:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  if (!id && !slug) {
    return NextResponse.json({ success: false, error: 'Project ID or slug required' }, { status: 400 });
  }

  try {
    await connectDB();
    const query = id ? { _id: id } : { slug };
    const deleted = await CaseStudy.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
