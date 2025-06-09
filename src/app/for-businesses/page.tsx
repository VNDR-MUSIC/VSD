
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Zap, Globe, Puzzle, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'VSD for Businesses',
  description: 'Integrate VSD stablecoin into your business for stable, efficient transactions and access to a growing digital economy.',
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
        <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">Power Your Business with VSD</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how the VSD stablecoin can revolutionize your transactions, streamline payments, and connect you to the future of digital commerce.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="font-headline text-3xl font-semibold text-center mb-10">Why Choose VSD for Your Business?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard icon={ShieldCheck} title="Stable Value Transactions">
            Mitigate volatility risks associated with traditional cryptocurrencies. VSD is designed for stability, making it ideal for pricing goods and services.
          </BenefitCard>
          <BenefitCard icon={Zap} title="Efficient & Low-Cost Payments">
            Experience faster settlement times and potentially lower transaction fees compared to traditional payment rails or other cryptocurrencies. (Actual fees depend on the underlying blockchain and network conditions).
          </BenefitCard>
          <BenefitCard icon={Globe} title="Global Reach & Accessibility">
            Tap into a global customer base. VSD enables seamless cross-border transactions without the complexities of currency conversions or intermediary banks.
          </BenefitCard>
          <BenefitCard icon={Puzzle} title="Easy Integration">
            Leverage our developer-friendly APIs, SDKs, and comprehensive documentation to integrate VSD payments into your existing platforms and applications.
          </BenefitCard>
          <BenefitCard icon={Users} title="Access a Growing Ecosystem">
            Become part of the VSD Network, connecting with innovative projects, dApps, and a community focused on decentralized finance.
          </BenefitCard>
          <BenefitCard icon={DollarSign} title="Transparent & Secure">
            Benefit from the transparency of blockchain technology. All VSD transactions are recorded on a public ledger, and the protocol is built with security in mind.
          </BenefitCard>
        </div>
      </section>

      <Separator />

      <section className="text-center">
        <AIImage
          initialSrc="https://placehold.co/800x400.png"
          alt="Businesses using VSD for transactions"
          width={800}
          height={400}
          className="rounded-md my-8 shadow-md mx-auto"
          hint="business transaction digital"
        />
        <h2 className="font-headline text-3xl font-semibold mb-6">Ready to Integrate VSD?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Our developer portal provides all the resources you need to get started. Explore our SDKs, API documentation, and integration guides.
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
                <CardHeader><CardTitle>E-commerce Payments</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Accept VSD for online sales, offering customers a stable and modern payment option. Reduce chargebacks and settlement delays.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Subscription Services</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Manage recurring billing for SaaS products, content platforms, or memberships using VSD for predictable payment values.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>In-App Purchases & Gaming</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Power your digital economy within games or applications. VSD can serve as a stable in-game currency or for purchasing digital goods.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>B2B Transactions & Invoicing</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Streamline payments between businesses, especially internationally. VSD offers faster, more transparent, and potentially cheaper settlements.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Payroll & Contractor Payments</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Pay global employees and contractors quickly and efficiently using VSD, minimizing currency conversion hassles.</p></CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader><CardTitle>Content Creator Monetization</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Enable direct, stable payments for content creators, artists, and freelancers from their audience or clients.</p></CardContent>
            </Card>
        </div>
      </section>

      <Separator />

      <section className="text-center bg-card/70 p-8 md:p-12 rounded-lg shadow-xl">
        <h2 className="font-headline text-3xl font-bold mb-4">Partner with VSD Network</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          We are always looking for innovative businesses and projects to collaborate with. If you're interested in leveraging VSD or building on our network, let's connect.
        </p>
        <Button variant="outline" size="lg" className="btn-hover-effect">
          {/* Placeholder for a contact link or modal */}
          Contact Us For Partnership (Placeholder)
        </Button>
      </section>

    </div>
  );
}
