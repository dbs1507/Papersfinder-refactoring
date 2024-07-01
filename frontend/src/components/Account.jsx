'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
// import './styles.css';

const Account = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login'); // Redirecionar para a página de login se o usuário não estiver autenticado
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Carregando...</div>; // Ou qualquer componente de carregamento
  }

  const isGoogleUser = currentUser.providerId === 'google.com';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alternar entre mostrar e esconder a senha
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center w-80">
            <h1 className="text-2xl font-syne mb-10">Sua conta</h1>
            <div className="flex flex-col gap-y-5 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="nome" className="mb-2 text-lg font-syne">Nome</label>
                <input
                  type="text"
                  id="nome"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                  className="bg-gray-300 border border-gray-300 focus:border-gray-500 focus:outline-none"
                  defaultValue={currentUser.displayName}
                  disabled={isGoogleUser}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="sobrenome" className="mb-2 text-lg font-syne">Sobrenome</label>
                <input
                  type="text"
                  id="sobrenome"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                  className="bg-gray-300 border border-gray-300 focus:border-gray-500 focus:outline-none"
                  disabled={isGoogleUser}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-2 text-lg font-syne">Email</label>
                <input
                  type="email"
                  id="email"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                  className="border bg-gray-300 border-gray-300 focus:border-gray-500 focus:outline-none"
                  defaultValue={currentUser.email}
                  disabled={isGoogleUser}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="senha" className="mb-2 text-lg font-syne flex items-center">
                  Senha Atual
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="ml-2 text-sm font-syne text-gray-500 focus:outline-none"
                    disabled={isGoogleUser}
                  >
                    {showPassword ? (
                      <img src="/eye.svg" alt="Mostrar senha" className="w-4 h-4 mr-2" />
                    ) : (
                      <img src="/eye-hide.svg" alt="Esconder senha" className="w-4 h-4 mr-2" />
                    )}
                  </button>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                  className="bg-gray-300 border border-gray-300 focus:border-gray-500 focus:outline-none"
                  disabled={isGoogleUser}
                />
              </div>
              {isGoogleUser && (
                <div className="text-red-600 mt-2">
                  Login feito via Google, não é possível editar os dados.
                </div>
              )}
            </div>
            <button
              className="items-center mt-8 text-lg font-syne border border-gray-300 p-2 rounded-lg text-gray-700 focus:outline-none w-1/4"
              disabled={isGoogleUser}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
