
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

  // The doc ref is now conditional on both `user` and `firestore` being available.
  const accountDocRef = (user && firestore) ? doc(firestore, 'accounts', user.uid) : null;
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountDocRef);

  const [isCheckingAdmin, setIsCheckingAdmin] = useState(adminOnly);

  useEffect(() => {
    // Wait until Firebase has determined the auth state.
    if (isAuthLoading) {
      return;
    }

    // If auth state is resolved and there's no user, redirect to login.
    if (!user) {
      router.push('/login');
      return;
    }

    // If admin access is required, perform the checks.
    if (adminOnly) {
      // Wait for the user's account document to load from Firestore.
      if (isAccountLoading) {
        return;
      }
      
      // Special override for the designated support email.
      const isDesignatedAdmin = user.email === 'support@vndrmusic.com';
      
      // Once account data is available, check for the isAdmin flag or if they are the designated admin.
      if (!isDesignatedAdmin && !account?.isAdmin) {
        // If the user is not an admin, redirect them away from the admin page.
        router.push('/dashboard');
      } else {
        // The user is an admin, so we can stop the admin check.
        setIsCheckingAdmin(false);
      }
    } else {
        // If admin access is not required, the check is complete.
        setIsCheckingAdmin(false);
    }
  }, [user, isAuthLoading, router, adminOnly, account, isAccountLoading]);

  // The overall loading state is true if we are still authenticating,
  // or if we require admin privileges and are still in the process of verifying them.
  const isLoading = isAuthLoading || (adminOnly && (isAccountLoading || isCheckingAdmin));

  return { isLoading };
}
