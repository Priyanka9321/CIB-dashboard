import {
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
  FileTextIcon,
  CheckCircle2Icon,
  MailIcon,
  DatabaseIcon,
  UserXIcon,
  ShieldCheckIcon,
  DollarSignIcon,
  EyeIcon,
  GiftIcon,
  ReceiptIcon,
  ArrowDownCircleIcon,
  DownloadIcon,
  ChevronDown,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// Add custom scrollbar styles
const scrollbarStyles = `
  /* Custom scrollbar for webkit browsers */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.3);
    border-radius: 10px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(71, 85, 105, 0.8);
    border-radius: 10px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 116, 139, 0.9);
  }
`;

const menuItems = [
  { label: 'Dashboard', icon: <HomeIcon size={20} />, to: '/admin/dashboard' },
  { label: 'New Memberships', icon: <UserPlusIcon size={20} />, count: 85, to: '/admin/newmembership' },
  { label: 'Active Members', icon: <UsersIcon size={20} />, count: 343, to: '/admin/activemembers' },
  { label: 'Generate Certificate', icon: <FileTextIcon size={20} />, count: 343, to: '/admin/generatecertificate' },
  { label: 'Active Certificate', icon: <CheckCircle2Icon size={20} />, count: 481, to: '/admin/activecertificate' },
  {
    label: 'Send Notice',
    icon: <MailIcon size={20} />,
    count: 3,
    children: [
      { label: 'Send To Single User', icon: <MailIcon size={16} />, to: '/admin/sendtosingleuser' },
    ],
  },
  { label: 'All Users Data', icon: <DatabaseIcon size={20} />, count: 430, to: '/admin/alluserdata' },
  { label: 'Blocked Users', icon: <UserXIcon size={20} />, count: 2, to: '/admin/blockedusers' },
  {
    label: 'Manager Section',
    icon: <ShieldCheckIcon size={20} />,
    count: 5,
    children: [
      { label: 'Add Manager', icon: <UserPlusIcon size={16} />, to: '/admin/addmanager' },
      { label: 'Active Manager', icon: <UsersIcon size={16} />, to: '/admin/activemanager', count: 5 },
      { label: 'Blocked Manager', icon: <UserXIcon size={16} />, to: '/admin/blockedmanager', count: 3 },
    ],
  },
  {
    label: 'Cash Donation',
    icon: <DollarSignIcon size={20} />,
    count: 2,
    children: [
      { label: 'Receive Donation', icon: <GiftIcon size={16} />, to: '/admin/receivedonation' },
      { label: 'Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/receipt', count: 10 },
    ],
  },
  {
    label: 'Visitor Certificate',
    icon: <EyeIcon size={20} />,
    count: 2,
    children: [
      { label: 'Generate Certificate', icon: <FileTextIcon size={16} />, to: '/admin/generatecertificate' },
      { label: 'Certificate', icon: <CheckCircle2Icon size={16} />, to: '/admin/certificate', count: 71 },
    ],
  },
  { label: 'Visitor Donation', icon: <GiftIcon size={20} />, count: 79, to: '/admin/visitordonation' },
  {
    label: 'All Receipts',
    icon: <ReceiptIcon size={20} />,
    count: 2,
    children: [
      { label: 'Membership Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/membershipreceipt', count: 100 },
      { label: 'User Donation Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/userdonationreceipt', count: 388 },
      { label: 'Visitor Donation Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/visitordonationreceipt', count: 79 },
      { label: 'Cash Donation Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/cashdonationreceipt', count: 10 },
    ],
  },
  {
    label: 'Report Download',
    icon: <ArrowDownCircleIcon size={20} />,
    count: 4,
    children: [
      { label: 'New Memberships', icon: <DownloadIcon size={16} />, to: '/admin/newmemberships' },
      { label: 'Active Members', icon: <DownloadIcon size={16} />, to: '/admin/activemembers' },
      { label: 'Membership Receipt', icon: <DownloadIcon size={16} />, to: '/admin/membershipreceipt' },
      { label: 'User Donation Receipt', icon: <DownloadIcon size={16} />, to: '/admin/userdonationreceipt' },
      { label: 'Visitor Donation Receipt', icon: <DownloadIcon size={16} />, to: '/admin/visitordonationreceipt' },
    ],
  },
  { label: 'Update Software', icon: <ArrowDownCircleIcon size={20} />, to: '/admin/updatesoftware' },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (index) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      {/* Add custom scrollbar styles */}
      <style>{scrollbarStyles}</style>
      
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 transition-transform duration-300 ease-in-out flex flex-col h-screen`}
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

        <nav className="mt-4 px-3 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500 pb-4">
          {menuItems.map((item, index) => {
            if (!item.children) {
              return (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 mx-2 my-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              );
            } else {
              return (
                <div key={index} className="mx-2 my-1">
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex items-center justify-between px-4 py-3 w-full rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== undefined && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openMenus[index] ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </button>
                  {openMenus[index] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child, childIdx) => (
                        <NavLink
                          key={childIdx}
                          to={child.to}
                          className={({ isActive }) =>
                            `flex items-center justify-between py-2 px-3 text-sm rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 ${isActive ? "text-blue-400 bg-blue-900/30" : ""
                            }`
                          }
                        >
                          <div className="flex items-center gap-2">
                            {child.icon}
                            <span>{child.label}</span>
                          </div>
                          {child.count !== undefined && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {child.count}
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </nav>

        <div className="mt-auto p-4 border-t">
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

export default AdminSidebar;