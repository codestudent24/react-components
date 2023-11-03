import getStarships from './api';
import { IStarship } from '../types/starship';

export default async function loadDataFromApi(
  loadingCallback: (value: boolean) => void,
  dataCallback: (value: IStarship[]) => void,
  input: string
) {
  loadingCallback(true);
  const fetchedData = await getStarships(input);
  dataCallback(fetchedData);
  loadingCallback(false);
}
