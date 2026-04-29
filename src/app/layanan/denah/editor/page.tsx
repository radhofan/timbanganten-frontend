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
        {/* Page header */}
        <div style={{ background: "#0b0c0c", borderBottom: "4px solid #1d70b8", padding: "10px clamp(0.75rem, 2vw, 2rem)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.875rem, 1.2vw, 1rem)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Editor Denah Makam
            </div>
            <div style={{ color: "#b1b4b6", fontSize: "0.75rem", marginTop: 2 }}>
              Buat dan atur tata letak plot makam
            </div>
          </div>
          <button
            onClick={() => router.push("/layanan/denah")}
            style={{
              padding: "6px 14px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              background: "#505a5f",
              color: "#fff",
              border: "2px solid #b1b4b6",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ← Kembali ke Denah
          </button>
        </div>

        <CemeteryPlotEditor />
      </main>

      <Footer />
    </div>
  );
}
