import React from 'react';

const SearchBar = () => {
  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col items-center pt-5">
        <label htmlFor="voice-search" className="sr-only">Buscar</label>
        <input
          type="text"
          id="simple-search"
          style={{ width: '700px', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:outline-none"
          placeholder="Search branch name..."
          required
        />
        <div className='pt-5'>
          <button className="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded mt-2">
            Buscar
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
 