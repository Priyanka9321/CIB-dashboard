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
      to: "/user/appointment",
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
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => {
            if (!item.subItems) {
              return (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/30 text-white border-r-4 border-blue-400"
                        : ""
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            } else {
              return (
                <div key={index}>
                  <button
                    onClick={() => setReceiptMenuOpen(!receiptMenuOpen)}
                    className="flex items-center gap-3 px-6 py-3 w-full text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all duration-200"
                  >
                    {item.icon}
                    <span className="font-medium flex-1 text-left">
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        receiptMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {receiptMenuOpen && (
                    <div className="ml-10">
                      {item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.to}
                          className={({ isActive }) =>
                            `block py-2 text-sm text-gray-300 hover:text-white hover:underline ${
                              isActive ? "text-white font-semibold" : ""
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
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
