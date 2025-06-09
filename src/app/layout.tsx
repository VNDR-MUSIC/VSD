
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
import { Montserrat as FontSans } from 'next/font/google'; // Changed from Orbitron
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans', // Using a more generic variable name
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: 'https://indiemedia.llc/vsdlogo.jpg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", fontSans.variable)}>
      <head>
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col relative">
        <div className="fixed inset-0 w-full h-full -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
            src="https://videos.pexels.com/video-files/4431790/4431790-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-0 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
