/* eslint-disable react/jsx-no-constructed-context-values */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '.';
import { initialContextState } from '../../utils/mockData';
import { AppContext } from '../../context';

describe('Test render of search results', () => {
  test('Test search results with 10 items per page', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={initialContextState}>
          <SearchResults loading={false} />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const itemList = await screen.findAllByRole('listitem');
    expect(itemList.length).toBe(10);
  });
  test('Test search results with null data has appropriate header', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...initialContextState, data: [] }}>
          <SearchResults loading={false} />
        </AppContext.Provider>
      </MemoryRouter>
    );
    await screen.findByText(/We have no more ships for you!/i);
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });
});
