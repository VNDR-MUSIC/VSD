
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
      
      const isDesignatedAdmin = user.email === 'support@vndrmusic.com';
      const userRoles = account?.roles || [];

      if (adminOnly) {
        if (!isDesignatedAdmin && !userRoles.includes('admin')) {
          router.push('/dashboard');
          return;
        }
      }
      
      if (advertiserOnly) {
        if (!userRoles.includes('advertiser')) {
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

  return { isLoading };
}
