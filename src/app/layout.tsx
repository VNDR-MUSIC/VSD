
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

const fontHeadline = Orbitron({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

// Metadata is not supported in client components, so we comment it out for now
// and will move it to specific page files as needed.
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: 'https://indiemedia.llc/vsdlogo.jpg',
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
     return (
        <html lang="en" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
          <body className="font-body antialiased">{children}</body>
        </html>
    );
  }

  return (
    <html lang="en" className={cn("dark", fontHeadline.variable, fontBody.variable)}>
      <head>
         <title>{siteConfig.name}</title>
         <meta name="description" content={siteConfig.description} />
         <link rel="icon" href="https://indiemedia.llc/vsdlogo.jpg" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col relative bg-background">
        <BackgroundVideo />
        <div className="relative z-0 flex flex-col min-h-screen bg-black/70">
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
      </body>
    </html>
  );
}
