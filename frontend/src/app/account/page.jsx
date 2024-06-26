import React from 'react';
import './styles.css'; // Importe o arquivo de estilos CSS

const Account = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-items-center min-h-screen pt-5">
        <h1 className="text-3xl font-syne mt-10">PAPERSFINDER</h1>
      </div>
      <div className="ball-container">
        <span className="ball">
          <span className="ball-text font-sans">D</span>
        </span>
        <p className="font-syne text-3xl mt-2">Daniel</p>
      </div>
    </>
  );
};

export default Account;
