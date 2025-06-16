
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, BarChartBig, CheckCircle, ChevronRight, DollarSign, Info, Lightbulb, ShieldAlert, TrendingUp, Users, Zap, BrainCircuit } from 'lucide-react';
import { AnimatedLogoBackground } from '@/components/investors/AnimatedLogoBackground';
import { Logo } from '@/components/icons/Logo';
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from '@/config/site';

// Metadata for server components, but good to keep in mind for client components if needed later.
// export const metadata: Metadata = {
//   title: 'Invest in AUDIO EXCHANGE | VSD Network Investor Portal',
//   description: 'Exclusive opportunity for VSD token holders to invest in AUDIO EXCHANGE, the future of AI-powered decentralized music. Learn about terms, risks, and how to participate.',
// };

const SectionWrapper: React.FC<{ id: string; title: string; icon?: React.ElementType; children: React.ReactNode; className?: string }> = ({ id, title, icon: Icon, children, className }) => (
  <section id={id} className={cn("py-8 sm:py-12", className)}>
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6 sm:mb-8">
        {Icon && <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-3 sm:mr-4" />}
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const InfoCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className }) => (
  <Card className={cn("shadow-lg bg-card/80 backdrop-blur-sm", className)}>
    <CardHeader>
      <div className="flex items-center">
        <Icon className="h-6 w-6 text-primary mr-3" />
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none prose-headings:text-primary">
      {children}
    </CardContent>
  </Card>
);


