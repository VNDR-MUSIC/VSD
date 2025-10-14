
import { cn } from '@/lib/utils';
import { Orbitron, Inter } from 'next/font/google';

// You can use the same fonts or different ones
const fontHeadline = Orbitron({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
        "min-h-screen w-full flex flex-col bg-muted/40",
        fontHeadline.variable,
        fontBody.variable
    )}>
        {children}
    </div>
  );
}
