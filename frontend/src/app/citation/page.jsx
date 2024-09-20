'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import CardArticle from '../../components/CardArticle';
import Pagination from '../../components/Pagination';

const CitationPage = () => {
  const searchParams = useSearchParams();
  const citedArticles = decodeURIComponent(searchParams.get('citedArticles'));
  const query = searchParams.get('query');
  const article = searchParams.get('article');

  const [currentPage, setCurrentPage] = useState(0); // página inicial
  const [totalPages, setTotalPages] = useState(1); // valor inicial para as páginas totais

  const [googleData, setGoogleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados da API de acordo com a página
  const fetchDataCited = async (page = 0) => {
    setLoading(true); // Ativa o estado de carregamento
    try {
      const response = await fetch(`/api/citation?idcited=${encodeURIComponent(citedArticles)}&query=${encodeURIComponent(query)}&article=${encodeURIComponent(article)}&page=${page * 10}`); 
      const data = await response.json();
      setGoogleData(data); // Atualiza o estado com os dados
      setLoading(false); // Desativa o estado de carregamento
      setTotalPages(Math.ceil(data.googleCitationData.search_information.total_results / 10)); // Atualiza totalPages com base na resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Desativa o carregamento em caso de erro
    }
  };

  // Carrega os dados da página quando citatedArticles, query, ou página mudarem
  useEffect(() => {
    if (citedArticles && query && article) {
      fetchDataCited(currentPage);
    }
  }, [citedArticles, query, article, currentPage]);

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

        {/* Mexer nessa tela de carregamento */}
        {loading && <p>Carregando citações...</p>}

        {/* Exibe os dados caso estejam disponíveis */}
        {!loading && googleData && <CardArticle data={googleData.googleCitationData} size="w-3/4" />}

        {/* Caso nenhum dado tenha sido carregado */}
        {!loading && !googleData && <p>Nenhuma citação encontrada.</p>}
      </div>

      <div className='mt-10'>
        {/* Componente de paginação */}
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={(page) => setCurrentPage(page)} 
        />
      </div>
    </>
  );
};

export default CitationPage;
