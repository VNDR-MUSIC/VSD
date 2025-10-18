
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import type { Account } from '@/types/account';
import { doc } from 'firebase/firestore';

interface ProtectionOptions {
  adminOnly?: boolean;
  advertiserOnly?: boolean;
}

// Permanent Super Admin UID
const SUPER_ADMIN_UIDS = ['eiMBgcJ3KhWGesl8J78oYFHiquy2']; // support@vndrmusic.com

export function useProtectedRoute({ adminOnly = false, advertiserOnly = false }: ProtectionOptions = {}) {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const accountDocRef = useMemoFirebase(() => (user && firestore ? doc(firestore, 'accounts', user.uid) : null), [firestore, user]);
  const { data: account, isLoading: isAccountLoading } = useDoc<Account>(accountDocRef);
  
  const isLoading = isAuthLoading || isAccountLoading;
  
  // --- Permanent Super Admin Check ---
  const isSuperAdmin = user ? SUPER_ADMIN_UIDS.includes(user.uid) : false;
  
  // --- Role-based Check ---
  const userRoles = account?.roles || [];
  const hasAdminRole = userRoles.includes('admin');
  const hasAdvertiserRole = userRoles.includes('advertiser');

  // Final permission status, granting access if super admin or has the required role
  const isAdmin = isSuperAdmin || hasAdminRole;
  const isAdvertiser = isSuperAdmin || hasAdvertiserRole;

  useEffect(() => {
    // If still loading auth or account data, do nothing yet.
    if (isLoading) {
      return;
    }

    // If no user is logged in, redirect to login page.
    if (!user) {
      router.push('/login');
      return;
    }
    
    // If this route is for admins only and the user is not an admin, redirect.
    if (adminOnly && !isAdmin) {
        console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Admin.`);
        router.push('/dashboard');
        return;
    }
    
    // If this route is for advertisers only and the user is not an advertiser (or admin), redirect.
    if (advertiserOnly && !isAdvertiser) {
        console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Advertiser.`);
        router.push('/dashboard');
        return;
    }

  }, [user, isLoading, isAdmin, isAdvertiser, adminOnly, advertiserOnly, router]);


  return { isLoading, isAdmin, isAdvertiser };
}
