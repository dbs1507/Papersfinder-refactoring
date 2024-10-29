'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../services/firebase';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, email, photoURL, providerData, uid } = user;
        const providerId = providerData[0].providerId;
        let userData = { displayName, email, photoURL, providerId, uid };

        // Observa o documento do usuário no Firestore e atualiza `currentUser` automaticamente
        if (providerId !== 'google.com') {
          const userDocRef = doc(db, 'users', uid);
          const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const userDocData = docSnap.data();
              userData = {
                ...userData,
                firstName: userDocData.firstName,
                lastName: userDocData.lastName,
              };
              localStorage.setItem('currentUser', JSON.stringify(userData));
              setCurrentUser(userData);
            }
          });

          return () => unsubscribeSnapshot();
        } else {
          localStorage.setItem('currentUser', JSON.stringify(userData));
          setCurrentUser(userData);
        }
      } else {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Carrega os dados do usuário do localStorage na inicialização
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setLoading(false);
    }

    return unsubscribe;
  }, [auth, db]);

  const value = {
    currentUser,
    logout: () =>
      signOut(auth).then(() => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        router.push('/');
      }),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
