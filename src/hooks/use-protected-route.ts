'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import type { IdTokenResult } from 'firebase/auth';

interface ProtectionOptions {
  adminOnly?: boolean;
  advertiserOnly?: boolean;
}

// Hardcoded Super Admin UID
const SUPER_ADMIN_UID = 'eiMBgcJ3KhWGesl8J78oYFHiquy2'; // support@vndrmusic.com

export function useProtectedRoute({ adminOnly = false, advertiserOnly = false }: ProtectionOptions = {}) {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const router = useRouter();
  const [roles, setRoles] = useState<string[]>([]);
  const [claims, setClaims] = useState<IdTokenResult['claims'] | null>(null);
  const [isClaimsLoading, setClaimsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult(true).then(idTokenResult => { // Force refresh
        setClaims(idTokenResult.claims);
        setRoles(idTokenResult.claims.roles || []);
        setClaimsLoading(false);
      }).catch(() => {
        setClaimsLoading(false);
      });
    } else if (!isAuthLoading) {
      setClaimsLoading(false);
    }
  }, [user, isAuthLoading]);

  const isLoading = isAuthLoading || isClaimsLoading;
  
  const isSuperAdmin = user?.uid === SUPER_ADMIN_UID || claims?.superAdmin === true;
  const hasAdminRole = roles.includes('admin');
  const hasAdvertiserRole = roles.includes('advertiser');
  
  const isAdmin = isSuperAdmin || hasAdminRole;
  const isAdvertiser = isSuperAdmin || hasAdvertiserRole;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }
    
    if (adminOnly && !isAdmin) {
      console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Admin.`);
      router.push('/dashboard');
      return;
    }
    
    if (advertiserOnly && !isAdvertiser) {
      console.warn(`Protected Route: Access denied for user ${user.uid}. Required: Advertiser.`);
      router.push('/dashboard');
      return;
    }

  }, [user, isLoading, isAdmin, isAdvertiser, adminOnly, advertiserOnly, router]);

  return { isLoading, isAdmin, isAdvertiser };
}
