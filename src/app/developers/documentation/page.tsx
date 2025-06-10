
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code, Library, Workflow, Cpu, GitBranch, HelpCircle, BookOpenText, Layers, CreditCard } from "lucide-react";
import Image from 'next/image'; // Replaced AIImage
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VSD Network Documentation',
  description: 'Comprehensive guide to VSD Network architecture, core logic, APIs, and integration.',
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
        <p>The VSD Network is a decentralized digital ecosystem centered around the VSD platform. Our mission is to provide a transparent, stable, and accessible digital value system that can be seamlessly integrated into various applications and platforms.</p>
        <p>This documentation serves as a comprehensive resource for developers, partners, and community members looking to:
        </p>
        <ul>
          <li>Understand the underlying architecture and mechanics of the VSD platform.</li>
          <li>Interact with VSD core logic modules.</li>
          <li>Integrate VSD into their applications using our APIs and SDKs.</li>
          <li>Participate in the governance of the VSD Network.</li>
        </ul>
        <p>We are committed to fostering an open and collaborative ecosystem. If you have questions or feedback, please reach out to us through our community channels (linked on the main <Link href="/developers">Developers page</Link>).</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={Workflow} title="Architecture Overview" description="A high-level look at the components of the VSD Network.">
        <p>The VSD Network is composed of several key layers and components working in concert to ensure stability, security, and decentralization:</p>
        <Image
          src="https://placehold.co/800x400.png" // was initialSrc
          alt="VSD Network Architecture Diagram Placeholder"
          width={800}
          height={400}
          className="rounded-md my-6 shadow-md mx-auto"
          data-ai-hint="network architecture diagram"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl hover:no-underline">Core Platform (VSD)</AccordionTrigger>
            <AccordionContent>
              <p>The heart of the network. VSD is a decentralized, asset-backed value system designed to maintain a stable reference value. Its stability is ensured through a combination of asset backing, algorithmic adjustments, and arbitrage incentives.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl hover:no-underline">Asset Management System</AccordionTrigger>
            <AccordionContent>
              <p>A system of automated modules that allows users to use approved digital assets to access VSD units. It monitors backing ratios and manages system integrity to protect value.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Module</AccordionTrigger>
            <AccordionContent>
              <p>The VSD Network is governed by its community. Holders of designated governance instruments (if applicable) can vote on platform upgrades, risk parameters, and other key decisions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl hover:no-underline">Data Feeds</AccordionTrigger>
            <AccordionContent>
              <p>Reliable price feeds are crucial for an asset-backed system. The VSD Network utilizes decentralized data solutions to obtain accurate and tamper-resistant price data for backing assets.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />

      <SectionCard icon={Code} title="Core Logic Modules" description="Detailed information about VSD Network's on-platform logic.">
        <p>All core logic of the VSD Network is implemented as automated modules on a distributed ledger or secure network. These modules are open-source and designed with security as a top priority. We encourage developers to review our modules and participate in bug bounty programs.</p>
        {/* Removed link to AI Smart Contract Generator */}
        <Accordion type="multiple" className="w-full mt-4">
          <AccordionItem value="module-vsd">
            <AccordionTrigger className="text-xl hover:no-underline">VSD Unit Module</AccordionTrigger>
            <AccordionContent>
              <p><strong>Identifier:</strong> <code>VSD_Unit_Module_v1</code> (Replace with actual identifier)</p>
              <p><strong>Standard:</strong> Based on common digital asset standards.</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>getTotalUnits()</code>: Returns the total supply of VSD units.</li>
                <li><code>getBalance(address account)</code>: Returns the VSD balance of an account.</li>
                <li><code>transferUnits(address recipient, uint256 amount)</code>: Transfers VSD units.</li>
                {/* Simplified other functions */}
              </ul>
              <p><strong>Events:</strong> <code>Transfer</code>, <code>Approval</code>.</p>
              <p><strong>Security Notes:</strong> The VSD unit module has undergone multiple audits. [Link to Audit Reports Placeholder].</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="module-vault">
            <AccordionTrigger className="text-xl hover:no-underline">Asset Vault Manager</AccordionTrigger>
            <AccordionContent>
              <p><strong>Identifier:</strong> <code>VSD_Vault_Manager_v1</code> (Replace with actual identifier)</p>
              <p>This module (or set of modules) manages the creation, backing, and liquidation related to VSD positions.</p>
              <p><strong>Key User-Facing Functions:</strong></p>
              <ul>
                <li><code>openPosition(address assetType, uint256 assetAmount)</code>: Opens a new position and generates VSD units.</li>
                {/* Simplified other functions */}
              </ul>
              <p><strong>Risk Management:</strong> Positions falling below minimum backing ratios are subject to automated risk mitigation processes. Details can be found in the module code and whitepaper.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="module-governance">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Module</AccordionTrigger>
            <AccordionContent>
              <p><strong>Identifier:</strong> <code>VSD_Governance_Module_v1</code> (Replace with actual identifier)</p>
              <p>Handles the proposal and voting process for platform changes.</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>submitProposal(...)</code>: Submits a new governance proposal.</li>
                <li><code>castVote(uint256 proposalId, bool support)</code>: Casts a vote on a proposal.</li>
                <li><code>executeProposal(uint256 proposalId)</code>: Executes an approved proposal.</li>
              </ul>
              <p>Further details on proposal types, voting periods, and quorum requirements are available in the module source and governance forum.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant="outline" asChild className="mt-6">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <GitBranch className="mr-2 h-4 w-4" /> Browse Module Source on GitHub (Placeholder)
          </Link>
        </Button>
      </SectionCard>

      <Separator />

      <SectionCard icon={Cpu} title="APIs & SDKs" description="Tools for programmatic interaction with VSD Network.">
        <p>We provide several ways for developers to integrate VSD into their applications and services.</p>
        <h4 className="text-2xl mt-6 mb-2">REST API (Coming Soon)</h4>
        <p>A public REST API will provide access to real-time data such as VSD total units, active units, backing ratios, market prices (via data feeds), and governance proposal statuses. This API will be essential for businesses looking to integrate VSD payment information, verify transactions, or display VSD-related data on their platforms.</p>
        <ul>
          <li><strong>Endpoints (Examples for Business Integration):</strong>
            <ul>
              <li><code>/platform/info</code>: General VSD platform metrics.</li>
              <li><code>/transaction/{'{txHash}'}</code>: Verify transaction status and details.</li>
              <li><code>/address/{'{address}'}/balance</code>: Check VSD balance of an address.</li>
              <li><code>/asset/stats</code></li>
              <li><code>/governance/proposals</code></li>
            </ul>
          </li>
          <li><strong>Authentication:</strong> API key based for rate-limited endpoints.</li>
          <li><strong>Rate Limits:</strong> Generous free tier, with options for higher limits.</li>
        </ul>
        <Image
          src="https://placehold.co/700x350.png" // was initialSrc
          alt="API Interaction Diagram Placeholder"
          width={700}
          height={350}
          className="rounded-md my-6 shadow-md mx-auto"
          data-ai-hint="API data flow"
        />

        <h4 className="text-2xl mt-8 mb-2">JavaScript SDK (Alpha)</h4>
        <p>Our JavaScript/TypeScript SDK simplifies interaction with VSD core logic modules and planned REST API endpoints. It's ideal for both frontend and backend development when integrating VSD payments or functionalities.</p>
        <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4">
          <code>
{`// Installation
npm install @vsdnetwork/sdk
// or
yarn add @vsdnetwork/sdk

// Basic Usage (Illustrative)
import { VSDSDK, Networks } from '@vsdnetwork/sdk';

async function checkVsdBalance(userAddress) {
  const sdk = new VSDSDK({ network: Networks.Main }); // Or your testnet
  const balance = await sdk.vsdModule.getBalance(userAddress);
  console.log('VSD Balance:', sdk.utils.formatUnits(balance, 18)); // Assuming 18 decimal places
  return balance;
}

// Example: Initiating a VSD payment (conceptual)
async function initiateVsdPayment(sdk, recipientAddress, amount) {
  // This would involve interacting with a user's wallet system
  // or a backend wallet system to sign and send a transaction.
  // The SDK would provide helper functions for constructing the transaction.
  console.log(\`Preparing to send \${amount} VSD to \${recipientAddress}\`);
  // const tx = await sdk.vsdModule.transfer(recipientAddress, sdk.utils.parseUnits(amount, 18));
  // console.log('Transaction sent:', tx.hash);
  // return tx;
}
`}
          </code>
        </pre>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/developers/sdks-tools">
            <Layers className="mr-2 h-4 w-4" /> Explore All SDKs & Tools
          </Link>
        </Button>
        <p className="mt-4">Other SDKs (Python, Go) are planned for future releases to support a wider range of backend systems.</p>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={CreditCard} title="Integrating VSD for Payments" description="Guidance for businesses wanting to accept VSD.">
        <p>Accepting VSD as a payment method can offer stability and efficiency. Here's a general approach:</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="payment-flow">
            <AccordionTrigger className="text-xl hover:no-underline">Typical Payment Flow</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Display Price in VSD:</strong> Convert your product/service price from fiat to VSD (e.g., 1 VSD = $1 USD, but confirm current reference).</li>
                <li><strong>Provide Payment Address:</strong> Present a unique VSD deposit address for each transaction or a static address for your business.</li>
                <li><strong>User Initiates Transfer:</strong> The customer sends the VSD amount from their wallet/account to your address.</li>
                <li><strong>Monitor Network:</strong> Your backend system (or a third-party payment processor) monitors the network for incoming transactions to your address. Our upcoming REST API's <code>/address/{'{address}'}/transactions</code> endpoint will be useful here.</li>
                <li><strong>Confirm Transaction:</strong> Wait for a sufficient number of network confirmations to consider the transaction final.</li>
                <li><strong>Fulfill Order:</strong> Once confirmed, process the order or grant access to the service.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="integration-methods">
            <AccordionTrigger className="text-xl hover:no-underline">Integration Methods</AccordionTrigger>
            <AccordionContent>
              <h5 className="text-lg font-semibold mt-2 mb-1">Direct Integration:</h5>
              <p>Use our <Link href="/developers/sdks-tools">SDKs</Link> (JavaScript for frontend/Node.js, upcoming Python/Go for backend) to interact with the VSD core logic directly. This gives you full control but requires more development effort.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate deposit addresses.</li>
                <li>Query balances and transaction history (via SDK or directly on the network).</li>
                <li>Securely manage private keys/credentials for your business wallet/account if holding VSD.</li>
              </ul>
              <h5 className="text-lg font-semibold mt-4 mb-1">Using Payment Processors (Future):</h5>
              <p>As the VSD ecosystem grows, we anticipate third-party payment processors will add support for VSD. These services simplify accepting VSD by handling wallet management, transaction monitoring, and conversion to fiat if needed. Keep an eye on our <Link href="/ecosystem">Ecosystem page</Link> for partners.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="best-practices">
            <AccordionTrigger className="text-xl hover:no-underline">Best Practices</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Security:</strong> Prioritize the security of your account's credentials. Use secure storage solutions for significant funds/access.</li>
                <li><strong>Transaction Confirmations:</strong> Determine an appropriate number of network confirmations before considering a payment final to mitigate risks.</li>
                <li><strong>User Experience:</strong> Provide clear instructions to your customers on how to pay with VSD. Include QR codes for addresses, expected amounts, and links to network explorers for transaction tracking.</li>
                <li><strong>Refunds:</strong> Plan how you will handle refunds in VSD.</li>
                <li><strong>Compliance:</strong> Understand and adhere to any local regulations regarding digital asset transactions and KYC/AML requirements if applicable to your business.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
         <p className="mt-6">For more detailed technical guidance, refer to our <Link href="/developers/sdks-tools">SDK documentation</Link> and the upcoming REST API specifications.</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={GitBranch} title="Integration Guides" description="Step-by-step instructions for common integrations.">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="wallet-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Wallet/Account Integration</AccordionTrigger>
            <AccordionContent>
              <p>To add VSD to most compatible wallets/account managers (e.g., MetaMask-like browser extensions, dedicated apps):</p>
              <ol>
                <li>Open your wallet/app and find the option to "Add Custom Asset" or "Import Asset".</li>
                <li>Select the correct network (e.g., Main Network).</li>
                <li>Enter the VSD Asset Identifier: <code>VSD_Unit_Module_v1_Address_Here</code>.</li>
                <li>The Asset Symbol (VSD) and Decimals (e.g., 18) should auto-populate. If not, enter them manually.</li>
                <li>Confirm and add the asset.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="dex-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Decentralized Exchange (DEX) Integration</AccordionTrigger>
            <AccordionContent>
              <p>VSD can be listed on DEXs by providing liquidity against other assets (e.g., VSD/ETH-equivalent, VSD/USDC-equivalent).</p>
              <p><strong>For Liquidity Providers:</strong></p>
              <ul>
                <li>Ensure you have VSD and the paired asset in your account.</li>
                <li>Navigate to the "Add Liquidity" section of your chosen DEX.</li>
                <li>Select VSD (you may need to import it using the asset identifier) and the other asset.</li>
                <li>Approve asset spending for both assets if prompted.</li>
                <li>Confirm the liquidity provision. You will receive LP units representing your share.</li>
              </ul>
              <p><strong>For Traders:</strong> VSD can be swapped like any other digital asset on DEXs where it has liquidity pools.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="dapp-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Decentralized Application (dApp) Integration</AccordionTrigger>
            <AccordionContent>
              <p>VSD is designed to be a robust form of collateral and a stable medium of exchange in dApps.</p>
              <ul>
                <li><strong>As Backing/Value:</strong> Lending platforms can integrate VSD as an accepted backing asset type. Key considerations include data feeds for VSD (typically its reference value) and appropriate backing ratios.</li>
                <li><strong>For Payments/Settlements:</strong> Use VSD for stable value transfer within your application.</li>
                <li><strong>Yield Opportunities:</strong> VSD can be included in stable value pools or paired with other assets for yield generating opportunities.</li>
              </ul>
              <p>If you are a dApp developer looking to integrate VSD, please refer to our Core Logic Modules section and consider reaching out for technical support.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={HelpCircle} title="Glossary & FAQ" description="Common terms and questions.">
        <h4 className="text-2xl mt-6 mb-2">Glossary</h4>
         <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stable Value System:</strong> A digital asset or platform designed to maintain a stable value, often pegged to a fiat currency or a basket of assets.</li>
            <li><strong>Asset Backing:</strong> The process of supporting a digital asset's value with other assets (e.g., other digital currencies, commodities) to ensure its stability.</li>
            <li><strong>Over-Backing:</strong> Requiring backing asset value significantly higher than the value of the digital units generated, providing a buffer against price volatility.</li>
            <li><strong>Decentralized Governance:</strong> An organizational model where control and decision-making are distributed among its members rather than a central authority.</li>
            <li><strong>Data Feed:</strong> A service that provides external data (like asset prices) to automated systems on a distributed network.</li>
        </ul>
        <h4 className="text-2xl mt-8 mb-2">Frequently Asked Questions</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-lg hover:no-underline">What network is VSD on?</AccordionTrigger>
            <AccordionContent>
              <p>VSD is initially deployed on [Specify Network, e.g., Main Network X]. We are exploring cross-network solutions for future expansion.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-lg hover:no-underline">How is the VSD value maintained?</AccordionTrigger>
            <AccordionContent>
              <p>The VSD reference value is maintained through a combination of asset backing, arbitrage opportunities, and platform-managed stability mechanisms. If VSD trades above its reference, arbitrageurs can generate VSD by depositing assets and sell it for a profit. If VSD trades below, arbitrageurs can buy cheap VSD from the market and use it to redeem assets at the reference valuation or repay their positions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-lg hover:no-underline">Where can I get VSD units?</AccordionTrigger>
            <AccordionContent>
              <p>VSD units can be generated by depositing assets into the VSD platform, or acquired from exchanges where liquidity pools exist. See our <Link href="/ecosystem">Ecosystem page</Link> for partner platforms.</p>
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="faq-4">
            <AccordionTrigger className="text-lg hover:no-underline">Are the VSD core modules audited?</AccordionTrigger>
            <AccordionContent>
              <p>Yes, security is our top priority. The VSD core logic modules have undergone [mention number if known, e.g., multiple] independent security audits. Links to audit reports will be made available here: [Placeholder for Audit Links]. We also run an ongoing bug bounty program.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

    </div>
  );
}
