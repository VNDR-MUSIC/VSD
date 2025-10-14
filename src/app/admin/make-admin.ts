// This is a one-time script to add an admin user to the database.
// In a real application, this logic would live in a secure backend environment
// (e.g., a Cloud Function) and be triggered by an authorized user.
'use server';

import { initializeFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function addAdminUser(uid: string) {
  if (!uid) {
    throw new Error('A user ID must be provided to make a user an admin.');
  }
  
  // This function would typically have its own authentication and authorization
  // to ensure only existing admins can add new ones. For this fix, we are
  // running it directly.

  console.log(`Attempting to make user ${uid} an admin...`);

  try {
    const { firestore } = initializeFirebase();
    const adminDocRef = doc(firestore, 'admins', uid);
    
    await setDoc(adminDocRef, {
      uid: uid,
      addedAt: new Date().toISOString()
    });

    console.log(`Successfully created admin entry for user ${uid}.`);
    
    // Also update the user's own account document to reflect the role.
    const accountDocRef = doc(firestore, 'accounts', uid);
    await setDoc(accountDocRef, { roles: ['admin', 'user'] }, { merge: true });
    
    console.log(`Successfully updated roles for user ${uid} in their account document.`);
    
    return { success: true, message: `User ${uid} has been granted admin privileges.` };
  } catch (error: any) {
    console.error(`Failed to make user ${uid} an admin:`, error);
    throw new Error(`An error occurred while adding admin user: ${error.message}`);
  }
}

// Immediately invoke this function for the specific user experiencing the error.
// The build system will run this file once.
addAdminUser('eiMBgcJ3KhWGesl8J78oYFHiquy2').catch(console.error);
