import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({ emailOrMobile: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = "Email or mobile number is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!emailRegex.test(formData.emailOrMobile) && !mobileRegex.test(formData.emailOrMobile)) {
        newErrors.emailOrMobile = "Please enter a valid email or 10-digit mobile number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrMobile);
      const payload = isEmail
        ? { userEmail: formData.emailOrMobile, userMobile: "" }
        : { userEmail: "", userMobile: formData.emailOrMobile };

      const response = await axios.post(
        `${baseURL}/auth/forgot-password`,
        payload
      );

      if (response.status === 200) {
        toast.success("OTP sent to your registered email!");
        navigate("/reset-password", { state: { userId: response.data.userId } });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
       toast.error({
        ...errors,
        api: error.response?.data?.message || "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Forgot Password</h1>
          <p className="text-sm text-gray-600">Crime Investigation Bureau</p>
        </div>
        <div className="space-y-4">
          {errors.api && <p className="text-red-500 text-xs">{errors.api}</p>}
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Mobile No.
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
            />
            {errors.emailOrMobile && (
              <p className="text-red-500 text-xs mt-1">{errors.emailOrMobile}</p>
            )}
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
              } text-white`}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
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