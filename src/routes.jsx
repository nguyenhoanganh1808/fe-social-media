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
import AuthRedirect from "./helper/AuthRedirect";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import EduPage from "./pages/Edu/EduPage";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthProvider>
        <AuthRedirect>
          <AuthPage />
        </AuthRedirect>
      </AuthProvider>
    ),
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
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "posts",
            element: (
              <>
                <CreatePost />
                <PostsList />
              </>
            ),
          },
          {
            path: "posts/:id",
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
      {
        path: "/edu",
        element: <EduPage />,
      },
    ],
  },
]);

export default routes;
