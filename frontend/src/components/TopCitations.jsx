import { usePathname, useSearchParams } from 'next/navigation'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites'; // Importa os serviços de favoritos
import { auth } from '../services/firebase'; // Importa o auth para obter o usuário logado
import { onAuthStateChanged } from 'firebase/auth';

const TopCitations = ({ data, query }) => {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); // Hook para pegar parâmetros da URL  const hiddenButtonUrls = ['/citation'];
  const [favorites, setFavorites] = useState({}); // Estado para armazenar favoritos de cada card
  const [messages, setMessages] = useState({}); // Estado para a mensagem de exclusão
  const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Define o usuário autenticado

        try {
          const savedFavorites = await getFavorites(currentUser.uid); // Passa o UID do usuário
          const favoriteMap = {};

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
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        [index]: 'Usuário não está logado!',
      }));
      console.error('Usuário não está logado.');

      setTimeout(() => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: '', // Limpa a mensagem após 3 segundos
        }));
      }, 3000);
      return '';
      
    }

    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [article.idResult]: !prevFavorites[article.idResult], // Alterna o estado de favorito
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

      setTimeout(() => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: '', // Limpa a mensagem após 3 segundos
        }));
      }, 3000);
    } catch (error) {
      console.error("Erro ao gerenciar favoritos:", error);
    }
  };

  const colors = ['text-black', 'text-gray-800', 'text-gray-600', 'text-gray-400', 'text-gray-200'];
  const queryParam = searchParams.get('query'); 


  console.log(data)
  
  const dataGoogle = data.map((item) => ({
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

  if (!data || data.length === 0) {
    return (
      <div className="p-4 w-5/6 bg-white border border-gray-200 rounded-lg shadow mb-6 ml-14 flex items-center justify-center h-64">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <p className="sr-only">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-7/12 bg-white border border-gray-200 rounded-lg shadow mb-6 ml-14">
      <ul>
        {dataGoogle.map((item, index) => (
          <div key={index} className="flex items-center mb-6">
            <li style={{ fontSize: "180px" }} className={`pl-10 font-sans font-bold ${colors[index]} py-2 px-10`}>
              {index + 1}
            </li>
            <div className="p-12 bg-white border border-gray-200 rounded-lg relative">
              <h5 className="mb-2 text-2xl font-bold tracking-tight">{item.title}</h5>
              <p className="font-normal text-gray-700 text-slate-500">{item.snippet || 'No snippet available'}</p>
              <p className="font-normal mt-3 text-gray-700 text-slate-500">{item.authors || 'No authors available'}</p>
              
              {/* Botão de favoritar/desfavoritar */}
              <button
                type="button"
                onClick={() => markFavorite(index, item)} // Passa o índice e o artigo
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
                <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>
                  {item.citation || 0} citações
                </span>
              </div>

              <div className="mt-4">
                <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mr-2">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Ver artigo
                  </a>
                </button>
                <button
                  onClick={() => handleCitationClick(item.idCitation, queryParam, item.title )}
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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TopCitations;
