import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { ModeToggle } from "@/components/toggle";
import { MainNav } from "@/components/main-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("token_login_blogai");
  const email =
    cookieStore.get("email_login_blogai")?.value || "user@example.com";
  const name =
    cookieStore.get("name_login_blogai")?.value || "user@example.com";
  if (!token) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center py-4 justify-between">
          <MainNav />
          <div className="flex items-center gap-4 mx-2">
            <ModeToggle />
            <UserAccountNav
              user={{
                name: name,
                image: "/user.png",
                email: email,
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col justify-center">
        {children}
      </main>
      <SiteFooter className="border-t" />
    </div>
  );
}
