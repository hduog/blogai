import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AI Blog Generator – Create & Export Tailwind HTML Blogs Instantly",
  description:
    "Use AI to generate SEO-friendly blog articles in seconds. Export them as responsive HTML and Tailwind CSS with just one click.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/logo.ico" />
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col justify-center scroll-smooth bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
