
'use client';

import { useState, useEffect, useMemo } from "react";
import { collection } from "firebase/firestore";
import { useFirestore, useCollection, useUser } from "@/firebase";
import type { Account } from "@/types/account";

export function useTokenMetrics() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  
  // Only create the collection reference if the user is authenticated
  const accountsCollection = useMemo(() => (firestore && user) ? collection(firestore, "accounts") : null, [firestore, user]);
  const { data: accounts, isLoading: isAccountsLoading } = useCollection<Account>(accountsCollection);
  
  const [metrics, setMetrics] = useState({
    totalSupply: 700_000_000,
    circulatingVSD: 0,
    treasuryVSD: 700_000_000,
    circulatingVSDLite: 0,
    loading: true,
  });

  const [airdropPreview, setAirdropPreview] = useState<{[uid: string]: number}>({});

  useEffect(() => {
    // The main loading state depends on both user auth and account data fetching
    const isLoading = isUserLoading || isAccountsLoading;

    if (isLoading || !accounts) {
      // Keep loading state if we're waiting for user or data
      setMetrics(prev => ({ ...prev, loading: true }));
      return;
    }

    let circulatingVSD = 0;
    let circulatingVSDLite = 0;

    accounts.forEach(account => {
      circulatingVSD += account.vsdBalance || 0;
      circulatingVSDLite += account.vsdLiteBalance || 0;
    });

    const treasuryVSD = metrics.totalSupply - circulatingVSD;

    setMetrics({
      totalSupply: metrics.totalSupply,
      circulatingVSD,
      treasuryVSD,
      circulatingVSDLite,
      loading: false,
    });

  }, [accounts, isAccountsLoading, isUserLoading, metrics.totalSupply]);

  const simulateAirdrop = (distribution: {[uid: string]: number}) => {
    let totalDistributed = 0;
    const preview: {[uid: string]: number} = {};

    for (const uid in distribution) {
      preview[uid] = distribution[uid];
      totalDistributed += distribution[uid];
    }

    setAirdropPreview(preview);

    return totalDistributed <= metrics.treasuryVSD
      ? `Airdrop of ${totalDistributed.toLocaleString()} VSD is valid.`
      : `Airdrop exceeds treasury! Max available: ${metrics.treasuryVSD.toLocaleString()}`;
  };

  return { metrics, airdropPreview, simulateAirdrop };
}
