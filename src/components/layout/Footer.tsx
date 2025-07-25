
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-center items-center gap-4 mb-4">
           <Link href="https://indiemedia.llc" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
               <span className="text-xs">Official partner of</span>
               <Image
                src="https://indiemedia.llc/img-logo.png"
                alt="Independent Music Group (IMG) Logo"
                width={80}
                height={20}
                className="filter invert"
              />
            </div>
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p className="mt-1">A decentralized vision for a stable future.</p>
      </div>
    </footer>
  );
}
