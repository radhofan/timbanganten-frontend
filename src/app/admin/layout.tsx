// app/admin/layout.tsx
"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const hydrated = useAuthStore((state) => state.hydrated);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !hydrated) return null; // 💥 skip until both are true

    return <>{children}</>;
}
