
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Landmark, FileText, AlertTriangle } from 'lucide-react';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'Compliance & Regulatory Approach | VSD Network',
  description: 'Understanding VSD Network\'s commitment to compliance, our token\'s utility focus, and approach to the evolving regulatory landscape, including SEC considerations.',
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
        <p>At VSD Network, we recognize the importance of building a sustainable and trustworthy ecosystem. We are dedicated to understanding and adhering to applicable laws and regulations in the jurisdictions where we operate or offer our services. Our approach is guided by a commitment to transparency, security, and the long-term viability of the VSD Network.</p>
        <p>We actively monitor the evolving regulatory environment for digital assets and AI technologies to adapt our practices accordingly. While we strive to operate in a compliant manner, the regulatory landscape is dynamic and subject to change.</p>
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
        <p>The VSD Token is designed primarily as a **utility token**. Its core purpose is to grant users access to services and functionalities within the VSD Network ecosystem, such as:</p>
        <ul className="list-disc pl-5">
          <li>Accessing AI-powered tools and "IMG Services".</li>
          <li>Participating in platform governance through the VSD DAO.</li>
          <li>Staking for rewards and potential platform benefits.</li>
          <li>Unlocking exclusive features or discounts on the VSD Network and partner platforms.</li>
        </ul>
        <p>Consistent with guidance from various regulatory bodies, including interpretations related to instruments like the Howey Test in the United States, the VSD Token is **not intended to be marketed, offered, or sold as a security or investment contract**. Purchasers should acquire VSD Tokens for their utility within the VSD Network, not with the expectation of profit derived solely from the efforts of others.</p>
        <p>We aim to ensure that the development, marketing, and distribution of VSD Tokens are consistent with this utility-focused approach. For a comprehensive understanding of the VSD Token's functionalities and legal considerations, please refer to our <Link href="/developers/documentation#legal">Whitepaper's Legal Disclaimer</Link>.</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={AlertTriangle} title="Navigating the Regulatory Landscape & KYC/AML">
        <p>The regulatory framework for digital assets, cryptocurrencies, and AI-driven platforms is still developing globally, with varying approaches across different jurisdictions, including the United States under agencies like the SEC and FinCEN.</p>
        <p>VSD Network intends to operate under the VSD Foundation (or a similar entity), which is planned for registration in a jurisdiction with a clear regulatory framework for digital assets, such as the British Virgin Islands. This choice aims to provide a stable legal foundation for our global operations.</p>
        <p><strong>Know Your Customer (KYC) and Anti-Money Laundering (AML) Practices:</strong> To promote a secure and compliant presale environment, VSD Network will implement KYC/AML procedures for participants in the VSD token presale. These measures are designed to prevent illicit activities and adhere to recognized standards for token sales.</p>
        <p>We are committed to taking necessary steps to comply with applicable regulations. However, participants are solely responsible for understanding and complying with the laws and regulations of their respective jurisdictions concerning the purchase, holding, and use of VSD Tokens.</p>
      </SectionCard>
      
      <Separator />

      <Card className="bg-destructive/10 border-destructive text-destructive-foreground p-6 shadow-lg">
        <CardHeader className="!p-0">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-7 w-7 text-destructive" />
            <CardTitle className="text-destructive text-xl sm:text-2xl">Important Disclaimer</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="!pt-4 !px-0 !pb-0 prose prose-sm sm:prose-base max-w-none">
          <p>The information provided on this page and throughout the VSD Network website does not constitute legal, financial, or investment advice. It is for informational purposes only.</p>
          <p>The regulatory status of digital tokens can be uncertain and may vary by jurisdiction. You should conduct your own thorough research and consult with qualified legal, financial, and tax advisors in your jurisdiction before making any decision to acquire or use VSD Tokens.</p>
          <p>VSD Network makes no warranties or representations regarding the regulatory treatment of VSD Tokens. By participating in the VSD ecosystem, you acknowledge and accept the inherent risks, including regulatory risks. Please refer to the full <Link href="/developers/documentation#legal" className="text-destructive hover:underline">Legal Disclaimer in our Whitepaper</Link> for more detailed information on risks and limitations.</p>
        </CardContent>
      </Card>

    </div>
  );
}

    