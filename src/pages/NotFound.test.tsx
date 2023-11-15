import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { AppContext } from '../context';
import { initialContextState, myMockResponse } from '../utils/mockData';
import Home from './Home';
import NotFound from './NotFound';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

describe('Test render full page', () => {
  test('Test error 404', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={['/notfoundpage']}>
        <AppContext.Provider value={initialContextState}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const classDescription = await findByText(/Error 404: Page not found/i);
    expect(classDescription).not.toBeNull();
  });
});
