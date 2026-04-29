"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { DENAH } from "@/lib/denah";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Select, Empty } from "antd";
import CemeteryPlotEditor from "@/components/CemetryPlotEditor";
import CemeteryViewer from "@/components/CemeteryViewer";
import { Blok } from "@/lib/types";
import { useUserRoles } from "@/components/CheckRole";

interface Plot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PlotWithBlok extends Plot {
  blok?: Blok;
}

type Lokasi = keyof typeof DENAH;

const Denah = () => {
  const { isAdmin } = useUserRoles();
  const [selectedPlot, setSelectedPlot] = useState<PlotWithBlok | null>(null);
  const [selectedDenah, setSelectedDenah] = useState<Lokasi>("Dalem Kaum");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stageSize, setStageSize] = useState({ width: 1400, height: 700 });
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [blokMap, setBlokMap] = useState<Record<string, Blok>>({});
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const plots = useMemo(() => DENAH[selectedDenah].plots, [selectedDenah]);

  useEffect(() => {
    const fetchBlok = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/getBlok?lokasi=${encodeURIComponent(selectedDenah)}`);
        const data: Blok[] = await res.json();
        const map: Record<string, Blok> = {};
        data.forEach((blok) => { map[blok.id] = blok; });
        setBlokMap(map);
      } catch (err) {
        console.error("Failed to fetch blok", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlok();
  }, [selectedDenah]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setStageSize({ width, height: width * 0.5 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (mode === "edit") setSelectedPlot(null);
  }, [mode]);

  const handlePlotClick = useCallback(
    (plot: Plot) => {
      setSelectedPlot({ ...plot, blok: blokMap[plot.id] });
    },
    [blokMap]
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "view" ? "edit" : "view"));
  }, []);

  const handleDenahChange = useCallback((value: Lokasi) => {
    setSelectedPlot(null);
    setSelectedDenah(value);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        {/* Page title */}
        <div style={{ borderBottom: "2px solid #0b0c0c", paddingBottom: 8, marginBottom: 14 }}>
          <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#0b0c0c", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Denah Makam Timbanganten
          </h1>
        </div>

        {/* Toolbar panel */}
        <div
          ref={containerRef}
          style={{
            background: "#f3f2f1",
            border: "1px solid #505a5f",
            padding: "8px 12px",
            marginBottom: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Legend */}
          {[
            { color: "#00703c", label: "Available" },
            { color: "#d4351c", label: "Occupied" },
            { color: "#1d70b8", label: "Selected" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 16, height: 16, background: item.color, border: "1px solid rgba(0,0,0,0.3)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0b0c0c" }}>{item.label}</span>
            </div>
          ))}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            {isAdmin && (
              <button
                onClick={toggleMode}
                style={{
                  padding: "4px 12px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  background: mode === "edit" ? "#505a5f" : "#1d70b8",
                  color: "#fff",
                  border: `2px solid ${mode === "edit" ? "#0b0c0c" : "#003078"}`,
                  cursor: "pointer",
                }}
              >
                {mode === "edit" ? "← Kembali ke Denah" : "Edit Denah"}
              </button>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0b0c0c" }}>Lokasi:</span>
              <Select
                value={selectedDenah}
                onChange={handleDenahChange}
                style={{ width: "clamp(130px, 14vw, 170px)" }}
                options={Object.keys(DENAH).map((lokasi) => ({ value: lokasi, label: lokasi }))}
              />
            </div>
          </div>
        </div>

        {/* Map canvas */}
        <div
          style={{
            border: "1px solid #505a5f",
            borderTop: "none",
            background: "#fff",
            marginBottom: selectedPlot ? 12 : 0,
            overflow: "hidden",
          }}
        >
          {isLoading && (
            <div style={{ padding: 40, textAlign: "center", color: "#505a5f", fontSize: "0.875rem" }}>
              Memuat data blok...
            </div>
          )}
          {!isLoading && mode === "view" && (
            <CemeteryViewer
              plots={plots}
              selectedPlot={selectedPlot}
              onPlotClick={handlePlotClick}
            />
          )}
          {!isLoading && mode === "edit" && <CemeteryPlotEditor />}
        </div>

        {/* Plot info panel */}
        {selectedPlot && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #505a5f",
              borderTop: "3px solid #1d70b8",
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#0b0c0c",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderBottom: "1px solid #b1b4b6",
                paddingBottom: 6,
                marginBottom: 10,
              }}
            >
              Informasi Blok: {selectedPlot.id}
            </div>

            {!selectedPlot.blok ? (
              <div style={{ padding: "16px 0" }}>
                <Empty description="Blok makam tidak ditemukan" />
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 20vw, 220px), 1fr))",
                  gap: "8px 20px",
                }}
              >
                {[
                  { label: "Blok ID", value: selectedPlot.id },
                  { label: "Lokasi", value: selectedPlot.blok.lokasi },
                  {
                    label: "Availability",
                    value: selectedPlot.blok.availability,
                    color: selectedPlot.blok.availability === "AVAILABLE" ? "#00703c" : "#d4351c",
                  },
                  { label: "Status Blok", value: selectedPlot.blok.statusBlok },
                  { label: "Status Pesanan", value: selectedPlot.blok.statusPesanan },
                  {
                    label: "Tgl. Pemakaman Terakhir",
                    value: selectedPlot.blok.tanggalPemakamanTerakhir
                      ? new Date(selectedPlot.blok.tanggalPemakamanTerakhir).toLocaleDateString()
                      : "-",
                  },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: color || "#0b0c0c" }}>
                      {value || "-"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Denah;
