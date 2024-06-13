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
            <h1 className="text-3xl font-syne mb-6">PAPERSFINDER</h1>
            <div className="pt-10 pb-16">
              <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-md font-bold'>KEYWORD: JAVA</span>
            </div>
            <h3 className="text-2xl font-syne pb-16">Interesse ao longo do tempo</h3>
            <ChartSearch/>
            <h3 className="text-2xl font-syne pt-16 pb-4">Top 5 citações</h3>
            <TopCitations />
            <h3 className="text-2xl font-syne pt-16 pb-4">Artigos relacionados</h3>
            <CardArticle size="w-1/2" />
        </div>
      </>
  );
};

export default Result;