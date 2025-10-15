'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import type { Account } from '@/types/account';
import { doc } from 'firebase/firestore';

interface ProtectionOptions {
  adminOnly?: boolean;
  advertiserOnly?: boolean;
}

export function useProtectedRoute({ adminOnly = false, advertiserOnly = false }: ProtectionOptions = {}) {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const accountDocRef = useMemoFirebase(() => (user && firestore ? doc(firestore, 'accounts', user.uid) : null), [firestore, user]);
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountDocRef);
  
  const [isCheckingRoles, setIsCheckingRoles] = useState(adminOnly || advertiserOnly);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    if (adminOnly || advertiserOnly) {
      if (isAccountLoading) {
        return;
      }
      
      const userRoles = account?.roles || [];
      const userIsAdmin = userRoles.includes('admin');
      setIsAdmin(userIsAdmin);
      
      if (adminOnly && !userIsAdmin) {
          router.push('/dashboard');
          return;
      }
      
      if (advertiserOnly) {
        const isAdvertiser = userRoles.includes('advertiser');
        if (!isAdvertiser) {
          router.push('/dashboard');
          return;
        }
      }
      
      setIsCheckingRoles(false);

    } else {
      setIsCheckingRoles(false);
    }
  }, [user, isAuthLoading, router, adminOnly, advertiserOnly, account, isAccountLoading]);

  const isLoading = isAuthLoading || ( (adminOnly || advertiserOnly) && (isAccountLoading || isCheckingRoles));

  return { isLoading, isCheckingRoles, isAdmin };
}
