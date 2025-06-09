/* eslint-disable @next/next/no-css-tags */
"use client";
import type { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './styles.css'; // Import page-specific styles

// export const metadata: Metadata = {
//   title: 'VSD Token | The Official Utility Token of the IMG Network',
// };
// Metadata should be exported from server components or page.tsx if it's a server component.
// For client components, you typically set the title via useEffect or a helper.

export default function VsdTokenInfoPage() {
  const adoptionChartRef = useRef<HTMLCanvasElement>(null);
  const valueChartRef = useRef<HTMLCanvasElement>(null);
  const chartsRendered = useRef(false);

  useEffect(() => {
    document.title = 'VSD Token | The Official Utility Token of the IMG Network';

    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear().toString();
    }

    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
      const mobileMenuLinks = mobileMenu.querySelectorAll('a');
      menuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            mobileMenu.classList.add('hidden');
          }
        });
      });
    }

    // Intersection Observer for fade-in animations
    const observedElements = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !observedElements.get(entry.target)) {
          entry.target.classList.add('is-visible');
          observedElements.set(entry.target, true);
        }
      });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-fadeIn');
    elementsToAnimate.forEach(el => {
      observedElements.set(el, false);
      observer.observe(el);
    });

    return () => {
      // Cleanup observer
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []);


  const initializeCharts = () => {
    if (chartsRendered.current || typeof window === 'undefined' || !(window as any).Chart) return;

    const Chart = (window as any).Chart;
    const accentPrimary = '#9900ff';
    const accentSecondary = '#00ffff';
    const textColor = '#c0c0c0';
    const gridColor = 'rgba(58, 42, 80, 0.3)';

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
              backgroundColor: accentPrimary + 'aa',
              borderColor: accentPrimary,
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
              borderColor: accentSecondary,
              backgroundColor: accentSecondary + '33',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: accentSecondary,
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


  return (
    <>
      <Head>
        {/* Font Awesome already handled by Script tag below */}
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js" strategy="lazyOnload" onReady={initializeCharts} />
      <Script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@2.0.0/dist/chartjs-adapter-date-fns.bundle.min.js" strategy="lazyOnload" onReady={initializeCharts} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" integrity="sha512-yFjWTYkSz0D7KbjwWslD9s3Fssf3S3DqJNSL7XvG8p0nCrcsT/kM2ErHkLInL/L7rTfC+9J+tA81pM4/dYj2jQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" strategy="lazyOnload" />
      <Script src="https://backend.aicallings.com/assets/clone_bot.js?id=13711" id="calling_bot" strategy="lazyOnload" />

      {/* Montserrat and Roboto Mono are loaded via @next/font in RootLayout or specific components if preferred */}
      {/* If not using next/font, the <link> tags can be placed in <Head> */}

      <div className="content-wrapper-vsd-token-info"> {/* Added a wrapper class for scoping if needed */}
        <header
          className="sticky top-0 z-50 bg-gradient-to-b from-[rgba(5,2,10,0.9)] to-[rgba(5,2,10,0.7)] backdrop-blur-sm border-b border-[rgba(58,42,80,0.5)]">
          <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <div>
              <a href="#hero"
                className="text-2xl font-heading font-bold tracking-tighter text-white flex items-center">
                <Image src="https://indiemedia.llc/vsdlogo.jpg" alt="VSD Logo" width={32} height={32} className="h-8 w-8 mr-2 rounded-full" data-ai-hint="logo abstract"/> VSD Token
              </a>
            </div>
            <div className="hidden md:flex space-x-8 items-center font-mono text-xs uppercase tracking-widest">
              <a href="#purpose" className="text-gray-300 hover:text-white transition duration-300">Purpose</a>
              <a href="#details" className="text-gray-300 hover:text-white transition duration-300">Details</a>
              <a href="#ecosystem" className="text-gray-300 hover:text-white transition duration-300">Ecosystem</a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition duration-300">Roadmap</a>
              <a href="#growth" className="text-gray-300 hover:text-white transition duration-300">Potential</a>
              <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer"
                className="cta-button !text-xs !px-5 !py-2 !bg-none !border !border-accent-primary !text-accent-primary hover:!bg-accent-primary hover:!text-black">Get
                VSD</a>
            </div>
            <div className="md:hidden">
              <button id="mobile-menu-button" className="text-white focus:outline-none text-2xl">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </nav>
          <div id="mobile-menu"
            className="md:hidden hidden bg-black absolute w-full top-full left-0 border-b border-t border-gray-700 z-40">
            <a href="#purpose"
              className="block text-center text-gray-300 hover:bg-gray-900 transition duration-200 px-5 py-4 border-b border-gray-700 font-mono uppercase text-sm">Purpose</a>
            <a href="#details"
              className="block text-center text-gray-300 hover:bg-gray-900 transition duration-200 px-5 py-4 border-b border-gray-700 font-mono uppercase text-sm">Details</a>
            <a href="#ecosystem"
              className="block text-center text-gray-300 hover:bg-gray-900 transition duration-200 px-5 py-4 border-b border-gray-700 font-mono uppercase text-sm">Ecosystem</a>
            <a href="#roadmap"
              className="block text-center text-gray-300 hover:bg-gray-900 transition duration-200 px-5 py-4 border-b border-gray-700 font-mono uppercase text-sm">Roadmap</a>
            <a href="#growth"
              className="block text-center text-gray-300 hover:bg-gray-900 transition duration-200 px-5 py-4 border-b border-gray-700 font-mono uppercase text-sm">Potential</a>
            <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer"
              className="block text-center text-accent-primary hover:bg-gray-900 transition duration-200 px-5 py-4 font-mono uppercase text-sm">Get
              VSD</a>
          </div>
        </header>

        <main>
          <section id="hero"
            className="relative min-h-screen flex items-center justify-center text-center px-4 py-32 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <i className="fas fa-coins absolute text-accent-primary text-[15vw] animate-float" style={{ top: '15%', left: '10%', animationDuration: '7s' }}></i>
              <i className="fas fa-network-wired absolute text-accent-secondary text-[12vw] animate-float" style={{ top: '60%', right: '15%', animationDuration: '8s', animationDelay: '1s' }}></i>
              <i className="fas fa-rocket absolute text-white text-[10vw] animate-float" style={{ bottom: '20%', left: '30%', animationDuration: '6s', animationDelay: '0.5s' }}></i>
            </div>

            <div className="z-10 relative max-w-4xl mx-auto">
              <Image src="https://indiemedia.llc/vsdlogo.jpg" alt="VSD Token Logo" width={160} height={160} className="h-28 w-28 md:h-40 md:w-40 mx-auto mb-6 rounded-full shadow-lg animate-pulse-glow animate-fadeIn" data-ai-hint="logo abstract" />
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading-heavy mb-6 leading-tight text-white animate-fadeIn"
                style={{ animationDelay: '0.2s' }}>
                VSD Token
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-accent-secondary mb-10 animate-fadeIn"
                style={{ animationDelay: '0.4s' }}>
                The Official Utility Token Fueling the IMG Network
              </p>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fadeIn"
                style={{ animationDelay: '0.6s' }}>
                Unlock services, receive royalties, and participate in the future of the independent music
                ecosystem with VSD, the ERC20 token that connects it all.
              </p>
              <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer"
                  className="cta-button text-base">
                  Acquire VSD Tokens
                </a>
              </div>
            </div>
          </section>

          <section id="purpose" className="py-20 md:py-28 section-bg-secondary">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="animate-fadeIn text-center md:text-left">
                  <span className="icon-bg"><i className="fas fa-plug"></i></span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6">What is VSD? The
                    <span className="text-accent-secondary"> Connector</span>.
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Think of VSD as the universal key and currency for the Independent Music Group (IMG)
                    Network. It&apos;s an ERC20 token built on a reliable blockchain, designed specifically to
                    simplify how artists interact with our ecosystem.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Instead of multiple payment methods or complex royalty systems, VSD provides a single,
                    transparent way to access powerful tools and receive your earnings, empowering you to
                    focus on your music.
                  </p>
                </div>
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                   <Image src="https://placehold.co/600x400.png" alt="Abstract network graphic" width={600} height={400} className="rounded-lg shadow-xl border-2 border-border-color mx-auto" data-ai-hint="network diagram"/>
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="py-20 md:py-28 section-bg-primary">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-16 md:mb-20">
                <span className="icon-bg !bg-accent-tertiary/10 !border-accent-tertiary/20 !text-accent-tertiary"><i className="fas fa-info-circle"></i></span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white animate-fadeIn">Token
                  Details</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  Key information about the VSD utility token based on its Etherscan data.
                </p>
              </div>
              <div className="token-details-grid animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="detail-item">
                  <p className="detail-label">Token Name</p>
                  <p className="detail-value">VSDuck (VSD)</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Symbol</p>
                  <p className="detail-value">VSD</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Contract Address</p>
                  <p className="detail-value">
                    <a href="https://etherscan.io/token/0xa37cdc5ce42333a4f57776a4cd93f434e59ab243"
                      target="_blank" rel="noopener noreferrer">
                      0xa37cdc5c...e59ab243
                    </a>
                  </p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Decimals</p>
                  <p className="detail-value">18</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Token Standard</p>
                  <p className="detail-value">ERC20</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Total Supply</p>
                  <p className="detail-value">1,000,000,000 VSD</p>
                </div>
              </div>
            </div>
          </section>

          <section id="ecosystem" className="py-20 md:py-28 section-bg-secondary">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-16 md:mb-20">
                <span className="icon-bg !bg-accent-secondary/10 !border-accent-secondary/20 !text-accent-secondary"><i className="fas fa-project-diagram"></i></span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white animate-fadeIn">VSD Across
                  the IMG Ecosystem</h2>
                <p className="text-gray-400 mt-4 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  VSD is the integrated currency for accessing services and receiving value throughout the
                  network. Here&apos;s how it works:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Ecosystem cards */}
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
                  <div key={item.title} className="card animate-fadeIn" style={{ animationDelay: item.delay }}>
                    <h3 className="font-heading text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-accent-primary mb-3 font-mono uppercase tracking-wider">{item.service}</p>
                    <p className="text-sm text-text-secondary flex-grow">{item.desc}</p>
                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-secondary hover:underline mt-4 self-start">Visit {item.title.split(" ")[0]} &rarr;</a>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="roadmap" className="py-20 md:py-28 section-bg-primary">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-16 md:mb-20">
                <span className="icon-bg !bg-accent-tertiary/10 !border-accent-tertiary/20 !text-accent-tertiary"><i className="fas fa-route"></i></span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white animate-fadeIn">VSD Roadmap:
                  The Path Ahead</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  Our vision for VSD extends beyond current utility, aiming for deeper integration and value.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                {/* Roadmap Items */}
                {[
                  { date: "Phase 1 (Completed)", title: "Token Launch & Initial Integration", desc: "VSD ERC20 token deployed. Integrated for payments in AI Music, Distribution, Art Maker, Promo Hub, Focus Group.", delay: "0.2s" },
                  { date: "Phase 2 (Completed)", title: "Royalty Payout System", desc: "VSD.Network launched for seamless VSD royalty payouts from VNDR Music & SoundKlix streams.", delay: "0.3s" },
                  { date: "Phase 3 (In Progress - Q3 2025)", title: "Expanded Utility & Partnerships", desc: "Exploring VSD use for MIU courses, exclusive content access, and potential partnerships outside IMG.", delay: "0.4s" },
                  { date: "Phase 4 (Planned - 2026)", title: "Staking & Rewards", desc: "Development of VSD staking mechanisms to reward long-term holders and network participants.", delay: "0.5s" },
                  { date: "Phase 5 (Future Vision - 2027+)", title: "Decentralized Governance", desc: "Implementing on-chain governance features allowing VSD holders to vote on network proposals and future directions.", delay: "0.6s" }
                ].map(item => (
                  <div key={item.title} className="roadmap-item animate-fadeIn" style={{ animationDelay: item.delay }}>
                    <div className="roadmap-dot"></div>
                    <div className="roadmap-item-content">
                      <p className="roadmap-date">{item.date}</p>
                      <h4 className="roadmap-title">{item.title}</h4>
                      <p className="roadmap-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="growth" className="py-20 md:py-28 section-bg-secondary">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-16 md:mb-20">
                <span className="icon-bg !bg-accent-secondary/10 !border-accent-secondary/20 !text-accent-secondary"><i className="fas fa-chart-line"></i></span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white animate-fadeIn">Illustrative
                  Growth Potential</h2>
                <p className="text-gray-400 mt-4 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  The utility and potential value of VSD are intrinsically linked to the growth and activity
                  within the entire IMG Network. More artists, more services used, more royalties paid =
                  greater potential demand and utility.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="graph-container animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                  <h3 className="font-heading text-xl text-white mb-4 text-center">Hypothetical Network Adoption
                    Growth</h3>
                  <canvas id="adoptionChart" ref={adoptionChartRef}></canvas>
                  <p className="text-xs text-center text-gray-500 mt-2">Illustrative projection of active
                    users/artists</p>
                </div>
                <div className="graph-container animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  <h3 className="font-heading text-xl text-white mb-4 text-center">Hypothetical VSD Value
                    Projection</h3>
                  <canvas id="valueChart" ref={valueChartRef}></canvas>
                  <p className="text-xs text-center text-gray-500 mt-2">Illustrative projection based on network
                    factors</p>
                </div>
              </div>

              <div className="mt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-heading text-2xl text-white mb-4 text-center">Logic Behind the Potential</h3>
                <div
                  className="max-w-3xl mx-auto text-sm text-text-secondary space-y-3 text-left bg-black/20 p-6 rounded-lg border border-border-color">
                  <p><strong className="text-white">Increased Service Usage:</strong> As more artists join IMG and
                    utilize services like AI Music, Distribution, Promo Hub, etc., the demand for VSD as a
                    payment method inherently increases.</p>
                  <p><strong className="text-white">Royalty Volume:</strong> Growth in streaming activity on VNDR
                    and SoundKlix leads to larger volumes of royalties being paid out in VSD, increasing its
                    circulation and utility.</p>
                  <p><strong className="text-white">Network Effect:</strong> A larger, more active user base
                    across all subsidiaries creates a stronger network effect, potentially increasing the
                    perceived value and utility of the token that connects them.</p>
                  <p><strong className="text-white">Future Utility (Roadmap):</strong> Planned features like
                    staking and governance could introduce new demand drivers and value propositions for
                    holding VSD.</p>
                </div>
              </div>

              <div className="mt-12 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <div className="disclaimer">
                  <strong className="text-accent-tertiary block mb-2">IMPORTANT DISCLAIMER: Not Financial Advice</strong>
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

          <section id="get-vsd" className="py-20 md:py-28 section-bg-primary text-center">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="animate-fadeIn">
                <Image src="https://indiemedia.llc/vsdlogo.jpg" alt="VSD Token Logo" width={80} height={80} className="h-20 w-20 mx-auto mb-5 rounded-full shadow-lg animate-pulse-glow" data-ai-hint="logo abstract"/>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6">Get VSD & Power Your
                  Journey</h2>
                <p className="text-gray-300 mb-10 max-w-xl mx-auto">
                  Acquire VSD tokens to start utilizing the full suite of IMG Network services and prepare for
                  future ecosystem benefits.
                </p>
                <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer" className="cta-button text-lg">
                  Purchase VSD Tokens Now
                </a>
              </div>
            </div>
          </section>

        </main>

        <footer className="bg-black py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 text-center text-gray-500 text-xs">
            <div className="mb-4">
              <a href="https://img-corporate-placeholder.com" target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold font-heading text-gray-400 hover:text-white transition duration-300">Independent
                Music Group</a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-4 text-gray-400 text-[0.65rem]">
              <a href="https://vndrmusic.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">VNDR</a> |
              <a href="https://soundklix.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">SoundKlix</a> |
              <a href="https://indievideos.tv" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Indie Videos TV</a> |
              <a href="https://indieartist.network" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Indie Artist Network</a> |
              <a href="https://social.indiemusic.group" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">IMG Social</a> |
              <a href="https://indiemedia.llc/ndradio.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">ND Radio</a> |
              <a href="https://indiemedia.llc/university.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">MIU</a> |
              <a href="https://indiemedia.llc/podcast.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Podcast</a> |
              <a href="https://indiemedia.llc/promo.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Promo Hub</a> |
              <a href="https://indiemedia.llc/artwork.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Art Maker</a> |
              <a href="https://indiemedia.llc/tokenpurchase.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">VSD Tokens</a> |
              <a href="https://indiemedia.llc/focusgroup.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Focus Group</a> |
              <a href="https://indiemedia.llc/aimusic.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">AI Music</a> |
              <a href="https://indiemedia.llc/distribution.html" target="_blank" rel="noopener noreferrer"
                className="hover:text-accent-primary transition duration-200">Distribution</a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4">
              <a href="#" className="hover:text-gray-300 transition duration-200">Terms of Service</a> |
              <a href="#" className="hover:text-gray-300 transition duration-200">Privacy Policy</a> |
              <a href="https://indiemedia.llc/payment-plan" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-300 transition duration-200">Payment Plans</a> |
              <a href="mailto:support@imgmedia.llc?subject=VSD Token Inquiry"
                className="hover:text-gray-300 transition duration-200">Contact Support</a>
            </div>
            <p>&copy; <span id="current-year"></span> Independent Music Group. All Rights Reserved.</p>
            <p className="mt-2 text-gray-600">VSD Token is a utility token for the IMG Network ecosystem and is not
              intended as an investment vehicle. Token value is speculative and subject to market risks.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
