import React from "react";
import Link from "next/link";

const Navbar = async () => {
  let navs = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    console.log("API response:", data);

    // ✅ multiple shape handle করছে
    navs = data.data ?? data.categories ?? data ?? [];
  } catch (err) {
    console.error("Navbar fetch failed:", err);
    navs = [];
  }

  return (
    <div>
      {navs.length > 0 ? (
        navs.map((n, i) => (
          <Link
            key={i}
            href={`/category/${n.slug}`}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          > {n.icon}
            {n.nameBn}
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500">কোনো ক্যাটাগরি নেই</p>
      )}
    </div>
  );
};

export default Navbar;