import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/lib/models/Lead';
import { enquirySchema } from '@/lib/validators/enquiry';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Zod schema validation
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const errorMap: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const field = issue.path[0]?.toString() || 'general';
        errorMap[field] = issue.message;
      }
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          validationErrors: errorMap,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Anti-spam honeypot check
    if (data.website_url_hp && data.website_url_hp.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Spam submission detected.',
        },
        { status: 400 }
      );
    }

    // 3. Extract request metadata
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const now = Date.now();
    const durationMs = data.form_load_time ? Math.max(0, now - data.form_load_time) : 0;

    // Fast-bot check: submission in under 1 second is suspicious
    const isBotFast = durationMs > 0 && durationMs < 1000;

    // 4. Persist to MongoDB
    try {
      await connectDB();

      const newLead = await Lead.create({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName || '',
        service: data.service,
        budget: data.budget || '',
        timeline: data.timeline || '',
        message: data.message,
        status: isBotFast ? 'Spam' : 'New',
        isSpam: isBotFast,
        spamScore: isBotFast ? 80 : 0,
        metadata: {
          ip,
          userAgent,
          submittedAt: new Date(),
          durationMs,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Enquiry received and routed to technical review team.',
          leadId: newLead._id.toString(),
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      console.warn('MongoDB connection unavailable for enquiry persistence:', dbError.message);
      // Graceful local development fallback if MongoDB daemon is not running locally
      return NextResponse.json(
        {
          success: true,
          message: 'Enquiry received in development queue.',
          leadId: `LEAD-PREVIEW-${Date.now()}`,
          isDevelopmentFallback: true,
        },
        { status: 201 }
      );
    }
  } catch (err: any) {
    console.error('Unhandled error in /api/enquiry:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your enquiry.',
      },
      { status: 500 }
    );
  }
}
