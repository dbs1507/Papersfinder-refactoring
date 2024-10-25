'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar o hook de roteamento do Next.js
import { registerWithEmailAndPassword, signInWithGoogle } from '../../services/auth';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Inicializar o roteador

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasSpecialChar && hasNumber;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Resetar mensagem de erro

    // Verificação de campos vazios
    if (!firstName || !lastName || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Validação da senha
    if (!validatePassword(password)) {
      setError('A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.');
      return;
    }

    try {
      await registerWithEmailAndPassword(firstName, lastName, email, password);
      router.push('/login'); // Redirecionar para a página de login após o registro
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Esse e-mail já está em uso. Por favor, use outro.');
      } else {
        console.error('Erro ao registrar:', error);
        setError('Ocorreu um erro ao registrar. Tente novamente.');
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      router.push('/'); // Redirecionar para a página inicial após o registro com Google
    } catch (error) {
      console.error('Erro ao registrar com Google:', error);
      setError('Ocorreu um erro ao registrar com o Google. Tente novamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-syne">PAPERSFINDER</h1>
      <h1 className="mt-20 text-2xl text-gray-900 font-syne">Criar conta</h1>
      <div className="sm:w-full sm:max-w-sm border border-gray-300 rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="block text-sm font-syne leading-6 text-gray-900 text-center">
              Nome
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              className="border border-gray-300 focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="block text-sm font-syne leading-6 text-gray-900 text-center">
              Sobrenome
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              className="border border-gray-300 focus:border-gray-500 focus:outline-none"
            />
          </div>
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
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center mt-2">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="font-syne flex justify-center items-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Criar conta
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-gray-600 flex items-center justify-center font-syne">
          Deseja criar conta com
        </p>
        <div className="flex items-center justify-center mt-2">
          <button onClick={handleGoogleRegister}>
            <img src="/google_icon.svg" alt="Google Icon" className="w-12 h-12 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
