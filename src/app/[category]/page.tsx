import React from "react";
import { client } from "@/sanity/lib/client";
import { ProductProps } from "@/types";
import ProductCard from "@/components/Products";
import FilterComponent from "@/components/FilterProducts";
import BreadCrumbs from "../../components/BreadCrumbs";

const titleCase = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
// Category page component
const CategoryPage = async ({ params }: any) => {
  const { category } = await params;

  // Fetch the category document to get the matching title
  const categoryQuery = `*[_type == "category" && lower(title) == $category][0] {
    title
  }`;

  const categoryData = await client.fetch(categoryQuery, {
    category: category.toLowerCase(),
  });

  // If category doesn't exist, return an empty page or a 404
  if (!categoryData) {
    return (
      <main className="px-6 py-20">
        <h1 className="text-2xl font-Satoshi text-center ">
          Category Not Found
        </h1>

        <p className="text-gray-600 text-center font-Poppins mt-3">
          The category you are looking for does not exist.
        </p>
      </main>
    );
  }

  // Fetch products for the category
  const productQuery = `
    *[_type == "product" && $categoryTitle in category[]->title] {
    ...,
    slug
    }
  `;

  const products: ProductProps[] = await client.fetch(productQuery, {
    categoryTitle: categoryData.title,
  });

  return (
    <main className=" min-h-screen  py-10 px-4 lg:px-[40px] xl:px-[100px]">
      <FilterComponent />

      <h1 className="text-2xl font-Poppins mt-8 md:mt-12 font-bold tracking-tight mb-8 capitalize">
        {titleCase(categoryData.title)}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in this category.</p>
      )}
    </main>
  );
};

export default CategoryPage;
