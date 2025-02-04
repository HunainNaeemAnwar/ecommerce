import React from "react";
import { ProductProps } from "@/types";
import Product from "@/components/Products";
import Link from "next/link";

interface Props {
  productData: ProductProps[];
}

const Arrival = ({ productData }: Props) => {
  return (
    <section className=" flex flex-col gap-10 mt-[60px] border-b  border-black border-opacity-30 py-10  w-full lg:px-[30px] mb-20 ">
      <div className=" flex justify-center items-center text-[36px] lg:text-[48px] font-Integral text-black">
        <p>TOP SELLING</p>
      </div>
      {productData && productData.length > 0 ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 pt-10 lg:gap-x-6 ">
          {productData.map((item: ProductProps) => (
            <div key={item._id} className="px-2">
              <Product product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center text-[24px] text-gray-600">
          No products available
        </div>
      )}
      <div className="flex items-center justify-center  xl:mt-20 opacity-95  ">
        <div className=" border-2 border-black py-1 rounded-full hover:bg-black hover:text-white">
          <Link
            href={"/top-selling"}
            className=" text-[16px] font-Poppins font-medium py-3 px-12  "
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Arrival;
