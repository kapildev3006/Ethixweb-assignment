import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'ethix_admin_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    // If no JWT session token cookie exists, block access and redirect immediately to login
    if (!token || token.trim().length === 0) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect all /api/admin routes except public auth endpoints
  if (pathname.startsWith('/api/admin')) {
    if (
      pathname === '/api/admin/auth/login' ||
      pathname === '/api/admin/auth/logout'
    ) {
      return NextResponse.next();
    }

    const token =
      request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    if (!token || token.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Administrator login is strictly required to access admin APIs.',
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
