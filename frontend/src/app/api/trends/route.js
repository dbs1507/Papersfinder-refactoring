import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const palavraChave = searchParams.get('palavraChave');
  const apiKey = 'ddcf43af2550a1944a2f8717cc8288bb28ca80af43fdae72beb6621cdde9c7db';
  const baseURL = 'https://serpapi.com/search.json';

  const params = {
    engine: 'google_trends',
    q: palavraChave,
    data_type: 'TIMESERIES',
    api_key: apiKey,
    date: 'today 6-m',
  };

  try {
    const response = await axios.get(baseURL, { params });
    const interestOverTime = response.data.interest_over_time;

    if (!interestOverTime) {
      return NextResponse.json([]);
    }

    const dadosOutraApi = interestOverTime.timeline_data;
    const consultasRelacionadas = dadosOutraApi.map(entry => 
      entry.values.map(valueEntry => ({
        date: new Date(entry.date.split('–')[0].trim()),
        value: parseInt(valueEntry.value, 10),
      }))
    ).flat();

    return NextResponse.json(consultasRelacionadas);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data from Google Trends' }, { status: 500 });
  }
}
