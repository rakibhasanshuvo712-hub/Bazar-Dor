import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-4">
        {/* Left side - Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Image
              className="w-6 h-6"
              height={24}
              width={24}
              src="/logo-icon.png"
              alt="Logo"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">বাজার দর</h2>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>

        {/* Right side - Auth Buttons with Link */}
      <UserInfo />
      </div>
      <div className="justify-center text-center">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;