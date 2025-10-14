
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import type { Account } from '@/types/account'; // We will create this type

export function useProtectedRoute({ adminOnly = false }: { adminOnly?: boolean } = {}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until the user state is determined
    }

    if (!user) {
      // If not authenticated, redirect to login
      router.push('/login');
      return;
    }

    if (adminOnly) {
      // We need to fetch the user's account data to check the isAdmin flag.
      // This part assumes you have a way to get the full account details.
      // For now, we'll redirect if not explicitly an admin. This needs a proper implementation.
      // This is a simplified check. A real app would fetch the user's profile from Firestore.
      // For this implementation, we can't fetch from firestore here, so we will assume the check is not possible yet.
      // The logic will be updated once we can fetch the user profile.
    }
  }, [user, isUserLoading, router, adminOnly]);

  // Return loading state so the component can show a skeleton
  return { isLoading: isUserLoading || !user };
}
