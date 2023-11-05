import getStarships from './api';
import { IStarship } from '../types/starship';

export default async function loadDataFromApi(
  loadingCallback: (value: boolean) => void,
  dataCallback: (value: IStarship[]) => void,
  nextPageCallback: (value: boolean) => void,
  prevPageCallback: (value: boolean) => void,
  input: string,
  currentPage: number
) {
  loadingCallback(true);
  const fetchedData = await getStarships(input, currentPage);

  if (fetchedData.next === null) {
    nextPageCallback(false);
  } else {
    nextPageCallback(true);
  }
  if (fetchedData.previous === null) {
    prevPageCallback(false);
  } else {
    prevPageCallback(true);
  }

  dataCallback(fetchedData.results);

  loadingCallback(false);
}
