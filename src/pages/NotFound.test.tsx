import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from './Home';
import NotFound from './NotFound';

describe('Test render full page', () => {
  test('Test error 404', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={['/notfoundpage']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const classDescription = await findByText(/Error 404: Page not found/i);
    expect(classDescription).not.toBeNull();
  });
});
