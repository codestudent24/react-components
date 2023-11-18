import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react';
import server from '../../tests/server';
import Store from '../../redux/store';
import Home from '../../pages/Home';

describe('Test Search', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('Click on search button changes current page to 1', async () => {
    const { getByTestId, getByRole } = render(
      <BrowserRouter>
        <Provider store={Store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const input = getByRole('textbox');
      fireEvent.paste(input, 'CR90');
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set('page', '2');
      let page = searchParams.get('page');
      expect(page).toBe('2');
      const searchButton = getByTestId('button-search');
      expect(searchButton).not.toBeNull();
      fireEvent.click(searchButton);
      searchParams = new URLSearchParams(window.location.search);
      page = searchParams.get('page');
      expect(page).toBe('1');
    });
  });

  afterAll(() => server.close());
});
