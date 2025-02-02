"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        // Search Icon for Small Screens
        <button
          onClick={toggleExpand}
          className="lg:hidden p-2 rounded-full  bg-[#F2F0F1] text-black hover:text-opacity-55"
        >
          <BiSearch className="w-5 h-5  " />
        </button>
      ) : (
        // Search Form
        <form className="reltive flex items-center bg-[#F2F0F1] rounded-full ">
          <button
            type="button"
            onClick={toggleExpand}
            className="lg:hidden p-2 rounded-full  bg-[#F2F0F1] text-black hover:text-opacity-55   "
          >
            <BiSearch className="w-5 h-5 text-black opacity-30" />
          </button>
          <input
            type="text"
            placeholder="Search for products..."
            className=" md:hidden  absolute top-16 right-2 font-SatoshiRegular rounded-md text-sm bg-[#F2F0F1] focus:outline-none py-2 pr-10 lg:py-2 pl-8 lg:pl-10  text-black"
          />
        </form>
      )}

      {/* Search Form for Larger Screens */}
      <form className="hidden lg:flex items-center bg-[#F2F0F1] rounded-full  lg:pl-10 font-Satoshi">
        <button className="absolute left-3 top-2">
          <BiSearch className="lg:w-5 lg:h-5 w-3 h-3 text-black opacity-30" />
        </button>
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full font-SatoshiRegular text-sm bg-[#F2F0F1] focus:outline-none rounded-full py-2 pl-2 lg:pr-6 xl:pr-10 text-black"
        />
      </form>
    </div>
  );
};

export default Search;
