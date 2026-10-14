'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/leads');
  }, [router]);

  return (
    <div className="py-12 flex items-center justify-center text-gray-400 text-sm">
      <div className="animate-pulse">Redirecting to Leads Management Workspace...</div>
    </div>
  );
}
