'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import CardArticle from '../../components/CardArticle';

const CitationPage = () => {
  const searchParams = useSearchParams();
  const citedArticles = decodeURIComponent(searchParams.get('citedArticles'));
  const query = searchParams.get('query');
  const article = searchParams.get('article');
  
  // Estado para armazenar os dados da API
  const [googleData, setGoogleData] = useState(null);
  const [loading, setLoading] = useState(true); // Para gerenciar o estado de carregamento

  // Função para buscar os dados da API
  const fetchDataCited = async () => {
    try {
      const response = await fetch(`/api/citation?idcited=${encodeURIComponent(citedArticles)}&query=${encodeURIComponent(query)}&article=${encodeURIComponent(article)}`);
      const data = await response.json();
      setGoogleData(data); // Armazena os dados no estado
      setLoading(false); // Termina o carregamento
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Termina o carregamento mesmo em caso de erro
    }
  };

  // useEffect para disparar a busca dos dados da API quando os parâmetros mudarem
  useEffect(() => {
    if (citedArticles && query && article) {
      fetchDataCited();
    }
  }, [citedArticles, query, article]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
        <h1 className="text-3xl font-syne mb-6">PAPERSFINDER</h1>
        <div className="flex pt-10 pb-16">
          <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold mr-2'>
            KEYWORD: {query}
          </span>
          <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>
            ARTICLE: {article}
          </span>
        </div>
        <h3 className="text-2xl font-syne pt-16 pb-4">Citações relacionadas</h3>

        {/* Verifica se está carregando */}
        {loading && <p>Carregando citações...</p>}

        {/* Verifica se os dados foram carregados e renderiza o CardArticle */}
        {!loading && googleData && <CardArticle data={googleData.googleCitationData} size="w-3/4" />}

        {/* Caso nenhum dado tenha sido carregado */}
        {!loading && !googleData && <p>Nenhuma citação encontrada.</p>}
      </div>
    </>
  );
};

export default CitationPage;
