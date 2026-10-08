import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroBanner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-[#F7F9F6] border border-gray-200 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-sm">
        
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          {/* Date Badge */}
          <div className="inline-flex items-center bg-[#E6F4EA] text-green-800 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full">
            {date}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors text-sm"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Illustration / Image */}
        <div className="mt-6 md:mt-0 flex justify-center items-center">
          <div className="relative w-64 h-52 md:w-80 md:h-64 flex items-center justify-center">
            <div className="text-6xl flex items-center gap-2">
               <Image
                            className="w-6 h-6"
                            height={400}
                            width={300}
                            src="/public/bazar-hero.png"
                            alt="Logo"
                          />
                        
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;