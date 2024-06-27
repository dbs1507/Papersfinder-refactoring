'use client';
import React, { useState } from 'react';
import './styles.css'; // Importe o arquivo de estilos CSS
import AccountUser from '@/components/Account';
import Favorites from '@/components/Favorites';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth';
import { useRouter } from 'next/navigation'; // Importar o hook de roteamento do Next.js

const Account = () => {
  const [activeButton, setActiveButton] = useState('Conta');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const router = useRouter(); // Inicializar o roteador

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // Redirecionar para a página inicial

      // Redirecionar para a página de login ou página inicial após o logout
      // Você pode usar o useRouter do Next.js ou o history do React Router para isso
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Tratar erro de logout, se necessário
    }
  };

  const { currentUser } = useAuth();

  // Verifica se currentUser está carregado e se firstName e email são strings válidas
  const firstName = currentUser?.firstName || '';
  const email = currentUser?.email || '';
  

  return (
    <>
      <div className='flex items-center justify-center'>
        <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
      </div>
      {currentUser ? (
      <div className="ball-container">
        <span className="ball">
            <span className="ball-text font-sans">{firstName[0].toUpperCase()}</span>
          </span>
          <p className="font-syne text-3xl mt-2">{firstName.toUpperCase()}</p>
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
              className="itens-center mt-8 text-lg font-syne border border-red-800 p-2 rounded-lg text-gray-700 focus:outline-none w-2/4"
            >
              <p className='text-red-600'>Sair</p>
            </button>
            </li>
          </ul>
        </div>
      </div>
          ) : (
            <div>Carregando...</div>
          )}
      {activeButton === 'Conta' && <AccountUser />}
      {activeButton === 'Favoritos' && <Favorites />}
    </>
  );
};

export default Account;
