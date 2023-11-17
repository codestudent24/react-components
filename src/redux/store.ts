import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './dataSlice';
import pageReducer from './pageSlice';
import api from './query';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    page: pageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
