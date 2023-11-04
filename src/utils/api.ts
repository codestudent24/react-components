import { IStarshipResponse } from '../types/starship';

const baseURL = 'https://swapi.dev/api/';

const getStarships = async (search: string = '', page: number = 1) => {
  const requestURL =
    search === ''
      ? `starships?page=${page}`
      : `starships/?search=${search}&page=${page}`;
  const response = await fetch(`${baseURL}${requestURL}`);

  const data = (await response.json()) as IStarshipResponse;

  return data.results;
};

export default getStarships;
