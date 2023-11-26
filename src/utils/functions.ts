import getStarships from './api';

export default async function loadDataFromApi(
  loadingCallback: (value: boolean) => void,
  input: string,
  currentPage: number
) {
  loadingCallback(true);
  const fetchedData = await getStarships(input, currentPage);

  loadingCallback(false);

  return fetchedData.results;
}

export function getRealPage(
  currentPage: number,
  itemsPerPage: number,
) {
  return itemsPerPage === 10 ? currentPage : Math.ceil(currentPage / 2);
}
