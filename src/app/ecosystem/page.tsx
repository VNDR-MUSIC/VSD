
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightSquare } from "lucide-react";
import type { Metadata } from 'next';
import Image from 'next/image'; // Replaced AIImage

export const metadata: Metadata = {
  title: 'VSD Ecosystem Projects',
  description: 'Explore the diverse range of projects and applications building on and integrating the VSD platform.',
};

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint?: string; // Kept for potential future use or if manual hints are desired
  projectUrl?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Lending Protocol X",
    description: "A decentralized lending and borrowing platform utilizing VSD as a primary stable asset for loans and backing.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "secure vault", 
    projectUrl: "#",
    category: "Finance",
  },
  {
    id: "2",
    name: "Digital Marketplace Prime",
    description: "Trade unique digital collectibles and art, with VSD as a stable currency for bids and payments.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "digital art", 
    projectUrl: "#",
    category: "Collectibles",
  },
  {
    id: "3",
    name: "Yield Aggregator Z",
    description: "Optimize your yield strategies across multiple protocols, with VSD-based liquidity pools.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "financial farming", 
    projectUrl: "#",
    category: "Finance",
  },
  {
    id: "4",
    name: "Global Pay Solutions",
    description: "Facilitating seamless cross-border payments and remittances using VSD for low-cost, fast transactions.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "fast payments", 
    category: "Payments",
  },
  {
    id: "5",
    name: "Community Governance Hub",
    description: "A platform for decentralized organizations to manage proposals and voting, often using VSD for treasury management.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "community governance", 
    projectUrl: "#",
    category: "Governance",
  },
  {
    id: "6",
    name: "Gaming Universe X",
    description: "An immersive online game where VSD is the in-game currency for assets and rewards.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "virtual items", 
    category: "Gaming",
  },
];

export default function EcosystemPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Ecosystem</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the vibrant and growing ecosystem of projects, platforms, and services building with and integrating VSD.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <div className="aspect-video relative mb-4">
                <Image
                  src={project.imageUrl} // was initialSrc
                  alt={project.name}
                  fill
                  className="rounded-t-lg object-cover"
                  data-ai-hint={project.imageHint} // data-ai-hint can be kept if needed for other purposes
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
