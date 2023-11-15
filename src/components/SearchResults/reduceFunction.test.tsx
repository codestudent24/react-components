import { mockData } from '../../utils/mockData';
import reduceData from './reduceFunction';

describe('reduceData', () => {
  test('Validate 10 items, 0 offset', () => {
    expect(reduceData(mockData, 10, 0)).toEqual(mockData);
  });
  test('Validate 5 items, 5 offset', () => {
    expect(reduceData(mockData, 5, 5)).toEqual(
      mockData.filter((_, index) => index >= 5)
    );
  });
  test('Validate 5 items, 0 offset', () => {
    expect(reduceData(mockData, 5, 0)).toEqual(
      mockData.filter((_, index) => index < 5)
    );
  });
});
