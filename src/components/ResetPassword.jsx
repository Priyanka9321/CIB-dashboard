import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{4}$/.test(formData.otp)) {
      newErrors.otp = "Please enter a valid 4-digit OTP";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const otpResponse = await axios.post(
        `${baseURL}/auth/verify-otp`,
        {
          userId,
          otp: formData.otp,
        }
      );

      if (otpResponse.status === 200) {
        const resetResponse = await axios.post(
          `${baseURL}/auth/reset-password`,
          {
            newUserPassword: formData.newPassword,
            confirmNewPassword: formData.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${otpResponse.data.token}`,
            },
          }
        );

        if (resetResponse.status === 200) {
          toast.success("Password reset successful! Please login with your new password.");
          navigate("/sign-in");
        }
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-green-100 text-green-800 px-4 py-2 mb-4 text-sm font-medium">
            OTP Sent To Your Registered Email!
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Reset Password</h1>
          <p className="text-sm text-gray-600">Crime Investigation Bureau</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.otp ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter 4-digit OTP"
              maxLength="4"
              required
            />
            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter new password (min 6 chars)"
              required
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your new password"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
              } text-white`}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              disabled={isLoading}
              className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-300"
            >
              Back to Sign In
            </button>
          </div>

          <div className="text-center pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
