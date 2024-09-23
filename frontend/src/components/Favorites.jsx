import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/favorites';
import CardFavorite from "../components/CardFavorite"

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteArticles = await getFavorites();
      setFavorites(favoriteArticles);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="mt-24">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-syne mb-20">Todos os seus favoritos</h1>
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <CardFavorite key={index} favorite={favorite} />
            ))
          ) : (
            <div className="text-center">Nenhum artigo favorito encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
