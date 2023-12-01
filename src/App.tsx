import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "controlled",
    element: <div>Controlled</div>,
  },
  {
    path: "uncontrolled",
    element: <div>Uncontrolled</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
