import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDragAndDrop } from "./useDragAndDrop";
import type { Luggage } from "../types/luggage";

describe("useDragAndDrop", () => {
  const mockLuggage: Luggage = {
    id: "luggage-1",
    x: 100,
  };

  it("should initialize with isDragging false and no draggedLuggage", () => {
    const { result } = renderHook(() => useDragAndDrop());

    expect(result.current.isDragging).toBe(false);
    expect(result.current.draggedLuggage).toBeNull();
  });

  it("should set isDragging to true and store luggage on drag start", () => {
    const { result } = renderHook(() => useDragAndDrop());

    act(() => {
      result.current.handleDragStart(mockLuggage);
    });

    expect(result.current.isDragging).toBe(true);
    expect(result.current.draggedLuggage).toEqual(mockLuggage);
  });

  it("should reset isDragging and draggedLuggage on drag end", () => {
    const { result } = renderHook(() => useDragAndDrop());

    act(() => {
      result.current.handleDragStart(mockLuggage);
    });

    expect(result.current.isDragging).toBe(true);

    act(() => {
      result.current.handleDragEnd();
    });

    expect(result.current.isDragging).toBe(false);
    expect(result.current.draggedLuggage).toBeNull();
  });

  it("should handle multiple drag start/end cycles", () => {
    const { result } = renderHook(() => useDragAndDrop());

    const luggage1: Luggage = { id: "luggage-1", x: 100 };
    const luggage2: Luggage = { id: "luggage-2", x: 200 };

    act(() => {
      result.current.handleDragStart(luggage1);
    });
    expect(result.current.draggedLuggage?.id).toBe("luggage-1");

    act(() => {
      result.current.handleDragEnd();
    });
    expect(result.current.draggedLuggage).toBeNull();

    act(() => {
      result.current.handleDragStart(luggage2);
    });
    expect(result.current.draggedLuggage?.id).toBe("luggage-2");
  });
});
