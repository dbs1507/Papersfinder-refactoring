import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const palavraChave = searchParams.get('query');
  const keyword = searchParams.get('keyword');
  const start = searchParams.get('page');


  const totalPages = 10; // Número de páginas a serem verificadas
  const baseURL = 'https://serpapi.com/search.json';
  const apiKey = process.env.API_KEY;
  
  try {
    let allArticles = [];

    for (let i = 0; i < totalPages; i++) {
      const start = i * 10; // Paginação (0, 10, 20, ..., 90)
      const response = await axios.get(baseURL, {
        params: {
          engine: 'google_scholar',
          q: palavraChave,
          start: start,
          api_key: apiKey,
          keyword: keyword
        },
      });

      const articles = response.data.organic_results || [];
      allArticles.push(...articles);
    }

    // Ordenar todos os artigos combinados por número de citações
    const topCitedArticles = allArticles
      .filter(article => article.inline_links?.cited_by?.total)
      .sort((a, b) => b.inline_links.cited_by.total - a.inline_links.cited_by.total)
      .slice(0, 5); // Pega os 5 mais citados

      console.log(topCitedArticles)

    return NextResponse.json(topCitedArticles);
  } catch (error) {
    console.error('Error fetching data from Google Scholar:', error);
    return NextResponse.json({ error: 'Error fetching data from Google Scholar' }, { status: 500 });
  }
}
