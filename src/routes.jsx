import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";
import Root from "./components/Root/Root";
import MessagePage from "./pages/Message/MessagePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import PostDetail from "./components/Home/PostDetail/PostDetail";
import AuthPage from "./pages/Auth/AuthPage";
import SignupForm from "./components/Login/FormSignup/SIgnupForm";
import FormCreateProfile from "./components/Login/FormCreateProfile/FormCreateProfile";
import EduPage from "./pages/Edu/EduPage";
import Schedule from "./components/Edu/Schedule/Schedule";
import Calendar from "./components/Edu/Calendar/Calendar";
import LearnResult from "./components/Edu/LearnResult/LearnResult";
import StudentInfo from "./components/Edu/StudentInfo/StudenInfo";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import HomePosts from "./components/Home/HomePosts/HomePosts";
import About from "./components/Home/About/About";
import UserPosts from "./components/Profile/UserPosts";
import SavedPosts from "./components/Home/SavedPosts";
import Overview from "./components/Home/About/Overview";
import WorkAndEdu from "./components/Home/About/WorkAndEdu";
import Contact from "./components/Home/About/Contact";
import Group from "./pages/Group/Group";
import Disussion from "./components/Group/Discussion";
import Members from "./components/Group/Members";
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
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "posts",
            element: <HomePosts />,
          },
          {
            path: "posts/:id",
            element: <PostDetail />,
          },
        ],
      },
      {
        path: "/message/:id",
        element: <MessagePage />,
      },
      {
        path: "/groups/:id",
        element: <Group />,
        children: [
          {
            index: true,
            element: <Disussion />,
          },
          {
            path: "members",
            element: <Members />,
          },
        ],
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,

        children: [
          {
            index: true,
            element: <UserPosts />,
          },
          {
            path: "about",
            element: <About />,
            children: [
              {
                index: true,
                element: <Overview />,
                path: "overview",
              },
              {
                path: "work-and-education",
                element: <WorkAndEdu />,
              },
              {
                path: "contact-and-basic-info",
                element: <Contact />,
              },
            ],
          },
          {
            path: "saved",
            element: <SavedPosts />,
          },
        ],
      },
      {
        path: "/edu",
        element: <EduPage />,
        children: [
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "schedule",
            element: <Schedule />,
          },
          {
            path: "learn-result",
            element: <LearnResult />,
          },
          {
            path: "student-info",
            element: <StudentInfo />,
          },
        ],
      },
    ],
  },
]);

export default routes;
