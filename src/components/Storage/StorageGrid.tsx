import StorageCell from "./StorageCell";
import type { StorageCell as StorageCellType } from "../../types/luggage";

/**
 * Props for the StorageGrid component
 */
type Props = {
  cells: StorageCellType[];
  onDrop: (cellId: string) => void;
};

const StorageGrid = ({ cells, onDrop }: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-3 gap-6 justify-items-center">
        {cells.map((cell) => (
          <StorageCell
            key={cell.id}
            id={cell.id}
            luggage={cell.luggage}
            isPriority={cell.isPriority}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default StorageGrid;
