import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    keepLoggedIn: false,
  });
  const [error, setError] = useState("");

  console.log("Base URL:", baseURL);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emailOrMobile || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    if (!emailRegex.test(formData.emailOrMobile) && !mobileRegex.test(formData.emailOrMobile)) {
      setError("Please enter a valid email or 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        userEmail: formData.emailOrMobile,
        userPassword: formData.password,
      });
      console.log("Response:", response.data);
      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        setError("");
        alert("Login successful!");
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(
        err.response?.data?.errors?.[0]?.message || err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome To</h1>
          <h2 className="text-xl font-semibold text-blue-700">
            Crime Investigation Bureau
          </h2>
        </div>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email OR Mobile No.
            </label>
            <input
              type="text"
              id="emailOrMobile"
              name="emailOrMobile"
              value={formData.emailOrMobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your email or mobile number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keepLoggedIn"
              name="keepLoggedIn"
              checked={formData.keepLoggedIn}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="keepLoggedIn"
              className="ml-2 block text-sm text-gray-700"
            >
              Keep me logged in
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;