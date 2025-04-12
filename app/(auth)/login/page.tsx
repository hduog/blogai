"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/more-icons";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      document.cookie = `token_login_blogai=naodshvb998gbu1209fdbf8yjgyGG; path=/; max-age=${
        60 * 60 * 24 * 7
      }`; // 7 ngày
      document.cookie = `email_login_blogai=${encodeURIComponent(
        data.user.email
      )}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `name_login_blogai=${encodeURIComponent(
        data.user.name
      )}; path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/#"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back BLOGAI
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
