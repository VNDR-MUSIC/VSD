
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";

export default function AdminDebugPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        // Not logged in: redirect to login
        router.push("/login");
        return;
      }

      // TEMPORARY FORCE ACCESS FOR DEBUGGING
      if (user.email === "support@vndrmusic.com") {
        console.log("[DEBUG] Forced admin access granted to support@vndrmusic.com");
        setAccessGranted(true);
        return;
      }
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <div>Loading authentication...</div>;
  }

  if (!accessGranted) {
    return <div>Access denied. Your email ({user.email}) does not have debug admin rights.</div>;
  }

  return (
    <div style={{ padding: "2rem", color: "white", fontFamily: "monospace" }}>
      <h1>🔥 Admin Debug Page 🔥</h1>
      <p>Forced access granted for debugging purposes.</p>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>

      <hr style={{ margin: "1rem 0" }} />

      <h2>Quick Admin Actions</h2>
      <ul>
        <li>Test Firestore reads/writes from this client.</li>
        <li>Log actual permission errors from direct client access.</li>
        <li>Bypass admin-only Firestore collections temporarily.</li>
      </ul>

      <hr style={{ margin: "1rem 0" }} />

      <h2>Debug Console</h2>
      <button
        style={{ padding: '8px 12px', background: '#D00039', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={async () => {
          const claims = await user.getIdTokenResult();
          console.log("[DEBUG] Current user object:", user);
          console.log("[DEBUG] ID Token Claims:", claims);
          alert("Check the developer console for full user object and token claims.");
        }}
      >
        Show User Info in Console
      </button>
    </div>
  );
}
