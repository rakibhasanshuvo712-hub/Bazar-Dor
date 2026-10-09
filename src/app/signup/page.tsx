
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const imageURL = formData.get("imageURL") as string;

      if (password !== confirmPassword) {
        setErrorMsg("পাসওয়ার্ড দুটি মিলছে না!");
        return;
      }

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageURL || undefined,
        callbackURL: "/",
      });

      if (error) {
        setErrorMsg(error.message || "সাইন আপ ব্যর্থ হয়েছে");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setErrorMsg("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (
    provider: "google" | "github"
  ) => {
    setErrorMsg("");
    setSocialLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMsg(
          error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে"
        );
      }
    } catch {
      setErrorMsg("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSocialLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition";

  return (
    <div className="min-h-screen bg-[#f0f7f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            সাইন আপ
          </h1>

          <p className="text-sm text-gray-500">
            অ্যাকাউন্ট তৈরি করুন এবং বিস্তারিত দাম, বাজার তুলনা ও
            প্রোফাইল দেখুন।
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="আপনার পুরো নাম"
                className={inputClass}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Image URL (ঐচ্ছিক)
              </label>

              <input
                id="imageURL"
                name="imageURL"
                type="url"
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className={inputClass}
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
              >
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || socialLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition shadow-sm"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "সাইন আপ"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">
                অথবা
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* GitHub */}
            <button
              type="button"
              disabled={loading || socialLoading}
              onClick={() => socialSignIn("github")}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-60 text-sm font-medium text-gray-700 transition"
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>

              <span>
                {socialLoading
                  ? "অপেক্ষা করুন..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
