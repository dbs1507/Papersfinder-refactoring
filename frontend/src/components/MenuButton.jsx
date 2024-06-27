'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const MenuButton = ({ title1, title2, textSize }) => {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className='flex gap-3'>
      <button
        className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded text-${textSize}`}
        onClick={() => handleRedirect('/login')} // Substitua '/path1' pelo caminho desejado
      >
        {title1}
      </button>
      <button
        className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded text-${textSize}`}
        onClick={() => handleRedirect('/register')} // Substitua '/path2' pelo caminho desejado
      >
        {title2}
      </button>
    </div>
  );
};

export default MenuButton;
