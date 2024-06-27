"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar o hook de roteamento do Next.js
import { loginWithEmailAndPassword, signInWithGoogle } from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Inicializar o roteador

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
      router.push('/'); // Redirecionar para a página inicial
      // Redirecionar ou mostrar mensagem de sucesso
    } catch (error) {
      console.error(error);
      // Mostrar mensagem de erro
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/'); // Redirecionar para a página inicial

      // Redirecionar ou mostrar mensagem de sucesso
    } catch (error) {
      console.error(error);
      // Mostrar mensagem de erro
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-syne mb-10">PAPERSFINDER</h1>
      <h1 className="mt-20 text-2xl text-gray-900 font-syne">Login</h1>
      <div className="mt-10 sm:w-full sm:max-w-sm border border-gray-300 rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-syne leading-6 text-gray-900 text-center">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              className="border border-gray-300 focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="password" className="block text-sm font-syne leading-6 text-gray-900 text-center">
              Senha
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                className="border border-gray-300 focus:border-gray-500 focus:outline-none pr-10"
              />
            </div>
            <div className="mt-2 text-sm text-gray-400 font-syne">
              <a href="#" className="hover:text-gray-500">Esqueceu a senha?</a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="font-syne flex justify-center items-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Logar
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-gray-600 flex items-center justify-center font-syne">
          Deseja realizar o login com
        </p>
        <div className="flex items-center justify-center mt-2">
          <button onClick={handleGoogleLogin}>
            <img src="/google_icon.svg" alt="Google Icon" className="w-12 h-12 ml-2" />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center font-syne">
          <a href="#" className="text-gray-600">Ainda não tem conta? Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
