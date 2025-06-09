
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, BarChart2, Users, Shield, Target } from "lucide-react";
import { AIImage } from "@/components/ai/AIImage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VSD Token Information',
  description: 'Detailed information about the VSD decentralized stablecoin, its features, and tokenomics.',
};

const FeatureItem = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <Icon className="h-8 w-8 text-primary mt-1 shrink-0" />
    <div>
      <h3 className="text-xl font-semibold mb-1 font-headline">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  </div>
);

export default function TokenPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Token Details</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the core aspects of VSD, the decentralized stablecoin designed for reliability and utility in the digital economy.
        </p>
      </header>

      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">What is VSD?</h2>
        <Card className="shadow-lg">
          <CardContent className="p-8 text-lg">
            <p className="mb-4">
              VSD is a decentralized, collateral-backed stablecoin soft-pegged to the US Dollar. It is designed to be a stable and reliable medium of exchange, store of value, and unit of account within the broader blockchain ecosystem.
            </p>
            <p>
              Built on transparent and auditable smart contracts, VSD aims to provide a censorship-resistant alternative to traditional fiat-backed stablecoins, empowering users with financial sovereignty and access to decentralized financial (DeFi) services.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureItem icon={Target} title="Decentralized & Unstoppable">
            VSD operates on a decentralized infrastructure, ensuring resilience against single points of failure and censorship.
          </FeatureItem>
          <FeatureItem icon={Shield} title="Collateral-Backed Stability">
            Maintains its peg through a system of over-collateralization with a diverse range of crypto assets, managed by smart contracts.
          </FeatureItem>
          <FeatureItem icon={Users} title="Community Governed">
            Key parameters and upgrades to the VSD protocol are determined by a decentralized autonomous organization (DAO), giving token holders a voice.
          </FeatureItem>
          <FeatureItem icon={BarChart2} title="Transparent & Auditable">
            All transactions and collateral reserves are publicly verifiable on the blockchain, fostering trust and accountability.
          </FeatureItem>
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">Tokenomics Overview</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Understanding VSD's Economic Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              VSD's tokenomics are designed to ensure stability, incentivize participation, and support long-term growth of the ecosystem. This includes mechanisms for minting, burning, collateral management, and governance. (Detailed charts and figures would go here).
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <AIImage 
                initialSrc="https://placehold.co/800x400.png" 
                alt="Tokenomics chart placeholder"
                width={800}
                height={400}
                className="rounded-md mx-auto shadow-md"
                hint="financial chart graph"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center pt-2">
              (Example: Pie chart showing token distribution or a graph illustrating stability mechanisms)
            </p>
          </CardContent>
        </Card>
      </section>
      
      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">How to Get VSD</h2>
         <Card className="shadow-lg">
          <CardContent className="p-8">
            <p className="text-lg text-muted-foreground">
              VSD can typically be acquired through several avenues within the decentralized finance (DeFi) space:
            </p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-lg text-muted-foreground pl-4">
              <li>
                <strong>Minting:</strong> Users can lock up approved collateral assets in the VSD protocol smart contracts to mint new VSD tokens.
              </li>
              <li>
                <strong>Decentralized Exchanges (DEXs):</strong> VSD is often available for trading on various DEXs against other cryptocurrencies.
              </li>
              <li>
                <strong>Ecosystem Participation:</strong> Some projects within the VSD ecosystem might offer VSD as rewards or incentives.
              </li>
            </ul>
            <p className="mt-6 text-sm text-center text-primary font-medium">
              Always ensure you are interacting with official VSD protocol interfaces and reputable exchanges.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
