import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites'; 
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const CardArticle = ({ data, size }) => {
  const [favorites, setFavorites] = useState({}); // Estado para armazenar favoritos de cada card
  const [messages, setMessages] = useState({}); // Estado para mensagens de cada card
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado
  const router = useRouter();

  // Função para buscar favoritos do usuário logado ao montar o componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Define o usuário autenticado

        // Buscar os favoritos somente após o usuário estar autenticado
        try {
          const savedFavorites = await getFavorites(currentUser.uid); // Passa o UID do usuário
          const favoritesMap = {};

          // Itera sobre os favoritos e marca os artigos que estão no array de favoritos
          savedFavorites.forEach((favorite) => {
            favoritesMap[favorite.idResult] = true; // Marca como true se o artigo já está salvo
          });

          setFavorites(favoritesMap); // Atualiza o estado de favoritos
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      } else {
        setUser(null); // Usuário não autenticado
      }
    });

    return () => unsubscribe(); // Cleanup do listener ao desmontar o componente
  }, []);

  // Função para marcar o artigo como favorito
  const markFavorite = async (index, article) => {
    if (!user) {
      console.error('Usuário não está logado.');
      return;
    }

    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [article.idResult]: !prevFavorites[article.idResult], // Alterna o estado de favorito para o card específico
    }));

    try {
      if (!favorites[article.idResult]) {
        await addFavorite(user.uid, article);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: 'Artigo adicionado aos favoritos!',
        }));
      } else {
        await removeFavorite(article);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: 'Artigo removido dos favoritos!',
        }));
      }

      // Faz a mensagem sumir após 3 segundos
      setTimeout(() => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: '', // Limpa a mensagem para o card específico
        }));
      }, 3000);
    } catch (error) {
      console.error("Erro ao gerenciar favoritos:", error);
    }
  };

  // Verifique se os dados estão disponíveis e se há resultados
  if (!data || !data.organic_results || data.organic_results.length === 0) {
    return <span className='text-xs bg-red-500 text-white px-1 py-1 rounded-lg font-bold'>Nenhum artigo encontrado para a palavra-chave</span>; // Mensagem de erro
  }

  const dataGoogle = data.organic_results.map((item) => ({
    title: item.title,
    snippet: item.snippet,
    citation: item.inline_links?.cited_by?.total || 0,
    authors: item.publication_info.summary,
    link: item.link,
    citedArticles: item.inline_links?.cited_by?.serpapi_scholar_link || false,
    idCitation: item.inline_links?.cited_by?.cites_id || false,
    idResult: item.result_id, // Usado para identificar o artigo
  }));

  const handleCitationClick = (idCitation, query, article) => {
    if (idCitation) {
      const encodedCitedArticles = encodeURIComponent(idCitation);
      router.push(`/citation?citedArticles=${encodedCitedArticles}&query=${query}&article=${article}`);
    } else {
      alert('Nenhuma citação disponível para este artigo.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {dataGoogle.map((item, index) => (
        <div key={index} className={`${size} p-12 bg-white border border-gray-200 rounded-lg mb-6 relative`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight">{item.title}</h5>
          <p className="font-normal text-gray-700 text-slate-500">
            {item.snippet}
          </p>
          <p className="font-normal mt-3 text-gray-700 text-slate-500">
            {item.authors}
          </p>
          <button
            type="button"
            onClick={() => markFavorite(index, item)} // Passa o índice e o artigo correspondente
            className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
          >
            {favorites[item.idResult] ? (
              <div className='absolute top-2 right-2'>
                <img src="/bookmark_black.svg" alt="Bookmark preto" className="w-8 h-8" />
              </div>
            ) : (
              <div className='absolute top-2 right-2'>
                <img src="/bookmark_light.svg" alt="Bookmark claro" className="w-8 h-8" />
              </div>
            )}
          </button>
          <div className='pt-2 pb-2'>
            <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>{item.citation} citações</span>
          </div>
          <div className="mt-4">
            <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mr-2">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Ver artigo
              </a>
            </button>
            
            <button
              onClick={() => handleCitationClick(item.idCitation, data.search_parameters.q, item.title )}
              className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
            >
              Ver citações
            </button>
            
          </div>
          {messages[index] && (
            <div className={`absolute top-16 right-16 ${messages[index].includes('adicionado') ? 'bg-green-500' : 'bg-red-500'} text-white p-2 rounded-md`}>
              {messages[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardArticle;
