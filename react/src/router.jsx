import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "foods",
        element: <FoodsMenu />,
      },
      {
        path: "foods/tambah-menu", // Tambahkan rute ini
        element: <AddFoods />,
      },
      {
        path: "category",
        element: <CategoryMenu />,
      },
      {
        path: "orders",
        element: <ShoppingCart />,
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
