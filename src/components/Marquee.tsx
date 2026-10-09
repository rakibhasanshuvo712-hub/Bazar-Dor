import React from 'react';
import Marquee from "react-fast-marquee";

const ProductMarquee = async () => {
    let headlines: any[] = [];

    try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
        const data = await res.json();
        
        // Adjust this line based on what your console.log shows (e.g., data.products or just data)
        headlines = data?.data || data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    if (!headlines || headlines.length === 0) {
        return <div className="bg-green-600 text-white py-2 px-4">No products found.</div>;
    }

    return (
        <div className="w-full bg-green-600 text-white py-2 overflow-hidden">
            <Marquee speed={50} pauseOnHover={true} gradient={false}>
                {headlines.map((headline: any, index: number) => (
                    <div key={index} className="flex items-center mx-6 space-x-2">
                        <span className="font-semibold">{headline.categoryIcon}</span>
                        <span className="font-semibold">{headline.nameBn}</span>
                        <span className="text-yellow-300">{headline.today} টাকা</span>
                        <span>🔵</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default ProductMarquee;