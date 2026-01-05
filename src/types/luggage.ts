/**
 * Represents a single luggage item on the carousel
 */
export type Luggage = {
  id: string;
  x: number;
};

/**
 * Represents a storage cell in the 3x3 grid
 */
export type StorageCell = {
  id: string;
  luggage: Luggage | null;
  isPriority: boolean;
  timestamp?: number; // Track when luggage was added for LIFO
};
