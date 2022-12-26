import { useRoutes, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Layout } from "../components";

import {
  Home,
  Cart,
  Checkout,
  Shop,
  Product,
  Signup,
  Login,
  Category,
  NotFound,
  //Account
  Account,
  Profile,
  Addresses,
  Orders,
  Wishlist,
} from "../pages";

const Routers = () => {
  const { user } = useAuth();

  const routes = useRoutes([
    {
      path: "/",
      //element: !user ? <Layout /> : <Navigate to="/login" />,
      element: <Layout />,

      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "shop", element: <Shop /> },
        { path: "shop/:id", element: <Product /> },
        { path: "category/:category", element: <Category /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: !user ? <Login /> : <Navigate to={-1} /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "checkout",
      element: user ? <Checkout /> : <Navigate to="/login" />,
    },
    {
      path: "account",
      element: user ? <Account /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/account/orders" />, index: true },
        { path: "orders", element: <Orders /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "addresses", element: <Addresses /> },
        { path: "profile", element: <Profile /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "404", element: <NotFound /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default Routers;