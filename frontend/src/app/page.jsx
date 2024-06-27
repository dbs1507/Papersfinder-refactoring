import React from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen pb-96">
        <h1 className="text-4xl font-syne mb-6">PAPERSFINDER</h1>
        <SearchBar />
      </div>
    </>
  );
}
