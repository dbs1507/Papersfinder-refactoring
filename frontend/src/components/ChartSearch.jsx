'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const ChartSearch = () => (
  <>
    <ResponsiveContainer width="50%" height={700}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="linear" dataKey="pv" stroke="#000000" strokeWidth={2} />
        <Legend 
          verticalAlign="top"   // Alinha a legenda na parte superior
          content={<CustomLegend />}  // Usamos um componente personalizado para o conteúdo da legenda
        />
      </LineChart>
    </ResponsiveContainer>
  </>
);

// Componente para personalizar o conteúdo da legenda
const CustomLegend = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:'10px' }}>
    <div style={{ width: '30px', height: '15px', backgroundColor: '#000000', marginRight: '5px' }}></div>
    <span className='text-sm' >Interesse ao longo do tempo</span>
  </div>
);

export default ChartSearch;
