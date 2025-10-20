'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';

const PROXY_URL = process.env.NEXT_PUBLIC_ADMIN_PROXY_URL || 'http://localhost:5001/vsd-network/us-central1/adminProxy';

async function fetchWithAuth(url: string, options: RequestInit = {}, idToken: string | null) {
    if (!idToken) {
        throw new Error('Authentication required.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${idToken}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch from admin proxy' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export function useAdminProxy<T>(collectionName: string) {
    const [data, setData] = useState<T[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, isUserLoading } = useUser();
    const auth = useAuth(); // Correctly use the hook here

    useEffect(() => {
        if (isUserLoading) {
            return; // Wait until user auth state is resolved
        }
        if (!user || !auth) {
            setIsLoading(false);
            // Don't set an error here, as it might be an expected state (e.g., logged out user)
            // The component using the hook should decide what to do if there's no user.
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const idToken = await user.getIdToken(true);
                const result = await fetchWithAuth(`${PROXY_URL}?collection=${collectionName}`, {}, idToken);
                setData(result.docs);
            } catch (err: any) {
                setError(err.message);
                console.error(`Failed to fetch collection ${collectionName}:`, err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [collectionName, user, isUserLoading, auth]); // Depend on user, auth, and loading state

    return { data, isLoading, error };
}

export async function adminProxyCreate(collection: string, data: any) {
    const { getAuth } = await import('firebase/auth');
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("Authentication required for admin operation.");
    const idToken = await auth.currentUser.getIdToken(true);

    return fetchWithAuth(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({ op: 'create', collection, data }),
    }, idToken);
}

export async function adminProxyWrite(collection: string, docId: string, data: any) {
     const { getAuth } = await import('firebase/auth');
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("Authentication required for admin operation.");
    const idToken = await auth.currentUser.getIdToken(true);

    return fetchWithAuth(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({ op: 'write', collection, docId, data }),
    }, idToken);
}

export async function adminProxyDelete(collection: string, docId: string) {
     const { getAuth } = await import('firebase/auth');
    const auth = getAuth();
    if (!auth.currentUser) throw new Error("Authentication required for admin operation.");
    const idToken = await auth.currentUser.getIdToken(true);
    
    return fetchWithAuth(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({ op: 'delete', collection, docId }),
    }, idToken);
}
