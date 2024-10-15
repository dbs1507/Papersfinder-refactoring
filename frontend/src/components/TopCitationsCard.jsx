import { usePathname } from 'next/navigation'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites'; // Importa os serviços de favoritos
import { auth } from '../services/firebase'; // Importa o auth para obter o usuário logado
import { onAuthStateChanged } from 'firebase/auth';

const TopCitationsCard = ({ article, index, size, query }) => {
  const pathname = usePathname(); 
  const hiddenButtonUrls = ['/citation'];
  const [favorites, setFavorites] = useState({}); // Estado para armazenar favoritos de cada card
  const [message, setMessage] = useState(''); // Estado para a mensagem de exclusão
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado

  const router = useRouter();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Define o usuário autenticado

        // Buscar os favoritos somente após o usuário estar autenticado
        try {
          const savedFavorites = await getFavorites(currentUser.uid); // Passa o UID do usuário
          const favoriteMap = {};

          // Itera sobre os favoritos e marca os artigos que estão no array de favoritos
          savedFavorites.forEach((favorite) => {
            favoriteMap[favorite.idResult] = true; // Marca como true se o artigo já está salvo
          });

          setFavorites(favoriteMap); // Atualiza o estado de mapeamento de favoritos
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      } else {
        setUser(null); // Usuário não autenticado
      }
    });

    return () => unsubscribe(); // Cleanup do listener ao desmontar o componente
  }, []);

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
        setMessage((prevMessages) => ({
          ...prevMessages,
          [index]: 'Artigo adicionado aos favoritos!',
        }));
      } else {
        await removeFavorite(article);
        setMessage((prevMessages) => ({
          ...prevMessages,
          [index]: 'Artigo removido dos favoritos!',
        }));
      }

      // Faz a mensagem sumir após 3 segundos
      setTimeout(() => {
        setMessage((prevMessages) => ({
          ...prevMessages,
          [index]: '', // Limpa a mensagem para o card específico
        }));
      }, 3000);
    } catch (error) {
      console.error("Erro ao gerenciar favoritos:", error);
    }
  };

  // Escala de cores para os números (como no original)
  const colors = ['text-black', 'text-gray-800', 'text-gray-600', 'text-gray-400', 'text-gray-200'];

  // Função para lidar com o clique nas citações
  const handleCitationClick = (idCitation, query, article) => {
    if (idCitation) {
      const encodedCitedArticles = encodeURIComponent(idCitation);
      router.push(`/citation?citedArticles=${encodedCitedArticles}&query=${query}&article=${article}`);
    } else {
      alert('Nenhuma citação disponível para este artigo.');
    }
  };

  return (
    <div className="flex items-center mb-6">
      <li style={{ fontSize: "180px" }} className={`pl-10 font-sans font-bold ${colors[index]} py-2 px-10`}>
        {index + 1}
      </li>
      <div className={`${size} p-12 bg-white border border-gray-200 rounded-lg relative`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{article.title}</h5>
        <p className="font-normal text-gray-700 text-slate-500">
          {article.snippet || 'No snippet available'}
        </p>
        <p className="font-normal mt-3 text-gray-700 text-slate-500">
          {article.authors || 'No authors available'}
        </p>
        
        {/* Botão de favoritar/desfavoritar */}
        <button
          type="button"
          onClick={markFavorite} // Chama a função markFavorite ao clicar
          className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
        >
          {favorites[article.idResult] ? (
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
          <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>
            {article.inline_links?.cited_by?.total|| 0} citações
          </span>
        </div>

        <div className="mt-4">
          {!hiddenButtonUrls.includes(pathname) && (
            <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mr-2">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Ver artigo
              </a>
            </button>
          )}
          <button
            onClick={() => handleCitationClick(article.inline_links?.cited_by?.cites_id, query, article.title)}
            className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
          >
            Ver citações
          </button>
        </div>

      {message && (
        <div className={`absolute top-16 right-16 ${message.includes('adicionado') ? 'bg-green-500' : 'bg-red-500'} text-white p-2 rounded-md`}>
          {message}
        </div>
      )}
      </div>
    </div>
  );
};

export default TopCitationsCard;
