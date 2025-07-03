import {
  Home,
  User,
  UserPlus,
  CreditCard,
  FileText,
  Award,
  Settings,
  Wallet,
  Receipt,
  CheckCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [receiptMenuOpen, setReceiptMenuOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", to: "/user/dashboard" },
    {
      icon: <UserPlus size={20} />,
      label: "Apply For Membership",
      to: "/user/apply-membership",
    },
    {
      icon: <CheckCircle size={20} />,
      label: "Membership Status",
      to: "/user/membership",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Generate ID Card",
      to: "/user/idcard",
    },
    {
      icon: <FileText size={20} />,
      label: "Appointment Letter",
      to: `/user/appointment-letter`,
    },
    {
      icon: <Award size={20} />,
      label: "Our Certificate",
      to: "/user/certificate",
    },
    {
      icon: <User size={20} />,
      label: "Update Profile",
      to: "/user/update-profile",
    },
    { icon: <Settings size={20} />, label: "Account", to: "/user/account" },
    { icon: <Wallet size={20} />, label: "Donate Now", to: "/user/donate" },
    {
      icon: <Receipt size={20} />,
      label: "Receipt",
      subItems: [
        { label: "Membership Payment Receipt", to: "/user/receipt/membership" },
        { label: "Donation Payment Receipt", to: "/user/receipt/donation" },
      ],
    },
  ];

  return (
    <>
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-70 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Icon from public folder */}
              <img
                src="/favicon.ico"
                alt="CIB Logo"
                className="w-6 h-6 object-contain"
              />
              <p className="text-white text-lg">Crime Investigation Bureau</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>


        <nav className="mt-4 px-3">
          {menuItems.map((item, index) => {
            if (!item.subItems) {
              return (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 mx-2 my-1  text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : ""
                    }`
                  }
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              );
            } else {
              return (
                <div key={index} className="mx-2 my-1">
                  <button
                    onClick={() => setReceiptMenuOpen(!receiptMenuOpen)}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm flex-1 text-left">
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${receiptMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {receiptMenuOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.to}
                          className={({ isActive }) =>
                            `block py-2 px-3 text-sm rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 ${isActive ? "text-blue-400 bg-blue-900/30" : ""
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-xs text-blue-200/70">
              © 2024 Crime Investigation Bureau
            </p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;