import React from 'react';
import Header from "@/components/Header";
import ChartComponent from "@/components/Chart";


const Result = () => {
  return (
    <div>
        <Header />
        <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
            <h1 className="text-3xl font-syne mb-6">PAPERSFINDER</h1>
            <div className='pt-10'>
              <span className='text-xs bg-gray-900 text-white px-1 py-1 rounded-md font-bold'>KEYWORD: JAVA</span>
            </div>
        </div>

        <ChartComponent/>
    </div>
  );
};

export default Result;