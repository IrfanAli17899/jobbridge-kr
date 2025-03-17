
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import Apply from "@/pages/Apply";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import EditJob from "@/pages/EditJob";
import ApplicationDetails from "@/pages/ApplicationDetails";

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
    path: "/job/:id",
    element: <JobDetails />,
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
    path: "/edit-job/:id",
    element: <EditJob />,
  },
  {
    path: "/application/:id",
    element: <ApplicationDetails />,
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
