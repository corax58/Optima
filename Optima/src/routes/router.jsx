import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import NonPrivateRoutes from "./layouts/NonPrivateRoutes";
import NavLayout from "./layouts/NavLayout";
import ProjectsPage from "./pages/projects/ProjectsPage";
import HabitsPage from "./pages/habits/HabitsPage";
import HabitsDetailsPage from "./pages/habits/HabitsDetailsPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import Invites from "./pages/invites/Invites";
import PrivateRoutes from "./layouts/PrivateRoutes";
import TimeLinePage from "./pages/timeline/TimeLinePage";
import JoinedProjectsPage from "./pages/projects/JoinedProjectsPage";

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
    children: [
      {
        element: <NavLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
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
