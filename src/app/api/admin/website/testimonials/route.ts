import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Testimonial from '@/lib/models/Testimonial';
import { z } from 'zod';

const TestimonialSchema = z.object({
  slug: z.string().min(2, 'Slug is required'),
  name: z.string().min(2, 'Name is required'),
  role: z.string().default('Verified Client'),
  date: z.string().min(2, 'Date is required'),
  impact: z.string().optional().default(''),
  quote: z.string().min(5, 'Quote is required'),
  sourceUrl: z.string().url().default('https://www.trustpilot.com/review/ethixweb.com'),
  rating: z.number().min(1).max(5).default(5),
  isVisible: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  imageUrl: z.string().optional().default(''),
  cloudinaryPublicId: z.string().optional().default(''),
  altText: z.string().optional().default(''),
});

export async function GET(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const items = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    console.error('Error fetching testimonials for admin:', error);
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
    const validated = TestimonialSchema.parse(body);

    await connectDB();
    const existing = await Testimonial.findOne({ slug: validated.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Testimonial with slug "${validated.slug}" already exists.` },
        { status: 409 }
      );
    }

    const created = await Testimonial.create(validated);
    revalidatePath('/');

    return NextResponse.json(
      { success: true, message: 'Testimonial created successfully', data: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
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
    const validated = TestimonialSchema.parse(rest);

    await connectDB();
    const query = _id ? { _id } : { slug: validated.slug };
    const updated = await Testimonial.findOneAndUpdate(query, { $set: validated }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Testimonial not found to update.' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Testimonial updated successfully', data: updated });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
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
    return NextResponse.json({ success: false, error: 'Testimonial ID or slug required' }, { status: 400 });
  }

  try {
    await connectDB();
    const query = id ? { _id: id } : { slug };
    const deleted = await Testimonial.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
