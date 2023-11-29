import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { act } from 'react-dom/test-utils';
import PageHandler from '@/components/PageHandler';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Test pagination', () => {
  test('Pagination changes current page', async () => {
    render(
      <Provider store={store}>
        <PageHandler />
      </Provider>
    );

    act(() => {
      mockRouter.push('/page/1');
    });
    expect(mockRouter.asPath).toBe('/page/1');

    const nextButton = await screen.findByText('>');
    expect(nextButton).not.toBeNull();
    fireEvent.click(nextButton);

    waitFor(() => {
      expect(mockRouter.asPath).toBe('/page/2/');
    });

    const prevButton = await screen.findByText('<');
    expect(prevButton).not.toBeNull();
    fireEvent.click(prevButton);

    waitFor(() => {
      expect(mockRouter.asPath).toBe('/page/1/');
    });
  });
});
