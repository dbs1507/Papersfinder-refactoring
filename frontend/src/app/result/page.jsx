"use client";
import React, { useEffect, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useRouter, useSearchParams } from 'next/navigation';  // Importação para lidar com URL
import Header from '../../components/Header';
import TopCitations from '../../components/TopCitations';
import CardArticle from '../../components/CardArticle';
import ChartSearch from '../../components/ChartSearch';
import Pagination from '../../components/Pagination';
import LoadingPageResult from '../../components/LoadingPageResult'

const ResultPage = () => {
  const { searchData, setSearchData } = useSearch();
  const [googleData, setGoogleData] = useState(null);
  const [googleTopCited, setGoogleTopCited] = useState([]);
  const [trendsData, setTrendsData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  
  // Para lidar com a navegação e parâmetros de URL
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const queryFromUrl = searchParams.get('query') || ''; // Recupera a query da URL
  const pageFromUrl = parseInt(searchParams.get('page')) || 0; // Recupera a página da URL ou 0 se for nula
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const fetchData = async (page) => {
    try {
      const response = await fetch(`/api/combinedSearch?query=${encodeURIComponent(queryFromUrl)}&page=${page * 10}`);
      const data = await response.json();
      setGoogleData(data.googleData);
      setTrendsData(data.trendsData);
      const totalResults = data.googleData.search_information.total_results;
      setTotalPages(Math.ceil(totalResults / 10)); // Atualiza totalPages com base na resposta da API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataCited = async (page) => {
    try {
      const response = await fetch(`/api/topCitedArticles?query=${encodeURIComponent(queryFromUrl)}&page=${page * 10}`);
      const data = await response.json();
      setGoogleTopCited(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (queryFromUrl) {
      fetchData(currentPage);
      fetchDataCited(currentPage);
    }
  }, [queryFromUrl, currentPage]);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch && !queryFromUrl) {
      const { googleData, trendsData, query } = JSON.parse(lastSearch);
      setGoogleData(googleData);
      setTrendsData(trendsData);
      setSearchData({ googleData, trendsData, query });
      const totalResults = googleData.search_information.total_results;
      setTotalPages(Math.ceil(totalResults / 10));
    }
  }, [queryFromUrl]);

  // Atualiza a URL com a nova página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/result?query=${encodeURIComponent(queryFromUrl)}&page=${page}`);
  };

  //mexer na tela de carregamento!!
  if (!googleData || !trendsData) {
    return <LoadingPageResult />
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
        <div className='flex items-center justify-center'>
          <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
        </div>
        <div className="pt-10 pb-16 space-x-2">
          <span className='text-xs bg-gray-900 text-white px-2 py-1 rounded-lg font-bold'>
            PALAVRA-CHAVE: {queryFromUrl}
          </span>
          <span className='text-xs bg-gray-900 text-white px-2 pr-2 py-1 rounded-lg font-bold'>
            TOTAL DE ARTIGOS: {googleData.search_information.total_results}
          </span>
        </div>
        <h3 className="text-2xl font-syne pb-16">Interesse ao longo do tempo</h3>
        <ChartSearch data={trendsData} />
        <h3 className="text-2xl font-syne pt-16 pb-4">Top 5 citações</h3>
        {googleTopCited && <TopCitations query={queryFromUrl} data={googleTopCited} />}
        <h3 className="text-2xl font-syne pt-16 pb-4">Artigos relacionados</h3>
        {googleData && <CardArticle data={googleData} query={queryFromUrl} size="w-3/4" />}
      </div>
      <div className='mt-10'>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
        />
      </div>
    </>
  );
};

export default ResultPage;
