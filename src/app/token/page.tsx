
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, BarChart2, Users, Shield, Target, Briefcase, ShoppingCart, Repeat, Gamepad2, FileText, Mic2 } from "lucide-react";
import Image from "next/image"; // Replaced AIImage with next/image
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VSD Product Information',
  description: 'Detailed information about the VSD platform, its features, metrics, and business use cases.',
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

const UseCaseCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="shadow-md h-full">
        <CardHeader className="flex flex-row items-center space-x-3 pb-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-sm">{children}</p>
        </CardContent>
    </Card>
);


export default function ProductPage() { // Renamed from TokenPage
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Product Details</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the core aspects of VSD, the platform designed for reliability and utility in the digital economy.
        </p>
      </header>

      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">What is VSD?</h2>
        <Card className="shadow-lg">
          <CardContent className="p-8 text-lg">
            <p className="mb-4">
              VSD is a decentralized platform providing a stable and reliable medium for digital interactions and value exchange. It is designed to offer consistent value, benchmarked against traditional measures.
            </p>
            <p>
              Built on transparent and auditable systems, VSD aims to provide a resilient alternative to conventional digital value systems, empowering users with control and access to innovative services.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureItem icon={Target} title="Decentralized & Resilient">
            VSD operates on a distributed infrastructure, ensuring high availability and resistance to single points of failure.
          </FeatureItem>
          <FeatureItem icon={Shield} title="Value Stability">
            Maintains its value proposition through a system of backing and automated adjustments, managed by its core logic.
          </FeatureItem>
          <FeatureItem icon={Users} title="Community Guided">
            Key parameters and upgrades to the VSD platform can be influenced by its community of users and stakeholders.
          </FeatureItem>
          <FeatureItem icon={BarChart2} title="Transparent & Auditable">
            All platform activities and value metrics are publicly verifiable, fostering trust and accountability.
          </FeatureItem>
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">Platform Metrics Overview</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Understanding VSD's Operational Model</CardTitle>
             <CardDescription>VSD's operational model is designed for stability, utility, and ecosystem growth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The operational model of VSD focuses on maintaining its value, ensuring sufficient backing where applicable, and incentivizing participation across its ecosystem. This includes mechanisms for accessing VSD services and potential governance input for stakeholders. (Specific details like total units, distribution, and value-adjustment mechanisms should be detailed here based on VSD's actual design).
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <Image 
                src="https://placehold.co/800x400.png" // Was initialSrc
                alt="Platform metrics chart placeholder"
                width={800}
                height={400}
                className="rounded-md mx-auto shadow-md"
                data-ai-hint="financial chart graph"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center pt-2">
              (Example: A chart showing asset backing ratios, or VSD unit dynamics.)
            </p>
          </CardContent>
        </Card>
      </section>
      
      <Separator />
       <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">Use Cases for Businesses</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">VSD offers a stable and efficient digital solution for a variety of commercial applications.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UseCaseCard icon={ShoppingCart} title="E-commerce Transactions">
                Accept VSD for online sales. Benefit from potentially lower fees, faster settlement, and reduced reversal risk compared to traditional methods.
            </UseCaseCard>
            <UseCaseCard icon={Repeat} title="Subscription Services">
                Implement VSD for recurring billing in SaaS, content platforms, or memberships, offering customers a stable and predictable payment method.
            </UseCaseCard>
            <UseCaseCard icon={Gamepad2} title="In-App & In-Service Purchases">
                Utilize VSD as a stable in-app or in-service unit for digital goods, services, or virtual assets, simplifying microtransactions.
            </UseCaseCard>
            <UseCaseCard icon={Briefcase} title="B2B Transactions">
                Streamline business-to-business payments, especially cross-border, with VSD's efficiency and transparency.
            </UseCaseCard>
            <UseCaseCard icon={FileText} title="Invoice Payments">
                Settle invoices quickly and securely using VSD, reducing administrative overhead and processing times.
            </UseCaseCard>
            <UseCaseCard icon={Mic2} title="Creator & Freelancer Payouts">
                 Enable direct and stable payments to content creators, artists, and freelancers globally, bypassing traditional banking delays.
            </UseCaseCard>
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="font-headline text-3xl font-semibold text-center">How to Get VSD</h2>
         <Card className="shadow-lg">
          <CardContent className="p-8">
            <p className="text-lg text-muted-foreground">
              VSD units can typically be acquired through several avenues within the digital ecosystem:
            </p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-lg text-muted-foreground pl-4">
              <li>
                <strong>Platform Access:</strong> Users can obtain VSD units by interacting with the VSD platform's core services. (Refer to our <a href="/developers/documentation#core-logic" className="text-primary hover:underline">Core Logic documentation</a> for details).
              </li>
              <li>
                <strong>Partner Exchanges:</strong> VSD may be available for exchange on various partner platforms. (Check our <a href="/ecosystem" className="text-primary hover:underline">Ecosystem page</a> for listed platforms).
              </li>
              <li>
                <strong>Ecosystem Participation:</strong> Some projects within the VSD ecosystem might offer VSD as rewards or incentives for certain activities.
              </li>
            </ul>
            <p className="mt-6 text-sm text-center text-primary font-medium">
              Always ensure you are interacting with official VSD platform interfaces and reputable exchanges. Verify platform details before any transaction.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
