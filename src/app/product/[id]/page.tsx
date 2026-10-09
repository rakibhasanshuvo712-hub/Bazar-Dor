import React from 'react';
import Link from 'next/link';

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

interface ProductData {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: MarketPrice[];
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { id } = await params;

  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`);
  const jsonResponse = await res.json();
  const product: ProductData = jsonResponse.data || jsonResponse;

  // Fallback data if markets list isn't provided by the API endpoint directly
  const markets: MarketPrice[] = product.markets || [
    { market: "কাওরান বাজার", division: "ঢাকা", min: 62, max: 75, avg: 69 },
    { market: "যাত্রাবাড়ী বাজার", division: "ঢাকা", min: 60, max: 72, avg: 66 },
    { market: "খুচরা বাজার", division: "খুলনা", min: 60, max: 67, avg: 63.5 },
    { market: "সদর বাজার", division: "রাজশাহী", min: 60, max: 68, avg: 64 },
    { market: "নিউ মার্কেট", division: "সিলেট", min: 63, max: 70, avg: 67 },
    { market: "রেলওয়ে বাজার", division: "চট্টগ্রাম", min: 58, max: 69, avg: 63.5 },
    { market: "রংহাট বাজার", division: "ময়মনসিংহ", min: 59, max: 67, avg: 62 },
    { market: "সদর বাজার", division: "রাজশাহী", min: 60, max: 66, avg: 63 },
  ];

  const minPrice = Math.min(...markets.map((m) => m.min));
  const maxPrice = Math.max(...markets.map((m) => m.max));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        
        <nav className="text-sm text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <span>{product.categoryNameBn || "চাল"}</span>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </nav>

        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shadow-inner">
              {product.image || "🍚"}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-sm text-gray-500">প্রতি কেজি • {product.categoryNameBn}</p>
              <p className="text-xs text-gray-400 mt-1">
                গতকালের তুলনায় আজ দাম {product.change?.dir === "up" ? "বেড়েছে" : "কমেছে"} {Math.abs(product.change?.pct || 0)}%
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-right min-w-[160px]">
            <span className="text-xs text-emerald-700 font-medium block">আজকের দাম</span>
            <span className="text-3xl font-extrabold text-emerald-900">৳{product.today}</span>
            <span className="text-xs text-gray-500 block">টাকা / কেজি</span>
            <span className={`text-xs font-semibold mt-1 inline-block ${product.change?.dir === 'up' ? 'text-red-600' : 'text-emerald-600'}`}>
              {product.change?.dir === 'up' ? '▲' : '▼'} {product.change?.pct}%
            </span>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
            <span className="text-2xl font-bold text-emerald-600">৳{minPrice}</span>
            <span className="text-xs text-gray-400 block mt-1">সবচেয়ে কম দামের বাজার</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">সর্বাধিক দাম</span>
            <span className="text-2xl font-bold text-rose-600">৳{maxPrice}</span>
            <span className="text-xs text-gray-400 block mt-1">সবচেয়ে বেশি দামের বাজার</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs text-gray-500 block">গড় দাম</span>
            <span className="text-2xl font-bold text-blue-600">৳{product.today}</span>
            <span className="text-xs text-gray-400 block mt-1">প্রতি কেজি-এর হিসাব</span>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="py-3 px-6 text-right">বাজার</th>
                  <th className="py-3 px-6 text-right">বিভাগ</th>
                  <th className="py-3 px-6 text-right">সর্বনিম্ন</th>
                  <th className="py-3 px-6 text-right">সর্বাধিক</th>
                  <th className="py-3 px-6 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {markets.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-6 font-medium text-gray-900">{item.market}</td>
                    <td className="py-3.5 px-6 text-gray-500">{item.division}</td>
                    <td className="py-3.5 px-6 text-gray-700">৳{item.min}</td>
                    <td className="py-3.5 px-6 text-gray-700">৳{item.max}</td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">৳{item.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;