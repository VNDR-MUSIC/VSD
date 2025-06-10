
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Users, Github, MessageSquare, Package, Code } from "lucide-react"; // Removed Search, Lightbulb
import { Separator } from "@/components/ui/separator";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Resources',
  description: 'Access documentation, community links, and tools for building with VSD Network.',
};

export default function DevelopersPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">Developer Portal</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to start building with VSD. Access documentation, connect with the community, and utilize our tools.
        </p>
      </header>

      <Separator />

      {/* AI Search Section Removed */}

      <section className="grid md:grid-cols-2 gap-8 items-stretch">
        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Documentation</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">
              Dive into our comprehensive documentation to understand VSD's architecture, core logic, APIs, and integration guides.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/developers/documentation">Read Docs</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <Package className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">SDKs & Tools</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">
              Explore our Software Development Kits and tools designed to simplify your integration with the VSD Network.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/developers/sdks-tools">Explore SDKs & Tools</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      <Separator />
      
      <section id="community">
        <Card className="shadow-lg">
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Community & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Connect with fellow developers, ask questions, and contribute to the VSD ecosystem.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub (Placeholder)
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" /> Discord (Placeholder)
                </Link>
              </Button>
               <Button asChild variant="outline">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                   Forum (Placeholder)
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
