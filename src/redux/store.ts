import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import searchReducer from './dataSlice';
import pageReducer from './pageSlice';
import api from './query';

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

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
