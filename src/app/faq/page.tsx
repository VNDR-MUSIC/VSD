
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { HelpCircle, BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VSD Utility Token',
  description: 'Frequently Asked Questions about the VSD Utility Token, its AI platform, presale, tokenomics, and ecosystem.',
};

const faqs = [
  {
    id: "what-is-vsd-token",
    question: "What is the VSD Utility Token?",
    answer: "VSD is the official utility token for the Independent Music Group (IMG) ecosystem. It functions as the essential currency required to access a decentralized platform of AI-driven tools and services, most notably the IMG Services suite for content and image generation. VSD fuels the entire network, enabling transactions, rewarding participation, and governing the platform's future."
  },
  {
    id: "primary-utility",
    question: "What are the main uses (utility) of VSD tokens?",
    answer: "The primary utilities are: <br/>1. **Accessing AI Services:** Holding and using VSD is the primary way to access exclusive AI tools, including IMG Services. <br/>2. **Unlocking Premium Features:** VSD holders can get discounts and unlock premium capabilities on the platform. <br/>3. **Staking for Rewards:** Earn platform rewards (yield) by staking VSD tokens as a reward for network participation. <br/>4. **Governance:** Participate in DAO voting to influence key decisions about the platform's development and treasury. <br/>5. **Fee Mechanism:** A portion of platform fees may be used for token burns or redistributed to stakers."
  },
  {
    id: "how-to-get-vsd",
    question: "How can I acquire VSD tokens?",
    answer: "The initial opportunity to acquire VSD tokens is through our official <a href='/token#presale' class='text-primary hover:underline'>Public Presale</a>. This is the first step to becoming a participant in the ecosystem and unlocking access to AI tools. After the presale and distribution events, VSD is planned for listing on decentralized exchanges (DEXs). Always use official links provided on this website."
  },
   {
    id: "ai-tools-access",
    question: "What kind of AI tools can I access with VSD tokens?",
    answer: "VSD tokens grant access to a growing suite of AI tools on the VSD Network. The flagship offering is **IMG Services**, an advanced suite for AI-powered image generation, content creation, and editing. Holding VSD unlocks access, and usage is metered in VSD. The range of tools will expand over time as per our <a href='/developers/documentation#roadmap' class='text-primary hover:underline'>Roadmap</a>."
  },
  {
    id: "presale-details",
    question: "Why should I participate in the VSD Token Presale?",
    answer: "Participating in the presale is the earliest opportunity to acquire the VSD utility tokens required to access the ecosystem's AI tools, like IMG Services. It allows you to support the VSD ecosystem from its inception and secure tokens at an early-stage valuation. All details, including price and KYC/AML requirements, are on our <a href='/token#presale' class='text-primary hover:underline'>Token Page</a>."
  },
  {
    id: "total-supply-allocation",
    question: "What is the total supply and token allocation for VSD?",
    answer: "The total supply of VSD tokens is transparently fixed at **1,000,000,000 (1 Billion)** to ensure a sustainable economic model. The allocation is as follows: <br/>- Public Presale: 20% <br/>- Private Sale: 10% <br/>- Staking Rewards & Ecosystem Incentives: 30% <br/>- Team & Advisors: 15% (vested) <br/>- Ecosystem Development Fund: 15% <br/>- Marketing & Liquidity: 10% <br/>More details are in the <a href='/developers/documentation#tokenomics' class='text-primary hover:underline'>Whitepaper</a>."
  },
  {
    id: "is-vsd-security",
    question: "Is VSD token considered a security?",
    answer: "VSD is designed as a utility token to access services and participate in governance on the VSD Network. It is not intended to be a security. However, regulations vary by jurisdiction. We strongly advise you to consult with your own legal and financial advisors. Please read our full <a href='/developers/documentation#legal' class='text-primary hover:underline'>Legal Disclaimer</a>."
  },
  {
    id: "staking-rewards",
    question: "How do staking rewards work for VSD?",
    answer: "VSD token holders can stake their tokens in a dedicated dApp to earn a yield, distributed from the 'Staking Rewards' allocation, as a reward for helping to secure the network. This not only provides a way to participate more deeply in the platform but also contributes to the security and stability of the ecosystem. Tiered rewards for larger or longer-term stakes are planned."
  },
  {
    id: "governance-explained",
    question: "How does governance work?",
    answer: "VSD token holders have a voice in the ecosystem's future. By participating in the VSD Governance DAO, you can vote on proposals related to platform upgrades, treasury management, new feature development, and more. This ensures the platform evolves in a way that benefits its actual users and stakeholders."
  },
  {
    id: "use-of-funds",
    question: "How will the funds raised from the presale be used?",
    answer: "Funds raised will be primarily allocated to: <br/>- Platform development and AI model integration (IMG Services, etc.). <br/>- Marketing, community building, and global outreach. <br/>- Legal, compliance, and operational expenses. <br/>- Securing initial exchange listings and providing liquidity. <br/>A detailed breakdown will be available in our official documentation."
  },
  {
    id: "whitepaper-location",
    question: "Where can I find the VSD Token Whitepaper?",
    answer: "The official VSD Token Whitepaper, detailing our vision, technology, tokenomics, roadmap, and legal information, is available on our <a href='/developers/documentation' class='text-primary hover:underline'>Documentation page</a>."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <header className="text-center mb-10 sm:mb-12">
        <HelpCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
          Answers to common questions about the VSD Utility Token, the VSD Network AI platform, our presale, and tokenomics.
        </p>
      </header>

      <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.sort((a, b) => faqs.indexOf(a) - faqs.indexOf(b)).map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-md sm:text-lg md:text-xl text-left hover:no-underline py-4 sm:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm sm:text-base md:text-lg text-muted-foreground prose prose-sm sm:prose-base prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <section className="mt-12 sm:mt-16 text-center">
        <Card className="inline-block p-6 sm:p-8 bg-card/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
                <BrainCircuit className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-3" />
                <CardTitle className="font-headline text-xl sm:text-2xl">Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto text-sm sm:text-base">
                If your question isn't covered here, please dive into our detailed <Link href="/developers/documentation" className="text-primary hover:underline">Whitepaper</Link> or connect with our community.
                </p>
                <Link href="/developers#community">
                  <Button variant="outline">
                      Read Whitepaper & Join Community
                  </Button>
                </Link>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
