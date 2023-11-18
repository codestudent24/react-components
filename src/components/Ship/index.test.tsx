import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mockData } from '../../utils/mockData';
import Ship from '.';

describe('Test render of ship item', () => {
  test('Name and model are appropriate for data[0] item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Ship item={mockData[0]} />
      </MemoryRouter>
    );
    const header = getByText(`Starship ${mockData[0].name}`);
    const model = getByText(`Model: ${mockData[0].model}`);
    expect(header).not.toBeNull();
    expect(model).not.toBeNull();
  });
  test('Name and model are appropriate for data[7] item', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Ship item={mockData[7]} />
      </MemoryRouter>
    );
    const header = getByText(`Starship ${mockData[7].name}`);
    const model = getByText(`Model: ${mockData[7].model}`);
    expect(header).not.toBeNull();
    expect(model).not.toBeNull();
  });
});
