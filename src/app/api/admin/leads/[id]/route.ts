import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Lead from '@/lib/models/Lead';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { updateLeadStatusSchema, addLeadNoteSchema } from '@/lib/validators/lead';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin credentials required.' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    await connectDB();

    if (mongoose.Types.ObjectId.isValid(id)) {
      const lead = await Lead.findById(id);
      if (lead) {
        if (!lead.isSeen) {
          lead.isSeen = true;
          await lead.save();
        }
        return NextResponse.json({
          success: true,
          lead: {
            id: lead._id.toString(),
            fullName: lead.fullName || lead.name,
            email: lead.email,
            phone: lead.phone,
            companyName: lead.companyName || '',
            service: lead.service,
            budget: lead.budget || '',
            timeline: lead.timeline || '',
            message: lead.message,
            status: lead.status,
            isSeen: true,
            createdAt: lead.createdAt.toISOString(),
            notes: (lead.notes || []).map((n: any) => ({
              id: n._id ? n._id.toString() : `note-${Date.now()}`,
              text: n.text,
              author: n.author,
              createdAt: n.createdAt.toISOString(),
            })),
          },
        });
      }
    }

    return NextResponse.json({ success: false, error: 'Lead not found in database.' }, { status: 404 });
  } catch (err: any) {
    console.error('MongoDB lookup error in /api/admin/leads/[id]:', err.message);
    return NextResponse.json({ success: false, error: 'Database lookup error.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin credentials required.' },
      { status: 401 }
    );
  }

  const { id } = params;
  const body = await request.json();

  try {
    await connectDB();

    if (mongoose.Types.ObjectId.isValid(id)) {
      const lead = await Lead.findById(id);
      if (!lead) {
        return NextResponse.json({ success: false, error: 'Lead not found in database.' }, { status: 404 });
      }

      // Status update
      if (body.status) {
        const valStatus = updateLeadStatusSchema.safeParse({ status: body.status });
        if (!valStatus.success) {
          return NextResponse.json(
            { success: false, error: valStatus.error.issues[0]?.message },
            { status: 400 }
          );
        }
        lead.status = valStatus.data.status;
        lead.notes.push({
          text: `Lifecycle status updated to "${valStatus.data.status}".`,
          author: admin.name || 'Admin',
          createdAt: new Date(),
        });
      }

      // Add note
      if (body.note) {
        const valNote = addLeadNoteSchema.safeParse({ text: body.note });
        if (!valNote.success) {
          return NextResponse.json(
            { success: false, error: valNote.error.issues[0]?.message },
            { status: 400 }
          );
        }
        lead.notes.push({
          text: valNote.data.text,
          author: admin.name || 'Admin',
          createdAt: new Date(),
        });
      }

      // Mark seen
      if (body.isSeen !== undefined) {
        lead.isSeen = Boolean(body.isSeen);
      }

      await lead.save();

      return NextResponse.json({
        success: true,
        message: 'Lead updated successfully in database.',
        lead: {
          id: lead._id.toString(),
          fullName: lead.fullName || lead.name,
          email: lead.email,
          status: lead.status,
          notes: lead.notes,
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid lead ID format.' }, { status: 400 });
  } catch (err: any) {
    console.error('MongoDB update error in /api/admin/leads/[id]:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin credentials required.' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    await connectDB();

    if (mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Lead.findByIdAndDelete(id);
      if (deleted) {
        return NextResponse.json({
          success: true,
          message: `Lead ${id} deleted successfully from database.`,
        });
      }
    }

    return NextResponse.json({ success: false, error: 'Lead not found in database.' }, { status: 404 });
  } catch (err: any) {
    console.error('MongoDB delete error in /api/admin/leads/[id]:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
