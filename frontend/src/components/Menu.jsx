// src/components/Menu.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import MenuButton from './MenuButton';

const Menu = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-end items-center p-4">
      {currentUser ? (
        <Link href="/account">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center">
            {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
          </div>
        </Link>
      ) : (
        <MenuButton title1="Login" title2="Cadastrar" textSize="sm" />
      )}
    </div>
  );
};

export default Menu;
