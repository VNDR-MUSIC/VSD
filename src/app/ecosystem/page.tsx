
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightSquare, Network, Zap, Users, Cpu } from "lucide-react";
import type { Metadata } from 'next';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'VSD Token Ecosystem',
  description: 'Explore the diverse range of AI tools, dApps, and partner platforms integrating the VSD utility token.',
};

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string; 
  imageHint: string; 
  projectUrl?: string;
  category: string; // e.g., AI Tool, DeFi, Governance, Partner Platform
}

const projects: Project[] = [
  {
    id: "1",
    name: "VSD AI Suite (IMG Services)",
    description: "The flagship AI platform offering advanced image generation, content creation, and data analysis tools, powered by VSD tokens.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "AI tools dashboard",
    projectUrl: "/token#what-is-vsd", // Link to relevant section
    category: "AI Tooling Platform",
  },
  {
    id: "2",
    name: "VSD Governance DAO Portal",
    description: "The official platform for VSD token holders to propose, discuss, and vote on key decisions shaping the VSD Network's future.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "DAO governance interface",
    projectUrl: "/token#key-features",
    category: "Governance / DAO",
  },
  {
    id: "3",
    name: "VSD Staking dApp",
    description: "Stake your VSD tokens to earn rewards and contribute to the ecosystem's stability. Features tiered APY for long-term supporters.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "crypto staking dashboard",
    category: "DeFi / Staking",
  },
  {
    id: "4",
    name: "AiEar Integration (Partner)",
    description: "AiEar platform will integrate VSD tokens to unlock premium AI-driven audio processing features and exclusive content for VSD holders.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "audio AI platform",
    projectUrl: "#", // Placeholder for actual partner link
    category: "Partner Platform",
  },
  {
    id: "5",
    name: "PromoHub VSD Gateway (Partner)",
    description: "PromoHub to utilize VSD for accessing advanced AI analytics for marketing campaigns and offering token-gated promotional tools.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "marketing AI analytics",
    projectUrl: "#", // Placeholder
    category: "Partner Platform",
  },
  {
    id: "6",
    name: "Community AI Tool Showcase",
    description: "A curated list of innovative AI tools and dApps built by the community using VSD SDKs and leveraging VSD token utility. (Coming Soon)",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "community projects showcase",
    category: "Community / Developer Tools",
  },
];

export default function EcosystemPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <Network className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Token Ecosystem</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the expanding universe of AI tools, decentralized applications (dApps), and partner platforms that utilize or integrate the VSD utility token.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="aspect-video relative mb-4">
                <AIImage
                  initialSrc={project.imageUrl}
                  alt={project.name}
                  width={600} 
                  height={400}
                  className="rounded-t-lg object-cover"
                  hint={project.imageHint}
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <CardTitle className="font-headline text-xl sm:text-2xl">{project.name}</CardTitle>
              <CardDescription>{project.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm sm:text-base">{project.description}</p>
            </CardContent>
            <CardFooter>
              {project.projectUrl ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.projectUrl} target={project.projectUrl.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                    Learn More <ArrowUpRightSquare className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                 <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
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
