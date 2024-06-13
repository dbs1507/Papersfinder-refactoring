import React from 'react';


const CardArticle = () => (
    <>
        <div className="w-1/2 p-12 bg-white border border-gray-200 rounded-lg shadow mb-6">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">Noteworthy technology acquisitions 2021</h5>
          <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Link artigo</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">Ver citações</button>
          </div>
        </div>
    </>
  );
  
  export default CardArticle;