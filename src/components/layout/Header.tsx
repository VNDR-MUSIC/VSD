
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';

export function Header() {
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);

  const navItems = siteConfig.mainNav.map((item) => {
    // Special handling for the Ecosystem dropdown
    if (item.href === "/ecosystem") {
      return (
        <DropdownMenu key={item.href}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus:bg-accent focus:text-accent-foreground",
              pathname.startsWith('/ecosystem') || pathname.startsWith('/audio-exchange') ? "text-primary" : "text-foreground/70"
            )}>
              {item.title}
              <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{item.description}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/ecosystem">Ecosystem Overview</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
               <Link href="/audio-exchange">Audio Exchange Demo</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    // Default nav items
    return (
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
    );
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo size={36} />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems}
        </nav>

        <div className="flex items-center gap-2">
           {loading ? (
             <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
           ) : user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
           ) : (
             <Button asChild variant="outline">
                <Link href="/login"><User className="mr-2 h-4 w-4"/>Login</Link>
             </Button>
           )}

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
                     <Logo size={36} className="mr-2" />
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
                     <DropdownMenuSeparator />
                     <Link
                        href="/audio-exchange"
                        className="text-lg font-medium transition-colors hover:text-primary text-foreground/80"
                      >
                        Audio Exchange Demo
                      </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