export default function InvestorsPage() {
  const [vsdAmount, setVsdAmount] = useState<string>('');
  const [estimatedAEXTokens, setEstimatedAEXTokens] = useState<number>(0);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false); // Simulated state
  const { toast } = useToast();

  const VSD_TO_AEX_RATE = 10; // Example: 1 VSD = 10 AEX (AUDIO EXCHANGE Tokens)
  const MIN_INVESTMENT_VSD = 1000;
  const MAX_INVESTMENT_VSD = 100000;

  useEffect(() => {
    const amount = parseFloat(vsdAmount);
    if (!isNaN(amount) && amount > 0) {
      setEstimatedAEXTokens(amount * VSD_TO_AEX_RATE);
    } else {
      setEstimatedAEXTokens(0);
    }
  }, [vsdAmount]);

  const handleInvestment = () => {
    if (!isWalletConnected) {
        toast({ title: "Wallet Not Connected", description: "Please connect your wallet to proceed with the investment.", variant: "destructive" });
        return;
    }
    const amount = parseFloat(vsdAmount);
    if (isNaN(amount) || amount < MIN_INVESTMENT_VSD || amount > MAX_INVESTMENT_VSD) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a VSD amount between ${MIN_INVESTMENT_VSD} and ${MAX_INVESTMENT_VSD}.`,
        variant: "destructive",
      });
      return;
    }
    // Simulate investment
    toast({
      title: "Investment Submitted (Simulated)",
      description: `Your intent to invest ${amount} VSD for approximately ${estimatedAEXTokens} AEX tokens has been recorded. This is a simulation. No actual transaction occurred.`,
    });
    setVsdAmount(''); // Reset input
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    toast({ title: "Wallet Connected (Simulated)", description: "Your wallet has been successfully connected. You can now proceed with your investment." });
  };

  const faqs = [
    { q: "What is AUDIO EXCHANGE (AEX)?", a: "AUDIO EXCHANGE is a planned AI-powered, decentralized platform for music creation, collaboration, distribution, and monetization. It aims to empower independent artists by providing advanced AI tools, transparent royalty structures, and direct fan engagement through Web3 technologies. AEX tokens will be the native utility and governance token of the AUDIO EXCHANGE platform." },
    { q: "Why should I invest VSD tokens into AUDIO EXCHANGE?", a: "Investing VSD allows you to become an early stakeholder in a potentially high-growth project at the intersection of AI and Web3 music. Potential benefits include receiving AEX tokens at a preferential rate, early access to platform features, governance rights within AUDIO EXCHANGE, and supporting the broader VSD ecosystem by creating a strong use-case for VSD tokens." },
    { q: "What are AEX tokens?", a: "AEX tokens are envisioned as the utility and governance tokens for the AUDIO EXCHANGE platform. They may be used for: accessing premium AI music tools, paying for platform services, participating in AUDIO EXCHANGE governance, staking for rewards within AUDIO EXCHANGE, and facilitating artist-fan transactions." },
    { q: "What is the conversion rate from VSD to AEX tokens?", a: `The current illustrative conversion rate for this investment opportunity is 1 VSD = ${VSD_TO_AEX_RATE} AEX tokens. This rate is subject to change based on market conditions and project development phases.` },
    { q: "Is there a minimum or maximum investment amount?", a: `Yes, for this investment round, the minimum investment is ${MIN_INVESTMENT_VSD} VSD and the maximum is ${MAX_INVESTMENT_VSD} VSD per participant.` },
    { q: "What are the risks involved?", a: "Investing in early-stage projects like AUDIO EXCHANGE carries significant risks, including but not limited to market volatility, technological challenges, regulatory uncertainties, and potential loss of invested capital. The project is conceptual and its success is not guaranteed. Please review the 'Risk Factors' section carefully and conduct your own due diligence." },
    { q: "How will the invested VSD tokens be used?", a: "VSD tokens raised will be allocated towards: Research & Development of AI music tools for AUDIO EXCHANGE, platform infrastructure development, marketing and community building for AUDIO EXCHANGE, legal and operational setup, and artist onboarding programs." },
    { q: "When will I receive my AEX tokens?", a: "AEX tokens will be distributed according to a vesting schedule post-TGE (Token Generation Event) of AEX. Details of the TGE and vesting schedule will be announced to investors. This is a long-term investment." },
    { q: "Is this a security offering?", a: "No. This opportunity is structured as an investment of utility VSD tokens into the development of the AUDIO EXCHANGE project, with the potential to receive utility AEX tokens. However, regulations vary by jurisdiction. It is not financial advice. Please consult legal and financial professionals." }
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatedLogoBackground />
      <div className="relative z-10 space-y-12 sm:space-y-16 pb-16">
        <header className="text-center pt-12 sm:pt-16">
          <div className="inline-block mb-6">
            <Logo size={80} />
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
            Invest VSD in AUDIO EXCHANGE
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            An exclusive opportunity for VSD token holders to fuel the future of music with AUDIO EXCHANGE – an AI-powered, decentralized ecosystem for artists and fans.
          </p>
        </header>

        <Separator />

        <SectionWrapper id="about-audio-exchange" title="Discover AUDIO EXCHANGE" icon={Lightbulb}>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="prose prose-sm sm:prose-base prose-invert max-w-none">
              <p>AUDIO EXCHANGE is a visionary project aiming to revolutionize the music industry by leveraging the power of Artificial Intelligence and Web3 technologies. Our mission is to build a fair, transparent, and artist-centric ecosystem where creativity thrives and artists are equitably compensated.</p>
              <h4 className="font-headline text-primary">Core Pillars:</h4>
              <ul>
                <li><strong>AI-Powered Creation Tools:</strong> Offering musicians advanced AI assistants for melody generation, lyric writing, mastering, and more.</li>
                <li><strong>Decentralized Distribution:</strong> Enabling artists to directly publish their music, control their rights, and reach a global audience without intermediaries.</li>
                <li><strong>Tokenized Royalties & NFTs:</strong> Introducing innovative models for music ownership, royalty splits, and fan engagement through music NFTs and fractional ownership.</li>
                <li><strong>Community Governance:</strong> AEX token holders will participate in shaping the platform's future, ensuring it evolves with the needs of its users.</li>
                <li><strong>Fair Monetization:</strong> New revenue streams for artists, including direct fan subscriptions, micro-transactions for exclusive content, and DeFi integrations.</li>
              </ul>
              <p>By investing your VSD tokens, you're not just funding a project; you're becoming part of a movement to redefine the music landscape.</p>
            </div>
            <div>
              {/* Consider an AIImage here for "AI music platform concept" */}
               <Card className="overflow-hidden shadow-xl">
                 <img src="https://placehold.co/600x400.png?text=AUDIO+EXCHANGE+Concept" alt="AUDIO EXCHANGE Concept" className="w-full h-auto object-cover" data-ai-hint="AI music platform" />
               </Card>
            </div>
          </div>
        </SectionWrapper>

        <Separator />

        <SectionWrapper id="investment-opportunity" title="The Investment Proposition" icon={TrendingUp}>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <InfoCard title="Early Access & Preferential Terms" icon={Zap}>
              <p>Invest VSD now to acquire future AEX tokens (the native token of AUDIO EXCHANGE) at a rate potentially more favorable than public sales. Be among the first to experience and shape the platform.</p>
            </InfoCard>
            <InfoCard title="Drive VSD Utility" icon={BrainCircuit}>
              <p>This initiative directly enhances the VSD Network by creating a significant, real-world use case for VSD tokens, potentially increasing demand and ecosystem value. AUDIO EXCHANGE will integrate VSD for certain functionalities.</p>
            </InfoCard>
            <InfoCard title="Shape the Future of Music" icon={Users}>
              <p>Your investment contributes to building a groundbreaking platform. AEX token holders will have governance rights in AUDIO EXCHANGE, influencing its development and policies.</p>
            </InfoCard>
          </div>
          <Card className="mt-8 bg-primary/10 p-6 text-center">
            <p className="text-lg font-semibold text-primary-foreground">
              Invested VSD tokens will be strategically deployed to accelerate AUDIO EXCHANGE's development, focusing on AI tool integration, smart contract creation, and artist community growth.
            </p>
             <Button asChild variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/20">
                <Link href="/token">Learn more about VSD Tokens</Link>
            </Button>
          </Card>
        </SectionWrapper>

        <Separator />

        <SectionWrapper id="how-to-invest" title="Invest Your VSD" icon={DollarSign}>
          <Card className="max-w-2xl mx-auto shadow-xl bg-card/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">AUDIO EXCHANGE Investment Portal (Simulated)</CardTitle>
              <CardDescription className="text-center">
                This is an illustrative interface. No real transactions will occur.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isWalletConnected ? (
                <div className="text-center">
                    <p className="mb-4 text-muted-foreground">Connect your wallet to participate in the AUDIO EXCHANGE investment opportunity.</p>
                    <Button onClick={handleConnectWallet} size="lg" className="w-full sm:w-auto">
                        <Zap className="mr-2 h-5 w-5" /> Connect Wallet (Simulated)
                    </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="vsd-amount" className="text-lg">VSD Amount to Invest</Label>
                    <Input
                      id="vsd-amount"
                      type="number"
                      placeholder={`Min ${MIN_INVESTMENT_VSD}, Max ${MAX_INVESTMENT_VSD}`}
                      value={vsdAmount}
                      onChange={(e) => setVsdAmount(e.target.value)}
                      className="text-lg p-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      Illustrative conversion: 1 VSD = {VSD_TO_AEX_RATE} AEX tokens.
                    </p>
                  </div>
                  <Card className="bg-muted/50 p-4">
                    <h4 className="font-semibold mb-2 text-center">Estimated Outcome:</h4>
                    <p className="text-2xl font-bold text-primary text-center">
                      {estimatedAEXTokens.toLocaleString()} AEX Tokens
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">(Subject to final terms and vesting schedule)</p>
                  </Card>
                  <div className="pt-2">
                    <Button onClick={handleInvestment} size="lg" className="w-full font-bold text-xl py-7 btn-hover-effect">
                      Invest VSD Now (Simulated)
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex-col items-center text-xs text-muted-foreground space-y-1">
                <p>Ensure you have read all terms and risks before proceeding.</p>
                <p>This is a simulation. Real investments require smart contract interactions.</p>
            </CardFooter>
          </Card>
        </SectionWrapper>

        <Separator />

        <SectionWrapper id="use-of-proceeds" title="Use of Invested VSD" icon={BarChartBig}>
            <InfoCard title="Strategic Allocation for Growth" icon={CheckCircle}>
                <p>The VSD tokens collected through this investment initiative will be dedicated to the development and launch of the AUDIO EXCHANGE platform. Transparency in fund allocation is a core principle.</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>40% - Technology & Platform Development:</strong> Building the core AUDIO EXCHANGE platform, AI music tool integration, smart contract development for tokenization and royalties, and ensuring robust security.</li>
                    <li><strong>30% - Marketing & Community Building:</strong> Global marketing campaigns, artist onboarding programs, community engagement initiatives, and forming strategic partnerships within the music and Web3 industries.</li>
                    <li><strong>15% - Operations & Legal:</strong> Covering operational expenses, legal consultations for regulatory compliance across jurisdictions, and establishing the AUDIO EXCHANGE foundation/entity.</li>
                    <li><strong>10% - Liquidity & Ecosystem Fund:</strong> Providing initial liquidity for AEX tokens on decentralized exchanges and establishing an ecosystem fund for future AUDIO EXCHANGE grants and developer incentives.</li>
                    <li><strong>5% - Contingency:</strong> Reserved for unforeseen expenses and strategic opportunities that may arise during development.</li>
                </ul>
                <p className="mt-4">A detailed breakdown and regular updates on fund utilization will be provided to investors through dedicated channels.</p>
            </InfoCard>
        </SectionWrapper>
        
        <Separator />

        <SectionWrapper id="faq" title="Investor FAQ" icon={Info}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faqItem, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-md sm:text-lg text-left hover:no-underline">{faqItem.q}</AccordionTrigger>
                <AccordionContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
                  <p dangerouslySetInnerHTML={{ __html: faqItem.a }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionWrapper>

        <Separator />

        <SectionWrapper id="risk-factors" title="Risk Factors & Disclaimers" icon={ShieldAlert}>
            <Card className="border-destructive bg-destructive/10 p-6 shadow-lg">
                <CardHeader className="!p-0">
                <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-7 w-7 text-destructive" />
                    <CardTitle className="text-destructive text-xl sm:text-2xl">Important: Please Read Carefully</CardTitle>
                </div>
                </CardHeader>
                <CardContent className="!pt-4 !px-0 !pb-0 prose prose-sm sm:prose-base max-w-none text-destructive-foreground">
                    <p>Investing in early-stage technology projects, especially those involving cryptocurrencies, AI, and Web3, carries a high degree of risk. Before making any decision to invest VSD tokens in the AUDIO EXCHANGE project, you must carefully consider the following non-exhaustive list of risks:</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Market Volatility:</strong> The value of VSD tokens, AEX tokens (if and when issued), and the overall cryptocurrency market can be extremely volatile. You may lose a significant portion or all of your invested capital.</li>
                        <li><strong>Project Development Risk:</strong> AUDIO EXCHANGE is a conceptual project currently under planning and development. There is no guarantee that the project will be successfully developed, launched, or achieve its stated objectives. Delays, changes in scope, or failure to deliver are possible.</li>
                        <li><strong>Technological Risks:</strong> The project relies on complex technologies, including AI and blockchain. There may be unforeseen technical challenges, bugs, or vulnerabilities in the software, smart contracts, or AI models.</li>
                        <li><strong>Regulatory Uncertainty:</strong> The regulatory landscape for digital assets, token offerings, and AI is rapidly evolving and varies significantly by jurisdiction. Future laws or regulations could adversely impact the AUDIO EXCHANGE project, VSD tokens, or AEX tokens.</li>
                        <li><strong>No Guarantee of Returns:</strong> There is no promise or guarantee of any financial return, profit, or appreciation in value from investing VSD in AUDIO EXCHANGE or from holding AEX tokens. The success of AUDIO EXCHANGE and any associated tokens depends on numerous factors, many of which are outside of our control.</li>
                        <li><strong>Liquidity Risk:</strong> There is no guarantee that AEX tokens will be listed on any exchange or that a liquid market for them will develop. You may not be able to sell or trade your AEX tokens easily or at your desired price.</li>
                        <li><strong>Security Risks:</strong> Despite efforts to implement security measures, decentralized platforms and smart contracts can be targets for hackers and malicious actors. Loss of funds due to security breaches is possible.</li>
                        <li><strong>Dependence on VSD Network:</strong> The success of AUDIO EXCHANGE may be partially dependent on the continued development, success, and stability of the VSD Network.</li>
                    </ul>
                    <h4 className="text-destructive-foreground">Legal Disclaimer:</h4>
                    <p>The information provided on this page is for informational purposes only and does not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation of any security or investment product. This is not financial, legal, or investment advice. VSD Network and the proponents of AUDIO EXCHANGE are not registered investment advisors.</p>
                    <p>The investment opportunity described herein is speculative and involves substantial risks. You should conduct your own thorough due diligence and consult with independent financial, legal, and tax advisors in your jurisdiction before making any investment decisions. You are solely responsible for determining whether this investment is appropriate for you based on your financial situation and risk tolerance.</p>
                    <p>By proceeding with any interaction on this page or expressing interest in this investment, you acknowledge that you have read, understood, and accepted these risks and disclaimers. VSD tokens are utility tokens for the VSD Network. Their use in this investment context does not alter their fundamental utility nature nor imply they are securities. The receipt of AEX tokens is contingent on the successful development and launch of the AUDIO EXCHANGE platform.</p>
                    <p>Refer to the official <Link href="/developers/documentation#legal" className="text-destructive hover:underline font-semibold">VSD Network Whitepaper Legal Disclaimer</Link> for broader disclaimers applicable to the VSD token and ecosystem.</p>
                </CardContent>
            </Card>
        </SectionWrapper>
      </div>
    </div>
  );
}
