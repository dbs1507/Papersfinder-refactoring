'use client'
import React, { useState } from 'react';
import { addFavorite, removeFavorite } from '../services/favorites'; // Importe os serviços para adicionar/remover favoritos
import { auth } from '../services/firebase'; // Importe a autenticação do Firebase

const CardFavorite = ({ favorite, citations }) => {
  const { title, snippet, authors, citation, link, idResult } = favorite;
  const [isFavorite, setIsFavorite] = useState(true); // Estado para controlar o estado de favorito
  const [message, setMessage] = useState(''); // Estado para a mensagem de exclusão

  // Função para alternar o estado de favorito
  const toggleFavorite = async () => {
    const user = auth.currentUser; // Obtém o usuário logado
    if (user) {
      const userId = user.uid;

      if (isFavorite) {
        // Remove o favorito se já estiver marcado
        await removeFavorite(favorite);
        setMessage('Artigo removido dos favoritos!'); // Define a mensagem
        setIsFavorite(false); // Atualiza o estado do favorito
        // Recarrega a página após 2 segundos para permitir que a mensagem seja vista
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Adiciona o favorito se não estiver marcado
        await addFavorite(userId, favorite);
        console.log('Artigo adicionado aos favoritos!');
        setIsFavorite(true); // Atualiza o estado do favorito
        // Recarrega a página após 2 segundos para permitir que a mensagem seja vista
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      // Remove a mensagem após 3 segundos
      if (!isFavorite) {
        setTimeout(() => setMessage(''), 3000);
      }
    } else {
      console.error('Usuário não está logado.');
    }
  };

  return (
    <div className="relative p-4 bg-white border border-gray-200 rounded-lg left-16 w-7/12">
      <h5 className="mb-2 text-xl font-bold tracking-tight">{title}</h5>
      <p className="font-normal text-gray-700 text-slate-500">{snippet}</p>
      <p className="font-normal mt-3 text-gray-700 text-slate-500">{authors}</p>
      <button
        type="button"
        onClick={toggleFavorite}
        className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
      >
        {isFavorite ? (
          <div className="absolute top-2 right-2">
            <img src="/bookmark_black.svg" alt="Bookmark preto" className="w-8 h-8" />
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <img src="/bookmark_light.svg" alt="Bookmark claro" className="w-8 h-8" />
          </div>
        )}
      </button>
      
      <div className="pt-2 pb-2 px-1">
        <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded-lg font-bold">{citation}{citations} citações</span>
      </div>
      <div className="mt-8 mb-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
        >
          Ver artigo
        </a>
      </div>

      {message && (
        <div className="absolute top-16 right-16 bg-green-500 text-white p-2 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default CardFavorite;
