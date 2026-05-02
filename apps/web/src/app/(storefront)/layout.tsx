import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span>NexusMarket</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NexusMarket. All rights reserved.
        </div>
      </footer>
    </>
  );
}
