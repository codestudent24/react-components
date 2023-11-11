import { SetStateAction, createContext } from 'react';
import { IStarship } from './types/starship';

export type ErrorContextType = {
  isError: SetStateAction<boolean>;
  setIsError: React.Dispatch<SetStateAction<boolean>>;
};

const ErrorContext = createContext<ErrorContextType>({
  isError: false,
  setIsError: () => {},
});

export type AppContextType = {
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
  data: IStarship[];
  setData: React.Dispatch<IStarship[]>;
  count: number;
  setCount: React.Dispatch<number>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<number>;
};

const AppContext = createContext<AppContextType>({
  input: '',
  setInput: () => {},
  data: [],
  setData: () => {},
  count: 0,
  setCount: () => {},
  itemsPerPage: 10,
  setItemsPerPage: () => {},
});

export { ErrorContext, AppContext };
