import {
  BrowserRouter,
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import server from '../tests/server';
import Store from '../redux/store';
import Home from './Home';
import RootLayout from '../Layouts/RootLayout';
import DetailedItem from '../components/DetailedItem';
import { mockData } from '../utils/mockData';

describe('Test render full page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  test('Component updates URL query parameter when page changes', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={Store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      let searchParams = new URLSearchParams(window.location.search);
      let pageIndex = searchParams.get('page');
      expect(pageIndex).toBe('1');
      const nextPageButton = getByText('>');
      expect(nextPageButton).not.toBeNull();
      fireEvent.click(nextPageButton);
      searchParams = new URLSearchParams(window.location.search);
      pageIndex = searchParams.get('page');
      expect(pageIndex).toBe('2');
    });
  });
  test('Clicking on a card navigates to Detailed Card and shows appropriate info, close button works correct', async () => {
    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate,
    }));

    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />}>
            <Route path="detailed" element={<DetailedItem />} />
          </Route>
        </Route>
      )
    );

    const { findAllByTestId } = render(
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const cards = await findAllByTestId('ship-button');
    const firstCard = cards[0];
    const firstItem = mockData[0];

    expect(firstCard).not.toBeNull();
    fireEvent.click(firstCard);
    const details = await screen.findAllByTestId('detailed-card');
    expect(details).not.toBeNull();

    const starshipClass = `Class: ${firstItem.starship_class}`;
    expect(screen.getByText(starshipClass)).not.toBeNull();
    expect(screen.getByText(`Length: ${firstItem.length}`)).not.toBeNull();
    expect(
      screen.getByText(`Cost in galactic credits: ${firstItem.cost_in_credits}`)
    ).not.toBeNull();

    const button = await screen.findByTestId('detailed-close');
    await userEvent.click(button);
    expect(screen.queryByText(starshipClass)).toBeNull();
  });

  afterAll(() => server.close());
});
