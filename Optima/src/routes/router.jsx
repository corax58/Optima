import { createBrowserRouter } from "react-router-dom";
import NavLayout from "./layouts/NavLayout";
import NonPrivateRoutes from "./layouts/NonPrivateRoutes";
import PrivateRoutes from "./layouts/PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";
import HabitsDetailsPage from "./pages/habits/HabitsDetailsPage";
import HabitsPage from "./pages/habits/HabitsPage";
import HomePage from "./pages/HomePage";
import Invites from "./pages/invites/Invites";
import Login from "./pages/Login";
import JoinedProjectsPage from "./pages/projects/JoinedProjectsPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import Signup from "./pages/Signup";
import TimeLinePage from "./pages/timeline/TimeLinePage";

const router = createBrowserRouter([
  {
    element: <NonPrivateRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <NavLayout />,
        errorElement: <ErrorPage />,

        children: [
          {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/myprojects",
            element: <ProjectsPage />,
          },
          {
            path: "/joinedprojects",
            element: <JoinedProjectsPage />,
          },
          {
            path: "/projects/:projectId",
            element: <ProjectDetailPage />,
          },
          {
            path: "/habits",
            element: <HabitsPage />,
          },
          {
            path: "/habits/:habitId",
            element: <HabitsDetailsPage />,
          },
          {
            path: "/invites",
            element: <Invites />,
          },
          {
            path: "/timeline",
            element: <TimeLinePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
