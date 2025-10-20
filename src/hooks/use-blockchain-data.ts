
'use client';

import { useState, useEffect } from 'react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { siteConfig } from '@/config/site';
import type { Account } from '@/types/account';

interface BlockchainData {
  totalSupply: string;
  holders: number;
}

interface Leaderboard {
    updatedAt: string;
    topHolders: Account[];
}

export function useBlockchainData() {
  const [data, setData] = useState<Partial<BlockchainData>>({
    totalSupply: siteConfig.tokenValues.TOTAL_SUPPLY.toString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  const leaderboardDocRef = useMemoFirebase(() => firestore ? doc(firestore, 'leaderboards', 'topHolders') : null, [firestore]);
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useDoc<Leaderboard>(leaderboardDocRef);


  useEffect(() => {
    // This is a mock function. In a real app, this would use ethers.js
    // or a similar library to call the ERC20 contract.
    const fetchOnChainData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        if (isLeaderboardLoading) return; // Wait for leaderboard data
        
        const holderCount = leaderboard?.topHolders?.length ?? 0;

        setData({
          totalSupply: siteConfig.tokenValues.TOTAL_SUPPLY.toString(),
          holders: holderCount,
        });

      } catch (e: any) {
        console.error("useBlockchainData Error:", e);
        setError("Could not load on-chain data. The network may be busy.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnChainData();
  }, [firestore, leaderboard, isLeaderboardLoading]);

  return { data, isLoading, error };
}
