
import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VSD Network',
  description: 'Frequently Asked Questions about the VSD Network, VSD stablecoin, its technology, usage, and security in the Web3 space.',
};

const faqs = [
  {
    id: "what-is-vsd-network",
    question: "What is the VSD Network?",
    answer: "The VSD Network is a decentralized ecosystem built around the VSD stablecoin. Its mission is to provide a transparent, stable, and accessible digital currency platform that can be seamlessly integrated into various DeFi applications, Web3 services, and traditional businesses looking to leverage blockchain technology."
  },
  {
    id: "what-is-vsd-stablecoin",
    question: "What is the VSD stablecoin?",
    answer: "VSD is a cryptocurrency designed to maintain a stable value, typically pegged to a major fiat currency like the US Dollar (e.g., 1 VSD = $1 USD). It achieves this stability through mechanisms like collateralization with other crypto assets, algorithmic adjustments, and arbitrage incentives, all managed by smart contracts on a blockchain."
  },
  {
    id: "how-peg-maintained",
    question: "How is the VSD stablecoin's peg maintained?",
    answer: "The VSD peg is maintained through a combination of: <br />1. **Over-Collateralization:** Users mint VSD by locking up collateral assets (like ETH, WBTC) worth more than the VSD they generate. <br />2. **Arbitrage Incentives:** If VSD's market price deviates from its peg, arbitrageurs are incentivized to buy or sell VSD to bring it back to the target value (e.g., buying VSD below $1 to redeem $1 worth of collateral, or minting VSD to sell above $1). <br />3. **Stability Modules & Smart Contracts:** Automated smart contracts manage collateral ratios, liquidations of undercollateralized positions, and potentially algorithmic supply adjustments to support the peg."
  },
  {
    id: "what-blockchain",
    question: "What blockchain does VSD operate on?",
    answer: "VSD is initially deployed on [Specify Blockchain, e.g., Ethereum Mainnet, Polygon, BNB Chain]. We are actively exploring and developing solutions for cross-chain compatibility (bridges, Layer 2 solutions) to enhance VSD's accessibility and utility across multiple blockchain ecosystems. Please refer to our official <a href='/developers/documentation' class='text-primary hover:underline'>documentation</a> for the latest information on supported networks and contract addresses."
  },
  {
    id: "how-to-get-vsd",
    question: "How can I get VSD tokens?",
    answer: "VSD tokens can be acquired through several methods: <br />1. **Minting:** By depositing approved collateral assets into the VSD platform's smart contract vaults via our official dApp or integrated platforms. <br />2. **Decentralized Exchanges (DEXs):** Swapping other cryptocurrencies for VSD on DEXs like Uniswap, Sushiswap, PancakeSwap, etc. (where liquidity pools exist). <br />3. **Centralized Exchanges (CEXs):** VSD may be listed on select centralized exchanges for trading. <br />Always verify contract addresses and use reputable platforms. Check our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> for official listings and partners."
  },
  {
    id: "benefits-of-vsd",
    question: "What are the primary benefits of using VSD?",
    answer: "VSD offers numerous advantages in the Web3 space: <br />- **Value Stability:** Minimizes price volatility common with other cryptocurrencies, making it suitable for payments, savings, and as a quote currency. <br />- **Transparency & Auditability:** All transactions and smart contract logic are on a public blockchain. <br />- **Decentralization & Censorship Resistance:** Reduced reliance on traditional intermediaries. <br />- **Efficiency & Speed:** Faster and potentially lower-cost transactions compared to traditional finance. <br />- **DeFi Composability:** Seamlessly integrates with various DeFi protocols for lending, borrowing, yield farming, etc. <br />- **Global Accessibility:** Provides a stable digital currency option for a global user base."
  },
  {
    id: "security-audits",
    question: "Are the VSD smart contracts audited?",
    answer: "Yes, security is paramount. Our core smart contracts (token contract, vault manager, governance, etc.) undergo multiple independent security audits by reputable blockchain security firms. Audit reports are made publicly available in our <a href='/developers/documentation#security' class='text-primary hover:underline'>documentation</a>. We also run ongoing bug bounty programs to encourage community security contributions."
  },
  {
    id: "business-integration-crypto",
    question: "How can businesses integrate VSD for crypto payments?",
    answer: "Businesses can integrate VSD in several ways: <br />1. **Direct Smart Contract Integration:** Utilizing our <a href='/developers/sdks-tools' class='text-primary hover:underline'>SDKs</a> and APIs for custom wallet solutions or dApp integrations. <br />2. **Crypto Payment Processors:** Partnering with third-party payment processors that support VSD and other cryptocurrencies. <br />3. **E-commerce Plugins:** Using or developing plugins for popular e-commerce platforms. <br />Visit our <a href='/for-businesses' class='text-primary hover:underline'>For Businesses page</a> and the <a href='/developers/documentation#integrating-vsd-for-payments' class='text-primary hover:underline'>payment integration guide</a> in our documentation for more details."
  },
  {
    id: "vsd-governance-dao",
    question: "Who governs the VSD Network and protocol?",
    answer: "The VSD Network aims for decentralized governance through a DAO (Decentralized Autonomous Organization). Holders of VSD tokens (or a dedicated governance token) can participate in voting on protocol upgrades, risk parameters (like collateral types, fees, liquidation ratios), and other key decisions. Our <a href='/developers/documentation#governance-module' class='text-primary hover:underline'>documentation</a> provides more details on the governance model and how to participate."
  },
  {
    id: "risks-associated-crypto",
    question: "What are the risks associated with VSD and DeFi?",
    answer: "While VSD is designed for stability, all cryptocurrency and DeFi involvement carries risks: <br />- **Smart Contract Vulnerabilities:** Despite audits, the risk of undiscovered bugs or exploits in smart contracts exists. <br />- **Collateral Volatility:** The value of assets backing VSD can fluctuate. Extreme market events could potentially impact the peg if liquidation mechanisms are overwhelmed. <br />- **Oracle Risks:** Dependence on oracles for price feeds introduces a potential point of failure or manipulation. <br />- **Regulatory Uncertainty:** The legal and regulatory landscape for stablecoins and DeFi is still evolving globally. <br />- **Market & Liquidity Risks:** Overall crypto market conditions can affect the liquidity and demand for VSD on exchanges. <br />- **Loss of Private Keys:** Users are responsible for securing their own private keys; loss of keys means loss of funds. <br />We strongly advise users to Do Your Own Research (DYOR), understand these risks, and never invest more than they can afford to lose."
  },
  {
    id: "transaction-fees-gas",
    question: "What are the transaction fees (gas) for using VSD?",
    answer: "Transaction fees for using VSD (e.g., transfers, minting, interacting with dApps) are determined by the underlying blockchain network it operates on (e.g., Ethereum gas fees, Polygon gas fees). The VSD protocol itself may have specific fees for certain actions like minting or stability fees, which are usually set by governance. Always check your wallet for estimated gas costs before confirming any transaction."
  },
  {
    id: "vsd-vs-other-stablecoins",
    question: "How does VSD compare to other stablecoins?",
    answer: "VSD aims to differentiate itself through its commitment to decentralization (both in terms of infrastructure and governance via a DAO), transparency of its backing mechanisms and smart contract operations, and a robust, community-focused approach. Different stablecoins have varying models (e.g., fiat-backed, crypto-backed, algorithmic). VSD's specific model [mention VSD's specific model, e.g., is primarily crypto-collateralized and aims for deep DeFi integration]."
  },
  {
    id: "use-in-defi",
    question: "Can VSD be used in DeFi applications?",
    answer: "Absolutely. VSD is designed for deep integration within the DeFi ecosystem. It can serve as stable collateral in lending/borrowing platforms, a reliable trading pair on DEXs, a means for yield farming and liquidity provision, and a stable unit of account in various DeFi strategies. Explore our <a href='/ecosystem' class='text-primary hover:underline'>Ecosystem page</a> to see examples of dApps and protocols integrating VSD."
  },
  {
    id: "collateral-value-drop",
    question: "What happens if the value of assets backing VSD drops significantly?",
    answer: "The VSD protocol has built-in mechanisms like over-collateralization and automated liquidations. If the value of a user's collateral falls below a specific threshold (liquidation ratio), their position (vault/CDP) becomes eligible for liquidation. This means a portion of their collateral is sold to cover their VSD debt, ensuring the overall stability and solvency of the VSD stablecoin."
  },
  {
    id: "whitepaper-location-crypto",
    question: "Where can I find the VSD Network whitepaper or detailed technical documentation?",
    answer: "The VSD Network whitepaper, along with in-depth technical specifications for our smart contracts, economic model, and architecture, is available on our <a href='/developers/documentation' class='text-primary hover:underline'>Developer Documentation site</a>. We encourage thorough review for a comprehensive understanding of the protocol."
  },
  {
    id: "technical-support-crypto",
    question: "How can I get technical support or ask more questions about VSD?",
    answer: "For technical assistance, further questions, or to engage with our community, please join our official channels such as Discord (developer channels) or Telegram (links can be found on the <a href='/developers#community' class='text-primary hover:underline'>Developer Portal</a>). Our team and community members are active and ready to help with smart contract integrations, SDK usage, and general protocol inquiries."
  },
  {
    id: "contribute-to-ecosystem-crypto",
    question: "How can I contribute to the VSD Network ecosystem?",
    answer: "There are numerous ways to contribute: <br />- **Develop dApps & Integrations:** Build applications that integrate VSD or create tools for the ecosystem. <br />- **Provide Liquidity:** Supply VSD to liquidity pools on DEXs or participate in yield farming. <br />- **Participate in Governance (DAO):** Engage in discussions and vote on governance proposals if you hold VSD or governance tokens. <br />- **Community Building & Evangelism:** Help educate new users, translate documentation, or create content about VSD. <br />- **Security Research:** Participate in bug bounty programs by responsibly disclosing vulnerabilities in our smart contracts. <br />Visit our <a href='/developers' class='text-primary hover:underline'>Developer Portal</a> for more ideas and resources."
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <HelpCircle className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" /> {/* Adjusted icon size */}
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1> {/* Adjusted font size */}
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mt-4"> {/* Adjusted font size */}
          Your questions about the VSD Network, VSD stablecoin, its technology, DeFi integration, and security, answered.
        </p>
      </header>

      <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8"> {/* Adjusted padding */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-md sm:text-lg md:text-xl text-left hover:no-underline py-4 sm:py-6"> {/* Adjusted font size & padding */}
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm sm:text-base md:text-lg text-muted-foreground prose prose-sm sm:prose-base prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80" /* Adjusted prose & font size */
                  htmlString={faq.answer}
                />
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <section className="mt-12 sm:mt-16 text-center"> {/* Adjusted margin */}
        <Card className="inline-block p-6 sm:p-8 bg-card/70 backdrop-blur-sm shadow-lg"> {/* Adjusted padding */}
            <CardHeader>
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-3" /> {/* Adjusted icon size */}
                <CardTitle className="font-headline text-xl sm:text-2xl">Can't Find Your Answer?</CardTitle> {/* Adjusted font size */}
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto text-sm sm:text-base"> {/* Adjusted font size */}
                If your question isn't covered here, please dive into our detailed <Link href="/developers/documentation" className="text-primary hover:underline">technical documentation</Link> or connect with our vibrant Web3 community.
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
