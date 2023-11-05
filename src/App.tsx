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
import ErrorContext from './context';
import DetailedItem from './components/DetailedItem';

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
      <RouterProvider router={router} />
    </ErrorContext.Provider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<ErrorBoundary />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
