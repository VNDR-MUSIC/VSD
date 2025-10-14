
'use client';

import React from 'react';
import type { Metadata } from 'next';
import { Network, Disc, PiggyBank, Briefcase, GraduationCap, Group, BookOpen, Route, ArrowUpRightSquare, Music, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { AIImage } from '@/components/ai/AIImage';
import { SubsidiarySlider } from '@/components/ecosystem/SubsidiarySlider';


// export const metadata: Metadata = {
//   title: 'VSD Token Ecosystem | The IMG Hub',
//   description: 'Explore the diverse range of AI tools, dApps, and partner platforms integrating the VSD utility token within the Independent Media Group (IMG) ecosystem.',
// };

export interface Subsidiary {
  name: string;
  description: string;
  link: string;
  logoUrl?: string;
  hint: string;
}

export interface SubsidiaryCategory {
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
                link: "https://VNDRmusic.com",
                hint: "digital music distribution dashboard",
            },
            {
                name: "SoundKlix",
                description: "Music streaming platform for indie artists.",
                link: "https://SoundKlix.com",
                logoUrl: "https://i.ibb.co/M53tfW4/6afe7afc-3816-4f85-a250-50819e0f1b00.png",
                hint: "music streaming app interface",
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
                link: "https://Audio.Exchange",
                hint: "digital marketplace audio files",
            },
            {
                name: "Indie Videos TV",
                description: "A 24/7 indie-only music video platform that pays artists for music video plays.",
                link: "https://IndieVideos.TV",
                logoUrl: "https://i.ibb.co/0RzJsCss/image.png",
                hint: "television static screen music videos",
            },
            {
                name: "ND 24/7 Indie Radio",
                description: "An all-indie radio station that showcases independent audio artists and pays for plays.",
                link: "#",
                hint: "vintage radio broadcasting waves",
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
                logoUrl: "https://i.ibb.co/r2QMqgJG/Blaque-Tech.png",
                hint: "futuristic technology lab clean",
            },
             {
                name: "Qreatv Branding Agency",
                description: "Artist development and branding to help creators build a powerful market presence.",
                link: "https://Qreatv.Agency",
                hint: "modern branding agency office",
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
                logoUrl: "https://i.ibb.co/sJV522gj/miu-logo.png",
                hint: "university lecture hall modern",
            },
            {
                name: "Music Focus Group",
                description: "Provides structured, data-driven feedback on music from real listeners to help artists refine their tracks.",
                link: "https://musicfocus.group",
                logoUrl: "https://i.ibb.co/tPDWyjWd/Screenshot-2025-07-25-at-10-01-10-AM.png",
                hint: "people listening to music with headphones in a modern room",
            },
             {
                name: "Inner View Podcasts",
                description: "Podcasts dedicated to indie music and recording artists.",
                link: "#",
                hint: "podcast recording studio microphone",
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
                logoUrl: "https://i.ibb.co/TxdMLzg6/Screenshot-2025-07-27-at-11-09-18-AM.png",
                hint: "global network community connection",
            },
            {
                name: "ProFile Share",
                description: "A profile showcasing platform for secure file sharing of demos and press kits.",
                link: "https://Share.VNDRmusic.com",
                hint: "secure file sharing cloud interface"
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
                link: "#",
                hint: "newspaper press room vintage",
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
                link: "https://Vsd.Network",
                hint: "blockchain network visualization",
            }
        ]
    }
];

const allSubsidiaries = imgEcosystem.flatMap(category => category.subsidiaries);


export default function EcosystemPage() {
  return (
    <div className="w-full h-[calc(100vh-8rem)]">
        <SubsidiarySlider slides={allSubsidiaries} />
    </div>
  );
}
