
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Separator } from '@/components/ui/separator';
import { Logo } from '../icons/Logo';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">
          {/* Logo and Copyright */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <Logo size={40} />
              <span className="font-headline text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} VSD Network. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-1">The official banking hub for IMG.</p>
          </div>

          {/* Main Links */}
          <div className="flex flex-col gap-2 p-4 rounded-lg footer-menu-background">
            <h4 className="font-bold mb-2">Platform</h4>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/token" className="text-muted-foreground hover:text-primary transition-colors">VSD Token</Link>
            <Link href="/ecosystem" className="text-muted-foreground hover:text-primary transition-colors">Ecosystem</Link>
            <Link href="/buy" className="text-muted-foreground hover:text-primary transition-colors">Buy VSD</Link>
          </div>

          {/* Developer Links */}
          <div className="flex flex-col gap-2 p-4 rounded-lg footer-menu-background">
            <h4 className="font-bold mb-2">Developers</h4>
            {siteConfig.footerNav.slice(0, 4).map((item) => (
               <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.title}</Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-2 p-4 rounded-lg footer-menu-background">
            <h4 className="font-bold mb-2">Company</h4>
            {siteConfig.footerNav.slice(4).map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-primary transition-colors">{item.title}</Link>
            ))}
          </div>

          {/* Partner Link */}
          <div className="flex flex-col items-start gap-2 col-span-2 md:col-span-1 p-4 rounded-lg footer-menu-background">
             <h4 className="font-bold mb-2">An IMG Company</h4>
             <Link href="https://indiemedia.llc" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity w-32">
                <Image
                    src="https://i.ibb.co/3wpP3F4/logo-full-256x.png"
                    alt="Independent Media Group Logo"
                    width={128}
                    height={128}
                    className="object-contain"
                />
             </Link>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">The VSD Token is a utility token and is not intended to constitute a security. Please read our legal disclaimer before participating.</p>
      </div>
    </footer>
  );
}
