import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const start = searchParams.get('page'); // Use 'page' para calcular o início dos dados a serem retornados

  try {
    const [googleResponse, trendsResponse] = await Promise.all([
      axios.get(`https://serpapi.com/search.json`, {
        params: {
          engine: 'google_scholar',
          q: query,
          start: start, // `start` deve ser a posição inicial dos dados para Google Scholar
          api_key: 'ddcf43af2550a1944a2f8717cc8288bb28ca80af43fdae72beb6621cdde9c7db',
        }
      }),
      axios.get(`https://serpapi.com/search.json`, {
        params: {
          engine: 'google_trends',
          q: query,
          data_type: 'TIMESERIES',
          api_key: 'ddcf43af2550a1944a2f8717cc8288bb28ca80af43fdae72beb6621cdde9c7db',
          date: 'today 12-m'
        }
      })
    ]);

    const googleData = googleResponse.data;
    const trendsData = trendsResponse.data;

    return NextResponse.json({ googleData, trendsData });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
