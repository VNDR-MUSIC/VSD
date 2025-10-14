
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight, Cpu, FileJson, Banknote, Bot, HandCoins, Network, Gift, DollarSign, BrainCircuit, Users, Sparkles, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AIImage } from "@/components/ai/AIImage";
import { LiveTokenData } from "@/components/home/LiveTokenData";
import { PresalePopup } from "@/components/home/PresalePopup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="text-center items-center flex flex-col bg-card/70 backdrop-blur-sm border-white/10 shadow-lg h-full">
        <CardHeader className="items-center">
            <div className="p-4 bg-primary/20 rounded-full mb-4 border border-primary/50">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
    </Card>
);

const Step = ({ icon: Icon, title, description, stepNumber }: { icon: React.ElementType, title: string, description: string, stepNumber: number }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full border-primary text-primary">
                    {stepNumber}
                </div>
            </div>
            <div className="w-px h-full bg-primary/30"></div>
        </div>
        <div className="pb-8">
            <div className="flex items-center gap-3 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold font-headline">{title}</p>
            </div>
            <p className="text-muted-foreground">{description}</p>
        </div>
    </div>
);


export function HomeClient() {
  const [isPopupOpen, setIsOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // When auth state is resolved and user is logged in, redirect to dashboard
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  // While loading auth state, or if user is found (and redirect is imminent),
  // you can show a loader or a blank page to prevent flicker.
  if (isUserLoading || user) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div> {/* Or some other loading indicator */}
        </div>
    );
  }

  return (
    <>
      <PresalePopup isOpen={isPopupOpen} setIsOpen={setIsOpen} />
      <div className="space-y-20 md:space-y-28">
        
        {/* --- Hero Section --- */}
        <section className="text-center pt-12 md:pt-20">
          <div className="flex justify-center mb-8">
            <Image
              src="https://indiemedia.llc/vsdlogo.jpg"
              alt="VSD Network Logo"
              width={120}
              height={120}
              className="rounded-full shadow-2xl shadow-primary/20 animate-fade-in-up"
              priority
            />
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary/70 via-primary to-white animate-fade-in-up animation-delay-200">
            The Currency for the Creator Economy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-400">
            VSD is a decentralized financial network for the Independent Music Group (IMG), providing access to previously gate-kept services by leveraging a user-centric ad-revenue model.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7">
              <Link href="/ecosystem">Explore Ecosystem<ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7" onClick={() => setIsOpen(true)}>
              View Presale
            </Button>
          </div>
        </section>

        {/* --- Core Pillars Section --- */}
        <section className="animate-fade-in-up animation-delay-600">
             <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">The Foundation of the IMG Hub</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">VSD provides the essential infrastructure for a new generation of creative and financial tools.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard 
                    icon={Cpu} 
                    title="AI-Powered Services" 
                    description="Access the proprietary IMG Services suite for content generation, analytics, and more, all powered by VSD."
                />
                <FeatureCard 
                    icon={Banknote} 
                    title="Decentralized Banking" 
                    description="A transparent, on-chain ledger for royalties, payments, and ecosystem transactions within the IMG."
                />
                <FeatureCard 
                    icon={Sparkles} 
                    title="Creator Monetization" 
                    description="Unlock new revenue streams through smart contracts, digital collectibles, and direct-to-fan platforms."
                />
                <FeatureCard 
                    icon={Users} 
                    title="Community Governance" 
                    description="Use your VSD tokens to vote on proposals and steer the future development of the ecosystem."
                />
            </div>
        </section>

        {/* --- About VSD Network --- */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
                <Network className="h-12 w-12 text-primary" />
                <h2 className="font-headline text-3xl md:text-4xl font-bold">The Official Financial Hub for IMG</h2>
                <p className="text-muted-foreground text-lg">
                    The VSD Network is more than just a token; it's the official, centralized ledger and banking system for the entire Independent Music Group. It provides a single source of truth for all financial operations, from instant royalty payouts to AI service billing, with the security and transparency of on-chain settlement.
                </p>
                <Button asChild variant="link" className="text-primary text-lg p-0 h-auto">
                <Link href="/developers/documentation#architecture">Learn About the Architecture <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
             <div className="relative h-80 rounded-lg shadow-2xl shadow-primary/10 border border-primary/20 p-2">
                 <AIImage
                    initialSrc="https://placehold.co/600x400.png"
                    alt="The central hub of the IMG ecosystem"
                    hint="financial technology hub"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
        </section>

        {/* --- How It Works --- */}
        <section>
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Get Started in Minutes</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Join the VSD ecosystem with a few simple steps.</p>
            </div>
            <div className="max-w-xl mx-auto">
                <Step 
                    stepNumber={1}
                    icon={ShoppingCart}
                    title="Acquire VSD Tokens"
                    description="Participate in the presale or purchase VSD tokens to get started. This is your key to the entire ecosystem."
                />
                 <Step 
                    stepNumber={2}
                    icon={HandCoins}
                    title="Access Your Dashboard"
                    description="Log in to your personal dashboard to view your balance, manage your holdings, and access staking features."
                />
                 <Step 
                    stepNumber={3}
                    icon={BrainCircuit}
                    title="Utilize AI Services"
                    description="Use your VSD balance to power the IMG Services suite and other partner tools for content creation and more."
                />
                 <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div>
                            <div className="flex items-center justify-center w-10 h-10 border rounded-full border-green-500 text-green-500">
                                <Sparkles />
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <p className="text-lg font-semibold font-headline text-green-400">Innovate & Earn</p>
                        <p className="text-muted-foreground">Participate in governance, stake your tokens for rewards, and build the future of the creator economy.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* --- Live Token Data & Presale --- */}
        <section>
             <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Join the VSD Presale</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Become an early adopter and secure your stake in the IMG ecosystem's future. The official token contract is live and verified.</p>
            </div>
            <LiveTokenData />
        </section>

      </div>
    </>
  );
}

    