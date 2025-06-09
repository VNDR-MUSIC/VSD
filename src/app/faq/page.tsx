
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VSD Network',
  description: 'Frequently Asked Questions about the VSD Network, VSD stablecoin, its technology, usage, and security.',
};

const faqs = [
  {
    id: "what-is-vsd-network",
    question: "What is the VSD Network?",
    answer: "The VSD Network is a decentralized financial ecosystem centered around the VSD stablecoin. Our mission is to provide a transparent, stable, and accessible digital currency that can be seamlessly integrated into various applications and platforms, aiming to bridge traditional finance with decentralized possibilities."
  },
  {
    id: "what-is-vsd-token",
    question: "What is the VSD token?",
    answer: "VSD is a decentralized, crypto-collateralized stablecoin designed to maintain a soft peg to the US Dollar (USD). It serves as the primary medium of exchange and store of value within the VSD Network and its associated ecosystem projects."
  },
  {
    id: "how-peg-maintained",
    question: "How is the VSD peg to the US Dollar maintained?",
    answer: "The VSD peg is maintained through a combination of robust mechanisms including: <br />1. **Over-collateralization:** Users mint VSD by locking up approved crypto assets (e.g., ETH, wBTC) of greater value than the VSD minted. <br />2. **Arbitrage Incentives:** Market participants are incentivized to buy VSD if it falls below $1 or sell/mint VSD if it rises above $1, helping to restore the peg. <br />3. **Algorithmic Adjustments & Stability Pools:** The protocol may include algorithmic mechanisms and stability pools to absorb volatility and maintain the peg during market fluctuations. <br />4. **Liquidations:** Undercollateralized positions are subject to liquidation to ensure the VSD supply remains sufficiently backed."
  },
  {
    id: "what-blockchain",
    question: "What blockchain is VSD on?",
    answer: "VSD is initially deployed on [Specify Main Blockchain, e.g., Ethereum Mainnet]. We are actively exploring and developing solutions for cross-chain compatibility to enhance VSD's accessibility and utility across multiple blockchain networks. Please refer to our official <a href='/developers/documentation' class='text-primary hover:underline'>documentation</a> for the latest information on supported chains."
  },
  {
    id: "how-to-get-vsd",
    question: "How can I acquire VSD tokens?",
    answer: "VSD tokens can be acquired through several methods: <br />1. **Minting:** By depositing approved collateral assets into the VSD protocol's smart contracts. <br />2. **Decentralized Exchanges (DEXs):** Trading VSD on various DEXs where it has liquidity pools. <br />3. **Centralized Exchanges (CEXs):** As the project grows, VSD may be listed on select CEXs. <br />Always check our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> and official announcements for verified sources."
  },
  {
    id: "benefits-of-vsd",
    question: "What are the primary benefits of using VSD?",
    answer: "VSD offers numerous advantages: <br />- **Price Stability:** Designed to minimize volatility compared to other cryptocurrencies. <br />- **Transparency:** All transactions and collateral reserves are auditable on the blockchain. <br />- **Decentralization:** Aims for censorship resistance and reduced reliance on single points of failure. <br />- **Efficiency:** Enables fast and potentially low-cost transactions. <br />- **DeFi Integration:** Seamlessly usable in various DeFi applications like lending, borrowing, and yield farming. <br />- **Accessibility:** Provides a stable digital currency option for a global user base."
  },
  {
    id: "security-audits",
    question: "Are the VSD smart contracts audited?",
    answer: "Yes, security is paramount for the VSD Network. Our smart contracts undergo multiple independent security audits conducted by reputable blockchain security firms. Audit reports are made publicly available in our <a href='/developers/documentation#security' class='text-primary hover:underline'>documentation</a> (ensure this link points to a valid section or document). We also may run ongoing bug bounty programs to encourage community security contributions."
  },
  {
    id: "business-integration",
    question: "How can businesses integrate VSD for payments or services?",
    answer: "Businesses can integrate VSD in several ways: <br />1. **Direct Integration:** Utilizing our <a href='/developers/sdks-tools' class='text-primary hover:underline'>SDKs</a> and APIs for custom payment solutions. <br />2. **Payment Processors:** Partnering with third-party payment processors that support VSD. <br />3. **E-commerce Plugins:** We aim to provide or support plugins for popular e-commerce platforms. <br />Visit our <a href='/for-businesses' class='text-primary hover:underline'>For Businesses page</a> and the <a href='/developers/documentation#integrating-vsd-for-payments' class='text-primary hover:underline'>payment integration guide</a> in our documentation for more details."
  },
  {
    id: "vsd-governance",
    question: "Who governs the VSD Network?",
    answer: "The VSD Network is designed for decentralized governance, typically through a DAO (Decentralized Autonomous Organization). Holders of a designated governance token (or potentially VSD itself for certain proposals) can participate in voting on protocol upgrades, risk parameters, and other key decisions. Our <a href='/developers/documentation#governance-module-dao' class='text-primary hover:underline'>documentation</a> provides more details on the governance model."
  },
  {
    id: "risks-associated",
    question: "What are the risks associated with VSD?",
    answer: "While VSD is designed for stability and security, all cryptocurrency and DeFi involvement carries risks, including: <br />- **Smart Contract Vulnerabilities:** Despite audits, the risk of undiscovered bugs exists. <br />- **Collateral Volatility:** The value of underlying crypto collateral can fluctuate, which could impact the peg if extreme market events occur. <br />- **Oracle Risks:** Dependence on price oracles for collateral valuation introduces a potential point of failure or manipulation. <br />- **Regulatory Uncertainty:** The legal and regulatory landscape for stablecoins is still evolving. <br />- **Market & Liquidity Risks:** Overall market conditions can affect the liquidity and demand for VSD. <br />We strongly advise users to do their own research (DYOR) and understand these risks."
  },
  {
    id: "transaction-fees",
    question: "What are the transaction fees for using VSD?",
    answer: "Transaction fees (gas fees) for VSD transfers are determined by the underlying blockchain network it operates on (e.g., Ethereum gas fees). The VSD protocol itself generally does not add extra fees for standard transfers. However, interacting with specific protocol functions like minting, redeeming, or participating in liquidity pools might incur protocol-specific fees. Always check your wallet for estimated transaction costs before confirming."
  },
  {
    id: "vsd-vs-other-stablecoins",
    question: "How does VSD compare to other stablecoins?",
    answer: "VSD aims to distinguish itself through its commitment to decentralization, transparency of on-chain collateralization, and a robust, community-focused governance model. Unlike fiat-backed stablecoins which rely on centralized custodians, VSD's value is secured by crypto assets locked in smart contracts. Our focus is on resilience and providing a truly decentralized stable medium of exchange."
  },
  {
    id: "use-in-defi",
    question: "Can VSD be used in Decentralized Finance (DeFi) applications?",
    answer: "Absolutely. VSD is designed for deep integration within the DeFi ecosystem. It can serve as stable collateral in lending/borrowing protocols, a reliable trading pair on DEXs, a means for yield farming, and a stable unit of account in various DeFi strategies. Explore our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> to see examples."
  },
  {
    id: "collateral-value-drop",
    question: "What happens if the value of collateral backing VSD drops significantly?",
    answer: "The VSD protocol has built-in mechanisms like over-collateralization and liquidation processes. If the value of a user's collateral falls below a specific threshold (the liquidation ratio), their position becomes eligible for liquidation. In this process, the collateral is sold to cover the outstanding VSD debt, thereby protecting the overall stability and solvency of the VSD stablecoin."
  },
  {
    id: "whitepaper-location",
    question: "Where can I find the VSD Network whitepaper or detailed technical documentation?",
    answer: "The VSD Network whitepaper, along with in-depth technical specifications and architectural details, is available on our <a href='/developers/documentation' class='text-primary hover:underline'>Developer Documentation site</a>. We encourage thorough review for a comprehensive understanding of the protocol."
  },
  {
    id: "technical-support",
    question: "How can I get technical support or ask more questions?",
    answer: "For technical assistance, further questions, or to engage with our community, please join our official channels such as Discord or Telegram (links can be found on the <a href='/developers#community' class='text-primary hover:underline'>Developer Portal</a>). Our team and community members are active and ready to help."
  },
  {
    id: "contribute-to-ecosystem",
    question: "How can I contribute to the VSD Network ecosystem?",
    answer: "There are numerous ways to contribute: <br />- **Develop Applications:** Build dApps that integrate VSD or create tools for the ecosystem. <br />- **Provide Liquidity:** Supply VSD to liquidity pools on DEXs to facilitate trading. <br />- **Participate in Governance:** Engage in discussions and vote on governance proposals. <br />- **Community Building:** Help educate new users, translate documentation, or create content. <br />- **Security Research:** Participate in bug bounty programs (if active) by responsibly disclosing vulnerabilities. <br />Visit our <a href='/developers' class='text-primary hover:underline'>Developer Portal</a> for more ideas and resources."
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
          Your questions about the VSD Network, VSD token, and our ecosystem, answered.
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
