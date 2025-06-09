
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code, Library, Workflow, Cpu, GitBranch, HelpCircle, BookOpenText, Layers } from "lucide-react";
import { AIImage } from "@/components/ai/AIImage";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'VSD Network Documentation',
  description: 'Comprehensive guide to VSD Network architecture, smart contracts, APIs, and integration.',
};

const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
    <CardHeader>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle className="font-headline text-3xl">{title}</CardTitle>
      </div>
      {description && <CardDescription className="text-lg">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
      {children}
    </CardContent>
  </Card>
);

export default function DocumentationPage() {
  return (
    <div className="space-y-16 py-8">
      <header className="text-center">
        <BookOpenText className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Network Documentation</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Welcome to the official documentation for the VSD Network. This guide provides all the necessary information to understand and build with VSD.
        </p>
      </header>

      <Separator />

      <SectionCard icon={Library} title="Introduction" description="Understanding the VSD Network and its goals.">
        <p>The VSD Network is a decentralized financial ecosystem centered around the VSD stablecoin. Our mission is to provide a transparent, stable, and accessible digital currency that can be seamlessly integrated into various applications and platforms.</p>
        <p>This documentation serves as a comprehensive resource for developers, partners, and community members looking to:
        </p>
        <ul>
          <li>Understand the underlying architecture and mechanics of the VSD stablecoin.</li>
          <li>Interact with VSD smart contracts.</li>
          <li>Integrate VSD into their applications using our APIs and SDKs.</li>
          <li>Participate in the governance of the VSD Network.</li>
        </ul>
        <p>We are committed to fostering an open and collaborative ecosystem. If you have questions or feedback, please reach out to us through our community channels (linked on the main <Link href="/developers">Developers page</Link>).</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={Workflow} title="Architecture Overview" description="A high-level look at the components of the VSD Network.">
        <p>The VSD Network is composed of several key layers and components working in concert to ensure stability, security, and decentralization:</p>
        <AIImage
          initialSrc="https://placehold.co/800x400.png"
          alt="VSD Network Architecture Diagram Placeholder"
          width={800}
          height={400}
          className="rounded-md my-6 shadow-md mx-auto"
          hint="network architecture diagram"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl hover:no-underline">Core Stablecoin (VSD)</AccordionTrigger>
            <AccordionContent>
              <p>The heart of the network. VSD is a decentralized, crypto-collateralized stablecoin designed to maintain a soft peg to the US Dollar. Its stability is ensured through a combination of over-collateralization, algorithmic adjustments, and arbitrage incentives.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl hover:no-underline">Collateral Management System</AccordionTrigger>
            <AccordionContent>
              <p>A system of smart contracts that allows users to lock up approved crypto assets (e.g., ETH, wBTC) as collateral to mint VSD. It monitors collateralization ratios and manages liquidations to protect the peg.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Module (DAO)</AccordionTrigger>
            <AccordionContent>
              <p>The VSD Network is governed by its community through a Decentralized Autonomous Organization (DAO). Holders of the VSD governance token (if applicable, or VSD itself for certain proposals) can vote on protocol upgrades, risk parameters, and other key decisions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl hover:no-underline">Oracles</AccordionTrigger>
            <AccordionContent>
              <p>Reliable price feeds are crucial for a collateralized stablecoin. The VSD Network utilizes decentralized oracle solutions to obtain accurate and tamper-resistant price data for collateral assets.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />

      <SectionCard icon={Code} title="Smart Contracts" description="Detailed information about VSD Network's on-chain logic.">
        <p>All core logic of the VSD Network is implemented as smart contracts on a public blockchain (e.g., Ethereum). These contracts are open-source and designed with security as a top priority. We encourage developers to review our contracts and participate in bug bounty programs.</p>
        <p>You can also use our <Link href="/smart-contract-generator">AI Smart Contract Generator</Link> to get a head start on building compatible contracts for the ecosystem.</p>
        <Accordion type="multiple" className="w-full mt-4">
          <AccordionItem value="contract-vsd">
            <AccordionTrigger className="text-xl hover:no-underline">VSD Token Contract (ERC20)</AccordionTrigger>
            <AccordionContent>
              <p><strong>Address:</strong> <code>0xYourVSDTokenContractAddressHere</code> (Replace with actual address)</p>
              <p><strong>Standard:</strong> ERC20</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>totalSupply()</code>: Returns the total supply of VSD.</li>
                <li><code>balanceOf(address account)</code>: Returns the VSD balance of an account.</li>
                <li><code>transfer(address recipient, uint256 amount)</code>: Transfers VSD tokens.</li>
                <li><code>approve(address spender, uint256 amount)</code>: Allows a spender to withdraw VSD.</li>
                <li><code>allowance(address owner, address spender)</code>: Checks the amount approved.</li>
                <li><code>transferFrom(address sender, address recipient, uint256 amount)</code>: Transfers VSD on behalf of an owner (requires approval).</li>
              </ul>
              <p><strong>Events:</strong> <code>Transfer</code>, <code>Approval</code>.</p>
              <p><strong>Security Notes:</strong> The VSD token contract has undergone multiple audits. [Link to Audit Reports Placeholder].</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contract-vault">
            <AccordionTrigger className="text-xl hover:no-underline">Collateral Vault Manager</AccordionTrigger>
            <AccordionContent>
              <p><strong>Address:</strong> <code>0xYourVaultManagerContractAddressHere</code> (Replace with actual address)</p>
              <p>This contract (or set of contracts) manages the creation, collateralization, and liquidation of VSD positions.</p>
              <p><strong>Key User-Facing Functions:</strong></p>
              <ul>
                <li><code>openVault(address collateralType, uint256 collateralAmount)</code>: Opens a new vault and mints VSD.</li>
                <li><code>depositCollateral(bytes32 vaultId, uint256 amount)</code>: Adds more collateral to an existing vault.</li>
                <li><code>withdrawCollateral(bytes32 vaultId, uint256 amount)</code>: Withdraws excess collateral.</li>
                <li><code>repayVSD(bytes32 vaultId, uint256 vsdAmount)</code>: Repays minted VSD.</li>
                <li><code>mintVSD(bytes32 vaultId, uint256 vsdAmount)</code>: Mints more VSD from an existing vault (if collateral allows).</li>
              </ul>
              <p><strong>Liquidation:</strong> Vaults falling below the minimum collateralization ratio are subject to liquidation. Details of the liquidation process can be found in the contract code and whitepaper.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contract-governance">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Contract</AccordionTrigger>
            <AccordionContent>
              <p><strong>Address:</strong> <code>0xYourGovernanceContractAddressHere</code> (Replace with actual address)</p>
              <p>Handles the proposal and voting process for protocol changes.</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>propose(...)</code>: Submits a new governance proposal.</li>
                <li><code>vote(uint256 proposalId, bool support)</code>: Casts a vote on a proposal.</li>
                <li><code>execute(uint256 proposalId)</code>: Executes an approved proposal.</li>
              </ul>
              <p>Further details on proposal types, voting periods, and quorum requirements are available in the contract source and governance forum.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant="outline" asChild className="mt-6">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <GitBranch className="mr-2 h-4 w-4" /> Browse Contract Source on GitHub (Placeholder)
          </Link>
        </Button>
      </SectionCard>

      <Separator />

      <SectionCard icon={Cpu} title="APIs & SDKs" description="Tools for programmatic interaction with VSD Network.">
        <p>We provide several ways for developers to integrate VSD into their applications and services.</p>
        <h4 className="text-2xl mt-6 mb-2">REST API (Coming Soon)</h4>
        <p>A public REST API will provide access to real-time data such as VSD total supply, circulating supply, collateralization ratios, market prices (via oracles), and governance proposal statuses.</p>
        <ul>
          <li><strong>Endpoints:</strong>
            <ul>
              <li><code>/token/info</code></li>
              <li><code>/collateral/stats</code></li>
              <li><code>/governance/proposals</code></li>
            </ul>
          </li>
          <li><strong>Authentication:</strong> API key based for rate-limited endpoints.</li>
          <li><strong>Rate Limits:</strong> Generous free tier, with options for higher limits.</li>
        </ul>
        <AIImage
          initialSrc="https://placehold.co/700x350.png"
          alt="API Interaction Diagram Placeholder"
          width={700}
          height={350}
          className="rounded-md my-6 shadow-md mx-auto"
          hint="API data flow"
        />

        <h4 className="text-2xl mt-8 mb-2">JavaScript SDK (Alpha)</h4>
        <p>A JavaScript/TypeScript SDK is available to simplify interaction with VSD smart contracts from Node.js or browser environments.</p>
        <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4">
          <code>
{`// Installation
npm install @vsdnetwork/sdk
// or
yarn add @vsdnetwork/sdk

// Basic Usage (Illustrative)
import { VSDSDK, Networks } from '@vsdnetwork/sdk';

async function getVsdBalance() {
  const sdk = new VSDSDK({ network: Networks.Mainnet }); // Or your testnet
  const balance = await sdk.vsdToken.balanceOf('0xYourAccountAddress');
  console.log('VSD Balance:', sdk.utils.formatUnits(balance, 18));
}

getVsdBalance();`}
          </code>
        </pre>
        <Button variant="outline" asChild className="mt-4">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Layers className="mr-2 h-4 w-4" /> View JS SDK on GitHub (Placeholder)
          </Link>
        </Button>
        <p className="mt-4">Other SDKs (Python, Go) are planned for future releases.</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={GitBranch} title="Integration Guides" description="Step-by-step instructions for common integrations.">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="wallet-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Wallet Integration</AccordionTrigger>
            <AccordionContent>
              <p>To add VSD to most EVM-compatible wallets (e.g., MetaMask, Trust Wallet):</p>
              <ol>
                <li>Open your wallet and find the option to "Add Custom Token" or "Import Token".</li>
                <li>Select the correct network (e.g., Ethereum Mainnet).</li>
                <li>Enter the VSD Token Contract Address: <code>0xYourVSDTokenContractAddressHere</code>.</li>
                <li>The Token Symbol (VSD) and Decimals (18) should auto-populate. If not, enter them manually.</li>
                <li>Confirm and add the token.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="dex-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Decentralized Exchange (DEX) Integration</AccordionTrigger>
            <AccordionContent>
              <p>VSD can be listed on DEXs by providing liquidity against other assets (e.g., VSD/ETH, VSD/USDC).</p>
              <p><strong>For Liquidity Providers:</strong></p>
              <ul>
                <li>Ensure you have VSD and the paired asset in your wallet.</li>
                <li>Navigate to the "Add Liquidity" section of your chosen DEX.</li>
                <li>Select VSD (you may need to import it using the contract address) and the other asset.</li>
                <li>Approve token spending for both assets if prompted.</li>
                <li>Confirm the liquidity provision. You will receive LP tokens representing your share.</li>
              </ul>
              <p><strong>For Traders:</strong> VSD can be swapped like any other ERC20 token on DEXs where it has liquidity pools.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="defi-protocol-integration">
            <AccordionTrigger className="text-xl hover:no-underline">DeFi Protocol Integration</AccordionTrigger>
            <AccordionContent>
              <p>VSD is designed to be a robust form of collateral and a stable medium of exchange in DeFi protocols.</p>
              <ul>
                <li><strong>As Collateral:</strong> Lending platforms can integrate VSD as an accepted collateral type. Key considerations include oracle price feeds for VSD (typically $1) and appropriate collateralization ratios.</li>
                <li><strong>For Payments/Settlements:</strong> Use VSD for stable value transfer within your protocol.</li>
                <li><strong>Yield Farming:</strong> VSD can be included in stablecoin pools or paired with other assets for yield farming opportunities.</li>
              </ul>
              <p>If you are a DeFi developer looking to integrate VSD, please refer to our Smart Contracts section and consider reaching out for technical support.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={HelpCircle} title="Glossary & FAQ" description="Common terms and questions.">
        <h4 className="text-2xl mt-6 mb-2">Glossary</h4>
         <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stablecoin:</strong> A cryptocurrency designed to maintain a stable value, typically pegged to a fiat currency like the US Dollar.</li>
            <li><strong>Collateralization:</strong> The process of backing a stablecoin with assets (e.g., other cryptocurrencies) to ensure its value.</li>
            <li><strong>Over-collateralization:</strong> Requiring collateral value significantly higher than the value of the stablecoin minted, providing a buffer against price volatility.</li>
            <li><strong>DAO (Decentralized Autonomous Organization):</strong> An organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.</li>
            <li><strong>Oracle:</strong> A service that provides external data (like asset prices) to smart contracts on the blockchain.</li>
        </ul>
        <h4 className="text-2xl mt-8 mb-2">Frequently Asked Questions</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-lg hover:no-underline">What blockchain is VSD on?</AccordionTrigger>
            <AccordionContent>
              <p>VSD is initially deployed on [Specify Blockchain, e.g., Ethereum Mainnet]. We are exploring cross-chain solutions for future expansion.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-lg hover:no-underline">How is the VSD peg maintained?</AccordionTrigger>
            <AccordionContent>
              <p>The VSD peg to the US Dollar is maintained through a combination of over-collateralization with crypto assets, arbitrage opportunities, and protocol-managed stability mechanisms. If VSD trades above $1, arbitrageurs can mint VSD by depositing collateral and sell it for a profit. If VSD trades below $1, arbitrageurs can buy cheap VSD from the market and use it to redeem collateral at a $1 valuation or repay their debt.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-lg hover:no-underline">Where can I get VSD?</AccordionTrigger>
            <AccordionContent>
              <p>VSD can be minted by depositing collateral into the VSD protocol, or acquired from decentralized exchanges (DEXs) where liquidity pools exist. See our <Link href="/ecosystem">Ecosystem page</Link> for partner platforms.</p>
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="faq-4">
            <AccordionTrigger className="text-lg hover:no-underline">Are the VSD smart contracts audited?</AccordionTrigger>
            <AccordionContent>
              <p>Yes, security is our top priority. The VSD smart contracts have undergone [mention number if known, e.g., multiple] independent security audits. Links to audit reports will be made available here: [Placeholder for Audit Links]. We also run an ongoing bug bounty program.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

    </div>
  );
}

    