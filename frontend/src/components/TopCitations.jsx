import React from 'react';
import CardArticle from './CardArticle';


const TopCitations = () => (
    
    <div className="p-4 w-3/4 bg-white border border-gray-200 rounded-lg shadow mb-6 ml-14">
    <ul className=''>
        <div className='flex'>
            <li className='pl-10 text-9xl font-sans font-bold text-slate-950 py-2'>
                1
            </li>
            <CardArticle size="w-5/6"/>
        </div>
        <div className='flex'>
            <li className='pl-10 text-9xl font-sans font-bold text-slate-600 py-2'>
                2
            </li>
            <CardArticle size="w-5/6"/>
        </div>
        <div className='flex'>
            <li className='pl-10 text-9xl font-sans font-bold text-slate-500 py-2'>
                3
            </li>
            <CardArticle size="w-5/6"/>
        </div>
        <div className='flex'>
            <li className='pl-10 text-9xl font-sans font-bold text-slate-400 py-2'>
                4
            </li>
            <CardArticle size="w-5/6"/>
        </div>        
        <div className='flex'>
            <li className='pl-10 text-9xl font-sans font-bold text-slate-300 py-2'>
                5
            </li>
            <CardArticle size="w-5/6"/>
        </div>    
        </ul>
    </div>

    
  );
  
  export default TopCitations;