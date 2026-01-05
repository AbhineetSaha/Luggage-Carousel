import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/utils";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LuggageItem from "./LuggageItem";
import type { Luggage } from "../../types/luggage";

describe("LuggageItem Component", () => {
  const mockLuggage: Luggage = {
    id: "luggage-1",
    x: 100,
  };

  const mockOnDragStart = vi.fn();
  const mockOnDragEnd = vi.fn();

  it("should render luggage item", () => {
    const { container } = render(
      <LuggageItem
        luggage={mockLuggage}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );

    const luggageElement = container.querySelector('[draggable="true"]');
    expect(luggageElement).toBeInTheDocument();
  });

  it("should be draggable", () => {
    const { container } = render(
      <LuggageItem
        luggage={mockLuggage}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );

    const luggageElement = container.querySelector('[draggable="true"]');
    expect(luggageElement).toHaveAttribute("draggable", "true");
  });

  it("should call onDragStart when drag starts", () => {
    const { container } = render(
      <LuggageItem
        luggage={mockLuggage}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );

    const luggageElement = container.querySelector(
      '[draggable="true"]'
    ) as HTMLElement;

    const dataTransfer = {
      effectAllowed: "",
      setData: vi.fn(),
      getData: vi.fn(),
    };

    fireEvent.dragStart(luggageElement, { dataTransfer });

    expect(mockOnDragStart).toHaveBeenCalledWith(mockLuggage);
  });

  it("should call onDragEnd when drag ends", () => {
    const { container } = render(
      <LuggageItem
        luggage={mockLuggage}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );

    const luggageElement = container.querySelector(
      '[draggable="true"]'
    ) as HTMLElement;
    fireEvent.dragEnd(luggageElement);

    expect(mockOnDragEnd).toHaveBeenCalled();
  });

  it("should position luggage item based on x coordinate", () => {
    const { container } = render(
      <LuggageItem
        luggage={mockLuggage}
        onDragStart={mockOnDragStart}
        onDragEnd={mockOnDragEnd}
      />
    );

    const luggageElement = container.querySelector(
      '[draggable="true"]'
    ) as HTMLElement;
    expect(luggageElement.style.transform).toContain("translateX(100px)");
  });
});
