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
            <div className="flex pt-10 pb-16">
              <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold mr-2'>KEYWORD: JAVA</span>
              <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-lg font-bold'>ARTICLE: The java language specification</span>
            </div>
            <h3 className="text-2xl font-syne pt-16 pb-4">Citações relacionadas</h3>
            <CardArticle size="w-3/4" />
        </div>
      </>
  );
};

export default Result;