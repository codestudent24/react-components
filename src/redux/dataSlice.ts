/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DataSlice {
  count: number;
  itemsPerPage: number;
}

const initialState: DataSlice = {
  count: 20,
  itemsPerPage: 10,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) return;
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setCount, setItemsPerPage } = searchSlice.actions;

export default searchSlice.reducer;
