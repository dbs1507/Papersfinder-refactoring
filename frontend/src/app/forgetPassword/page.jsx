"use client"
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Adicionado para feedback ao usuário

  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    setLoading(true);
    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: 'https://papersfinder-refactoring.onrender.com/login', // URL para redirecionamento após redefinição
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setFeedbackMessage('E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      setFeedbackMessage('Erro ao enviar e-mail. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Garante que o botão não ficará travado em "Redefinindo..."
      setTimeout(() => setFeedbackMessage(''), 5000); // Limpa a mensagem de feedback após 5 segundos
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 relative">
      <div className="flex items-center justify-center">
        <a href="/" className="text-3xl font-syne mt-10">PAPERSFINDER</a>
      </div>
      <div className="mt-24 sm:w-full sm:max-w-sm border border-gray-300 rounded-lg p-6">
        <form className="space-y-6" onSubmit={handlePasswordReset}>
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
          <div className="pt-5">
            <button
              type="submit"
              className="font-syne flex justify-center items-center w-full rounded-md bg-gray-900 px-3 py-2 text-sm leading-6 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              disabled={loading}
            >
              {loading ? 'Redefinindo...' : 'Redefinir senha'}
            </button>
          </div>
        </form>
      </div>
        {feedbackMessage && (
            <div className="absolute top-16 right-16 bg-green-500 text-white p-2 rounded-md">
            {feedbackMessage}
            </div>
        )}
    </div>
  );
};

export default ForgetPassword;
