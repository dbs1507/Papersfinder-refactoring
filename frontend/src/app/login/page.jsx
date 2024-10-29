"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmailAndPassword, signInWithGoogle } from '../../services/auth';
import eyeIcon from '../../../public/eye.svg';
import eyeHideIcon from '../../../public/eye-hide.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado para alternar a visibilidade da senha
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithEmailAndPassword(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Erro ao fazer login com o Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 relative">
      <div className='flex items-center justify-center'>
        <a href='/' className="text-3xl font-syne mt-10">PAPERSFINDER</a>
      </div>
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
                type={showPassword ? "text" : "password"} // Alterna o tipo entre 'text' e 'password'
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                className="border border-gray-300 focus:border-gray-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
              >
                {showPassword ? <img src='/eye.svg' className="w-4 mt-2 h-4" /> :<img className="w-4 mt-2 h-4"  src='/eye-hide.svg' />}
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-400 font-syne">
              <a target="_blank" href="/forgetPassword" className="hover:text-gray-500">Esqueceu a senha?</a>
            </div>
          </div>
          <div className='pt-5 '>
            <button
              type="submit"
              className="font-syne flex justify-center items-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Logar'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-gray-600 flex items-center justify-center font-syne">
          Deseja realizar o login com
        </p>
        <div className="flex items-center justify-center mt-2">
          <button onClick={handleGoogleLogin} disabled={loading}>
            <img src="/google_icon.svg" alt="Google Icon" className="w-12 h-12 ml-2" />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center font-syne">
          <a href="/register" className="text-gray-600">Ainda não tem conta? Cadastre-se</a>
        </p>
      </div>
      {error && (
        <div className="absolute top-16 right-16 bg-red-500 text-white p-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
