import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Common Imports
import Loader from "./components/common/loader/loader";
import Header from "./components/common/header/header";
import Footer from "./components/common/footer/footer";
import ContentWrapper from "./components/common/wrappers/content-wrapper/contentWrapper";
// Auth Imports
const Signin = lazy(() => import("./pages/auth/signin"));
const Singup = lazy(() => import("./pages/auth/singup"));

// User Imports
const Home = lazy(() => import("./pages/user/home"));
const Landing = lazy(() => import("./pages/common/landing"));
const Cart = lazy(() => import("./pages/user/cart"));
const Products = lazy(() => import("./pages/user/products"));
const Order = lazy(() => import("./pages/user/order"));

// Admin Imports
const Dashboard = lazy(() => import("./pages/admin/dashboard"));

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/register" element={<Singup />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-center" />
    </Router>
  );
};

export default App;
