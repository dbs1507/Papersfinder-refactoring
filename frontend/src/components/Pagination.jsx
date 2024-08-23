'use client';
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPages = 90; // Máximo de páginas que serão exibidas
  const pagesToShow = 10; // Número de páginas a serem exibidas por vez
  const adjustedTotalPages = Math.min(totalPages, maxPages); // Ajuste para o total de páginas exibido

  const startPage = Math.floor(currentPage / pagesToShow) * pagesToShow;
  const endPage = Math.min(startPage + pagesToShow - 1, adjustedTotalPages - 1);

  const handlePageChange = (page) => {
    if (page >= 0 && page <= adjustedTotalPages - 1 && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNextSet = () => {
    if (endPage < adjustedTotalPages - 1) {
      onPageChange(endPage + 1);
    }
  };

  const handlePreviousSet = () => {
    if (startPage > 0) {
      onPageChange(startPage - pagesToShow);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      {startPage > 0 && (
        <button
        className="bg-gray-900 text-white rounded-lg p-1"
        onClick={handlePreviousSet}
        >
          &laquo; Previous
        </button>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(page => (
        <button
          key={page}
          className={`mx-1 w-8 h-8 flex items-center justify-center rounded ${page === currentPage ? 'bg-gray-900 text-white' : 'bg-gray-400 text-white'} hover:bg-gray-600 text-white`}
          onClick={() => handlePageChange(page)}
        >
          {page + 1} {/* Para exibir como 1, 2, 3, etc. */}
        </button>
      ))}
      {endPage < adjustedTotalPages - 1 && (
        <button
        className="bg-gray-900 text-white rounded-lg p-1"
        onClick={handleNextSet}
        >
          Next &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
