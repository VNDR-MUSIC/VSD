
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, ShoppingCart, Loader2 } from 'lucide-react';

const VSD_PRICE_USD = 0.01;

const buyVsdSchema = z.object({
  vsdAmount: z.coerce.number().min(100, "Minimum purchase is 100 VSD.").max(100000, "Maximum purchase is 100,000 VSD."),
});

type BuyVsdFormValues = z.infer<typeof buyVsdSchema>;

export default function BuyVsdPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<BuyVsdFormValues>({
    resolver: zodResolver(buyVsdSchema),
    defaultValues: {
      vsdAmount: 1000,
    },
  });

  const vsdAmount = form.watch('vsdAmount');
  const usdAmount = (vsdAmount || 0) * VSD_PRICE_USD;

  const onSubmit = async (data: BuyVsdFormValues) => {
    setIsLoading(true);
    
    // MOCK STRIPE INTEGRATION
    // In a real app, this would call a backend endpoint to create a Stripe Checkout session.
    // The backend would then return a URL to which we redirect the user.
    // For now, we will simulate this process with a delay.
    
    console.log("Creating Stripe session for:", data);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    toast({
      title: "Redirecting to Stripe...",
      description: "This is a demonstration. In a real application, you would now be redirected to a secure Stripe payment page.",
    });

    // In a real app, you'd have something like:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ vsdAmount: data.vsdAmount })
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    setIsLoading(false);
  };

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Buy VSD Tokens with Card</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Instantly purchase VSD utility tokens using your credit or debit card, powered by Stripe.
        </p>
      </header>

      <Card className="max-w-md mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Purchase VSD</CardTitle>
              <CardDescription>Enter the amount of VSD you wish to buy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="vsdAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VSD Token Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center p-4 rounded-md bg-muted/50">
                <span className="text-muted-foreground">You Pay (USD)</span>
                <span className="font-bold text-2xl text-primary">
                  ${usdAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Transactions are securely processed by Stripe. Your VSD tokens will be sent to your connected wallet after payment confirmation.
              </p>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold btn-hover-effect">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Buy with Stripe
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
