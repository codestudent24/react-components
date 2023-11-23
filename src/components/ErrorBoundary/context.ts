import { SetStateAction, createContext } from 'react';

export type ErrorContextType = {
  isError: SetStateAction<boolean>;
  setIsError: React.Dispatch<SetStateAction<boolean>>;
};

const ErrorContext = createContext<ErrorContextType>({
  isError: false,
  setIsError: () => {},
});

export { ErrorContext };