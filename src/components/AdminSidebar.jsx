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
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { label: 'Dashboard', icon: <HomeIcon size={18} />, to: '/admin/dashboard' },
  { label: 'New Memberships', icon: <UserPlusIcon size={18} />, count: 85, to: '/admin/newmembership' },
  { label: 'Active Members', icon: <UsersIcon size={18} />, count: 343, to: '/admin/activemembers' },
  { label: 'Generate Certificate', icon: <FileTextIcon size={18} />, count: 343, to: '/admin/generatecertificate' },
  { label: 'Active Certificate', icon: <CheckCircle2Icon size={18} />, count: 481, to: '/admin/activecertificate' },
  {
    label: 'Send Notice',
    icon: <MailIcon size={18} />,
    count: 3,
    children: [
      { label: 'Send To Single User', icon: <MailIcon size={16} />, to: '/admin/sendtosingleuser' },
    ],
  },
  { label: 'All Users Data', icon: <DatabaseIcon size={18} />, count: 430, to: '/admin/alluserdata' },
  { label: 'Blocked Users', icon: <UserXIcon size={18} />, count: 2, to: '/admin/blockedusers' },
  {
    label: 'Manager Section',
    icon: <ShieldCheckIcon size={18} />,
    count: 5,
    children: [
      { label: 'Add Manager', icon: <UserPlusIcon size={16} />, to: '/admin/addmanager' },
      { label: 'Active Manager', icon: <UsersIcon size={16} />, to: '/admin/activemanager', count: 5 },
      { label: 'Blocked Manager', icon: <UserXIcon size={16} />, to: '/admin/blockedmanager', count: 3 },
    ],
  },
  {
    label: 'Cash Donation',
    icon: <DollarSignIcon size={18} />,
    count: 2,
    children: [
      { label: 'Receive Donation', icon: <GiftIcon size={16} />, to: '/admin/receivedonation' },
      { label: 'Receipt', icon: <ReceiptIcon size={16} />, to: '/admin/receipt', count: 10 },
    ],
  },
  {
    label: 'Visitor Certificate',
    icon: <EyeIcon size={18} />,
    count: 2,
    children: [
      { label: 'Generate Certificate', icon: <FileTextIcon size={16} />, to: '/admin/generatecertificate' },
      { label: 'Certificate', icon: <CheckCircle2Icon size={16} />, to: '/admin/certificate', count: 71 },
    ],
  },
  { label: 'Visitor Donation', icon: <GiftIcon size={18} />, count: 79, to: '/admin/visitordonation' },
  {
    label: 'All Receipts',
    icon: <ReceiptIcon size={18} />,
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
    icon: <ArrowDownCircleIcon size={18} />,
    count: 4,
    children: [
      { label: 'New Memberships', icon: <DownloadIcon size={16} />, to: '/admin/newmemberships' },
      { label: 'Active Members', icon: <DownloadIcon size={16} />, to: '/admin/activemembers' },
      { label: 'Membership Receipt', icon: <DownloadIcon size={16} />, to: '/admin/membershipreceipt' },
      { label: 'User Donation Receipt', icon: <DownloadIcon size={16} />, to: '/admin/userdonationreceipt' },
      { label: 'Visitor Donation Receipt', icon: <DownloadIcon size={16} />, to: '/admin/visitordonationreceipt' },
    ],
  },
  { label: 'Update Software', icon: <ArrowDownCircleIcon size={18} />, to: '/admin/updatesoftware' },
];

const AdminSidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <aside className="bg-[#1f2d3d] text-white w-72 h-screen flex flex-col">
      <div className="flex items-center gap-3 px-4 py-4 text-lg font-bold bg-[#243447]">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
        <span>Shri Ram Navyug Trust</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Parent Menu Item */}
            {item.children ? (
              // For items with children (dropdown), only toggle the dropdown
              <div
                className={`flex justify-between items-center px-4 py-3 hover:bg-[#324055] text-base cursor-pointer ${
                  openIndex === index ? 'bg-green-500 text-white' : ''
                }`}
                onClick={() => handleToggle(index)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
            ) : (
              // For items without children, make the entire row a NavLink
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex justify-between items-center px-4 py-3 hover:bg-[#324055] text-base ${
                    isActive ? 'bg-green-500 text-white' : ''
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            )}

            {/* Dropdown Items */}
            {item.children && openIndex === index && (
              <div className="ml-8">
                {item.children.map((child, childIdx) => (
                  <NavLink
                    to={child.to}
                    key={childIdx}
                    className={({ isActive }) =>
                      `flex justify-between items-center px-4 py-2 hover:bg-[#2d3a4b] text-sm ${
                        isActive ? 'bg-green-500 text-white' : ''
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
        ))}
      </nav>

      <button className="mt-auto p-2 bg-[#2c3e50] hover:bg-[#34495e] text-sm text-center">
        &lt;
      </button>
    </aside>
  );
};

export default AdminSidebar;