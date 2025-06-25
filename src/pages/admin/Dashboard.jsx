import React from "react";
import { Users, UserPlus, UserX, CreditCard, Gift, FileText, UserCheck, ShieldOff, Receipt } from "lucide-react";


const StatCard = ({ icon, title, subtitle, value, gradient }) => (
  <div
    className={`flex flex-col justify-between rounded-lg shadow-lg p-4 w-full sm:w-[250px] text-white ${gradient}`}
  >
    <div className="flex items-center gap-3">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs">{subtitle}</div>
      </div>
    </div>
    <div className="text-right text-lg font-bold mt-4">{value}</div>
  </div>
);

const data = {
  Member: [
    {
      icon: <Users />, title: "Total Member", subtitle: "(Inactive)", value: 430,
      gradient: "bg-gradient-to-r from-cyan-500 to-gray-800"
    },
    {
      icon: <UserPlus />, title: "New Membership", subtitle: "(Inactive)", value: 85,
      gradient: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      icon: <UserCheck />, title: "Active Member", subtitle: "(All Active Member)", value: 343,
      gradient: "bg-gradient-to-r from-teal-400 to-purple-400"
    },
    {
      icon: <UserX />, title: "Blocked Member", subtitle: "(All Blocked Member)", value: 2,
      gradient: "bg-gradient-to-r from-orange-400 to-red-400"
    }
  ],
  Donation: [
    {
      icon: <CreditCard />, title: "Membership Fee", subtitle: "(Total Member Fee)", value: "₹ 10,000.00",
      gradient: "bg-gradient-to-r from-cyan-500 to-gray-800"
    },
    {
      icon: <Gift />, title: "Users Donation", subtitle: "(Active Members)", value: "₹ 18,167,619.00",
      gradient: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      icon: <Gift />, title: "Visitor Donation", subtitle: "(Direct Users Donation)", value: "₹ 81,579,753.00",
      gradient: "bg-gradient-to-r from-teal-400 to-purple-500"
    },
    {
      icon: <CreditCard />, title: "Cash Donation", subtitle: "(Received By Admin)", value: "₹ 107,801.00",
      gradient: "bg-gradient-to-r from-orange-400 to-red-400"
    }
  ],
  Receipt: [
    {
      icon: <FileText />, title: "Membership Receipt", subtitle: "(Active)", value: 100,
      gradient: "bg-gradient-to-r from-cyan-500 to-gray-800"
    },
    {
      icon: <FileText />, title: "User Donation Receipt", subtitle: "(Blocked By Admin)", value: 388,
      gradient: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      icon: <FileText />, title: "Visitor Donation Receipt", subtitle: "(Direct User Certificate)", value: 79,
      gradient: "bg-gradient-to-r from-teal-400 to-purple-500"
    },
    {
      icon: <Receipt />, title: "Cash Donation Receipt", subtitle: "(Active Users Certificate)", value: 10,
      gradient: "bg-gradient-to-r from-orange-400 to-red-400"
    }
  ],
  Managers: [
    {
      icon: <Users />, title: "Total Managers", subtitle: "(Active)", value: 8,
      gradient: "bg-gradient-to-r from-cyan-500 to-gray-800"
    },
    {
      icon: <ShieldOff />, title: "Blocked Managers", subtitle: "(Blocked By Admin)", value: 3,
      gradient: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      icon: <FileText />, title: "Visitor Certificate", subtitle: "(Direct User Certificate)", value: 71,
      gradient: "bg-gradient-to-r from-teal-400 to-purple-500"
    },
    {
      icon: <FileText />, title: "Active Users Certificates", subtitle: "(Active Users Certificate)", value: 554,
      gradient: "bg-gradient-to-r from-orange-400 to-red-400"
    }
  ]
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-1">Admin Dashboard</h2>
        <p className="text-sm mb-6">Welcome back, test</p>

        {Object.entries(data).map(([section, cards]) => (
          <div key={section} className="mb-8">
            <h3 className="text-sm font-bold mb-4 px-2 py-1 inline-block rounded bg-gradient-to-r from-cyan-700 to-gray-800 text-white">
              {section}
            </h3>
            <div className="flex flex-wrap gap-6">
              {cards.map((card, i) => (
                <StatCard key={i} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
