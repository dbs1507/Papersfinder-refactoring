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
        {loading && 

            <div className=''>
            <div className='flex flex-col items-center justify-center'>
                <div role="status" className="mt-20">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            </div>
        
        }

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
