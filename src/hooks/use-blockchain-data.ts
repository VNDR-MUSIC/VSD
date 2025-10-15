
'use client';

import { useState, useEffect } from 'react';

interface BlockchainData {
  totalSupply: string | null;
  name: string | null;
}

export function useBlockchainData() {
  const [data, setData] = useState<BlockchainData>({ totalSupply: null, name: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/blockchain/stats');
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch blockchain data.');
        }

        const result: BlockchainData = await response.json();
        setData(result);
      } catch (e: any) {
         console.error("useBlockchainData Error:", e);
         setError(e.message || "An unexpected error occurred while fetching blockchain data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
