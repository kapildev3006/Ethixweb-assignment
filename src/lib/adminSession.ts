'use client';

const SESSION_KEY = 'ethixweb_admin_preview_session';
const COOKIE_NAME = 'ethixweb_admin_auth';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatarText: string;
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch (e) {
    return null;
  }
}

export function setAdminSession(email: string): AdminUser {
  const user: AdminUser = {
    email: email.trim().toLowerCase(),
    name: 'Admin Lead',
    role: 'Lead Engineering Reviewer',
    avatarText: 'AL',
  };

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      // Set a browser session cookie for HTTP consistency
      document.cookie = `${COOKIE_NAME}=true; path=/; max-age=86400; SameSite=Lax`;
    } catch (e) {}
  }

  return user;
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    } catch (e) {}
  }
}
