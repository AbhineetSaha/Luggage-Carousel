/**
 * Props for the UnloadButton component
 */
type Props = {
  onUnload: () => void;
  disabled: boolean;
};

const UnloadButton = ({ onUnload, disabled }: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 flex justify-center">
      <button
        onClick={onUnload}
        disabled={disabled}
        className={`
          px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200
          ${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-lg hover:shadow-xl"
          }
        `}
      >
        Unload Storage
      </button>
    </div>
  );
};

export default UnloadButton;
