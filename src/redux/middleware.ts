import { Middleware } from '@reduxjs/toolkit';
import { IStarship } from '@/types/starship';
import { RootState } from './store';

function reduceData(
  data: IStarship[],
  itemsPerPage: number,
  page: number
) {
  if (itemsPerPage === 10) return data;

  const max = data.length < itemsPerPage ? data.length : itemsPerPage;
  const reducedData: IStarship[] = [];

  let offset = 0;
  if (itemsPerPage === 5) offset = page % 2 === 0 ? 5 : 0;

  for (let i = 0; i < max; i += 1) {
    reducedData.push(data[i + offset]);
  }

  return reducedData;
}

export const dataMiddlware: Middleware<
  {},
  RootState
> = store => next => action => {
  const result = next(action)
  if (action.type === 'search/setData') {
    const state = store.getState()
    const itemsPerPage = state.search.itemsPerPage;
    if (itemsPerPage < 10) {
      const currentPage = state.page.currentPage;
      return(reduceData(result.payload, itemsPerPage, currentPage))
    }
  }
  return result;
}