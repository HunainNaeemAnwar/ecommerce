"use client";
import { urlFor } from "@/sanity/lib/image";
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/shopCo";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TrashIcon } from "lucide-react";

const CartItems = ({ item }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-3 md:gap-6 p-4">
      <div className="w-20 h-20 relative border rounded-md col-span-1">
        <Image
          src={urlFor(item.images[0]).url()}
          layout="fill"
          alt="img"
          className="absolute rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-1 font-Satoshi">
        <h2>{item?.title}</h2>
        <p>{`$${item?.price}`}</p>
        {item?.selectedColor && (
          <p className="flex items-center">
            Color:
            <span
              style={{
                backgroundColor: item.selectedColor,
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginLeft: "8px",
                border:
                  item.selectedColor === "#ffffff" ? "1px solid #000" : "none",
              }}
            ></span>
          </p>
        )}
        {item?.selectedSize && (
          <p>
            Size: <strong>{item.selectedSize}</strong>
          </p>
        )}
      </div>
      <div className="relative">
        <div className="absolute right-2 top-0">
          <button onClick={() => dispatch(deleteProduct(item._id))}>
            <TrashIcon />
          </button>
        </div>
        <div className="flex justify-between items-center col-span-1 absolute bottom-0 right-2 gap-4">
          <button
            onClick={() =>
              dispatch(
                decreaseQuantity({
                  _id: item?._id,
                  selectedColor: item.selectedColor,
                  selectedSize: item.selectedSize,
                })
              )
            }
          >
            <FaMinus />
          </button>
          <p className="font-Poppins">{item?.quantity}</p>
          <button
            onClick={() =>
              dispatch(
                increaseQuantity({
                  _id: item?._id,
                  selectedColor: item.selectedColor,
                  selectedSize: item.selectedSize,
                })
              )
            }
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
