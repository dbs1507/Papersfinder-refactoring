'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartSearch = ({data}) => {

  // Verifique se os dados estão disponíveis e se há dados para o gráfico
  if (!data || !data.interest_over_time || !data.interest_over_time.timeline_data || data.interest_over_time.timeline_data.length === 0) {
    return <div>No trend data available for this query.</div>; // Mensagem de erro
  }

  const data1 = data.interest_over_time.timeline_data.map((item) => ({
    name: item.date, 
    pv: item.values.map((value) => value.value)
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          <p>{`Mês: ${label}`}</p>
          <p>{`Nível de interesse: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer width="77.5%" height={700}>
        <LineChart data={data1}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="pv" stroke="#000000" strokeWidth={2} />
          <Legend 
            verticalAlign="top"   
            content={<CustomLegend />}  
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomLegend = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom:'10px' }}>
    <div style={{ width: '30px', height: '15px', backgroundColor: '#000000', marginRight: '5px' }}></div>
    <span className='text-sm' >Interesse ao longo do tempo</span>
  </div>
);

export default ChartSearch;
