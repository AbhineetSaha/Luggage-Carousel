export type Luggage = {
  id: string;
};

export type StorageCell = {
  id: string;
  isPriority: boolean;
  stack: Luggage[];
};
