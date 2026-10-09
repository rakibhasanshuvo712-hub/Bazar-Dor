import React from "react";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import HeroBanner from "@/components/HeroBanner";

const getProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data;
};

export default async function Home() {
  const products = await getProducts();

  const upProducts = products.filter(
    (p: any) => p.change?.dir === "up"
  );

  const downProducts = products.filter(
    (p: any) => p.change?.dir === "down"
  );

  return (
    <div>
      <Marquee />
      <HeroBanner />

      <div className="container mx-auto px-4">

        
        <div className="py-10">
          <p className="text-xl font-bold mb-5">
            ▲ আজ দাম বেড়েছে
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {upProducts.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <p className="text-2xl">{product.image}</p>

                <h2 className="font-semibold mt-2">
                  {product.nameBn}
                </h2>

                <p className="text-sm text-gray-500">
                  প্রতি {product.unit}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  আজকের দাম
                </p>

                <p className="font-bold text-xl">
                  ৳{product.today}
                </p>

                <span className="text-red-500">
                  ▲ {product.change.pct}%
                </span>

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

        
        <div className="py-10">
          <p className="text-xl font-bold mb-5">
            ▼ আজ দাম কমেছে
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {downProducts.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <p className="text-2xl">{product.image}</p>

                <h2 className="font-semibold mt-2">
                  {product.nameBn}
                </h2>

                <p className="text-sm text-gray-500">
                  প্রতি {product.unit}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  আজকের দাম
                </p>

                <p className="font-bold text-xl">
                  ৳{product.today}
                </p>

                <span className="text-green-500">
                  ▼ {Math.abs(product.change.pct)}%
                </span>

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

        
        <div className="py-10">
          <p className="text-2xl font-bold">
            সব পণ্য
          </p>

          <p className="text-sm text-gray-500 mb-5">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 bg-white shadow-sm"
              >
                <p className="text-2xl">{product.image}</p>

                <h2 className="font-semibold mt-2">
                  {product.nameBn}
                </h2>

                <p className="text-sm text-gray-500">
                  প্রতি {product.unit}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  আজকের দাম
                </p>

                <p className="font-bold text-xl">
                  ৳{product.today}
                </p>

                {product.change.dir === "up" && (
                  <span className="text-red-500">
                    ▲ {product.change.pct}%
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span className="text-green-500">
                    ▼ {Math.abs(product.change.pct)}%
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span className="text-gray-500">
                    — 0%
                  </span>
                )}

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

      </div>
    </div>
  );
}