import { screen } from '@testing-library/react';
import NotFound from '@/pages/404';
import renderComponent from './renderComponent';

describe('Test render of 404 Page', () => {
  test('404 page renders on wrong path', async () => {
    renderComponent({ children: <NotFound />, path: '/wrong/path' });
    const errorMessage = await screen.findByText('Error 404: Page not found');
    expect(errorMessage).not.toBeNull();
  });
});
