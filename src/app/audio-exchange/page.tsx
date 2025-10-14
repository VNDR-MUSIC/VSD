
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music, FileText, ImageIcon, Send } from 'lucide-react';
import { AIImage } from '@/components/ai/AIImage';
import { logger } from 'firebase-functions';
import type { Metadata } from 'next';
import { randomUUID } from 'crypto';

// This is a client component, so we can't export metadata directly.
// But we can define it for reference or for moving to a server component later.
const metadata: Metadata = {
  title: 'Audio Exchange Demo | VSD Network',
  description: 'Demonstration of a partner project using the VSD Network API for token transactions and AI-generated content, showcasing the potential of the ecosystem.',
};

// Mock data for audio tracks
const mockTracks = [
  {
    id: 'track-01',
    title: 'Synthwave Dreams',
    artist: 'Analog Grains',
    price: 150, // VSD
    hint: 'retro synthwave album cover'
  },
  {
    id: 'track-02',
    title: 'LoFi Morning Coffee',
    artist: 'Chill Beats Collective',
    price: 100, // VSD
    hint: 'lofi chill anime girl studying'
  },
  {
    id: 'track-03',
    title: 'Orchestral Epic',
    artist: 'Symphonia',
    price: 250, // VSD
    hint: 'epic fantasy battle cinematic'
  }
];

// This component now makes REAL API calls to the VSD Network backend
export default function AudioExchangePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // MOCK user wallet addresses
  const MOCK_SENDER_ADDRESS = "0xAbc...123";
  const MOCK_RECIPIENT_ADDRESS = "0xDef...456";

  const handlePurchase = async (track: typeof mockTracks[0]) => {
    setIsLoading(track.id);
    
    try {
      toast({
        title: "Processing Transaction...",
        description: `Simulating a VSD transaction for ${track.price} VSD.`,
      });

      const transactionPayload = {
          fromAddress: MOCK_SENDER_ADDRESS,
          toAddress: MOCK_RECIPIENT_ADDRESS,
          amount: track.price,
          description: `Purchase of audio license: ${track.title}`,
      };

      // Call the client-facing bridge API
      const response = await fetch('/api/vsd/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionPayload),
      });
      
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Transaction failed to process.');
      }
      
      const transactionResult: any = await response.json();

      toast({
        title: "Transaction Confirmed! (Mock)",
        description: `Mock TXN ID: ${transactionResult.transactionId}. Your purchase is complete.`,
      });
      
    } catch (error: any) {
        console.error("Purchase failed:", error);
        toast({
            variant: "destructive",
            title: "Purchase Failed",
            description: error.message || "An unknown error occurred during the purchase process.",
        });
    } finally {
        setIsLoading(null);
    }
  };

  return (
    <div className="space-y-12 py-8">
      <header className="text-center">
        <Music className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Audio Exchange</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          A demonstration of how a partner project can leverage the VSD Bank APIs for payments, contracts, and AI services.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mockTracks.map(track => (
          <Card key={track.id} className="flex flex-col shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
               <div className="aspect-video relative mb-4">
                 <AIImage
                    initialSrc="https://placehold.co/600x400.png"
                    alt={`Cover art for ${track.title}`}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover"
                    hint={track.hint}
                    layout="fill"
                    objectFit="cover"
                 />
                 <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    <ImageIcon className="h-3 w-3" />
                    <span>Art by VSD AI</span>
                 </div>
               </div>
              <CardTitle className="font-headline text-xl sm:text-2xl">{track.title}</CardTitle>
              <CardDescription>By {track.artist}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold text-xl text-primary">{track.price} VSD</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2 pt-2">
                    <FileText className="h-4 w-4" />
                    <span>Purchase includes a simulated on-chain record via the VSD Transaction API.</span>
                </p>
            </CardContent>
            <CardFooter>
               <Button 
                className="w-full btn-hover-effect" 
                onClick={() => handlePurchase(track)}
                disabled={!!isLoading}
               >
                {isLoading === track.id ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Buy with {track.price} VSD
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
