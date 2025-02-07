"use client";

import { CheckCircle2Icon } from "lucide-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { resetCart } from "@/redux/shopCo";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation"; // Import this hook to safely access search params

const Success = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams(); // This hook will give you access to search params

  useEffect(() => {
    if (!searchParams.get("session_id")) {
      redirect("/"); // If session_id is not found, redirect to the home page
    } else {
      dispatch(resetCart()); // If session_id exists, reset the cart
    }
  }, [searchParams, dispatch]); // Add searchParams and dispatch to the dependency array

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      {/* Animated Success Icon */}
      <div className="animate-pulse stroke-none text-green-700 rounded-full">
        <CheckCircle2Icon className="w-20 h-20" />
      </div>

      {/* Success Message */}
      <p className="text-lg sm:text-xl text-center text-black font-medium font-Poppins py-6 w-[350px] lg:w-[700px] rounded-2xl mt-6">
        Payment Accepted! Thank You for Shopping with{" "}
        <span className="text-gray-500">ShopCo</span>
      </p>

      <Link
        href="/"
        className="bg-black hover:bg-opacity-100 transform transition-all duration-500 hover:scale-105 rounded-full bg-opacity-75 py-2 px-4 text-white font-Satoshi"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
