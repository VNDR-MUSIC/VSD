
'use client';

import { useEffect } from 'react';
import { useUser } from '@/firebase';

// Extend the Window interface to include sessionRewind
declare global {
  interface Window {
    sessionRewind?: {
      identifyUser: (userInfo: { userId: string; [key: string]: string }) => void;
      // Add other methods as needed
    };
  }
}

/**
 * This component handles identifying the user for Session Rewind.
 * It's a client component that runs in the browser and does not render any UI.
 */
export function SessionRewindIdentifier() {
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Wait until authentication state is resolved
    if (isUserLoading) {
      return;
    }

    // Check if the sessionRewind SDK is available on the window object
    if (typeof window.sessionRewind === 'object' && window.sessionRewind !== null) {
      if (user) {
        // If a user is logged in, identify them
        console.log('SessionRewind: Identifying user', user.uid);
        window.sessionRewind.identifyUser({
          userId: user.uid,
          email: user.email || 'Not Provided',
          displayName: user.displayName || 'Anonymous',
        });
      }
    }
  }, [user, isUserLoading]);

  // This component renders nothing.
  return null;
}
