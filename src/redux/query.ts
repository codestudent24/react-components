import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IStarship, IStarshipResponse } from '../types/starship';
import { getResults } from '@/utils/api';

type SearchQuery = {
  input: string,
  itemsPerPage: number,
  pageNumber: string
}

const api = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/starships/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    starshipList: build.query<IStarshipResponse, SearchQuery>({
      queryFn: async (urlParams: SearchQuery) => {
        const { input, itemsPerPage, pageNumber } = urlParams;
        return await getResults(input, itemsPerPage, pageNumber);
      }
    }),
    starshipDetail: build.query<IStarship, string>({
      query(index: number | string) {
        return `${index}/`;
      },
    }),
  }),
});

export const {
  useStarshipListQuery,
  useStarshipDetailQuery,
  util: { getRunningQueriesThunk },
} = api;
export const { starshipList, starshipDetail } = api.endpoints;

export default api;
