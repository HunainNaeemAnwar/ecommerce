import React from "react";
import { BiEnvelope, BiLogoFacebook } from "react-icons/bi";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import Image from "next/image";
import { ImTwitter } from "react-icons/im";

const company = [
  {
    name: "About",
    link: "#",
  },
  {
    name: "Feature",
    link: "#",
  },
  {
    name: "Work",
    link: "#",
  },
  {
    name: "Career",
    link: "#",
  },
];
const help = [
  {
    name: "Customer Support",
    link: "#",
  },
  {
    name: "Delivery Details",
    link: "#",
  },
  {
    name: "Terms & Conditions",
    link: "#",
  },
  {
    name: "Privacy Policy",
    link: "#",
  },
];
const faq = [
  {
    name: "Account",
    link: "#",
  },
  {
    name: "Manage Deliveries",
    link: "#",
  },
  {
    name: "Orders",
    link: "#",
  },
  {
    name: "Payments",
    link: "#",
  },
];
const resources = [
  {
    name: "Free eBooks",
    link: "#",
  },
  {
    name: "Development Tutorial",
    link: "#",
  },
  {
    name: "How to - Blog",
    link: "#",
  },
  {
    name: "Youtube Playlist",
    link: "#",
  },
];

const FooterSection = () => {
  return (
    <section className="relative bottom-0 right-0 left-0 w-full flex flex-col items-start justify-center px-6 lg:px-10 bg-[#F0F0F0] mt-52">
      <div className="w-full absolute top-[-200px] md:top-[-140px] lg:top-[-100px] left-0 px-4 lg:px-10 xl:px-16">
        {/* Newsletter */}
        <div className="bg-black rounded-3xl text-white row-span-1 flex flex-col gap-4 p-8 md:flex-row justify-between">
          <div className="font-Integral text-[40px] leading-[40px]">
            STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
          </div>
          <div>
            <form className="flex flex-col gap-3 font-Satoshi relative">
              <input
                type="text"
                placeholder="     Enter your email address "
                className="rounded-3xl py-2 text-sm text-black text-center"
              />
              <BiEnvelope className="absolute w-6 h-6 top-2 left-4 xl:left-8 text-opacity-30 text-start text-black" />
              <button className="rounded-3xl py-2 md:px-20 text-sm lg:px-10 xl:px-20 bg-white text-black">
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-3 lg:grid-rows-1 lg:grid-cols-5 lg:place-items-center gap-y-10 text-[14px] font-Satoshi mt-40 md:mt-32 lg:mt-28">
        {/* SHOP.CO */}
        <div className="flex flex-col gap-4 col-span-2 lg:col-span-1 row-span-1">
          <h3 className="text-[33px] font-Integral">SHOP.CO</h3>
          <p className="opacity-60 w-40">
            We have clothes that suits your style and which you're proud to
            wear. From women to men.
          </p>
          <div className="flex justify-start items-center gap-2">
            <div className="border border-black rounded-full p-2 hover:bg-black hover:text-white transition-all duration-500">
              <Link href={"#"}>
                <BiLogoFacebook className="w-6 h-6" />
              </Link>
            </div>
            <div className="border border-black rounded-full p-2 hover:bg-black hover:text-white transition-all duration-500">
              <Link href={"#"}>
                <ImTwitter className="w-5 h-5" />
              </Link>
            </div>
            <div className="border border-black rounded-full p-2 hover:bg-black hover:text-white transition-all duration-500">
              <Link href={"#"}>
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
            <div className="border border-black rounded-full p-2 hover:bg-black hover:text-white transition-all duration-500">
              <Link href={"#"}>
                <GrLinkedinOption className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Company Section */}
        {company.length > 0 && (
          <div className="flex flex-col gap-4 col-span-1 row-span-1">
            <h3 className="text-[16px] font-Satoshi">COMPANY</h3>
            {company.map((company) => (
              <Link
                href={company.link}
                key={company.name}
                className="opacity-60"
              >
                {company.name}
              </Link>
            ))}
          </div>
        )}
        {/* Help Section */}
        {help.length > 0 && (
          <div className="flex flex-col gap-4 col-span-1 row-span-1">
            <h3 className="text-[16px] font-Satoshi">HELP</h3>
            {help.map((help) => (
              <Link href={help.link} key={help.name} className="opacity-60">
                {help.name}
              </Link>
            ))}
          </div>
        )}
        {/* FAQ Section */}
        {faq.length > 0 && (
          <div className="flex flex-col gap-4 col-span-1 row-span-1">
            <h3 className="text-[16px] font-Satoshi">FAQ</h3>
            {faq.map((faq) => (
              <Link href={faq.link} key={faq.name} className="opacity-60">
                {faq.name}
              </Link>
            ))}
          </div>
        )}
        {/* Resources Section */}
        {resources.length > 0 && (
          <div className="flex flex-col gap-4 row-span-1 col-span-1">
            <h3 className="text-[16px] font-Satoshi">RESOURCES</h3>
            {resources.map((resource) => (
              <Link
                href={resource.link}
                key={resource.name}
                className="opacity-60"
              >
                {resource.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex md:flex-row flex-col gap-2 items-center justify-between w-full border-black border-opacity-30 border-t py-4 mt-10">
        <p className="font-Satoshi text-[16px] opacity-40">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <div className="flex items-center justify-center">
          <Image
            src={"/Images/Footer/logo-1.png"}
            width={80}
            height={30}
            alt="logo-1"
          />
          <Image
            src={"/Images/Footer/logo-2.png"}
            width={80}
            height={30}
            alt="logo-2"
          />
          <Image
            src={"/Images/Footer/logo-3.png"}
            width={80}
            height={30}
            alt="logo-3"
          />
          <Image
            src={"/Images/Footer/logo-4.png"}
            width={80}
            height={30}
            alt="logo-4"
          />
          <Image
            src={"/Images/Footer/logo-5.png"}
            width={80}
            height={30}
            alt="logo-5"
          />
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
