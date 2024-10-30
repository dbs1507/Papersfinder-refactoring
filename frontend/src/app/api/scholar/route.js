import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const palavraChave = searchParams.get('palavraChave');
  const pagina = searchParams.get('pagina') || 1;
  const apiKey = process.env.API_KEY;
  const baseURL = 'https://serpapi.com/search.json';

  const params = {
    engine: 'google_scholar',
    q: palavraChave,
    api_key: apiKey,
    start: (pagina - 1) * 10,
  };

  try {
    const response = await axios.get(baseURL, { params });
    const paginationResponseData = {
      organic_results: response.data.organic_results,
      page: String(pagina),
    };

    return NextResponse.json({
      totalResults: response.data.search_information.total_results,
      paginationResponses: [paginationResponseData],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data from Google Scholar' }, { status: 500 });
  }
}
