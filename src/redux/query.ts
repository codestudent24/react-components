import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStarship, IStarshipResponse } from '../types/starship';

const api = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/starships/' }),
  endpoints: (build) => ({
    starshipList: build.query<IStarshipResponse, string>({
      query(urlParams: string) {
        return `${urlParams}`;
      },
    }),
    starshipDetail: build.query<IStarship, string>({
      query(index: number | string) {
        return `${index}/`;
      },
    }),
  }),
});

export const { useStarshipListQuery, useStarshipDetailQuery } = api;

export default api;
