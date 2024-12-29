import { ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function WelcomeNavbar() {
  return (
    <div className="flex items-center justify-between h-24 px-10">
      <div>
        <h1 className="text-3xl font-bold text-blue-400">
          <Link href={"/"}>Chattr</Link>
        </h1>
      </div>
      <div className="flex items-center justify-center gap-10 text-lg font-bold">
        <SignedIn>
          <Link href={"/home"} className="rounded-lg bg-blue-500 px-7 py-4 text-sm">Dashboard</Link>
        </SignedIn>
        <SignedOut>
          <Link href={"/sign-in"} className="hover:text-blue-400">Log In</Link>
          <Link href={"/sign-up"} className="hover:text-blue-400">Sign Up</Link>
        </SignedOut>
      </div>
    </div>
  );
}
