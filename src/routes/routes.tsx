import { createBrowserRouter } from "react-router";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Order from "@/pages/Order";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <AboutUs/>
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
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
    path: '/admin-dashboard',
    element: <AdminDashboard />
  }
]);

export default router;
