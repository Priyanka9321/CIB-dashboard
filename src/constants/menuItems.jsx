// src/constants/menuItems.js
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
} from "lucide-react";

export const menuItems = [
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
