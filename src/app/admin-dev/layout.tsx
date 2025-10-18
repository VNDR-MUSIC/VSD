
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin (Dev) | VSD Network',
  description: 'VSD Network Administration (Development)',
};

export default function AdminDevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen w-full flex flex-col bg-muted/40")}>
        <div className="flex-grow container mx-auto px-4 py-8">
            {children}
        </div>
    </div>
  );
}
