import server from '../tests/server';
import getStarships, { getStarshipByIndex } from './api';
import { mockData } from './mockData';

server.listen();

describe('MSW returns mock data', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('Base URL', async () => {
    const response = await getStarships();
    expect(response.results).toEqual(mockData);
  });
  it('URL with Id', async () => {
    const response = await getStarshipByIndex('3');
    expect(response).toEqual(mockData[3]);
  });
  afterAll(() => server.close());
});
