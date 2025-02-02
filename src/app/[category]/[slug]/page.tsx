import ProductDetails from "@/components/ProductDetails";
import { client } from "@/sanity/lib/client";
import { ProductProps } from "@/types";
import React from "react";

export const generateStaticParams = async () => {
  const query = `*[_type == 'product']{
    slug
  }`;

  const slugs: any = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => slug?.slug?.current);
  return slugRoutes?.map((slug: string) => ({
    slug,
  }));
};

const Page = async ({ params }: any) => {
  // You need to await params before using it
  const { slug } = await params; // Await params

  const query = `*[_type == 'product' && slug.current == $slug][0]{
    ...
  }`;

  const product: ProductProps = await client.fetch(query, { slug });

  if (!product) {
    return <div>No product found for this slug.</div>;
  }
  return (
    <main>
      <ProductDetails productDetails={product} />
    </main>
  );
};

export default Page;
