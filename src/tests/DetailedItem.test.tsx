import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { mockData } from '@/utils/mockData';
import DetailedItem from '@/components/DetailedItem';
import renderComponent from './renderComponent';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
const item = mockData[0];

describe('Test render of detailed component', () => {
  test('Detailed Item component displays correct detailed info', async () => {
    renderComponent({
      children: <DetailedItem item={item} />,
    });

    const lengthElement = await screen.findByText(`Length: ${item.length}`);
    const costElement = await screen.findByText(
      `Cost in galactic credits: ${item.cost_in_credits}`
    );
    const classElement = await screen.findByText(
      `Class: ${item.starship_class}`
    );
    expect(lengthElement).not.toBeNull();
    expect(costElement).not.toBeNull();
    expect(classElement).not.toBeNull();
  });
  test('Click on close button closes component', async () => {
    renderComponent({
      children: <DetailedItem item={item} />,
    });

    await act(async () => {
      mockRouter.push('/page/1/detailed/1');
      const closeButton = await screen.findByText('X');
      expect(closeButton).not.toBeNull();
      fireEvent.click(closeButton);

      waitFor(() => {
        expect(mockRouter.asPath).toBe('/page/1/');
      });
    });
  });
});
