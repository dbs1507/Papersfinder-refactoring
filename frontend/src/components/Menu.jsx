import React from 'react';
import MenuButton from './MenuButton';


const Menu = () => {
  return (
    <div className='flex justify-end pr-20 pt-5'>
        <MenuButton title1={'Login'} title2={'Cadastro'}  textSize="sm"/>
    </div>
  );
};

export default Menu;