'use client';

import React, { useEffect, useState } from "react";
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, getDocs, Timestamp, type Firestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, type Auth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config"; // Use the project's actual config

// --- Type Definition ---
interface Transaction {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Timestamp;
}

// --- Firebase Initialization ---
let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

firestore = getFirestore(app);
auth = getAuth(app);


// ------------------------
// Transactions Prototyper Component
// ------------------------
export default function TransactionsPrototyper() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const ensureAuth = async () => {
      return new Promise<void>((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            try {
              await signInAnonymously(auth);
              console.log("Signed in anonymously.");
              resolve();
            } catch (err: any) {
              console.error("Anonymous sign-in failed:", err);
              reject(err.message || "Auth error");
            }
          } else {
            console.log("User is already authenticated:", user.uid);
            resolve();
          }
        });
      });
    };

    const setupTransactions = async () => {
      try {
        const colRef = collection(firestore, "transactions");
        const snapshot = await getDocs(colRef);

        // Auto-add sample data if empty
        if (snapshot.empty) {
          console.log("Transactions collection is empty. Adding sample data...");
          await addDoc(colRef, { amount: 100, status: "pending", createdAt: new Date() });
          await addDoc(colRef, { amount: 50, status: "completed", createdAt: new Date() });
          await addDoc(colRef, { amount: 75, status: "failed", createdAt: new Date() });
          console.log("Sample data added.");
        }

        // Real-time subscription
        unsubscribe = onSnapshot(
          colRef,
          (snap) => {
            const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Transaction));
            setTransactions(docs);
            setLoading(false);
          },
          (err) => {
            console.error("onSnapshot error:", err);
            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err: any) {
        console.error("Error setting up transactions:", err);
        setError(err.message || "Error setting up transactions");
        setLoading(false);
      }
    };

    setLoading(true);
    ensureAuth()
      .then(setupTransactions)
      .catch((err: any) => {
        setError(err);
        setLoading(false);
      });

    return () => {
      if (unsubscribe) {
        console.log("Unsubscribing from transactions.");
        unsubscribe();
      }
    };
  }, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="p-4 bg-card rounded-lg shadow">
            Amount: {t.amount} - Status: {t.status} (
            {t.createdAt?.toDate?.().toLocaleString() ?? 'No date'})
          </li>
        ))}
      </ul>
    </div>
  );
}