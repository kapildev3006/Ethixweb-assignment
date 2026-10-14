import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/lib/models/Admin';
import { signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { adminLoginSchema } from '@/lib/validators/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate payload structure
    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0]?.message || 'Invalid login details.',
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Connect to MongoDB Atlas
    await connectDB();

    // 3. Find administrator record exclusively in the MongoDB database
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });
    if (!existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid administrator email address or password.',
        },
        { status: 401 }
      );
    }

    // 4. Verify password with bcrypt against database passwordHash
    const isPasswordValid = await existingAdmin.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid administrator email address or password.',
        },
        { status: 401 }
      );
    }

    // 5. Update last login timestamp
    existingAdmin.lastLogin = new Date();
    await existingAdmin.save();

    const adminUser = {
      email: existingAdmin.email,
      name: existingAdmin.name,
      role: existingAdmin.role,
      avatarText: existingAdmin.avatarText || 'AL',
    };

    // 6. Generate signed JWT token
    const token = signAdminToken(adminUser);

    // 7. Return response with secure httpOnly session cookie (token is delivered strictly via HttpOnly cookie)
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: adminUser,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Database authentication error in /api/admin/auth/login:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication failed due to a database service error. Please try again.',
      },
      { status: 500 }
    );
  }
}
