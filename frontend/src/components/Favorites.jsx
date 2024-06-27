import React from 'react';
import CardArticle from './CardArticle';
import CardFavorite from './CardFavorite';

const Favorites = () => {
  return (
    <>
      <div className="mt-24">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-syne mb-20">Todos os seus favoritos</h1>
            <CardFavorite />
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
