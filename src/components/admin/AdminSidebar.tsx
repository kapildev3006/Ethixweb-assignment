'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Home,
  Layers,
  FileText,
  Briefcase,
  MessageSquareQuote,
  PhoneCall,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Sparkles,
  LogOut,
} from 'lucide-react';
import EthixwebLogo from '@/components/ui/EthixwebLogo';
import { clearAdminSession, type AdminUser } from '@/lib/adminSession';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: 'red' | 'gray';
  isExternal?: boolean;
}

export interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    groupName: 'WORKSPACE',
    items: [
      {
        name: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
      },
      {
        name: 'Leads',
        href: '/admin/leads',
        icon: Inbox,
      },
    ],
  },
  {
    groupName: 'WEBSITE MANAGER',
    items: [
      {
        name: 'Home Page',
        href: '/admin/website/home',
        icon: Home,
      },
      {
        name: 'Services',
        href: '/admin/website/services',
        icon: Layers,
      },
      {
        name: 'About Page',
        href: '/admin/website/about',
        icon: FileText,
      },
      {
        name: 'Featured Work',
        href: '/admin/website/work',
        icon: Briefcase,
      },
      {
        name: 'Testimonials',
        href: '/admin/website/testimonials',
        icon: MessageSquareQuote,
      },
      {
        name: 'Contact Page',
        href: '/admin/website/contact',
        icon: PhoneCall,
      },
    ],
  },
  {
    groupName: 'SETTINGS',
    items: [
      {
        name: 'Site Settings',
        href: '/admin/settings',
        icon: Settings,
      },
      {
        name: 'View Website',
        href: '/',
        icon: ExternalLink,
        isExternal: true,
      },
    ],
  },
];

interface AdminSidebarProps {
  user: AdminUser | null;
  isDesktopCollapsed: boolean;
  onToggleDesktopCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({
  user,
  isDesktopCollapsed,
  onToggleDesktopCollapse,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [unseenLeadsCount, setUnseenLeadsCount] = useState<number>(0);

  // Poll database for real unseen/new leads count
  useEffect(() => {
    let isMounted = true;
    async function loadUnseenLeads() {
      try {
        const res = await fetch('/api/admin/leads?limit=1', {
          credentials: 'include',
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          const count = Number(data.kpis?.unseenCount ?? data.kpis?.newCount ?? 0);
          if (isMounted) {
            setUnseenLeadsCount(count > 0 ? count : 0);
          }
        }
      } catch (err) {
        console.error('Failed to load unseen leads count in sidebar:', err);
      }
    }

    loadUnseenLeads();
    const interval = setInterval(loadUnseenLeads, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Sign out request failed:', e);
    }
    clearAdminSession();
    window.location.href = '/admin/login';
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return false;
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const renderNavContent = (isCollapsedMode = false) => (
    <div className="flex flex-col h-full bg-gray-950 text-gray-200 select-none">
      {/* Top Header / Branding */}
      <div
        className={`h-16 flex items-center border-b border-gray-800/90 px-3 sm:px-4 transition-all duration-300 ${
          isCollapsedMode ? 'justify-between px-2.5' : 'justify-between'
        }`}
      >
        <Link
          href="/admin"
          className="flex items-center gap-2.5 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg py-1 px-1"
          aria-label="Ethixweb Admin Workspace"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-white font-black text-sm tracking-tighter flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            E
          </div>
          {!isCollapsedMode && (
            <div className="flex flex-col min-w-0">
              <span className="font-display font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                <span>Ethixweb</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-gray-800 text-gray-300 border border-gray-700">
                  CMS
                </span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium truncate">
                Admin Workspace Suite
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Expand Button at top of sidebar */}
        <button
          type="button"
          onClick={onToggleDesktopCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red items-center justify-center group flex-shrink-0"
          aria-label={isCollapsedMode ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsedMode ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsedMode ? (
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          )}
        </button>

        {/* Mobile close button only */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-brand-red"
          aria-label="Close admin navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups List */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar admin-sidebar-scroll"
        aria-label="Admin Navigation"
      >
        {navGroups.map((group) => (
          <div key={group.groupName} className="space-y-1">
            {!isCollapsedMode ? (
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                <span>{group.groupName}</span>
              </div>
            ) : (
              <div className="w-full flex justify-center py-1">
                <span className="w-4 h-0.5 rounded-full bg-gray-800" />
              </div>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item.href);

                const linkElement = (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      if (onCloseMobile) onCloseMobile();
                    }}
                    title={isCollapsedMode ? item.name : undefined}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                      active
                        ? 'bg-brand-red text-white shadow-xs'
                        : 'text-gray-300 hover:text-white hover:bg-gray-900/90'
                    } ${isCollapsedMode ? 'justify-center px-2' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon
                      className={`flex-shrink-0 transition-colors ${
                        active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      } ${isCollapsedMode ? 'w-5 h-5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'}`}
                    />

                    {isCollapsedMode && item.href === '/admin/leads' && unseenLeadsCount > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-red ring-2 ring-gray-950 animate-pulse" />
                    )}

                    {!isCollapsedMode && (
                      <span className="flex-1 truncate tracking-tight">{item.name}</span>
                    )}

                    {/* Only show badge for Leads when there are unseen/new leads (> 0); never show for Services, and never show 0 */}
                    {!isCollapsedMode && item.href === '/admin/leads' && unseenLeadsCount > 0 && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full leading-none flex-shrink-0 transition-colors ${
                          active
                            ? 'bg-black/30 text-white'
                            : 'bg-brand-red text-white shadow-xs animate-pulse'
                        }`}
                      >
                        {unseenLeadsCount}
                      </span>
                    )}

                    {!isCollapsedMode && item.isExternal && (
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 ml-auto flex-shrink-0" />
                    )}
                  </Link>
                );

                return linkElement;
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Mode Indicator & User Profile */}
      <div className="p-3 border-t border-gray-800/80 bg-gray-950/90 space-y-2">
        {/* Real Live CMS Indicator */}
        {!isCollapsedMode && (
          <div className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-gray-200">Website Management</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
              Atlas Live
            </span>
          </div>
        )}

        {/* User profile row */}
        <div
          className={`flex items-center gap-2.5 p-2 rounded-xl bg-gray-900/60 border border-gray-800/60 ${
            isCollapsedMode ? 'justify-center p-1.5' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-full bg-brand-red text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs"
              title={user?.email || 'Administrator'}
            >
              {user?.avatarText || 'AL'}
            </div>
            {!isCollapsedMode && (
              <div className="text-left min-w-0">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {user?.name || 'Admin Lead'}
                </p>
                <p className="text-[10px] text-gray-400 truncate leading-tight">
                  {user?.role || 'Lead Reviewer'}
                </p>
              </div>
            )}
          </div>

          {!isCollapsedMode && (
            <button
              type="button"
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-red hover:bg-red-950/40 transition-colors focus-visible:ring-2 focus-visible:ring-brand-red"
              title="Sign Out"
              aria-label="Sign out of Admin Suite"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sidebar (Sticky/Fixed, Collapsible) */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-30 border-r border-gray-800 transition-all duration-300 ease-in-out ${
          isDesktopCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {renderNavContent(isDesktopCollapsed)}
      </aside>

      {/* 2. Mobile Drawer Backdrop & Sliding Panel */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Admin Navigation Drawer"
        >
          {renderNavContent(false)}
        </div>
      </div>
    </>
  );
}
