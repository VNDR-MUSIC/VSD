
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, KeyRound, Server, FileJson, Banknote, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Reference | VSD Network',
  description: 'Official API documentation for integrating with the VSD Network Core Engine, including AI services and transaction handling.',
};

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto my-4 text-xs sm:text-sm">
        <code>
            {children}
        </code>
    </pre>
);

const AuthSection = () => (
    <>
        <h3 className="text-xl sm:text-2xl">Authentication</h3>
        <p>Authentication is handled via a Bearer token in the `Authorization` header. You must provide your secret API key, which is stored as the `INTERNAL_API_KEY` environment variable in this project. All requests must be made from a server-side environment to protect your key.</p>
        <div className="flex items-center gap-2 p-4 my-4 rounded-md border border-amber-500/50 bg-amber-500/10">
            <KeyRound className="h-6 w-6 text-amber-400 shrink-0" />
            <p className="text-sm text-amber-200">
                <strong>Important:</strong> Keep your API key secure and do not expose it in client-side code. This key should be stored as a server-side environment variable in any connecting project. Unauthorized use of your key can result in billing against your account.
            </p>
        </div>
        <CodeBlock>
{`Authorization: Bearer YOUR_INTERNAL_API_KEY`}
        </CodeBlock>
    </>
);

export default function ApiReferencePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <header className="text-center">
        <Server className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">API Reference</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Integrate the VSD Network's centralized AI and banking capabilities into your own applications and projects.
        </p>
      </header>
      
      <Separator />

      {/* AI Image Generation API */}
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Code className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">AI Image Generation API (IMG Bank)</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                This endpoint is the official "IMG Bank" for the VSD ecosystem. It allows you to generate images by providing a textual hint. All API usage is metered and will eventually require VSD tokens for payment.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl mt-4">Endpoint</h3>
            <CodeBlock>{`POST /api/generate-image`}</CodeBlock>
            <Separator className="my-6" />
            <AuthSection />
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Request Body</h3>
            <p>The request body must be a JSON object containing a `hint` string.</p>
            <CodeBlock>{'{\n  "hint": "A photorealistic image of a red sports car on a mountain road at sunset"\n}'}</CodeBlock>
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Success Response (200 OK)</h3>
            <p>A successful request will return a JSON object with the `imageDataUri`.</p>
            <CodeBlock>{'{\n  "imageDataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."\n}'}</CodeBlock>
        </CardContent>
      </Card>

      <Separator />

      {/* AI Smart Contract Generator API */}
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <FileJson className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">AI Smart Contract Generator API</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                This endpoint allows you to generate Solidity smart contracts from a natural language description.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl mt-4">Endpoint</h3>
            <CodeBlock>{`POST /api/generate-contract`}</CodeBlock>
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Request Body</h3>
            <p>The request body must be a JSON object containing a `description` string.</p>
            <CodeBlock>{'{\n  "description": "Create an ERC20 token with a total supply of 1 million and a burn function."\n}'}</CodeBlock>
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Success Response (200 OK)</h3>
            <p>A successful request will return the generated code and an explanation.</p>
            <CodeBlock>{'{\n  "contractCode": "pragma solidity ^0.8.20;\\n\\ncontract MyToken {...",\n  "explanation": "This contract implements a basic ERC20 token..."\n}'}</CodeBlock>
        </CardContent>
      </Card>

      <Separator />

      {/* VSD Transaction API (Mock) */}
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Banknote className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">VSD Transaction API (Mock)</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                This endpoint simulates the creation of a VSD token transaction.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
             <div className="flex items-start gap-3 p-4 my-4 rounded-md border border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangle className="h-8 w-8 text-yellow-400 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-yellow-200">Demonstration Only</h4>
                    <p className="text-sm text-yellow-300">
                        This is a **mock API endpoint**. It does not connect to a real ledger or blockchain. It performs basic validation and returns a simulated successful transaction object to help you build and test your application's frontend and integration logic.
                    </p>
                </div>
            </div>
            <h3 className="text-xl sm:text-2xl mt-4">Endpoint</h3>
            <CodeBlock>{`POST /api/transactions`}</CodeBlock>
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Request Body</h3>
            <p>The request body must be a JSON object with transaction details.</p>
            <CodeBlock>{'{\n  "fromAddress": "0xYourAddress...",\n  "toAddress": "0xRecipientAddress...",\n  "amount": 150.5,\n  "description": "Payment for services"\n}'}</CodeBlock>
            <Separator className="my-6" />
            <h3 className="text-xl sm:text-2xl">Success Response (201 Created)</h3>
            <p>A successful request will return a mock transaction object.</p>
            <CodeBlock>{'{\n  "transactionId": "txn_...",\n  "status": "completed",\n  "timestamp": "...",\n  "fromAddress": "0xYourAddress...",\n  "toAddress": "0xRecipientAddress...",\n  "amount": 150.5,\n  "currency": "VSD",\n  "description": "Payment for services",\n  "mock": true\n}'}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
