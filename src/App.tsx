import { useCallback, useState } from "react";
import Carousel from "./components/Carousel/Carousel";
import StorageGrid from "./components/Storage/StorageGrid";
import UnloadButton from "./components/Controls/UnloadButton";
import { useCarouselAnimation } from "./hooks/useCarouselAnimation";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import type { StorageCell, Luggage } from "./types/luggage";

const App = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const { draggedLuggage, handleDragStart, handleDragEnd } = useDragAndDrop();
  const { luggages, removeLuggage } = useCarouselAnimation(containerWidth);

  // Initialize 3x3 storage grid (first row is priority)
  const [storageCells, setStorageCells] = useState<StorageCell[]>(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: `cell-${i}`,
      luggage: null,
      isPriority: i < 3, // First row is priority
    }))
  );

  const handleDrop = useCallback(
    (cellId: string) => {
      if (!draggedLuggage) return;

      setStorageCells((prev) =>
        prev.map((cell) =>
          cell.id === cellId && !cell.luggage
            ? { ...cell, luggage: draggedLuggage, timestamp: Date.now() }
            : cell
        )
      );

      removeLuggage(draggedLuggage.id);
    },
    [draggedLuggage, removeLuggage]
  );

  // LIFO unload logic: Priority row first, then regular rows
  const handleUnload = useCallback(() => {
    setStorageCells((prev) => {
      // First, find priority cells with luggage (LIFO - most recently added first)
      const priorityCellsWithLuggage = prev
        .map((cell, index) => ({ cell, index }))
        .filter(({ cell }) => cell.isPriority && cell.luggage)
        .sort((a, b) => (b.cell.timestamp || 0) - (a.cell.timestamp || 0));

      if (priorityCellsWithLuggage.length > 0) {
        const { index } = priorityCellsWithLuggage[0];
        return prev.map((cell, i) =>
          i === index ? { ...cell, luggage: null, timestamp: undefined } : cell
        );
      }

      // If no priority cells, unload from regular cells (LIFO - most recently added first)
      const regularCellsWithLuggage = prev
        .map((cell, index) => ({ cell, index }))
        .filter(({ cell }) => !cell.isPriority && cell.luggage)
        .sort((a, b) => (b.cell.timestamp || 0) - (a.cell.timestamp || 0));

      if (regularCellsWithLuggage.length > 0) {
        const { index } = regularCellsWithLuggage[0];
        return prev.map((cell, i) =>
          i === index ? { ...cell, luggage: null, timestamp: undefined } : cell
        );
      }

      return prev;
    });
  }, []);

  const hasLuggageInStorage = storageCells.some((cell) => cell.luggage);

  const onLuggageDragStart = useCallback(
    (luggage: Luggage) => {
      handleDragStart(luggage);
    },
    [handleDragStart]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Luggage Carousel
          </h1>
          <p className="text-gray-600 text-lg">
            Drag luggage from the carousel to storage cells
          </p>
        </header>

        <Carousel
          luggages={luggages}
          onDragStart={onLuggageDragStart}
          onDragEnd={handleDragEnd}
          onContainerResize={setContainerWidth}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Storage Area (3×3 Grid)
          </h2>
          <StorageGrid cells={storageCells} onDrop={handleDrop} />
        </div>

        <UnloadButton onUnload={handleUnload} disabled={!hasLuggageInStorage} />
      </div>
    </div>
  );
};

export default App;
