import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Store from '../../redux/store';
import server from '../../tests/server';
import PageHandler from '.';

describe('Test pagination', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('Pagination changes current page', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <Provider store={Store}>
          <PageHandler />
        </Provider>
      </BrowserRouter>
    );
    let searchParams = new URLSearchParams(window.location.search);
    let pageIndex = searchParams.get('page');
    expect(pageIndex).toBe('1');

    const nextButton = await findByText('>');
    expect(nextButton).not.toBeNull();
    fireEvent.click(nextButton);

    searchParams = new URLSearchParams(window.location.search);
    pageIndex = searchParams.get('page');
    expect(pageIndex).toBe('2');
  });

  afterAll(() => server.close());
});
