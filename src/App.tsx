import { useMemo, useState } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './Layouts/RootLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { AppContext, ErrorContext } from './context';
import DetailedItem from './components/DetailedItem';
import { IStarship } from './types/starship';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />}>
        <Route path="detailed" element={<DetailedItem />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

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
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ErrorContext.Provider>
  );
}
