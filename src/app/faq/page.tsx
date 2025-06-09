
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, AlertTriangle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VSD Network',
  description: 'Frequently Asked Questions about the VSD Network, VSD stablecoin, its technology, usage, and security.',
};

const faqs = [
  {
    question: "What is the VSD Network?",
    answer: "The VSD Network is a decentralized financial ecosystem built around the VSD stablecoin. Its goal is to provide a stable, transparent, and accessible digital currency for various applications, from everyday payments to complex financial instruments in DeFi."
  },
  {
    question: "What is the VSD token?",
    answer: "VSD is a decentralized, collateral-backed stablecoin designed to maintain a soft peg to the US Dollar (USD). It aims to combine the stability of traditional fiat currency with the transparency and efficiency of blockchain technology."
  },
  {
    question: "How is the VSD peg to the US Dollar maintained?",
    answer: "The VSD peg is maintained through a combination of mechanisms: \n1. **Over-collateralization:** Users mint VSD by locking up approved crypto assets (like ETH, wBTC) of greater value than the VSD minted. \n2. **Arbitrage Incentives:** If VSD trades above $1, users can mint VSD and sell it for a profit. If it trades below $1, users can buy VSD cheaply and use it to redeem collateral at a $1 valuation or repay their debt, profiting from the difference. \n3. **Algorithmic Adjustments:** The protocol may employ algorithmic mechanisms to adjust minting/burning rates or collateral requirements to help maintain stability. \n4. **Liquidations:** If a user's collateral value drops below a certain threshold, their position can be liquidated to ensure the VSD supply remains sufficiently backed."
  },
  {
    question: "What blockchain is VSD on?",
    answer: "VSD is initially deployed on [Specify Blockchain, e.g., Ethereum Mainnet]. We are actively researching and developing cross-chain solutions to expand VSD's availability and utility across multiple blockchain networks. Check our <a href='/developers/documentation' class='text-primary hover:underline'>documentation</a> for the most up-to-date information."
  },
  {
    question: "Where can I get VSD tokens?",
    answer: "You can acquire VSD tokens in several ways: \n1. **Minting:** By depositing approved collateral into the VSD protocol's smart contracts. \n2. **Decentralized Exchanges (DEXs):** VSD is typically listed on various DEXs where you can trade it for other cryptocurrencies. Visit our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> for a list of supported platforms. \n3. **Centralized Exchanges (CEXs):** We are working to list VSD on reputable centralized exchanges. Announcements will be made as listings go live."
  },
  {
    question: "What are the benefits of using VSD?",
    answer: "VSD offers several benefits: \n- **Stability:** Designed to minimize price volatility common with other cryptocurrencies. \n- **Transparency:** All transactions and collateral reserves are verifiable on the blockchain. \n- **Accessibility:** Provides access to digital currency for users globally. \n- **Efficiency:** Potentially faster and lower-cost transactions compared to traditional banking. \n- **DeFi Integration:** Can be used in various DeFi applications like lending, borrowing, and yield farming. \n- **Censorship Resistance:** As a decentralized stablecoin, it aims to be more resistant to control by single entities."
  },
  {
    question: "Is VSD secure? Are the smart contracts audited?",
    answer: "Security is a top priority for the VSD Network. The smart contracts that govern the VSD token and its collateralization mechanisms undergo rigorous internal testing and multiple independent security audits by reputable firms. You can find links to audit reports on our <a href='/developers/documentation#security' class='text-primary hover:underline'>documentation page</a> (Placeholder - update link). We also encourage community review and may run bug bounty programs."
  },
  {
    question: "How can businesses integrate VSD for payments?",
    answer: "Businesses can integrate VSD by: \n1. **Direct Integration:** Using our <a href='/developers/sdks-tools' class='text-primary hover:underline'>SDKs (JavaScript, Python, etc.)</a> and APIs to interact with VSD smart contracts for processing payments. \n2. **Payment Processors:** We are working with third-party payment processors to support VSD, which can simplify integration. \n3. **E-commerce Plugins:** Future development may include plugins for popular e-commerce platforms. Refer to our <a href='/for-businesses' class='text-primary hover:underline'>For Businesses page</a> and <a href='/developers/documentation#integrating-vsd-for-payments' class='text-primary hover:underline'>payment integration guide</a> for details."
  },
  {
    question: "Who governs the VSD Network?",
    answer: "The VSD Network aims for decentralized governance. Key protocol parameters, upgrades, and risk management decisions are typically proposed and voted on by holders of a VSD governance token (if applicable) or potentially by VSD holders themselves through a Decentralized Autonomous Organization (DAO). Details on the governance model can be found in our <a href='/developers/documentation#governance-module-dao' class='text-primary hover:underline'>documentation</a> or whitepaper."
  },
  {
    question: "What are the risks associated with VSD?",
    answer: "Like any financial instrument or cryptocurrency, VSD carries risks: \n- **Smart Contract Risk:** Despite audits, vulnerabilities in smart contracts could exist. \n- **Collateral Volatility:** The value of underlying collateral can fluctuate, potentially impacting peg stability if not managed properly by the protocol. \n- **Oracle Risk:** Reliance on oracles for price feeds introduces a potential point of failure or manipulation. \n- **Regulatory Risk:** The regulatory landscape for stablecoins is evolving and could impact VSD. \n- **Market Risk:** Overall cryptocurrency market conditions can affect liquidity and demand for VSD. We recommend users understand these risks before interacting with the VSD Network."
  },
  {
    question: "What are the transaction fees for using VSD?",
    answer: "Transaction fees for VSD depend on the underlying blockchain network it's operating on (e.g., Ethereum gas fees). The VSD protocol itself does not typically impose additional transaction fees for simple transfers, but fees might apply for minting, redeeming, or interacting with specific DeFi functionalities. Always check the transaction details in your wallet before confirming."
  },
  {
    question: "How does VSD compare to other stablecoins?",
    answer: "VSD aims to differentiate itself through its commitment to decentralization, transparency in its collateral backing, and community-driven governance. While some stablecoins are backed by fiat currency held in bank accounts (centralized), VSD is crypto-collateralized on-chain. Our focus is on building a robust and resilient stablecoin that serves the needs of the evolving digital economy."
  },
  {
    question: "Can I use VSD in Decentralized Finance (DeFi) applications?",
    answer: "Yes, VSD is designed to be highly compatible with the DeFi ecosystem. It can be used as collateral for loans, a stable asset for lending and borrowing, a means of exchange in decentralized exchanges, and a component in various yield farming and liquidity provision strategies. Explore our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> to see projects integrating VSD."
  },
  {
    question: "What happens if the value of collateral backing VSD drops significantly?",
    answer: "The VSD protocol includes mechanisms to handle drops in collateral value. Positions that become undercollateralized (i.e., the value of locked collateral falls below a required minimum ratio relative to the minted VSD) are subject to liquidation. During liquidation, the collateral is sold off to repay the VSD debt, ensuring the VSD supply remains adequately backed. This is a critical process for maintaining peg stability."
  },
  {
    question: "Where can I find the VSD Network whitepaper?",
    answer: "The VSD Network whitepaper, which provides in-depth details about the protocol's design, mechanics, and vision, can be found on our <a href='/developers/documentation' class='text-primary hover:underline'>documentation site</a>. (Placeholder - ensure a link to the whitepaper is available there)."
  },
  {
    question: "How can I get technical support or ask more questions?",
    answer: "For technical support or further questions, please join our community channels (e.g., Discord, Telegram - links available on the <a href='/developers#community' class='text-primary hover:underline'>Developer Portal</a>) or reach out through our official support email if provided. Our community and team are there to help."
  },
  {
    question: "How can I contribute to the VSD Network ecosystem?",
    answer: "There are many ways to contribute: \n- **Develop Applications:** Build new dApps or integrate VSD into existing services. \n- **Provide Liquidity:** Add VSD to liquidity pools on DEXs. \n- **Participate in Governance:** Engage in discussions and vote on proposals (once the DAO is fully active). \n- **Community Support:** Help answer questions and onboard new users. \n- **Bug Bounties:** Participate in identifying and reporting vulnerabilities (if a program is active). Check our <a href='/developers' class='text-primary hover:underline'>Developer Portal</a> for more information."
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
          Find answers to common questions about the VSD Network, VSD token, and our ecosystem.
        </p>
      </header>

      <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg md:text-xl text-left hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-muted-foreground prose prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80"
                  dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br />') }}
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
                <CardTitle className="font-headline text-2xl">Still Have Questions?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                If you can't find the answer you're looking for, please visit our detailed <Link href="/developers/documentation" className="text-primary hover:underline">documentation</Link> or connect with our community.
                </p>
                <Link href="/developers#community">
                <Button variant="outline">
                    Contact Support / Join Community
                </Button>
                </Link>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
