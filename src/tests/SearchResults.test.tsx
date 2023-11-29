import { screen } from '@testing-library/react';
import server from '@/tests/server';
import { myMockResponse } from '@/utils/mockData';
import SearchResults from '@/components/SearchResults';
import renderComponent from './renderComponent';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Test render of search results', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('SearchResults displays correct amount of items', async () => {
    renderComponent({
      children: <SearchResults propsData={myMockResponse} />,
    });
    const itemList = await screen.findAllByRole('listitem');
    expect(itemList.length).toBe(10);
  });

  afterAll(() => server.close());
});
