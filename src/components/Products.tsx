"use client";
import React from "react";
import getStarRating from "./logic/Rating";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/shopCo";
// import toast, { Toaster } from "react-hot-toast";

const Product = ({ product }: any) => {
  // const dispatch = useDispatch();
  console.log(product);

  if (!product) {
    return <div>No product data available</div>;
  }
  return (
    <div className="place-self-center flex flex-col gap-1 items-center pb-3 rounded-xl  border-2   ">
      <div className=" rounded-lg relative w-[260px] h-[260px] group">
        <div
          className="absolute w-full h-full  "
          style={{
            background: `url(${
              product.images && product.images[0]
                ? urlFor(product.images[0]).url()
                : "/Images/default-image.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Link href={`/product/${product?.slug?.current}`}>
            <div className="overlay absolute top-0 rounded-t-lg  left-0 right-0 w-full h-full bg-[#000] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-10 flex-col justify-end text-black">
              {/* <button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(
                  `${product?.title?.substring(0, 8)}... added to cart`
                );
              }}
              className="text-sm font-Satoshi relative py-2 rounded-b-lg bg-black text-white"
            >
              Add to Cart
            </button> */}
            </div>
          </Link>
        </div>
      </div>
      <Link href={`/product/${product?.slug?.current}`}>
        <h5 className="text-sm text-black mt-4 mb-1 hover:text-gray-500 font-Poppins font-bold">
          {product.title ? product.title.toUpperCase() : "Default Title"}
        </h5>
      </Link>
      <div className="flex flex-row justify-start items-center gap-3">
        <span>
          {product.ratings ? getStarRating(product.ratings) : "No Ratings"}
        </span>
        <span className="flex justify-center items-center text-[16px]">
          <p>{product.ratings ?? "N/A"}</p>
          <p className="opacity-50">/5</p>
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-[18px] md:text-[24px] font-Satoshi">{`$ ${
          product.price ? product.price.toString().substring(0, 10) : "N/A"
        }`}</p>
        {product.oldprice !== undefined && product.oldprice !== 0 && (
          <p className="text-[18px] md:text-[24px] text-black font-Satoshi line-through opacity-50">{`${
            product.oldprice ? product.oldprice : "N/A"
          }`}</p>
        )}
        {product.oldprice !== undefined && product.oldprice > 0 && (
          <div className="text-[#DB4444] px-3 bg-[#FF33331A] rounded-full flex items-center justify-center text-[12px] font-Satoshi">
            {`-${
              product.oldprice
                ? Math.round(
                    ((product.oldprice - product.price) / product.oldprice) *
                      100
                  )
                : 0
            }%`}
          </div>
        )}
      </div>
      {/* <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            fontSize: "16px",
            fontFamily: "poppins",
          },
        }}
      /> */}
    </div>
  );
};

export default Product;
