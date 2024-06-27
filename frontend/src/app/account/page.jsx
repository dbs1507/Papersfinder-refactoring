'use client';
import React, { useState } from 'react';
import './styles.css'; // Importe o arquivo de estilos CSS
import AccountUser from '@/components/Account';
import Favorites from '@/components/Favorites';

const Account = () => {
  const [activeButton, setActiveButton] = useState('Conta');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <h1 className="text-3xl font-syne mt-10">PAPERSFINDER</h1>
      </div>
      <div className="ball-container">
        <span className="ball">
          <span className="ball-text font-sans">D</span>
        </span>
        <p className="font-syne text-3xl mt-2">Daniel</p>
        <div className='mt-20 font-syne'>
          <ul className='space-y-10'>
            <li>
              <button
                onClick={() => handleButtonClick('Conta')}
                className={`text-xl font-syne flex items-center w-full p-2 rounded-lg ${
                  activeButton === 'Conta' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
              >
                <img src="/account-circle.svg" alt="Account Circle" className="w-8 h-8 mr-2" />
                Conta
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick('Favoritos')}
                className={`text-xl font-syne flex items-center w-full p-2 rounded-lg ${
                  activeButton === 'Favoritos' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
              >
                <img src="/bookmark.svg" alt="Bookmark" className="w-8 h-8 mr-2" />
                Favoritos
              </button>
            </li>
          </ul>
        </div>
      </div>
      {activeButton === 'Conta' && <AccountUser />}
      {activeButton === 'Favoritos' && <Favorites />}
    </>
  );
};

export default Account;
