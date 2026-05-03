"use client";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
// import type Konva from "konva";
// import type { KonvaEventObject } from "konva/lib/Node";

interface Plot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CemeteryViewerProps {
  plots: readonly Plot[];
  selectedPlot: { id: string } | null;
  onPlotClick: (plot: Plot) => void;
}

const BASE_WIDTH = 1400;
const BASE_HEIGHT = 700;

// Memoized individual plot component with hover state
const PlotRect = React.memo<{
  plot: Plot;
  offsetX: number;
  offsetY: number;
  isSelected: boolean;
  onClick: () => void;
}>(({ plot, offsetX, offsetY, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = plot.x + offsetX;
  const y = plot.y + offsetY;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={plot.width}
        height={plot.height}
        fill={isSelected ? "#1d70b8" : isHovered ? "#0b5394" : "#00703c"}
        stroke={isSelected ? "#003078" : "#005a30"}
        strokeWidth={1}
        onClick={onClick}
        onTap={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        listening={true}
        perfectDrawEnabled={false}
        shadowForStrokeEnabled={false}
      />
      <Text
        x={x}
        y={y + plot.height / 2 - 6}
        width={plot.width}
        text={plot.id}
        fontSize={9}
        fontStyle="bold"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fill="white"
        align="center"
        verticalAlign="middle"
        listening={false}
        perfectDrawEnabled={false}
      />
    </Group>
  );
});

PlotRect.displayName = "PlotRect";

const CemeteryViewer: React.FC<CemeteryViewerProps> = ({ plots, selectedPlot, onPlotClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [scale, setScale] = useState(1);
  const [position] = useState({ x: 32, y: 32 });

  // ── Zoom / drag state (commented out — view is locked) ──────────────────
  // const [scale, setScale] = useState(1);
  // const [position, setPosition] = useState({ x: 24, y: 16 });
  // const [initialScale, setInitialScale] = useState(1);
  // const stageRef = useRef<Konva.Stage>(null);
  // const [hintVisible, setHintVisible] = useState(true);
  // const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Auto-hide hint (commented out — no zoom hint needed) ────────────────
  // useEffect(() => {
  //   hintTimerRef.current = setTimeout(() => setHintVisible(false), 3000);
  //   return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
  // }, []);
  // const handleMouseEnter = () => {
  //   if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
  //   setHintVisible(true);
  //   hintTimerRef.current = setTimeout(() => setHintVisible(false), 2000);
  // };

  // Memoize plot bounds calculation
  const plotBounds = useMemo(() => {
    if (!plots.length) {
      return { offsetX: 0, offsetY: 0, width: BASE_WIDTH, height: BASE_HEIGHT };
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    plots.forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x + p.width);
      maxY = Math.max(maxY, p.y + p.height);
    });
    return {
      offsetX: -minX,
      offsetY: -minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }, [plots]);

  // Resize handler — fits the entire layout to the container width, locked
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const pad = 64; // 32px each side
      const fitScale = (containerWidth - pad) / plotBounds.width;
      const fitHeight = plotBounds.height * fitScale + pad;

      setScale(fitScale);
      setStageSize({ width: containerWidth, height: fitHeight });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [plotBounds]);

  // ── Wheel zoom handler (commented out — view is locked) ─────────────────
  // const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
  //   e.evt.preventDefault();
  //   const stage = stageRef.current;
  //   if (!stage) return;
  //   const oldScale = scale;
  //   const pointer = stage.getPointerPosition();
  //   if (!pointer) return;
  //   const mousePointTo = {
  //     x: (pointer.x - position.x) / oldScale,
  //     y: (pointer.y - position.y) / oldScale,
  //   };
  //   const scaleBy = e.evt.ctrlKey ? 1.05 : 1.1;
  //   const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
  //   const boundedScale = Math.max(initialScale, Math.min(initialScale * 5, newScale));
  //   setScale(boundedScale);
  //   setPosition({
  //     x: pointer.x - mousePointTo.x * boundedScale,
  //     y: pointer.y - mousePointTo.y * boundedScale,
  //   });
  // };

  // Memoize click handlers
  const plotClickHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    plots.forEach((plot) => {
      handlers[plot.id] = () => onPlotClick(plot);
    });
    return handlers;
  }, [plots, onPlotClick]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        background: "#f3f2f1",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Zoom hint (commented out — view is locked) */}
      {/* <div style={{ position: "absolute", top: 12, right: 12, ... }}>
        Scroll to zoom · Drag to pan
      </div> */}

      <Stage
        width={stageSize.width}
        height={stageSize.height}
        // ── Drag disabled ──────────────────────────────────────────────────
        // draggable
        // onDragEnd={(e) => { setPosition({ x: e.target.x(), y: e.target.y() }); }}
        // ── Wheel zoom disabled ────────────────────────────────────────────
        // onWheel={handleWheel}
        x={position.x}
        y={position.y}
        scaleX={scale}
        scaleY={scale}
        style={{ cursor: "default" }}
      >
        <Layer imageSmoothingEnabled={true} pixelRatio={window.devicePixelRatio || 2}>
          {plots.map((plot) => (
            <PlotRect
              key={plot.id}
              plot={plot}
              offsetX={plotBounds.offsetX}
              offsetY={plotBounds.offsetY}
              isSelected={selectedPlot?.id === plot.id}
              onClick={plotClickHandlers[plot.id]}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default React.memo(CemeteryViewer);
