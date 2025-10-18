
'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type ProxyListResponse = { ok: true; docs: any[] } | { ok?: false; error?: string; detail?: any };
type ProxyWriteResponse = { ok: true } | { ok?: false; error?: string; detail?: any };

const REGION = process.env.NEXT_PUBLIC_FUNCTION_REGION || 'us-central1';
const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '';
const FUNCTION_NAME = 'adminProxy';

if (!PROJECT) {
  console.warn('[admin-stable] NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in your environment variables.');
}

function adminProxyUrl(path = '') {
  // Use the live URL for the deployed function.
  // In a local Firebase emulator environment, you might need a different URL.
  // For Firebase App Hosting, this should correctly point to the deployed function.
  return `https://${REGION}-${PROJECT}.cloudfunctions.net/${FUNCTION_NAME}${path}`;
}

export default function AdminStablePage() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>('Initializing admin page...');
  const [accounts, setAccounts] = useState<any[] | null>(null);
  const [tenants, setTenants] = useState<any[] | null>(null);
  const [lastError, setLastError] = useState<any>(null);
  const [proxyBusy, setProxyBusy] = useState(false);

  async function getFreshIdToken() {
    if (!auth.currentUser) throw new Error('No authenticated user');
    return await auth.currentUser.getIdToken(true);
  }

  async function refreshClaims() {
    try {
      if (!auth.currentUser) return;
      const idRes = await auth.currentUser.getIdTokenResult(false); // don't force refresh, just get current
      setClaims(idRes.claims);
      console.log('[admin-stable] token claims:', idRes.claims);
      setStatus('Claims refreshed.');
    } catch (err) {
      console.error('[admin-stable] refreshClaims error', err);
      setLastError(err);
      setStatus('Failed to refresh claims.');
    }
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (!u) {
        setStatus('No user signed in — redirect to /login or sign in.');
        setLoading(false);
        return;
      }
      setStatus(`Signed in as ${u.email} (${u.uid}) — refreshing token...`);
      try {
        await u.getIdToken(true); // Force refresh on initial load
        await refreshClaims();
        setStatus('Token refreshed. Ready.');
      } catch (err) {
        console.error('[admin-stable] token refresh failed', err);
        setLastError(err);
        setStatus('Token refresh failed — inspect console.');
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function proxyList(collectionName: string) {
    setProxyBusy(true);
    setLastError(null);
    setStatus(`Proxy: listing ${collectionName}...`);
    try {
      const token = await getFreshIdToken();
      const url = adminProxyUrl(`?collection=${encodeURIComponent(collectionName)}&limit=200`);
      const res = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
      const json: ProxyListResponse = await res.json();
      if (!res.ok || (json as any).ok !== true) {
        console.error('[admin-stable] proxyList error raw', res.status, json);
        setLastError({ status: res.status, body: json });
        setStatus(`Proxy read error (${res.status}): ${json?.error || (json?.detail as string) || 'unknown'}`);
        return json;
      }
      setStatus(`Proxy read success: ${collectionName} → ${json.docs.length} docs`);
      return json;
    } catch (err: any) {
      console.error('[admin-stable] proxyList exception', err);
      setLastError(err);
      setStatus('Proxy error — see console.');
      return { ok: false, error: 'exception', detail: String(err) } as any;
    } finally {
      setProxyBusy(false);
    }
  }

  async function proxyPost(payload: any) {
    setProxyBusy(true);
    setLastError(null);
    setStatus(`Proxy: performing ${payload.op} on ${payload.collection}...`);
    try {
      const token = await getFreshIdToken();
      const url = adminProxyUrl('');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(payload),
      });
      const json: ProxyWriteResponse = await res.json();
      if (!res.ok || (json as any).ok !== true) {
        console.error('[admin-stable] proxyPost error raw', res.status, json);
        setLastError({ status: res.status, body: json });
        setStatus(`Proxy write error: ${json?.error || (json?.detail as string) || 'unknown'}`);
        return json;
      }
      setStatus(`Proxy write success: op=${payload.op}`);
      return json;
    } catch (err: any) {
      console.error('[admin-stable] proxyPost exception', err);
      setLastError(err);
      setStatus('Proxy error — see console.');
      return { ok: false, error: 'exception', detail: String(err) } as any;
    } finally {
      setProxyBusy(false);
    }
  }

  const handleListAccounts = async () => {
    const res = await proxyList('accounts');
    if (res && (res as any).ok) setAccounts((res as any).docs);
  };

  const handleListTenants = async () => {
    const res = await proxyList('tenants');
    if (res && (res as any).ok) setTenants((res as any).docs);
  };

  const handleCreateDebugDoc = async () => {
    const payload = { op: 'create', collection: 'admin_debug_test', data: { createdBy: user?.uid || 'unknown', createdAt: new Date().toISOString() } };
    const res = await proxyPost(payload);
    console.log('create debug doc result', res);
  };

  const isSupport = user?.email === 'support@vndrmusic.com' || user?.uid === 'eiMBgcJ3KhWGesl8J78oYFHiquy2';

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Admin — Stable Access</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Guaranteed proxy-based admin access. Use only while debugging.</p>
        </header>

        <section className="mb-6 p-4 bg-white dark:bg-slate-800 rounded shadow">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm">Status:</div>
              <div className="font-medium">{status}</div>
            </div>
            <div className="text-right text-xs">
              <div>User: <strong>{user?.email ?? 'Not signed in'}</strong></div>
              <div>UID: <code className="text-xs">{user?.uid ?? '-'}</code></div>
              <div>Support forced: <strong>{isSupport ? 'YES' : 'NO'}</strong></div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => auth.signOut()} disabled={proxyBusy} variant="destructive">Sign out</Button>
            <Button onClick={refreshClaims} disabled={proxyBusy || loading} variant="secondary">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Refresh claims
            </Button>
            <Button onClick={() => { console.log('user object:', user); console.log('claims:', claims); alert('See console for user & claims') }} disabled={proxyBusy} variant="outline">Dump user & claims</Button>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
            <h3 className="font-semibold mb-2">Collections (read)</h3>
            <Button className="w-full mb-2" onClick={handleListAccounts} disabled={proxyBusy || loading}>List /accounts</Button>
            <Button className="w-full mb-2" onClick={handleListTenants} disabled={proxyBusy || loading}>List /tenants</Button>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
            <h3 className="font-semibold mb-2">Create (admin)</h3>
            <Button className="w-full mb-2" onClick={handleCreateDebugDoc} disabled={proxyBusy || loading}>Create debug doc</Button>
            <Button className="w-full mb-2" onClick={() => proxyPost({ op: 'delete', collection: 'admin_debug_test', docId: '' })} disabled={proxyBusy || loading} variant="destructive">
              (Delete sample — requires docId)
            </Button>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded shadow">
            <h3 className="font-semibold mb-2">Last results & errors</h3>
            <div className="text-xs mb-2">Last error (console has full object):</div>
            <pre className="text-xs bg-slate-100 dark:bg-slate-900 p-2 rounded max-h-40 overflow-auto">{JSON.stringify(lastError, null, 2)}</pre>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Accounts (proxy)</h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
            {proxyBusy && !accounts ? <Loader2 className="animate-spin"/> : !accounts ? <div className="text-sm text-slate-500">No data. Click "List /accounts".</div> : null}
            {accounts && accounts.length === 0 && <div className="text-sm text-slate-500">No accounts found.</div>}
            {accounts && accounts.length > 0 &&
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {accounts.map((a) => (
                  <li key={a.id} className="p-2 border rounded bg-slate-50 dark:bg-slate-700/50">
                    <div><strong>{a.displayName || a.email}</strong> <code className="text-xs">({a.id})</code></div>
                    <pre className="text-xs mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded">{JSON.stringify(a, null, 2)}</pre>
                  </li>
                ))}
              </ul>
            }
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-2">Tenants (proxy)</h2>
          <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
            {proxyBusy && !tenants ? <Loader2 className="animate-spin"/> : !tenants ? <div className="text-sm text-slate-500">No data. Click "List /tenants".</div> : null}
            {tenants && tenants.length === 0 && <div className="text-sm text-slate-500">No tenants found.</div>}
            {tenants && tenants.length > 0 && tenants.map(t => (
              <div key={t.id} className="p-2 mb-2 border rounded bg-slate-50 dark:bg-slate-700/50">
                <div><strong>{t.name}</strong> <code className="text-xs">({t.id})</code></div>
                <pre className="text-xs mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded">{JSON.stringify(t, null, 2)}</pre>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-xs text-slate-500">
          <div>Note: This admin page uses the <code>{FUNCTION_NAME}</code> server function. Make sure it is deployed and that you have signed out/in to refresh claims.</div>
        </footer>
      </div>
    </div>
  );
}
