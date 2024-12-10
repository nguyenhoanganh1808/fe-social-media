import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Root from "./components/Root/Root";
import MessagePage from "./pages/Message/MessagePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import CreatePost from "./components/Home/CreatePost/CreatePost";
import PostsList from "./components/Home/PostsList/PostsList";
import PostDetail from "./components/Home/PostDetail/PostDetail";

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
        path: "/posts",
        element: <HomePage />,
        children: [
          {
            path: "",
            element: (
              <>
                <CreatePost />
                <PostsList />
              </>
            ),
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
        ],
      },
      {
        path: "/message",
        element: <MessagePage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default routes;
