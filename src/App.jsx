import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Example protected page
import VerifyEmail from './pages/Emailconfirm';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import TurfDetails from './pages/TurfDetails';
import Footer from './components/Footer';
import BookingPage from './pages/Booking';
import CheckoutPage from './pages/Checkout';
import Profile from './pages/Profile';
function App() {
  return (
    <>
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/turfs/:id" element={<TurfDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />

          {/* Protect all private pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          {/* Add other protected routes in the same way */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;