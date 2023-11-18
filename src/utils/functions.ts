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

export function createParam(
  currentPage: number,
  itemsPerPage: number,
  input: string
) {
  const page = itemsPerPage === 10 ? currentPage : Math.ceil(currentPage / 2);
  return input === '' ? `?page=${page}` : `?page=${page}&search=${input}`;
}
