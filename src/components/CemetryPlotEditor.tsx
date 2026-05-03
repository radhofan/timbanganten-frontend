// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage, Transformer } from "react-konva";

type PlotData = { id: string; x: number; y: number; width: number; height: number };

const PlotShape = React.memo(({ plot, isSelected, onSelect, onDragEnd, onTransformEnd, mode }) => {
  const groupRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = useCallback((e) => { onSelect(e.evt.ctrlKey || e.evt.metaKey); }, [onSelect]);
  const handleTap = useCallback(() => { onSelect(false); }, [onSelect]);
  const handleTransformEnd = useCallback(() => { onTransformEnd(groupRef.current); }, [onTransformEnd]);
  const fontSize = useMemo(() => Math.min(plot.width, plot.height) * 0.3, [plot.width, plot.height]);
  const isDraggable = mode === "select" || mode === "multiselect";

  return (
    <>
      <Group
        ref={groupRef}
        draggable={isDraggable}
        x={plot.x}
        y={plot.y}
        width={plot.width}
        height={plot.height}
        onClick={handleClick}
        onTap={handleTap}
        onDragEnd={onDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        <Rect
          width={plot.width}
          height={plot.height}
          fill={isSelected ? "#9333ea" : "#10b981"}
          stroke={isSelected ? "#7e22ce" : "#059669"}
          strokeWidth={2}
          opacity={0.7}
        />
        <Text
          width={plot.width}
          height={plot.height}
          text={plot.id}
          fontSize={fontSize}
          fontStyle="bold"
          fill="white"
          align="center"
          verticalAlign="middle"
          listening={false}
        />
      </Group>
      {isSelected && mode === "select" && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
});

PlotShape.displayName = "PlotShape";

const btnBase: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  border: "2px solid #0b0c0c",
  fontWeight: 700,
  fontSize: "0.8125rem",
  cursor: "pointer",
  lineHeight: 1.2,
};

const btn = (active?: boolean, color?: string): React.CSSProperties => ({
  ...btnBase,
  background: color ?? (active ? "#1d70b8" : "#f3f2f1"),
  color: color || active ? "#fff" : "#0b0c0c",
});

const btnDisabled: React.CSSProperties = {
  ...btnBase,
  background: "#f3f2f1",
  color: "#b1b4b6",
  cursor: "not-allowed",
  border: "2px solid #b1b4b6",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#505a5f",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 4,
};

const CemeteryPlotEditor = () => {
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 1400, height: 700 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [newPlot, setNewPlot] = useState(null);
  const [mode, setMode] = useState("select");
  const [plotIdInput, setPlotIdInput] = useState("");
  const [selectedMakam, setSelectedMakam] = useState("DK");
  const [scale, setScale] = useState(1);
  const [selectionRect, setSelectionRect] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [snapEnabled, setSnapEnabled] = useState(false);
  const [snapSize, setSnapSize] = useState(10);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const historyRef = useRef<PlotData[][]>([[]]);
  const historyIndexRef = useRef(0);

  const makamOptions = useMemo(() => [
    { code: "KU", name: "dalemKaum", label: "Dalem Kaum - KU" },
    { code: "DK", name: "dayeuhkolot", label: "Dayeuhkolot - DK" },
    { code: "KA", name: "karangAnyar", label: "Karang Anyar - KA" },
  ], []);

  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const selectionStartRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 1400);
        setStageSize({ width, height: width * 0.5 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ── History ──────────────────────────────────────────────────────────────

  const pushHistory = useCallback((newPlots: PlotData[]) => {
    const sliced = historyRef.current.slice(0, historyIndexRef.current + 1);
    sliced.push([...newPlots]);
    if (sliced.length > 100) sliced.shift();
    historyRef.current = sliced;
    historyIndexRef.current = sliced.length - 1;
    setCanUndo(sliced.length > 1);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    const restored = historyRef.current[historyIndexRef.current];
    setPlots([...restored]);
    setSelectedIds([]);
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(true);
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current++;
    const restored = historyRef.current[historyIndexRef.current];
    setPlots([...restored]);
    setSelectedIds([]);
    setCanUndo(true);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // ── Snap ─────────────────────────────────────────────────────────────────

  const snapVal = useCallback((v: number) => {
    if (!snapEnabled || snapSize <= 0) return v;
    return Math.round(v / snapSize) * snapSize;
  }, [snapEnabled, snapSize]);

  // ── File handlers ─────────────────────────────────────────────────────────

  const handleImportCoordinates = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        let data;
        try { data = JSON.parse(content); }
        catch {
          const arrayMatch = content.match(/=\s*(\[[\s\S]*\]);?/);
          if (arrayMatch) data = eval(arrayMatch[1]);
          else throw new Error("Could not parse file");
        }
        if (Array.isArray(data) && data.length > 0) {
          const validPlots = data.filter(
            (p) => p.id && typeof p.x === "number" && typeof p.y === "number"
              && typeof p.width === "number" && typeof p.height === "number"
          );
          if (validPlots.length > 0) {
            pushHistory(validPlots);
            setPlots(validPlots);
            setSelectedIds([]);
            alert(`Berhasil mengimpor ${validPlots.length} plot!`);
          } else { alert("Tidak ada plot valid ditemukan dalam file"); }
        } else { alert("File tidak berisi data plot yang valid"); }
      } catch (error) { alert("Kesalahan membaca file: " + error.message); }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, [pushHistory]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => setBackgroundImage(img);
    };
    reader.readAsDataURL(file);
  }, []);

  const exportData = useCallback(() => {
    const currentMakam = makamOptions.find((m) => m.code === selectedMakam);
    const rounded = plots.map((p) => {
      const hasPrefix = /^[A-Z]{2,3}-/.test(p.id);
      return {
        id: hasPrefix ? p.id : `${selectedMakam}-${p.id}`,
        x: Math.round(p.x), y: Math.round(p.y),
        width: Math.round(p.width), height: Math.round(p.height),
      };
    });
    const formattedPlots = rounded
      .map((p) => `  { id: "${p.id}", x: ${p.x}, y: ${p.y}, width: ${p.width}, height: ${p.height} }`)
      .join(",\n");
    const jsCode = `export const ${currentMakam.name} = [\n${formattedPlots},\n];`;
    const blob = new Blob([jsCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentMakam.name}.js`;
    a.click();
    URL.revokeObjectURL(url);
  }, [plots, selectedMakam, makamOptions]);

  // ── Selection & edit helpers ──────────────────────────────────────────────

  const deletePlot = useCallback(() => {
    if (selectedIds.length === 0) return;
    const newPlots = plots.filter((p) => !selectedIds.includes(p.id));
    pushHistory(newPlots);
    setPlots(newPlots);
    setSelectedIds([]);
  }, [selectedIds, plots, pushHistory]);

  const clearAll = useCallback(() => {
    if (!confirm("Hapus semua plot?")) return;
    pushHistory([]);
    setPlots([]);
    setSelectedIds([]);
  }, [pushHistory]);

  const selectAll = useCallback(() => { setSelectedIds(plots.map((p) => p.id)); }, [plots]);
  const deselectAll = useCallback(() => { setSelectedIds([]); }, []);

  const selectedPlots = useMemo(() => plots.filter((p) => selectedIds.includes(p.id)), [plots, selectedIds]);
  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const updateSelectedPlots = useCallback((fn: (p: PlotData) => Partial<PlotData>) => {
    setPlots((prev) => {
      const next = prev.map((p) => selectedIds.includes(p.id) ? { ...p, ...fn(p) } : p);
      pushHistory(next);
      return next;
    });
  }, [selectedIds, pushHistory]);

  const moveSelected = useCallback((dx: number, dy: number) => {
    updateSelectedPlots((p) => ({ x: p.x + dx, y: p.y + dy }));
  }, [updateSelectedPlots]);

  const setSelectedValue = useCallback((field: string, value: string) => {
    if (value === null || value === "") return;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    updateSelectedPlots(() => ({ [field]: Math.max(field === "width" || field === "height" ? 5 : -Infinity, numValue) }));
  }, [updateSelectedPlots]);

  // ── Canvas event handlers ─────────────────────────────────────────────────

  const handleMouseDown = useCallback((e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (mode === "draw") {
      const pos = e.target.getStage().getPointerPosition();
      setIsDrawing(true);
      setNewPlot({ x: snapVal(pos.x / scale), y: snapVal(pos.y / scale), width: 0, height: 0 });
    } else if (clickedOnEmpty) {
      if (mode === "multiselect") {
        const pos = e.target.getStage().getPointerPosition();
        setIsSelecting(true);
        selectionStartRef.current = { x: pos.x / scale, y: pos.y / scale };
        setSelectionRect({ x: pos.x / scale, y: pos.y / scale, width: 0, height: 0 });
      } else {
        setSelectedIds([]);
      }
    }
  }, [mode, scale, snapVal]);

  const handleMouseMove = useCallback((e) => {
    if (isDrawing && mode === "draw") {
      const pos = e.target.getStage().getPointerPosition();
      setNewPlot((prev) => ({
        ...prev,
        width: snapVal(pos.x / scale) - prev.x,
        height: snapVal(pos.y / scale) - prev.y,
      }));
    } else if (isSelecting && mode === "multiselect") {
      const pos = e.target.getStage().getPointerPosition();
      setSelectionRect({
        x: Math.min(selectionStartRef.current.x, pos.x / scale),
        y: Math.min(selectionStartRef.current.y, pos.y / scale),
        width: Math.abs(pos.x / scale - selectionStartRef.current.x),
        height: Math.abs(pos.y / scale - selectionStartRef.current.y),
      });
    }
  }, [isDrawing, isSelecting, mode, scale, snapVal]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && newPlot) {
      if (Math.abs(newPlot.width) > 5 && Math.abs(newPlot.height) > 5) {
        const id = plotIdInput || `plot-${plots.length + 1}`;
        const normalized: PlotData = {
          id,
          x: newPlot.width < 0 ? newPlot.x + newPlot.width : newPlot.x,
          y: newPlot.height < 0 ? newPlot.y + newPlot.height : newPlot.y,
          width: Math.abs(newPlot.width),
          height: Math.abs(newPlot.height),
        };
        const newPlots = [...plots, normalized];
        pushHistory(newPlots);
        setPlots(newPlots);
        setPlotIdInput("");
      }
      setIsDrawing(false);
      setNewPlot(null);
    } else if (isSelecting && selectionRect) {
      const selected = plots
        .filter((plot) => {
          const cx = plot.x + plot.width / 2;
          const cy = plot.y + plot.height / 2;
          return cx >= selectionRect.x && cx <= selectionRect.x + selectionRect.width
            && cy >= selectionRect.y && cy <= selectionRect.y + selectionRect.height;
        })
        .map((p) => p.id);
      setSelectedIds(selected);
      setIsSelecting(false);
      setSelectionRect(null);
    }
  }, [isDrawing, isSelecting, newPlot, plotIdInput, plots, selectionRect, pushHistory]);

  // ── Plot event handlers (memoised) ────────────────────────────────────────

  const plotClickHandlers = useMemo(() => {
    const h = {};
    plots.forEach((plot) => {
      h[plot.id] = (ctrlKey: boolean) => {
        if (mode === "multiselect" || ctrlKey) {
          setSelectedIds((prev) =>
            prev.includes(plot.id) ? prev.filter((id) => id !== plot.id) : [...prev, plot.id]
          );
        } else {
          setSelectedIds([plot.id]);
        }
      };
    });
    return h;
  }, [plots, mode]);

  const plotDragEndHandlers = useMemo(() => {
    const h = {};
    plots.forEach((plot) => {
      h[plot.id] = (e) => {
        const dx = snapVal(e.target.x() / scale) - plot.x;
        const dy = snapVal(e.target.y() / scale) - plot.y;
        const affectedIds = selectedIds.includes(plot.id) ? selectedIds : [plot.id];
        setPlots((prev) => {
          const next = prev.map((p) =>
            affectedIds.includes(p.id) ? { ...p, x: p.x + dx, y: p.y + dy } : p
          );
          pushHistory(next);
          return next;
        });
      };
    });
    return h;
  }, [plots, scale, selectedIds, pushHistory, snapVal]);

  const plotTransformEndHandlers = useMemo(() => {
    const h = {};
    plots.forEach((plot) => {
      h[plot.id] = (node) => {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        setPlots((prev) => {
          const next = prev.map((p) => {
            if (p.id !== plot.id) return p;
            return {
              ...p,
              x: snapVal(node.x() / scale),
              y: snapVal(node.y() / scale),
              width: Math.max(5, Math.round(p.width * scaleX)),
              height: Math.max(5, Math.round(p.height * scaleY)),
            };
          });
          pushHistory(next);
          return next;
        });
      };
    });
    return h;
  }, [plots, scale, pushHistory, snapVal]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if ((e.key === "y" && (e.ctrlKey || e.metaKey)) || (e.key === "z" && (e.ctrlKey || e.metaKey) && e.shiftKey)) { e.preventDefault(); redo(); return; }

      if (isInput) return;

      if ((e.key === "Delete" || e.key === "Backspace") && selectedIds.length > 0) { e.preventDefault(); deletePlot(); return; }
      if (e.key === "Escape") { setSelectedIds([]); return; }
      if (e.key === "a" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); selectAll(); return; }

      if (selectedIds.length > 0) {
        const step = e.ctrlKey ? 50 : e.shiftKey ? 10 : 1;
        if (e.key === "ArrowUp") { e.preventDefault(); moveSelected(0, -step); }
        if (e.key === "ArrowDown") { e.preventDefault(); moveSelected(0, step); }
        if (e.key === "ArrowLeft") { e.preventDefault(); moveSelected(-step, 0); }
        if (e.key === "ArrowRight") { e.preventDefault(); moveSelected(step, 0); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo, deletePlot, selectAll, moveSelected, selectedIds]);

  // ── Render ────────────────────────────────────────────────────────────────

  // const modeLabel = mode === "select" ? "Pilih" : mode === "multiselect" ? "Multi-Pilih" : "Gambar";
  const stageCursor = mode === "draw" ? "crosshair" : mode === "multiselect" ? "cell" : "default";

  return (
    <div style={{ background: "#f3f2f1", padding: "12px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Page title */}
        <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 6, marginBottom: 8 }}>
          <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
            Editor Tata Letak Plot Makam
          </h1>
        </div>

        {/* ── Main control panel ── */}
        <div style={{ background: "#fff", border: "1px solid #b1b4b6", marginBottom: 8 }}>

          {/* Row 1: Berkas + Mode + ID + Lokasi */}
          <div style={{ padding: "6px 10px", display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
            <span style={{ ...sectionLabel, marginBottom: 0, flexShrink: 0 }}>Berkas:</span>
            <label style={{ cursor: "pointer", flexShrink: 0 }}>
              <span style={{ ...btnBase, background: "#505a5f", color: "#fff", whiteSpace: "nowrap" }}>Unggah Gambar</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
            {backgroundImage && (
              <button onClick={() => setBackgroundImage(null)} style={{ ...btnBase, background: "#d4351c", color: "#fff", flexShrink: 0 }}>Hapus Gambar</button>
            )}
            <label style={{ cursor: "pointer", flexShrink: 0 }}>
              <span style={{ ...btnBase, background: "#505a5f", color: "#fff", whiteSpace: "nowrap" }}>Impor Koordinat</span>
              <input type="file" accept=".js,.json,.txt" onChange={handleImportCoordinates} style={{ display: "none" }} />
            </label>
            <button onClick={exportData} disabled={plots.length === 0} style={{ ...(plots.length === 0 ? btnDisabled : { ...btnBase, background: "#00703c", color: "#fff" }), flexShrink: 0 }}>
              Ekspor ({plots.length})
            </button>

            <span style={{ ...sectionLabel, marginBottom: 0, flexShrink: 0, marginLeft: 8 }}>Mode:</span>
            {[
              { key: "select", label: "⬡ Pilih" },
              { key: "multiselect", label: "⬜ Area" },
              { key: "draw", label: "✏ Gambar" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setMode(key)} style={{ ...btn(mode === key), flexShrink: 0 }}>{label}</button>
            ))}
            <input
              type="text"
              value={plotIdInput}
              onChange={(e) => setPlotIdInput(e.target.value)}
              placeholder="ID plot (opsional)"
              disabled={mode !== "draw"}
              style={{
                padding: "0.3rem 0.5rem",
                border: "2px solid #0b0c0c",
                fontSize: "0.8125rem",
                outline: "none",
                width: 130,
                flexShrink: 0,
                opacity: mode === "draw" ? 1 : 0.35,
                cursor: mode === "draw" ? "text" : "not-allowed",
                background: mode === "draw" ? "#fff" : "#f3f2f1",
              }}
            />

            <span style={{ ...sectionLabel, marginBottom: 0, flexShrink: 0, marginLeft: 8 }}>Lokasi:</span>
            <select
              value={selectedMakam}
              onChange={(e) => setSelectedMakam(e.target.value)}
              style={{ padding: "0.3rem 0.5rem", border: "2px solid #0b0c0c", fontSize: "0.8125rem", fontWeight: 600, background: "#fff", height: 30, flexShrink: 0 }}
            >
              {makamOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Row 2: Zoom + Actions + Snap */}
          <div style={{ borderBottom: "1px solid #b1b4b6", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
            <span style={{ ...sectionLabel, marginBottom: 0, flexShrink: 0 }}>Zoom: {Math.round(scale * 100)}%</span>
            <input type="range" min="0.25" max="3" step="0.05" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} style={{ width: 80, flexShrink: 0 }} />
            <button onClick={selectAll} style={{ ...btn(false, "#1d70b8"), flexShrink: 0 }}>Pilih Semua</button>
            <button onClick={deselectAll} disabled={selectedIds.length === 0} style={{ ...(selectedIds.length === 0 ? btnDisabled : btn(false, "#505a5f")), flexShrink: 0 }}>Batal Pilih</button>
            <button onClick={deletePlot} disabled={selectedIds.length === 0} style={{ ...(selectedIds.length === 0 ? btnDisabled : btn(false, "#d4351c")), flexShrink: 0, minWidth: 80 }}>
              Hapus{selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}
            </button>
            <button onClick={clearAll} disabled={plots.length === 0} style={{ ...(plots.length === 0 ? btnDisabled : btn(false, "#f47738")), flexShrink: 0 }}>Hapus Semua</button>
            <button onClick={undo} disabled={!canUndo} style={{ ...(!canUndo ? btnDisabled : btn()), flexShrink: 0 }} title="Ctrl+Z">↩ Undo</button>
            <button onClick={redo} disabled={!canRedo} style={{ ...(!canRedo ? btnDisabled : btn()), flexShrink: 0 }} title="Ctrl+Y">↪ Redo</button>
            <span style={{ ...sectionLabel, marginBottom: 0, flexShrink: 0, marginLeft: 8 }}>Snap:</span>
            <button onClick={() => setSnapEnabled(!snapEnabled)} style={{ ...btn(snapEnabled, snapEnabled ? "#1d70b8" : undefined), flexShrink: 0 }}>
              {snapEnabled ? "Aktif" : "Mati"}
            </button>
            <input
              type="number" min={1} max={100} value={snapSize}
              onChange={(e) => setSnapSize(Math.max(1, parseInt(e.target.value) || 10))}
              style={{ width: 48, padding: "0.3rem 0.4rem", border: "2px solid #0b0c0c", fontSize: "0.8125rem", outline: "none", flexShrink: 0, visibility: snapEnabled ? "visible" : "hidden" }}
            />
          </div>

          {/* Selected plot controls — always visible */}
          <div style={{
            padding: "8px 10px",
            background: "#f3f2f1",
            borderBottom: "1px solid #b1b4b6",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: 16,
            opacity: selectedIds.length > 0 ? 1 : 0.35,
            pointerEvents: selectedIds.length > 0 ? "auto" : "none",
          }}>
            <div style={{ fontWeight: 700, color: "#0b0c0c", fontSize: "0.8125rem", alignSelf: "center", minWidth: 90 }}>
              {selectedIds.length > 0 ? `${selectedIds.length} plot terpilih` : "Pilih plot"}
            </div>
            <div>
              <div style={sectionLabel}>Geser (↑↓←→ · Shift×10 · Ctrl×50)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 30px)", gridTemplateRows: "repeat(3, 30px)", gap: 2 }}>
                <div />
                <button onClick={() => moveSelected(0, -1)} style={{ ...btnBase, padding: "0.15rem", display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
                <div />
                <button onClick={() => moveSelected(-1, 0)} style={{ ...btnBase, padding: "0.15rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <div style={{ background: "#e4e4e4", border: "2px solid #b1b4b6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6875rem", color: "#505a5f" }}>✛</div>
                <button onClick={() => moveSelected(1, 0)} style={{ ...btnBase, padding: "0.15rem", display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
                <div />
                <button onClick={() => moveSelected(0, 1)} style={{ ...btnBase, padding: "0.15rem", display: "flex", alignItems: "center", justifyContent: "center" }}>↓</button>
                <div />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={sectionLabel}>Posisi & Ukuran (Enter untuk terapkan)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {[
                  { field: "x", label: "X", hint: selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].x)) : "" },
                  { field: "y", label: "Y", hint: selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].y)) : "" },
                  { field: "width", label: "Lebar", hint: selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].width)) : "" },
                  { field: "height", label: "Tinggi", hint: selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].height)) : "" },
                ].map(({ field, label, hint }) => (
                  <div key={field}>
                    <div style={{ ...sectionLabel, marginBottom: 2 }}>{label}{hint ? `: ${hint}` : ""}</div>
                    <input
                      type="number"
                      placeholder={hint || label}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelectedValue(field, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                      style={{ width: "100%", padding: "0.3rem 0.4rem", border: "2px solid #0b0c0c", fontSize: "0.8125rem", outline: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Canvas ── */}
        <div
          ref={containerRef}
          style={{ background: "#fff", border: "1px solid #b1b4b6", overflow: "hidden", cursor: stageCursor }}
        >
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            scaleX={scale}
            scaleY={scale}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              {backgroundImage && (
                <KonvaImage image={backgroundImage} width={backgroundImage.width} height={backgroundImage.height} opacity={0.5} listening={false} />
              )}
              {plots.map((plot) => (
                <PlotShape
                  key={plot.id}
                  plot={plot}
                  isSelected={selectedIdsSet.has(plot.id)}
                  onSelect={plotClickHandlers[plot.id]}
                  onDragEnd={plotDragEndHandlers[plot.id]}
                  onTransformEnd={plotTransformEndHandlers[plot.id]}
                  mode={mode}
                />
              ))}
              {isDrawing && newPlot && (
                <Rect
                  x={newPlot.x} y={newPlot.y} width={newPlot.width} height={newPlot.height}
                  fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth={2} dash={[5, 5]} listening={false}
                />
              )}
              {isSelecting && selectionRect && (
                <Rect
                  x={selectionRect.x} y={selectionRect.y} width={selectionRect.width} height={selectionRect.height}
                  fill="rgba(147,51,234,0.1)" stroke="#9333ea" strokeWidth={2} dash={[5, 5]} listening={false}
                />
              )}
            </Layer>
          </Stage>
        </div>

        {/* ── Status bar removed ── */}

        {/* ── Plot list ── */}
        {plots.length > 0 && (
          <div style={{ marginTop: 8, background: "#fff", border: "1px solid #b1b4b6", padding: "8px 10px" }}>
            <div style={{ fontWeight: 700, color: "#0b0c0c", marginBottom: 6, fontSize: "0.8125rem" }}>
              Daftar Plot ({plots.length})
            </div>
            <div style={{ maxHeight: "120px", overflowY: "auto" }}>
              <div className="grid grid-cols-8 gap-2">
                {plots.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedIds([p.id])}
                    style={{
                      padding: "0.3rem",
                      background: selectedIdsSet.has(p.id) ? "#1d70b8" : "#f3f2f1",
                      color: selectedIdsSet.has(p.id) ? "#fff" : "#0b0c0c",
                      border: "2px solid #0b0c0c",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CemeteryPlotEditor;
