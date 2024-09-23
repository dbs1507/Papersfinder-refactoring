'use client'
import React, { useState } from 'react';

const CardFavorite = ({ favorite }) => {
  const { title, snippet, authors, citation,link, idResult } = favorite; // Extraindo as propriedades do objeto `favorite`
  const [isFavorite, setIsFavorite] = useState(true); // Estado para controlar o estado de favorito

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Alternar entre favorito e não favorito
  };

  return (
    <div className="relative p-4 bg-white border border-gray-200 rounded-lg left-16 w-7/12">
      <h5 className="mb-2 text-xl font-bold tracking-tight">{title}</h5>
      <p className="font-normal text-gray-700 text-slate-500">{snippet}</p>
      <p className="font-normal mt-3 text-gray-700 text-slate-500">
        {authors}
      </p>
      <button
        type="button"
        onClick={toggleFavorite}
        className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
      >
        {isFavorite ? (
          <div className='absolute top-2 right-2'>
            <img src="/bookmark_black.svg" alt="Bookmark preto" className="w-8 h-8" />
          </div>
        ) : (
          <div className='absolute top-2 right-2'>
            <img src="/bookmark_light.svg" alt="Bookmark claro" className="w-8 h-8" />
          </div>
        )}
      </button>

      <div className='pt-2 pb-2 px-1'>
        <span className='text-xs bg-gray-900 text-white px-2 py-1 rounded-lg font-bold'>{citation} citações</span>
      </div>
      <div className="mt-8 mb-3">
        <a
          href={link} // Constrói o link usando o idResult
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
        >
          Ver artigo
        </a>
      </div>
    </div>
  );
};

export default CardFavorite;
