
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Zap, Users, ShieldCheck, BarChart2, Cpu, PackagePlus, DollarSign, BrainCircuit, ArrowRight, CheckCircle, ListChecks, Milestone, HandCoins, PiggyBank, FileSignature, TrendingUp } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";
import { AIImage } from "@/components/ai/AIImage";
import { PresaleInterface } from "@/components/token/PresaleInterface";

export const metadata: Metadata = {
  title: 'VSD Utility Token | Presale & Tokenomics',
  description: 'Detailed information about the VSD utility token, its tokenomics, active presale, use cases, and the VSD Network vision.',
};

const FeatureItem = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="flex items-start space-x-3 sm:space-x-4">
    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mt-1 shrink-0" />
    <div>
      <h3 className="text-lg sm:text-xl font-semibold mb-1 font-headline">{title}</h3>
      <p className="text-muted-foreground text-sm sm:text-base">{children}</p>
    </div>
  </div>
);

export default function TokenPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <BrainCircuit className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Utility Token</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          The financial backbone of a decentralized AI ecosystem. Discover VSD's utility, tokenomics, and how to participate in our vision.
        </p>
      </header>

      <Separator />

      <section id="what-is-vsd" className="space-y-6 sm:space-y-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">What is VSD Token?</h2>
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 text-base sm:text-lg">
            <p className="mb-4">
              VSD is a utility token at the heart of the VSD Network, a decentralized platform designed to provide accessible and powerful AI-driven tools and services. It's more than just a digital asset; VSD is your key to unlocking a new generation of AI capabilities and financial tools within the IMG Ecosystem.
            </p>
            <p className="mb-4">
              Our mission is to democratize access to AI and decentralized finance by creating a token-powered ecosystem where users can utilize cutting-edge AI for content creation (IMG services), data analysis, and more, while also participating in the platform's growth and governance.
            </p>
             <AIImage
                initialSrc="https://placehold.co/700x350.png"
                alt="VSD Token powering AI services"
                width={700}
                height={350}
                className="rounded-md my-6 shadow-md mx-auto"
                hint="AI token utility"
            />
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section id="key-features" className="space-y-6 sm:space-y-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">Core Utility & Features</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <FeatureItem icon={HandCoins} title="Royalty Payouts">
            Receive automated royalty payments directly to your VSD wallet for your creative work within the IMG ecosystem.
          </FeatureItem>
           <FeatureItem icon={TrendingUp} title="Tokenized Investments">
            Use VSD to invest in tokenized assets, music rights, or participate in fundraising for indie artists and projects.
          </FeatureItem>
          <FeatureItem icon={FileSignature} title="NFT Licensing">
            Pay for and receive licenses for NFTs and other digital media using VSD, with terms encoded in smart contracts.
          </FeatureItem>
          <FeatureItem icon={Cpu} title="Pay-per-use AI Features">
            Access a powerful suite of IMG services and advanced AI tools on a pay-as-you-go basis with VSD tokens.
          </FeatureItem>
          <FeatureItem icon={PackagePlus} title="Membership Rewards & Staking">
            Stake VSD to earn yield and unlock tiered membership rewards, including exclusive access and discounted services.
          </FeatureItem>
          <FeatureItem icon={Users} title="Crowdfunding & Governance">
            Fund new creative projects from indie artists and use your VSD stake to vote on key ecosystem and governance proposals.
          </FeatureItem>
        </div>
      </section>

      <Separator />

      <section id="presale" className="space-y-6 sm:space-y-8">
        <PresaleInterface />
      </section>

      <Separator />

      <section id="tokenomics" className="space-y-6 sm:space-y-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">VSD Tokenomics</h2>
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-xl sm:text-2xl">Sustainable Economic Model</CardTitle>
            <CardDescription className="text-sm sm:text-base">Designed for long-term growth, community incentivization, and platform development.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
              <div>
                <h4 className="text-md sm:text-lg font-semibold text-primary">Total Supply</h4>
                <p className="text-lg sm:text-xl font-bold">1,000,000,000 VSD</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Fixed total supply ensuring scarcity.</p>
              </div>
              <div>
                <h4 className="text-md sm:text-lg font-semibold text-primary">Token Symbol</h4>
                <p className="text-lg sm:text-xl font-bold">VSD</p>
              </div>
              <div>
                <h4 className="text-md sm:text-lg font-semibold text-primary">Token Standard</h4>
                <p className="text-lg sm:text-xl font-bold">ERC20</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Initially deployed on a scalable and secure EVM blockchain.</p>
              </div>
            </div>
            <Separator />
            <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 text-center sm:text-left">Token Allocation:</h4>
                <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                    <li><strong>Public Presale:</strong> 20% (200,000,000 VSD) - For early community adoption and initial funding.</li>
                    <li><strong>Private Sale:</strong> 10% (100,000,000 VSD) - For strategic partners and early backers.</li>
                    <li><strong>Staking Rewards & Ecosystem Incentives:</strong> 30% (300,000,000 VSD) - To reward stakers and incentivize platform participation.</li>
                    <li><strong>Team & Advisors:</strong> 15% (150,000,000 VSD) - Vested over 3 years with a 6-month cliff.</li>
                    <li><strong>Ecosystem Development Fund:</strong> 15% (150,000,000 VSD) - For future platform enhancements, grants, and partnerships.</li>
                    <li><strong>Marketing & Liquidity:</strong> 10% (100,000,000 VSD) - For awareness campaigns and exchange liquidity.</li>
                </ul>
                 <AIImage
                    initialSrc="https://placehold.co/700x400.png"
                    alt="VSD Token Allocation Chart"
                    width={700}
                    height={400}
                    className="rounded-md my-6 shadow-md mx-auto"
                    hint="token allocation pie chart"
                 />
            </div>
            <div className="text-center">
                <Button asChild size="lg" className="font-bold btn-hover-effect">
                    <Link href="/developers/documentation#tokenomics">Read Full Tokenomics in Whitepaper <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

       <section id="roadmap" className="space-y-6 sm:space-y-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">Project Roadmap</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Phase 1: Foundation & Presale", icon: Milestone, items: ["Whitepaper Release", "Private & Public Presale Rounds", "Core Smart Contract Audits", "Community Building"] },
            { title: "Phase 2: Platform Launch", icon: Cpu, items: ["VSD Banking Suite (MVP)", "Staking dApp Launch", "Initial Governance Portal"] },
            { title: "Phase 3: Ecosystem Expansion", icon: Users, items: ["Partner Integrations (AiEar, PromoHub)", "Developer SDKs Release", "Smart Contract Engine (Beta)"] },
            { title: "Phase 4: Decentralization & Growth", icon: ListChecks, items: ["Full DAO Governance Implemented", "Token-to-Fiat Oracle Integration", "Ecosystem Grant Program"] },
          ].map(phase => (
            <Card key={phase.title} className="shadow-md bg-card/70 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <phase.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline text-lg sm:text-xl">{phase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs sm:text-sm">
                  {phase.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
             <Button asChild variant="outline">
                <Link href="/developers/documentation#roadmap">
                    View Detailed Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </section>

      <Separator />

      <section id="legal-disclaimer" className="space-y-4">
        <h2 className="font-headline text-xl sm:text-2xl font-semibold text-center">Legal Disclaimer</h2>
        <Card className="shadow-md bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 text-xs sm:text-sm text-muted-foreground">
            <p className="mb-2"><strong>IMPORTANT:</strong> The VSD Token is a utility token designed to grant access to services and features within the VSD Network ecosystem. VSD Tokens are not intended to constitute securities in any jurisdiction. This website, the whitepaper, or any related materials do not constitute a prospectus or offer document of any sort and are not intended to constitute an offer of securities or a solicitation for investment in securities.</p>
            <p className="mb-2">The information herein is not advice, nor a recommendation to purchase VSD Tokens. Participation in the token sale is at your own risk. Please consult with your legal, financial, and tax advisors before making any decisions. The VSD Network project is under development and subject to change. </p>
            <p>The VSD Foundation (or similar entity) is intended to be registered in a crypto-friendly jurisdiction (e.g., British Virgin Islands) and will operate in compliance with applicable local regulations. Citizens and residents of certain jurisdictions may be restricted from participating in the token sale. It is your responsibility to ensure compliance with the laws of your jurisdiction.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
