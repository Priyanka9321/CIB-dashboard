import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    console.log("Next clicked:", formData);
    alert("Password reset instructions sent!");
    // You can navigate to OTP page or set new password page
    // navigate("/reset-password");
  };

  const handleBack = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Forgot Password
          </h1>
          <h2 className="text-lg font-medium text-blue-700">
            Crime Investigation Bureau
          </h2>
          <p className="text-gray-600 mt-3">
            Enter your details to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Next
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 border border-gray-300"
            >
              Back
            </button>
          </div>

          {/* Navigation Links */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Remembered your password?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
