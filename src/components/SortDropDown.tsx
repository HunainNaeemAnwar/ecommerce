"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type CustomDropdownProps = {
  sortOrder: "latest" | "oldest";
  handleSortChange: (value: "latest" | "oldest") => void;
};

const CustomDropdown = ({
  sortOrder,
  handleSortChange,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: "latest" | "oldest") => {
    handleSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <div
        onClick={toggleDropdown}
        className="bg-[#F0F0F0] px-2 py-2 lg:px-4 lg:py-2 text-[18px] lg:text-sm rounded-full flex justify-center gap-2 lg:gap-4 items-center font-Satoshi cursor-pointer"
      >
        <span>{sortOrder === "latest" ? "Latest" : "Oldest"}</span>
        {/* Dropdown Icon */}
        <span>
          <FaChevronDown className="w-3 h-3" />
        </span>
      </div>

      {/* Dropdown Options with Animation */}
      <ul
        className={`absolute left-0 w-full bg-[#F0F0F0] text-[18px] lg:text-sm rounded-xl shadow-md mt-1 z-10 font-Satoshi transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-4"
        }`}
      >
        <li
          onClick={() => handleOptionClick("latest")}
          className="px-2 py-2 lg:px-4 lg:py-2 cursor-pointer text-[18px] lg:text-sm rounded-md hover:bg-gray-300 "
        >
          Latest
        </li>
        <li
          onClick={() => handleOptionClick("oldest")}
          className="px-2 py-2 lg:px-4 lg:py-2 cursor-pointer rounded-md hover:bg-gray-300"
        >
          Oldest
        </li>
      </ul>
    </div>
  );
};

export default CustomDropdown;
