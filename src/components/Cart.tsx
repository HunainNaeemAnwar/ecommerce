"use client";
import React from "react";
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

const Cart: React.FC = () => {
  const productData = useSelector((state: RootState) => state.shop.productData);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = productData.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 place-items-center py-10">
      {/* Cart Items */}
      <div className="mx-auto flex-col py-10 mt-8 w-full md:w-3/4">
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
                  className="grid grid-cols-3 gap-6 p-4 border rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 relative border rounded-md col-span-1">
                    <Image
                      src={urlFor(item.images[0]).url()}
                      layout="fill"
                      alt={String(item.title || "")}
                      className="absolute rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-2 col-span-1 font-Satoshi">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">{`$${item.price.toFixed(2)}`}</p>
                    {/* Selected Color */}
                    <div className="flex items-center">
                      <span>Color:</span>
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
                    <p>Size: {item.selectedSize}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col justify-between items-end col-span-1">
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
                        <FaMinus />
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
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center font-Satoshi">
            <p>No Products Available</p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-4 font-Satoshi border-2 rounded-md px-6 py-4 w-full md:w-2/3 lg:w-1/2">
        <h2 className="font-bold text-2xl">Order Summary</h2>
        <div className="flex justify-between text-base ">
          <p className="opacity-60">Subtotal</p>
          <p>{`$${subtotal.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between text-base">
          <p className="opacity-60">Discount (10%)</p>
          <p>{`$${((subtotal * 10) / 100).toFixed(2)}`}</p>
        </div>
        {/* Additional fees/taxes can be added here */}
        <div className="flex justify-between text-base font-semibold">
          <p className="opacity-60">Total</p>
          <p>{`$${(subtotal - (subtotal * 10) / 100).toFixed(2)}`}</p>
        </div>
        {/* Coupon Code Input */}
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border rounded-l-full focus:outline-none"
          />
          <button className="px-6 py-2 bg-black text-white rounded-r-full">
            Apply
          </button>
        </div>
        {/* Checkout Button */}
        <button className="mt-4 px-6 py-3 bg-black text-white rounded-full">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
