
"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Copy, Sparkles, ShieldAlert, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSmartContract, GenerateSmartContractInput, GenerateSmartContractOutputSchema } from '@/ai/flows/generate-smart-contract-flow';
import type { GenerateSmartContractOutput } from '@/ai/flows/generate-smart-contract-flow';

const contractFormSchema = z.object({
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }),
  businessType: z.string().min(3, { message: "Business type must be at least 3 characters." }),
  contractObjective: z.string().min(10, { message: "Objective must be at least 10 characters." }),
  keyFunctionalities: z.string().min(10, { message: "Describe at least one key functionality." }).transform(value => value.split('\n').map(s => s.trim()).filter(s => s.length > 0)),
  tokenStandard: z.enum(['ERC20', 'ERC721', 'ERC1155', 'None']).optional(),
  platform: z.string().optional(),
});

const registrationFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().optional(),
  contactNotes: z.string().optional(),
});

type ContractFormData = z.infer<typeof contractFormSchema>;
type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export default function SmartContractGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<GenerateSmartContractOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const contractForm = useForm<ContractFormData>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      projectName: '',
      businessType: '',
      contractObjective: '',
      keyFunctionalities: '',
      tokenStandard: 'None',
      platform: 'Ethereum',
    },
  });

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      contactNotes: '',
    }
  });

  const handleGenerateContract = async (data: ContractFormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContract(null);
    try {
      const inputData: GenerateSmartContractInput = {
        ...data,
        // keyFunctionalities is already an array due to transform
      };
      const result = await generateSmartContract(inputData);
      const parsedResult = GenerateSmartContractOutputSchema.safeParse(result);
      if (parsedResult.success) {
        setGeneratedContract(parsedResult.data);
      } else {
         setError("AI returned an unexpected data structure. Please try again.");
         console.error("AI response parsing error:", parsedResult.error);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the smart contract. Please try again.");
    }
    setIsLoading(false);
  };

  const handleRegistrationSubmit = async (data: RegistrationFormData) => {
    // In a real app, you'd send this data to your backend
    console.log("Registration Data:", data);
    toast({
      title: "Registration Submitted!",
      description: "Thank you! A VSD Network representative will contact you shortly regarding your free deployment.",
    });
    registrationForm.reset();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Copied to clipboard!" });
    }).catch(err => {
      toast({ title: "Failed to copy", description: "Could not copy text to clipboard.", variant: "destructive" });
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline flex items-center justify-center">
          <Sparkles className="mr-3 h-10 w-10 text-primary" />
          AI Smart Contract Generator
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Describe your business needs, and let our AI craft a foundational smart contract for you.
          Then, let the VSD Network help you deploy it – **FOR FREE** (limited time offer)!
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contract Generation Form */}
        <Card>
          <CardHeader>
            <CardTitle>1. Describe Your Smart Contract</CardTitle>
            <CardDescription>Provide details about the smart contract you need.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={contractForm.handleSubmit(handleGenerateContract)} className="space-y-6">
              <div>
                <Label htmlFor="projectName">Project/Business Name</Label>
                <Input id="projectName" {...contractForm.register("projectName")} />
                {contractForm.formState.errors.projectName && <p className="text-sm text-destructive mt-1">{contractForm.formState.errors.projectName.message}</p>}
              </div>
              <div>
                <Label htmlFor="businessType">Type of Business/Project</Label>
                <Input id="businessType" {...contractForm.register("businessType")} placeholder="e.g., E-commerce, SaaS, DeFi Protocol" />
                {contractForm.formState.errors.businessType && <p className="text-sm text-destructive mt-1">{contractForm.formState.errors.businessType.message}</p>}
              </div>
              <div>
                <Label htmlFor="contractObjective">Main Objective of the Contract</Label>
                <Textarea id="contractObjective" {...contractForm.register("contractObjective")} placeholder="e.g., To manage token staking and rewards, To facilitate NFT sales and royalties" />
                {contractForm.formState.errors.contractObjective && <p className="text-sm text-destructive mt-1">{contractForm.formState.errors.contractObjective.message}</p>}
              </div>
              <div>
                <Label htmlFor="keyFunctionalities">Key Functionalities (one per line)</Label>
                <Textarea id="keyFunctionalities" {...contractForm.register("keyFunctionalities")} placeholder="e.g., User registration\nToken minting\nVoting mechanism" />
                {contractForm.formState.errors.keyFunctionalities && <p className="text-sm text-destructive mt-1">{contractForm.formState.errors.keyFunctionalities.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tokenStandard">Token Standard (Optional)</Label>
                  <Controller
                    name="tokenStandard"
                    control={contractForm.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value || 'None'}>
                        <SelectTrigger id="tokenStandard">
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None / Not Applicable</SelectItem>
                          <SelectItem value="ERC20">ERC20 (Fungible Token)</SelectItem>
                          <SelectItem value="ERC721">ERC721 (NFT)</SelectItem>
                          <SelectItem value="ERC1155">ERC1155 (Multi-Token)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="platform">Blockchain Platform (Optional)</Label>
                  <Input id="platform" {...contractForm.register("platform")} placeholder="e.g., Ethereum, Polygon" />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full btn-hover-effect">
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                Generate Contract with AI
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* AI Output Display */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>2. AI-Generated Smart Contract</CardTitle>
              <CardDescription>Review the Solidity code generated by our AI.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Generating your smart contract...</p>
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {generatedContract && !isLoading && (
                <div className="space-y-4">
                  {generatedContract.warnings && (
                    <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
                      <AlertTitle>Important Warning</AlertTitle>
                      <AlertDescription>{generatedContract.warnings}</AlertDescription>
                    </Alert>
                  )}
                  {generatedContract.suggestions && (
                     <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>AI Suggestions</AlertTitle>
                        <AlertDescription>{generatedContract.suggestions}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="solidityCodeOutput">Solidity Code:</Label>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContract.solidityCode)}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Code
                      </Button>
                    </div>
                    <pre id="solidityCodeOutput" className="language-solidity overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-white h-96">
                      <code>{generatedContract.solidityCode}</code>
                    </pre>
                  </div>
                </div>
              )}
              {!generatedContract && !isLoading && !error && (
                <p className="text-muted-foreground text-center py-10">Your generated contract will appear here once you fill out the form.</p>
              )}
            </CardContent>
          </Card>
          
          {/* Deployment Information and Registration */}
          <Card className="bg-gradient-to-br from-primary/20 to-background">
            <CardHeader>
              <CardTitle className="text-2xl">3. Deploy with VSD Network - <span className="text-primary line-through opacity-70">Standard Pricing</span> FREE!</CardTitle>
              <CardDescription>
                Let our experts handle the deployment and ongoing support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-dashed border-primary/50 rounded-lg bg-background/50">
                <h3 className="font-semibold text-lg mb-2">Standard Deployment Service:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><span className="line-through">Total Cost: $14,000 USD</span></li>
                  <li><span className="line-through">Down Payment: 10% ($1,400 USD)</span></li>
                  <li><span className="line-through">Monthly Service Fee: Applicable (details on consultation)</span></li>
                </ul>
                <p className="mt-3 font-bold text-primary text-xl">
                  LIMITED TIME OFFER: All deployment services and initial consultation are completely FREE!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Build value with VSD. This is a temporary promotional offer to help kickstart your project on the VSD ecosystem.
                </p>
              </div>

              <h3 className="text-xl font-semibold pt-4 border-t border-border">Register for FREE Deployment Assistance:</h3>
              <form onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)} className="space-y-4">
                 <div>
                    <Label htmlFor="fullNameReg">Full Name</Label>
                    <Input id="fullNameReg" {...registrationForm.register("fullName")} />
                    {registrationForm.formState.errors.fullName && <p className="text-sm text-destructive mt-1">{registrationForm.formState.errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="emailReg">Email Address</Label>
                    <Input id="emailReg" type="email" {...registrationForm.register("email")} />
                    {registrationForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{registrationForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="companyNameReg">Company Name (Optional)</Label>
                    <Input id="companyNameReg" {...registrationForm.register("companyName")} />
                  </div>
                   <div>
                    <Label htmlFor="contactNotesReg">Notes/Questions for VSD Team (Optional)</Label>
                    <Textarea id="contactNotesReg" {...registrationForm.register("contactNotes")} placeholder="Any specific questions or details about your project?" />
                  </div>
                <Button type="submit" className="w-full btn-hover-effect">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register for Free Deployment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// For page title in client components, you'd typically set it in a useEffect or use a helper
// This is a placeholder if you want to set title dynamically from client component
if (typeof window !== "undefined") {
  document.title = "AI Smart Contract Generator | VSD Network";
}

    