"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const { productData } = useSelector((state: any) => state.shop);

  return (
    <div className="relative inline-block">
      {/* Cart Icon */}
      <button className="text-2xl border-none bg-none cursor-pointer rounded-full bg-[#F2F0F1] p-2 text-black hover:text-opacity-55">
        <ShoppingCart className="lg:w-5 lg:h-5 w-4 h-4" />
      </button>

      {/* Badge to show number of items */}
      {productData && productData.length > 0 && (
        <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {productData.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
