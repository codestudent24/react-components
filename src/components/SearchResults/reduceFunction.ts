import { IStarship } from '../../types/starship';

export default function reduceData(
  data: IStarship[],
  itemsPerPage: number,
  offset: number
) {
  if (itemsPerPage === 10) return data;

  const max = data.length < itemsPerPage ? data.length : itemsPerPage;
  const reducedData: IStarship[] = [];

  for (let i = 0; i < max; i += 1) {
    reducedData.push(data[i + offset]);
  }

  return reducedData;
}
