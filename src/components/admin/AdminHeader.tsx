'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  ExternalLink,
  Bell,
  Sparkles,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Inbox,
  CheckCheck,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import EthixwebLogo from '@/components/ui/EthixwebLogo';
import { clearAdminSession, type AdminUser } from '@/lib/adminSession';
import LeadDetailsDialog from './LeadDetailsDialog';

interface AdminHeaderProps {
  user?: AdminUser | null;
  onOpenMobileMenu?: () => void;
  title?: string;
  totalLeadsCount?: number;
}

function formatNotificationTime(dateStr: string) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 172800) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function AdminHeader({
  user,
  onOpenMobileMenu,
  title,
  totalLeadsCount,
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenCount, setUnseenCount] = useState<number>(0);

  // Notification popover state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [selectedNotificationLead, setSelectedNotificationLead] = useState<any | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Poll database for real-time unseen count
  useEffect(() => {
    let isMounted = true;
    async function loadKpi() {
      try {
        const res = await fetch('/api/admin/leads?limit=1', {
          credentials: 'include',
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          const count = Number(data.kpis?.unseenCount ?? data.kpis?.newCount ?? 0);
          if (isMounted) setUnseenCount(count > 0 ? count : 0);
        }
      } catch (e) {}
    }
    loadKpi();
    const interval = setInterval(loadKpi, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pathname]);

  // Click outside to close notification popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const res = await fetch('/api/admin/leads?page=1&limit=8', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setNotifications(data.leads);
          if (data.kpis?.unseenCount !== undefined) {
            setUnseenCount(Number(data.kpis.unseenCount) || 0);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to fetch notifications:', e);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const handleToggleNotifications = () => {
    const nextState = !isNotificationsOpen;
    setIsNotificationsOpen(nextState);
    if (nextState) {
      fetchNotifications();
    }
  };

  const handleOpenNotificationLead = async (enquiry: any) => {
    setIsNotificationsOpen(false);
    setSelectedNotificationLead(enquiry);

    // Mark as seen in database if not already seen
    if (!enquiry.isSeen && enquiry.id) {
      try {
        await fetch(`/api/admin/leads/${enquiry.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isSeen: true }),
        });
        setUnseenCount((prev) => Math.max(0, prev - 1));
        setNotifications((prev) =>
          prev.map((item) => (item.id === enquiry.id ? { ...item, isSeen: true } : item))
        );
      } catch (err) {
        // Silently catch
      }
    }
  };

  const handleMarkAllSeen = async () => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllSeen: true }),
      });
      setUnseenCount(0);
      setNotifications((prev) => prev.map((item) => ({ ...item, isSeen: true })));
    } catch (err) {
      console.warn('Failed to mark all notifications as seen:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Sign out request failed:', e);
    }
    clearAdminSession();
    router.replace('/admin/login');
  };

  // Derive human-readable route crumbs
  const getCrumbs = () => {
    if (!pathname) return [{ label: 'Workspace', href: '/admin' }];

    const segments = pathname.split('/').filter(Boolean);
    const crumbs = [{ label: 'Admin', href: '/admin' }];

    if (segments.length === 1 && segments[0] === 'admin') {
      crumbs.push({ label: 'Overview', href: '/admin' });
    } else if (segments[1] === 'leads') {
      crumbs.push({ label: 'Workspace', href: '/admin' });
      crumbs.push({ label: 'Leads & Enquiries', href: '/admin/leads' });
    } else if (segments[1] === 'website') {
      crumbs.push({ label: 'Website Manager', href: '/admin/website/home' });
      const section = segments[2];
      const sectionNames: Record<string, string> = {
        home: 'Home Page',
        services: 'Services',
        about: 'About Page',
        work: 'Featured Work',
        testimonials: 'Testimonials',
        contact: 'Contact Page',
      };
      if (section && sectionNames[section]) {
        crumbs.push({ label: sectionNames[section], href: pathname });
      }
    } else if (segments[1] === 'settings') {
      crumbs.push({ label: 'Site Settings', href: '/admin/settings' });
    }

    return crumbs;
  };

  const crumbs = getCrumbs();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-2xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Mobile hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Hamburger button for mobile */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Logo */}
            <div className="lg:hidden flex items-center">
              <Link href="/admin" aria-label="Ethixweb Admin">
                <EthixwebLogo variant="light" className="h-6 w-auto" />
              </Link>
            </div>

            {/* Desktop Breadcrumbs */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                  {idx === crumbs.length - 1 ? (
                    <span className="font-bold text-gray-900 tracking-tight">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Admin Workspace Live Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Workspace</span>
            </span>

            {/* View Public Website */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Open public website in new tab"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Active Notification Bell & Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={handleToggleNotifications}
                className={`p-2 rounded-xl transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer ${
                  isNotificationsOpen
                    ? 'bg-red-50 text-brand-red ring-2 ring-brand-red/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Contact enquiry notifications"
                aria-expanded={isNotificationsOpen}
                aria-haspopup="dialog"
                title={unseenCount > 0 ? `${unseenCount} unread contact enquiries` : 'Contact enquiries notifications'}
              >
                <Bell className="w-4.5 h-4.5" />
                {unseenCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-red text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white shadow-xs animate-pulse">
                    {unseenCount > 9 ? '9+' : unseenCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/95 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Popover Header */}
                  <div className="px-4 py-3 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-display text-gray-900">
                        Customer Enquiries
                      </span>
                      {unseenCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-red text-white">
                          {unseenCount} new
                        </span>
                      )}
                    </div>

                    {unseenCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllSeen}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-brand-red transition-colors cursor-pointer"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  {/* Popover List */}
                  <div className="max-h-84 overflow-y-auto divide-y divide-gray-100 no-scrollbar">
                    {isLoadingNotifications ? (
                      <div className="py-10 text-center text-gray-400 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-red" />
                        <span className="text-xs">Loading latest enquiries...</span>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="py-10 text-center text-gray-400 flex flex-col items-center justify-center gap-2 px-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                          <Inbox className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">No enquiries received yet</span>
                        <p className="text-[11px] text-gray-400 max-w-xs">
                          Live submissions from website visitors will appear here in real time.
                        </p>
                      </div>
                    ) : (
                      notifications.map((enquiry) => {
                        const isUnseen = !enquiry.isSeen || enquiry.status === 'New';
                        return (
                          <button
                            key={enquiry.id}
                            type="button"
                            onClick={() => handleOpenNotificationLead(enquiry)}
                            className={`w-full text-left p-3.5 hover:bg-gray-50/90 transition-colors flex items-start gap-3 cursor-pointer group ${
                              isUnseen ? 'bg-red-50/30' : ''
                            }`}
                          >
                            {/* Unseen indicator dot */}
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 transition-colors ${
                                isUnseen
                                  ? 'bg-brand-red shadow-xs animate-pulse ring-2 ring-red-100'
                                  : 'bg-transparent'
                              }`}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-gray-900 group-hover:text-brand-red transition-colors truncate">
                                  {enquiry.fullName}
                                </span>
                                <span className="text-[10px] text-gray-400 flex-shrink-0 font-medium">
                                  {formatNotificationTime(enquiry.createdAt)}
                                </span>
                              </div>

                              <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                                {enquiry.companyName ? `${enquiry.companyName} · ` : ''}
                                <span className="text-gray-500 font-normal">{enquiry.service}</span>
                              </p>

                              {enquiry.message && (
                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 italic">
                                  &ldquo;{enquiry.message}&rdquo;
                                </p>
                              )}

                              <div className="mt-1.5 flex items-center justify-between">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                                  {enquiry.status}
                                </span>
                                <span className="text-[11px] font-semibold text-brand-red opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                  <span>View Details</span>
                                  <ChevronRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Popover Footer */}
                  <div className="p-3 bg-gray-50/90 border-t border-gray-100 text-center">
                    <Link
                      href="/admin/leads"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs font-bold text-brand-red hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Go to Full Lead Management Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Active User Avatar Chip */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200">
              <div
                className="w-8 h-8 rounded-full bg-brand-red text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs"
                title={user?.email || 'Admin'}
              >
                {user?.avatarText || 'AL'}
              </div>
              <div className="hidden xl:block text-left min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate leading-tight">
                  {user?.name || 'Admin Lead'}
                </p>
                <p className="text-[10px] text-gray-500 truncate leading-tight">
                  {user?.role || 'Lead Reviewer'}
                </p>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-brand-red hover:border-red-200 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Lead Full Info Dialog Modal */}
      <LeadDetailsDialog
        lead={selectedNotificationLead}
        onClose={() => setSelectedNotificationLead(null)}
      />
    </header>
  );
}
