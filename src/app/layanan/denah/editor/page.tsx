"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CemeteryPlotEditor from "@/components/CemetryPlotEditor";
import { useRouter } from "next/navigation";
import { useUserRoles } from "@/components/CheckRole";
import { useEffect } from "react";

export default function DenahEditor() {
  const { isAdmin } = useUserRoles();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin === false) {
      router.replace("/layanan/denah");
    }
  }, [isAdmin, router]);


  if (!isAdmin) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1 }}>
        <CemeteryPlotEditor />
      </main>

      <Footer />
    </div>
  );
}
