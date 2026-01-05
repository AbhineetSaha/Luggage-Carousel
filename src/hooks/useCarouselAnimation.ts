import { useEffect, useRef, useState } from "react";
import type { Luggage } from "../types/luggage";
import { CAROUSEL } from "../utils/constants";

let idCounter = 0;

/**
 * Hook for managing carousel animation and luggage spawning
 * @param containerWidth - Width of the carousel container
 * @returns Object containing luggages array and removeLuggage function
 */
export const useCarouselAnimation = (containerWidth: number) => {
  const [luggages, setLuggages] = useState<Luggage[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastSpawnTimeRef = useRef(0);
  const nextSpawnDelayRef = useRef(
    Math.random() *
      (CAROUSEL.MAX_SPAWN_INTERVAL - CAROUSEL.MIN_SPAWN_INTERVAL) +
      CAROUSEL.MIN_SPAWN_INTERVAL
  );
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      // Spawn new luggage at random intervals
      if (timestamp - lastSpawnTimeRef.current > nextSpawnDelayRef.current) {
        setLuggages((prev) => {
          // Check if there's enough space from the last spawned luggage
          const lastLuggage = prev.length > 0 ? prev[prev.length - 1] : null;
          const spawnPosition = -CAROUSEL.LUGGAGE_WIDTH - 20;

          // Only spawn if there's no luggage or the last luggage has moved far enough
          if (
            !lastLuggage ||
            lastLuggage.x > spawnPosition + CAROUSEL.MIN_SPACING
          ) {
            const newLuggage: Luggage = {
              id: `luggage-${++idCounter}`,
              x: spawnPosition,
            };
            lastSpawnTimeRef.current = timestamp;
            // Set a new random interval for the next spawn
            nextSpawnDelayRef.current =
              Math.random() *
                (CAROUSEL.MAX_SPAWN_INTERVAL - CAROUSEL.MIN_SPAWN_INTERVAL) +
              CAROUSEL.MIN_SPAWN_INTERVAL;
            return [...prev, newLuggage];
          }

          return prev;
        });
      }

      // Move luggage (always continue moving, unless prefers-reduced-motion)
      if (!prefersReducedMotion) {
        setLuggages((prev) =>
          prev
            .map((luggage) => ({
              ...luggage,
              x: luggage.x + CAROUSEL.SPEED,
            }))
            .filter((luggage) => luggage.x < containerWidth + 100)
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerWidth, prefersReducedMotion]);

  const removeLuggage = (id: string) => {
    setLuggages((prev) => prev.filter((luggage) => luggage.id !== id));
  };

  return { luggages, removeLuggage };
};
