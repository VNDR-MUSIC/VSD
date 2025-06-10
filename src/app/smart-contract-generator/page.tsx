
"use client";

import type { Metadata } from 'next';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { generateSmartContract, type GenerateSmartContractOutput } from '@/ai/flows/generate-smart-contract-flow';
import { Loader2, FileText, Lightbulb } from 'lucide-react';

// No static metadata for client components, manage title dynamically if needed or in layout
// export const metadata: Metadata = {
//   title: 'AI Smart Contract Generator | VSD Network',
//   description: 'Generate Solidity smart contracts using AI based on your requirements.',
// };

const formSchema = z.object({
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).max(2000, {
    message: "Description must not exceed 2000 characters."
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function SmartContractGeneratorPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GenerateSmartContractOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateSmartContract({ description: data.description });
      setResult(response);
      toast({
        title: "Smart Contract Generated!",
        description: "The AI has generated your smart contract and an explanation.",
      });
    } catch (err) {
      console.error("Smart contract generation failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <header className="text-center">
        <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2 text-primary">AI Smart Contract Generator</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Describe the smart contract you need, and our AI will generate the Solidity code and an explanation for you.
        </p>
      </header>

      <Card className="max-w-3xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Describe Your Smart Contract</CardTitle>
          <CardDescription>
            Provide a detailed description of the contract's purpose, features, functions, and any specific logic (e.g., "ERC20 token with a total supply of 1 million, pausable, and mintable by owner").
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description" className="text-lg">Contract Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="e.g., A simple ERC20 token called 'MyCoin' (MC) with 18 decimals and an initial supply of 1,000,000 tokens assigned to the deployer."
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detailed your description, the better the AI can understand your requirements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Generate Contract
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Card className="max-w-3xl mx-auto mt-8 border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Generation Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="max-w-3xl mx-auto mt-8 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Generated Solidity Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto text-sm">
                <code>{result.contractCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm prose-invert max-w-none">
                <p>{result.explanation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
