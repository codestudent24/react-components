import { MemoryRouter, useOutletContext } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockData, initialContextState } from '../../utils/mockData';
import DetailedItem from '.';
import { AppContext } from '../../context';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

describe('Test render of detailed item', () => {
  test('Display detailed card', async () => {
    (useOutletContext as jest.Mock).mockReturnValue([false]);
    const { findByText } = render(
      <MemoryRouter initialEntries={['/detailed/?page=1&details=0']}>
        <AppContext.Provider value={initialContextState}>
          <DetailedItem />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const classDescription = await findByText(
      `Class: ${mockData[0].starship_class}`
    );
    const lengthDescription = await findByText(`Length: ${mockData[0].length}`);
    const cost = await findByText(
      `Cost in galactic credits: ${mockData[0].cost_in_credits}`
    );
    expect(classDescription).not.toBeNull();
    expect(lengthDescription).not.toBeNull();
    expect(cost).not.toBeNull();
  });
  test('Click on close button closes detailed card', async () => {
    (useOutletContext as jest.Mock).mockReturnValue([false]);
    const { queryByText, findByRole } = render(
      <MemoryRouter initialEntries={['/detailed/?page=1&details=0']}>
        <AppContext.Provider value={initialContextState}>
          <DetailedItem />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const button = await findByRole('button');
    await userEvent.click(button);
    const lengthDescription = queryByText(/length/i);
    expect(lengthDescription).toBeNull();
  });
  test('Loader is displaying', async () => {
    (useOutletContext as jest.Mock).mockReturnValue([true]);
    render(
      <MemoryRouter initialEntries={['/detailed/?page=1&details=0']}>
        <AppContext.Provider value={initialContextState}>
          <DetailedItem />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const loader = await screen.findByTestId('loader-div');
    expect(loader).not.toBeNull();
  });
});
