import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Service from '@/lib/models/Service';
import { z } from 'zod';

const ServiceSchema = z.object({
  slug: z.string().min(2, 'Slug is required'),
  number: z.string().min(1, 'Number is required'),
  category: z.enum(['website', 'ai', 'growth', 'data', 'accessibility', 'support']),
  categoryLabel: z.string().min(1, 'Category label is required'),
  title: z.string().min(2, 'Title is required'),
  tagline: z.string().optional().default(''),
  description: z.string().min(5, 'Description is required'),
  capabilities: z.array(z.string()).default([]),
  indianUseCase: z.string().optional().default(''),
  iconName: z.string().optional().default('Zap'),
  displayOrder: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
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
    const services = await Service.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    console.error('Error fetching services for admin:', error);
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
    const validated = ServiceSchema.parse(body);

    await connectDB();
    const existing = await Service.findOne({ slug: validated.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Service with slug "${validated.slug}" already exists.` },
        { status: 409 }
      );
    }

    const created = await Service.create(validated);

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json(
      { success: true, message: 'Service created successfully', data: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service:', error);
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
    const validated = ServiceSchema.parse(rest);

    await connectDB();
    const query = _id ? { _id } : { slug: validated.slug };
    const updated = await Service.findOneAndUpdate(query, { $set: validated }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Service not found to update.' }, { status: 404 });
    }

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Service updated successfully', data: updated });
  } catch (error: any) {
    console.error('Error updating service:', error);
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
    return NextResponse.json({ success: false, error: 'Service ID or slug required' }, { status: 400 });
  }

  try {
    await connectDB();
    const query = id ? { _id: id } : { slug };
    const deleted = await Service.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
