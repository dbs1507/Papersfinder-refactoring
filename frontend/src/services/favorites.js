import { db, auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const addFavorite = async (userId, article) => {
    try {
      const userFavoritesRef = doc(db, 'favorites', userId);
  
      // Adiciona o artigo à coleção `articles` do usuário específico
      await setDoc(userFavoritesRef, {
        articles: arrayUnion(article),
        user: userId
      }, { merge: true });
  
      console.log('Favorito adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
};
  
// Função para remover artigo dos favoritos
export const removeFavorite = async (article) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const userFavoritesDoc = doc(db, 'favorites', user.uid);

    // Remove o artigo do array de favoritos
    await updateDoc(userFavoritesDoc, {
      articles: arrayRemove(article),
    });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
  }
};

// Função para obter os favoritos do usuário
export const getFavorites = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const userFavoritesDoc = doc(db, 'favorites', user.uid);
    const docSnapshot = await getDoc(userFavoritesDoc);

    if (docSnapshot.exists()) {
      return docSnapshot.data().articles || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    return [];
  }
};
