import {
  BrowserRouter,
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { AppContext } from '../context';
import { initialContextState, myMockResponse } from '../utils/mockData';
import RootLayout from '../Layouts/RootLayout';
import Home from './Home';
import DetailedItem from '../components/DetailedItem';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

const contextState = { ...initialContextState, count: 20 };

describe('Test render full page', () => {
  test('Component updates URL query parameter when page changes', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppContext.Provider value={contextState}>
          <Home />
        </AppContext.Provider>
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
  test('Clicking on a card triggers a navigate to Detailed Card', async () => {
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
      <AppContext.Provider value={initialContextState}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    );

    const cards = await findAllByTestId('ship-button');
    const firstCard = cards[0];
    expect(firstCard).not.toBeNull();
    fireEvent.click(firstCard);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('details', '1');

    const details = await screen.findAllByTestId('detailed-card');
    expect(details).not.toBeNull();
  });
});
