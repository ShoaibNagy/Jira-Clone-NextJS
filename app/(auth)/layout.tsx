"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathName = usePathname();
  const isSignInPage = pathName === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={152}  // Intrinsic dimensions for aspect ratio calculation
            height={50}
            unoptimized  // Recommended for SVGs [[1]]
            loading="eager"
            style={{
              height: 'auto',  // Preserve aspect ratio [[1]]
            }} />
          <Button asChild variant={"secondary"}>
            <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
              {isSignInPage ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}