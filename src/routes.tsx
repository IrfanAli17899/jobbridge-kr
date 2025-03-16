
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import Apply from "@/pages/Apply";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetails />,
  },
  {
    path: "/apply/:id",
    element: <Apply />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
