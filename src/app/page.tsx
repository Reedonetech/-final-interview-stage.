"use client";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16 sm:py-20 lg:py-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Our Contact Form Platform
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 px-2 sm:px-0">
          This is your new contact form platform with login, state management, validation, and more – all powered by Next.js.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
