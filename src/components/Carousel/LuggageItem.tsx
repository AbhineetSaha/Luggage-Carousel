import type { Luggage } from "../../types/luggage";

/**
 * Props for the LuggageItem component
 */
type Props = {
  luggage: Luggage;
  onDragStart: (luggage: Luggage) => void;
  onDragEnd: () => void;
};

const LuggageItem = ({ luggage, onDragStart, onDragEnd }: Props) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", luggage.id);
    onDragStart(luggage);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="absolute w-16 h-16 bg-blue-600 rounded
                 flex items-center justify-center
                 font-bold shadow cursor-grab active:cursor-grabbing
                 hover:bg-blue-700 transition-colors"
      style={{
        transform: `translateX(${luggage.x}px)`,
        top: "50%",
        marginTop: "-32px",
      }}
    ></div>
  );
};

export default LuggageItem;
