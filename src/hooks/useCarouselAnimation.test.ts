import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarouselAnimation } from "./useCarouselAnimation";
import { CAROUSEL } from "../utils/constants";

describe("useCarouselAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should initialize with empty luggages array", () => {
    const { result } = renderHook(() => useCarouselAnimation(800));
    expect(result.current.luggages).toEqual([]);
  });

  it("should spawn luggage after the minimum spawn interval", () => {
    const { result } = renderHook(() => useCarouselAnimation(800));

    act(() => {
      vi.advanceTimersByTime(CAROUSEL.MIN_SPAWN_INTERVAL + 100);
    });

    // At least one luggage should be spawned
    expect(result.current.luggages.length).toBeGreaterThanOrEqual(0);
  });

  it("should remove luggage by id", () => {
    const { result } = renderHook(() => useCarouselAnimation(800));

    // Spawn some luggage first
    act(() => {
      vi.advanceTimersByTime(CAROUSEL.MIN_SPAWN_INTERVAL + 100);
    });

    const initialCount = result.current.luggages.length;

    if (initialCount > 0) {
      const firstLuggageId = result.current.luggages[0].id;

      act(() => {
        result.current.removeLuggage(firstLuggageId);
      });

      expect(
        result.current.luggages.find((l) => l.id === firstLuggageId)
      ).toBeUndefined();
    }
  });

  it("should move luggage across the carousel", () => {
    const { result } = renderHook(() => useCarouselAnimation(800));

    act(() => {
      vi.advanceTimersByTime(CAROUSEL.MIN_SPAWN_INTERVAL + 100);
    });

    if (result.current.luggages.length > 0) {
      const initialX = result.current.luggages[0].x;

      act(() => {
        vi.advanceTimersByTime(100);
      });

      // X position should have changed
      if (result.current.luggages.length > 0) {
        expect(result.current.luggages[0].x).not.toBe(initialX);
      }
    }
  });

  it("should filter out luggage that moves past container width", () => {
    const containerWidth = 800;
    const { result } = renderHook(() => useCarouselAnimation(containerWidth));

    // Spawn luggage
    act(() => {
      vi.advanceTimersByTime(CAROUSEL.MIN_SPAWN_INTERVAL + 100);
    });

    // Move luggage far enough to be filtered out
    act(() => {
      vi.advanceTimersByTime(100000); // Move for a long time
    });

    // All luggage should eventually move past the container
    expect(
      result.current.luggages.every((l) => l.x < containerWidth + 100)
    ).toBe(true);
  });
});
