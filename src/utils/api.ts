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

export default getStarships;
