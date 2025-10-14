
'use client';

import * as React from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import type { Account } from '@/types/account';

export function LoginClient() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setGoogleLoading] = React.useState(false);

  const handleAuthSuccess = (userCredential: UserCredential) => {
    const user = userCredential.user;
    const isNewUser = userCredential.metadata.creationTime === userCredential.metadata.lastSignInTime;

    if (isNewUser) {
        console.log("New user detected, creating account document...");
        const accountDoc: Account = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || 'New User',
            photoURL: user.photoURL || '',
            walletAddress: `0x${user.uid.slice(0,10)}...`, // Placeholder
            vsdBalance: 0,
            status: 'Active',
            joined: new Date().toISOString(),
            isAdmin: false,
        };
        const userDocRef = doc(firestore, 'accounts', user.uid);
        setDocumentNonBlocking(userDocRef, accountDoc, { merge: true });
    }

    toast({
      title: 'Login Successful',
      description: 'You have successfully signed in.',
    });
    router.push('/dashboard');
  };

  const handleAuthError = (error: any, action: 'Sign-in' | 'Sign-up') => {
    console.error(`Firebase Auth Error (${action}):`, error);
    toast({
      variant: 'destructive',
      title: `${action} Failed`,
      description: error.message || `An unknown error occurred during ${action.toLowerCase()}.`,
    });
  };

  const handleEmailPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>, action: 'signin' | 'signup') => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        if (action === 'signup') {
            initiateEmailSignUp(auth, email, password, handleAuthSuccess, (err) => handleAuthError(err, 'Sign-up'));
        } else {
            initiateEmailSignIn(auth, email, password, handleAuthSuccess, (err) => handleAuthError(err, 'Sign-in'));
        }
    } catch (error: any) {
        handleAuthError(error, action === 'signup' ? 'Sign-up' : 'Sign-in');
    } finally {
        // isLoading will be reset by the callback in a real scenario
        // but for now, we'll let it be. The user will be redirected on success.
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      handleAuthSuccess(userCredential);
    } catch (error: any) {
      handleAuthError(error, 'Sign-in');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
            <form onSubmit={(e) => handleEmailPasswordSubmit(e, 'signin')}>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
                <CardDescription>Sign in to access your dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input id="email-signin" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input id="password-signin" name="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" disabled={isLoading || isGoogleLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
                <Separator className="my-2" />
                <Button type='button' onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading} variant="outline" className="w-full">
                   {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
            <form onSubmit={(e) => handleEmailPasswordSubmit(e, 'signup')}>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                <CardDescription>Join the VSD Network today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" name="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" disabled={isLoading || isGoogleLoading} className="w-full">
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
                 <Separator className="my-2" />
                 <Button type='button' onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading} variant="outline" className="w-full">
                    {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Chrome className="mr-2 h-4 w-4" /> Sign up with Google
                 </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
