
/* eslint-disable @next/next/no-css-tags */
"use client";
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming you might want to use ShadCN cards

// Note: Font Awesome is still loaded via CDN script for this page's icons.
// Ideally, these would be replaced with lucide-react icons for consistency if available.

export default function VsdTokenInfoPage() {
  const adoptionChartRef = useRef<HTMLCanvasElement>(null);
  const valueChartRef = useRef<HTMLCanvasElement>(null);
  const chartsRendered = useRef(false);

  useEffect(() => {
    document.title = 'VSD Token | The Official Utility Token of the IMG Network';

    const observedElements = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !observedElements.get(entry.target)) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
          observedElements.set(entry.target, true);
        }
      });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-fadeIn');
    elementsToAnimate.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-5', 'transform', 'transition-all', 'duration-700', 'ease-out');
      observedElements.set(el, false);
      observer.observe(el);
    });

    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []);


  const initializeCharts = () => {
    if (chartsRendered.current || typeof window === 'undefined' || !(window as any).Chart) return;

    const Chart = (window as any).Chart;
    // Colors from VSD Network theme (dark mode)
    const primaryColor = 'hsl(346, 100%, 40.8%)'; // VSD Red (primary)
    const accentColor = 'hsl(0, 0%, 50.2%)';    // Medium Gray (accent)
    const chart1Color = 'hsl(220, 70%, 50%)';   // --chart-1
    const chart2Color = 'hsl(160, 60%, 45%)';   // --chart-2
    const textColor = 'hsl(0, 0%, 98%)';       // foreground
    const gridColor = 'hsla(0, 0%, 20%, 0.3)'; // border, semi-transparent

    const adoptionLabels = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
    const adoptionData = [500, 2500, 7000, 15000, 30000, 50000, 80000, 120000, 170000, 230000, 300000, 400000];

    if (adoptionChartRef.current) {
      const adoptionCtx = adoptionChartRef.current.getContext('2d');
      if (adoptionCtx) {
        new Chart(adoptionCtx, {
          type: 'bar',
          data: {
            labels: adoptionLabels,
            datasets: [{
              label: 'Hypothetical Active Network Users',
              data: adoptionData,
              backgroundColor: chart1Color, // Use chart-1 color
              borderColor: chart1Color,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, ticks: { color: textColor, stepSize: 100000 }, grid: { color: gridColor } },
              x: { ticks: { color: textColor }, grid: { display: false } }
            },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (context: any) => ` Users: ${context.parsed.y.toLocaleString()}` } }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
          }
        });
      }
    }

    const valueData = [
      { x: '2024-01-01', y: 0.05 }, { x: '2025-01-01', y: 0.12 }, { x: '2026-01-01', y: 0.25 },
      { x: '2027-01-01', y: 0.40 }, { x: '2028-01-01', y: 0.65 }, { x: '2029-01-01', y: 0.90 },
      { x: '2030-01-01', y: 1.20 }, { x: '2031-01-01', y: 1.60 }, { x: '2032-01-01', y: 2.10 },
      { x: '2033-01-01', y: 2.70 }, { x: '2034-01-01', y: 3.40 }, { x: '2035-01-01', y: 4.20 }
    ];

    if (valueChartRef.current) {
      const valueCtx = valueChartRef.current.getContext('2d');
      if (valueCtx) {
        new Chart(valueCtx, {
          type: 'line',
          data: {
            datasets: [{
              label: 'Hypothetical VSD Value (USD)',
              data: valueData,
              borderColor: chart2Color, // Use chart-2 color
              backgroundColor: chart2Color + '66', // Add some transparency
              tension: 0.3,
              fill: true,
              pointBackgroundColor: chart2Color,
              pointRadius: 3,
              pointHoverRadius: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { type: 'time', time: { unit: 'year' }, ticks: { color: textColor, source: 'auto' }, grid: { color: gridColor } },
              y: { beginAtZero: true, ticks: { color: textColor, callback: (value: any) => '$' + Number(value).toFixed(2) }, grid: { color: gridColor } }
            },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (context: any) => ` Value: $${context.parsed.y.toFixed(2)}` } }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
          }
        });
      }
    }
    chartsRendered.current = true;
  };

  // CSS for animations that are harder to do purely with Tailwind or for specificity
  const customAnimationStyle = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 15px 5px hsl(var(--primary) / 0.5); }
      50% { box-shadow: 0 0 30px 10px hsl(var(--primary) / 0.7); }
    }
    .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }
  `;

  return (
    <>
      <Head>
        {/* Font Awesome script is critical for icons on this page */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" integrity="sha512-yFjWTYkSz0D7KbjwWslD9s3Fssf3S3DqJNSL7XvG8p0nCrcsT/kM2ErHkLInL/L7rTfC+9J+tA81pM4/dYj2jQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" strategy="lazyOnload" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js" strategy="lazyOnload" onReady={initializeCharts} />
      <Script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0/dist/chartjs-adapter-date-fns.bundle.min.js" strategy="lazyOnload" onReady={initializeCharts} />
      <Script src="https://backend.aicallings.com/assets/clone_bot.js?id=13711" id="calling_bot" strategy="lazyOnload" />
      
      <style jsx global>{customAnimationStyle}</style>

      <div className="text-foreground font-body"> {/* Apply base font and color */}
        <main className="space-y-16 md:space-y-24">
          <section id="hero"
            className="relative min-h-[80vh] flex items-center justify-center text-center px-4 py-16 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              {/* These icons use Font Awesome, loaded by script */}
              <i className="fas fa-coins absolute text-primary text-[15vw] animate-float" style={{ top: '15%', left: '10%', animationDuration: '7s' }}></i>
              <i className="fas fa-network-wired absolute text-accent text-[12vw] animate-float" style={{ top: '60%', right: '15%', animationDuration: '8s', animationDelay: '1s' }}></i>
              <i className="fas fa-rocket absolute text-foreground text-[10vw] animate-float" style={{ bottom: '20%', left: '30%', animationDuration: '6s', animationDelay: '0.5s' }}></i>
            </div>

            <div className="z-10 relative max-w-4xl mx-auto">
              <Image src="https://indiemedia.llc/vsdlogo.jpg" alt="VSD Token Logo" width={160} height={160} className="h-28 w-28 md:h-40 md:w-40 mx-auto mb-6 rounded-full shadow-lg animate-pulse-glow animate-fadeIn" data-ai-hint="logo abstract" />
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline mb-6 leading-tight text-foreground animate-fadeIn"
                style={{ animationDelay: '0.2s' }}>
                VSD Token
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary mb-10 animate-fadeIn" // Changed to text-primary
                style={{ animationDelay: '0.4s' }}>
                The Official Utility Token Fueling the IMG Network
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fadeIn"
                style={{ animationDelay: '0.6s' }}>
                Unlock services, receive royalties, and participate in the future of the independent music
                ecosystem with VSD, the ERC20 token that connects it all.
              </p>
              <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
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
                <div className="animate-fadeIn text-center md:text-left">
                  <div className="inline-block p-4 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary">
                    <i className="fas fa-plug text-3xl"></i>
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
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                   <Image src="https://placehold.co/600x400.png" alt="Abstract network graphic" width={600} height={400} className="rounded-lg shadow-xl border-2 border-border mx-auto" data-ai-hint="network diagram"/>
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-block p-4 mb-4 bg-accent/10 border border-accent/20 rounded-full text-accent">
                  <i className="fas fa-info-circle text-3xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground animate-fadeIn">Token
                  Details</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  Key information about the VSD utility token based on its Etherscan data.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn p-6 bg-card/50 rounded-lg border border-border" style={{ animationDelay: '0.2s' }}>
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
                   <i className="fas fa-project-diagram text-3xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground animate-fadeIn">VSD Across
                  the IMG Ecosystem</h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  VSD is the integrated currency for accessing services and receiving value throughout the
                  network. Here&apos;s how it works:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "AI MUSIC", service: "Service Payment", desc: "Pay for AI music generation credits and premium features using VSD tokens.", link: "https://indiemedia.llc/aimusic.html", delay: "0.2s" },
                  { title: "IMG DISTRIBUTION", service: "Service Payment", desc: "Pay for global music distribution packages with VSD and keep 100% of your royalties.", link: "https://indiemedia.llc/distribution.html", delay: "0.25s" },
                  { title: "VNDR / SoundKlix", service: "Royalty Payouts", desc: "Receive streaming royalties directly in VSD tokens via the VSD.Network platform.", link: "https://vndrmusic.com", delay: "0.3s" },
                  { title: "Promo Hub", service: "Service Payment", desc: "Purchase promotional airtime on ND Radio and the Official Podcast using VSD.", link: "https://indiemedia.llc/promo.html", delay: "0.35s" },
                  { title: "Cover Art Maker", service: "Service Payment", desc: "Pay for generating unique AI cover art with VSD tokens.", link: "https://indiemedia.llc/artwork.html", delay: "0.4s" },
                  { title: "Focus Group", service: "Service Payment", desc: "Pay for valuable pre-release audience feedback reports using VSD.", link: "https://indiemedia.llc/focusgroup.html", delay: "0.45s" },
                  { title: "MIU Courses", service: "Potential Future Use", desc: "Future plans may include paying for premium Music Industry University courses with VSD.", link: "https://indiemedia.llc/university.html", delay: "0.5s" },
                  { title: "Future Utility", service: "Staking, Governance", desc: "Roadmap includes potential for VSD staking rewards and governance voting rights within the IMG Network.", link: null, delay: "0.55s" },
                ].map(item => (
                  <Card key={item.title} className="animate-fadeIn bg-background/70 shadow-lg flex flex-col" style={{ animationDelay: item.delay }}>
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
                    <i className="fas fa-route text-3xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground animate-fadeIn">VSD Roadmap:
                  The Path Ahead</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  Our vision for VSD extends beyond current utility, aiming for deeper integration and value.
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-8">
                {[
                  { date: "Phase 1 (Completed)", title: "Token Launch & Initial Integration", desc: "VSD ERC20 token deployed. Integrated for payments in AI Music, Distribution, Art Maker, Promo Hub, Focus Group.", delay: "0.2s" },
                  { date: "Phase 2 (Completed)", title: "Royalty Payout System", desc: "VSD.Network launched for seamless VSD royalty payouts from VNDR Music & SoundKlix streams.", delay: "0.3s" },
                  { date: "Phase 3 (In Progress - Q3 2025)", title: "Expanded Utility & Partnerships", desc: "Exploring VSD use for MIU courses, exclusive content access, and potential partnerships outside IMG.", delay: "0.4s" },
                  { date: "Phase 4 (Planned - 2026)", title: "Staking & Rewards", desc: "Development of VSD staking mechanisms to reward long-term holders and network participants.", delay: "0.5s" },
                  { date: "Phase 5 (Future Vision - 2027+)", title: "Decentralized Governance", desc: "Implementing on-chain governance features allowing VSD holders to vote on network proposals and future directions.", delay: "0.6s" }
                ].map((item, index) => (
                  <div key={item.title} className="animate-fadeIn flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border" style={{ animationDelay: item.delay }}>
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
                    <i className="fas fa-chart-line text-3xl"></i>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline text-foreground animate-fadeIn">Illustrative
                  Growth Potential</h2>
                <p className="text-muted-foreground mt-4 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  The utility and potential value of VSD are intrinsically linked to the growth and activity
                  within the entire IMG Network. More artists, more services used, more royalties paid =
                  greater potential demand and utility.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="animate-fadeIn p-4 bg-background/70 rounded-lg border border-border shadow-md" style={{ animationDelay: '0.2s' }}>
                  <h3 className="font-headline text-xl text-foreground mb-4 text-center">Hypothetical Network Adoption
                    Growth</h3>
                  <div className="h-64 md:h-80"><canvas id="adoptionChart" ref={adoptionChartRef}></canvas></div>
                  <p className="text-xs text-center text-muted-foreground mt-2">Illustrative projection of active
                    users/artists</p>
                </div>
                <div className="animate-fadeIn p-4 bg-background/70 rounded-lg border border-border shadow-md" style={{ animationDelay: '0.3s' }}>
                  <h3 className="font-headline text-xl text-foreground mb-4 text-center">Hypothetical VSD Value
                    Projection</h3>
                  <div className="h-64 md:h-80"><canvas id="valueChart" ref={valueChartRef}></canvas></div>
                  <p className="text-xs text-center text-muted-foreground mt-2">Illustrative projection based on network
                    factors</p>
                </div>
              </div>

              <div className="mt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
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

              <div className="mt-12 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive-foreground">
                  <strong className="block mb-2 text-destructive">IMPORTANT DISCLAIMER: Not Financial Advice</strong>
                  The charts and information presented in this section regarding potential growth and value
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
              <div className="animate-fadeIn">
                <Image src="https://indiemedia.llc/vsdlogo.jpg" alt="VSD Token Logo" width={80} height={80} className="h-20 w-20 mx-auto mb-5 rounded-full shadow-lg animate-pulse-glow" data-ai-hint="logo abstract"/>
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

