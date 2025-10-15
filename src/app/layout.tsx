
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
import Script from 'next/script';
import { SessionRewindIdentifier } from '@/components/auth/SessionRewindIdentifier';

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
  // We determine if the special layouts are used to avoid showing the main footer and background video.
  const isSpecialLayout = pathname.startsWith('/admin') || pathname.startsWith('/advertiser');
  
  return (
    <html lang="en" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
      <head>
         <link rel="icon" href="https://indiemedia.llc/vsdlogo.jpg" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative bg-background">
        <Script id="session-rewind-config" strategy="afterInteractive">
          {`
            !function (o) {
              var w = window;
              w.SessionRewindConfig = o;
              var f = document.createElement("script");
              f.async = 1, f.crossOrigin = "anonymous",
                f.src = "https://rec.sessionrewind.com/srloader.js";
              var g = document.getElementsByTagName("head")[0];
              g.insertBefore(f, g.firstChild);
            }({
              apiKey: 'P5ytM37jER8kxBLqXGq9H9vgmeCq6Hw19ojgWNFv',
              startRecording: true,
            });
          `}
        </Script>
        <FirebaseClientProvider>
          <SessionRewindIdentifier />
          {!isSpecialLayout && <BackgroundVideo />}
          <div className={cn("relative z-0 flex flex-col min-h-screen", !isSpecialLayout && "bg-black/85")}>
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex-grow"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            {!isSpecialLayout && <Footer />}
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
