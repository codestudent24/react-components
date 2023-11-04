import { SetStateAction, createContext } from 'react';

export type ContextType = {
  isError: SetStateAction<boolean>;
  setIsError: React.Dispatch<SetStateAction<boolean>>;
};

const ErrorContext = createContext<ContextType>({
  isError: false,
  setIsError: () => {},
});

export default ErrorContext;
