import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Login from './components/login'; // Login page
import SignUp from './components/signup'; // Sign Up page (newly added)
import Dashboard from './components/Dashboard'; // Dashboard component
import HomePage from './components/managebooking'; // Manage Booking page
import ImageManagement from './components/Portfolio/ImageManagement'; // Image Management page
import VideoManagement from './components/Portfolio/VideoManagement'; // Video Management page
import EventManagement from './components/Portfolio/EventManagement'; // Event Management page
import PlaceManagement from './components/places'; // Places Management page
import ContactManagement from './components/ContactManagement'; // Contact Management page
import ForgetPassword from './components/forgetpassword'; // Forgot Password page

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />  {/* Added SignUp Route */}

        {/* Forgot Password Route */}
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Manage Booking Route */}
        <Route path="/managebooking" element={<HomePage />} />

        {/* Portfolio Submenu Routes */}
        <Route path="/portfolio/image-management" element={<ImageManagement />} />
        <Route path="/portfolio/video-management" element={<VideoManagement />} />
        <Route path="/portfolio/event-management" element={<EventManagement />} />

        {/* Places Management Route */}
        <Route path="/places" element={<PlaceManagement />} />

        {/* Contact Management Route */}
        <Route path="/contactmanagement" element={<ContactManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
