import { auth, googleProvider, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, updateEmail } from 'firebase/auth';
import { doc, setDoc, getDoc,updateDoc } from 'firebase/firestore';

export const registerWithEmailAndPassword = async (firstName, lastName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      authProvider: 'local'
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const firebaseUpdateEmail = async (user, newEmail) => {
  try {
    await updateEmail(user, newEmail);
    console.log("Email do usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o email do usuário:", error);
    throw error;
  }
};

export const updateUserDetails = async (uid, userData) => {
  try {
    // Referência ao documento do usuário no Firestore
    const userDoc = doc(db, 'users', uid);

    // Atualiza os campos especificados no Firestore
    await updateDoc(userDoc, userData);
    console.log("Dados do usuário atualizados com sucesso!");

  } catch (error) {
    console.error("Erro ao atualizar os dados do usuário:", error);
    throw error;
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log(user);

    const userDoc = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(userDoc);

    if (!docSnapshot.exists()) {
      await setDoc(userDoc, {
        uid: user.uid,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ').slice(1).join(' '),
        email: user.email,
        photoURL: user.photoURL,
        authProvider: 'google'
      });
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
