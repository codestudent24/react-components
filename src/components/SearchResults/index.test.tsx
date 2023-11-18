import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import server from '../../tests/server';
import Store from '../../redux/store';
import Home from '../../pages/Home';

describe('Test render of search results', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('SearchResults displays correct amount of items', async () => {
    render(
      <MemoryRouter>
        <Provider store={Store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      let itemList = screen.getAllByRole('listitem');
      expect(itemList.length).toBe(10);
      const input = screen.getByRole('textbox');
      userEvent.type(input, 'AAA999AAA');
      const searchButton = screen.getByTestId('button-search');
      expect(searchButton).not.toBeNull();
      fireEvent.click(searchButton);
      itemList = screen.queryAllByRole('listitem');
      expect(itemList.length).toBe(0);
    });
  });
  afterAll(() => server.close());
});
