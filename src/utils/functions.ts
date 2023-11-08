import getStarships from './api';

export default async function loadDataFromApi(
  loadingCallback: (value: boolean) => void,
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

  loadingCallback(false);

  return fetchedData.results;
}
