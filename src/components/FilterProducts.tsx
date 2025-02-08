"use client";
import {
  RiArrowDropRightLine,
  RiArrowDropUpLine,
  RiArrowDropDownLine,
} from "react-icons/ri";
import Link from "next/link";
import React, { useState } from "react";
import ColorSelector from "./ColorSelector";
import { Filter } from "lucide-react";
import SizeSelector from "./SizeSelector";
import { CgClose } from "react-icons/cg";

const colors = [
  "Red",
  "Blue",
  "Green",
  "Orange",
  "Pink",
  "Black",
  "White",
  "Gray",
  "Yellow",
  "Purple",
  "Brown",
  "Navy",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const FilterProducts = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [sections, setSections] = useState<{
    category: boolean;
    price: boolean;
    color: boolean;
    size: boolean;
    style: boolean;
  }>({
    category: true,
    price: true,
    color: true,
    size: true,
    style: true,
  });
  const [priceRange, setPriceRange] = useState<number>(20);

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <section className="z-50">
      {/* Filter icon for all screens */}
      {isFilterVisible ? null : (
        <button
          className="absolute right-4 top-[180px] md:top-40 xl:top-36 z-50 rounded-lg flex items-center gap-2 px-4 py-2 bg-black text-white font-Satoshi transition-transform duration-300 hover:scale-105"
          onClick={() => setFilterVisible(!isFilterVisible)}
        >
          <Filter className="w-4 h-4" />
        </button>
      )}

      {/* Background overlay */}
      {isFilterVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30  z-30"></div>
      )}

      {/* Filter menu with Tailwind CSS animation */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-40 p-4 max-h-[80vh] overflow-y-auto transition-transform duration-500 ease-in-out ${isFilterVisible ? "translate-y-0" : "translate-y-full"} md:bottom-auto md:top-0 md:left-0 md:right-auto md:w-1/4 md:translate-y-0 ${isFilterVisible ? "md:translate-x-0" : "md:-translate-x-full"} md:max-h-full`}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 10px;
            border: 2px solid #f1f1f1;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}</style>

        {/* Categories */}
        <div className="flex flex-col gap-4 border-b border-black border-opacity-30 text-sm font-Poppins font-normal">
          <div className="flex flex-row justify-between items-center px-2  py-3 border-t border-b border-black border-opacity-30 cursor-pointer">
            <h3 className="font-Poppins text-xl font-medium tracking-tight">
              Filters
            </h3>
            <CgClose
              className="w-6 h-6 md:w-4 md:h-4 lg:w-5 lg:h-5"
              onClick={() => setFilterVisible(!isFilterVisible)}
            />
          </div>
          {sections.category && (
            <>
              {["TShirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map(
                (item) => (
                  <div
                    className="flex flex-row justify-between px-4 lg:px-6"
                    key={item}
                  >
                    <Link href={"/CategoryPage"}>{item}</Link>
                    <RiArrowDropRightLine className="w-6 h-6" />
                  </div>
                )
              )}
            </>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col text-sm font-Poppins font-normal border-b border-black border-opacity-30 py-4">
          <div
            className="flex justify-between font-Satoshi text-[20px] cursor-pointer"
            onClick={() => toggleSection("price")}
          >
            <p>Price</p>
            {sections.price ? (
              <RiArrowDropUpLine className="w-6 h-6" />
            ) : (
              <RiArrowDropDownLine className="w-6 h-6" />
            )}
          </div>
          {sections.price && (
            <div className="flex flex-col">
              <input
                type="range"
                max={200}
                min={10}
                value={priceRange}
                onChange={handleRangeChange}
                className="appearance-none cursor-pointer w-full h-2 bg-black rounded-lg"
                id="priceRange"
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  background: "black",
                  height: "4px",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />

              <div className="flex flex-row mt-3 justify-evenly">
                <p className="font-semibold">${priceRange}</p>
              </div>
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="text-sm font-Poppins  border-b border-black border-opacity-30 pb-6">
          <div
            className="flex flex-row justify-between text-[20px] font-Satoshi cursor-pointer"
            onClick={() => toggleSection("color")}
          >
            <p>Colors</p>
            {sections.color ? (
              <RiArrowDropUpLine className="w-6 h-6" />
            ) : (
              <RiArrowDropDownLine className="w-6 h-6" />
            )}
          </div>
          {sections.color && (
            <div>
              <ColorSelector
                colors={colors}
                selectedColor={selectedColor || ""}
                onColorSelect={handleColorSelect}
                gridClass="grid grid-cols-8 md:grid-cols-3 xl:grid-cols-4 gap-2 place-content-center place-items-center"
              />
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="flex flex-col border-b border-black border-opacity-30 pb-6 gap-6">
          <div
            className="flex flex-row justify-between text-[20px] font-Satoshi cursor-pointer"
            onClick={() => toggleSection("size")}
          >
            <p>Size</p>
            {sections.size ? (
              <RiArrowDropUpLine className="w-6 h-6" />
            ) : (
              <RiArrowDropDownLine className="w-6 h-6" />
            )}
          </div>
          {sections.size && (
            <div>
              <SizeSelector
                sizes={sizes}
                selectedSize={""}
                onSizeSelect={() => {}}
                sizeClass="grid grid-cols-2 xl:grid-cols-3 gap-2"
                padding="px-4 py-2"
              />
            </div>
          )}
        </div>
        <button className="w-full bg-black text-white py-2 font-Satoshi rounded-full">
          Apply Filter
        </button>
      </div>
    </section>
  );
};

export default FilterProducts;
