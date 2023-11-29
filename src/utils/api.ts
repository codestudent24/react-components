import { IStarship, IStarshipResponse } from '../types/starship';

const baseURL = 'https://swapi.dev/api/starships/';

const getStarships = async (search: string = '', page: number = 1) => {
  const requestURL =
    search === '' ? `?page=${page}` : `?search=${search}&page=${page}`;
  const response = await fetch(`${baseURL}${requestURL}`);

  const data = (await response.json()) as IStarshipResponse;

  return data;
};

export const getStarshipByIndex = async (index: string) => {
  const response = await fetch(`${baseURL}${index}`);
  const data = (await response.json()) as IStarship;
  return data;
};

export function getRealPage(currentPage: number, itemsPerPage: number) {
  return itemsPerPage === 10 ? currentPage : Math.ceil(currentPage / 2);
}

export function createQuery(
  input: string,
  itemsPerPage: number,
  pageNumber: number
) {
  const page = getRealPage(Number(pageNumber), itemsPerPage);
  return input === '' ? `?page=${page}` : `?search=${input}&page=${page}`;
}

export function reduceArray(response: IStarshipResponse, page: number) {
  const reducedResult: IStarship[] = [];
  if (page % 2) {
    for (let i = 0; i < 5; i += 1) {
      reducedResult.push(response.results[i]);
    }
  } else {
    for (let i = 5; i < 10; i += 1) {
      reducedResult.push(response.results[i]);
    }
  }
  return reducedResult;
}

export const getResults = async (
  input: string,
  itemsPerPage: number,
  pageNumber: string
) => {
  const currentPage = Number(pageNumber);
  const query = createQuery(input, itemsPerPage, currentPage);
  const response = await fetch(`${baseURL}${query}`);
  const result = (await response.json()) as IStarshipResponse;
  if (itemsPerPage < 10) result.results = reduceArray(result, currentPage);
  return { data: result };
};

export default getStarships;
