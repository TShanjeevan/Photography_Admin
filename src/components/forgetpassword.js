import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userCode, setUserCode] = useState(new Array(6).fill(''));
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    setNewPassword(passwordInput);
    setPasswordStrength(zxcvbn(passwordInput).score);
  };

  const getPasswordStrength = (score) => {
    const strengthLevels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    return { color: colors[score] || '', text: strengthLevels[score] || '' };
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    setVerificationCode(code.toString()); // Store as string for easy comparison
    alert(`Verification code sent to ${email}: ${code}`);
  };

  // Handle individual digit entry
  const handleVerificationCodeChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers

    if (!value) return; // Ignore empty inputs

    const updatedCode = [...userCode];
    updatedCode[index] = value;
    setUserCode(updatedCode);

    // Move focus to the next input
    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event to fill all boxes
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pasteData.length === 6) {
      setUserCode(pasteData.split(''));
      inputRefs.current.forEach((input, i) => {
        if (input) input.value = pasteData[i]; // Set value manually to reflect UI update
      });
    }
  };

  const handleVerifyCode = () => {
    if (userCode.join('') === verificationCode) {
      setIsEmailVerified(true);
      setError('');
      alert('Email verified successfully!');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmNewPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isEmailVerified) {
      setError('Please verify your email before proceeding.');
      return;
    }

    setSuccessMessage('Password reset successful! You can now log in with your new password.');

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Forgot password</h2>
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
            <button type="button" onClick={handleSendCode} className="text-blue-600 text-sm mt-2 block">Send verification code</button>
          </div>

          {verificationCode && !isEmailVerified && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter verification code</label>
              <div className="flex justify-between space-x-2" onPaste={handlePaste}>
                {userCode.map((code, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={code}
                    onChange={(e) => handleVerificationCodeChange(e, index)}
                    maxLength={1}
                    className="w-12 px-3 py-2 border border-gray-300 rounded-md text-center"
                    placeholder="-"
                    required
                  />
                ))}
              </div>
              <button type="button" onClick={handleVerifyCode} className="text-blue-600 text-sm mt-2 block">Verify Code</button>
            </div>
          )}

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your new password"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3/4 transform -translate-y-1/2">
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            {/* <div className={`h-2 mt-2 rounded-full ${getPasswordStrength(passwordStrength).color}`}></div>
            <p className="text-sm text-gray-700 mt-1">Password Strength: {getPasswordStrength(passwordStrength).text}</p> */}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm new password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm your new password"
              required
            />
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md">Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
