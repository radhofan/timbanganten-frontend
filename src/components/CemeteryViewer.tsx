"use client";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

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

// Memoized individual plot component
const PlotRect = React.memo<{
  plot: Plot;
  offsetX: number;
  offsetY: number;
  isSelected: boolean;
  onClick: () => void;
}>(({ plot, offsetX, offsetY, isSelected, onClick }) => {
  const x = plot.x + offsetX;
  const y = plot.y + offsetY;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={plot.width}
        height={plot.height}
        fill={isSelected ? "#3b82f6" : "#10b981"}
        stroke={isSelected ? "#1d4ed8" : "#059669"}
        strokeWidth={2}
        onClick={onClick}
        onTap={onClick}
        listening={true}
      />
      <Text
        x={x}
        y={y + plot.height / 2 - 6}
        width={plot.width}
        text={plot.id}
        fontSize={10}
        fontStyle="bold"
        fill="white"
        align="center"
        listening={false}
      />
    </Group>
  );
});

PlotRect.displayName = "PlotRect";

const CemeteryViewer: React.FC<CemeteryViewerProps> = ({ plots, selectedPlot, onPlotClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 1400, height: 700 });
  const [image] = useImage("/api/placeholder/1400/700");

  // Memoize plot bounds calculation
  const plotBounds = useMemo(() => {
    if (!plots.length) {
      return { offsetX: 0, offsetY: 0 };
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

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    return {
      offsetX: (BASE_WIDTH - contentWidth) / 2 - minX,
      offsetY: (BASE_HEIGHT - contentHeight) / 2 - minY,
    };
  }, [plots]);

  // Resize handler
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setStageSize({ width, height: width * 0.5 });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Memoize click handlers
  const plotClickHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    plots.forEach((plot) => {
      handlers[plot.id] = () => onPlotClick(plot);
    });
    return handlers;
  }, [plots, onPlotClick]);

  const scaleX = stageSize.width / BASE_WIDTH;
  const scaleY = stageSize.height / BASE_HEIGHT;

  return (
    <div ref={containerRef}>
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer scaleX={scaleX} scaleY={scaleY}>
          {image && (
            <KonvaImage
              image={image}
              width={BASE_WIDTH}
              height={BASE_HEIGHT}
              opacity={0.3}
              listening={false}
            />
          )}
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
