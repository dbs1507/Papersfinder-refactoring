import React from 'react';
import TopCitationsCard from './TopCitationsCard';

const TopCitations = ({ data, query }) => {
  if (!data || data.length === 0) {
    return <div>No citations available</div>; // Caso não haja dados
  }

  return (
    <div className="p-4 w-2/1 bg-white border border-gray-200 rounded-lg shadow mb-6 ml-14">
      <ul>
        {data.map((article, index) => (
          <TopCitationsCard 
            key={article.result_id}
            article={article} 
            index={index} 
            size="w-5/6" 
            query={query}  // Passa a query para que seja possível buscar os artigos relacionados
          />
        ))}
      </ul>
    </div>
  );
};

export default TopCitations;
