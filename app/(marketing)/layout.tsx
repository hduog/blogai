import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "@/node_modules/next/link";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle";
import { SiteFooter } from "@/components/site-footer";
import MobileNav from "@/components/mobile-nav";

export const metadata: Metadata = {
  title: "AI Blog Generator – Create & Export Tailwind HTML Blogs Instantly",
  description:
    "Use AI to generate SEO-friendly blog articles in seconds. Export them as responsive HTML and Tailwind CSS with just one click.",
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="h-16 container sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between py-6 w-full">
            <MobileNav />
            <MainNav />
            <nav>
              <div className="md:flex">
                <div className="flex gap-4">
                  <ModeToggle />
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "px-4"
                    )}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
