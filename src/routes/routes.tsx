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
import Checkout from "@/pages/Checkout/Checkout";
import PaymentSuccess from "@/pages/Checkout/PaymentSuccess";
import PaymentFailed from "@/pages/Checkout/PaymentFailed";
import ProductDetails from "@/redux/features/product/ProductDetails";
import AllProduct from "@/pages/Product/AllProduct";
import OrderDetails from "@/pages/AdminDashboard/OrderManagement/OrderDetails";
import TotalRevenue from "@/pages/AdminDashboard/TotalRevenue/TotalRevenue";
import CreateProduct from "@/pages/AdminDashboard/ProductManagement/CreateProduct";
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
        path: "create-product",
        element: (
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "allproducts",
        element: <ProtectedRoute>
          <AllProduct />
        </ProtectedRoute>
      },
      {
        path: "order-details",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "total-revenue",
        element: (
          <ProtectedRoute>
            <TotalRevenue />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/customer-dashboard",
    element: (
      <ProtectedRoute>
        <CustomerDashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
