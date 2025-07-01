"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, hydrated } = useAuthStore((state) => ({
    role: state.role,
    hydrated: state.hydrated,
  }));
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hydrated && mounted && role === "guest") {
      router.replace("/admin/login/admin");
    }
  }, [hydrated, mounted, role, router]);

  if (!mounted || !hydrated || role === "guest") return null;

  return <>{children}</>;
}
