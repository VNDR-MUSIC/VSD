"use client";

import { useState, type FormEvent } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { documentationSearch, type DocumentationSearchInput, type DocumentationSearchOutput } from '@/ai/flows/documentation-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileText, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  query: z.string().min(5, { message: "Query must be at least 5 characters long." }).max(200),
});

type FormData = z.infer<typeof formSchema>;

export function DocumentationSearchForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocumentationSearchOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const searchInput: DocumentationSearchInput = { query: data.query };
      const aiResponse = await documentationSearch(searchInput);
      
      // Simulate a slightly longer response time if needed for UX, or if the LLM is very fast
      // await new Promise(resolve => setTimeout(resolve, 500));

      // Check for placeholder or generic responses if the LLM isn't actually searching
      if (aiResponse.answer.includes("{{{") || aiResponse.relevantSection.includes("{{{")) {
         setResult({
          answer: "I am currently configured with placeholder documentation. Please try again once the full documentation is integrated.",
          relevantSection: "General Information"
        });
        toast({
          title: "Placeholder Response",
          description: "The AI is using placeholder data. Full search capabilities are coming soon.",
          variant: "default",
        });
      } else {
        setResult(aiResponse);
         toast({
          title: "Search Successful",
          description: "AI has found an answer to your query.",
        });
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Search Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="ai-search-query" className="sr-only">Your Question</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="ai-search-query"
                      placeholder="Ask about VSD features, contracts, or integration..."
                      className="pl-10 py-6 text-base"
                      {...field}
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full py-6 text-base font-semibold">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Searching...
              </>
            ) : (
              "Ask AI Assistant"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="mt-6 shadow-md border-primary/30">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <FileText className="mr-3 h-7 w-7 text-primary" /> AI Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-1 text-primary/90">Answer:</h4>
              <p className="text-foreground/90 whitespace-pre-wrap">{result.answer}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1 text-primary/90">Relevant Section:</h4>
              <p className="text-foreground/90">{result.relevantSection}</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              This information is AI-generated based on VSD documentation. Always verify critical information.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
