"use client";
import React, { useEffect, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import Header from '../../components/Header';
import TopCitations from '../../components/TopCitations';
import CardArticle from '../../components/CardArticle';
import ChartSearch from '../../components/ChartSearch';
import Pagination from '../../components/Pagination';

const ResultPage = () => {
  const { searchData, setSearchData } = useSearch();
  const [googleData, setGoogleData] = useState(null);
  const [googleTopCited, setGoogleTopCited] = useState([]);
  const [trendsData, setTrendsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await fetch(`/api/combinedSearch?query=${encodeURIComponent(searchData.query)}&page=${page * 10}`);
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
      const response = await fetch(`/api/topCitedArticles?query=${encodeURIComponent(searchData.query)}&page=${page * 10}`);
      const data = await response.json(); // Ajuste para JSON diretamente
      setGoogleTopCited(data); // Ajuste aqui para definir diretamente os artigos mais citados
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      const { googleData, trendsData, query } = JSON.parse(lastSearch);
      setGoogleData(googleData);
      setTrendsData(trendsData);
      setSearchData({ googleData, trendsData, query });
      const totalResults = googleData.search_information.total_results;
      setTotalPages(Math.ceil(totalResults / 10));
    }
  }, []);

  useEffect(() => {
    if (searchData.query) {
      fetchData(currentPage);
      fetchDataCited(currentPage);  // Chama a função para buscar os artigos mais citados
    }
  }, [searchData.query, currentPage]);

  if (!googleData || !trendsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
        <div className='flex items-center justify-center'>
          <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
        </div>
        <div className="pt-10 pb-16">
          <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>
            KEYWORD: {searchData.query}
          </span>
        </div>
        <h3 className="text-2xl font-syne pb-16">Interesse ao longo do tempo</h3>
        <ChartSearch data={trendsData} />
        <h3 className="text-2xl font-syne pt-16 pb-4">Top 5 citações</h3>
        {googleTopCited && <TopCitations data={googleTopCited} />}
        <h3 className="text-2xl font-syne pt-16 pb-4">Artigos relacionados</h3>
        {googleData && <CardArticle data={googleData} query={searchData.query} size="w-3/4" />}
      </div>
      <div className='mt-10'>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={(page) => setCurrentPage(page)} 
        />
      </div>
    </>
  );
  
};

export default ResultPage;
