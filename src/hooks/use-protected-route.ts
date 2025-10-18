'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { IdTokenResult } from 'firebase/auth';

interface ProtectionOptions {
  adminOnly?: boolean;
  advertiserOnly?: boolean;
}

// Hardcoded Super Admin UID for client-side checks
const SUPER_ADMIN_UID = 'eiMBgcJ3KhWGesl8J78oYFHiquy2'; 

export function useProtectedRoute({ adminOnly = false, advertiserOnly = false }: ProtectionOptions = {}) {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdvertiser, setIsAdvertiser] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      if (isAuthLoading) {
        return;
      }
      
      if (!user) {
        router.push('/login');
        return;
      }

      // 1. Check for Super Admin claim or UID
      const idTokenResult = await user.getIdTokenResult(true); // Force refresh claims
      const isSuperAdmin = idTokenResult.claims.superAdmin === true || user.uid === SUPER_ADMIN_UID;
      
      // 2. Check for regular admin role from Firestore as a fallback
      let isRegularAdmin = false;
      if (firestore) {
          const adminDocRef = doc(firestore, 'admins', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          isRegularAdmin = adminDoc.exists();
      }
      
      const finalIsAdmin = isSuperAdmin || isRegularAdmin;
      setIsAdmin(finalIsAdmin);

      // 3. Check for advertiser role from account document
      let finalIsAdvertiser = false;
      if (firestore) {
          const accountDocRef = doc(firestore, 'accounts', user.uid);
          const accountDoc = await getDoc(accountDocRef);
          if (accountDoc.exists()) {
              const accountData = accountDoc.data();
              finalIsAdvertiser = accountData.roles?.includes('advertiser') || false;
          }
      }
      setIsAdvertiser(finalIsAdvertiser);
      
      // 4. Enforce route protection
      if (adminOnly && !finalIsAdmin) {
        console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Admin.`);
        router.push('/dashboard');
      } else if (advertiserOnly && !finalIsAdvertiser) {
        console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Advertiser.`);
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    };

    checkPermissions();

  }, [user, isAuthLoading, firestore, adminOnly, advertiserOnly, router]);

  return { isLoading, isAdmin, isAdvertiser };
}
