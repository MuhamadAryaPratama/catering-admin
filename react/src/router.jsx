import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import FoodsMenu from "./views/FoodsMenu";
import CategoryMenu from "./views/CategoryMenu";
import ShoppingCart from "./views/ShoppingCart";
import AddFoods from "./components/AddFoods";
import EditFoods from "./components/EditFoods";
import AddCategory from "./components/AddCategory";

// Function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "foods",
        element: <ProtectedRoute element={<FoodsMenu />} />,
      },
      {
        path: "foods/tambah-menu",
        element: <ProtectedRoute element={<AddFoods />} />,
      },
      {
        path: "foods/edit/:id",
        element: <ProtectedRoute element={<EditFoods />} />,
      },
      {
        path: "category",
        element: <ProtectedRoute element={<CategoryMenu />} />,
      },
      {
        path: "category/tambah-category",
        element: <ProtectedRoute element={<AddCategory />} />,
      },
      {
        path: "orders",
        element: <ProtectedRoute element={<ShoppingCart />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
