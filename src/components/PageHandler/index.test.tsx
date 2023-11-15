import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
// import userEvent from '@testing-library/user-event';
import { AppContext, AppContextType } from '../../context';
import { IStarshipResponse } from '../../types/starship';
import { mockData } from '../../utils/mockData';
import PageHandler from '.';

const initialContextState: AppContextType = {
  input: '',
  setInput: () => {},
  count: 20,
  setCount: () => {},
  itemsPerPage: 10,
  setItemsPerPage: () => {},
  data: mockData,
  setData: () => {},
};

const myMockResponse: IStarshipResponse = {
  count: 10,
  previous: null,
  next: null,
  results: mockData,
};

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(myMockResponse));

describe('Test pagination', () => {
  test('Display pagination', async () => {
    const location = {
      ...window.location,
      search: '?page=1',
    };

    Object.defineProperty(window, 'location', {
      value: location,
    });

    const { findByText } = render(
      <BrowserRouter>
        <AppContext.Provider value={initialContextState}>
          <PageHandler loading={false} setLoading={() => {}} />
        </AppContext.Provider>
      </BrowserRouter>
    );
    const nextButton = await findByText('>');
    fireEvent.click(nextButton);
    expect(nextButton).not.toBeNull();
  });
});
