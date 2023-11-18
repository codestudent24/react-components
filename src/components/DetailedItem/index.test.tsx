import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import DetailedItem from '.';
import Store from '../../redux/store';
import server from '../../tests/server';

describe('Test Detailed item', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('Loader is displaying', async () => {
    render(
      <MemoryRouter initialEntries={['/detailed/?page=1&details=0']}>
        <Provider store={Store}>
          <DetailedItem />
        </Provider>
      </MemoryRouter>
    );
    const loader = await screen.findByTestId('loader-div');
    expect(loader).not.toBeNull();
  });

  afterAll(() => server.close());
});
