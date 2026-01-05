import { useEffect, useRef } from "react";
import LuggageItem from "./LuggageItem";
import type { Luggage } from "../../types/luggage";

/**
 * Props for the Carousel component
 */
type Props = {
  luggages: Luggage[];
  onDragStart: (luggage: Luggage) => void;
  onDragEnd: () => void;
  onContainerResize: (width: number) => void;
};

const Carousel = ({
  luggages,
  onDragStart,
  onDragEnd,
  onContainerResize,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      onContainerResize(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        onContainerResize(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onContainerResize]);

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      <div
        ref={containerRef}
        className="relative w-full h-32 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300
                   border-4 border-gray-800 rounded-xl overflow-hidden shadow-lg"
      >
        {/* Conveyor belt pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)",
            }}
          />
        </div>

        {luggages.map((luggage) => (
          <LuggageItem
            key={luggage.id}
            luggage={luggage}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
