// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage, Transformer } from "react-konva";

// Memoized PlotShape component
const PlotShape = React.memo(({ plot, isSelected, onSelect, onDragEnd, onTransformEnd, mode }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = useCallback(
    (e) => {
      onSelect(e.evt.ctrlKey || e.evt.metaKey);
    },
    [onSelect]
  );

  const handleTap = useCallback(() => {
    onSelect(false);
  }, [onSelect]);

  const handleTransformEnd = useCallback(() => {
    const node = shapeRef.current;
    onTransformEnd(node);
  }, [onTransformEnd]);

  const fontSize = useMemo(
    () => Math.min(plot.width, plot.height) * 0.3,
    [plot.width, plot.height]
  );

  const isDraggable = mode === "select" || mode === "multiselect";

  return (
    <>
      <Group
        draggable={isDraggable}
        x={plot.x}
        y={plot.y}
        onClick={handleClick}
        onTap={handleTap}
        onDragEnd={onDragEnd}
        ref={shapeRef}
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
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          onTransformEnd={handleTransformEnd}
        />
      )}
    </>
  );
});

PlotShape.displayName = "PlotShape";

const CemeteryPlotEditor = () => {
  const [plots, setPlots] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
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

  const makamOptions = useMemo(
    () => [
      { code: "KU", name: "dalemKaum", label: "Dalem Kaum - KU" },
      { code: "DK", name: "dayeuhkolot", label: "Dayeuhkolot - DK" },
      { code: "KA", name: "karangAnyar", label: "Karang Anyar - KA" },
    ],
    []
  );

  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const selectionStartRef = useRef(null);

  // Resize handler
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

  // Memoized handlers
  const handleImportCoordinates = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target.result;
          let data;

          try {
            data = JSON.parse(content);
          } catch {
            const arrayMatch = content.match(/=\s*(\[[\s\S]*\]);?/);
            if (arrayMatch) {
              data = eval(arrayMatch[1]);
            } else {
              throw new Error("Could not parse file");
            }
          }

          if (Array.isArray(data) && data.length > 0) {
            const validPlots = data.filter(
              (p) =>
                p.id &&
                typeof p.x === "number" &&
                typeof p.y === "number" &&
                typeof p.width === "number" &&
                typeof p.height === "number"
            );

            if (validPlots.length > 0) {
              setPlots(validPlots);
              setSelectedIds([]);
              alert(`Successfully imported ${validPlots.length} plots!`);
            } else {
              alert("No valid plots found in file");
            }
          } else {
            alert("File does not contain valid plot data");
          }
        } catch (error) {
          alert("Error reading file: " + error.message);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          setBackgroundImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeBackgroundImage = useCallback(() => {
    setBackgroundImage(null);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      const clickedOnEmpty = e.target === e.target.getStage();

      if (mode === "draw") {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        setIsDrawing(true);
        setNewPlot({
          x: pos.x / scale,
          y: pos.y / scale,
          width: 0,
          height: 0,
        });
      } else if (clickedOnEmpty) {
        if (mode === "multiselect") {
          const stage = e.target.getStage();
          const pos = stage.getPointerPosition();
          setIsSelecting(true);
          selectionStartRef.current = { x: pos.x / scale, y: pos.y / scale };
          setSelectionRect({ x: pos.x / scale, y: pos.y / scale, width: 0, height: 0 });
        } else {
          setSelectedIds([]);
        }
      }
    },
    [mode, scale]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDrawing && mode === "draw") {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        setNewPlot((prev) => ({
          ...prev,
          width: pos.x / scale - prev.x,
          height: pos.y / scale - prev.y,
        }));
      } else if (isSelecting && mode === "multiselect") {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        setSelectionRect({
          x: Math.min(selectionStartRef.current.x, pos.x / scale),
          y: Math.min(selectionStartRef.current.y, pos.y / scale),
          width: Math.abs(pos.x / scale - selectionStartRef.current.x),
          height: Math.abs(pos.y / scale - selectionStartRef.current.y),
        });
      }
    },
    [isDrawing, isSelecting, mode, scale]
  );

  const handleMouseUp = useCallback(() => {
    if (isDrawing && newPlot) {
      if (Math.abs(newPlot.width) > 5 && Math.abs(newPlot.height) > 5) {
        const id = plotIdInput || `plot-${plots.length + 1}`;
        const normalizedPlot = {
          id,
          x: newPlot.width < 0 ? newPlot.x + newPlot.width : newPlot.x,
          y: newPlot.height < 0 ? newPlot.y + newPlot.height : newPlot.y,
          width: Math.abs(newPlot.width),
          height: Math.abs(newPlot.height),
        };
        setPlots((prev) => [...prev, normalizedPlot]);
        setPlotIdInput("");
      }
      setIsDrawing(false);
      setNewPlot(null);
    } else if (isSelecting && selectionRect) {
      const selected = plots
        .filter((plot) => {
          const plotCenterX = plot.x + plot.width / 2;
          const plotCenterY = plot.y + plot.height / 2;
          return (
            plotCenterX >= selectionRect.x &&
            plotCenterX <= selectionRect.x + selectionRect.width &&
            plotCenterY >= selectionRect.y &&
            plotCenterY <= selectionRect.y + selectionRect.height
          );
        })
        .map((p) => p.id);
      setSelectedIds(selected);
      setIsSelecting(false);
      setSelectionRect(null);
    }
  }, [isDrawing, isSelecting, newPlot, plotIdInput, plots, selectionRect]);

  // Memoize plot click handlers
  const plotClickHandlers = useMemo(() => {
    const handlers = {};
    plots.forEach((plot) => {
      handlers[plot.id] = (ctrlKey) => {
        if (mode === "multiselect" || ctrlKey) {
          setSelectedIds((prev) =>
            prev.includes(plot.id) ? prev.filter((sid) => sid !== plot.id) : [...prev, plot.id]
          );
        } else {
          setSelectedIds([plot.id]);
        }
      };
    });
    return handlers;
  }, [plots, mode]);

  // Memoize drag end handlers
  const plotDragEndHandlers = useMemo(() => {
    const handlers = {};
    plots.forEach((plot) => {
      handlers[plot.id] = (e) => {
        const dx = e.target.x() / scale - plot.x;
        const dy = e.target.y() / scale - plot.y;

        setPlots((prevPlots) =>
          prevPlots.map((p) => {
            if (selectedIds.includes(p.id)) {
              return {
                ...p,
                x: p.x + dx,
                y: p.y + dy,
              };
            }
            return p;
          })
        );
      };
    });
    return handlers;
  }, [plots, scale, selectedIds]);

  // Memoize transform end handlers
  const plotTransformEndHandlers = useMemo(() => {
    const handlers = {};
    plots.forEach((plot) => {
      handlers[plot.id] = (node) => {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);

        setPlots((prevPlots) =>
          prevPlots.map((p) => {
            if (p.id === plot.id) {
              return {
                ...p,
                x: node.x() / scale,
                y: node.y() / scale,
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY),
              };
            }
            return p;
          })
        );
      };
    });
    return handlers;
  }, [plots, scale]);

  const updateSelectedPlots = useCallback(
    (updates) => {
      setPlots((prevPlots) =>
        prevPlots.map((plot) => {
          if (selectedIds.includes(plot.id)) {
            return { ...plot, ...updates(plot) };
          }
          return plot;
        })
      );
    },
    [selectedIds]
  );

  const moveSelected = useCallback(
    (dx, dy) => {
      updateSelectedPlots((plot) => ({
        x: plot.x + dx,
        y: plot.y + dy,
      }));
    },
    [updateSelectedPlots]
  );

  const setSelectedValue = useCallback(
    (field, value) => {
      if (value === null || value === "") return;
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;

      updateSelectedPlots(() => ({
        [field]: Math.max(field === "width" || field === "height" ? 5 : -Infinity, numValue),
      }));
    },
    [updateSelectedPlots]
  );

  const deletePlot = useCallback(() => {
    if (selectedIds.length > 0) {
      setPlots((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  }, [selectedIds]);

  const selectAll = useCallback(() => {
    setSelectedIds(plots.map((p) => p.id));
  }, [plots]);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const exportData = useCallback(() => {
    const currentMakam = makamOptions.find((m) => m.code === selectedMakam);

    const rounded = plots.map((p) => {
      // Check if the plot ID already has a prefix (contains a dash with letters before it)
      const hasPrefix = /^[A-Z]{2,3}-/.test(p.id);

      return {
        id: hasPrefix ? p.id : `${selectedMakam}-${p.id}`,
        x: Math.round(p.x),
        y: Math.round(p.y),
        width: Math.round(p.width),
        height: Math.round(p.height),
      };
    });

    const formattedPlots = rounded
      .map(
        (p) => `  { id: "${p.id}", x: ${p.x}, y: ${p.y}, width: ${p.width}, height: ${p.height} }`
      )
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

  const clearAll = useCallback(() => {
    if (confirm("Clear all plots?")) {
      setPlots([]);
      setSelectedIds([]);
    }
  }, []);

  const selectedPlots = useMemo(
    () => plots.filter((p) => selectedIds.includes(p.id)),
    [plots, selectedIds]
  );

  // Memoize selected IDs set for faster lookup
  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h1 className="text-3xl font-bold mb-4">Cemetery Plot Layout Editor</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Upload Blueprint</label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {backgroundImage && (
                  <button
                    onClick={removeBackgroundImage}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium whitespace-nowrap"
                    title="Remove background image"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Import Coordinates</label>
              <input
                type="file"
                accept=".js,.json,.txt"
                onChange={handleImportCoordinates}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("select")}
                  className={`px-3 py-2 rounded font-medium text-sm ${mode === "select" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Select
                </button>
                <button
                  onClick={() => setMode("multiselect")}
                  className={`px-3 py-2 rounded font-medium text-sm ${mode === "multiselect" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                >
                  Multi
                </button>
                <button
                  onClick={() => setMode("draw")}
                  className={`px-3 py-2 rounded font-medium text-sm ${mode === "draw" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  Draw
                </button>
              </div>
            </div>

            {mode === "draw" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Plot ID</label>
                <input
                  type="text"
                  value={plotIdInput}
                  onChange={(e) => setPlotIdInput(e.target.value)}
                  placeholder="e.g., 28, 27, 1"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Select Makam</label>
                <select
                  value={selectedMakam}
                  onChange={(e) => setSelectedMakam(e.target.value)}
                  className="w-full px-3 py-2 border rounded font-medium"
                >
                  {makamOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-gray-600 text-white rounded font-medium hover:bg-gray-700 disabled:bg-gray-400"
            >
              Deselect All
            </button>
            <button
              onClick={exportData}
              disabled={plots.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 disabled:bg-gray-400"
            >
              Export Data
            </button>
            <button
              onClick={deletePlot}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 disabled:bg-gray-400"
            >
              Delete ({selectedIds.length})
            </button>
            <button
              onClick={clearAll}
              disabled={plots.length === 0}
              className="px-4 py-2 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 disabled:bg-gray-400"
            >
              Clear All
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm font-medium">Zoom:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{Math.round(scale * 100)}%</span>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="bg-purple-50 p-4 rounded mb-4">
              <h3 className="font-bold mb-3">Selected: {selectedIds.length} plot(s)</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">Position Controls</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveSelected(0, -1)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveSelected(0, 1)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => moveSelected(-1, 0)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => moveSelected(1, 0)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Set X</label>
                  <input
                    type="number"
                    placeholder={
                      selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].x)) : "X"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedValue("x", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Set Y</label>
                  <input
                    type="number"
                    placeholder={
                      selectedPlots.length === 1 ? String(Math.round(selectedPlots[0].y)) : "Y"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedValue("y", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Set Width</label>
                  <input
                    type="number"
                    placeholder={
                      selectedPlots.length === 1
                        ? String(Math.round(selectedPlots[0].width))
                        : "Width"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedValue("width", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Set Height</label>
                  <input
                    type="number"
                    placeholder={
                      selectedPlots.length === 1
                        ? String(Math.round(selectedPlots[0].height))
                        : "Height"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedValue("height", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              {selectedPlots.length === 1 && (
                <div className="mt-3 pt-3 border-t grid grid-cols-4 gap-2 text-sm text-gray-600">
                  <div>X: {Math.round(selectedPlots[0].x)}</div>
                  <div>Y: {Math.round(selectedPlots[0].y)}</div>
                  <div>W: {Math.round(selectedPlots[0].width)}</div>
                  <div>H: {Math.round(selectedPlots[0].height)}</div>
                </div>
              )}
            </div>
          )}

          <div className="bg-gray-100 p-2 rounded text-sm mb-4">
            <strong>Instructions:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>
                <strong>Select Mode:</strong> Click plots, Ctrl+Click to multi-select
              </li>
              <li>
                <strong>Multi Mode:</strong> Drag rectangle to select multiple plots
              </li>
              <li>
                <strong>Draw Mode:</strong> Click and drag to create new plots
              </li>
              <li>
                <strong>Edit Values:</strong> Type value and press Enter to apply
              </li>
              <li>Arrow buttons move plots by 1 pixel</li>
            </ul>
          </div>
        </div>

        <div ref={containerRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                <KonvaImage
                  image={backgroundImage}
                  width={backgroundImage.width}
                  height={backgroundImage.height}
                  opacity={0.5}
                  listening={false}
                />
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
                  x={newPlot.x}
                  y={newPlot.y}
                  width={newPlot.width}
                  height={newPlot.height}
                  fill="rgba(59, 130, 246, 0.3)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dash={[5, 5]}
                  listening={false}
                />
              )}

              {isSelecting && selectionRect && (
                <Rect
                  x={selectionRect.x}
                  y={selectionRect.y}
                  width={selectionRect.width}
                  height={selectionRect.height}
                  fill="rgba(147, 51, 234, 0.1)"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dash={[5, 5]}
                  listening={false}
                />
              )}
            </Layer>
          </Stage>
        </div>

        <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-bold mb-2">Total Plots: {plots.length}</h3>
          <div className="max-h-40 overflow-y-auto">
            <div className="grid grid-cols-8 gap-2">
              {plots.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedIds([p.id])}
                  className={`px-2 py-1 rounded text-sm ${selectedIdsSet.has(p.id) ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CemeteryPlotEditor;
