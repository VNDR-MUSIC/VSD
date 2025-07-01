
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, KeyRound, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Reference | VSD Network',
  description: 'Official API documentation for integrating with the VSD Network AI Core Engine, including the AI Image Generation API.',
};

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4 text-xs sm:text-sm">
        <code>
            {children}
        </code>
    </pre>
);

export default function ApiReferencePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <Server className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">API Reference</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Integrate the VSD Network's centralized AI capabilities into your own applications and projects.
        </p>
      </header>

      <Separator />

      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Code className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">AI Image Generation API (IMG Bank)</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                This endpoint is the official "IMG Bank" for the VSD ecosystem. It allows you to generate images by providing a textual hint, leveraging the same powerful "IMG Services" available on the VSD Network. All API usage is metered and will eventually require VSD tokens for payment.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            
            <h3 className="text-xl sm:text-2xl mt-4">Endpoint</h3>
            <CodeBlock>{`POST /api/generate-image`}</CodeBlock>

            <Separator className="my-6" />

            <h3 className="text-xl sm:text-2xl">Authentication</h3>
            <p>Authentication is handled via a Bearer token in the `Authorization` header. You must provide your secret API key, which can be provisioned through the VSD Developer Portal (coming soon). All requests must be made from a server-side environment to protect your key.</p>
            <div className="flex items-center gap-2 p-4 my-4 rounded-md border border-amber-500/50 bg-amber-500/10">
                <KeyRound className="h-6 w-6 text-amber-400 shrink-0" />
                <p className="text-sm text-amber-200">
                    <strong>Important:</strong> Keep your API key secure and do not expose it in client-side code. This key should be stored as a server-side environment variable. Unauthorized use of your key can result in billing against your account.
                </p>
            </div>
            <CodeBlock>
{`Authorization: Bearer YOUR_SECRET_API_KEY`}
            </CodeBlock>

            <Separator className="my-6" />

            <h3 className="text-xl sm:text-2xl">Request Body</h3>
            <p>The request body must be a JSON object containing a `hint` string.</p>
            <CodeBlock>
{`{
  "hint": "A photorealistic image of a red sports car on a mountain road at sunset"
}`}
            </CodeBlock>
            
            <Separator className="my-6" />

            <h3 className="text-xl sm:text-2xl">Responses</h3>
            <h4>Success (200 OK)</h4>
            <p>A successful request will return a JSON object with the `imageDataUri`.</p>
            <CodeBlock>
{`{
  "imageDataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
}`}
            </CodeBlock>

            <h4>Error (4xx/5xx)</h4>
            <p>If an error occurs, the response will contain a JSON object with an `error` message.</p>
            <CodeBlock>
{`// Example: Unauthorized (401)
{
  "error": "Unauthorized"
}

// Example: Bad Request (400)
{
  "error": "Invalid hint provided. Must be a non-empty string."
}

// Example: Internal Server Error (500)
{
  "error": "An internal server error occurred."
}`}
            </CodeBlock>

             <Separator className="my-6" />

            <h3 className="text-xl sm:text-2xl">Example `curl` Request</h3>
            <p>Here is an example of how to call the API using `curl` from your terminal. Replace `your-vsd-project-url.com` with your deployed project's URL and `YOUR_SECRET_API_KEY` with your key.</p>
            <CodeBlock>
{`curl -X POST https://your-vsd-project-url.com/api/generate-image \\
-H "Authorization: Bearer YOUR_SECRET_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{"hint": "A cybernetic owl with glowing blue eyes"}'`}
            </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
