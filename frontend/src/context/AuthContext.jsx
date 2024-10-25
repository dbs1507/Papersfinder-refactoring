'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../services/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

        // Se o usuário não for do Google, busca `firstName` e `lastName` no Firestore
        if (providerId !== 'google.com') {
          const userDoc = await getDoc(doc(db, 'users', uid)); // Supondo que a coleção se chama 'users'
          if (userDoc.exists()) {
            const userDocData = userDoc.data();
            userData = {
              ...userData,
              firstName: userDocData.firstName,
              lastName: userDocData.lastName,
            };
          }
        }

        // Salva os dados do usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);
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
    logout: () => signOut(auth).then(() => {
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
