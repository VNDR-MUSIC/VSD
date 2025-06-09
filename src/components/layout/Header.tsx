
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  const navItems = siteConfig.mainNav.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === item.href ? "text-primary" : "text-foreground/70"
      )}
    >
      {item.title}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo size={28} />
          {/* <span className="font-bold font-headline sm:inline-block hidden">{siteConfig.name}</span> */}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mb-6 flex items-center">
                 <Logo size={28} className="mr-2" />
                 {/* <span className="font-bold font-headline">{siteConfig.name}</span> */}
              </Link>
              <nav className="flex flex-col space-y-4">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
