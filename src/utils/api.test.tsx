import fetchMock from 'jest-fetch-mock';
import { IStarshipResponse } from '../types/starship';
import getStarships from './api';
import { mockData } from './mockData';

const myMockResponse: IStarshipResponse = {
  count: 10,
  previous: null,
  next: null,
  results: mockData,
};

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

it('Get mock data by getStarships', async () => {
  const response = await getStarships();
  expect(response.results).toEqual(mockData);
});
