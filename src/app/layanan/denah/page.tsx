"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GovukSelect } from "@/components/govuk";
import CemeteryViewer from "@/components/CemeteryViewer";
import { Blok, Makam, MakamStatus } from "@/lib/types";
import { useUserRoles } from "@/components/CheckRole";
import { useRouter } from "next/navigation";
import dalemKaumPlots from "@/components/plot/dalemKaum";
import karangAnyarPlots from "@/components/plot/karangAnyar";
import dayeuhKolotPlots from "@/components/plot/dayeuhKolot";

const PLOT_MAP = {
  "Dalem Kaum": dalemKaumPlots,
  "Karang Anyar": karangAnyarPlots,
  "Dayeuh Kolot": dayeuhKolotPlots,
} as const;

type Lokasi = keyof typeof PLOT_MAP;

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

const Denah = () => {
  const { isAdmin } = useUserRoles();
  const router = useRouter();
  const [selectedPlot, setSelectedPlot] = useState<PlotWithBlok | null>(null);
  const [selectedDenah, setSelectedDenah] = useState<Lokasi>("Dalem Kaum");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stageSize, setStageSize] = useState({ width: 1400, height: 700 });
  const [blokMap, setBlokMap] = useState<Record<string, Blok>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [blokMakams, setBlokMakams] = useState<Makam[]>([]);
  const [blokStatuses, setBlokStatuses] = useState<MakamStatus[]>([]);
  const [occupantsLoading, setOccupantsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const plots = useMemo(() => PLOT_MAP[selectedDenah], [selectedDenah]);

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

  const handlePlotClick = useCallback(
    async (plot: Plot) => {
      setSelectedPlot({ ...plot, blok: blokMap[plot.id] });
      if (!isAdmin) return;
      setOccupantsLoading(true);
      setBlokMakams([]);
      setBlokStatuses([]);
      try {
        const [makamRes, statusRes] = await Promise.all([
          fetch(`/api/makam?blokId=${encodeURIComponent(plot.id)}`),
          fetch(`/api/makamStatus?blokId=${encodeURIComponent(plot.id)}`),
        ]);
        const [makamData, statusData] = await Promise.all([
          makamRes.json(),
          statusRes.json(),
        ]);
        setBlokMakams(Array.isArray(makamData) ? makamData : []);
        setBlokStatuses(Array.isArray(statusData) ? statusData : []);
      } catch (err) {
        console.error("Failed to fetch blok occupants", err);
      } finally {
        setOccupantsLoading(false);
      }
    },
    [blokMap, isAdmin]
  );

  const handleDenahChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlot(null);
    setBlokMakams([]);
    setBlokStatuses([]);
    setSelectedDenah(e.target.value as Lokasi);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "12px 16px" }}>
        {/* Page title */}
        <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 6, marginBottom: 8, maxWidth: 1100, margin: "0 auto 8px" }}>
          <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
            Denah Makam Timbanganten
          </h1>
        </div>

        {/* Outer cinema-style box */}
        <div style={{ border: "1px solid #b1b4b6", background: "#fff", maxWidth: 1100, margin: "0 auto" }}>

          {/* Toolbar */}
          <div
            ref={containerRef}
            style={{
              background: "#f3f2f1",
              borderBottom: "1px solid #b1b4b6",
              padding: "6px 10px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* Legend */}
            {[
              { color: "#00703c", label: "Tersedia" },
              { color: "#f4a100", label: "Terpakai" },
              { color: "#d4351c", label: "Tidak Tersedia" },
              { color: "#1d70b8", label: "Dipilih" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 12, height: 12, background: item.color, border: "1px solid rgba(0,0,0,0.3)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0b0c0c" }}>{item.label}</span>
              </div>
            ))}

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              {isAdmin && (
                <button
                  onClick={() => router.push("/layanan/denah/editor")}
                  style={{
                    padding: "3px 10px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: "#1d70b8",
                    color: "#fff",
                    border: "2px solid #003078",
                    cursor: "pointer",
                  }}
                >
                  Edit Denah →
                </button>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }}>Lokasi:</span>
                <GovukSelect
                  value={selectedDenah}
                  onChange={handleDenahChange}
                  options={Object.keys(PLOT_MAP).map((lokasi) => ({ value: lokasi, label: lokasi }))}
                  style={{ height: 27, fontSize: "0.75rem", padding: "0 8px" }}
                />
              </div>
            </div>
          </div>

          {/* Map canvas */}
          <div style={{ background: "#fff", overflow: "hidden" }}>
            {isLoading && (
              <div style={{ padding: 32, textAlign: "center", color: "#505a5f", fontSize: "0.8125rem" }}>
                Memuat data blok...
              </div>
            )}
            {!isLoading && (
              <CemeteryViewer
                plots={plots}
                selectedPlot={selectedPlot}
                onPlotClick={handlePlotClick}
                blokMap={blokMap}
              />
            )}
          </div>

        </div>

        {/* Plot info panel — always visible */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #b1b4b6",
            borderTop: "3px solid #1d70b8",
            padding: "10px 14px",
            maxWidth: 1100,
            margin: "8px auto 0",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: "#0b0c0c",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              borderBottom: "1px solid #b1b4b6",
              paddingBottom: 5,
              marginBottom: 8,
            }}
          >
            {selectedPlot ? `Informasi Blok: ${selectedPlot.id}` : "Informasi Blok"}
          </div>

          {!selectedPlot ? (
            <div style={{ padding: "10px 0", color: "#505a5f", fontSize: "0.8125rem", fontStyle: "italic" }}>
              Pilih blok pada denah untuk melihat informasi.
            </div>
          ) : !selectedPlot.blok ? (
            <div style={{ padding: "10px 0", textAlign: "center", color: "#505a5f", fontSize: "0.8125rem" }}>
              Blok makam tidak ditemukan
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "6px 16px",
              }}
            >
              {[
                { label: "Blok ID", value: selectedPlot.id },
                { label: "Lokasi", value: selectedPlot.blok.lokasi },
                {
                  label: "Availability",
                  value: selectedPlot.blok.availability,
                  color: selectedPlot.blok.availability === "TERSEDIA" ? "#00703c" : "#d4351c",
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
                  <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: color || "#0b0c0c" }}>
                    {value || "-"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Occupants table — admin only, shown when a plot is selected */}
        {isAdmin && selectedPlot && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #b1b4b6",
              maxWidth: 1100,
              margin: "8px auto 0",
            }}
          >
            <div style={{
              background: "#f3f2f1",
              borderBottom: "1px solid #b1b4b6",
              padding: "8px 14px",
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: "#0b0c0c",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}>
              Penghuni Blok: {selectedPlot.id}
            </div>

            {occupantsLoading ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#505a5f", fontSize: "0.8125rem" }}>
                Memuat data penghuni...
              </div>
            ) : blokMakams.length === 0 && blokStatuses.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#505a5f", fontSize: "0.8125rem", fontStyle: "italic" }}>
                Tidak ada penghuni di blok ini.
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
                <thead>
                  <tr style={{ background: "#f3f2f1", borderBottom: "2px solid #b1b4b6" }}>
                    {["Nama Almarhum/ah", "Status", "Tgl. Pemakaman", "Masa Aktif", "Bayar Pesanan", "Penanggung Jawab"].map((h) => (
                      <th key={h} style={{ padding: "6px 12px", textAlign: "left", fontWeight: 700, fontSize: "0.75rem", color: "#0b0c0c", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blokMakams.map((m, idx) => (
                    <tr key={m.id} style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #e8e8e8" }}>
                      <td style={{ padding: "6px 12px", fontWeight: 700 }}>{m.jenazah?.user?.name || "-"}</td>
                      <td style={{ padding: "6px 12px" }}>
                        <span style={{ padding: "1px 7px", fontSize: "0.6875rem", fontWeight: 700, background: "#00703c", color: "#fff" }}>
                          {m.jenazah?.statusJenazah || "-"}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px" }}>
                        {m.jenazah?.tanggalPemakaman
                          ? new Date(m.jenazah.tanggalPemakaman).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td style={{ padding: "6px 12px" }}>
                        {m.jenazah?.masaAktif
                          ? new Date(m.jenazah.masaAktif).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td style={{ padding: "6px 12px" }}>
                        <span style={{
                          padding: "1px 7px", fontSize: "0.6875rem", fontWeight: 700,
                          background: m.jenazah?.statusPembayaranPesanan === "PAID" ? "#00703c" : "#d4351c",
                          color: "#fff",
                        }}>
                          {m.jenazah?.statusPembayaranPesanan || "-"}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px", color: "#505a5f" }}>
                        {m.pj.map((pj) => pj.user?.name).filter(Boolean).join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                  {blokStatuses.map((s, idx) => (
                    <tr key={s.id} style={{ background: (blokMakams.length + idx) % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #e8e8e8" }}>
                      <td style={{ padding: "6px 12px", fontWeight: 700 }}>{s.jenazah?.user?.name || "-"}</td>
                      <td style={{ padding: "6px 12px" }}>
                        <span style={{ padding: "1px 7px", fontSize: "0.6875rem", fontWeight: 700, background: "#f47738", color: "#fff" }}>
                          {s.jenazah?.statusJenazah || "DIPESAN"}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px", color: "#505a5f" }}>-</td>
                      <td style={{ padding: "6px 12px" }}>
                        {s.jenazah?.masaAktif
                          ? new Date(s.jenazah.masaAktif).toLocaleDateString("id-ID")
                          : "-"}
                      </td>
                      <td style={{ padding: "6px 12px" }}>
                        <span style={{
                          padding: "1px 7px", fontSize: "0.6875rem", fontWeight: 700,
                          background: s.jenazah?.statusPembayaranPesanan === "PAID" ? "#00703c" : "#d4351c",
                          color: "#fff",
                        }}>
                          {s.jenazah?.statusPembayaranPesanan || "-"}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px", color: "#505a5f" }}>
                        {s.pj.map((pj) => pj.user?.name).filter(Boolean).join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Denah;
