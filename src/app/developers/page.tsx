
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Users, Github, MessageSquare, Search, Lightbulb, Code } from "lucide-react";
import { DocumentationSearchForm } from "@/components/ai/DocumentationSearchForm";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Resources',
  description: 'Access documentation, community links, and AI-powered search for building with VSD Network.',
};

export default function DevelopersPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-primary">Developer Portal</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to start building with VSD. Access documentation, connect with the community, and utilize our AI search tool.
        </p>
      </header>

      <Separator />

      <section id="ai-search" className="scroll-mt-20">
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="items-center text-center">
            <Lightbulb className="h-12 w-12 text-primary mb-3" />
            <CardTitle className="font-headline text-3xl">AI-Powered Documentation Search</CardTitle>
            <CardDescription className="max-w-lg">
              Can't find what you're looking for? Ask our AI assistant. It can search the VSD documentation and provide concise answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentationSearchForm />
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Dive into our comprehensive documentation to understand VSD's architecture, smart contracts, APIs, and integration guides.
            </p>
            <Button asChild variant="outline">
              <Link href="/developers/documentation" rel="noopener noreferrer">Read Docs</Link>
            </Button>
          </CardContent>
        </Card>

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

      <Separator />
      
      <section>
        <Card className="shadow-lg">
            <CardHeader>
                <Code className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="font-headline text-2xl">SDKs & Tools (Coming Soon)</CardTitle>
                <CardDescription>
                    We are developing Software Development Kits (SDKs) and tools to make integration with VSD seamless. Stay tuned for updates.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Placeholder for future SDKs (e.g., JavaScript, Python) and CLI tools.
                </p>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}

    