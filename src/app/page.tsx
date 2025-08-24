
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { ArrowRight, Banknote, Bot, Cpu, Network, HandCoins, FileJson } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AIImage } from "@/components/ai/AIImage";
import { LiveTokenData } from "@/components/home/LiveTokenData";

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center py-12 md:py-20 animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <Image
            src="https://indiemedia.llc/vsdlogo.jpg"
            alt="VSD Network Logo"
            width={120}
            height={120}
            className="rounded-full shadow-2xl shadow-primary/20"
            priority
          />
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary/70 via-primary to-white animate-fade-in-up animation-delay-200">
          The Utility Token for Decentralized AI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-400">
         VSD is the official utility token of the IMG ecosystem, fueling the next generation of AI services. Acquire VSD to access exclusive tools, earn rewards, and help govern the future of AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
          <Button asChild size="lg" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7">
            <Link href="/dashboard">Access Your Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7">
            <Link href="/token#presale">Join VSD Presale</Link>
          </Button>
        </div>
      </section>

      <LiveTokenData />

      <section className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in-up">
            <div className="space-y-4">
                <Cpu className="h-12 w-12 text-primary" />
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Access Exclusive AI Tools</h2>
                <p className="text-muted-foreground text-lg">
                   Your VSD tokens are the key to unlocking a powerful suite of proprietary AI tools, including the flagship **IMG Services** for content generation. Go beyond the ordinary with capabilities only available to token holders.
                </p>
                 <Button asChild variant="link" className="text-primary text-lg p-0 h-auto">
                  <Link href="/ecosystem">Explore AI Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
             <div className="relative h-80 rounded-lg shadow-2xl shadow-primary/10 border border-primary/20 p-2">
                 <AIImage
                    initialSrc="https://placehold.co/600x400.png"
                    alt="Exclusive AI tools"
                    hint="futuristic AI interface"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
        </div>
         <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in-up animation-delay-200">
            <div className="relative h-80 rounded-lg shadow-2xl shadow-primary/10 border border-primary/20 p-2 md:order-last">
                 <AIImage
                    initialSrc="https://placehold.co/600x400.png"
                    alt="AI-powered smart contract engine"
                    hint="AI smart contract generation"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="space-y-4">
                <FileJson className="h-12 w-12 text-primary" />
                <h2 className="font-headline text-3xl md:text-4xl font-bold">AI Smart Contract Engine</h2>
                <p className="text-muted-foreground text-lg">
                    Dynamically generate and deploy Solidity smart contracts for royalty splits, licensing, and fundraising. Describe your needs in plain English and let our AI handle the code.
                </p>
                 <Button asChild variant="link" className="text-primary text-lg p-0 h-auto">
                  <Link href="/smart-contract-generator">Try the Generator <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
