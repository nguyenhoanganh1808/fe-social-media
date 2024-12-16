import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";
import Root from "./components/Root/Root";
import MessagePage from "./pages/Message/MessagePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import CreatePost from "./components/Home/CreatePost/CreatePost";
import PostsList from "./components/Home/PostsList/PostsList";
import PostDetail from "./components/Home/PostDetail/PostDetail";
import AuthPage from "./pages/Auth/AuthPage";
import SignupForm from "./components/Login/FormSignup/SIgnupForm";
import FormCreateProfile from "./components/Login/FormCreateProfile/FormCreateProfile";
import SignInForm from "./components/Login/FormSignIn/SignInForm";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <SignInForm />,
      },
      {
        path: "sign-up",
        element: <SignupForm />,
      },
      {
        path: "create-profile",
        element: <FormCreateProfile />,
      },
    ],
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
