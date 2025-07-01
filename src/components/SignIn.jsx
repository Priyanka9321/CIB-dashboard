import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";

const SignInForm = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    keepLoggedIn: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("AuthContext user after login:", user); // Debug user state
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value.trim(),
    });

    if (errors[name] || errors.general) {
      setErrors({
        ...errors,
        [name]: "",
        general: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = "Email or mobile number is required";
    } else if (
      !emailRegex.test(formData.emailOrMobile) &&
      !mobileRegex.test(formData.emailOrMobile)
    ) {
      newErrors.emailOrMobile =
        "Please enter a valid email or 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        userEmail: formData.emailOrMobile,
        userPassword: formData.password,
      });

      if (response.status === 200) {
        const { token, user: userData } = response.data;
        const userInfo = {
          name: userData.name,
          email: userData.email,
          role: userData.role.toLowerCase(),
        };

        // Clear existing storage
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        // Store token based on keepLoggedIn
        if (token) {
          if (formData.keepLoggedIn) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
        }

        setUser(userInfo);
        toast.success("Login successful!");
        navigate(userInfo.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setErrors({
        ...errors,
        general:
          err.response?.data?.message ||
          "Invalid credentials. Please try again.",
      });
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the entered email is the admin email
  const isAdminEmail = formData.emailOrMobile === "admin@cib.com";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">Crime Investigation Bureau</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Mobile Number
            </label>
            <input
              type="text"
              id="emailOrMobile"
              name="emailOrMobile"
              value={formData.emailOrMobile}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.emailOrMobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email or mobile number"
              required
              disabled={isLoading}
            />
            {errors.emailOrMobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.emailOrMobile}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor="keepLoggedIn"
                className="ml-2 block text-sm text-gray-700"
              >
                Keep me logged in
              </label>
            </div>
            {!isAdminEmail && (
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              } text-white`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
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
        </form>
      </div>
    </div>
  );
};

export default SignInForm;