import React from "react";
import Link from "next/link";

interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
}

interface CategoryProductProps {
  params: Promise<{
    categoryslug: string;
  }>;
}

const CategoryProduct = async ({
  params,
}: CategoryProductProps) => {
  const { categoryslug } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryslug}`
  );

  const data: Product[] = await res.json();

  return (
    <div className="container mx-auto py-10">

      {/* Category Name */}
      {data.length > 0 && (
        <div className="mb-8">
          <p className="text-4xl">
            {data[0].categoryIcon}
          </p>

          <h1 className="text-3xl font-bold">
            {data[0].categoryNameBn}
          </h1>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {data.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            {/* Product Image/Icon */}
            <p className="text-2xl">
              {product.image}
            </p>

            {/* Product Name */}
            <h2 className="font-semibold">
              {product.nameBn}
            </h2>

            {/* Unit */}
            <p className="text-sm text-gray-500">
              প্রতি {product.unit}
            </p>

            {/* Today's Price */}
            <p className="text-sm text-gray-500 mt-3">
              আজকের দাম
            </p>

            <p className="font-bold text-xl">
              ৳{product.today}
            </p>

            {/* Price Change */}
            <span>
              {product.change.dir === "up"
                ? `▲ ${product.change.pct}%`
                : product.change.dir === "down"
                ? `▼ ${Math.abs(product.change.pct)}%`
                : "— 0%"}
            </span>

            {/* Fixed: Use capitalized <Link> */}
            <Link
              href={`/product/${product.id}`}
              className="mt-4 block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryProduct;