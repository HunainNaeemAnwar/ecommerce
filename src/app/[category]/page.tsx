import React from "react";
import { client } from "@/sanity/lib/client";
import { ProductProps } from "@/types";
import ProductCard from "@/components/Products";
import FilterProducts from "@/components/FilterProducts";

// Category page component
const CategoryPage = async ({ params }: any) => {
  const { category } = params;

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
      <main className="px-6 py-10 flex flex-col items-center justify-center mt-10 ">
        <h1 className="text-2xl font-Satoshi">Category Not Found</h1>
        <p className="text-gray-600">
          The category you are looking for does not exist.
        </p>
      </main>
    );
  }

  // Fetch products for the category, ensuring `slug` is included
  const productQuery = `
    *[_type == "product" && $categoryTitle in category[]->title] {
      ...,
      "slug": slug.current
    }
  `;

  const products: ProductProps[] = await client.fetch(productQuery, {
    categoryTitle: categoryData.title,
  });

  return (
    <main className="px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 mt-20 mb-20 ">
      <div className="col-span-1">
        <FilterProducts />
      </div>
      <div className="col-span-3">
        <h1 className="text-2xl font-Satoshi mb-8 capitalize">
          {categoryData.title}
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-2  lg:grid-cols-4  gap-y-10 ">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products found in this category.</p>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
