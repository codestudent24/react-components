import { http, HttpResponse } from 'msw';
import { mockData } from '../utils/mockData';
import { IStarshipResponse } from '../types/starship';

const baseURL = 'https://swapi.dev/api/starships/';

const handlers = [
  http.get(baseURL, () => {
    return HttpResponse.json({
      count: 20,
      next: null,
      previous: null,
      results: mockData,
    } as IStarshipResponse);
  }),
  http.get(`${baseURL}:id`, ({ params }) => {
    const { id } = params;
    const numId = Number(id);

    if (!mockData[numId]) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(mockData[numId]);
  }),
];

export default handlers;
