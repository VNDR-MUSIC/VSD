
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

type AuthSuccessCallback = (userCredential: UserCredential) => void;
type AuthErrorCallback = (error: any) => void;


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(
    authInstance: Auth,
    onSuccess: AuthSuccessCallback,
    onError: AuthErrorCallback
): void {
  signInAnonymously(authInstance).then(onSuccess).catch(onError);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(
    authInstance: Auth,
    email: string,
    password: string,
    onSuccess: AuthSuccessCallback,
    onError: AuthErrorCallback
): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then(onSuccess)
    .catch(onError);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(
    authInstance: Auth,
    email: string,
    password: string,
    onSuccess: AuthSuccessCallback,
    onError: AuthErrorCallback
): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .then(onSuccess)
    .catch(onError);
}
