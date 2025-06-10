
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightSquare } from "lucide-react";
import type { Metadata } from 'next';
import { AIImage } from '@/components/ai/AIImage';

export const metadata: Metadata = {
  title: 'VSD Ecosystem Projects',
  description: 'Explore the diverse range of DeFi, Web3, and dApp projects building on and integrating the VSD stablecoin.',
};

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // This will be the initial placeholder
  imageHint: string; // Hint for AI generation
  projectUrl?: string;
  category: string; // e.g., DeFi, NFT, DAO, Gaming
}

const projects: Project[] = [
  {
    id: "1",
    name: "Lending Protocol X",
    description: "A decentralized lending and borrowing platform utilizing VSD as a primary stable asset for loans and collateral.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "secure vault crypto",
    projectUrl: "#",
    category: "DeFi",
  },
  {
    id: "2",
    name: "NFT Marketplace Prime",
    description: "Trade unique digital collectibles and art (NFTs), with VSD as a stable currency for bids, payments, and royalties.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "nft digital art",
    projectUrl: "#",
    category: "NFT / Collectibles",
  },
  {
    id: "3",
    name: "Yield Aggregator Z",
    description: "Optimize your yield farming strategies across multiple DeFi protocols, with VSD-based stablecoin liquidity pools.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "defi farming chart",
    projectUrl: "#",
    category: "DeFi",
  },
  {
    id: "4",
    name: "Decentralized Payments Gateway",
    description: "Facilitating seamless cross-border payments and remittances using VSD for low-cost, fast, and censorship-resistant transactions.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "global crypto payments",
    category: "Payments / Infrastructure",
  },
  {
    id: "5",
    name: "VSD Governance DAO Hub",
    description: "The official platform for VSD token holders to participate in governance, vote on proposals, and manage the DAO treasury.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "dao governance community",
    projectUrl: "#",
    category: "DAO / Governance",
  },
  {
    id: "6",
    name: "Metaverse Gaming Universe X",
    description: "An immersive online game where VSD is the in-game currency for virtual land, assets, and play-to-earn rewards.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "metaverse game items",
    category: "Gaming / Metaverse",
  },
];

export default function EcosystemPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Ecosystem</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the vibrant and growing ecosystem of decentralized applications (dApps), DeFi protocols, and Web3 services building with and integrating the VSD stablecoin.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <div className="aspect-video relative mb-4">
                <AIImage
                  initialSrc={project.imageUrl}
                  alt={project.name}
                  width={600} // Assuming all placeholders are 600x400, adjust if not
                  height={400}
                  className="rounded-t-lg object-cover"
                  hint={project.imageHint}
                  layout="fill" // This prop might be needed if parent div controls size
                  objectFit="cover" // Ensure image covers the area
                />
              </div>
              <CardTitle className="font-headline text-2xl">{project.name}</CardTitle>
              <CardDescription>{project.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{project.description}</p>
            </CardContent>
            <CardFooter>
              {project.projectUrl ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    Visit Project <ArrowUpRightSquare className="ml-2 h-4 w-4" />
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
    </div>
  );
}
