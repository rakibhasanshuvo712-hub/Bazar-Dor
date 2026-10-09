"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex gap-2">
          <Link href={"/profile"}>
            <div className="avatar">
              <div className="w-10 rounded">
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                />
              </div>
            </div>
          </Link>

          <h2>{user.name}</h2>

          <button onClick={handleSignOut} className="btn btn-error">
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href={"/signin"}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 font-medium text-center inline-flex items-center"
          >
            সাইন ইন
          </Link>

          <Link
            href={"/signup"}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 font-medium text-center inline-flex items-center"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;