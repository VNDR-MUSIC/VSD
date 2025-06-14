
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { ArrowRight, BarChart3, Code, Network, Zap, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AIImage } from "@/components/ai/AIImage";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-16">
        <div className="flex justify-center mb-8">
          <Image
            src="https://indiemedia.llc/vsdlogo.jpg"
            alt="VSD Network Logo"
            width={100}
            height={100}
            className="rounded-full shadow-lg"
            priority
          />
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Unlock the Power of AI with <span className="text-primary">{siteConfig.name}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover VSD, the utility token powering a decentralized ecosystem of AI tools and services. Participate in our presale and be part of the future of AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="font-bold btn-hover-effect w-full sm:w-auto">
            <Link href="/token#presale">Join VSD Presale <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold btn-hover-effect w-full sm:w-auto">
            <Link href="/developers/documentation">Read Whitepaper <BrainCircuit className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Zap className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">VSD Token Utility</CardTitle>
            <CardDescription>Fueling the next generation of AI services.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <li>Access Exclusive AI Tools (IMG Services)</li>
              <li>Stake VSD for Platform Rewards</li>
              <li>Participate in Governance Decisions</li>
              <li>Unlock Premium Features & Discounts</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/token">Explore VSD Utility <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <BarChart3 className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">Tokenomics & Presale</CardTitle>
            <CardDescription>Transparent model for sustainable growth.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Total Supply: 1 Billion VSD. Our presale offers an early opportunity to acquire VSD tokens and support the ecosystem.
            </p>
            <AIImage
              initialSrc="https://placehold.co/600x400.png"
              alt="Tokenomics chart visualization"
              width={600}
              height={400}
              className="rounded-md mt-4"
              hint="tokenomics presale chart"
            />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/token#tokenomics">View Tokenomics <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Code className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-xl sm:text-2xl">Developer & Ecosystem</CardTitle>
            <CardDescription>Build and integrate with the VSD Network.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">
              Access our SDKs, APIs, and documentation to integrate VSD utility into your applications or build new tools on our AI platform.
            </p>
             <AIImage
              initialSrc="https://placehold.co/600x400.png"
              alt="Developer coding with AI"
              width={600}
              height={400}
              className="rounded-md mt-4"
              hint="developer AI code"
            />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/developers">Developer Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
