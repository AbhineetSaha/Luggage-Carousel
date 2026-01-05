import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/utils";
import Carousel from "./Carousel";
import type { Luggage } from "../../types/luggage";

describe("Carousel Component", () => {
  const mockLuggages: Luggage[] = [
    { id: "luggage-1", x: 100 },
    { id: "luggage-2", x: 300 },
  ];

  const mockOnDragStart = vi.fn();
  const mockOnDragEnd = vi.fn();
  const mockOnContainerResize = vi.fn();

  it("should render carousel container", () => {
    const { container } = render(
      <Carousel
        luggages={[]}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
        onContainerResize={mockOnContainerResize}
      />
    );

    const carousel = container.querySelector(".relative.w-full.h-32");
    expect(carousel).toBeInTheDocument();
  });

  it("should render all luggage items", () => {
    const { container } = render(
      <Carousel
        luggages={mockLuggages}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
        onContainerResize={mockOnContainerResize}
      />
    );

    const luggageElements = container.querySelectorAll('[draggable="true"]');
    expect(luggageElements.length).toBe(2);
  });

  it("should call onContainerResize on mount", () => {
    render(
      <Carousel
        luggages={[]}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
        onContainerResize={mockOnContainerResize}
      />
    );

    expect(mockOnContainerResize).toHaveBeenCalled();
  });

  it("should render empty carousel when no luggages", () => {
    const { container } = render(
      <Carousel
        luggages={[]}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
        onContainerResize={mockOnContainerResize}
      />
    );

    const luggageElements = container.querySelectorAll('[draggable="true"]');
    expect(luggageElements.length).toBe(0);
  });
});
