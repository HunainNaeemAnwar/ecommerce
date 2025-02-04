"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const SummerSale = () => {
  const [isVisible, setVisible] = useState<boolean>(true);

  return (
    <div className="absolute top-0 left-0 right-0 w-full">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 h-[38px]" : "opacity-0 h-0"
        } overflow-hidden absolute top-0 left-0 right-0 w-full bg-[#000] text-[#FAFAFA] grid md:grid-cols-8 place-content-center place-items-center`}
      >
        <div className="flex flex-row items-center col-span-7 lg:ml-[100px] xl:ml-[180px]">
          <p className="font-Satoshi text-[13px] md:text-[14px]">
            Sign up and get 20% off to your first order.
            <Link href={"/"} className="underline font-Satoshi pl-1 md:pl-2">
              Sign Up Now
            </Link>
          </p>
        </div>
        <div className="hidden md:flex">
          <button onClick={() => setVisible(false)}>
            <CgClose className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummerSale;
