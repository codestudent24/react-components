/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IStarship } from '../types/starship';

interface DataSlice {
  listData: IStarship[];
  count: number;
  itemsPerPage: number;
  item: IStarship | null;
  input: string;
}

const initialState: DataSlice = {
  listData: [],
  count: 0,
  itemsPerPage: 10,
  item: null,
  input: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IStarship[]>) => {
      state.listData = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) return;
      state.itemsPerPage = action.payload;
    },
    setItem: (state, action: PayloadAction<IStarship | null>) => {
      state.item = action.payload;
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
});

export const { setData, setCount, setItemsPerPage, setItem, setInput } =
  searchSlice.actions;

export const selectData = (state: RootState) => state.search.listData;
export const SelectItem = (state: RootState) => state.search.item;
export const selectInput = (state: RootState) => state.search.input;

export default searchSlice.reducer;
