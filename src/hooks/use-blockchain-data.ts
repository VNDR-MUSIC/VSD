
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
  const { data: leaderboard, isLoading: isLeaderboardLoading, error: leaderboardError } = useDoc<Leaderboard>(leaderboardDocRef);


  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    if (isLeaderboardLoading) {
      // Still waiting for leaderboard data, do nothing yet.
      return;
    }

    if (leaderboardError) {
      console.error("useBlockchainData Error:", leaderboardError);
      setError("Could not load on-chain data. The network may be busy.");
      setIsLoading(false);
      return;
    }

    // Once leaderboard data is available (or not), we can proceed.
    const holderCount = leaderboard?.topHolders?.length ?? 0;

    setData({
      totalSupply: siteConfig.tokenValues.TOTAL_SUPPLY.toString(),
      holders: holderCount,
    });
    
    setIsLoading(false);

  }, [firestore, leaderboard, isLeaderboardLoading, leaderboardError]);

  return { data, isLoading, error };
}
