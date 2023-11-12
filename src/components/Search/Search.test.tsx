import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { initialContextState, myMockResponse } from '../../utils/mockData';
import { AppContext } from '../../context';
import Search from './Search';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

describe('Test Search component', () => {
  beforeAll(() => {
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};

      return {
        getItem(key: string) {
          return store[key] || null;
        },
        setItem(key: string, value: string) {
          store[key] = value.toString();
        },
        removeItem(key: string) {
          delete store[key];
        },
        clear() {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });
  test('Component set value to local storage', async () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter>
        <AppContext.Provider value={initialContextState}>
          <Search setLoading={() => {}} />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const button = getByTestId('button-search');
    const inputElement = getByRole('textbox');
    await userEvent.type(inputElement, '12345');
    await userEvent.click(button);
    const searchKey = localStorage.getItem('searchKey');
    expect(searchKey).toBe('12345');
  });
  test('Component retrieves the value from local storage', async () => {
    const { findByRole } = render(
      <MemoryRouter>
        <AppContext.Provider value={initialContextState}>
          <Search setLoading={() => {}} />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const inputElement = (await findByRole('textbox')) as HTMLInputElement;
    const defaultInput = inputElement.value;
    const storedInput = localStorage.getItem('searchKey');
    expect(defaultInput).toBe(storedInput);
  });
});
