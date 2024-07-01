"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../services/firebase'; // seu arquivo de configuração do Firebase

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, photoURL, providerData } = user;
        const providerId = providerData[0].providerId;
        const storedUser = { displayName, email, photoURL, providerId };

        // Save user data in local storage
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        setCurrentUser(storedUser);
      } else {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Load user data from local storage on initial load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setLoading(false);
    }

    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    logout: () => signOut(auth).then(() => {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      router.push('/');
    })
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
