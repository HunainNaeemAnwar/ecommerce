"use client";
import Link from "next/link";
import React, { use } from "react";
import { HiBars3 } from "react-icons/hi2";
import Search from "@/components/Search";
import CartIcon from "./CartIcon";
import { BiUserCircle } from "react-icons/bi";
import DropDown from "./DropDown";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const HeaderSection = () => {
  const navLinks = [
    {
      title: "On Sale",
      path: "/sale",
    },
    {
      title: "New Arrivals",
      path: "/arrival",
    },
    {
      title: "Brands",
      path: "/brands",
    },
  ];
  const dropOptions = [
    {
      route: "/casual",
      label: "Casual",
      value: "Casual",
    },
    {
      route: "/gym",
      label: "Gym",
      value: "Gym",
    },
    {
      route: "/party",
      label: "Party",
      value: "Party",
    },
    {
      route: "/formal",
      label: "Formal",
      value: "Formal",
    },
  ];
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
    <nav className="relative top-8 w-full py-4 z-30 flex justify-center items-center bg-white border-b-2 border-[#F2F0F1]">
      <div className="w-full lg:px-6 xl:px-20 flex justify-between px-2  gap-1 items-center sm:gap-4 xl:gap-10">
        {/* Hamburger Mobile-menu */}
        <div className="flex items-center justify-center gap-3">
          <div className="md:hidden block z-50 mt-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <HiBars3 className="text-black w-7 h-7" />
            </button>
            <div
              className={`absolute top-0 left-0 w-full bg-white p-12 rounded-lg shadow-lg z-50 transition-transform duration-500 transform ${isOpen ? "translate-y-0" : "translate-y-[-116%]"}`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-2 top-7"
              >
                <HiBars3 className="text-black w-7 h-7" />
              </button>
              <ul className="flex flex-col items-center gap-10">
                {dropOptions.length > 0 && (
                  <li className="absolute right-2 sm:right-4 top-12">
                    <DropDown
                      onClick={() => setIsOpen(false)}
                      DropDownOptions={dropOptions}
                    />
                  </li>
                )}
                {navLinks.length > 0 ? (
                  navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-black hover:text-opacity-40"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-black">No Navigation Links Available</li>
                )}
              </ul>
            </div>
          </div>
          {/* Desktop Navbar */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-Integral">
            <Link href={"/"}>Shop.co</Link>
          </h2>
        </div>
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex justify-center items-center gap-5 font-Satoshi text-sm">
          {dropOptions.length > 0 && (
            <li className="w-26 lg:w-28">
              <DropDown
                onClick={() => setIsOpen(false)}
                DropDownOptions={dropOptions}
              />
            </li>
          )}
          {navLinks.length > 0 ? (
            navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-black hover:text-opacity-55"
                >
                  {link.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-black">No Navigation Links Available</li>
          )}
        </ul>

        {/* Icons and Cart */}
        <div className="flex justify-center items-center gap-1 sm:gap-2 lg:gap-3">
          <Search />
          <Link href={"/cart-page"}>
            <CartIcon />
          </Link>
          <button
            onClick={() => {
              !session?.user
                ? signIn()
                : toast.error("You are already logged in");
            }}
            className={`rounded-full bg-[#F2F0F1]  ${session?.user ? "p-0" : "p-2"} text-black hover:text-opacity-55`}
          >
            {session?.user ? (
              <Image
                src={session?.user?.image!}
                alt="user image"
                width={43}
                height={43}
                className="rounded-full"
              />
            ) : (
              <BiUserCircle className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />
    </nav>
  );
};

export default HeaderSection;
