import { mockData } from '../../utils/mockData';
import reduceData from './reduceFunction';

describe('reduceData', () => {
  test('Validate 10 items', () => {
    expect(reduceData(mockData, 10, 0)).toEqual(mockData);
  });
  test('Validate 5 items, first page', () => {
    expect(reduceData(mockData, 5, 1)).toEqual(
      mockData.filter((_, index) => index < 5)
    );
  });
  test('Validate 5 items, second page', () => {
    expect(reduceData(mockData, 5, 2)).toEqual(
      mockData.filter((_, index) => index >= 5)
    );
  });
});
