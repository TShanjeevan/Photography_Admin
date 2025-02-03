import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for redirection
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Show/Hide password icons
import zxcvbn from 'zxcvbn'; // Password strength library

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility for both password fields
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userCode, setUserCode] = useState(''); // Store the user inputted verification code
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Flag to track email verification
  const navigate = useNavigate();

  // Handle password input and check strength
  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    const result = zxcvbn(passwordInput);
    setPasswordStrength(result.score);
  };

  // Handle confirm password input
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Simulate email verification
  const handleEmailVerification = () => {
    const code = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit verification code
    setVerificationCode(code);
    alert(`Verification code sent to ${email}: ${code}`);
  };

  // Handle user input verification code
  const handleVerificationCodeChange = (e) => {
    setUserCode(e.target.value);
  };

  // Verify the entered code
  const handleVerifyCode = () => {
    if (userCode === verificationCode.toString()) {
      setIsEmailVerified(true);
      setError('');
      alert('Email verified successfully!');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  // Submit form and handle validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Email verification check
    if (!isEmailVerified) {
      setError('Please verify your email address before submitting.');
      return;
    }

    // Simulate account creation and email verification
    setSuccessMessage('Account created successfully! Please check your email for verification.');

    // Redirect to login page after success
    setTimeout(() => {
      navigate('/'); // Redirect to login page
    }, 3000); // Delay before redirecting to allow user to read the success message
  };

  // Function to get color based on password strength
  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500'; // Weak
      case 2:
        return 'bg-yellow-500'; // Fair
      case 3:
        return 'bg-green-500'; // Good
      case 4:
        return 'bg-orange-500'; // Strong
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign Up</h2>

        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
            <button
              type="button"
              onClick={handleEmailVerification}
              className="text-blue-600 text-sm mt-2 block"
            >
              Send Verification Code
            </button>
          </div>

          {/* Verification Code Field */}
          {verificationCode && !isEmailVerified && (
            <div className="mb-6">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={userCode}
                onChange={handleVerificationCodeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the 4-digit code"
                required
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="text-blue-600 text-sm mt-2 block"
              >
                Verify Code
              </button>
            </div>
          )}

          {/* Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-3/2"
            >
              {showPassword ? <FaEyeSlash className="text-gray-600" size={20} /> : <FaEye className="text-gray-600" size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Password Strength Display */}
          {password && (
            <div className="mb-6">
              <div className={`h-2 rounded-full ${getPasswordStrengthColor(passwordStrength)} mb-2`}></div>
              <p className="text-sm text-gray-700">
                Password Strength: {passwordStrength === 0 ? 'Very Weak' :
                  passwordStrength === 1 ? 'Weak' :
                  passwordStrength === 2 ? 'Fair' :
                  passwordStrength === 3 ? 'Good' : 'Strong'}
              </p>
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
