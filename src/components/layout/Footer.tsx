import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p className="mt-1">A decentralized vision for a stable future.</p>
      </div>
    </footer>
  );
}
