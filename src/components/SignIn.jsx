import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { usePopup } from "../context/PopupContext";
import { toast } from "react-toastify";

const SignInForm = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Use 'login' instead of 'setUser'
  const popupContext = usePopup();
  const { setIsPopupOpen } = popupContext || {};

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    keepLoggedIn: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("AuthContext user after login:", user);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    console.log("SignInForm - API response:", response.data);
    console.log("SignInForm - Token:", response.data.token);

    if (response.status === 200) {
      const { token, user: userData } = response.data;
      login(token, formData.keepLoggedIn);
      toast.success("Login successful!");
      navigate(userData.role.toLowerCase() === "admin" ? "/admin/dashboard" : "/user/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err);
    const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
    setErrors({ ...errors, general: errorMessage });
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  const isAdminEmail = formData.emailOrMobile === "admin@cib.com";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">Crime Investigation Bureau</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 text-sm">
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
              className={`w-full px-3 py-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
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
              className={`w-full py-2.5 px-4 font-medium transition-all duration-200 ${
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