import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const admin = getAuthenticatedAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      {
        authenticated: false,
        user: null,
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: admin.email,
      name: admin.name,
      role: admin.role,
      avatarText: admin.avatarText || 'AL',
    },
  });
}
