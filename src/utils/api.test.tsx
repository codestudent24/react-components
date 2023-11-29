import { IStarship } from '@/types/starship';
import server from '../tests/server';
import getStarships, {
  createQuery,
  getRealPage,
  getStarshipByIndex,
  reduceArray,
} from './api';
import { mockData, myMockResponse } from './mockData';

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

describe('Test functions', () => {
  test('Find real bage of API', () => {
    expect(getRealPage(1, 10)).toBe(1);
    expect(getRealPage(3, 5)).toBe(2);
  });
  test('createQuery returns correct result', async () => {
    const query1 = createQuery('', 10, 1);
    expect(query1).toBe('?page=1');
    const query2 = createQuery('CR', 5, 3);
    expect(query2).toBe('?search=CR&page=2');
  });
  test('reduceArray returns correct result', async () => {
    const correctResult1: IStarship[] = [];
    const correctResult2: IStarship[] = [];

    for (let i = 0; i < 5; i += 1) {
      correctResult1.push(mockData[i]);
      correctResult2.push(mockData[i + 5]);
    }
    expect(reduceArray(myMockResponse, 1)).toEqual(correctResult1);
    expect(reduceArray(myMockResponse, 2)).toEqual(correctResult2);
  });
});
