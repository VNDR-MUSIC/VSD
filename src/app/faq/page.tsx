
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
    answer: "VSD is a utility token that powers the VSD Network, a decentralized platform offering AI-driven tools and services (like IMG Services for content/image generation). It's used to access these AI services, participate in staking for rewards, and vote on platform governance proposals through the VSD DAO."
  },
  {
    id: "primary-utility",
    question: "What are the main uses (utility) of VSD tokens?",
    answer: "The primary utilities of VSD tokens include: <br/>1. **Accessing AI Services:** Paying for usage of AI tools on the VSD Network (e.g., IMG Services). <br/>2. **Staking:** Earning VSD rewards by staking tokens. <br/>3. **Governance:** Participating in DAO voting for platform decisions. <br/>4. **Discounts & Premium Features:** Unlocking benefits on the VSD Network and partner platforms (e.g., AiEar, PromoHub). <br/>5. **Fee Mechanism:** A portion of platform fees may be used for token burns or redistributed to stakers."
  },
  {
    id: "how-to-get-vsd",
    question: "How can I acquire VSD tokens?",
    answer: "Initially, VSD tokens can be acquired through our official <a href='/token#presale' class='text-primary hover:underline'>Public Presale</a> and prior Private Sale rounds. After the Token Generation Event (TGE) and initial distribution, VSD is planned to be listed on Decentralized Exchanges (DEXs) and potentially Centralized Exchanges (CEXs) for broader accessibility. Always use official links and channels provided on this website to avoid scams."
  },
  {
    id: "presale-details",
    question: "Can you provide details about the VSD Token Presale?",
    answer: "The VSD Token Presale will be conducted in phases. The initial public presale aims to raise $500,000 USD (ETH/USDT equivalent). Key details such as token price, accepted currencies (ETH, USDT), minimum/maximum contributions, and KYC/AML requirements will be published on our <a href='/token#presale' class='text-primary hover:underline'>Token Page</a> and official announcement channels. Participation will be through a dedicated presale portal."
  },
  {
    id: "total-supply-allocation",
    question: "What is the total supply and token allocation for VSD?",
    answer: "The total supply of VSD tokens is fixed at 1,000,000,000 (1 Billion). The allocation is as follows: <br/>- Public Presale: 20% <br/>- Private Sale: 10% <br/>- Staking Rewards & Ecosystem Incentives: 30% <br/>- Team & Advisors: 15% (vested) <br/>- Ecosystem Development Fund: 15% <br/>- Marketing & Liquidity: 10% <br/>More details are in the <a href='/developers/documentation#tokenomics' class='text-primary hover:underline'>Whitepaper</a>."
  },
  {
    id: "is-vsd-security",
    question: "Is VSD token considered a security?",
    answer: "VSD is designed as a utility token to access services and participate in governance on the VSD Network. It is not intended to be a security. However, regulations vary by jurisdiction. We strongly advise you to consult with your legal and financial advisors. Please read our full <a href='/developers/documentation#legal' class='text-primary hover:underline'>Legal Disclaimer</a>."
  },
  {
    id: "jurisdiction",
    question: "What country/jurisdiction is the VSD project registered in?",
    answer: "The VSD project is planned to operate under the VSD Foundation (or a similar entity), which is intended to be registered in a crypto-friendly jurisdiction like the British Virgin Islands (BVI) to support its global operations and ensure regulatory clarity. This is subject to final legal structuring."
  },
  {
    id: "use-of-funds",
    question: "How will the funds raised from the presale be used?",
    answer: "Funds raised will be primarily allocated to: <br/>- Platform development and AI model integration (IMG Services, etc.). <br/>- Marketing, community building, and global outreach. <br/>- Legal, compliance, and operational expenses. <br/>- Securing initial exchange listings and providing liquidity. <br/>A detailed breakdown will be available in our official documentation."
  },
  {
    id: "staking-rewards",
    question: "How do staking rewards work for VSD?",
    answer: "VSD token holders can stake their tokens in a dedicated staking dApp to earn Annual Percentage Yield (APY). Rewards are distributed from the 'Staking Rewards & Ecosystem Incentives' pool. We plan to implement tiered rewards, potentially offering higher APY for larger stakes or longer lock-up periods, to incentivize long-term commitment."
  },
  {
    id: "ai-tools-access",
    question: "What kind of AI tools can I access with VSD tokens?",
    answer: "VSD tokens will grant access to a suite of AI tools on the VSD Network. This will initially include 'IMG Services' for advanced AI-powered image generation and editing, AI content creation assistants, and potentially data analysis tools. The range of tools will expand over time as per our <a href='/developers/documentation#roadmap' class='text-primary hover:underline'>Roadmap</a>."
  },
  {
    id: "security-audits",
    question: "Are the VSD smart contracts audited?",
    answer: "Yes, security is a top priority. All core VSD smart contracts (token, staking, governance) will undergo rigorous independent security audits by reputable blockchain security firms before full deployment. Audit reports will be made publicly available in our <a href='/developers/documentation' class='text-primary hover:underline'>Whitepaper/Documentation</a>."
  },
  {
    id: "blockchain-network",
    question: "What blockchain will VSD operate on?",
    answer: "VSD is planned to be initially deployed on a scalable and secure blockchain like Ethereum (as an ERC20 token) or a Layer 2 solution such as Polygon for lower transaction fees and faster speeds. The final choice will prioritize security, scalability, and ecosystem compatibility. Details will be confirmed closer to the TGE."
  },
   {
    id: "risks-involved",
    question: "What are the risks involved in purchasing VSD tokens?",
    answer: "Purchasing utility tokens like VSD involves risks, including market volatility, technological risks (smart contract vulnerabilities), project development risks (roadmap execution), and regulatory uncertainties. The value of VSD can fluctuate. We advise you to do your own research (DYOR), understand these risks, never invest more than you can afford to lose, and consult our <a href='/developers/documentation#legal' class='text-primary hover:underline'>Legal Disclaimer</a>."
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
            {faqs.map((faq) => (
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
