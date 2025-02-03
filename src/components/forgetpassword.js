import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsOtpSent(true);
        setSuccessMessage("OTP sent to your email.");
        setError("");
      } else {
        setError(data.error || "Failed to send OTP. Please try again later.");
      }
    } catch (err) {
      setError("Error sending OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("OTP verified successfully. You can now reset your password.");
        setError("");
      } else {
        setError(data.error || "Failed to verify OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again later.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Password reset successfully.");
        setError("");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after success
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("Error resetting password. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Reset Password</h2>

        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Forgot Password Form */}
        <form>
          {/* Email Input */}
          {!isOtpSent && (
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {/* OTP Input */}
          {isOtpSent && !newPassword && (
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>
          )}

          {/* New Password Fields */}
          {isOtpSent && otp && (
            <>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your new password"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Reset Password
              </button>
            </>
          )}

          {/* Send OTP Button */}
          {!isOtpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Send OTP
            </button>
          )}

          {/* Verify OTP Button */}
          {isOtpSent && !otp && (
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
