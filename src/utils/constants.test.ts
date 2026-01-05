import { describe, it, expect } from "vitest";
import { CAROUSEL, STORAGE } from "./constants";

describe("Constants", () => {
  describe("CAROUSEL", () => {
    it("should have valid speed value", () => {
      expect(CAROUSEL.SPEED).toBeGreaterThan(0);
      expect(typeof CAROUSEL.SPEED).toBe("number");
    });

    it("should have valid spawn intervals", () => {
      expect(CAROUSEL.MIN_SPAWN_INTERVAL).toBeGreaterThan(0);
      expect(CAROUSEL.MAX_SPAWN_INTERVAL).toBeGreaterThan(
        CAROUSEL.MIN_SPAWN_INTERVAL
      );
    });

    it("should have valid luggage dimensions", () => {
      expect(CAROUSEL.LUGGAGE_WIDTH).toBeGreaterThan(0);
      expect(CAROUSEL.MIN_SPACING).toBeGreaterThan(0);
    });

    it("should maintain logical spacing relationship", () => {
      expect(CAROUSEL.MIN_SPACING).toBeGreaterThan(CAROUSEL.LUGGAGE_WIDTH);
    });
  });

  describe("STORAGE", () => {
    it("should have valid grid size", () => {
      expect(STORAGE.GRID_SIZE).toBe(9);
      expect(STORAGE.GRID_SIZE).toBeGreaterThan(0);
    });

    it("should have valid grid columns", () => {
      expect(STORAGE.GRID_COLUMNS).toBe(3);
      expect(STORAGE.GRID_SIZE % STORAGE.GRID_COLUMNS).toBe(0);
    });

    it("should have valid priority row size", () => {
      expect(STORAGE.PRIORITY_ROW_SIZE).toBe(3);
      expect(STORAGE.PRIORITY_ROW_SIZE).toBeLessThanOrEqual(STORAGE.GRID_SIZE);
    });

    it("should have priority row equal to grid columns", () => {
      expect(STORAGE.PRIORITY_ROW_SIZE).toBe(STORAGE.GRID_COLUMNS);
    });
  });
});
