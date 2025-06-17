import { useState } from "react";
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  KeyRound,
  UserCircle,
} from "lucide-react";

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-blue-100">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Crime Investigation Bureau
            </h1>
          </div>
        </div>

        {/* Right side - User Profile with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-gray-700">Vaithi Ji</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Vaithi Ji</p>
                    <p className="text-sm text-gray-600">vaithi@example.com</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle profile action
                  }}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Profile</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle forgot password action
                  }}
                >
                  <KeyRound className="w-5 h-5" />
                  <span>Forgot Password</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle logout action
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
