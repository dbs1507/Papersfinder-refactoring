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
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div role="status">
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <p className="sr-only">Carregando...</p>
          </div>
        </div>
      ) : (
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
          <div className="relative group pt-32">
            <span className="text-gray-500 cursor-pointer text-sm">Como funciona ?</span>
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gray-900 text-white text-sm rounded-lg shadow-lg p-2 w-64 z-10">
              <p>Digite uma palavra-chave relacionada ao tema de interesse, clique em Buscar e obtenha estatísticas com base no Google Trends, além de sugestões de artigos vindas diretamente do Google Scholar para aprofundar seus conhecimentos sobre o assunto pesquisado.</p>
            </div>
          </div>
          {alert && (
            <div className="mt-5 text-red-500">
              {alert}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
