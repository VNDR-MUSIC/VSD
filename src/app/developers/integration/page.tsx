
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Share2, KeyRound, ShieldCheck, Workflow } from 'lucide-react';
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
                <CardTitle className="font-headline text-2xl sm:text-3xl">Concept: Hub-and-Spoke Federation</CardTitle>
            </div>
            <CardDescription className="text-base sm:text-lg">
                The IMG Ecosystem operates on a hub-and-spoke model. The VSD Network is the central "hub," providing core services like AI generation (IMG Bank) and token management. Your project is a "spoke," a twin that can securely access these services via authenticated API calls.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            <p>To establish a secure connection, your project's backend needs a digital identity (a Service Account) that the VSD Network can recognize and grant specific permissions to. This ensures that only authorized projects can interact with the central services.</p>
        </CardContent>
      </Card>

      <Separator />
      
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <KeyRound className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <CardTitle className="font-headline text-2xl sm:text-3xl">Step 1: Service Account Setup & Permissions</CardTitle>
            </div>
             <CardDescription className="text-base sm:text-lg">
                Your project's backend needs credentials to authenticate with the VSD Network. This is done using a Google Cloud Service Account.
            </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base prose-invert max-w-none">
            
            <h3 className="text-xl sm:text-2xl mt-4">1. Create a Service Account in Your Project</h3>
            <p>In your own Google Cloud Platform (GCP) project, create a new Service Account. This account will act as the identity for your application's backend when it calls the VSD Network API. Give it a descriptive name like `vsd-api-client`.</p>
            <CodeBlock>
{`# In your own project's gcloud environment
gcloud iam service-accounts create vsd-api-client \\
  --display-name="VSD Network API Client"`}
            </CodeBlock>

            <h3 className="text-xl sm:text-2xl mt-4">2. Request Permissions on the VSD Network Project</h3>
            <p>The Service Account you created needs permissions on the VSD Network's GCP project to access its resources. You cannot grant these permissions yourself. You must provide your Service Account's email address to the VSD Network administrators and request the necessary roles.</p>
            <p><strong>Your Service Account Email will look like:</strong></p>
            <CodeBlock>
{`vsd-api-client@your-gcp-project-id.iam.gserviceaccount.com`}
            </CodeBlock>
            <p><strong>Required IAM Roles to Request:</strong></p>
            <ul>
                <li><code>roles/aiplatform.user</code>: To access the AI Image Generation services (Vertex AI).</li>
                <li><code>roles/serviceusage.serviceUsageConsumer</code>: To allow your project to make billable API calls against VSD services.</li>
                <li>(Upcoming) Custom roles for specific token or banking features.</li>
            </ul>
        
            <h3 className="text-xl sm:text-2xl mt-4">3. Authenticate and Call the API</h3>
            <p>Once the VSD Network admin has granted permissions, your backend can authenticate. The recommended method is to use Application Default Credentials (ADC) in a Cloud Function, Cloud Run, or other GCP environment. The environment will automatically handle authentication for you.</p>
            <p>If running outside of GCP, you would generate a key for your Service Account and use it to obtain a bearer token to call the API.</p>
            <p>Here is an example of calling the <Link href="/developers/api-reference">Image Generation API</Link> using an authentication token obtained from your service account:</p>
             <CodeBlock>
{`# 1. Get an auth token for your service account
export TOKEN=$(gcloud auth print-identity-token)

# 2. Call the VSD Network API
curl -X POST https://your-vsd-project-url.com/api/generate-image \\
-H "Authorization: Bearer $TOKEN" \\
-H "Content-Type: application/json" \\
-d '{"hint": "A twin project connecting via API"}'`}
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
              <li><strong>Least Privilege:</strong> Only request the roles your application absolutely needs.</li>
              <li><strong>Key Management:</strong> If you must use service account keys (for non-GCP environments), store them securely (e.g., in a secret manager) and rotate them regularly. Do not commit them to your codebase.</li>
              <li><strong>Monitoring:</strong> Keep track of your service account's activity and API usage from your GCP console.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
