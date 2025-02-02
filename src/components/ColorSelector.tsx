// ColorSelector.tsx
import React from "react";

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  gridClass:string
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  gridClass,
}) => {
  return (
    <div className={gridClass}>
      {colors.map((colorCode) => (
        <div
          key={colorCode}
          className={`relative w-10 h-10 rounded-full cursor-pointer border ${
            selectedColor === colorCode ? "border-black" : "border-gray-300"
          }`}
          style={{ backgroundColor: colorCode }}
          onClick={() => onColorSelect(colorCode)}
        >
          {selectedColor === colorCode && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
