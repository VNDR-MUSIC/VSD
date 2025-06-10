
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code, Library, Workflow, Cpu, GitBranch, HelpCircle, BookOpenText, Layers, CreditCard } from "lucide-react";
import Link from 'next/link';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'VSD Network Documentation',
  description: 'Comprehensive guide to VSD Network architecture, smart contracts, APIs, and integration for the decentralized stablecoin.',
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
          Welcome to the official documentation for the VSD Network. This guide provides all the necessary information to understand, integrate, and build with the VSD decentralized stablecoin platform.
        </p>
      </header>

      <Separator />

      <SectionCard icon={Library} title="Introduction" description="Understanding the VSD Stablecoin and its goals.">
        <p>The VSD Network is a decentralized financial ecosystem centered around the VSD stablecoin. Our mission is to provide a transparent, stable, and accessible digital currency that can be seamlessly integrated into various applications and DeFi protocols.</p>
        <p>This documentation serves as a comprehensive resource for developers, partners, and community members looking to:
        </p>
        <ul>
          <li>Understand the underlying architecture and mechanics of the VSD stablecoin and its backing mechanisms.</li>
          <li>Interact with VSD smart contracts.</li>
          <li>Integrate VSD into their applications using our APIs and SDKs.</li>
          <li>Participate in the governance of the VSD Network through its DAO.</li>
        </ul>
        <p>We are committed to fostering an open and collaborative ecosystem. If you have questions or feedback, please reach out to us through our community channels (linked on the main <Link href="/developers">Developers page</Link>).</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={Workflow} title="Architecture Overview" description="A high-level look at the components of the VSD Network.">
        <p>The VSD Network is composed of several key layers and smart contracts working in concert on a public blockchain to ensure stability, security, and decentralization:</p>
        <AIImage
          initialSrc="https://placehold.co/800x400.png"
          alt="VSD Network Architecture Diagram"
          width={800}
          height={400}
          className="rounded-md my-6 shadow-md mx-auto"
          hint="blockchain architecture diagram"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl hover:no-underline">Core Stablecoin (VSD)</AccordionTrigger>
            <AccordionContent htmlString='<p>The heart of the network. VSD is a decentralized, asset-backed stablecoin designed to maintain a stable peg to a reference asset (e.g., USD). Its stability is ensured through a combination of over-collateralization, algorithmic adjustments, and arbitrage incentives, all managed by on-chain smart contracts.</p>' />
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl hover:no-underline">Collateral Vault System</AccordionTrigger>
            <AccordionContent htmlString='<p>A system of smart contracts (Vaults or CDPs - Collateralized Debt Positions) that allows users to lock up approved crypto assets as collateral to mint VSD tokens. It monitors collateralization ratios and manages liquidations to protect the system from insolvency.</p>' />
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Module (DAO)</AccordionTrigger>
            <AccordionContent htmlString='<p>The VSD Network is governed by its community through a Decentralized Autonomous Organization (DAO). Holders of VSD or a designated governance token can vote on protocol upgrades, risk parameters (e.g., collateral types, liquidation ratios), and other key decisions.</p>' />
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl hover:no-underline">Oracles & Data Feeds</AccordionTrigger>
            <AccordionContent htmlString='<p>Reliable price feeds are crucial for an asset-backed stablecoin. The VSD Network utilizes decentralized oracle solutions to obtain accurate and tamper-resistant price data for collateral assets.</p>' />
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />

      <SectionCard icon={Code} title="Core Smart Contracts" description="Detailed information about VSD Network's on-chain logic.">
        <p>All core logic of the VSD Network is implemented as smart contracts on a public blockchain (e.g., Ethereum, Polygon). These contracts are open-source and designed with security as a top priority. We encourage developers to review our contracts and participate in bug bounty programs.</p>
        <Accordion type="multiple" className="w-full mt-4">
          <AccordionItem value="module-vsd">
            <AccordionTrigger className="text-xl hover:no-underline">VSD Token Contract</AccordionTrigger>
            <AccordionContent htmlString='
              <p><strong>Address:</strong> <code>0xYourVSDTokenContractAddressHere</code> (Replace with actual address)</p>
              <p><strong>Standard:</strong> ERC20 (or equivalent standard on the chosen blockchain).</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>totalSupply()</code>: Returns the total supply of VSD tokens.</li>
                <li><code>balanceOf(address account)</code>: Returns the VSD balance of an account.</li>
                <li><code>transfer(address recipient, uint256 amount)</code>: Transfers VSD tokens.</li>
                <li><code>approve(address spender, uint256 amount)</code>: Allows a spender to withdraw tokens from the caller&apos;s account.</li>
                <li><code>transferFrom(address sender, address recipient, uint256 amount)</code>: Transfers tokens from one address to another, used with <code>approve</code>.</li>
              </ul>
              <p><strong>Events:</strong> <code>Transfer</code>, <code>Approval</code>.</p>
              <p><strong>Security Notes:</strong> The VSD token contract has undergone multiple audits. [Link to Audit Reports Placeholder].</p>
            ' />
          </AccordionItem>
          <AccordionItem value="module-vault">
            <AccordionTrigger className="text-xl hover:no-underline">Vault Manager / CDP Contract</AccordionTrigger>
            <AccordionContent htmlString='
              <p><strong>Address:</strong> <code>0xYourVaultManagerContractAddressHere</code> (Replace with actual address)</p>
              <p>This contract (or set of contracts) manages the creation, collateralization, and liquidation of VSD positions (Vaults/CDPs).</p>
              <p><strong>Key User-Facing Functions:</strong></p>
              <ul>
                <li><code>openVault(address collateralType, uint256 collateralAmount, uint256 vsdToMint)</code>: Opens a new vault, locks collateral, and mints VSD.</li>
                <li><code>depositCollateral(uint256 vaultId, uint256 amount)</code>: Adds more collateral to an existing vault.</li>
                <li><code>withdrawCollateral(uint256 vaultId, uint256 amount)</code>: Withdraws collateral (if vault is sufficiently collateralized).</li>
                <li><code>mintVSD(uint256 vaultId, uint256 amount)</code>: Mints more VSD from a vault (if collateralization allows).</li>
                <li><code>repayVSD(uint256 vaultId, uint256 amount)</code>: Repays VSD to a vault, allowing collateral withdrawal or closing.</li>
                <li><code>liquidateVault(uint256 vaultId)</code>: Allows liquidation of undercollateralized vaults.</li>
              </ul>
              <p><strong>Risk Management:</strong> Vaults falling below minimum collateralization ratios are subject to liquidation to ensure VSD remains fully backed. Details can be found in the contract code and whitepaper.</p>
            ' />
          </AccordionItem>
          <AccordionItem value="module-governance">
            <AccordionTrigger className="text-xl hover:no-underline">Governance Contract (DAO)</AccordionTrigger>
            <AccordionContent htmlString='
              <p><strong>Address:</strong> <code>0xYourGovernanceContractAddressHere</code> (Replace with actual address)</p>
              <p>Handles the proposal and voting process for protocol changes.</p>
              <p><strong>Key Functions:</strong></p>
              <ul>
                <li><code>submitProposal(...)</code>: Submits a new governance proposal (e.g., to change risk parameters, add collateral types).</li>
                <li><code>castVote(uint256 proposalId, bool support)</code>: Casts a vote on a proposal using governance tokens.</li>
                <li><code>executeProposal(uint256 proposalId)</code>: Executes an approved proposal, making changes to other contracts.</li>
              </ul>
              <p>Further details on proposal types, voting periods, and quorum requirements are available in the contract source and governance forum.</p>
            ' />
          </AccordionItem>
        </Accordion>
        <Button variant="outline" asChild className="mt-6">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <GitBranch className="mr-2 h-4 w-4" /> Browse Smart Contracts on GitHub (Placeholder)
          </Link>
        </Button>
      </SectionCard>

      <Separator />

      <SectionCard icon={Cpu} title="APIs & SDKs" description="Tools for programmatic interaction with VSD Network.">
        <p>We provide several ways for developers to integrate VSD into their applications and services, interacting with both on-chain smart contracts and off-chain data.</p>
        <h4 className="text-2xl mt-6 mb-2">Blockchain Interaction (Direct & SDKs)</h4>
        <p>Interact directly with VSD smart contracts using standard blockchain libraries (e.g., Ethers.js, Web3.js) or use our SDKs for simplified access.</p>
        
        <h4 className="text-2xl mt-8 mb-2">REST API (Coming Soon)</h4>
        <p>A public REST API will provide access to aggregated on-chain data, real-time VSD metrics (total supply, circulating supply, collateralization ratios), market prices (via oracles), and governance proposal statuses. This API will be essential for off-chain applications, analytics, and monitoring.</p>
        <ul>
          <li><strong>Endpoints (Examples):</strong>
            <ul>
              <li><code>/vsd/stats</code>: General VSD token and platform metrics.</li>
              <li><code>/transaction/{'{txHash}'}</code>: Verify transaction status and details on the blockchain.</li>
              <li><code>/address/{'{address}'}/balance</code>: Check VSD balance of an address.</li>
              <li><code>/collateral/types</code>: List of accepted collateral assets and their parameters.</li>
              <li><code>/governance/proposals</code></li>
            </ul>
          </li>
          <li><strong>Authentication:</strong> API key based for rate-limited endpoints.</li>
          <li><strong>Rate Limits:</strong> Generous free tier, with options for higher limits.</li>
        </ul>
        <AIImage
          initialSrc="https://placehold.co/700x350.png"
          alt="API Interaction Diagram"
          width={700}
          height={350}
          className="rounded-md my-6 shadow-md mx-auto"
          hint="API data flow blockchain"
        />

        <h4 className="text-2xl mt-8 mb-2">JavaScript SDK (Alpha)</h4>
        <p>Our JavaScript/TypeScript SDK simplifies interaction with VSD smart contracts and planned REST API endpoints. It's ideal for both frontend (dApps) and backend development.</p>
        <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4">
          <code>
{`// Installation
npm install @vsdnetwork/sdk
// or
yarn add @vsdnetwork/sdk

// Basic Usage (Illustrative - Interacting with Smart Contracts)
import { VSDSDK, Networks, ethers } from '@vsdnetwork/sdk'; // Assuming ethers is bundled or peer

async function checkVsdBalance(userAddress) {
  const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
  const signer = provider.getSigner(); // Or from a wallet connection
  const sdk = new VSDSDK({ network: Networks.Mainnet, signerOrProvider: signer }); 
  
  const balance = await sdk.vsdToken.balanceOf(userAddress);
  console.log('VSD Balance:', ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
  return balance;
}

// Example: Minting VSD (conceptual)
async function mintVsd(sdk, collateralAmount, vsdToMint) {
  // This would involve approving collateral spending, then calling a vault/CDP contract function
  // const collateralTokenAddress = '0x...'; // Address of collateral (e.g. WETH)
  // await sdk.collateralToken(collateralTokenAddress).approve(sdk.vaultManager.address, collateralAmount);
  // const tx = await sdk.vaultManager.openVaultAndMint(collateralTokenAddress, collateralAmount, vsdToMint);
  // console.log('Transaction sent:', tx.hash);
  // await tx.wait();
  // console.log('VSD Minted!');
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
        <p className="mt-4">Other SDKs (Python, Go) are planned for future releases to support a wider range of backend systems and scripting for blockchain interaction.</p>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={CreditCard} title="Integrating VSD for Payments" description="Guidance for businesses wanting to accept VSD stablecoin.">
        <p>Accepting VSD as a payment method can offer stability, efficiency, and access to the Web3 economy. Here's a general approach:</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="payment-flow">
            <AccordionTrigger className="text-xl hover:no-underline">Typical Payment Flow</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Display Price in VSD:</strong> Convert your product/service price from fiat to VSD (e.g., if VSD is pegged to $1 USD, then a $10 item is 10 VSD).</li>
                <li><strong>Provide Payment Address:</strong> Present a unique VSD deposit address (from your wallet) for each transaction or a static address for your business.</li>
                <li><strong>User Initiates Transfer:</strong> The customer sends the VSD amount from their wallet to your address on the blockchain.</li>
                <li><strong>Monitor Blockchain:</strong> Your backend system (or a third-party payment processor) monitors the blockchain for incoming transactions to your address. Our upcoming REST API's <code>/address/{'{address}'}/transactions</code> endpoint or direct blockchain event listeners can be used here.</li>
                <li><strong>Confirm Transaction:</strong> Wait for a sufficient number of block confirmations to consider the transaction final and irreversible.</li>
                <li><strong>Fulfill Order:</strong> Once confirmed, process the order or grant access to the service.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="integration-methods">
            <AccordionTrigger className="text-xl hover:no-underline">Integration Methods</AccordionTrigger>
            <AccordionContent>
              <h5 className="text-lg font-semibold mt-2 mb-1">Direct Blockchain Integration:</h5>
              <p>Use our <Link href="/developers/sdks-tools">SDKs</Link> (JavaScript for frontend/Node.js, upcoming Python/Go for backend) or standard Web3 libraries to interact with the VSD token contract directly. This gives you full control but requires more development effort.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate deposit addresses.</li>
                <li>Query balances and transaction history (via SDK, API, or directly on a block explorer).</li>
                <li>Securely manage private keys for your business wallet.</li>
              </ul>
              <h5 className="text-lg font-semibold mt-4 mb-1">Using Crypto Payment Processors (Future):</h5>
              <p>As the VSD ecosystem grows, we anticipate third-party crypto payment processors will add support for VSD. These services simplify accepting VSD by handling wallet management, transaction monitoring, and conversion to fiat if needed. Keep an eye on our <Link href="/ecosystem">Ecosystem page</Link> for partners.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="best-practices">
            <AccordionTrigger className="text-xl hover:no-underline">Best Practices</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Security:</strong> Prioritize the security of your private keys and wallet. Use hardware wallets or multi-sig solutions for significant funds.</li>
                <li><strong>Transaction Confirmations:</strong> Determine an appropriate number of block confirmations before considering a payment final to mitigate risks of chain reorganizations.</li>
                <li><strong>User Experience:</strong> Provide clear instructions to your customers on how to pay with VSD. Include QR codes for addresses, expected amounts, and links to block explorers for transaction tracking.</li>
                <li><strong>Gas Fees:</strong> Be aware of network transaction fees (gas) that users will need to pay. Provide guidance if necessary.</li>
                <li><strong>Refunds:</strong> Plan how you will handle refunds in VSD or fiat.</li>
                <li><strong>Compliance:</strong> Understand and adhere to any local regulations regarding cryptocurrency transactions and KYC/AML requirements if applicable to your business.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
         <p className="mt-6">For more detailed technical guidance, refer to our <Link href="/developers/sdks-tools">SDK documentation</Link> and the upcoming REST API specifications.</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={GitBranch} title="Integration Guides" description="Step-by-step instructions for common Web3 integrations.">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="wallet-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Wallet Integration (Adding VSD)</AccordionTrigger>
            <AccordionContent htmlString='
              <p>To add VSD to most EVM-compatible wallets (e.g., MetaMask, Trust Wallet):</p>
              <ol>
                <li>Open your wallet and find the option to "Add Custom Token" or "Import Token".</li>
                <li>Select the correct network (e.g., Ethereum Mainnet, Polygon).</li>
                <li>Enter the VSD Token Contract Address: <code>0xYourVSDTokenContractAddressHere</code>.</li>
                <li>The Token Symbol (VSD) and Decimals (e.g., 18) should auto-populate. If not, enter them manually.</li>
                <li>Confirm and add the token.</li>
              </ol>
            ' />
          </AccordionItem>
          <AccordionItem value="dex-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Decentralized Exchange (DEX) Integration</AccordionTrigger>
            <AccordionContent htmlString='
              <p>VSD can be listed on DEXs by providing liquidity in pools against other assets (e.g., VSD/ETH, VSD/USDC).</p>
              <p><strong>For Liquidity Providers:</strong></p>
              <ul>
                <li>Ensure you have VSD and the paired asset in your wallet.</li>
                <li>Navigate to the "Add Liquidity" or "Pool" section of your chosen DEX.</li>
                <li>Select VSD (you may need to import it using the token contract address) and the other asset.</li>
                <li>Approve token spending for both VSD and the paired asset if prompted by the DEX.</li>
                <li>Confirm the liquidity provision. You will receive LP (Liquidity Provider) tokens representing your share in the pool.</li>
              </ul>
              <p><strong>For Traders:</strong> VSD can be swapped like any other token on DEXs where it has liquidity pools. Use the DEX interface to select VSD and the token you wish to trade it for.</p>
            ' />
          </AccordionItem>
          <AccordionItem value="dapp-integration">
            <AccordionTrigger className="text-xl hover:no-underline">Decentralized Application (dApp) Integration</AccordionTrigger>
            <AccordionContent htmlString='
              <p>VSD is designed to be a robust form of collateral and a stable medium of exchange in dApps.</p>
              <ul>
                <li><strong>As Collateral:</strong> Lending platforms can integrate VSD as an accepted collateral type. Key considerations include oracle price feeds for VSD (typically its peg value) and appropriate collateralization ratios.</li>
                <li><strong>For Payments/Settlements:</strong> Use VSD for stable value transfer within your dApp for services, subscriptions, or in-game economies.</li>
                <li><strong>Yield Farming/Staking:</strong> VSD can be included in stablecoin pools or paired with other assets for yield generating opportunities in DeFi protocols.</li>
                <li><strong>Treasury Management:</strong> DAOs and Web3 projects can use VSD for managing their treasuries due to its stability.</li>
              </ul>
              <p>If you are a dApp developer looking to integrate VSD, please refer to our Core Smart Contracts section and consider reaching out for technical support via our community channels.</p>
            ' />
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={HelpCircle} title="Glossary & FAQ" description="Common terms and questions related to VSD and DeFi.">
        <h4 className="text-2xl mt-6 mb-2">Glossary</h4>
         <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stablecoin:</strong> A type of cryptocurrency designed to maintain a stable value, often pegged to a fiat currency (like USD) or a commodity.</li>
            <li><strong>Smart Contract:</strong> Self-executing contracts with the terms of the agreement directly written into code. They run on a blockchain, making them transparent and immutable.</li>
            <li><strong>Collateralization:</strong> The process of backing a loan or a stablecoin with assets (collateral). Over-collateralization means the value of collateral is higher than the debt/stablecoin value.</li>
            <li><strong>Decentralized Autonomous Organization (DAO):</strong> An organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.</li>
            <li><strong>Decentralized Finance (DeFi):</strong> An umbrella term for financial applications built on blockchain technology that operate without central intermediaries.</li>
            <li><strong>Oracle:</strong> A service that provides external data (like asset prices) to smart contracts on the blockchain.</li>
        </ul>
        <h4 className="text-2xl mt-8 mb-2">Frequently Asked Questions</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-lg hover:no-underline">What blockchain is VSD on?</AccordionTrigger>
            <AccordionContent htmlString='<p>VSD is initially deployed on [Specify Blockchain, e.g., Ethereum Mainnet, Polygon, BNB Chain]. We are exploring cross-chain solutions for future expansion. Check our official channels for the most up-to-date information.</p>' />
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-lg hover:no-underline">How is the VSD peg maintained?</AccordionTrigger>
            <AccordionContent htmlString='<p>The VSD peg to its reference asset (e.g., $1 USD) is maintained through a combination of over-collateralization, arbitrage opportunities, and protocol-managed stability mechanisms (potentially including algorithmic elements). If VSD trades above its peg, arbitrageurs can mint VSD by depositing collateral and sell it on the market for a profit. If VSD trades below its peg, arbitrageurs can buy cheap VSD from the market and use it to redeem collateral at the peg value or repay their vaults more cheaply.</p>' />
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-lg hover:no-underline">Where can I get VSD tokens?</AccordionTrigger>
            <AccordionContent htmlString='<p>VSD tokens can be minted by depositing collateral into the VSD platform&apos;s smart contracts, or acquired from decentralized exchanges (DEXs) and potentially centralized exchanges (CEXs) where liquidity pools exist. See our <a href="/ecosystem" class="text-primary hover:underline">Ecosystem page</a> for partner platforms.</p>' />
          </AccordionItem>
           <AccordionItem value="faq-4">
            <AccordionTrigger className="text-lg hover:no-underline">Are the VSD smart contracts audited?</AccordionTrigger>
            <AccordionContent htmlString='<p>Yes, security is our top priority. The VSD smart contracts have undergone [mention number if known, e.g., multiple] independent security audits. Links to audit reports will be made available here: [Placeholder for Audit Links]. We also run an ongoing bug bounty program to incentivize responsible disclosure of vulnerabilities.</p>' />
          </AccordionItem>
        </Accordion>
      </SectionCard>

    </div>
  );
}
