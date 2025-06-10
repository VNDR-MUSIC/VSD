
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Layers, TerminalSquare, GitBranch, RadioTower } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SDKs & Tools | VSD Network',
  description: 'Software Development Kits (SDKs) and tools for integrating with VSD smart contracts and the VSD Network.',
};

const SdkCard = ({ icon: Icon, title, status, children, githubLink }: { icon: React.ElementType, title: string, status: string, children: React.ReactNode, githubLink?: string }) => (
  <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
    <CardHeader>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </div>
      <CardDescription className="text-sm font-semibold text-primary/80">{status}</CardDescription>
    </CardHeader>
    <CardContent className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
      {children}
      {githubLink && (
        <Button variant="outline" asChild className="mt-6">
          <Link href={githubLink} target="_blank" rel="noopener noreferrer">
            <GitBranch className="mr-2 h-4 w-4" /> View on GitHub (Placeholder)
          </Link>
        </Button>
      )}
    </CardContent>
  </Card>
);

export default function SdksToolsPage() {
  return (
    <div className="space-y-16 py-8">
      <header className="text-center">
        <Package className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">SDKs & Tools</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are dedicated to providing developers with robust Software Development Kits (SDKs) and command-line interface (CLI) tools to make integration with VSD smart contracts and the VSD Network seamless and efficient.
        </p>
      </header>

      <Separator />

      <SdkCard icon={Layers} title="JavaScript/TypeScript SDK" status="Alpha">
        <p>A JavaScript/TypeScript SDK (e.g., using Ethers.js or Web3.js) is available to simplify interaction with VSD smart contracts from Node.js or browser environments (dApps). Easily query token balances, interact with vault functionalities, and build transactions.</p>
        <h4 className="text-xl mt-4 mb-2">Key Features:</h4>
        <ul>
          <li>Query VSD token balance, total supply, etc.</li>
          <li>Interact with Vault/CDP management functions (mint, repay, deposit/withdraw collateral).</li>
          <li>Helper utilities for formatting data and preparing transactions.</li>
          <li>Subscribe to smart contract events.</li>
        </ul>
        <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4">
          <code>
{`// Installation
npm install @vsdnetwork/sdk ethers # Example
// or
yarn add @vsdnetwork/sdk ethers

// Basic Usage (Illustrative)
import { VSDSDK, Networks, ethers } from '@vsdnetwork/sdk'; // Assuming ethers for provider/signer

async function getVsdBalance(userAddress, rpcUrl) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // For read-only: const sdk = new VSDSDK({ network: Networks.Mainnet, provider });
  // For write transactions, a signer is needed:
  // const signer = provider.getSigner(userAddress); // Or from wallet connection
  // const sdk = new VSDSDK({ network: Networks.Mainnet, signer });

  const sdk = new VSDSDK({ provider }); // Simplified for example
  const balance = await sdk.vsdToken.balanceOf(userAddress);
  console.log('VSD Balance:', ethers.utils.formatUnits(balance, await sdk.vsdToken.decimals()));
}

getVsdBalance('0xYourAccountAddress', 'YOUR_ETHEREUM_RPC_URL');`}
          </code>
        </pre>
        <p>Refer to the <Link href="/developers/documentation#apis-sdks">main documentation</Link> for more examples on interacting with specific smart contracts.</p>
      </SdkCard>

      <Separator />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SdkCard icon={RadioTower} title="Python SDK" status="Planned">
          <p>A Python SDK (e.g., using Web3.py) is planned to cater to backend developers and data scientists looking to interact with VSD smart contracts. It will offer similar functionalities to the JS SDK, tailored for Pythonic environments.</p>
          <p><strong>Expected Features:</strong> Smart contract interaction, event listening, transaction building, data analysis helpers.</p>
          <p className="mt-4 text-sm">Stay tuned for updates on its development progress.</p>
        </SdkCard>

        <SdkCard icon={RadioTower} title="Go SDK" status="Planned">
          <p>For developers working with Go, we plan to release a Go SDK. This will be beneficial for building high-performance backend services, indexers, and tools that interface with VSD smart contracts on the blockchain.</p>
          <p><strong>Expected Features:</strong> Core protocol interactions, type-safe smart contract bindings, transaction management.</p>
           <p className="mt-4 text-sm">Follow our announcements for availability.</p>
        </SdkCard>

        <SdkCard icon={TerminalSquare} title="CLI Tools" status="Planned">
          <p>Command-Line Interface (CLI) tools are on our roadmap to provide quick and easy ways to perform common tasks with VSD smart contracts, query on-chain information, and manage VSD-related operations directly from your terminal.</p>
          <p><strong>Potential Uses:</strong> Checking balances, querying vault status, interacting with governance proposals, deploying test contracts.</p>
          <p className="mt-4 text-sm">Development will commence after core SDKs are stable.</p>
        </SdkCard>
      </div>

      <Separator />

      <section className="text-center py-8">
        <h2 className="font-headline text-3xl font-bold mb-4">Stay Updated & Contribute</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Follow our progress on GitHub (for smart contracts and SDKs) and join our developer community for the latest announcements on SDKs, tools, and other developer resources.
        </p>
        <Button asChild variant="default" size="lg">
          <Link href="/developers#community">Developer Community & GitHub</Link>
        </Button>
      </section>

    </div>
  );
}
