import React, { useState, useContext } from "react";
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  KeyRound,
  UserCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "/src/auth/AuthContext";
import { menuItems } from "../constants/menuItems";

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const activeItem = menuItems
    .flatMap((item) => item.subItems || item)
    .find((item) => item.to === location.pathname);

  const activeParentItem = menuItems.find((item) => {
    if (item.to === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some((subItem) => subItem.to === location.pathname);
    }
    return false;
  });

  const pageTitle = activeItem?.label || "Crime Investigation Bureau";
  const pageIcon = activeParentItem?.icon || <Shield size={20} />;

  const handleLogout = async () => {
    try {
      setProfileDropdownOpen(false);
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      logout();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 ">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2 sm:py-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-8 sm:h-8  flex items-center justify-center text-white flex-shrink-0 ">
              {React.cloneElement(pageIcon, {
                size:
                  window.innerWidth < 640
                    ? 18
                    : window.innerWidth < 1024
                      ? 22
                      : 26,
              })}

            </div>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent truncate">
              <span className="hidden sm:inline">{pageTitle}</span>
              <span className="sm:hidden">
                {pageTitle.length > 20
                  ? pageTitle.substring(0, 20) + "..."
                  : pageTitle}
              </span>
            </h1>
          </div>
        </div>

        <div className="relative flex-shrink-0 ml-2">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 lg:gap-3 p-1 sm:p-1.5 hover:bg-blue-800/30 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <span className="hidden xs:inline font-medium text-white text-sm sm:text-base max-w-24 sm:max-w-none truncate">
              {user.name}
            </span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 text-blue-100 transition-transform ${profileDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-1 sm:mt-2 w-48 sm:w-56 bg-white shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {user.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {user.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-1 sm:py-2">
                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors mx-2"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate("/profile");
                  }}
                >
                  <UserCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-600" />
                  <span>Profile</span>
                </button>

                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors mx-2"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate("/forgot-password");
                  }}
                >
                  <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-600" />
                  <span>Forgot Password</span>
                </button>

                <button
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 transition-colors  mx-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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