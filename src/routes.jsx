import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Root from "./components/Root/Root";
import MessagePage from "./pages/Message/MessagePage";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/message",
        element: <MessagePage />,
      },
    ],
  },
]);

export default routes;
