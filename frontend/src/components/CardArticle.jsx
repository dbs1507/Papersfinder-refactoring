'use client'
import React from 'react';
import { usePathname } from 'next/navigation'; // Importa o hook usePathname do pacote next/navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'; // Importa o ícone de coração vazio

const CardArticle = ({ size }) => {
  const pathname = usePathname(); // Usa o hook usePathname para obter a URL atual

  // URLs em que o botão deve ser escondido
  const hiddenButtonUrls = ['/citation'];

  return (
    <div className={`${size} p-12 bg-white border border-gray-200 rounded-lg mb-6 ml-14`}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight">Noteworthy technology acquisitions 2021</h5>
      <p className="font-normal text-gray-700 text-slate-500">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      <div className='pt-2 pb-2'>
        <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>12345 citações</span>
        <FontAwesomeIcon icon={faHeart} className="text-sm" />
      </div>

      <div className="mt-4">
        {!hiddenButtonUrls.includes(pathname) && (
          <>
            <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mr-2">Link artigo</button>
          </>
        )}
      <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded">Ver citações</button>
      </div>
    </div>
  );
};

export default CardArticle;
