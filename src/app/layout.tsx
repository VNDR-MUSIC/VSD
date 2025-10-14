
'use client';

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { Orbitron, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { BackgroundVideo } from '@/components/layout/BackgroundVideo';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const fontHeadline = Orbitron({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminOrAdvertiserPage = pathname.startsWith('/admin') || pathname.startsWith('/advertiser');

  if (isAdminOrAdvertiserPage) {
     return (
        <html lang="en" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
          <body className="font-body antialiased min-h-screen flex flex-col relative bg-muted/40">
            <FirebaseClientProvider>
                <Header />
                <div className="flex-grow container mx-auto px-4 py-8">
                    {children}
                </div>
                <Toaster />
            </FirebaseClientProvider>
          </body>
        </html>
    );
  }

  return (
    <html lang="en" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
      <head>
         <link rel="icon" href="https://indiemedia.llc/vsdlogo.jpg" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative bg-background">
        <FirebaseClientProvider>
          <BackgroundVideo />
          <div className="relative z-0 flex flex-col min-h-screen bg-black/85">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex-grow container mx-auto px-4 py-8"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
