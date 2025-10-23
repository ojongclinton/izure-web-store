import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import type { User } from '@/types';

const USERS_COLLECTION = 'users';

// Convert Firebase User to our User type
function convertFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || '',
    photoURL: firebaseUser.photoURL || undefined,
    phoneNumber: firebaseUser.phoneNumber || undefined,
    createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
    updatedAt: new Date(),
    role: 'customer',
  };
}

// Create user document in Firestore
async function createUserDocument(user: User): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.id);
    await setDoc(userRef, user);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

// Get user document from Firestore
export async function getUserDocument(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
}

// Register with email and password
export async function registerWithEmail(
  email: string,
  password: string,
  name: string
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    const user = convertFirebaseUser(userCredential.user);
    user.name = name;
    await createUserDocument(user);

    return user;
  } catch (error) {
    console.error('Error registering with email:', error);
    throw error;
  }
}

// Login with email and password
export async function loginWithEmail(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserDocument(userCredential.user.uid);

    if (!user) {
      // Create user document if it doesn't exist
      const newUser = convertFirebaseUser(userCredential.user);
      await createUserDocument(newUser);
      return newUser;
    }

    return user;
  } catch (error) {
    console.error('Error logging in with email:', error);
    throw error;
  }
}

// Login with Google
export async function loginWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = await getUserDocument(userCredential.user.uid);

    if (!user) {
      const newUser = convertFirebaseUser(userCredential.user);
      await createUserDocument(newUser);
      return newUser;
    }

    return user;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
}

// Logout
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Reset password
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Update user profile
export async function updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(userRef, { ...data, updatedAt: new Date() }, { merge: true });

    if (auth.currentUser && data.name) {
      await updateProfile(auth.currentUser, { displayName: data.name });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
