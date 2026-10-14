import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET =
  process.env.JWT_SECRET || 'super-secure-ethixweb-jwt-token-secret-change-in-production-2026';

export const ADMIN_COOKIE_NAME = 'ethix_admin_token';

export interface AdminJwtPayload {
  email: string;
  name: string;
  role: string;
  avatarText?: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign an admin JWT token
 */
export function signAdminToken(payload: {
  email: string;
  name: string;
  role: string;
  avatarText?: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

/**
 * Verify an admin JWT token
 */
export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}

/**
 * Extract and authenticate admin from an incoming Request or Next.js headers
 */
export function getAuthenticatedAdminFromRequest(request: Request): AdminJwtPayload | null {
  // 1. Check Authorization Bearer header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const verified = verifyAdminToken(token);
    if (verified) return verified;
  }

  // 2. Check Cookie header
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookiesList = cookieHeader.split(';').map((c) => c.trim());
    for (const c of cookiesList) {
      if (c.startsWith(`${ADMIN_COOKIE_NAME}=`)) {
        const token = c.substring(ADMIN_COOKIE_NAME.length + 1).trim();
        const verified = verifyAdminToken(token);
        if (verified) return verified;
      }
    }
  }

  return null;
}

/**
 * Get active session via Next.js server cookie store (for server components/routes)
 */
export async function getServerSessionAdmin(): Promise<AdminJwtPayload | null> {
  try {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!tokenCookie || !tokenCookie.value) return null;
    return verifyAdminToken(tokenCookie.value);
  } catch (err) {
    return null;
  }
}
