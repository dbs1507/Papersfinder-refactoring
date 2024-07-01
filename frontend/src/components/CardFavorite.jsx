'use client'
import { usePathname } from 'next/navigation'; // Importa o hook usePathname do pacote next/navigation
import React, { useState } from 'react';

const CardFavorite = () => {
  const [favorite, setFavorite] = useState(false); // Estado para controlar a visibilidade da senha

  const markFavorite = () => {
    setFavorite(!favorite); // Alternar entre mostrar e esconder a senha
  };
  return (
    <div className="relative p-4 bg-white border border-gray-200 rounded-lg w-3/4">
      <h5 className="mb-2 text-xl font-bold tracking-tight">Noteworthy technology acquisitions 2021</h5>
      <p className="font-normal text-gray-700 text-slate-500">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

      <button
        type="button"
        onClick={markFavorite}
        className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
      >
        {favorite ? (
        <div className='absolute top-2 right-2'>
          <img src="/bookmark_light.svg" alt="" className="w-8 h-8" />
        </div>
            ) : (
        <div className='absolute top-2 right-2'>
          <img src="/bookmark_black.svg" alt="" className="w-8 h-8" />
        </div>        
          )}
      </button>

      <div className='pt-2 pb-2'>
        <span className='text-xs bg-gray-900 text-white px-2 py-1 rounded-lg font-bold'>12345 citações</span>
      </div>
      <div className="mt-4">
        <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded">Link artigo</button>
      </div>
    </div>
  );
};

export default CardFavorite;
