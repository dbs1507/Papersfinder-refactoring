"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '../context/SearchContext';

const SearchBar = () => {
  const [alert, setAlert] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false); // Estado para gerenciar o loading
  const router = useRouter();
  const { setSearchData } = useSearch();

  const handleSearch = async () => {
    if (!query || query.trim() === "") {
      setAlert("Pesquisa vazia, digite alguma palavra");
      return;
    }
  
    setLoading(true); // Ativa o loading
  
    try {
      const response = await fetch(`/api/combinedSearch?query=${encodeURIComponent(query)}&page=0`);
      const data = await response.json();
  
      if (!data.trendsData) {
        setAlert("Não há dados de pesquisa suficientes para exibir o gráfico de interesse");
      } else {
        setAlert(null);
        setSearchData({
          googleData: data.googleData,
          trendsData: data.trendsData,
          query,
        });
  
        // Salva a pesquisa no localStorage
        localStorage.setItem('lastSearch', JSON.stringify({ googleData: data.googleData, trendsData: data.trendsData, query }));
  
        // Navega para a página /result com parâmetros de consulta
        router.push(`/result?query=${encodeURIComponent(query)}&page=0`);
      }
    } catch (error) {
      console.error('Error performing search:', error);
      setAlert('Erro ao buscar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Desativa o loading após a conclusão da busca
    }
  };
  
  // Adiciona o manipulador para detectar a tecla Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center pt-5">
      <label htmlFor="voice-search" className="sr-only">Buscar</label>
      <input
        type="text"
        id="simple-search"
        style={{ width: '700px', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:outline-none"
        placeholder="Digite uma palavra ..."
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Adiciona o evento onKeyDown
        disabled={loading} // Desativa o input enquanto está carregando
      />
      <div className='pt-5'>
        <button
          onClick={handleSearch}
          className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mt-2"
          disabled={loading} // Desativa o botão enquanto está carregando
        >
          {loading ? 'Carregando...' : 'Buscar'} {/* Exibe "Carregando..." enquanto o loading está ativo */}
        </button>
      </div>
      {alert && (
        <div className="mt-5 text-red-500">
          {alert}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
