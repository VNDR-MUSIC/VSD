
"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FirebaseClientProvider, initializeFirebase } from "@/firebase";

function AdminTestContent() {
  const [status, setStatus] = useState("Initializing...");
  const [userUID, setUserUID] = useState<string | null>(null);
  const [tokenClaims, setTokenClaims] = useState<any>(null);
  const [firestoreData, setFirestoreData] = useState<any>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      setStatus("Checking user...");

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setStatus("No user logged in. Please log in first.");
          return;
        }

        setUserUID(user.uid);
        setStatus("User found. Forcing token refresh to get latest claims...");

        const idTokenResult = await user.getIdTokenResult(true);
        setTokenClaims(idTokenResult.claims);

        const isSuperAdmin = idTokenResult.claims.superAdmin === true;

        if (!isSuperAdmin) {
            setStatus("User is NOT a super admin based on claims. Testing direct UID match...");
            if (user.uid !== "eiMBgcJ3KhWGesl8J78oYFHiquy2") {
                 setStatus("UID does not match hardcoded super admin. Access would be denied by rules.");
                 return;
            }
        }
        
        setStatus("Admin access confirmed via claims or UID. Attempting to fetch Firestore data...");

        const db = getFirestore();
        const testCollection = collection(db, "tenants"); // A known admin-only collection
        const snapshot = await getDocs(testCollection);

        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFirestoreData(docs);

        setStatus("Firestore data fetched successfully! Rules are working correctly.");
      } catch (error: any) {
        console.error(error);
        setStatus("Error: " + error.message);
        setErrorDetails(JSON.stringify(error, null, 2));
      }
    };

    init();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'monospace', color: '#f8f8f2', background: '#282a36', borderRadius: '8px', margin: '20px', border: '1px solid #44475a' }}>
      <h1 style={{ color: '#50fa7b', borderBottom: '1px solid #44475a', paddingBottom: '10px' }}>🛠 Admin Access Diagnostic</h1>
      <div style={{ background: '#44475a', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <p style={{ margin: 0 }}><strong>Status:</strong> {status}</p>
      </div>
      <p style={{ marginTop: '20px' }}><strong>Current UID:</strong> {userUID || 'Not available'}</p>
      
      <h3 style={{ color: '#ff79c6', marginTop: '20px' }}>Token Claims:</h3>
      <pre style={{ background: '#21222c', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {JSON.stringify(tokenClaims, null, 2) || 'No claims loaded.'}
      </pre>

      <h3 style={{ color: '#8be9fd', marginTop: '20px' }}>Firestore Data (from 'tenants'):</h3>
      <pre style={{ background: '#21222c', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {firestoreData ? JSON.stringify(firestoreData, null, 2) : 'No data fetched or error occurred.'}
      </pre>

      {errorDetails && (
        <>
            <h3 style={{ color: '#ff5555', marginTop: '20px' }}>Error Details:</h3>
            <pre style={{ background: '#21222c', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#ffb86c' }}>
                {errorDetails}
            </pre>
        </>
      )}

      <p style={{ color: '#ff5555', marginTop: '30px', borderTop: '1px solid #44475a', paddingTop: '15px' }}>⚠ This page is for testing only. It attempts direct Firestore access based on the logged-in user's claims.</p>
    </div>
  );
}


export default function AdminTestPage() {
    // This page needs its own provider context since it's a standalone test
    return (
        <FirebaseClientProvider>
            <AdminTestContent />
        </FirebaseClientProvider>
    )
}
