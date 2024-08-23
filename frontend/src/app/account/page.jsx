'use client';
import React, { useState, useEffect } from 'react';
import './styles.css'; // Importe o arquivo de estilos CSS
import AccountUser from '../../components/Account';
import Favorites from '../../components/Favorites';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation'; // Importar o hook de roteamento do Next.js

const Account = () => {
  const [activeButton, setActiveButton] = useState('Conta');
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login'); // Redirecionar para a página de login se o usuário não estiver autenticado
    }
  }, [currentUser, router]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirecionar para a página inicial após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Verifica se currentUser está carregado e se displayName e email são strings válidas
  const displayName = currentUser?.displayName || '';
  const email = currentUser?.email || '';
  const photo = currentUser?.photoURL


  if (!currentUser) {
    return <div>Carregando...</div>; // Ou qualquer componente de carregamento
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
      </div>
      <div className="ball-container">
        <span className="ball">
            <div className="w-8 h-8 rounded-full text-7xl text-black flex items-center justify-center">
              {displayName ? displayName[0].toUpperCase() : email[0].toUpperCase()}
            </div>
        </span>
        <p className="font-syne text-3xl mt-2">{displayName ? displayName.toUpperCase() : email.toUpperCase()}</p>
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
            <li>
              <button
                onClick={handleLogout}
                className="items-center mt-8 text-lg font-syne border border-red-800 p-2 rounded-lg text-gray-700 focus:outline-none w-2/4"
              >
                <p className='text-red-600'>Sair</p>
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
