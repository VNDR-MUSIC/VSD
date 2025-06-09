/* eslint-disable @next/next/no-css-tags */
"use client";
import type { Metadata } from 'next';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIImage } from "@/components/ai/AIImage";

// Correct way to set metadata for App Router pages
export const metadata: Metadata = {
  title: 'VSD Token | Official Utility Token of IMG Network',
  description: 'Unlock services, receive royalties, and participate in the future of the independent music ecosystem with VSD, the ERC20 token that connects it all.',
};

export default function VsdTokenInfoPage() {
  // AI Calling Bot script using next/script - kept for now
  // <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" integrity="sha512-yFjWTYkSz0D7KbjwWslD9s3Fssf3S3DqJNSL7XvG8p0nCrcsT/kM2ErHkLInL/L7rTfC+9J+tA81pM4/dYj2jQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" strategy="lazyOnload" />
  // Custom animations removed

  return (
    <>
      {/* AI Calling Bot script using next/script */}
      <Script src="https://backend.aicallings.com/assets/clone_bot.js?id=13711" id="calling_bot" strategy="lazyOnload" />

      {/* Removed custom animation style tag */}

      <div className="text-foreground">
        <main className="space-y-16 md:space-y-24">
          <section id="hero"
            className="relative min-h-[80vh] flex items-center justify-center text-center px-4 py-16 overflow-hidden">
            {/* Removed Font Awesome icon elements that created the background effect */}
            <div className="z-10 relative max-w-4xl mx-auto">
              <AIImage
                initialSrc="https://indiemedia.llc/vsdlogo.jpg"
                alt="VSD Token Logo"
                width={160}
                height={160}
                className="h-28 w-28 md:h-40 md:w-40 mx-auto mb-6 rounded-full shadow-lg" /* Removed animation class */
                hint="abstract V logo"
                priority
              />
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline mb-6 leading-tight text-foreground" /* Removed animation class */
                >
                VSD Token
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary mb-10" /* Removed animation class */
                >
                The Official Utility Token Fueling the IMG Network
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto" /* Removed animation class */
                >
                Unlock services, receive royalties, and participate in the future of the independent music
                ecosystem with VSD, the ERC20 token that connects it all.
              </p>
              <div /* Removed animation class */
              >
                <Button asChild size="lg" className="btn-hover-effect">
                  <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer">
                    Acquire VSD Tokens
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section id="purpose" className="py-16 md:py-20 bg-card/50 rounded-lg">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="text-center md:text-left"> {/* Removed animation class */}
                  <div className="inline-block p-4 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary">
                    {/* Placeholder for icon if needed, or remove div entirely */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> {/* Example simple SVG plug icon */}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground mb-6">What is VSD? The
                    <span className="text-primary"> Connector</span>.
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Think of VSD as the universal key and currency for the Independent Music Group (IMG)
                    Network. It&apos;s an ERC20 token built on a reliable blockchain, designed specifically to
                    simplify how artists interact with our ecosystem.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Instead of multiple payment methods or complex royalty systems, VSD provides a single,
                    transparent way to access powerful tools and receive your earnings, empowering you to
                    focus on your music.
                  </p>
                </div>
                <div > {/* Removed animation class */}
                   <AIImage
                     initialSrc="https://placehold.co/600x400.png"
                     alt="Abstract network graphic"
                     width={600}
                     height={400}
                     className="rounded-lg shadow-xl border-2 border-border mx-auto"
                     hint="network diagram"
                   />
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-block p-4 mb-4 bg-accent/10 border border-accent/20 rounded-full text-accent">
                  {/* Placeholder for icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> {/* Example simple SVG info icon */}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground">Token
                  Details</h2> {/* Removed animation class */}
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" > {/* Removed animation class */}
                  Key information about the VSD utility token based on its Etherscan data.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-card/50 rounded-lg border border-border" > {/* Removed animation class */}
                {[
                  { label: "Token Name", value: "VSDuck (VSD)" },
                  { label: "Symbol", value: "VSD" },
                  { label: "Contract Address", value: "0xa37cdc5c...e59ab243", href: "https://etherscan.io/token/0xa37cdc5ce42333a4f57776a4cd93f434e59ab243" },
                  { label: "Decimals", value: "18" },
                  { label: "Token Standard", value: "ERC20" },
                  { label: "Total Supply", value: "1,000,000,000 VSD" },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-background/70 rounded-md shadow">
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-foreground break-all">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="ecosystem" className="py-16 md:py-20 bg-card/50 rounded-lg">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-block p-4 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary">
                  {/* Placeholder for icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s-8 4.5-8 9c0 5.5 8 9.5 8 9.5s8-4 8-9.5c0-4.5-8-9-8-9z"></path><circle cx="12" cy="12" r="3"></circle></svg> {/* Example simple SVG project diagram icon */}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground">VSD Across
                  the IMG Ecosystem</h2> {/* Removed animation class */}
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto" > {/* Removed animation class */}
                  VSD is the integrated currency for accessing services and receiving value throughout the
                  network. Here&apos;s how it works:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "AI MUSIC", service: "Service Payment", desc: "Pay for AI music generation credits and premium features using VSD tokens.", link: "https://indiemedia.llc/aimusic.html" },
                  { title: "IMG DISTRIBUTION", service: "Service Payment", desc: "Pay for global music distribution packages with VSD and keep 100% of your royalties.", link: "https://indiemedia.llc/distribution.html" },
                  { title: "VNDR / SoundKlix", service: "Royalty Payouts", desc: "Receive streaming royalties directly in VSD tokens via the VSD.Network platform.", link: "https://vndrmusic.com" },
                  { title: "Promo Hub", service: "Service Payment", desc: "Purchase promotional airtime on ND Radio and the Official Podcast using VSD.", link: "https://indiemedia.llc/promo.html" },
                  { title: "Cover Art Maker", service: "Service Payment", desc: "Pay for generating unique AI cover art with VSD tokens.", link: "https://indiemedia.llc/artwork.html" },
                  { title: "Focus Group", service: "Service Payment", desc: "Pay for valuable pre-release audience feedback reports using VSD.", link: "https://indiemedia.llc/focusgroup.html" },
                  { title: "MIU Courses", service: "Potential Future Use", desc: "Future plans may include paying for premium Music Industry University courses with VSD.", link: "https://indiemedia.llc/university.html" },
                  { title: "Future Utility", service: "Staking, Governance", desc: "Roadmap includes potential for VSD staking rewards and governance voting rights within the IMG Network.", link: null },
                ].map(item => (
                  <Card key={item.title} className="bg-background/70 shadow-lg flex flex-col" > {/* Removed animation class */}
                    <CardHeader>
                      <CardTitle className="font-headline text-xl text-foreground">{item.title}</CardTitle>
                      <CardDescription className="text-xs text-primary uppercase tracking-wider">{item.service}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                    {item.link && (
                      <CardContent>
                         <Button asChild variant="outline" size="sm">
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs">Visit {item.title.split(" ")[0]} &rarr;</a>
                         </Button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="roadmap" className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-block p-4 mb-4 bg-accent/10 border border-accent/20 rounded-full text-accent">
                   {/* Placeholder for icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4"></path><path d="M5 12l7-7 7 7"></path></svg> {/* Example simple SVG route icon */}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground">VSD Roadmap:
                  The Path Ahead</h2> {/* Removed animation class */}
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" > {/* Removed animation class */}
                  Our vision for VSD extends beyond current utility, aiming for deeper integration and value.
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-8">
                {[
                  { date: "Phase 1 (Completed)", title: "Token Launch & Initial Integration", desc: "VSD ERC20 token deployed. Integrated for payments in AI Music, Distribution, Art Maker, Promo Hub, Focus Group." },
                  { date: "Phase 2 (Completed)", title: "Royalty Payout System", desc: "VSD.Network launched for seamless VSD royalty payouts from VNDR Music & SoundKlix streams." },
                  { date: "Phase 3 (In Progress - Q3 2025)", title: "Expanded Utility & Partnerships", desc: "Exploring VSD use for MIU courses, exclusive content access, and potential partnerships outside IMG." },
                  { date: "Phase 4 (Planned - 2026)", title: "Staking & Rewards", desc: "Development of VSD staking mechanisms to reward long-term holders and network participants." },
                  { date: "Phase 5 (Future Vision - 2027+)", title: "Decentralized Governance", desc: "Implementing on-chain governance features allowing VSD holders to vote on network proposals and future directions." }
                ].map((item, index) => (
                  <div key={item.title} className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border" > {/* Removed animation class */}
                    <div className="mt-1 flex-shrink-0 h-3 w-3 rounded-full bg-primary ring-2 ring-primary/30"></div>
                    <div className="flex-grow">
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <h4 className="text-lg font-semibold text-foreground mt-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="growth" className="py-16 md:py-20 bg-card/50 rounded-lg">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-block p-4 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary">
                   {/* Placeholder for icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg> {/* Example simple SVG chart line icon */}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground">Illustrative
                  Growth Potential</h2> {/* Removed animation class */}
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto" > {/* Removed animation class */}
                  The utility and potential value of VSD are intrinsically linked to the growth and activity
                  within the entire IMG Network. More artists, more services used, more royalties paid =
                  greater potential demand and utility.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 md:gap-16 items-start">
                <div className="p-4 bg-background/70 rounded-lg border border-border shadow-md text-center" > {/* Removed animation class */}
                  <h3 className="font-headline text-xl text-foreground mb-4">Growth Projections</h3>
                   <p className="text-muted-foreground">Detailed growth and value projection charts are currently under review and will be updated soon. </p>
                   <AIImage
                     initialSrc="https://placehold.co/700x350.png"
                     alt="Placeholder for growth chart"
                     width={700}
                     height={350}
                     className="rounded-md my-6 shadow-md mx-auto"
                     hint="financial graph placeholder"
                   />
                </div>
              </div>

              <div className="mt-12" > {/* Removed animation class */}
                <h3 className="font-headline text-2xl text-foreground mb-4 text-center">Logic Behind the Potential</h3>
                <div
                  className="max-w-3xl mx-auto text-sm text-muted-foreground space-y-3 text-left bg-background/70 p-6 rounded-lg border border-border">
                  <p><strong className="text-foreground">Increased Service Usage:</strong> As more artists join IMG and
                    utilize services like AI Music, Distribution, Promo Hub, etc., the demand for VSD as a
                    payment method inherently increases.</p>
                  <p><strong className="text-foreground">Royalty Volume:</strong> Growth in streaming activity on VNDR
                    and SoundKlix leads to larger volumes of royalties being paid out in VSD, increasing its
                    circulation and utility.</p>
                  <p><strong className="text-foreground">Network Effect:</strong> A larger, more active user base
                    across all subsidiaries creates a stronger network effect, potentially increasing the
                    perceived value and utility of the token that connects them.</p>
                  <p><strong className="text-foreground">Future Utility (Roadmap):</strong> Planned features like
                    staking and governance could introduce new demand drivers and value propositions for
                    holding VSD.</p>
                </div>
              </div>

              <div className="mt-12 max-w-4xl mx-auto" > {/* Removed animation class */}
                <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive-foreground">
                  <strong className="block mb-2 text-destructive">IMPORTANT DISCLAIMER: Not Financial Advice</strong>
                  The information presented in this section regarding potential growth and value
                  are purely hypothetical, illustrative examples based on internal assumptions and goals for
                  the IMG Network&apos;s expansion and VSD adoption. They DO NOT represent actual market
                  predictions, guarantees of future value, or financial advice. The value of VSD tokens, like
                  any cryptocurrency, is subject to significant market volatility, regulatory changes,
                  technological risks, and other factors beyond IMG&apos;s control. Past performance is not
                  indicative of future results. Do your own research (DYOR) and consult with a qualified
                  financial advisor before making any decisions regarding VSD tokens. Investment in
                  cryptocurrencies involves substantial risk of loss.
                </div>
              </div>
            </div>
          </section>

          <section id="get-vsd" className="py-16 md:py-20 text-center">
            <div className="container mx-auto px-4 sm:px-6">
              <div > {/* Removed animation class */}
                <AIImage
                    initialSrc="https://indiemedia.llc/vsdlogo.jpg"
                    alt="VSD Token Logo"
                    width={80}
                    height={80}
                    className="h-20 w-20 mx-auto mb-5 rounded-full shadow-lg" /* Removed animation class */
                    hint="V logo"
                />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground mb-6">Get VSD & Power Your
                  Journey</h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Acquire VSD tokens to start utilizing the full suite of IMG Network services and prepare for
                  future ecosystem benefits.
                </p>
                <Button asChild size="lg" className="btn-hover-effect text-lg">
                    <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer">
                    Purchase VSD Tokens Now
                    </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
