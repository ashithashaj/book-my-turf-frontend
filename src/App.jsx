import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Example protected page
import VerifyEmail from './pages/Emailconfirm';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import TurfDetails from './pages/TurfDetails';

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


          {/* Protect all private pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Add other protected routes in the same way */}
        </Routes>
      </Router>
    </>
  );
}

export default App;