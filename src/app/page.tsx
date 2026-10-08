import React from "react";
import Marquee from "@/components/Marquee";
import HeroBanner from "@/components/HeroBanner";

const getProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  const data = await res.json();

  console.log(data);

  return data;
};

export default async function Home() {
  const products = await getProducts();

  const upProducts = products.filter(
    (p: any) => p.change.dir === "up"
  );

  const downProducts = products.filter(
    (p: any) => p.change.dir === "down"
  );

  return (
    <div>
      <Marquee />

      <HeroBanner />

      {/* Main Container */}
      <div className="container mx-auto px-4">

        {/* ================= দাম বেড়েছে ================= */}

        <div className="py-10">
          <p className="text-xl font-bold mb-5">
            ▲ আজ দাম বেড়েছে
          </p>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {upProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <p className="text-2xl">
                    {product.image}
                  </p>

                  <h2 className="font-semibold">
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
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* ================= দাম কমেছে ================= */}

        <div className="py-10">
          <p className="text-xl font-bold mb-5">
            ▼ আজ দাম কমেছে
          </p>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {downProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <p className="text-2xl">
                    {product.image}
                  </p>

                  <h2 className="font-semibold">
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
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* ================= সব পণ্য ================= */}

        <div className="py-10">
          <p className="text-2xl font-bold">
            সব পণ্য
          </p>

          <p className="text-sm text-gray-500 mb-5">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <p className="text-2xl">
                    {product.image}
                  </p>

                  <h2 className="font-semibold">
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

                  <span>
                    {product.change.dir === "up"
                      ? `▲ ${product.change.pct}%`
                      : product.change.dir === "down"
                      ? `▼ ${Math.abs(product.change.pct)}%`
                      : "— 0%"}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}