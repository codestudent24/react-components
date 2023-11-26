import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import searchReducer from './dataSlice';
import pageReducer from './pageSlice';
import api from './query';
import { dataMiddlware } from './middleware';

const rootReducer = combineReducers({
  search: searchReducer,
  page: pageReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });