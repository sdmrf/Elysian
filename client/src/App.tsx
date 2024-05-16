import { Suspense, lazy} from 'react';
import { ToastContainer }from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Imports
import Loader from './components/common/loader/loader';
// User Imports
const Home = lazy(() => import('./pages/user/home'));
const Landing = lazy(() => import('./pages/user/landing'));
const Cart = lazy(() => import('./pages/user/cart'));
const Products = lazy(() => import('./pages/user/products'));
const Order = lazy(() => import('./pages/user/order'));

// Admin Imports
const Dashboard = lazy(() => import('./pages/admin/dashboard'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Order />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
      <ToastContainer position='bottom-center'/>
    </Router>
  );
}

export default App;
