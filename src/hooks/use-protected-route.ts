
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

const SUPER_ADMIN_UIDS = ['lzNhwweRAndUfVzCzrAEcXLSrcs1', 'eiMBgcJ3KhWGesl8J78oYFHiquy2', 'd2rM2R6Z4gYy3v9kY8sF5hE7gQy1'];


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
    
    // --- Super Admin Bootstrap ---
    // This grants initial access to the first admin.
    const isSuperAdmin = SUPER_ADMIN_UIDS.includes(user.uid);
    if (adminOnly && isSuperAdmin) {
        setIsAdmin(true);
        setIsCheckingRoles(false);
        return; // Bypass further checks for the super admin
    }
    // --- End Super Admin Bootstrap ---

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
