
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Landmark, FileText, AlertTriangle, UserCheck, MapPin } from 'lucide-react';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'Compliance & Regulatory Approach | VSD Network',
  description: 'Understanding VSD Network\'s commitment to compliance, our token\'s utility focus, and our approach to the evolving regulatory landscape.',
};

const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
    <CardHeader>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        <CardTitle className="font-headline text-xl sm:text-2xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
      {children}
    </CardContent>
  </Card>
);

export default function CompliancePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <ShieldAlert className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Compliance & Regulatory Approach</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          VSD Network is committed to navigating the complex regulatory landscape responsibly and transparently.
        </p>
      </header>

      <Separator />

      <SectionCard icon={Landmark} title="Our Commitment to a Responsible Framework">
        <p>At VSD Network, we recognize the importance of building a sustainable and trustworthy ecosystem for the Independent Music Group (IMG) and its community. We are dedicated to understanding and adhering to applicable laws and regulations. Our approach is guided by a commitment to transparency, security, and the long-term viability of the VSD Network and the IMG Banking System.</p>
        <p>We actively monitor the evolving regulatory environment for digital assets and AI technologies to adapt our practices accordingly.</p>
         <AIImage
            initialSrc="https://placehold.co/700x350.png"
            alt="Global regulatory compliance concept"
            width={700}
            height={350}
            className="rounded-md my-6 shadow-md mx-auto"
            hint="compliance global standards"
        />
      </SectionCard>

      <Separator />

      <SectionCard icon={FileText} title="Understanding VSD Token: A Utility Focus">
        <p>The VSD Token is designed primarily as a **utility token**. Its core purpose is to grant users access to services and functionalities within the VSD Network ecosystem, such as paying for AI services, participating in governance, and facilitating transactions. Consistent with guidance from various regulatory bodies, the VSD Token is **not intended to be marketed, offered, or sold as a security or investment contract**. Purchasers should acquire VSD Tokens for their utility, not with the expectation of profit derived solely from the efforts of others.</p>
        <p>For a comprehensive understanding, please refer to our <Link href="/developers/documentation#legal">Whitepaper's Legal Disclaimer</Link>.</p>
      </SectionCard>

      <Separator />

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <SectionCard icon={UserCheck} title="KYC/AML & User Roles">
          <p>To promote a secure and compliant environment, VSD Network will implement Know Your Customer (KYC) and Anti-Money Laundering (AML) procedures for participants in the VSD token presale and for high-value transactions. This helps prevent illicit activities. Furthermore, our Compliance Layer allows for user role tagging (e.g., Artist, Investor, Developer) to apply appropriate access levels and permissions within the ecosystem.</p>
        </SectionCard>
        <SectionCard icon={MapPin} title="Geo-Fencing & Sanctions">
          <p>The VSD platform will incorporate geo-fencing capabilities to restrict access to certain features or services in jurisdictions where they may be prohibited. We are committed to complying with international sanctions and will implement blacklist/whitelist logic for wallets to prevent interaction with flagged addresses or sanctioned regions, safeguarding the integrity of the ecosystem.</p>
        </SectionCard>
      </div>

      <Separator />
      
      <Card className="bg-destructive/10 border-destructive text-destructive-foreground p-6 shadow-lg">
        <CardHeader className="!p-0">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            <CardTitle className="text-destructive text-xl sm:text-2xl">Important Disclaimer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="!pt-4 !px-0 !pb-0 prose prose-sm sm:prose-base max-w-none">
          <p>The information provided on this page does not constitute legal, financial, or investment advice. The regulatory status of digital tokens can be uncertain and may vary by jurisdiction. You should conduct your own thorough research and consult with qualified legal, financial, and tax advisors before making any decision to acquire or use VSD Tokens.</p>
        </CardContent>
      </Card>
    </div>
  );
}
