import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Search from '@/components/Search/Search';
import renderComponent from './renderComponent';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Test Search', () => {
  test('Click on search button changes route appropriatly', async () => {
    renderComponent({
      children: <Search />,
    });
    const baseRoute = '/page/1/detailed/1';
    const value = 'CR90';

    act(() => {
      mockRouter.push(baseRoute);
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: {
        value,
      },
    });

    const searchBtn = screen.getByTestId('button-search');
    fireEvent.click(searchBtn);

    waitFor(() => {
      expect(mockRouter.asPath).toBe(`${baseRoute}?search=${value}`);
    });
  });
});
