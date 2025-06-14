
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrainCircuit, Library, Workflow, Cpu, GitBranch, HelpCircle, Layers, FileJson, Zap, Users, PackagePlus, DollarSign, Milestone, ListChecks, Aperture, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'VSD Token Whitepaper & Documentation',
  description: 'Comprehensive VSD Utility Token Whitepaper covering vision, tokenomics, utility, presale, roadmap, and technical integration guides.',
};

const SectionCard = ({ icon: Icon, title, description, children, id }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, id?: string }) => (
  <Card className="shadow-lg bg-card/80 backdrop-blur-sm" id={id}>
    <CardHeader>
      <div className="flex items-center space-x-3 mb-2">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        <CardTitle className="font-headline text-2xl sm:text-3xl">{title}</CardTitle>
      </div>
      {description && <CardDescription className="text-base sm:text-lg">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
      {children}
    </CardContent>
  </Card>
);

export default function WhitepaperDocumentationPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <BrainCircuit className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Utility Token Whitepaper</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          An in-depth overview of the VSD Token, its utility within the AI-powered VSD Network, tokenomics, presale plan, roadmap, and technical details for developers.
        </p>
        <p className="text-xs text-muted-foreground mt-2">Version 1.0 - [Current Date Placeholder, e.g., July 2024]</p>
      </header>

      <Separator />

      <SectionCard icon={Library} title="1. Introduction: The VSD Vision" description="Democratizing AI through a token-powered ecosystem." id="introduction">
        <p>The digital landscape is rapidly evolving, with Artificial Intelligence (AI) at the forefront of innovation. However, access to powerful AI tools and the ability to participate in their development often remains centralized and complex. The VSD Network aims to change this paradigm by creating a decentralized ecosystem centered around the VSD utility token.</p>
        <p><strong>Our Mission:</strong> To empower individuals and businesses by providing accessible, high-quality AI services (such as advanced content and image generation via "IMG Services"), fostering a collaborative community, and enabling decentralized governance. VSD is the key to unlocking this ecosystem.</p>
        <p>This whitepaper outlines the VSD Token's utility, the underlying tokenomics, our strategic roadmap, the planned presale, and how developers can build and integrate with the VSD Network. We invite you to join us in building the future of decentralized AI.</p>
        <AIImage
          initialSrc="https://placehold.co/800x400.png"
          alt="VSD Network Vision for AI"
          width={800}
          height={400}
          className="rounded-md my-6 shadow-md mx-auto max-w-full h-auto" 
          hint="AI future vision"
        />
      </SectionCard>

      <Separator />

      <SectionCard icon={Zap} title="2. VSD Token Utility" description="The core functions and benefits of holding and using VSD tokens." id="utility">
        <p>The VSD token is an integral component of the VSD Network, designed with multiple utilities to drive platform adoption and user engagement:</p>
        <Accordion type="multiple" className="w-full mt-4">
          <AccordionItem value="util-ai">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">Access AI Services (IMG Services & More)</AccordionTrigger>
            <AccordionContent>
              <p>The primary utility of VSD is to pay for and access a growing suite of AI-powered tools and services on the VSD Network. This includes, but is not limited to:</p>
              <ul className="list-disc pl-5">
                <li><strong>IMG Services:</strong> Advanced AI for image generation, editing, and enhancement.</li>
                <li>AI-driven content creation (articles, scripts, marketing copy).</li>
                <li>Data analysis and insight generation tools.</li>
                <li>Future AI models and specialized services as the platform evolves.</li>
              </ul>
              <p>VSD tokens will be used in a pay-as-you-go model or for subscription tiers, offering flexibility for various user needs.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="util-staking">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">Staking for Rewards</AccordionTrigger>
            <AccordionContent>
              <p>Users can stake their VSD tokens to earn passive rewards (APY). Staking contributes to the ecosystem's stability and user commitment. Key aspects include:</p>
              <ul className="list-disc pl-5">
                <li><strong>Tiered APY:</strong> Rewards may vary based on the amount staked and the duration of the lock-up period.</li>
                <li><strong>Network Participation:</strong> Staked tokens might also grant priority access or discounted rates for AI services.</li>
                <li><strong>Reward Distribution:</strong> Rewards will be distributed periodically from the designated Staking Rewards pool within the token allocation.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="util-governance">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">Governance & DAO Participation</AccordionTrigger>
            <AccordionContent>
              <p>VSD token holders will have the power to shape the future of the VSD Network through a Decentralized Autonomous Organization (DAO). Voting rights include:</p>
              <ul className="list-disc pl-5">
                <li>Proposing and voting on platform upgrades and new features.</li>
                <li>Influencing the allocation of the Ecosystem Development Fund.</li>
                <li>Adjusting certain platform parameters (e.g., fee structures for AI services, staking reward rates).</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="util-discounts">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">Discounts & Premium Features</AccordionTrigger>
            <AccordionContent>
              <p>Holding or using VSD tokens can unlock discounts on AI service fees, provide access to premium features, or grant exclusive entry to token-gated content and communities on the VSD Network and partner platforms (e.g., AiEar, PromoHub).</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="util-burn">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">Token Burn Mechanism</AccordionTrigger>
            <AccordionContent>
              <p>A portion of the VSD tokens collected from platform service fees (e.g., IMG services) will be programmatically burned. This deflationary mechanism is designed to reduce the total circulating supply over time, potentially increasing the token's scarcity and value for holders.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SectionCard>

      <Separator />

      <SectionCard icon={FileJson} title="3. Tokenomics & Presale" description="Detailed breakdown of VSD token distribution, supply, and presale plan." id="tokenomics">
        <p>The VSD tokenomics are structured to ensure a balanced distribution, incentivize long-term holding, fund ongoing development, and foster a vibrant community. For full details including presale stages, pricing, and accepted currencies, please visit the <Link href="/token#tokenomics">VSD Token Page</Link>.</p>
        
        <h4 className="text-xl sm:text-2xl mt-6 mb-2">Key Tokenomics Figures:</h4>
        <ul className="list-disc pl-5 mb-4">
          <li><strong>Total Supply:</strong> 1,000,000,000 VSD (One Billion)</li>
          <li><strong>Token Symbol:</strong> VSD</li>
          <li><strong>Network:</strong> [Specify Blockchain, e.g., Ethereum (ERC20), Polygon]</li>
        </ul>

        <h4 className="text-xl sm:text-2xl mt-6 mb-2">Token Allocation:</h4>
        <AIImage
            initialSrc="https://placehold.co/700x450.png"
            alt="VSD Token Allocation Pie Chart"
            width={700}
            height={450}
            className="rounded-md my-4 shadow-md mx-auto"
            hint="token allocation chart"
        />
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Public Presale:</strong> 20% (200,000,000 VSD) - For early community adoption and initial funding.</li>
            <li><strong>Private Sale:</strong> 10% (100,000,000 VSD) - For strategic partners and early backers (subject to vesting).</li>
            <li><strong>Staking Rewards & Ecosystem Incentives:</strong> 30% (300,000,000 VSD) - Released over time to reward stakers and incentivize platform participation.</li>
            <li><strong>Team & Advisors:</strong> 15% (150,000,000 VSD) - Subject to a vesting schedule (e.g., 3-year vesting with a 6-month cliff) to align long-term interests.</li>
            <li><strong>Ecosystem Development Fund:</strong> 15% (150,000,000 VSD) - Managed by the DAO for future platform enhancements, R&D, developer grants, and strategic partnerships.</li>
            <li><strong>Marketing & Liquidity:</strong> 10% (100,000,000 VSD) - For creating awareness, community engagement, and providing initial liquidity on exchanges.</li>
        </ul>

        <h4 className="text-xl sm:text-2xl mt-8 mb-2">Presale Plan Overview:</h4>
        <p>The VSD token presale will be conducted in phases, starting with a private round for strategic investors, followed by public sale stages accessible to the wider community. The goal is to raise approximately $500,000 USD (ETH/USDT equivalent) in the initial public presale phase.</p>
        <p>Participants in the presale will acquire VSD tokens at a preferential rate before they are listed on public exchanges. KYC/AML procedures will be implemented to ensure compliance. Funds raised will be allocated towards:</p>
        <ul className="list-disc pl-5">
          <li>Platform Development & AI Model Integration (IMG Services, etc.)</li>
          <li>Marketing and Community Growth</li>
          <li>Legal & Operational Expenses</li>
          <li>Future Exchange Listing Fees & Liquidity Provision</li>
        </ul>
        <p>Detailed information on presale phases, pricing, how to participate, and vesting schedules for early participants will be available on the <Link href="/token#presale">VSD Token Page</Link> and official announcement channels.</p>
        <div className="mt-6 text-center">
             <Button asChild variant="default" size="lg">
                <Link href="/token#presale">View Presale Details</Link>
            </Button>
        </div>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={Workflow} title="4. VSD Network Architecture" description="High-level overview of the platform's components." id="architecture">
        <p>The VSD Network is designed as a modular and scalable platform. Key components include:</p>
        <AIImage
          initialSrc="https://placehold.co/800x450.png"
          alt="VSD Network AI Platform Architecture"
          width={800}
          height={450}
          className="rounded-md my-6 shadow-md mx-auto max-w-full h-auto" 
          hint="AI platform architecture"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="arch-core">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">VSD AI Core Engine</AccordionTrigger>
            <AccordionContent>
              <p>This is the heart of the platform, integrating various AI models (including those for IMG Services, text generation, etc.). It handles request processing, job queuing, and result delivery. It's designed for scalability to incorporate new models and handle increasing user load.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="arch-token">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">VSD Token Smart Contracts</AccordionTrigger>
            <AccordionContent>
              <p>A suite of smart contracts deployed on a public blockchain (e.g., Ethereum, Polygon) manages:</p>
              <ul className="list-disc pl-5">
                <li>The VSD utility token (ERC20 or equivalent standard).</li>
                <li>Staking mechanisms and reward distribution.</li>
                <li>Fee collection from AI services and token burn/redistribution logic.</li>
                <li>Governance contracts for the VSD DAO.</li>
              </ul>
              <p>These contracts ensure transparency and automated execution of token-related functions.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="arch-api">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">API Layer & SDKs</AccordionTrigger>
            <AccordionContent>
              <p>A robust API layer allows users and third-party developers to interact with the VSD AI Core Engine and query blockchain data related to VSD tokens. SDKs (JavaScript, Python planned) will simplify integration for dApps and other services looking to leverage VSD AI capabilities or token utility.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="arch-dapp">
            <AccordionTrigger className="text-lg sm:text-xl hover:no-underline">VSD dApp Suite & Governance Portal</AccordionTrigger>
            <AccordionContent>
              <p>User-facing decentralized applications (dApps) provide intuitive interfaces for:</p>
              <ul className="list-disc pl-5">
                <li>Accessing AI tools (IMG Services, etc.).</li>
                <li>Managing VSD tokens, staking, and claiming rewards.</li>
                <li>Participating in DAO governance votes and proposals.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="mt-4">Security is paramount. All smart contracts will undergo rigorous independent audits before deployment, and bug bounty programs will be established.</p>
      </SectionCard>

      <Separator />

      <SectionCard icon={Milestone} title="5. Project Roadmap" description="Our phased approach to building the VSD Network." id="roadmap">
        <p>The VSD Network will be developed and rolled out in distinct phases, ensuring a methodical approach to building a robust and feature-rich AI ecosystem. For the latest updates, please refer to our official announcements.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 border rounded-lg bg-card/50">
                <h4 className="font-headline text-primary text-lg mb-2">Phase 1: Foundation & Presale (Q3-Q4 [Year])</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Whitepaper v1.0 Release & Community Building Initiatives.</li>
                    <li>Completion of Private Sale round with strategic partners.</li>
                    <li>Launch of Public Presale (multi-stage).</li>
                    <li>Development of core VSD token smart contracts (utility, staking).</li>
                    <li>Security audits of core contracts.</li>
                </ul>
            </div>
            <div className="p-4 border rounded-lg bg-card/50">
                <h4 className="font-headline text-primary text-lg mb-2">Phase 2: Platform MVP Launch (Q1-Q2 [Year+1])</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Launch of VSD AI Suite (MVP) featuring initial IMG Services.</li>
                    <li>Deployment of Staking dApp for VSD token holders.</li>
                    <li>Initial version of the VSD Governance Portal (basic proposal/voting).</li>
                    <li>Token Generation Event (TGE) and distribution of presale tokens.</li>
                    <li>Initial listings on Decentralized Exchanges (DEXs).</li>
                </ul>
            </div>
            <div className="p-4 border rounded-lg bg-card/50">
                <h4 className="font-headline text-primary text-lg mb-2">Phase 3: Ecosystem Expansion (Q3-Q4 [Year+1])</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Integration with partner platforms (AiEar, PromoHub).</li>
                    <li>Release of Developer SDKs (JavaScript, Python planned).</li>
                    <li>Expansion of AI toolset within the VSD AI Suite.</li>
                    <li>Enhanced DAO functionalities and treasury management.</li>
                    <li>Exploration of CEX listings.</li>
                </ul>
            </div>
            <div className="p-4 border rounded-lg bg-card/50">
                <h4 className="font-headline text-primary text-lg mb-2">Phase 4: Decentralization & Growth (Beyond [Year+1])</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Progressive decentralization towards full DAO control over the platform.</li>
                    <li>Establishment of an Ecosystem Grant Program for third-party developers.</li>
                    <li>Research into new AI models and cross-chain interoperability.</li>
                    <li>Continued global marketing and community expansion.</li>
                </ul>
            </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">Note: Roadmap timelines are indicative and subject to change based on development progress and market conditions.</p>
      </SectionCard>

      <Separator />
      
      <SectionCard icon={Layers} title="6. Developer Integration & SDKs" description="Building with VSD: APIs and tools for developers." id="sdks">
        <p>The VSD Network is committed to fostering a strong developer community. We will provide APIs and SDKs to enable seamless integration of VSD token utility and AI services into third-party applications, dApps, and platforms.</p>
        <h4 className="text-xl sm:text-2xl mt-6 mb-2">Planned SDKs:</h4>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>JavaScript/TypeScript SDK:</strong> For frontend (dApps, web integrations) and Node.js backend development. Facilitates interaction with VSD smart contracts (staking, governance) and the VSD AI API.</li>
            <li><strong>Python SDK (Future):</strong> To cater to backend developers, data scientists, and scripters looking to leverage VSD AI services or interact with the token.</li>
        </ul>
        <h4 className="text-xl sm:text-2xl mt-6 mb-2">API Access:</h4>
        <p>A secure REST API will provide access to:</p>
        <ul className="list-disc pl-5">
            <li>VSD AI Core Engine: Submit jobs for IMG services, text generation, etc. (requires VSD for payment).</li>
            <li>Token Information: Query VSD token data, staking statistics, and governance proposals.</li>
        </ul>
        <p>Detailed API documentation, SDK guides, and code examples will be available on the <Link href="/developers">Developer Portal</Link> as they are released. The `smart-contract-generator` on this site is an early example of an AI tool that will be part of the VSD AI Suite.</p>
        <Button variant="outline" asChild className="mt-6">
          <Link href="/developers/sdks-tools">
            <PackagePlus className="mr-2 h-4 w-4" /> Explore SDKs & Tools (Coming Soon)
          </Link>
        </Button>
      </SectionCard>
      
      <Separator />

      <SectionCard icon={Users} title="7. Team & Advisors (Placeholder)" description="The minds behind VSD Network." id="team">
          <p>The VSD Network is driven by a dedicated team of experienced blockchain developers, AI researchers, product managers, and marketing professionals. We are passionate about decentralization and the transformative potential of AI.</p>
          <p className="italic text-muted-foreground mt-2">(Detailed team member profiles, their expertise, and links to professional profiles (e.g., LinkedIn) will be presented here. Advisors with relevant industry experience will also be highlighted.)</p>
          <AIImage
            initialSrc="https://placehold.co/700x300.png"
            alt="VSD Network Team Placeholder"
            width={700}
            height={300}
            className="rounded-md my-6 shadow-md mx-auto"
            hint="professional team diverse"
        />
      </SectionCard>

      <Separator />

      <SectionCard icon={ShieldCheck} title="8. Legal Disclaimer & Risk Factors" description="Important information regarding VSD tokens and participation." id="legal">
        <p className="font-semibold">Please read this section carefully before participating in the VSD token sale or using VSD tokens.</p>
        <p>The VSD Token is a utility token designed to grant access to services and features within the VSD Network ecosystem. VSD Tokens are not intended to constitute securities in any jurisdiction. This whitepaper, the VSD Network website, or any related materials do not constitute a prospectus or offer document of any sort and are not intended to constitute an offer of securities or a solicitation for investment in securities in any jurisdiction.</p>
        <p>The information provided is for informational purposes only and does not constitute financial, legal, or investment advice. The purchase of VSD tokens involves significant risk, including but not limited to, risk of loss of all principal, market volatility, technological risks, and regulatory risks. You should carefully consider these risks and consult with your own independent legal, financial, tax, and other professional advisors before making any decision to purchase VSD tokens.</p>
        <p>The VSD Network project is currently under development and its features, roadmap, and tokenomics are subject to change without notice. There is no guarantee that the project will achieve its objectives or that the VSD tokens will have any particular value or utility.</p>
        <p>The VSD Foundation (or similar entity) is intended to be registered in a crypto-friendly jurisdiction (e.g., British Virgin Islands) and will operate in compliance with applicable local regulations. However, the regulatory landscape for digital assets is evolving and uncertain. Changes in laws or regulations could adversely affect the VSD Network or the value and utility of VSD tokens.</p>
        <p>By purchasing, holding, or using VSD tokens, you acknowledge and agree that you have read, understood, and accepted all the terms, conditions, and risks outlined in this whitepaper and any other official VSD Network documentation. You are solely responsible for ensuring compliance with the laws of your jurisdiction. Citizens and residents of certain restricted jurisdictions (which will be specified prior to any sale) may be prohibited from participating in the VSD token sale.</p>
        <p>Forward-looking statements in this document are based on current expectations and assumptions and are subject to risks and uncertainties that could cause actual results to differ materially.</p>
      </SectionCard>

    </div>
  );
}
