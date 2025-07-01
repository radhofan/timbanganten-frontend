// app/admin/layout.tsx
"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, hydrated } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/admin/layanan/pesan',
    '/admin/layanan/histori',
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Wait for both client-side mounting and store hydration
    if (isClient && hydrated) {
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
      );

      // Redirect guests from protected routes
      if (isProtectedRoute && role === 'guest') {
        router.push('/admin/login/admin');
        return;
      }
    }
  }, [isClient, hydrated, role, pathname, router]);

  // Don't render anything until both client-side and store are ready
  if (!isClient || !hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}