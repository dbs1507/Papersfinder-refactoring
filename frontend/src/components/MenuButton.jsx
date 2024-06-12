import React from 'react';

const MenuButton = ({ title1,title2, textSize }) => {
  return (
    <div className='flex gap-3'>
        <button className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded text-${textSize}`}>
            {title1}
        </button>
        <button className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded text-${textSize}`}>
            {title2}
        </button>
    </div>
  );
};

export default MenuButton;
