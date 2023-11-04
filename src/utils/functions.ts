import getStarships from './api';
import { IStarship } from '../types/starship';

export default async function loadDataFromApi(
  loadingCallback: (value: boolean) => void,
  dataCallback: (value: IStarship[]) => void,
  input: string,
  currentPage: number
) {
  loadingCallback(true);
  const fetchedData = await getStarships(input, currentPage);
  dataCallback(fetchedData);
  loadingCallback(false);
}
