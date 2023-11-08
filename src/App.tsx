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

const router = createBrowserRouter(
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
          }),
          [input, setInput, data, setData]
        )}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ErrorContext.Provider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<ErrorBoundary />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
