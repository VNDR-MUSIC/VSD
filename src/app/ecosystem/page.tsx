
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightSquare, Network, Zap, Users, Cpu, Music, Handshake, BookOpen, UserPlus, Search, Building2, Layers, PiggyBank, Briefcase, Bot, GraduationCap, Group, Podcast, CircleUser, FileUp, Disc, Route } from "lucide-react";
import type { Metadata } from 'next';
import { AIImage } from '@/components/ai/AIImage';
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import React from "react";

export const metadata: Metadata = {
  title: 'VSD Token Ecosystem',
  description: 'Explore the diverse range of AI tools, dApps, and partner platforms integrating the VSD utility token.',
};

interface Subsidiary {
  name: string;
  description: string;
}

interface SubsidiaryCategory {
  category: string;
  id: string;
  icon: React.ElementType;
  subsidiaries: Subsidiary[];
}

const imgEcosystem: SubsidiaryCategory[] = [
    {
        category: "Music Management & Distribution",
        id: "music-management-distribution",
        icon: Disc,
        subsidiaries: [
            {
                name: "VNDR MUSIC Artist & Label Hub",
                description: "The primary hub for artists and labels to publish, stream, and manage their artist profiles within IMG."
            },
            {
                name: "Music Manager",
                description: "A Backend-as-a-Service (BaaS) component of VNDR MUSIC that allows artists to manage catalogs, distribute to major platforms (like Spotify and Apple Music), and efficiently collect royalties."
            }
        ]
    },
    {
        category: "Financial & Monetization Platforms",
        id: "financial-monetization-platforms",
        icon: PiggyBank,
        subsidiaries: [
            {
                name: "Audio Exchange (AUDEX)",
                description: "A decentralized marketplace that revolutionizes music monetization by treating songs as unique digital collectibles, empowering artists with new revenue streams and deeper fan engagement through exclusive content unlocks."
            },
            {
                name: "Indie Videos TV (IVTV)",
                description: "A 24/7 commercial-free streaming platform dedicated solely to indie music videos that pays artists for music video plays, providing a direct revenue stream for their visual content."
            },
            {
                name: "ND RADIO",
                description: "A 24/7 indie radio station that showcases independent audio artists and pays artists for plays, offering a direct revenue stream every time a track is aired."
            }
        ]
    },
    {
        category: "Business Development & Innovation",
        id: "business-development-innovation",
        icon: Briefcase,
        subsidiaries: [
            {
                name: "Blaque Tech Venture Creation",
                description: "An exclusive venture builder that transforms visionary business ideas into market-ready companies for free. It funds and builds Minimum Viable Products (MVPs), offering artists 50% equity for life if profit goals are met within 90 days, with no debt incurred if unsuccessful."
            },
            {
                name: "AI Motion Design (AiMotion Studio)",
                description: "Fuses AI with human creativity to produce stunning animations for commercials, skits, and explainers, offering a potential income stream or promotional content for artists."
            }
        ]
    },
    {
        category: "Education & Artist Development",
        id: "education-artist-development",
        icon: GraduationCap,
        subsidiaries: [
            {
                name: "MIU (Music Industry University)",
                description: "An educational platform offering expert-led courses on critical topics for today's artist, including AI tools, marketing, VSD, and understanding the new music economy, providing results-driven business training."
            },
            {
                name: "Music Focus Group (MFG)",
                description: "Provides structured, data-driven feedback on music from real listeners, powered by advanced AI, to help artists refine their tracks before release."
            },
            {
                name: "Forward Always Official Podcast",
                description: "The official podcast of IMG Hub, featuring inspirational conversations about moving forward in music, tech, and life, exploring stories of creators and innovators."
            }
        ]
    },
    {
        category: "Community & Networking",
        id: "community-networking",
        icon: Group,
        subsidiaries: [
            {
                name: "Indie Artist Network Community Hub",
                description: "The heart of the community, offering news, resources, and forums specifically for IMG artists, serving as a private, collaborative space."
            },
            {
                name: "IMG Social Social Platform",
                description: "Allows users to connect, share updates, and interact with the broader IMG community."
            },
            {
                name: "Pro Files Professional Networking",
                description: "Enables artists to create a professional industry profile for secure file sharing of demos, press kits, and professional connections with collaborators, labels, and media contacts."
            }
        ]
    },
    {
        category: "Music Discovery",
        id: "music-discovery",
        icon: Search,
        subsidiaries: [
            {
                name: "SoundKlix Streaming Platform",
                description: "IMG's proprietary streaming platform designed specifically for music discovery, built to connect independent artists with a dedicated audience of music lovers."
            }
        ]
    },
    {
        category: "Ecosystem Infrastructure",
        id: "ecosystem-infrastructure",
        icon: Route,
        subsidiaries: [
            {
                name: "Vsd.Network (Ecosystem Currency/Network)",
                description: "A decentralized ecosystem of AI tools and services powered by the VSD Token. It is the network through which instant royalty payouts are made and where the next generation of AI services are fueled."
            }
        ]
    }
];

export default function EcosystemPage() {
  return (
    <div className="space-y-12 py-8">
        <header className="text-center">
            <Network className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">The IMG Ecosystem</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover the self-sustaining, vertically integrated ecosystem of specialized platforms that form the Independent Music Group (IMG) Hub, all powered by VSD.
            </p>
        </header>

        <AIImage
            initialSrc="https://placehold.co/800x400.png"
            alt="The interconnected IMG Hub"
            width={800}
            height={400}
            className="rounded-md my-8 shadow-md mx-auto"
            hint="interconnected business ecosystem"
        />

        {imgEcosystem.map((category) => (
            <section key={category.category} id={category.id}>
                <Separator className="my-12" />
                <div className="flex items-center gap-4 mb-8 justify-center">
                    <category.icon className="h-8 w-8 text-primary" />
                    <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">{category.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {category.subsidiaries.map((subsidiary) => (
                        <Card key={subsidiary.name} className="flex flex-col shadow-lg bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl sm:text-2xl">{subsidiary.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm sm:text-base">{subsidiary.description}</p>
                            </CardContent>
                             <CardFooter>
                                <Button variant="outline" className="w-full" disabled>
                                    Coming Soon
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        ))}

       <Separator />

      <section>
          <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center mb-8">Ecosystem Demonstrations</h2>
          <div className="max-w-md mx-auto">
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <Music className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                        <CardTitle className="font-headline text-xl sm:text-2xl">Audio Exchange Demo</CardTitle>
                    </div>
                    <CardDescription>
                        See how a partner project can leverage the VSD Bank APIs for payments, contracts, and AI services.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                     <Button asChild className="w-full">
                        <Link href="/audio-exchange">
                            Launch Demo <ArrowUpRightSquare className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
             </Card>
          </div>
      </section>

       <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-4">Interested in building on VSD or integrating VSD utility?</p>
            <Button asChild size="lg">
                <Link href="/developers">
                    Visit Developer Portal <Cpu className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
    </div>
  );
}

  