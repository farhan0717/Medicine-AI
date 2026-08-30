import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isGuest: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  registerWithEmail: (e: string, p: string, name: string) => Promise<void>;
  resetPassword: (e: string) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkGuest = localStorage.getItem('mediscan_guest');
    if (checkGuest === 'true') {
      setIsGuest(true);
      setUser({
        uid: 'guest',
        email: 'guest@mediscan.ai',
        displayName: 'Guest User',
        photoURL: null,
        isGuest: true,
        createdAt: new Date().toISOString(),
        subscriptionTier: 'free',
        languagePreference: 'en',
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setIsGuest(false);
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || 'Medical User',
          photoURL: fbUser.photoURL,
          isGuest: false,
          createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
          subscriptionTier: 'free',
          languagePreference: 'en',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    localStorage.removeItem('mediscan_guest');
    setIsGuest(false);
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    localStorage.removeItem('mediscan_guest');
    setIsGuest(false);
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    localStorage.removeItem('mediscan_guest');
    setIsGuest(false);
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      await updateProfile(res.user, { displayName: name });
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const continueAsGuest = () => {
    localStorage.setItem('mediscan_guest', 'true');
    setIsGuest(true);
    setUser({
      uid: 'guest',
      email: 'guest@mediscan.ai',
      displayName: 'Guest User',
      photoURL: null,
      isGuest: true,
      createdAt: new Date().toISOString(),
      subscriptionTier: 'free',
      languagePreference: 'en',
    });
  };

  const logout = async () => {
    localStorage.removeItem('mediscan_guest');
    setIsGuest(false);
    setUser(null);
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      // Ignored if in guest mode
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        continueAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
