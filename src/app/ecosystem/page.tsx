
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightSquare, Network, Zap, Users, Cpu, Music, Handshake, BookOpen, UserPlus, Search, Building2, Layers, PiggyBank, Briefcase, Bot, GraduationCap, Group, Podcast, CircleUser, FileUp, Disc, Route } from "lucide-react";
import type { Metadata } from 'next';
import { AIImage } from '@/components/ai/AIImage';
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: 'VSD Token Ecosystem | The IMG Hub',
  description: 'Explore the diverse range of AI tools, dApps, and partner platforms integrating the VSD utility token within the Independent Music Group (IMG) ecosystem.',
};

interface Subsidiary {
  name: string;
  description: string;
  link: string;
  logoUrl?: string;
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
                name: "VNDR Music Distribution",
                description: "Music Distribution and music publishing platform.",
                link: "https://VNDRmusic.com"
            },
            {
                name: "SoundKlix",
                description: "Music streaming platform for indie artists.",
                link: "https://SoundKlix.com",
                logoUrl: "https://i.ibb.co/M53tfW4/6afe7afc-3816-4f85-a250-50819e0f1b00.png"
            }
        ]
    },
    {
        category: "Financial & Monetization Platforms",
        id: "financial-monetization-platforms",
        icon: PiggyBank,
        subsidiaries: [
            {
                name: "Audio.Exchange",
                description: "A decentralized marketplace that revolutionizes music monetization by treating songs as unique digital collectibles.",
                link: "https://Audio.Exchange"
            },
            {
                name: "Indie Videos TV",
                description: "A 24/7 indie-only music video platform that pays artists for music video plays.",
                link: "https://IndieVideos.TV",
                logoUrl: "https://i.ibb.co/0RzJsCss/image.png"
            },
            {
                name: "ND 24/7 Indie Radio",
                description: "An all-indie radio station that showcases independent audio artists and pays for plays.",
                link: "#", // Link placeholder
            }
        ]
    },
    {
        category: "Business Development & Innovation",
        id: "business-development-innovation",
        icon: Briefcase,
        subsidiaries: [
            {
                name: "Blaque Tech",
                description: "Technology and Innovation Labs that helps create and build MVPs for idea makers for free.",
                link: "https://blaque.tech",
                logoUrl: "https://i.ibb.co/r2QMqgJG/Blaque-Tech.png"
            },
             {
                name: "Qreatv Branding Agency",
                description: "Artist development and branding to help creators build a powerful market presence.",
                link: "https://Qreatv.Agency"
            }
        ]
    },
    {
        category: "Education & Artist Development",
        id: "education-artist-development",
        icon: GraduationCap,
        subsidiaries: [
            {
                name: "Music Industry University",
                description: "An educational platform offering expert-led courses on the new music economy.",
                link: "https://musicindustry.university",
                logoUrl: "https://i.ibb.co/sJV522gj/miu-logo.png"
            },
            {
                name: "Music Focus Group",
                description: "Provides structured, data-driven feedback on music from real listeners to help artists refine their tracks.",
                link: "https://musicfocus.group",
                logoUrl: "https://i.ibb.co/tPDWyjWd/Screenshot-2025-07-25-at-10-01-10-AM.png"
            },
             {
                name: "Inner View Podcasts",
                description: "Podcasts dedicated to indie music and recording artists.",
                link: "#"
            }
        ]
    },
    {
        category: "Community & Networking",
        id: "community-networking",
        icon: Group,
        subsidiaries: [
            {
                name: "The INDIE ARTIST NETWORK",
                description: "The heart of the community, offering news, resources, and forums specifically for IMG artists.",
                link: "https://IndieArtist.Network",
                logoUrl: "https://i.ibb.co/TxdMLzg6/Screenshot-2025-07-27-at-11-09-18-AM.png"
            },
            {
                name: "ProFile Share",
                description: "A profile showcasing platform for secure file sharing of demos and press kits.",
                link: "https://Share.VNDRmusic.com"
            }
        ]
    },
    {
        category: "News & Media",
        id: "news-media",
        icon: BookOpen,
        subsidiaries: [
             {
                name: "Indie Music News",
                description: "An independent journalism hub focused on the indie music scene.",
                link: "#"
            }
        ]
    },
    {
        category: "Ecosystem Infrastructure",
        id: "ecosystem-infrastructure",
        icon: Route,
        subsidiaries: [
            {
                name: "Vsd.Network",
                description: "The IMG banking platform and token distribution network, fueling the entire ecosystem.",
                link: "https://Vsd.Network"
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
                Discover a self-sustaining ecosystem of specialized platforms that provide access to services often gate-kept from independent creators, all powered by VSD.
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
            <section key={category.id} id={category.id}>
                <Separator className="my-12" />
                <div className="flex items-center gap-4 mb-8 justify-center">
                    <category.icon className="h-8 w-8 text-primary" />
                    <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-center">{category.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {category.subsidiaries.map((subsidiary) => (
                        <Card key={subsidiary.name} className="flex flex-col shadow-lg bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                {subsidiary.logoUrl && (
                                    <div className="relative h-16 w-full mb-4">
                                        <Image
                                            src={subsidiary.logoUrl}
                                            alt={`${subsidiary.name} Logo`}
                                            layout="fill"
                                            objectFit="contain"
                                            className="brightness-0 invert"
                                        />
                                    </div>
                                )}
                                <CardTitle className="font-headline text-xl sm:text-2xl">{subsidiary.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm sm:text-base">{subsidiary.description}</p>
                            </CardContent>
                             <CardFooter>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={subsidiary.link} target="_blank" rel="noopener noreferrer">
                                        Visit Site <ArrowUpRightSquare className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        ))}

       <Separator className="my-12" />

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
