import {getAuth,sendEmailVerification,sendPasswordResetEmail,EmailAuthProvider,reauthenticateWithCredential, verifyBeforeUpdateEmail} from 'firebase/auth';

import { updateUserDetails,firebaseUpdateEmail } from '../services/auth';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { currentUser } = useAuth();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [isGoogleUser, setIsGoogleUser] = useState(currentUser?.providerId === 'google.com');

  useEffect(() => {
    setIsGoogleUser(currentUser?.providerId === 'google.com');
  }, [currentUser]);

  const reauthenticateUser = async (password) => {
    const auth = getAuth();
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      console.log('Usuário reautenticado com sucesso.');
    } catch (error) {
      console.error('Erro ao reautenticar usuário:', error);
      throw new Error('Senha incorreta. Por favor, tente novamente.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) throw new Error("Usuário não está logado.");
  
      if (email !== user.email) {
        if (!password) throw new Error("A senha é necessária para alterar o e-mail.");
  
        // Reautentica o usuário com a senha
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
  
        // Configurações para o link de verificação de e-mail
        const actionCodeSettings = {
          url: "http://localhost:3000/login", // URL de redirecionamento após verificação
          handleCodeInApp: true,
        };
  
        // Atualiza o e-mail e envia o link de verificação
        await verifyBeforeUpdateEmail(user, email, actionCodeSettings);
  
        setFeedbackMessage("O email foi atualizado e um link de verificação foi enviado para o novo endereço.");
      } else {
        // Atualiza apenas o nome e sobrenome se o e-mail não mudou
        await updateUserDetails(user.uid, { firstName, lastName, email });
        setFeedbackMessage("Dados do usuário atualizados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      setFeedbackMessage(`Erro ao atualizar dados: ${error.message || "Verifique as informações e tente novamente."}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedbackMessage(""), 5000);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: 'https://papersfinder-refactoring.onrender.com/login',
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, currentUser.email, actionCodeSettings);
      setFeedbackMessage('E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      setFeedbackMessage('Erro ao enviar e-mail. Tente novamente mais tarde.');
    } finally {
      setTimeout(() => setFeedbackMessage(''), 5000);
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
                className="rounded-md border-2 border-gray-300 p-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isGoogleUser}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="mb-2 text-lg font-syne">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                className="rounded-md border-2 border-gray-300 p-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isGoogleUser}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-2 text-lg font-syne">E-mail</label>
              <input
                type="email"
                id="email"
                className="rounded-md border-2 border-gray-300 p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isGoogleUser}
              />
            </div>

            {email !== currentUser.email && (
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="mb-2 text-lg font-syne">Senha Atual</label>
                <input
                  type="password"
                  id="password"
                  className="rounded-md border-2 border-gray-300 p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {!isGoogleUser && (
              <div className="inline-flex gap-5">
                <button
                  className="mt-4 w-full text-sm font-syne border border-gray-900 bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-600"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>

                <button
                  className="mt-4 w-full text-sm font-syne border border-red-500 bg-gray-400 text-white p-2 rounded-lg hover:bg-red-600"
                  onClick={handlePasswordReset}
                >
                  Redefinir Senha
                </button>
              </div>
            )}

            {isGoogleUser && (
              <div className="text-red-600 mt-2">
                Login feito via Google, não é possível editar os dados.
              </div>
            )}

            {feedbackMessage && (
              <div className="absolute top-16 right-16 bg-green-500 text-white p-2 rounded-md">
                {feedbackMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
