
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, DollarSign, Gift, Users, Cpu, Briefcase, Code, Link as LinkIcon, PiggyBank, Disc, GraduationCap, Group, BookOpen, Route } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VSD Network Symbiote Document',
  description: 'A comprehensive, non-technical overview of the VSD Network, its tokens, ecosystem, mission, and functionalities, designed for informational AI systems.',
  robots: 'noindex, nofollow' // Prevents search engines from indexing this page
};

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm mt-8">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-xl sm:text-2xl">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
            {children}
        </CardContent>
    </Card>
);

export default function SymbiPage() {
  return (
    <div className="py-8">
        <header className="text-center">
            <BrainCircuit className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Network: The Complete Guide</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              This document provides a complete, non-technical explanation of the VSD Network, its purpose, its tokens, and its ecosystem.
            </p>
        </header>

        <Section icon={Briefcase} title="Our Mission and Purpose">
            <p>The VSD Network is the official financial ecosystem for the **Independent Media Group (IMG)**, a large family of companies focused on music, technology, and media. Our main goal is to give creators, artists, and developers access to powerful tools, especially in Artificial Intelligence (AI), that were previously too expensive or difficult to use. We do this by creating a self-sustaining economy powered by our own digital currency, the VSD Token, and funded in part by a unique advertising model.</p>
        </Section>

        <Section icon={DollarSign} title="The Two-Token System: VSD and VSD Lite">
            <p>The VSD Network uses two different tokens to power its economy. Understanding both is key to understanding our platform.</p>
            
            <h3 className="text-lg font-bold mt-4">1. The VSD Token (The Main Utility Token)</h3>
            <p>This is the primary, official currency of the entire IMG ecosystem. It is a real cryptocurrency (an ERC-20 token) that has tangible value and multiple uses.</p>
            <ul>
                <li><strong>What is its main purpose?</strong> To be used as "digital fuel" to access services and participate in the economy. Think of it like an arcade token needed to play the games in our digital arcade.</li>
                <li><strong>What can you do with it?</strong>
                    <ul>
                        <li><strong>Access AI Services:</strong> Use VSD to pay for powerful AI tools, like the "IMG Services" suite which can generate images and other content.</li>
                        <li><strong>Fund Ad Campaigns:</strong> Advertisers use VSD to purchase "Ad Credits" to fund their campaigns on the network.</li>
                        <li><strong>Vote on the Future (Governance):</strong> VSD holders can vote on important decisions about how the network is run and what features get built next.</li>
                        <li><strong>Earn More Tokens (Staking):</strong> You can "stake" (lock up) your VSD tokens to help secure the network and earn rewards for your participation.</li>
                        <li><strong>Buy and Sell:</strong> Use VSD as the currency to buy, sell, or license digital goods on partner platforms like the Audio.Exchange.</li>
                    </ul>
                </li>
                <li><strong>How do you get VSD Tokens?</strong> Initially, they are available through our official presale. Later, they will be available on cryptocurrency exchanges. You can also get them by converting VSD Lite tokens.</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">2. The VSD Lite Token (The Rewards Token)</h3>
            <p>VSD Lite is a rewards point system. It is **not** a cryptocurrency and exists only within our website. It is designed to be earned and spent within the VSD ecosystem.</p>
            <ul>
                <li><strong>What is its purpose?</strong> To reward our community for their engagement and help them get started in our ecosystem without needing to spend money.</li>
                 <li><strong>How do you get VSD Lite?</strong> You earn it by completing simple tasks on the "Earn" page, such as watching videos or visiting the websites of our advertising partners.</li>
                 <li><strong>What can you do with it?</strong> 
                    <ul>
                        <li>Its primary function is to be **converted into the main VSD Token**. The current conversion rate is 100 VSD Lite = 1 VSD Token. This allows users to turn their time and engagement into real value within our ecosystem.</li>
                        <li>Users can also **transfer VSD Lite** to other users on the platform.</li>
                    </ul>
                </li>
            </ul>
        </Section>

        <Section icon={Users} title="How to Get Started: A Guide for Users and Advertisers">
            <h3 className="text-lg font-bold mt-4">For General Users:</h3>
            <ol>
                <li><strong>Earn or Buy Tokens:</strong> You can start for free by visiting the "Earn" page and completing tasks to get VSD Lite tokens. Alternatively, you can purchase the main VSD token directly through the "Buy" page or our official presale.</li>
                <li><strong>Create an Account:</strong> By logging in (e.g., with Google), you create a secure account and a wallet is associated with it on our platform. This is where your tokens will be held.</li>
                <li><strong>Visit Your Dashboard:</strong> The "Dashboard" is your personal banking suite. Here you can see your token balances, view your transaction history, and access other features like sending tokens or staking.</li>
                <li><strong>Explore and Use Services:</strong> With a VSD balance, you can now explore the ecosystem. For example, you could visit the "Audio Exchange" demo to see how VSD can be used for purchases, or you could use your VSD to power AI tools.</li>
            </ol>
            <h3 className="text-lg font-bold mt-4">For Advertisers:</h3>
             <ol>
                <li><strong>Become an Advertiser:</strong> After creating a standard user account, you can request the "advertiser" role from a VSD Network admin.</li>
                <li><strong>Access the Advertiser Dashboard:</strong> Once approved, you gain access to a special "Advertiser Dashboard" where you can see real-time performance of your campaigns, including total clicks.</li>
                <li><strong>Fund Your Account:</strong> To run campaigns, you must have "Ad Credits". This is a prepaid balance that is funded by purchasing credits with VSD tokens.</li>
                <li><strong>Launch Campaigns:</strong> A VSD admin will create your campaigns (e.g., a video to watch or a link to click) on your behalf. The total reward payout for the campaign is debited from your Ad Credit balance. When users engage with your ad, they are paid VSD Lite tokens from this budget.</li>
            </ol>
        </Section>

        <Section icon={Cpu} title="The Independent Media Group (IMG) Ecosystem">
            <p>The VSD Network serves as the central bank for a wide range of companies. Here is a list of our subsidiaries and partners:</p>
            <div className="space-y-4 mt-4">
                
                <h4 className="font-bold flex items-center gap-2"><Disc className="text-primary"/>Music Management & Distribution</h4>
                <ul>
                    <li><strong>VNDR Music Distribution:</strong> A platform for distributing music to streaming services and managing music publishing.</li>
                    <li><strong>SoundKlix:</strong> A music streaming platform focused on independent artists.</li>
                </ul>

                <h4 className="font-bold flex items-center gap-2"><PiggyBank className="text-primary"/>Financial & Monetization Platforms</h4>
                <ul>
                    <li><strong>Audio.Exchange:</strong> A marketplace where songs are treated like digital collectibles, creating new ways for artists to make money.</li>
                    <li><strong>Indie Videos TV:</strong> A 24/7 TV channel that only shows independent music videos and pays artists when their videos are played.</li>
                    <li><strong>ND 24/7 Indie Radio:</strong> A radio station dedicated to independent artists that also pays them for airplay.</li>
                </ul>

                <h4 className="font-bold flex items-center gap-2"><Briefcase className="text-primary"/>Business Development & Innovation</h4>
                <ul>
                    <li><strong>Blaque Tech:</strong> An innovation lab that helps people with great ideas build their first product (MVP) for free.</li>
                    <li><strong>Qreatv Branding Agency:</strong> An agency that helps artists develop their brand and market presence.</li>
                </ul>
                
                <h4 className="font-bold flex items-center gap-2"><GraduationCap className="text-primary"/>Education & Artist Development</h4>
                <ul>
                    <li><strong>Music Industry University:</strong> An online university with courses on the business of music in the modern world.</li>
                    <li><strong>Music Focus Group:</strong> A service that provides artists with data-driven feedback on their music from real listeners.</li>
                    <li><strong>Inner View Podcasts:</strong> A podcast network focused on indie music and artists.</li>
                </ul>

                <h4 className="font-bold flex items-center gap-2"><Group className="text-primary"/>Community & Networking</h4>
                <ul>
                    <li><strong>The INDIE ARTIST NETWORK:</strong> The main community hub with news, resources, and forums for IMG artists.</li>
                    <li><strong>ProFile Share:</strong> A platform for artists to showcase their work and securely share files like demos and press kits.</li>
                </ul>

                <h4 className="font-bold flex items-center gap-2"><BookOpen className="text-primary"/>News & Media</h4>
                <ul>
                    <li><strong>Indie Music News:</strong> An independent journalism hub focused on the indie music scene.</li>
                </ul>

                <h4 className="font-bold flex items-center gap-2"><Route className="text-primary"/>Ecosystem Infrastructure</h4>
                <ul>
                    <li><strong>Vsd.Network (This Website):</strong> The central banking and token platform that powers the entire ecosystem.</li>
                </ul>
            </div>
        </Section>
        
        <Section icon={LinkIcon} title="Website Pages Explained">
             <ul>
                <li><strong>Home:</strong> The main landing page introducing the VSD Network.</li>
                <li><strong>Network Status:</strong> A page showing the live operational status of all connected services and partner APIs.</li>
                <li><strong>VSD Token:</strong> A detailed page about the main VSD token, its features, the presale, and its economic model (tokenomics).</li>
                <li><strong>Buy Tokens:</strong> A page that simulates the process of buying VSD tokens with a credit or debit card.</li>
                <li><strong>Ecosystem:</strong> A full-screen, interactive slider showcasing all the subsidiary and partner companies in the IMG.</li>
                <li><strong>Developers:</strong> A portal for developers containing the official Whitepaper, API documentation, and guides for integrating with the VSD Network.</li>
                <li><strong>For Businesses:</strong> An informational page explaining how businesses can benefit from integrating VSD utility, including advertising.</li>
                <li><strong>FAQ:</strong> A list of frequently asked questions about the VSD Network.</li>
                <li><strong>Login / Dashboard / Advertiser Dashboard:</strong> The login page allows users to access their personal Dashboard, where they can view their token balance and transaction history. Users with the 'advertiser' role can also access a special Advertiser Dashboard to see their campaign reports.</li>
             </ul>
        </Section>
        
        <Section icon={Code} title="For Developers and Partners: Integration">
            <p>For companies in the IMG ecosystem, integrating with the VSD Network is straightforward. The process is designed to be secure and simple:</p>
            <ol>
                <li><strong>Registration:</strong> An administrator registers the partner company (called a "Tenant") in the VSD Admin Dashboard.</li>
                <li><strong>API Key Generation:</strong> A unique, secret API key is generated for the partner. This key is like a password for their application.</li>
                <li><strong>Secure Backend Calls:</strong> The partner company uses this secret API key from their own secure server (backend) to make calls to the VSD Network API. For example, they could use it to call the AI Image Generation service. The API key should never be exposed in public-facing website code.</li>
            </ol>
            <p>This "hub-and-spoke" model ensures that all interactions with the central VSD banking system are secure, authenticated, and auditable. Detailed guides are available in the Developer Portal.</p>
        </Section>
    </div>
  );
}
