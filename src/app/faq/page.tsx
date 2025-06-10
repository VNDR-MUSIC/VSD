
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'; // Added Button import
import { HelpCircle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VSD Network',
  description: 'Frequently Asked Questions about the VSD Network, VSD platform, its technology, usage, and security.',
};

const faqs = [
  {
    id: "what-is-vsd-network",
    question: "What is the VSD Network?",
    answer: "The VSD Network is a decentralized digital ecosystem centered around the VSD platform. Our mission is to provide a transparent, stable, and accessible digital platform that can be seamlessly integrated into various applications and services, aiming to bridge traditional digital services with decentralized possibilities."
  },
  {
    id: "what-is-vsd-platform",
    question: "What is the VSD platform/product?",
    answer: "VSD is a decentralized, asset-backed digital platform designed to maintain a stable reference value (e.g., pegged to the US Dollar). It serves as a primary medium for digital interactions and store of value within the VSD Network and its associated ecosystem projects."
  },
  {
    id: "how-value-maintained",
    question: "How is the VSD reference value maintained?",
    answer: "The VSD reference value is maintained through a combination of robust mechanisms including: <br />1. **Asset Backing:** Users interact with VSD by using approved digital assets of sufficient value. <br />2. **Arbitrage Incentives:** Market participants are incentivized to interact with the platform in ways that help restore the reference value if it deviates. <br />3. **Algorithmic Adjustments & Stability Modules:** The platform may include algorithmic mechanisms and stability modules to absorb volatility and maintain the peg during market fluctuations. <br />4. **Risk Management:** Positions or interactions that fall below certain thresholds are subject to automated processes to ensure the platform's stability."
  },
  {
    id: "what-network",
    question: "What underlying network/technology does VSD use?",
    answer: "VSD is initially deployed on [Specify Main Network/Technology, e.g., a specific distributed ledger or secure network]. We are actively exploring and developing solutions for cross-platform compatibility to enhance VSD's accessibility and utility. Please refer to our official <a href='/developers/documentation' class='text-primary hover:underline'>documentation</a> for the latest information on supported technologies."
  },
  {
    id: "how-to-get-vsd",
    question: "How can I acquire/use VSD units/services?",
    answer: "VSD units/services can be acquired or accessed through several methods: <br />1. **Platform Interaction:** By interacting with the VSD platform's core services using approved assets. <br />2. **Partner Platforms:** Exchanging or accessing VSD on various partner platforms where it is integrated. <br />3. **Ecosystem Engagement:** As the project grows, VSD may be available through select partner services. <br />Always check our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> and official announcements for verified sources."
  },
  {
    id: "benefits-of-vsd",
    question: "What are the primary benefits of using VSD?",
    answer: "VSD offers numerous advantages: <br />- **Value Stability:** Designed to minimize volatility compared to other digital assets. <br />- **Transparency:** All platform operations and backing (where applicable) are auditable on its underlying network. <br />- **Decentralization:** Aims for resilience and reduced reliance on single points of failure. <br />- **Efficiency:** Enables fast and potentially low-cost digital interactions. <br />- **Application Integration:** Seamlessly usable in various applications for payments, value storage, and more. <br />- **Accessibility:** Provides a stable digital value option for a global user base."
  },
  {
    id: "security-audits",
    question: "Is the VSD platform's core logic audited?",
    answer: "Yes, security is paramount for the VSD Network. Our core logic modules undergo multiple independent security audits conducted by reputable security firms. Audit reports are made publicly available in our <a href='/developers/documentation#security' class='text-primary hover:underline'>documentation</a> (ensure this link points to a valid section or document). We also may run ongoing bug bounty programs to encourage community security contributions."
  },
  {
    id: "business-integration",
    question: "How can businesses integrate VSD for payments or services?",
    answer: "Businesses can integrate VSD in several ways: <br />1. **Direct Integration:** Utilizing our <a href='/developers/sdks-tools' class='text-primary hover:underline'>SDKs</a> and APIs for custom solutions. <br />2. **Payment Processors:** Partnering with third-party payment processors that support VSD. <br />3. **Platform Plugins:** We aim to provide or support plugins for popular e-commerce and service platforms. <br />Visit our <a href='/for-businesses' class='text-primary hover:underline'>For Businesses page</a> and the <a href='/developers/documentation#integrating-vsd-for-payments' class='text-primary hover:underline'>payment integration guide</a> in our documentation for more details."
  },
  {
    id: "vsd-governance",
    question: "Who governs the VSD Network?",
    answer: "The VSD Network is designed for decentralized governance. Holders of a designated governance instrument (or potentially through other mechanisms) can participate in voting on platform upgrades, risk parameters, and other key decisions. Our <a href='/developers/documentation#governance-module' class='text-primary hover:underline'>documentation</a> provides more details on the governance model."
  },
  {
    id: "risks-associated",
    question: "What are the risks associated with VSD?",
    answer: "While VSD is designed for stability and security, all digital platform involvement carries risks, including: <br />- **Technology Vulnerabilities:** Despite audits, the risk of undiscovered bugs exists in any software. <br />- **Asset Volatility:** If VSD is backed by other assets, their value can fluctuate, which could impact VSD if extreme market events occur. <br />- **Data Feed Risks:** Dependence on external data feeds introduces a potential point of failure or manipulation. <br />- **Regulatory Uncertainty:** The legal and regulatory landscape for digital platforms is still evolving. <br />- **Market & Liquidity Risks:** Overall market conditions can affect the liquidity and demand for VSD. <br />We strongly advise users to do their own research (DYOR) and understand these risks."
  },
  {
    id: "transaction-fees",
    question: "What are the transaction fees for using VSD?",
    answer: "Transaction fees for VSD interactions are determined by the underlying network it operates on. The VSD platform itself generally does not add extra fees for standard transfers or interactions. However, specific platform functions might incur protocol-specific fees. Always check for estimated costs before confirming any transaction."
  },
  {
    id: "vsd-vs-other-platforms",
    question: "How does VSD compare to other digital value platforms?",
    answer: "VSD aims to distinguish itself through its commitment to decentralization, transparency of its operational model and backing (where applicable), and a robust, community-focused governance model. Unlike some systems that rely on centralized custodians, VSD's value and operations are secured by its underlying technology and distributed network. Our focus is on resilience and providing a truly decentralized stable medium of exchange."
  },
  {
    id: "use-in-applications",
    question: "Can VSD be used in various digital applications?",
    answer: "Absolutely. VSD is designed for deep integration within the digital ecosystem. It can serve as stable backing in lending/borrowing platforms, a reliable trading pair on exchanges, a means for yield generation, and a stable unit of account in various strategies. Explore our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> to see examples."
  },
  {
    id: "backing-value-drop",
    question: "What happens if the value of assets backing VSD drops significantly?",
    answer: "The VSD platform has built-in mechanisms like over-backing (if applicable) and automated risk management processes. If the value of a user's backing assets falls below a specific threshold, their position may become eligible for liquidation or other mitigation steps. This process ensures the overall stability and solvency of the VSD platform."
  },
  {
    id: "whitepaper-location",
    question: "Where can I find the VSD Network whitepaper or detailed technical documentation?",
    answer: "The VSD Network whitepaper, along with in-depth technical specifications and architectural details, is available on our <a href='/developers/documentation' class='text-primary hover:underline'>Developer Documentation site</a>. We encourage thorough review for a comprehensive understanding of the platform."
  },
  {
    id: "technical-support",
    question: "How can I get technical support or ask more questions?",
    answer: "For technical assistance, further questions, or to engage with our community, please join our official channels such as Discord or Telegram (links can be found on the <a href='/developers#community' class='text-primary hover:underline'>Developer Portal</a>). Our team and community members are active and ready to help."
  },
  {
    id: "contribute-to-ecosystem",
    question: "How can I contribute to the VSD Network ecosystem?",
    answer: "There are numerous ways to contribute: <br />- **Develop Applications:** Build applications that integrate VSD or create tools for the ecosystem. <br />- **Provide Liquidity/Support:** Supply VSD to liquidity pools on exchanges or support platform operations. <br />- **Participate in Governance:** Engage in discussions and vote on governance proposals. <br />- **Community Building:** Help educate new users, translate documentation, or create content. <br />- **Security Research:** Participate in bug bounty programs (if active) by responsibly disclosing vulnerabilities. <br />Visit our <a href='/developers' class='text-primary hover:underline'>Developer Portal</a> for more ideas and resources."
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
          Your questions about the VSD Network, VSD platform, and our ecosystem, answered.
        </p>
      </header>

      <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-lg md:text-xl text-left hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base md:text-lg text-muted-foreground prose prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80"
                  htmlString={faq.answer.replace(/\n<br \/>/g, '<br />').replace(/\n/g, '<br />')}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <section className="mt-16 text-center">
        <Card className="inline-block p-8 bg-card/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="font-headline text-2xl">Can't Find Your Answer?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                If your question isn't covered here, please dive into our detailed <Link href="/developers/documentation" className="text-primary hover:underline">documentation</Link> or connect with our vibrant community.
                </p>
                <Link href="/developers#community">
                  <Button variant="outline">
                      Explore Docs & Join Community
                  </Button>
                </Link>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
