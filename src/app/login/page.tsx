'use client';

import { useEffect } from 'react';
import { auth } from '@/services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';

// Metadata is defined for reference, but this is a Client Component.
// For SEO, this page would ideally have a Server Component parent setting the metadata.
export const metadata: Metadata = {
  title: 'Login to VSD Network',
  description: 'Sign in to access your VSD Network dashboard, manage your tokens, and interact with the IMG ecosystem.',
};

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Login Successful',
        description: 'You have successfully signed in.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'An unknown error occurred during sign-in.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Access Your VSD Account</CardTitle>
          <CardDescription>Sign in to access your dashboard and banking features.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleSignIn} className="w-full btn-hover-effect" size="lg">
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
