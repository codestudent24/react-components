/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageSlice {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const initialState: PageSlice = {
  currentPage: 1,
  hasNext: true,
  hasPrev: false,
};

export const pageSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setHasNext: (state, action: PayloadAction<boolean>) => {
      state.hasNext = action.payload;
    },
    setHasPrev: (state, action: PayloadAction<boolean>) => {
      state.hasPrev = action.payload;
    },
  },
});

export const { setCurrentPage, setHasNext, setHasPrev } = pageSlice.actions;

export default pageSlice.reducer;
