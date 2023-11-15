import { useMemo, useState } from 'react';
import { AppContext, ErrorContext } from './context';
import { IStarship } from './types/starship';
import Home from './pages/Home';

export default function App() {
  const [isError, setIsError] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<IStarship[]>([]);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <ErrorContext.Provider
      value={useMemo(
        () => ({
          isError,
          setIsError,
        }),
        [isError, setIsError]
      )}
    >
      <AppContext.Provider
        value={useMemo(
          () => ({
            input,
            setInput,
            data,
            setData,
            count,
            setCount,
            itemsPerPage,
            setItemsPerPage,
          }),
          [
            input,
            setInput,
            data,
            setData,
            count,
            setCount,
            itemsPerPage,
            setItemsPerPage,
          ]
        )}
      >
        <Home />
      </AppContext.Provider>
    </ErrorContext.Provider>
  );
}
