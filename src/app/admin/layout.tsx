'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getAdminSession, clearAdminSession, type AdminUser } from '@/lib/adminSession';

export default function AdminWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If this is the login page, render clean children without layout chrome
  const isLoginPage = pathname === '/admin/login';

  const [user, setUser] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(!isLoginPage);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load collapse state preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCollapse = localStorage.getItem('ethix_admin_sidebar_collapsed');
      if (savedCollapse === 'true') {
        setIsDesktopCollapsed(true);
      }
    }
  }, []);

  const handleToggleDesktopCollapse = () => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ethix_admin_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  // Auth gate check: Always verify session cryptographically with the backend database
  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    let isMounted = true;

    async function checkServerAuth() {
      try {
        const res = await fetch('/api/admin/auth/session', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Not authenticated');
        }

        const data = await res.json();
        if (data.authenticated && data.user) {
          if (isMounted) {
            setUser(data.user);
            setIsCheckingAuth(false);
          }
          return;
        }

        throw new Error('Invalid session');
      } catch (err) {
        if (isMounted) {
          clearAdminSession();
          const redirectTarget = pathname && pathname !== '/admin' ? `?redirect=${encodeURIComponent(pathname)}` : '';
          router.replace(`/admin/login${redirectTarget}`);
        }
      }
    }

    checkServerAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  // Hide scrollbar on html and body while within Admin workspace
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('admin-no-scrollbar', 'no-scrollbar');
      document.body.classList.add('admin-no-scrollbar', 'no-scrollbar');
      return () => {
        document.documentElement.classList.remove('admin-no-scrollbar', 'no-scrollbar');
        document.body.classList.remove('admin-no-scrollbar', 'no-scrollbar');
      };
    }
  }, []);

  // If on login page, render without admin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying admin authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg animate-pulse">
            <RefreshCw className="w-5 h-5 text-white animate-spin" />
          </div>
          <p className="text-sm font-semibold text-gray-200">Verifying Admin Credentials...</p>
          <p className="text-xs text-gray-500">Ethixweb Protected Administration Workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-workspace-root" className="min-h-screen bg-gray-50/70 text-brand-charcoal antialiased flex flex-col no-scrollbar admin-workspace-scroll">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        user={user}
        isDesktopCollapsed={isDesktopCollapsed}
        onToggleDesktopCollapse={handleToggleDesktopCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out no-scrollbar admin-workspace-scroll ${
          isDesktopCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header Bar */}
        <AdminHeader
          user={user}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 no-scrollbar admin-workspace-scroll">
          {children}
        </main>

        {/* Admin Layout Footer */}
        <footer className="border-t border-gray-200 bg-white py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ethixweb USA LLC · Operational Management Workspace</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Website Management · MongoDB Atlas Operational</span>
              </span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Dual-Shore Governance</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
