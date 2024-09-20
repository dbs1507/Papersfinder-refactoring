import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const idcited = searchParams.get('idcited');
    const query = searchParams.get('query');
    const start = searchParams.get('page'); // já está correto
  
    try {
      const googleCitation = await axios.get(`https://serpapi.com/search.json`, {
        params: {
          as_sdt: '40005',
          cites: idcited,
          engine: 'google_scholar',
          q: query,
          start: start, // Passa o índice calculado
          api_key: process.env.SERPAPI_KEY, // Sempre guarde sua API key em variáveis de ambiente
        }
      });
  
      const googleCitationData = googleCitation.data;
  
      return NextResponse.json({ googleCitationData });
    } catch (error) {
      console.error('Error fetching combined data:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  }
  
