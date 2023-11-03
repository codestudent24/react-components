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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ErrorBoundary />} />
      <Route path="page" element={<DetailsLayout />} />
      {/* <Route path='error' element={<Errors />} */}
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<ErrorBoundary />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
