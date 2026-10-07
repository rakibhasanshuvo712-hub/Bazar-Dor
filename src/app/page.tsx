import React from "react";
import Marquee from "@/components/Marquee";
import HeroBanner from "@/components/HeroBanner"; // ফাইলের সঠিক নাম অনুযায়ী ইমপোর্ট করা হলো

export default function Home() {
  return (
    <div>
      <Marquee />
      <HeroBanner />
    </div>
  );
}