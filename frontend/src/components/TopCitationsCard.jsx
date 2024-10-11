import { usePathname } from 'next/navigation'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFavorite, removeFavorite } from '../services/favorites'; // Importa os serviços de favoritos
import { auth } from '../services/firebase'; // Importa o auth para obter o usuário logado

const TopCitationsCard = ({ article, index, size, query }) => {
  const pathname = usePathname(); 
  const hiddenButtonUrls = ['/citation'];
  const [favorite, setFavorite] = useState(false); // Estado para armazenar se o artigo é favorito ou não
  const router = useRouter();

  // Função para marcar/desmarcar o artigo como favorito
  const markFavorite = async () => {
    setFavorite((prevFavorite) => !prevFavorite);

    const user = auth.currentUser; // Obtém o usuário logado
    if (user) {
      const userId = user.uid;

      // Verifica se o artigo já está favoritado e alterna entre adicionar/remover
      if (!favorite) {
        // Adiciona aos favoritos
        await addFavorite(userId, article);
        console.log("Artigo adicionado aos favoritos!");
      } else {
        // Remove dos favoritos
        await removeFavorite(article);
        console.log("Artigo removido dos favoritos!");
      }
    } else {
      console.error('Usuário não está logado.');
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
          {favorite ? (
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
      </div>
    </div>
  );
};

export default TopCitationsCard;
