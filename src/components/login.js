import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for React Router v6
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Change icon to FaEye and FaEyeSlash

const Login = () => {
  const [email, setEmail] = useState(''); // Changed username to email
  const [password, setPassword] = useState('');
  const [rememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!email || !password) {
      setError('Both fields are required!');
      setTimeout(() => setError(''), 1200); // Clear error message after 1.2 seconds
      return;
    }
  
    // Hardcoded password check (replace with actual backend logic)
    const correctPassword = 'password123'; // Example hardcoded password
  
    if (password === correctPassword) {
      // Successful login
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember Me:', rememberMe);
      
      // Display success message
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      
      // Redirect to Dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');  // Use the navigate function to redirect
      }, 1500); // 1.5 second delay for the success message to be visible
    } else {
      setError('Incorrect password. Please try again.');
      setTimeout(() => setError(''), 1400); // Clear error message after 1.2 seconds
      setSuccessMessage(''); // Clear success message if login fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Login Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">LOGIN</h2>

        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email" // Set input type to email
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            {/* Show/Hide password icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-3/2"
            >
              {showPassword ? <FaEye className="text-gray-600" size={20} /> : <FaEyeSlash className="text-gray-600" size={20} />}
            </button>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              {/* <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              /> */}
              {/* <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Remember Me
              </label> */}
            </div>
            <a href="/forgetpassword" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring--500"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
