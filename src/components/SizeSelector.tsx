// SizeSelector.tsx
import React from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  sizeClass: string;
  padding: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
  sizeClass,
  padding,
}) => {
  return (
    <div className={sizeClass}>
      {sizes &&
        sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`${padding} rounded-full text-sm font-medium transition-colors ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
    </div>
  );
};

export default SizeSelector;
