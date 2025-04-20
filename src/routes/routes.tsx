import { createBrowserRouter } from "react-router";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Order from "@/pages/Order";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";
import CustomerDashboard from "@/pages/CustomerDashboard/CustomerDashboard";
import CreateBicycle from "@/pages/AdminDashboard/ProductManagement/CreateBicycle";
import Checkout from "@/pages/Checkout/Checkout";
import PaymentSuccess from "@/pages/Checkout/PaymentSuccess";
import PaymentFailed from "@/pages/Checkout/PaymentFailed";
import ProductDetails from "@/redux/features/product/ProductDetails";
import AllProduct from "@/pages/AdminDashboard/Product/AllProduct";
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
        element: <AboutUs />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "allProducts",
        element: <AllProduct />,
      },
      {
        path: "allProducts/productDetails/:productId", // Dynamic route with productId
        element: <ProductDetails />,
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-success/:trans_id",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-fail/:trans_id",
        element: (
          <ProtectedRoute>
            <PaymentFailed />
          </ProtectedRoute>
        ),
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
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "create-bicycle",
        element: (
          <ProtectedRoute>
            <CreateBicycle />
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
    path: "/customer-dashboard",
    element: <CustomerDashboard />,
  },
]);

export default router;
