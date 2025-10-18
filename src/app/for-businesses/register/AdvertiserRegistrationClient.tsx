
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
import { Briefcase, Loader2, Send, Sparkles, CheckCircle, XCircle, FileDown, Rocket, Gift } from 'lucide-react';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { vetAdvertiser, type VetAdvertiserOutput, type VetAdvertiserInput } from '@/ai/flows/vet-advertiser-flow';

const advertiserApplicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  website: z.string().url("Please enter a valid website URL."),
  businessDescription: z.string().min(50, "Description must be at least 50 characters.").max(1500, "Description cannot exceed 1500 characters."),
});

type AdvertiserApplicationFormValues = z.infer<typeof advertiserApplicationSchema>;

export function AdvertiserRegistrationClient() {
  const { isLoading: isAuthLoading } = useProtectedRoute();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vettingResult, setVettingResult] = useState<VetAdvertiserOutput | null>(null);
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

  const handleDownloadReason = () => {
    if (!vettingResult || !vettingResult.reason) return;
    const blob = new Blob([`Vetting Result for ${form.getValues('companyName')}:\n\nStatus: ${vettingResult.status}\n\nReason:\n${vettingResult.reason}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'advertiser-application-reason.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const onSubmit = async (data: AdvertiserApplicationFormValues) => {
    if (!user || !firestore) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in to submit an application." });
      return;
    }
    
    setIsSubmitting(true);
    setVettingResult(null);

    const flowInput: VetAdvertiserInput = {
      companyName: data.companyName,
      website: data.website,
      businessDescription: data.businessDescription,
    };
    
    try {
      // Call the AI vetting flow
      const result = await vetAdvertiser(flowInput);
      setVettingResult(result);

      // Save the application to Firestore regardless of status
      const applicationData = {
          userId: user.uid,
          userName: user.displayName || 'N/A',
          userEmail: user.email || 'N/A',
          status: result.status,
          submittedAt: new Date().toISOString(),
          ...data,
          vettingReason: result.reason, // Save AI's reasoning
      };
      const docRef = collection(firestore, 'advertiserApplications');
      await addDocumentNonBlocking(docRef, applicationData);

      if (result.status === 'approved') {
        toast({
            title: "Application Approved!",
            description: "Congratulations! Our AI has approved your application.",
        });
      } else {
         toast({
            title: "Application Needs Review",
            description: "Our AI has flagged your application for manual review. See details below.",
            variant: "destructive"
        });
      }

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
  
  if (vettingResult) {
    return (
        <div className="space-y-8 py-8 text-center max-w-2xl mx-auto">
            {vettingResult.status === 'approved' ? (
                 <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
                <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            )}
            <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-4 text-primary">
                Application {vettingResult.status === 'approved' ? 'Approved!' : 'Needs Review'}
            </h1>
             <Card className="text-left bg-card/80">
                <CardHeader>
                    <CardTitle>AI Vetting Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{vettingResult.reason}</p>
                </CardContent>
                 <CardFooter className="flex-col sm:flex-row gap-2">
                    <Button onClick={handleDownloadReason} variant="outline"><FileDown className="mr-2 h-4 w-4" /> Download Reason</Button>
                    {vettingResult.status === 'rejected' && (
                         <Button onClick={() => router.push('/earn')} variant="secondary"><Gift className="mr-2 h-4 w-4" /> Claim 1,000 VSD Lite</Button>
                    )}
                 </CardFooter>
            </Card>

            {vettingResult.status === 'approved' && (
                <Card className="text-left bg-card/80">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Rocket className="h-6 w-6" /> Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                        <p>{vettingResult.nextSteps}</p>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={() => router.push('/admin/users')}>Go to User Management</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
  }


  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Become a VSD Network Advertiser</h1>
        <CardDescription className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered onboarding system will analyze your application in real-time. We'll assess if your business is a good fit for our community of creators and tech enthusiasts, who earn VSD Lite tokens by watching videos, clicking links, and soon, participating in polls.
        </CardDescription>
      </header>

      <Card className="max-w-2xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-400" /> AI-Powered Application</CardTitle>
              <CardDescription>Fill out the form below. Our AI will review your application instantly and provide feedback.</CardDescription>
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
                      <Textarea rows={6} placeholder="Tell us about your business, your target audience, and what you'd like to advertise on the VSD Network. Be descriptive for the best analysis. (Min. 50 characters)" {...field} />
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
                    AI is Vetting Your Application...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit for AI Review
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
