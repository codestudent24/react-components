/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IStarship } from '../types/starship';

interface DataSlice {
  data: IStarship[];
  count: number;
  itemsPerPage: number;
  item: IStarship | null;
  input: string;
  dataLoading: boolean;
  itemLoading: boolean;
}

const initialState: DataSlice = {
  data: [],
  count: 0,
  itemsPerPage: 10,
  item: null,
  input: '',
  dataLoading: true,
  itemLoading: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IStarship[]>) => {
      state.data = action.payload;
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
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.dataLoading = action.payload;
    },
    setItemLoading: (state, action: PayloadAction<boolean>) => {
      state.itemLoading = action.payload;
    },
  },
});

export const {
  setData,
  setCount,
  setItemsPerPage,
  setItem,
  setInput,
  setDataLoading,
  setItemLoading,
} = searchSlice.actions;

export const selectData = (state: RootState) => state.search.data;
export const SelectItem = (state: RootState) => state.search.item;
export const selectInput = (state: RootState) => state.search.input;
export const selectDataLoading = (state: RootState) => state.search.dataLoading;
export const selectItemLoading = (state: RootState) => state.search.itemLoading;

export default searchSlice.reducer;
