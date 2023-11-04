import { useMemo, useState } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
// import Errors from './pages/Error';
import RootLayout from './Layouts/RootLayout';
import DetailsLayout from './Layouts/DetailsLayout';
import NotFound from './pages/NotFound';
import ErrorContext from './context';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ErrorBoundary />} />
      <Route path="detailed" element={<DetailsLayout />} />
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
