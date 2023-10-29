import { IStarshipResponse } from '../types/starship';

const baseURL = 'https://swapi.dev/api/';

const getStarships = async (search: string = '') => {
  const requestURL =
    search === '' ? '/starships' : `/starships/?search=${search}`;
  const response = await fetch(`${baseURL}${requestURL}`);

  const data = (await response.json()) as IStarshipResponse;

  return data.results;
};

export default getStarships;
