"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropDown = ({
  DropDownOptions,
  onClick,
}: {
  DropDownOptions: { route?: string; label: string; value: string }[];
  onClick: () => void;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Shop");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: { route?: string; label: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (option.route) {
      router.push(option.route);
      onClick();
    } else {
      console.warn("Router is not available");
    }
  };

  return (
    <div className="relative flex bg-slate-700 text-left w-[110px] lg:w-[130px] items-center justify-center font-Satoshi">
      <button
        onClick={toggleDropdown}
        className="absolute flex justify-center w-full py-2 text-sm border md:border-none font-Satoshi bg-white rounded-md hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex justify-center items-center ml-3">
          {selectedOption}
          {!isOpen ? (
            <RiArrowDropDownLine className="w-6 h-6" />
          ) : (
            <RiArrowDropDownLine className="w-6 h-6 transform rotate-180" />
          )}
        </div>
      </button>

      {/* Dropdown content with Tailwind CSS transitions */}
      <div
        className={`absolute top-8 left-0 right-0 w-full bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] pointer-events-none"
        }`}
      >
        <div className="py-1">
          {DropDownOptions.map((options) => (
            <button
              key={options.value}
              onClick={() => handleOptionSelect(options)}
              className="block w-full px-4 py-2 text-sm  text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            >
              {options.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
