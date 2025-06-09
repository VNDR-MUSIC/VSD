
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { ArrowRight, BarChart3, Code, Network, Search, ShieldCheck } from "lucide-react";
import { AIImage } from "@/components/ai/AIImage";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <div className="flex justify-center mb-8">
          <AIImage
            initialSrc="https://indiemedia.llc/vsdlogo.jpg"
            alt="VSD Network Logo"
            width={100} 
            height={100}
            className="rounded-full"
            priority
            hint="abstract logo"
          />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">
          Welcome to <span className="text-primary">{siteConfig.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Your central hub for the VSD decentralized stablecoin. Explore token information, discover ecosystem projects, and access developer resources.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-bold btn-hover-effect">
            <Link href="/token">Learn about VSD <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold btn-hover-effect">
            <Link href="/developers">Developer Portal <Code className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <BarChart3 className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">VSD Token Insights</CardTitle>
            <CardDescription>Key metrics and information about the VSD stablecoin.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>Total Supply: 1,000,000,000 VSD (Example)</li>
              <li>Circulating Supply: 750,000,000 VSD (Example)</li>
              <li>Pegged Value: $1.00 USD</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/token">View Token Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Network className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Ecosystem Projects</CardTitle>
            <CardDescription>Discover innovative projects building with VSD.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The VSD ecosystem is constantly growing. Explore a variety of applications and platforms leveraging the power of our decentralized stablecoin.
            </p>
            <AIImage 
              initialSrc="https://placehold.co/600x400.png" 
              alt="Ecosystem visualization placeholder"
              width={600}
              height={400}
              className="rounded-md mt-4"
              hint="abstract network"
            />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/ecosystem">Explore Ecosystem <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Code className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Developer Resources</CardTitle>
            <CardDescription>Tools and documentation for building on VSD.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access comprehensive documentation, SDKs, community channels, and our unique AI-powered documentation search to kickstart your development journey.
            </p>
             <AIImage 
              initialSrc="https://placehold.co/600x400.png" 
              alt="Developer coding placeholder"
              width={600}
              height={400}
              className="rounded-md mt-4"
              hint="code screen"
            />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full btn-hover-effect">
              <Link href="/developers">Access Developer Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="py-12 text-center bg-card p-8 rounded-lg shadow-xl">
        <Search className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-headline text-3xl font-bold mb-3">AI-Powered Documentation Search</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Quickly find answers and navigate our extensive documentation using our intelligent search assistant.
        </p>
        <Button asChild size="lg" className="btn-hover-effect">
          <Link href="/developers#ai-search">Try AI Search <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
}
