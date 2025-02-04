import Arrival from "@/components/Arrival";
import DressStyle from "@/components/DressStyle";
import Hero from "@/components/Hero";
import TopSelling from "@/components/TopSelling";
import { client } from "@/sanity/lib/client";

import { groq } from "next-sanity";

const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrival']{
  ...,
  } | order(_createdAt asc) [0..3]`;
const topSellingQuery = groq`*[_type == 'product' && position == 'Top Sell']{
  ...,
  } | order(_createdAt asc) [0..3]`;

export default async function Home() {
  const newArrivalProducts = await client.fetch(newArrivalQuery);
  const topSelling = await client.fetch(topSellingQuery);
  return (
    <div className=" mx-auto flex flex-col ">
      <Hero />
      <div className="px-4 lg:px-10 xl:px-16 ">
        <DressStyle />
        <Arrival productData={newArrivalProducts} />
        <TopSelling productData={topSelling} />
      </div>
    </div>
  );
}
