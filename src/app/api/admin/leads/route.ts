import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/lib/models/Lead';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // 1. Authenticate admin user
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized. An active administrator session is required.',
      },
      { status: 401 }
    );
  }

  // 2. Extract query filters
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status') || 'all';
  const service = searchParams.get('service') || 'All Capabilities';
  const search = searchParams.get('search')?.trim().toLowerCase() || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10', 10)));

  try {
    await connectDB();

    // Build Mongo Query
    const query: Record<string, any> = {};

    if (status !== 'all') {
      query.status = status;
    }

    if (service !== 'All Capabilities') {
      query.service = service;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort definition
    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    if (sort === 'name') sortObj = { fullName: 1 };

    const totalFiltered = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Aggregate real database KPIs
    const [totalCount, newCount, unseenCount, discoveryCount, convertedCount, contactedCount] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ status: 'New', isSeen: { $ne: true } }),
      Lead.countDocuments({ status: 'Discovery' }),
      Lead.countDocuments({ status: 'Converted' }),
      Lead.countDocuments({ status: 'Contacted' }),
    ]);

    return NextResponse.json({
      success: true,
      source: 'mongodb',
      leads: leads.map((l: any) => ({
        id: l._id.toString(),
        fullName: l.fullName || l.name,
        email: l.email,
        phone: l.phone,
        companyName: l.companyName || '',
        service: l.service,
        budget: l.budget || '',
        timeline: l.timeline || '',
        message: l.message,
        status: l.status,
        isSeen: l.isSeen !== undefined ? l.isSeen : l.status !== 'New',
        createdAt: l.createdAt.toISOString(),
        notes: (l.notes || []).map((n: any) => ({
          id: n._id ? n._id.toString() : `note-${Date.now()}`,
          text: n.text,
          author: n.author,
          createdAt: n.createdAt ? n.createdAt.toISOString() : new Date().toISOString(),
        })),
      })),
      total: totalFiltered,
      page,
      totalPages: Math.max(1, Math.ceil(totalFiltered / limit)),
      kpis: {
        total: totalCount,
        newCount,
        unseenCount,
        discoveryCount,
        convertedCount,
        contactedCount,
      },
    });
  } catch (err: any) {
    console.error('MongoDB query error in /api/admin/leads:', err.message);
    return NextResponse.json(
      { success: false, error: 'Database query failed' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin credentials required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    await connectDB();

    if (body.markAllSeen) {
      await Lead.updateMany({ isSeen: { $ne: true } }, { $set: { isSeen: true } });
      return NextResponse.json({ success: true, message: 'All leads marked as seen.' });
    }

    if (Array.isArray(body.leadIds) && body.leadIds.length > 0) {
      await Lead.updateMany({ _id: { $in: body.leadIds } }, { $set: { isSeen: true } });
      return NextResponse.json({ success: true, message: 'Selected leads marked as seen.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

