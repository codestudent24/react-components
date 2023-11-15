import { IStarship } from '../../types/starship';

export default function reduceData(
  data: IStarship[],
  itemsPerPage: number,
  page: number
) {
  if (itemsPerPage === 10) return data;

  const max = data.length < itemsPerPage ? data.length : itemsPerPage;
  const reducedData: IStarship[] = [];

  let offset = 0;
  if (itemsPerPage === 5) offset = page % 2 === 0 ? 5 : 0;

  for (let i = 0; i < max; i += 1) {
    reducedData.push(data[i + offset]);
  }

  return reducedData;
}
