
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Music, ImageIcon, Send, FileText } from 'lucide-react';
import { AIImage } from '@/components/ai/AIImage';
import type { Metadata } from 'next';
import { useCollection, useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Account } from '@/types/account';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Skeleton } from '@/components/ui/skeleton';

const metadata: Metadata = {
  title: 'Audio Exchange Demo | VSD Network',
  description: 'Demonstration of a partner project using the VSD Network API for token transactions and AI-generated content, showcasing the potential of the ecosystem.',
};

interface Advertisement {
    id: string;
    title: string;
    url: string;
    reward: number; // For demo purposes, we'll treat 'reward' as the 'price' in VSD.
}

export default function AudioExchangePage() {
  useProtectedRoute();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const accountRef = useMemoFirebase(() => user && firestore ? doc(firestore, 'accounts', user.uid) : null, [firestore, user]);
  const { data: account } = useDoc<Account>(accountRef);
  
  // Fetch 'advertisements' to use as mock tracks for this demo
  const adsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'advertisements') : null, [firestore]);
  const { data: tracks, isLoading: isLoadingTracks } = useCollection<Advertisement>(adsQuery);

  const MOCK_RECIPIENT_ADDRESS = "0xArtistWallet...789";

  const handlePurchase = async (track: Advertisement) => {
    setIsLoading(track.id);
    
    if (!account || !account.walletAddress) {
      toast({ variant: "destructive", title: "Wallet Not Found", description: "Your wallet address could not be found. Please ensure your account is set up correctly." });
      setIsLoading(null);
      return;
    }
    
    try {
      toast({
        title: "Processing Transaction...",
        description: `Simulating a VSD transaction for ${track.reward} VSD.`,
      });

      const transactionPayload = {
          fromAddress: account.walletAddress,
          toAddress: MOCK_RECIPIENT_ADDRESS,
          amount: track.reward, // Using reward as price for demo
          description: `Purchase of audio license: ${track.title}`,
      };
      
      // Call the secure, local bridge API route
      const response = await fetch('/api/vsd-bridge', {
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
        title: "Transaction Confirmed",
        description: `TXN ID: ${transactionResult.transactionId}. Your purchase is complete.`,
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
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">VSD Network in Action</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          This page is a live proof-of-concept demonstrating how a partner project, the "Audio Exchange," integrates with the VSD Network. It showcases three core functionalities: using VSD tokens for payments, secure communication with the central API, and leveraging shared AI services for features like dynamic album art.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {isLoadingTracks ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col shadow-lg bg-card/80 backdrop-blur-sm">
              <Skeleton className="w-full h-[450px]" />
            </Card>
          ))
        ) : tracks && tracks.length > 0 ? (
          tracks.map(track => (
            <Card key={track.id} className="flex flex-col shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                 <div className="aspect-video relative mb-4">
                   <AIImage
                      initialSrc={`https://picsum.photos/seed/${encodeURIComponent(track.title)}/600/400`}
                      alt={`Cover art for ${track.title}`}
                      width={600}
                      height={400}
                      className="rounded-t-lg object-cover"
                      hint={`music album cover for a song called ${track.title}`}
                      layout="fill"
                      objectFit="cover"
                   />
                   <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      <ImageIcon className="h-3 w-3" />
                      <span>AI Album Art</span>
                   </div>
                 </div>
                <CardTitle className="font-headline text-xl sm:text-2xl">{track.title}</CardTitle>
                <CardDescription>By Anonymous Artist</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-bold text-xl text-primary">{track.reward} VSD</span>
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
                  disabled={!!isLoading || !account}
                 >
                  {isLoading === track.id ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Buy with {track.reward} VSD
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
           <p className="text-muted-foreground col-span-full text-center">No tracks available for purchase.</p>
        )}
      </div>
    </div>
  );
}
