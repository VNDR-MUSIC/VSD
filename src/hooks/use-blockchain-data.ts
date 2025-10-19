
'use client';

import { useState, useEffect } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { siteConfig } from '@/config/site';

interface BlockchainData {
  totalSupply: string;
  holders: number;
}

export function useBlockchainData() {
  const [data, setData] = useState<Partial<BlockchainData>>({
    totalSupply: siteConfig.tokenValues.TOTAL_SUPPLY.toString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  const accountsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'accounts'), limit(1)) : null),
    [firestore]
  );
  const { data: accounts, isLoading: accountsLoading } = useCollection(accountsQuery,);

  useEffect(() => {
    // This is a mock function. In a real app, this would use ethers.js
    // or a similar library to call the ERC20 contract.
    const fetchOnChainData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        if (!firestore) {
          throw new Error("Firestore not available");
        }
        
        // Fetch total number of accounts to simulate "holders"
        const accountsSnapshot = await getDocs(collection(firestore, 'accounts'));
        const holderCount = accountsSnapshot.size;

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
  }, [firestore]);

  return { data, isLoading, error };
}
