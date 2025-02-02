"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shopCo";
import { ProductProps, CartProduct } from "@/types";
import getStarRating from "@/components/logic/Rating";
import ColorSelector from "@/components/ColorSelector";
import SizeSelector from "@/components/SizeSelector";
import Counter from "@/components/Counter";
import Tabs from "@/components/Tabs";
import { urlFor } from "@/sanity/lib/image";
import toast, { Toaster } from "react-hot-toast";

interface ProductDetailsProps {
  productDetails: ProductProps;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productDetails }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    productDetails?.images?.[0]
      ? urlFor(productDetails.images[0]).url()
      : "/Images/default-product.jpg"
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (qty: number) => {
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const productToAdd: CartProduct = {
      ...productDetails,
      selectedColor,
      selectedSize,
      quantity,
    };

    dispatch(addToCart(productToAdd));
    toast.success(`${productDetails?.title || "Product"} added to cart`);
  };

  if (!productDetails) {
    return <div>Product details not available.</div>;
  }

  return (
    <div className="flex flex-col gap-6 mx-auto mt-20">
      {/* Product Details Section */}
      <div className="w-full grid grid-cols-1 py-6 lg:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className=" grid place-content-center">
          {/* Image display logic */}
          <div className="relative w-80 h-80 md:h-96 md:w-96 border-2 border-black rounded-2xl">
            <Image
              src={selectedImage}
              layout="fill"
              alt="Selected Product Image"
              className="absolute rounded-2xl"
            />
          </div>
          {/* Thumbnail Images */}
          {productDetails.images?.length > 0 && (
            <div className="flex flex-row gap-5 mt-4">
              {productDetails.images.map((img, idx) => {
                const imageUrl =
                  urlFor(img)?.url() || "/Images/default-thumbnail.jpg";
                return (
                  <div
                    key={idx}
                    className={`relative w-[80px] h-[80px] md:w-20 md:h-20 cursor-pointer border-2 rounded-md ${
                      selectedImage === imageUrl ? "border-2 border-black" : ""
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      width={300}
                      height={300}
                      alt={`Thumbnail ${idx + 1}`}
                      className="absolute rounded-md w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4 px-6 md:pt-7 lg:pt-20 xl:p-10">
          <div className="font-Integral text-4xl">
            {productDetails.title || "Default Title"}
          </div>
          <div className="flex items-center">
            {productDetails.ratings ? (
              <>
                <span>{getStarRating(productDetails.ratings)}</span>
                <p>{`${productDetails.ratings}/5`}</p>
              </>
            ) : (
              <p>No Ratings Available</p>
            )}
          </div>
          <div className="flex gap-5 items-center justify-start">
            <p className="text-3xl font-medium font-Satoshi">{`$${productDetails.price || "N/A"}`}</p>
            {productDetails.oldprice && (
              <p className="text-3xl font-medium line-through opacity-30 font-Poppins">
                {`$${productDetails.oldprice}`}
              </p>
            )}
            {productDetails.oldprice && (
              <span className="text-lg font-medium font-Satoshi bg-[#FF33331A] text-[#FF3333] px-4 rounded-full">
                {`-${Math.floor(
                  ((productDetails.oldprice - productDetails.price) /
                    productDetails.oldprice) *
                    100
                )}%`}
              </span>
            )}
          </div>
          <div className="font-Satoshi text-sm opacity-70">
            {productDetails.description || "No Description Available"}
          </div>

          <div className="w-full h-[1px] bg-black opacity-30"></div>

          {/* Color Selector */}
          {productDetails.colors && productDetails.colors.length > 0 && (
            <>
              <div className="flex items-center justify-start font-Satoshi opacity-70">
                <p>Select Color</p>
              </div>
              <ColorSelector
                colors={productDetails.colors}
                selectedColor={selectedColor}
                onColorSelect={handleColorSelect}
                gridClass="flex flex-row gap-4 justify-start items-center"
              />
              <div className="w-full h-[1px] bg-black opacity-30"></div>
            </>
          )}

          {/* Size Selector */}
          {productDetails.sizes && productDetails.sizes.length > 0 && (
            <>
              <div className="flex items-center justify-start font-Satoshi opacity-70">
                <p>Choose Size</p>
              </div>
              <SizeSelector
                sizes={productDetails.sizes}
                selectedSize={selectedSize}
                onSizeSelect={handleSizeSelect}
                sizeClass="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-2"
                padding="px-8 py-3"
              />
              <div className="w-full h-[1px] bg-black opacity-30"></div>
            </>
          )}

          {/* Quantity and Add to Cart */}
          <div className="grid grid-cols-[30%_70%] gap-x-2 relative">
            <div className="w-full">
              <Counter quantity={quantity} setQuantity={handleQuantityChange} />
            </div>
            <button
              className="font-Satoshi text-sm bg-black text-white rounded-full w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {productDetails.reviews && productDetails.reviews.length > 0 ? (
        <Tabs
          reviews={productDetails.reviews || []}
          details={
            Array.isArray(productDetails.details) ? productDetails.details : []
          }
          faqs={productDetails.faqs || []}
        />
      ) : (
        <div>No additional information available.</div>
      )}

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
    </div>
  );
};

export default ProductDetails;
