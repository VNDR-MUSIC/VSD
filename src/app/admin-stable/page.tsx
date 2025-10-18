
'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFirebaseApp } from "@/firebase";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StableAdminPage() {
  const router = useRouter();
  const firebaseApp = useFirebaseApp(); // Use hook to get the initialized app
  const auth = getAuth(firebaseApp);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login"); // redirect non-auth users
      } else if (user.email !== "preston@vndrmusic.com") { // Hard-coding the super admin for stability
        router.replace("/dashboard"); // block unauthorized users
      } else {
        // Successful authentication, redirect to the admin dashboard
        router.replace("/admin");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth, router]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="max-w-md w-full text-center shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Admin Stable Access</CardTitle>
                <CardDescription>Verifying your credentials...</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                <p className="text-muted-foreground">Authentication successful. Redirecting...</p>
                <p className="text-xs text-muted-foreground">You will be redirected if your account does not have the required permissions.</p>
            </CardContent>
        </Card>
    </div>
  );
}
