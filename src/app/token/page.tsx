
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added for presale form
import { Label } from "@/components/ui/label"; // Added for presale form
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Added for ETH/USDT selection
import { Zap, Users, ShieldCheck, BarChart2, Cpu, PackagePlus, DollarSign, BrainCircuit, ArrowRight, CheckCircle, ListChecks, Milestone, Wallet, TrendingUp, Gift } from "lucide-react"; // Added Wallet, TrendingUp, Gift
import type { Metadata } from 'next';
import Link from "next/link";
import { AIImage } from "@/components/ai/AIImage";

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

const TokenomicsDetail = ({ title, value, description }: { title: string, value: string, description?: string }) => (
  <div>
    <h4 className="text-md sm:text-lg font-semibold text-primary">{title}</h4>
    <p className="text-lg sm:text-xl font-bold">{value}</p>
    {description && <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>}
  </div>
);

// Dummy Presale State Component (Illustrative)
const PresaleInterface = () => {
  // In a real app, this state would come from wallet connection, API calls, etc.
  // const [isConnected, setIsConnected] = React.useState(false);
  // const [contributionAmount, setContributionAmount] = React.useState("");
  // const [selectedCurrency, setSelectedCurrency] = React.useState("ETH");
  // const [vsdToReceive, setVsdToReceive] = React.useState(0);
  // const presalePrice = 0.01; // $0.01 per VSD

  // const handleContribute = () => {
  //   alert(`Contributing ${contributionAmount} ${selectedCurrency}. Real logic needed!`);
  // };

  // const handleConnectWallet = () => {
  //   setIsConnected(true);
  //   alert("Wallet connection logic needed here!");
  // };

  return (
    <Card className="shadow-xl bg-gradient-to-br from-primary/20 via-card/90 to-secondary/20 backdrop-blur-xl border-primary/30">
      <CardHeader className="items-center">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="h-10 w-10 text-primary" />
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Join the VSD Token Presale!</CardTitle>
        </div>
        <CardDescription className="text-base sm:text-lg text-center max-w-xl">
          Secure your VSD tokens at an exclusive early-bird rate. Be part of the AI revolution powered by VSD.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <TokenomicsDetail title="Current Presale Phase" value="Phase 1 (Public)" description="Limited tokens available at this price." />
            <TokenomicsDetail title="Price per VSD" value="$0.01 USD" description="Equivalent in ETH/USDT." />
            <TokenomicsDetail title="Target Raise (Phase 1)" value="$500,000 USD" />
            <TokenomicsDetail title="Accepted Currencies" value="ETH, USDT" />
             <AIImage
                initialSrc="https://placehold.co/400x250.png"
                alt="VSD Presale Progress Bar (Conceptual)"
                width={400}
                height={250}
                className="rounded-md shadow-md mx-auto mt-4"
                hint="crypto presale progress"
            />
          </div>

          <Card className="p-6 bg-background/70 space-y-4">
            <h4 className="font-semibold text-lg text-center">Contribute & Get VSD</h4>
            {/* {!isConnected ? (
              <Button onClick={handleConnectWallet} size="lg" className="w-full font-bold text-lg py-6 btn-hover-effect">
                <Wallet className="mr-2 h-6 w-6" /> Connect Wallet
              </Button>
            ) : ( */}
            {/* // Simplified for illustrative purposes - real implementation needs wallet integration */}
            <>
              <div>
                <Label htmlFor="amount" className="text-sm font-medium">Contribution Amount</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    type="number"
                    id="amount"
                    placeholder="e.g., 0.5"
                    // value={contributionAmount}
                    // onChange={(e) => {
                    //   setContributionAmount(e.target.value);
                    //   setVsdToReceive(parseFloat(e.target.value || "0") / presalePrice); // Simplified calc
                    // }}
                    className="text-base"
                  />
                  <Tabs defaultValue="ETH" className="w-[100px]">
                    <TabsList className="grid w-full grid-cols-2 h-10">
                      <TabsTrigger value="ETH" className="text-xs px-2" /*onClick={() => setSelectedCurrency("ETH")}*/>ETH</TabsTrigger>
                      <TabsTrigger value="USDT" className="text-xs px-2" /*onClick={() => setSelectedCurrency("USDT")}*/>USDT</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md text-center">
                <p className="text-sm text-muted-foreground">You will receive (approx.):</p>
                <p className="text-xl font-bold text-primary">
                  {/* {vsdToReceive.toLocaleString() || '---'} VSD */}
                  --- VSD
                </p>
              </div>
              <Button 
                size="lg" 
                className="w-full font-bold text-lg py-6 btn-hover-effect"
                // onClick={handleContribute} 
                // disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
                onClick={() => alert("This button would initiate the contribution process after wallet connection and KYC. This requires full backend and smart contract integration.")}
              >
                Contribute Now
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By contributing, you agree to the <Link href="/developers/documentation#legal" className="underline hover:text-primary">Terms & Conditions</Link> and acknowledge the risks.
              </p>
            </>
            {/* )} */}
          </Card>
        </div>
        
        <Separator className="my-6" />

        <div>
            <h4 className="text-lg sm:text-xl font-semibold text-center mb-4">How to Participate - Step-by-Step:</h4>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                <li><strong>Prepare Your Wallet:</strong> Ensure you have a compatible Web3 wallet (e.g., MetaMask, Trust Wallet) funded with ETH or USDT.</li>
                <li><strong>Connect Your Wallet:</strong> Click the "Connect Wallet" button on our official presale platform (link will be active when presale starts).</li>
                <li><strong>Complete KYC/AML:</strong> You will be guided through a quick and secure KYC/AML verification process. This is mandatory for participation.</li>
                <li><strong>Enter Contribution Amount:</strong> Specify how much ETH or USDT you wish to contribute. The equivalent VSD token amount will be displayed.</li>
                <li><strong>Confirm Transaction:</strong> Review the details and confirm the transaction in your wallet.</li>
                <li><strong>Receive VSD Tokens:</strong> Your VSD tokens will be allocated to your wallet according to the presale vesting schedule after the TGE (Token Generation Event).</li>
            </ol>
            <p className="text-center text-muted-foreground text-xs mt-4">
              Always ensure you are on the official VSD Network website or presale portal. Beware of scams.
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">Presale Platform Link: (Coming Soon - Monitor Official Channels)</p>
        <Button variant="outline" asChild>
            <Link href="/developers/documentation#presale">
                Read Full Presale Details in Whitepaper <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};


export default function TokenPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <BrainCircuit className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Utility Token</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Powering a decentralized AI ecosystem. Discover VSD's utility, tokenomics, and how to participate in our vision.
        </p>
      </header>

      <Separator />

      <section id="what-is-vsd" className="space-y-6 sm:space-y-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">What is VSD Token?</h2>
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 text-base sm:text-lg">
            <p className="mb-4">
              VSD is a utility token at the heart of the VSD Network, a decentralized platform designed to provide accessible and powerful AI-driven tools and services. It's more than just a digital asset; VSD is your key to unlocking a new generation of AI capabilities.
            </p>
            <p className="mb-4">
              Our mission is to democratize access to AI by creating a token-powered ecosystem where users can utilize cutting-edge AI for content creation (IMG services), data analysis, and more, while also participating in the platform's growth and governance.
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
          <FeatureItem icon={Zap} title="Access AI Services">
            Use VSD tokens to access the VSD Network's suite of AI tools, including advanced image generation (IMG services), content creation, data analytics, and more.
          </FeatureItem>
          <FeatureItem icon={PackagePlus} title="Staking Rewards">
            Stake your VSD tokens to earn passive rewards (APY) and contribute to the network's security and stability. Tiered rewards for larger/longer stakes.
          </FeatureItem>
          <FeatureItem icon={Users} title="Governance & Voting">
            VSD token holders can participate in the VSD DAO, voting on key platform proposals, feature development, and ecosystem fund allocations.
          </FeatureItem>
          <FeatureItem icon={DollarSign} title="Platform Fee Mechanism">
            A portion of fees generated from AI services on the platform will be used for token burns or distributed to stakers, creating a deflationary aspect or value accrual.
          </FeatureItem>
          <FeatureItem icon={Cpu} title="Ecosystem Integrations">
            VSD will be integrated with partner platforms (e.g., AiEar, PromoHub) to unlock exclusive features, discounts, or token-gated content.
          </FeatureItem>
           <FeatureItem icon={ShieldCheck} title="Transparent & Secure">
            Built on audited smart contracts, ensuring transparency in token operations and platform governance on a public blockchain.
          </FeatureItem>
        </div>
      </section>

      <Separator />
      
      {/* Enhanced Presale Section */}
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
              <TokenomicsDetail title="Total Supply" value="1,000,000,000 VSD" description="Fixed total supply ensuring scarcity." />
              <TokenomicsDetail title="Token Symbol" value="VSD" />
              <TokenomicsDetail title="Network" value="[Specify Blockchain, e.g., Ethereum (ERC20), Polygon]" description="Initially deployed on a scalable and secure blockchain."/>
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
            { title: "Phase 2: Platform Launch", icon: Cpu, items: ["VSD AI Suite Beta (IMG Services)", "Staking dApp Launch", "Initial Governance Portal"] },
            { title: "Phase 3: Ecosystem Expansion", icon: Users, items: ["Partner Integrations (AiEar, PromoHub)", "Developer SDKs Release", "Expanded AI Toolset"] },
            { title: "Phase 4: Decentralization & Growth", icon: ListChecks, items: ["Full DAO Governance Implemented", "Further CEX/DEX Listings", "Ecosystem Grant Program"] },
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

