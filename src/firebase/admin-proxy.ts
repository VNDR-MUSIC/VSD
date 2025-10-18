'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';

const PROXY_URL = process.env.NEXT_PUBLIC_ADMIN_PROXY_URL || 'http://127.0.0.1:5001/vsd-network/us-central1/adminProxy';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const auth = useAuth.getState().auth;
    if (!auth || !auth.currentUser) {
        throw new Error('Authentication required.');
    }
    const idToken = await auth.currentUser.getIdToken(true);

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
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetchWithAuth(`${PROXY_URL}?collection=${collectionName}`);
                setData(result.docs);
            } catch (err: any) {
                setError(err.message);
                console.error(`Failed to fetch collection ${collectionName}:`, err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [collectionName, user]);

    return { data, isLoading, error };
}

export async function adminProxyCreate(collection: string, data: any) {
    return fetchWithAuth(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({ op: 'create', collection, data }),
    });
}

export async function adminProxyWrite(collection: string, docId: string, data: any) {
    return fetchWithAuth(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({ op: 'write', collection, docId, data }),
    });
}
