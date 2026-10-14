import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'ethix_admin_token';

/**
 * Resolve the administrative JWT signing secret.
 * Consistent environment variable: AUTH_SECRET (with fallback to JWT_SECRET for runtime compatibility).
 * Fails securely without any hardcoded secret fallback.
 */
function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      'CRITICAL AUTHENTICATION SECURITY ERROR: AUTH_SECRET environment variable is not defined.'
    );
  }
  return secret.trim();
}

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
  const secret = getAuthSecret();
  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  });
}

/**
 * Verify an admin JWT token
 */
export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
    if (!secret || secret.trim().length === 0) {
      console.error(
        'CRITICAL AUTHENTICATION SECURITY ERROR: AUTH_SECRET environment variable is missing. Token rejected.'
      );
      return null;
    }
    const decoded = jwt.verify(token, secret.trim()) as AdminJwtPayload;
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
