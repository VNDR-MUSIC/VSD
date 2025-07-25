
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
      <section className="text-center py-12 md:py-20">
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
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary/70 via-primary to-white">
          The Future of Decentralized AI Banking
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          As the official currency of the Independent Music Group (IMG), VSD Network provides the financial backbone for the entire creative ecosystem, powering secure wallets, instant payments, and automated smart contracts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7">
            <Link href="/dashboard">Access Your Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold btn-hover-effect w-full sm:w-auto text-lg py-7">
            <Link href="/token#presale">Join VSD Presale</Link>
          </Button>
        </div>
      </section>

      <LiveTokenData />

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/70 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <HandCoins className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">VSD Network Core</CardTitle>
            <CardDescription>Your Secure Financial Ledger</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Securely manage your VSD tokens with a dedicated wallet, track transaction history, and perform peer-to-peer transfers within the IMG ecosystem.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-primary hover:text-primary-foreground">
              <Link href="/dashboard">Go to Wallet <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/70 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <Bot className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">Smart Contract Engine</CardTitle>
            <CardDescription>Automate Your Agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Dynamically generate and deploy Solidity smart contracts for royalty splits, licensing, memberships, and fundraising, all powered by VSD.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-primary hover:text-primary-foreground">
              <Link href="/developers/documentation#architecture">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/70 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <Banknote className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">IMG Banking Suite</CardTitle>
            <CardDescription>Full-Spectrum Token Management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Access a comprehensive suite of banking tools including savings wallets, token escrow for deals, and a dashboard to track your net worth.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-primary hover:text-primary-foreground">
              <Link href="/dashboard">Explore Features <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
