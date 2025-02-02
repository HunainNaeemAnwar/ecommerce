import Arrival from "@/components/Arrival";
import DressStyle from "@/components/DressStyle";
import Hero from "@/components/Hero";
import { client } from "@/sanity/lib/client";

import { groq } from "next-sanity";

const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrival']{
  ...,
  } | order(_createdAt asc)`;

export default async function Home() {
  const newArrivalProducts = await client.fetch(newArrivalQuery);
  return (
    <div className=" mx-auto flex flex-col ">
      <Hero />
      <div className="px-4 lg:px-10 xl:px-16 ">
        <DressStyle />
        <Arrival productData={newArrivalProducts} />
      </div>
    </div>
  );
}
