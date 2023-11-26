import { IStarship, IStarshipResponse } from '../types/starship';
import { getRealPage } from './functions';

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

export const getResults = async (
  input: string,
  itemsPerPage: number,
  pageNumber: string
) => {
  const currentPage = Number(pageNumber);
  const page = getRealPage(Number(currentPage), itemsPerPage)
  const query = input === '' ? `?page=${page}` : `?search=${input}&page=${page}`;
  const response = await fetch(`${baseURL}${query}`);
  const result = (await response.json()) as IStarshipResponse
  if (itemsPerPage < 10) {
    const reducedResult: IStarship[] = [];
    if (currentPage % 2) {
      for (let i = 0; i < 5; i++) {
        reducedResult.push(result.results[i])
      }
    } else {
      for (let i = 5; i < 10; i++) {
        reducedResult.push(result.results[i])
      }
    }
    result.results = reducedResult;
  }
  return { data: result };
}

export default getStarships;
