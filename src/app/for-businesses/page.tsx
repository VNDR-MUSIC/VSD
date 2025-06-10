
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Zap, Globe, Puzzle, ArrowRight, ShieldCheck, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'VSD for Businesses',
  description: 'Integrate the VSD stablecoin into your business for stable, efficient crypto transactions and access to the Web3 economy.',
};

const BenefitCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
    <CardHeader className="items-center text-center">
      <Icon className="h-12 w-12 text-primary mb-3" />
      <CardTitle className="font-headline text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-center">{children}</p>
    </CardContent>
  </Card>
);

export default function ForBusinessesPage() {
  return (
    <div className="space-y-16 py-8">
      <header className="text-center">
        <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">Power Your Business with VSD</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how the VSD stablecoin can revolutionize your transactions, streamline payments, access DeFi, and connect you to the future of decentralized commerce.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="font-headline text-3xl font-semibold text-center mb-10">Why Choose VSD Stablecoin for Your Business?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard icon={ShieldCheck} title="Stable Value Transactions">
            Mitigate volatility risks associated with other cryptocurrencies. VSD is designed for stability, making it ideal for pricing goods, services, and managing treasury.
          </BenefitCard>
          <BenefitCard icon={Zap} title="Efficient & Low-Cost Payments">
            Experience faster settlement times and potentially lower transaction fees compared to traditional payment rails and some other blockchains. (Actual fees depend on the underlying network conditions).
          </BenefitCard>
          <BenefitCard icon={Globe} title="Global Reach & Borderless">
            Tap into a global customer base. VSD enables seamless cross-border transactions without the complexities of traditional banking intermediaries or currency conversions.
          </BenefitCard>
          <BenefitCard icon={Puzzle} title="Easy Web3 Integration">
            Leverage our developer-friendly SDKs, smart contract documentation, and APIs to integrate VSD payments into your existing platforms, dApps, or backend systems.
          </BenefitCard>
          <BenefitCard icon={Users} title="Access a Growing DeFi Ecosystem">
            Become part of the VSD Network, connecting with innovative DeFi protocols, dApps, and a community focused on decentralized financial solutions.
          </BenefitCard>
          <BenefitCard icon={DollarSign} title="Transparent & On-Chain">
            Benefit from the transparency of blockchain technology. All VSD transactions are recorded on a public ledger, and the protocol is built with security and auditability in mind.
          </BenefitCard>
        </div>
      </section>

      <Separator />

      <section className="text-center">
        <Image
          src="https://placehold.co/800x400.png"
          alt="Businesses using VSD for crypto transactions"
          width={800}
          height={400}
          className="rounded-md my-8 shadow-md mx-auto"
          data-ai-hint="business crypto transaction"
        />
        <h2 className="font-headline text-3xl font-semibold mb-6">Ready to Integrate VSD?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Our developer portal provides all the resources you need to get started. Explore our SDKs, smart contract documentation, and integration guides.
        </p>
        <Button asChild size="lg" className="font-bold btn-hover-effect">
          <Link href="/developers">
            Visit Developer Portal <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
      
      <Separator />

      <section>
        <h2 className="font-headline text-3xl font-semibold text-center mb-10">Use Cases for VSD in Business</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md">
                <CardHeader><CardTitle>E-commerce & Online Sales</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Accept VSD for online sales, offering customers a stable cryptocurrency payment option. Reduce chargebacks and settlement delays associated with traditional payments.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Subscription Services & SaaS</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Manage recurring billing for SaaS products, content platforms, or memberships using VSD for predictable payment values in crypto.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Global Payroll & Contractor Payments</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Pay global employees and contractors quickly and efficiently using VSD, minimizing currency conversion hassles and banking delays.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>B2B Transactions & Invoicing</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Streamline payments between businesses, especially internationally. VSD offers faster, more transparent, and potentially cheaper settlements than traditional B2B payment methods.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Treasury Management</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Hold a portion of your business treasury in VSD for stability within the crypto market, or for easy access to DeFi yield opportunities.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Supply Chain & Trade Finance</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Utilize VSD for transparent and efficient payments in supply chains, potentially integrating with smart contracts for automated settlements.</p></CardContent>
            </Card>
        </div>
      </section>

      <Separator />

      <section className="text-center bg-card/70 p-8 md:p-12 rounded-lg shadow-xl">
        <h2 className="font-headline text-3xl font-bold mb-4">Partner with VSD Network</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          We are always looking for innovative businesses and projects to collaborate with. If you're interested in leveraging VSD, building on our network, or becoming a liquidity partner, let's connect.
        </p>
        <Button variant="outline" size="lg" className="btn-hover-effect">
          Contact Us For Partnership (Placeholder)
        </Button>
      </section>

    </div>
  );
}
