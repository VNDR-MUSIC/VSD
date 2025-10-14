
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDoc, useFirestore, useUser } from '@/firebase';
import type { Account } from '@/types/account';
import { doc } from 'firebase/firestore';

export function useProtectedRoute({ adminOnly = false }: { adminOnly?: boolean } = {}) {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const accountDocRef = (user && firestore) ? doc(firestore, 'accounts', user.uid) : null;
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountDocRef);

  const [isCheckingAdmin, setIsCheckingAdmin] = useState(adminOnly);

  useEffect(() => {
    if (isAuthLoading) {
      return; // Wait until auth state is resolved.
    }

    if (!user) {
      // If user is not authenticated, redirect to login.
      router.push('/login');
      return;
    }

    // If we require admin access, we need to wait for the account data to load.
    if (adminOnly) {
      if (isAccountLoading) {
        return; // Wait for the user's account document to load.
      }
      
      // Once account data is loaded, check the isAdmin flag.
      if (!account?.isAdmin) {
        // If user is not an admin, redirect to dashboard (or a dedicated 'unauthorized' page).
        router.push('/dashboard');
      } else {
        // User is an admin, checking is complete.
        setIsCheckingAdmin(false);
      }
    } else {
        // If adminOnly is false, we don't need to check the flag.
        setIsCheckingAdmin(false);
    }
  }, [user, isAuthLoading, router, adminOnly, account, isAccountLoading]);

  // The overall loading state is true if:
  // 1. We are still waiting for the initial authentication check.
  // 2. We require admin access and are still waiting for the account document to load.
  const isLoading = isAuthLoading || (adminOnly && (isAccountLoading || isCheckingAdmin));

  return { isLoading };
}
