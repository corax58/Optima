import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import NonPrivateRoutes from "./layouts/NonPrivateRoutes";
import NavLayout from "./layouts/NavLayout";
import ProjectsPage from "./pages/projects/ProjectsPage";
import HabitsPage from "./pages/habits/HabitsPage";

const router = createBrowserRouter([
  ,
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
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/habits",
        element: <HabitsPage />,
      },
    ],
  },
]);

export default router;
