"use client";

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { dalemKaum, karangAnyar, dayeuhKolot } from "@/lib/denah";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Select } from "antd";

interface Plot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const Denah = () => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedDenah, setSelectedDenah] = useState("dalemKaum"); // NEW
  const [stageSize, setStageSize] = useState({ width: 1400, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [image] = useImage("/api/placeholder/1400/700");

  const plots =
    selectedDenah === "dalemKaum"
      ? dalemKaum
      : selectedDenah === "karangAnyar"
        ? karangAnyar
        : dayeuhKolot; // NEW

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

  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />
      <main>
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

                  <div className="ml-auto flex items-center gap-2">
                    <div>Lokasi:</div>
                    <Select
                      value={selectedDenah}
                      onChange={(value) => {
                        setSelectedPlot(null);
                        setSelectedDenah(value);
                      }}
                      className="w-40"
                      options={[
                        { value: "dalemKaum", label: "Dalem Kaum" },
                        { value: "karangAnyar", label: "Karang Anyar" },
                        { value: "dayeuhKolot", label: "Dayeuh Kolot" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={containerRef}
              className="rounded-lg overflow-hidden shadow-2xl border border-gray-300 mb-8"
            >
              <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                  {image && (
                    <KonvaImage
                      image={image}
                      width={stageSize.width}
                      height={stageSize.height}
                      opacity={0.3}
                    />
                  )}

                  {plots.map((plot) => (
                    <Group key={plot.id}>
                      <Rect
                        x={plot.x}
                        y={plot.y}
                        width={plot.width}
                        height={plot.height}
                        fill={selectedPlot?.id === plot.id ? "#3b82f6" : "#10b981"}
                        stroke={selectedPlot?.id === plot.id ? "#1d4ed8" : "#059669"}
                        strokeWidth={2}
                        onClick={() => handlePlotClick(plot)}
                        onTap={() => handlePlotClick(plot)}
                        onMouseEnter={(e) => {
                          const stage = e.target.getStage();
                          if (stage) {
                            const container = stage.container();
                            if (container) container.style.cursor = "pointer";
                          }
                        }}
                        onMouseLeave={(e) => {
                          const stage = e.target.getStage();
                          if (stage) {
                            const container = stage.container();
                            if (container) container.style.cursor = "default";
                          }
                        }}
                        shadowBlur={selectedPlot?.id === plot.id ? 10 : 5}
                        shadowOpacity={0.6}
                      />
                      <Text
                        x={plot.x}
                        y={plot.y + plot.height / 2 - 6}
                        width={plot.width}
                        text={plot.id}
                        fontSize={10}
                        fontStyle="bold"
                        fill="white"
                        align="center"
                      />
                    </Group>
                  ))}
                </Layer>
              </Stage>
            </div>

            {selectedPlot && (
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-300 mb-12 p-4">
                <h2 className="text-xl font-bold mb-2">Plot Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Plot Number:</p>
                    <p className="text-2xl font-bold">{selectedPlot.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status:</p>
                    <p className="text-lg font-semibold text-green-400">Available</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Size:</p>
                    <p>
                      {selectedPlot.width} × {selectedPlot.height} units
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition"
                      onClick={() => alert(`Booking plot ${selectedPlot.id}`)}
                    >
                      Book This Plot
                    </button>
                  </div>
                </div>
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
