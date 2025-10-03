
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, User, LogOut, ChevronDown, type LucideIcon, ShieldAlert, Share2, Disc, PiggyBank, Briefcase, GraduationCap, Group, Search, Route } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import React from 'react';

const NavLink = ({ href, children, currentPathname }: { href: string, children: React.ReactNode, currentPathname: string }) => (
    <Link
        href={href}
        className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            currentPathname === href ? "text-primary" : "text-foreground/70"
        )}
    >
        {children}
    </Link>
);


const MobileNavLink = ({ href, children, onSelect }: { href: string, children: React.ReactNode, onSelect: () => void }) => (
    <Link
      href={href}
      onClick={onSelect}
      className="text-lg font-medium transition-colors hover:text-primary text-foreground/80"
    >
        {children}
    </Link>
);

const UserNav = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        await signOut(auth);
        toast({ title: "Signed Out", description: "You have been successfully signed out." });
        router.push('/');
    };

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                        <AvatarFallback>
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {siteConfig.userNav.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                           <Link href={item.href}>
                               {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                               <span>{item.title}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export function Header() {
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const [isSheetOpen, setSheetOpen] = React.useState(false);


  const navItems = siteConfig.mainNav.map((item) => {
    if (item.href === "/ecosystem") {
      return (
        <DropdownMenu key={item.href}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus:bg-accent focus:text-accent-foreground",
              pathname.startsWith('/ecosystem') || pathname.startsWith('/audio-exchange') || pathname.startsWith('/earn') ? "text-primary" : "text-foreground/70"
            )}>
              {item.title}
              <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>{item.description}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/ecosystem">Ecosystem Overview</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
               <Link href="/audio-exchange">Audio Exchange Demo</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
               <Link href="/earn">Earn VSD Tokens</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Disc className="mr-2 h-4 w-4" />
                    <span>Music Management</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#music-management-distribution">VNDR MUSIC Hub</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#music-management-distribution">Music Manager</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
             <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <PiggyBank className="mr-2 h-4 w-4" />
                    <span>Financial Platforms</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#financial-monetization-platforms">Audio Exchange (AUDEX)</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#financial-monetization-platforms">Indie Videos TV (IVTV)</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#financial-monetization-platforms">ND RADIO</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Business Development</span>
                </DropdownMenuSubTrigger>
                 <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#business-development-innovation">Blaque Tech Ventures</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#business-development-innovation">AI Motion Design</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Artist Development</span>
                </DropdownMenuSubTrigger>
                 <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#education-artist-development">MIU</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#education-artist-development">Music Focus Group</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#education-artist-development">Forward Always Podcast</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Group className="mr-2 h-4 w-4" />
                    <span>Community & Networking</span>
                </DropdownMenuSubTrigger>
                 <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#community-networking">Indie Artist Network</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#community-networking">IMG Social</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/ecosystem#community-networking">Pro Files</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
             <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Music Discovery</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                         <DropdownMenuItem asChild><Link href="/ecosystem#music-discovery">SoundKlix</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
             <DropdownMenuSeparator />
             <DropdownMenuItem asChild>
               <Link href="/ecosystem#ecosystem-infrastructure">
                    <Route className="mr-2 h-4 w-4" /> Vsd.Network
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // New Dropdown for "Developers"
    if (item.href === "/developers") {
      return (
        <DropdownMenu key={item.href}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus:bg-accent focus:text-accent-foreground",
              pathname.startsWith('/developers') ? "text-primary" : "text-foreground/70"
            )}>
              {item.title}
              <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{item.description}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/developers">Developer Portal</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/developers/documentation">Whitepaper</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/developers/api-reference">API Reference</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/developers/integration">Integration Guide</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/developers/sdks-tools">SDKs & Tools</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    // Default nav items
    return (
      <NavLink key={item.href} href={item.href} currentPathname={pathname}>
        {item.title}
      </NavLink>
    );
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <Logo size={36} />
        </Link>
        
        <div className="flex items-center gap-2">
           {loading ? (
             <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
           ) : user ? (
              <UserNav />
           ) : (
             <Button asChild variant="outline">
                <Link href="/login"><User className="mr-2 h-4 w-4"/>Login</Link>
             </Button>
           )}

            {/* Mobile Navigation */}
            <div>
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>Main navigation links for the VSD Network website.</SheetDescription>
                    </SheetHeader>
                    <SheetClose asChild>
                        <Link href="/" className="mb-6 flex items-center">
                            <Logo size={36} className="mr-2" />
                        </Link>
                    </SheetClose>
                  <nav className="flex flex-col space-y-4">
                    {siteConfig.mainNav.map((item) => (
                       <SheetClose asChild key={item.href}>
                         <Link href={item.href} className="text-lg font-medium transition-colors hover:text-primary text-foreground/80">
                            {item.title}
                         </Link>
                       </SheetClose>
                    ))}
                     <DropdownMenuSeparator />
                     {siteConfig.secondaryNav.map((item) => (
                         <SheetClose asChild key={item.href}>
                            <Link href={item.href} className="text-lg font-medium transition-colors hover:text-primary text-foreground/80">
                                {item.title}
                            </Link>
                        </SheetClose>
                     ))}
                     <DropdownMenuSeparator />
                     <SheetClose asChild>
                        <Link href="/developers/integration" className="text-lg font-medium transition-colors hover:text-primary text-foreground/80 flex items-center">
                            <Share2 className="mr-2 h-4 w-4" /> Integration Guide
                        </Link>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}

  