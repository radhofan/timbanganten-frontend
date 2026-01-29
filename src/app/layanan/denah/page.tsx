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

  // Memoize plots to prevent unnecessary re-renders
  const plots = useMemo(() => DENAH[selectedDenah].plots, [selectedDenah]);

  // Fetch blok data
  useEffect(() => {
    const fetchBlok = async () => {
      setIsLoading(true);
      try {
        console.log("[Denah] fetching blok for:", selectedDenah);

        const res = await fetch(`/api/getBlok?lokasi=${encodeURIComponent(selectedDenah)}`);
        const data: Blok[] = await res.json();

        const map: Record<string, Blok> = {};
        data.forEach((blok) => {
          map[blok.id] = blok;
        });

        console.log("[Denah] blokMap keys:", Object.keys(map));
        setBlokMap(map);
      } catch (err) {
        console.error("Failed to fetch blok", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlok();
  }, [selectedDenah]);

  // Resize handler
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

  // Reset selected plot when switching modes
  useEffect(() => {
    if (mode === "edit") {
      setSelectedPlot(null);
    }
  }, [mode]);

  // Memoized plot click handler
  const handlePlotClick = useCallback(
    (plot: Plot) => {
      const blok = blokMap[plot.id];
      console.log("[Plot Click]", { plotId: plot.id, blok });

      setSelectedPlot({
        ...plot,
        blok,
      });
    },
    [blokMap]
  );

  // Memoized mode toggle handler
  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "view" ? "edit" : "view"));
  }, []);

  // Memoized denah change handler
  const handleDenahChange = useCallback((value: Lokasi) => {
    setSelectedPlot(null);
    setSelectedDenah(value);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />
      <main className="big-white flex-1">
        <div className="w-full bg-white p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-4">Denah Makam Timbanganten</h1>

            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-300 mb-8 p-4">
              <div className="flex items-center justify-between text-black">
                <div className="flex gap-4 items-center text-black w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 border-2 border-green-300"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 border-2 border-red-300"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 border-2 border-blue-300"></div>
                    <span>Selected</span>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={toggleMode}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        mode === "edit"
                          ? "bg-gray-600 hover:bg-gray-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {mode === "edit" ? "Back to Denah" : "Edit Denah"}
                    </button>
                  )}

                  <div className="ml-auto flex items-center gap-2">
                    <div>Lokasi:</div>
                    <Select
                      value={selectedDenah}
                      onChange={handleDenahChange}
                      className="w-40"
                      options={Object.keys(DENAH).map((lokasi) => ({
                        value: lokasi,
                        label: lokasi,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-300 mb-12">
              {isLoading && (
                <div className="flex items-center justify-center p-12">
                  <div className="text-gray-500">Loading...</div>
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

            {selectedPlot && (
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-300 mb-12 p-4">
                <h2 className="text-xl font-bold mb-4">Blok Information</h2>

                {!selectedPlot.blok ? (
                  <div className="py-12">
                    <Empty description="Blok makam tidak ditemukan" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 text-black">
                    <div>
                      <p className="text-gray-400">Blok ID</p>
                      <p className="font-semibold">{selectedPlot.id}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Lokasi</p>
                      <p>{selectedPlot.blok.lokasi}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Availability</p>
                      <p
                        className={`font-semibold ${
                          selectedPlot.blok.availability === "AVAILABLE"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {selectedPlot.blok.availability}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Status Blok</p>
                      <p>{selectedPlot.blok.statusBlok}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Status Pesanan</p>
                      <p>{selectedPlot.blok.statusPesanan}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Tanggal Pemakaman Terakhir</p>
                      <p>
                        {selectedPlot.blok.tanggalPemakamanTerakhir
                          ? new Date(
                              selectedPlot.blok.tanggalPemakamanTerakhir
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Denah;
