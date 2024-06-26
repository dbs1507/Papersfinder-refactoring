import React from 'react';
import Header from "@/components/Header";
import ChartSearch from "@/components/ChartSearch";
import CardArticle from "@/components/CardArticle";
import TopCitations from "@/components/TopCitations";


const Result = () => {
  return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
          <div className='flex items-center justify-center'>
            <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
          </div>
          <div className="pt-10 pb-16">
              <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>KEYWORD: JAVA</span>
            </div>
            <h3 className="text-2xl font-syne pb-16">Interesse ao longo do tempo</h3>
            <ChartSearch/>
            <h3 className="text-2xl font-syne pt-16 pb-4">Top 5 citações</h3>
            <TopCitations />
            <h3 className="text-2xl font-syne pt-16 pb-4">Artigos relacionados</h3>
            <CardArticle size="w-3/4" />
        </div>
      </>
  );
};

export default Result;