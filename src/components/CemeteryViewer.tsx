"use client";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";

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
        fill={isSelected ? "#3b82f6" : isHovered ? "#14b8a6" : "#10b981"}
        stroke={isSelected ? "#1d4ed8" : "#059669"}
        strokeWidth={2}
        shadowColor="rgba(0, 0, 0, 0.2)"
        shadowBlur={isHovered ? 8 : 4}
        shadowOffsetX={0}
        shadowOffsetY={2}
        shadowOpacity={0.3}
        cornerRadius={3}
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
        fontSize={10}
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
  const [stageSize, setStageSize] = useState({ width: 1400, height: 700 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState(1);
  const stageRef = useRef<Konva.Stage>(null);

  // Memoize plot bounds calculation
  const plotBounds = useMemo(() => {
    if (!plots.length) {
      return { offsetX: 0, offsetY: 0, width: BASE_WIDTH, height: BASE_HEIGHT };
    }
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

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

  // Resize handler
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth - 48;
      const aspectRatio = plotBounds.height / plotBounds.width;
      const calculatedScale = containerWidth / plotBounds.width;

      setStageSize({
        width: containerWidth,
        height: containerWidth * aspectRatio,
      });
      setInitialScale(calculatedScale);
      setScale(calculatedScale);
      setPosition({ x: 0, y: 0 });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [plotBounds]);

  // Memoize click handlers
  const plotClickHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    plots.forEach((plot) => {
      handlers[plot.id] = () => onPlotClick(plot);
    });
    return handlers;
  }, [plots, onPlotClick]);

  // Handle zoom with mouse wheel
  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = scale;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };

    const scaleBy = e.evt.ctrlKey ? 1.05 : 1.1;
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Limit zoom range relative to initial scale
    const boundedScale = Math.max(initialScale * 0.5, Math.min(initialScale * 5, newScale));

    setScale(boundedScale);
    setPosition({
      x: pointer.x - mousePointTo.x * boundedScale,
      y: pointer.y - mousePointTo.y * boundedScale,
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        background: "#f8fafc",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        padding: "24px",
        position: "relative",
      }}
    >
      {/* Zoom controls indicator */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          right: "32px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          color: "#64748b",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
          fontFamily: "system-ui, -apple-system, sans-serif",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontWeight: "600", marginBottom: "4px" }}>🔍 Zoom Controls</div>
        <div>Scroll to zoom • Drag to pan</div>
      </div>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onWheel={handleWheel}
        draggable
        x={position.x}
        y={position.y}
        scaleX={scale}
        scaleY={scale}
        onDragEnd={(e) => {
          setPosition({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        style={{
          cursor: "grab",
        }}
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
