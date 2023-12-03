import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import ControlledForm from "./components/Controlled";
import UncontrolledForm from "./components/Uncontrolled";
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
    element: <ControlledForm />,
  },
  {
    path: "uncontrolled",
    element: <UncontrolledForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
