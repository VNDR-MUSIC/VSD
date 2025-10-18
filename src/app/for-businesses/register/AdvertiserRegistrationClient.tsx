
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Loader2, Send } from 'lucide-react';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

const advertiserApplicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  website: z.string().url("Please enter a valid website URL."),
  businessDescription: z.string().min(50, "Description must be at least 50 characters.").max(500, "Description cannot exceed 500 characters."),
});

type AdvertiserApplicationFormValues = z.infer<typeof advertiserApplicationSchema>;

// This function calls our internal API to create a task in Agiled
async function createTaskInPms(applicationData: AdvertiserApplicationFormValues & { userEmail: string | null }) {
    try {
        const response = await fetch('/api/agiled/create-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `New Advertiser Application: ${applicationData.companyName}`,
                description: `A new application has been submitted.\n\nCompany: ${applicationData.companyName}\nWebsite: ${applicationData.website}\nEmail: ${applicationData.userEmail}\n\nDescription:\n${applicationData.businessDescription}`
            })
        });

        if (!response.ok) {
            const errorResult = await response.json();
            console.error("Failed to create PM task:", errorResult.error);
        } else {
            console.log("Successfully created task in project management system.");
        }
    } catch (error) {
        console.error("Error calling task creation API:", error);
    }
}


export function AdvertiserRegistrationClient() {
  const { isLoading: isAuthLoading } = useProtectedRoute();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AdvertiserApplicationFormValues>({
    resolver: zodResolver(advertiserApplicationSchema),
    defaultValues: {
      companyName: '',
      website: '',
      businessDescription: '',
    },
  });

  const onSubmit = async (data: AdvertiserApplicationFormValues) => {
    if (!user || !firestore) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in to submit an application." });
      return;
    }
    
    setIsSubmitting(true);
    
    const applicationId = user.uid; // Use user's UID as the document ID to prevent duplicate applications
    const applicationData = {
        userId: user.uid,
        userName: user.displayName || 'N/A',
        userEmail: user.email || 'N/A',
        status: 'pending' as const,
        submittedAt: new Date().toISOString(),
        ...data
    };
    
    try {
      const docRef = collection(firestore, 'advertiserApplications');
      await addDocumentNonBlocking(docRef, applicationData);
      
      // After successfully saving to Firestore, trigger the PMS task creation
      // This is a "fire-and-forget" call; we don't block the UI for it.
      createTaskInPms({ ...data, userEmail: user.email });

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We will review your application and be in touch shortly.",
      });
      
      router.push('/dashboard');

    } catch (error) {
      console.error("Error submitting application:", error);
      toast({ variant: "destructive", title: "Submission Failed", description: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isAuthLoading || !user) {
     return (
      <div className="space-y-12 py-8">
        <header className="text-center">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
        </header>
        <Card className="max-w-2xl mx-auto">
            <Skeleton className="h-[550px] w-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Become a VSD Network Advertiser</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Apply to launch your campaigns on our network and reach a dedicated community of creators, developers, and tech enthusiasts.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Advertiser Application</CardTitle>
              <CardDescription>Fill out the form below. We'll review your application and grant you the 'Advertiser' role upon approval.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Your Awesome Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://yourcompany.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business & Advertising Goals</FormLabel>
                     <FormControl>
                      <Textarea placeholder="Tell us about your business and what you'd like to advertise on the VSD Network. (Min. 50 characters)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full font-bold btn-hover-effect">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Application
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
