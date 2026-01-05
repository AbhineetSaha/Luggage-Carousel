import { useState } from "react";
import type { Luggage } from "../types/luggage";

/**
 * Hook for managing drag and drop state
 * @returns Object containing drag state and handlers
 */
export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLuggage, setDraggedLuggage] = useState<Luggage | null>(null);

  const handleDragStart = (luggage: Luggage) => {
    setIsDragging(true);
    setDraggedLuggage(luggage);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedLuggage(null);
  };

  return {
    isDragging,
    draggedLuggage,
    handleDragStart,
    handleDragEnd,
  };
};
