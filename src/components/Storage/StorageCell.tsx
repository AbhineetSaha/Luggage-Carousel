import type { Luggage } from "../../types/luggage";

/**
 * Props for the StorageCell component
 */
type Props = {
  id: string;
  luggage: Luggage | null;
  isPriority: boolean;
  onDrop: (cellId: string) => void;
};

const StorageCell = ({ id, luggage, isPriority, onDrop }: Props) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(id);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        relative w-32 h-32 rounded transition-colors
        ${
          isPriority
            ? "border-2 border-dashed border-orange-400 bg-orange-50"
            : "border-2 border-gray-300 bg-gray-50"
        }
        ${luggage ? "" : "hover:border-blue-400 hover:bg-blue-50"}
      `}
    >
      {luggage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded shadow"></div>
        </div>
      )}
      {!luggage && isPriority && (
        <div className="absolute inset-0 flex items-center justify-center text-orange-400 text-xs font-medium pointer-events-none">
          PRIORITY
        </div>
      )}
    </div>
  );
};

export default StorageCell;
