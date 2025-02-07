"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/shopCo";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const [buttonText, setButtonText] = React.useState("Proceed to checkout");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const productData = useSelector((state: RootState) => state.shop.productData);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // Calculate subtotal
  const subtotal = productData.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can access all form values
  };
  const formData = {
    address,
    postalCode,
    city,
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const createCheckout = async () => {
    setButtonText("Redirecting...");
    if (session?.user) {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: productData,
          email: session?.user?.email,
          address: formData.address,
          postalCode: formData.postalCode,
          city: formData.city,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        stripe?.redirectToCheckout({ sessionId: data.id });
      }
    } else toast.error("Please sign in to continue with your checkout");
  };
  const handleButtonClick = () => {
    if (!postalCode.trim() || !city.trim() || !address.trim()) {
      Swal.fire({
        title:
          '<h2 class="text-2xl font-Integral font-bold text-white">Alert</h2>',
        html: `
          <p class=" text-sm md:text-base lg:text-lg font-Satoshi leading-5 text-[#878787]">
            Please fill in  PostalCode , City  and  Address before proceeding.
          </p>
        `,
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-black shadow-lg rounded-lg p-6", // Popup styling
          confirmButton:
            "bg-gray-600 hover:bg-gray-700 transition-all duration-200 transform scale-110 text-white font-bold font-Poppins py-2 px-4 rounded",
          cancelButton:
            "bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded",
        },
      });

      return;
    }
    createCheckout();
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-10 py-12 min-h-screen place-items-center ">
      {/* Cart Items */}
      <div className=" flex-col px-2 mb-4  mt-8 w-full sm:w-3/4">
        {productData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {productData.map(
              (item: {
                _id: any;
                selectedColor: string;
                selectedSize:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined;
                images: SanityImageSource[];
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement
                  | Iterable<React.ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                price: number;
                quantity:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | Iterable<React.ReactNode>
                  | null
                  | undefined;
              }) => (
                <div
                  key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex flex-row justify-between  items-center    border p-2 rounded-lg"
                >
                  <div className="flex justify-center  sm:gap-2 relative items-center   ">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative border rounded-md ">
                      <Image
                        src={urlFor(item.images[0]).url()}
                        layout="fill"
                        alt={String(item.title || "")}
                        className="absolute rounded-md w-full h-full"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col absolute top-0 bottom-0 w-[250px] overflow-hidden left-[110px] sm:left-4  text-[16px] sm:relative sm:text-sm font-Poppins ">
                      <h2 className="text-sm font-semibold leading-4  ">
                        {item.title}
                      </h2>
                      <p className=" opacity-70">{`$${item.price.toFixed(2)}`}</p>
                      {/* Selected Color */}
                      <div className="flex items-center ">
                        <span className="opacity-70">Color:</span>
                        <div
                          className="w-5 h-5 rounded-full ml-2 border"
                          style={{
                            backgroundColor: item.selectedColor,
                            borderColor:
                              item.selectedColor === "#ffffff"
                                ? "#ccc"
                                : "transparent",
                          }}
                        ></div>
                      </div>
                      {/* Selected Size */}
                      <p className="opacity-70">Size: {item.selectedSize}</p>
                    </div>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex  flex-col items-end  gap-10 ">
                    <button
                      onClick={() =>
                        dispatch(
                          deleteProduct({
                            _id: item._id,
                            selectedColor: item.selectedColor,
                            selectedSize: String(item.selectedSize),
                          })
                        )
                      }
                    >
                      <TrashIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            decreaseQuantity({
                              _id: item._id,
                              selectedColor: item.selectedColor,
                              selectedSize: String(item.selectedSize),
                            })
                          )
                        }
                        className="p-1 border rounded-full hover:bg-gray-200"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            increaseQuantity({
                              _id: item._id,
                              selectedColor: item.selectedColor,
                              selectedSize: String(item.selectedSize),
                            })
                          )
                        }
                        className="p-1 border rounded-full hover:bg-gray-200"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 font-Satoshi">
            <p>No Products Available</p>
          </div>
        )}
      </div>
      {/* Order Summary */}
      <div className=" font-Poppins  mt-6 flex flex-col  items-center border-2 relative w-[85%] md:w-full  h-[650px]  md:mr-6 mb-6   rounded-md  py-4  ">
        <h2 className="font-bold text-2xl mb-4 text-center leading-5 ">
          Order Summary
        </h2>
        <div className="flex justify-center xl:gap-[290px] lg:gap-[160px] gap-[100px] text-[16px] sm:text-sm w-full absolute top-[60px]">
          <p className="opacity-60">Subtotal</p>
          <p>{`$${subtotal.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-center xl:gap-[248px] lg:gap-[118px] gap-[58px] text-[16px] sm:text-sm w-full absolute top-[90px]">
          <p className="opacity-60">Discount (0%)</p>
          {/* Discount Logic */}
          {/* <p>{`$${((subtotal * 10) / 100).toFixed(2)}`}</p> */}
          <p>{`$${0}`}</p>
        </div>
        {/* Additional fees/taxes can be added here */}
        <div className="flex justify-center xl:gap-[310px] lg:gap-[180px] gap-[120px] text-[16px] sm:text-sm font-semibold w-full absolute top-[120px]">
          <p className="opacity-60">Total</p>
          {/* Total Logic */}
          {/* <p>{`$${(subtotal - (subtotal * 10) / 100).toFixed(2)}`}</p> */}
          <p>{`$${subtotal.toFixed(2)}`}</p>
        </div>
        {/* Coupon Code Input */}
        <div className="flex items-center mt-4 w-[90%] absolute top-32">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border text-[16px]  w-full sm:text-sm rounded-l-full focus:outline-none"
          />
          <button className="px-6 py-2 bg-black text-[16px] sm:text-sm text-white rounded-r-full">
            Apply
          </button>
        </div>
        <form className="w-full absolute  flex flex-col gap-3 justify-center p-4 top-48 rounded-lg space-y-4">
          <div>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="Your Address"
              onChange={(e) => setAddress(e.target.value)}
              required
              className="flex px-5 py-2 border text-[16px]  w-full sm:text-sm rounded-full focus:outline-none "
            />
          </div>
          <div>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              placeholder="Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="flex px-5 py-2 border text-[16px]  w-full sm:text-sm rounded-full focus:outline-none"
            />
          </div>{" "}
          <div>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              placeholder="Your City"
              onChange={(e) => setCity(e.target.value)}
              required
              className="flex px-5 py-2 border text-[16px]  w-full sm:text-sm rounded-full focus:outline-none"
            />
          </div>
        </form>
        {/* Checkout Button */}
        <button
          onClick={handleButtonClick}
          className="mt-4 px-6 py-2 z-50 text-[16px] sm:text-sm bg-black text-white rounded-full w-[90%] absolute top-[550px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Cart;
