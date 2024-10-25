import { useAuth } from '../context/AuthContext';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

const Account = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento

  const isGoogleUser = currentUser?.providerId === 'google.com';

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const handlePasswordReset = async () => {
    setLoading(true); // Inicia o carregamento
    const actionCodeSettings = {
      // URL para onde o usuário será redirecionado após a redefinição
      url: 'https://papersfinder-refactoring.onrender.com/login',
      handleCodeInApp: true,
    };
    try {
      await sendPasswordResetEmail(auth, currentUser.email,actionCodeSettings);
      setFeedbackMessage('Um e-mail para redefinir sua senha foi enviado para seu email cadastrado!.');
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha: ", error);
      setFeedbackMessage('Erro ao tentar redefinir a senha. Por favor, tente novamente.');
    } finally {
      setLoading(false); // Para o carregamento, independentemente do resultado
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow mt-24">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center w-80">
          <h1 className="text-2xl font-syne mb-10">Sua conta</h1>
          <div className="flex flex-col gap-y-5 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="mb-2 text-lg font-syne">Nome</label>
              <input
                type="text"
                id="firstName"
                className='rounded md bg-gray-200 p-2'
                value={currentUser?.providerId === 'google.com' ? currentUser?.displayName : currentUser?.firstName}
                disabled
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="mb-2 text-lg font-syne">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                className='rounded md bg-gray-200 p-2'
                value={currentUser?.lastName || ''}
                disabled
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-2 text-lg font-syne">E-mail</label>
              <input
                type="text"
                className='rounded md bg-gray-200 p-2'
                id="email"
                value={currentUser?.email || ''}
                disabled
              />
            </div>

            {!isGoogleUser && (
              <button
                className="items-center mt-8 text-lg font-syne border border-gray-300 hover:bg-gray-300 p-1 rounded-lg text-gray-700"
                onClick={handlePasswordReset}
                disabled={loading} // Desabilita o botão enquanto está carregando
              >
                {loading ? 'Enviando...' : 'Redefinir Senha'} {/* Texto dinâmico baseado no estado de carregamento */}
              </button>
            )}

            {isGoogleUser && (
              <div className="text-red-600 mt-2">
                Login feito via Google, não é possível redefinir a senha.
              </div>
            )}
          </div>

          {feedbackMessage && (
            <div className="absolute top-16 right-16 bg-green-500 text-white p-2 rounded-md">
              {feedbackMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
