import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const idcited = searchParams.get('idcited');
  const query = searchParams.get('query');
  const start = searchParams.get('page');
//   const start = searchParams.get('page'); // Use 'page' para calcular o início dos dados a serem retornados

  try {
    const [googleCitation] = await Promise.all([
      axios.get(`https://serpapi.com/search.json`, {
        params: {
            as_sdt: '40005',
            cites: idcited,
            engine: 'google_scholar',
            q: query,
            start: start, // `start` deve ser a posição inicial dos dados para Google Scholar
            api_key: process.env.API_KEY,
        }
      }),
    ]);

    const googleCitationData = googleCitation.data;

    return NextResponse.json({ googleCitationData });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// https://serpapi.com/search.json?as_sdt=40005&cites=7640662709302200866&engine=google_scholar&hl=en