import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test/utils";
import StorageGrid from "./StorageGrid";
import type { StorageCell } from "../../types/luggage";

describe("StorageGrid Component", () => {
  const mockCells: StorageCell[] = Array.from({ length: 9 }, (_, i) => ({
    id: `cell-${i}`,
    luggage: null,
    isPriority: i < 3,
  }));

  const mockOnDrop = vi.fn();

  it("should render all storage cells", () => {
    const { container } = render(
      <StorageGrid cells={mockCells} onDrop={mockOnDrop} />
    );

    // Should render 9 cells
    const cells = container.querySelectorAll(".relative.w-32.h-32");
    expect(cells.length).toBe(9);
  });

  it("should render priority cells correctly", () => {
    render(<StorageGrid cells={mockCells} onDrop={mockOnDrop} />);

    const priorityCells = screen.getAllByText("PRIORITY");
    // First 3 cells should show PRIORITY text
    expect(priorityCells.length).toBe(3);
  });

  it("should render regular cells correctly", () => {
    const { container } = render(
      <StorageGrid cells={mockCells} onDrop={mockOnDrop} />
    );

    const cells = container.querySelectorAll(".relative.w-32.h-32");
    // Should have 9 total cells
    expect(cells.length).toBe(9);
    // Regular cells have gray border
    const regularCells = container.querySelectorAll(".border-gray-300");
    expect(regularCells.length).toBe(6);
  });

  it("should render cells with luggage", () => {
    const cellsWithLuggage: StorageCell[] = [
      { id: "cell-0", luggage: { id: "luggage-1", x: 100 }, isPriority: true },
      ...mockCells.slice(1),
    ];

    const { container } = render(
      <StorageGrid cells={cellsWithLuggage} onDrop={mockOnDrop} />
    );

    // First cell should show a blue luggage box
    const luggageBoxes = container.querySelectorAll(".bg-blue-600");
    expect(luggageBoxes.length).toBe(1);
  });

  it("should render grid with 3 columns", () => {
    const { container } = render(
      <StorageGrid cells={mockCells} onDrop={mockOnDrop} />
    );

    const grid = container.querySelector(".grid-cols-3");
    expect(grid).toBeInTheDocument();
  });
});
