
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Share2, KeyRound, ShieldCheck, Workflow, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project Integration | VSD Network',
  description: 'A guide for developers on how to connect external IMG projects to the VSD Network, manage permissions, and interact with the central API services.',
};

const CodeBlock = ({ children, lang = 'bash' }: { children: React.ReactNode; lang?: string }) => (
    <pre className={`bg-muted/50 p-4 rounded-md overflow-x-auto my-4 text-xs sm:text-sm language-${lang}`}>
        <code>
            {children}
        </code>
    </pre>
);

export default function IntegrationPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <Share2 className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Project Integration Guide</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect your IMG project to the VSD Network to leverage centralized AI services and token utilities. This guide outlines the project "twinning" process.
        </p>
      </header>

      <Separator />

      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Workflow className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">Concept: The Hub-and-Spoke Model</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                The IMG Ecosystem operates on a hub-and-spoke model. The VSD Network is the central "hub," providing core services like AI generation (IMG Bank) and the token ledger. Your project is a "spoke," a trusted twin that can securely access these services via an authenticated API.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            <p>To establish this secure connection, your project's backend needs an API key that the VSD Network can recognize and grant specific permissions to. This ensures that only authorized projects can interact with the central services, creating a secure and auditable ecosystem.</p>
        </CardContent>
      </Card>

      <Separator />
      
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <KeyRound className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">Integration Workflow</CardTitle>
            </div>
             <CardDescription className="text-base sm:text-lg">
                Follow these steps to connect your application to the VSD Network.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            
            <h3 className="text-xl sm:text-2xl mt-4">1. Register Your Project as a Tenant</h3>
            <p>First, your project must be registered as a "Tenant" within the VSD Network. This is done by an administrator via the <Link href="/admin">Admin Dashboard</Link>. The admin will register your project's name and official domain. </p>

            <h3 className="text-xl sm:text-2xl mt-4">2. Receive Your Internal API Key</h3>
            <p>Once your project is registered, the VSD administrator will generate a unique `INTERNAL_API_KEY` for you. This key is a secret and must be handled securely.</p>
            
            <div className="flex items-start gap-3 p-4 my-4 rounded-md border border-amber-500/50 bg-amber-500/10">
                <AlertTriangle className="h-8 w-8 text-amber-400 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-200">Security Warning</h4>
                    <p className="text-sm text-yellow-300">
                        Your `INTERNAL_API_KEY` provides direct, administrative access to VSD Network services. **Never expose this key in client-side code (e.g., a public website).** All API calls using this key must be made from a secure backend environment, like a serverless function or your application server.
                    </p>
                </div>
            </div>

            <h3 className="text-xl sm:text-2xl mt-4">3. Store the API Key Securely</h3>
            <p>Store your API key in an environment variable on your server. For example, in a `.env.local` file for a Next.js application:</p>
             <CodeBlock lang="bash">
{`# .env.local
INTERNAL_API_KEY="vsd_key_..."`}
            </CodeBlock>
            <p>If you're using Next.js, you must prefix the variable with `NEXT_PUBLIC_` if you need to access it in the browser (though this is **not recommended** for a secret key). For backend-only use, no prefix is needed.</p>

        
            <h3 className="text-xl sm:text-2xl mt-4">4. Authenticate and Call the API</h3>
            <p>When making a request to a VSD Network endpoint, include the API key in the `Authorization` header as a Bearer token.</p>
            <p>Here is an example of calling the <Link href="/developers/api-reference">Image Generation API</Link> from a JavaScript backend:</p>
             <CodeBlock lang="javascript">
{`const HINT = "A futuristic city skyline at dusk";

async function generateVsdImage(prompt) {
  try {
    const response = await fetch('https://your-vsd-project-url.com/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use your API key from environment variables
        'Authorization': \`Bearer \${process.env.INTERNAL_API_KEY}\`
      },
      body: JSON.stringify({ hint: prompt })
    });

    if (!response.ok) {
      throw new Error(\`API request failed with status \${response.status}\`);
    }

    const data = await response.json();
    console.log('Generated Image Data URI:', data.imageDataUri);
    return data;

  } catch (error) {
    console.error("Error calling VSD Image API:", error);
  }
}

generateVsdImage(HINT);`}
            </CodeBlock>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">Security Best Practices</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            <ul>
              <li><strong>Server-Side Calls Only:</strong> Never make authenticated API calls directly from a user's browser. Create a backend endpoint on your server that calls the VSD API.</li>
              <li><strong>Key Management:</strong> Store API keys in a secure secret manager (like Google Secret Manager, AWS KMS, or HashiCorp Vault) for production environments.</li>
              <li><strong>Monitoring & Rotation:</strong> Regularly monitor API usage logs and have a plan to rotate (revoke and regenerate) your API key if it is ever compromised.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
