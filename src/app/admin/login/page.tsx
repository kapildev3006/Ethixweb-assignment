'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import EthixwebLogo from '@/components/ui/EthixwebLogo';
import { setAdminSession, clearAdminSession } from '@/lib/adminSession';

const REMEMBERED_CREDENTIALS_KEY = 'ethix_remembered_admin_credentials';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in on the server, redirect to workspace; otherwise check remembered credentials
  useEffect(() => {
    async function checkServerSession() {
      try {
        const res = await fetch('/api/admin/auth/session', {
          method: 'GET',
          cache: 'no-store',
        });
        if (res.ok) {
          const json = await res.json();
          if (json.authenticated) {
            let target = '/admin';
            if (typeof window !== 'undefined') {
              const params = new URLSearchParams(window.location.search);
              const redir = params.get('redirect');
              if (redir && redir.startsWith('/admin')) {
                target = redir;
              }
            }
            router.push(target);
            return;
          }
        }
      } catch (e) {
        // Not authenticated
      }
      // If server session is invalid or missing, clear stale session token
      clearAdminSession();

      // Load remembered credentials if active
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem(REMEMBERED_CREDENTIALS_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.email) setEmail(parsed.email);
            if (parsed.password) setPassword(parsed.password);
            setRememberMe(true);
          } else {
            // Keep inputs completely blank when no credentials are saved in localStorage
            setEmail('');
            setPassword('');
            setRememberMe(false);
          }
        } catch (e) {
          console.error('Error loading remembered credentials:', e);
        }
      }
    }
    checkServerSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your administrator email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid administrator email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your administrator password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Authentication failed. Please check credentials.');
      }

      // Handle Remember Me preference
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          localStorage.setItem(
            REMEMBERED_CREDENTIALS_KEY,
            JSON.stringify({
              email: email.trim().toLowerCase(),
              password: password,
            })
          );
        } else {
          localStorage.removeItem(REMEMBERED_CREDENTIALS_KEY);
        }
      }

      // Save client session representation
      setAdminSession(json.user?.email || email);

      let target = '/admin';
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const redir = params.get('redirect');
        if (redir && redir.startsWith('/admin')) {
          target = redir;
        }
      }
      router.push(target);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brand-dark to-black text-gray-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar with back link */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-red" />
          <span>Return to Public Site</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] sm:text-xs font-semibold text-gray-300 border border-white/10 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Assessment Secure Portal</span>
        </div>
      </div>

      {/* Main Centered Login Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block" aria-label="Ethixweb Home">
              <EthixwebLogo variant="dark" className="h-8 w-auto mx-auto" />
            </Link>
            <div className="pt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Admin Sign In
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Access the Lead Management &amp; Inquiries Dashboard
              </p>
            </div>
          </div>



          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start gap-2 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="adminEmail" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800/80 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="adminPassword" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="adminPassword"
                  name="adminPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-700 bg-gray-800/80 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer group">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-brand-red focus:ring-brand-red/30 cursor-pointer"
                />
                <span className="text-xs text-gray-300 group-hover:text-white select-none transition-colors">
                  Remember Me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red text-white text-sm sm:text-base font-bold shadow-lg hover:bg-brand-red-dark transition-all duration-200 hover:shadow-glow active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate &amp; Open Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Security Badges */}

        </div>
      </div>

      {/* Page Bottom Copyright */}
      <div className="w-full max-w-md mx-auto text-center py-2 text-xs text-gray-500">
        © {new Date().getFullYear()} Ethixweb. Authorized administrative assessment access only.
      </div>
    </div>
  );
}
