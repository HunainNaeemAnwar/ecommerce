import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getData() {
  const data = await client.fetch(
    ` *[_type=="heroSection"]{
      title,
      image,
      description
    }`
  );
  return data;
}

const HeroSection = async () => {
  const data = await getData();
  const heroData = data[0] || {};

  return (
    <section className="bg-[#F2F0F1] mt-6">
      <div className="grid grid-cols-1 relative md:grid-cols-12 gap-y-10 xl:gap-y-[90px] lg:gap-y-[110px] md:gap-y-[120px] pb-[120px] md:pb-0 px-6 xl:px-[100px] md:grid-rows-[80%_20%]">
        <div className="col-span-6 md:py-6 lg:py-12 xl:py-16 mt-10 place-self-start text-center sm:text-left">
          <div>
            <h1 className="mb-4 md:mb-2 text-start md:leading-[42px] lg:leading-[64px] text-[50px] leading-[44px] md:text-[50px] lg:text-[56px] xl:text-[60px] font-Integral">
              {heroData.title || "Default Title"}
            </h1>
            <p className="text-[18px] lg:text-[20px] mb-3 md:mb-3 lg:mb-6 leading-[22px] text-start font-Satoshi">
              {heroData.description || "Default Description"}
            </p>
            <div>
              <button className="px-6 lg:px-10 lg:py-3 py-3 w-full sm:w-fit rounded-full bg-black text-white font-Satoshi text-[16px]">
                Shop Now
              </button>
            </div>
          </div>
          <div className="grid grid-rows-2 grid-cols-[45%_10%_45%] md:hidden mt-10 place-content-center place-items-center gap-y-10">
            <div className="flex flex-col justify-start items-start gap-1 row-span-1 col-span-1">
              <h3 className="text-3xl font-Poppins font-medium">200+</h3>
              <p className="opacity-80 text-sm leading-3 font-Satoshi">
                International Brands
              </p>
            </div>
            <span className="h-16 bg-black w-[1px] opacity-10 col-span-1"></span>
            <div className="flex flex-col justify-start items-start gap-1 col-span-1">
              <h3 className="text-3xl font-Poppins font-medium">2,000+</h3>
              <p className="opacity-80 text-sm leading-3 font-Satoshi">
                High-Quality Products
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-1 col-span-3">
              <h3 className="text-3xl font-Poppins font-medium">30,000+</h3>
              <p className="opacity-80 text-sm leading-3 font-Satoshi">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 relative place-self-center md:mt-[59px] bg-[#F2F0F1] h-[400px] w-[400px] md:w-[390px] md:h-[430px] lg:w-[480px] lg:h-[500px] xl:w-[580px] xl:h-[600px]">
          <Image
            src={
              heroData.image
                ? urlFor(heroData.image).url()
                : "/Images/default-hero.jpg"
            }
            alt="Hero Image"
            layout="fill"
            style={{ objectFit: "cover" }}
            className="absolute bg-transparent"
          />
          <div className="w-6 h-6">
            <Image
              src={"/Images/Stars.svg"}
              width={60}
              height={60}
              alt="vector"
              className="absolute top-32 bg-transparent"
            />
          </div>
          <div className="w-3 h-3">
            <Image
              src={"/Images/Stars.svg"}
              width={100}
              height={100}
              alt="vector"
              className="absolute top-4 right-2 bg-transparent"
            />
          </div>
        </div>
        <div className="w-full grid md:grid-rows-1 md:grid-cols-5 grid-cols-3 place-items-center place-self-end absolute bg-black h-[122px]">
          <Link href={"/"}>
            <div className="w-[120px] h-[30px]">
              <Image
                src={"/Images/Brands/versace.png"}
                width={100}
                height={100}
                alt="versace"
              />
            </div>
          </Link>
          <Link href={"/"}>
            <div className="w-[120px] h-[50px]">
              <Image
                src={"/Images/Brands/zara.png"}
                width={100}
                height={100}
                alt="zara"
              />
            </div>
          </Link>
          <Link href={"/"}>
            <div className="w-[120px] h-[30px]">
              <Image
                src={"/Images/Brands/gucci.png"}
                width={100}
                height={100}
                alt="gucci"
              />
            </div>
          </Link>
          <Link href={"/"} className="col-span-2 md:col-span-1">
            <div className="w-[120px] h-[30px]">
              <Image
                src={"/Images/Brands/prada.png"}
                width={120}
                height={100}
                alt="prada"
              />
            </div>
          </Link>
          <Link href={"/"} className="mr-[130px] md:mr-0">
            <div className="w-[120px] h-[30px]">
              <Image
                src={"/Images/Brands/calvin klein.png"}
                width={120}
                height={100}
                alt="calvin klein"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
