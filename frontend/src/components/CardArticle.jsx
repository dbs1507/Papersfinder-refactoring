'use client'
import { usePathname } from 'next/navigation'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CardArticle = ({ data, size }) => {
  // const pathname = usePathname(); 
  // const hiddenButtonUrls = ['/citation'];
  const [favorites, setFavorites] = useState({}); // Estado para armazenar favoritos de cada card
  const router = useRouter();

  const markFavorite = (index) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index], // Alterna o estado de favorito para o card específico
    }));
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
    idCitation: item.inline_links?.cited_by?.cites_id || false
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
            onClick={() => markFavorite(index)} // Passa o índice do card
            className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
          >
            {favorites[index] ? (
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
              onClick={() => handleCitationClick(item.idCitation, data.search_parameters.q,item.title )}
              className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
            >
              Ver citações
            </button>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardArticle;
