"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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

export default function CategoryProduct() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryslug = params?.categoryslug as string;
  const sort = searchParams.get("sort") || "default";

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryslug) return;

    fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${categoryslug}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [categoryslug]);

  // Handle sort changes via URL search params
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("sort", value);
    router.push(`?${currentParams.toString()}`);
  };

  // Sort products based on current sort value
  const sortedData = [...data].sort((a, b) => {
    if (sort === "low-to-high") {
      return a.today - b.today;
    } else if (sort === "high-to-low") {
      return b.today - a.today;
    }
    return 0; // default order
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F0] flex items-center justify-center">
        <p className="text-gray-500 text-lg">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F0] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="container mx-auto space-y-6 max-w-7xl">

        {/* Category Header Banner */}
        {data.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-gray-100">
              {data[0].categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data[0].categoryNameBn}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        )}

        {/* Sorting & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <span>মোট {data.length}টি পণ্য দেখানো হচ্ছে</span>
          
          <div className="flex items-center gap-2">
            <span>সাজান</span>
            <select
              value={sort}
              onChange={handleSortChange}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">কম থেকে বেশি</option>
              <option value="high-to-low">বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedData.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top Section: Icon, Name & Unit */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100 flex-shrink-0">
                    {product.image}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">
                      {product.nameBn}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                {/* Price and Percentage Row */}
                <div className="mt-5 pt-4 border-t border-gray-50 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block mb-0.5">
                      আজকের দাম
                    </span>
                    <span className="font-bold text-2xl text-gray-900">
                      ৳{product.today} <span className="text-xs font-normal text-gray-500">টাকা</span>
                    </span>
                  </div>

                  <div>
                    {product.change.dir === "up" ? (
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                        ▲ {product.change.pct}%
                      </span>
                    ) : product.change.dir === "down" ? (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                        ▼ {Math.abs(product.change.pct)}%
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        — 0,0%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Link Button */}
              <Link
                href={`/product/${product.id}`}
                className="mt-5 block w-full rounded-xl bg-gray-900 hover:bg-gray-800 text-white py-2.5 text-center text-sm font-medium transition-colors"
              >
                বিস্তারিত দেখুন
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}