import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { AppContext } from './context';
import { initialContextState, myMockResponse } from './utils/mockData';
import Home from './pages/Home';
import Error from './pages/Error';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

describe('Test render full page', () => {
  test('Test error 404', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={['/notfoundpage']}>
        <AppContext.Provider value={initialContextState}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const classDescription = await findByText(/we have an error/i);
    expect(classDescription).not.toBeNull();
  });
});
