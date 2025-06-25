import React, { useState } from "react";
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  KeyRound,
  UserCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { menuItems } from "../constants/menuItems";

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  // Find active item and get its icon
  const activeItem = menuItems
    .flatMap((item) => item.subItems || item)
    .find((item) => item.to === location.pathname);

  // Find the parent menu item to get the icon
  const activeParentItem = menuItems.find((item) => {
    if (item.to === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some((subItem) => subItem.to === location.pathname);
    }
    return false;
  });

  const pageTitle = activeItem?.label || "Crime Investigation Bureau";
  const pageIcon = activeParentItem?.icon || <Shield size={20} />;

  return (
    <header className="bg-white shadow-lg border-b border-blue-100">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        {/* Active Page Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
            {/* Dynamic Icon with gradient background */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-800 to-blue-900 rounded flex items-center justify-center text-white flex-shrink-0">
              {React.cloneElement(pageIcon, {
                size:
                  window.innerWidth < 640
                    ? 16
                    : window.innerWidth < 1024
                    ? 18
                    : 20,
              })}
            </div>
            {/* Page Title with gradient text - responsive sizing */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent truncate">
              <span className="hidden sm:inline">{pageTitle}</span>
              <span className="sm:hidden">
                {pageTitle.length > 20
                  ? pageTitle.substring(0, 20) + "..."
                  : pageTitle}
              </span>
            </h1>
          </div>
        </div>

        {/* Right side - User Profile with Dropdown */}
        <div className="relative flex-shrink-0 ml-2">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 lg:gap-3 p-1 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            {/* Hide name on very small screens */}
            <span className="hidden xs:inline font-medium text-gray-700 text-sm sm:text-base max-w-24 sm:max-w-none truncate">
              Vaithi Ji
            </span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu - Responsive positioning */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-1 sm:mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      Vaithi Ji
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      vaithi@example.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-1 sm:py-2">
                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle profile action
                  }}
                >
                  <UserCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Profile</span>
                </button>

                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle forgot password action
                  }}
                >
                  <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Forgot Password</span>
                </button>

                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    // Handle logout action
                  }}
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
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
