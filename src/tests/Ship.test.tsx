import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { mockData } from '../utils/mockData';
import Ship from '../components/Ship';
import renderComponent from './renderComponent';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Test render of ship item', () => {
  test('Name and model are appropriate for data[0] item, and click goes to detailed page', async () => {
    renderComponent({
      children: <Ship item={mockData[0]} />,
    });

    act(() => {
      mockRouter.push('/page/1');
    });

    const header = screen.getByText(`Starship ${mockData[0].name}`);
    const model = screen.getByText(`Model: ${mockData[0].model}`);
    expect(header).not.toBeNull();
    expect(model).not.toBeNull();

    const btn = screen.getByTestId('ship-button');
    expect(btn).not.toBeNull();
    fireEvent.click(btn);

    waitFor(() => {
      expect(mockRouter.asPath).toBe('/page/1/detailed/0');
    });
  });
  test('Name and model are appropriate for data[7] item', async () => {
    renderComponent({
      children: <Ship item={mockData[7]} />,
    });
    const header = screen.getByText(`Starship ${mockData[7].name}`);
    const model = screen.getByText(`Model: ${mockData[7].model}`);
    expect(header).not.toBeNull();
    expect(model).not.toBeNull();
  });
});
