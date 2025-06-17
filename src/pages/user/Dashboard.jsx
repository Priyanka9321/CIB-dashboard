import {
  User,
  CreditCard,
  FileText,
  Bell,
  CheckCircle,
  DollarSign,
  Calendar,
  Shield,
  Menu,
} from "lucide-react";

const UserDashboard = () => {
  const statusCards = [
    {
      title: "Generated",
      subtitle: "(ID CARD)",
      icon: <CreditCard className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-blue-700",
      status: "completed",
    },
    {
      title: "Generated",
      subtitle: "(APPOINTMENT LETTER)",
      icon: <FileText className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-pink-600",
      status: "completed",
    },
    {
      title: "Paid",
      subtitle: "(MEMBERSHIP PAYMENT)",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      gradient: "from-orange-500 to-red-500",
      status: "paid",
    },
    {
      title: "Active",
      subtitle: "(MEMBERSHIP STATUS)",
      icon: <Shield className="w-8 h-8 text-white" />,
      gradient: "from-emerald-500 to-blue-600",
      status: "active",
    },
  ];

  const adminNotices = [
    {
      id: 1,
      title: "Time testing1",
      date: "2025-04-22 06:34:141",
    },
    {
      id: 2,
      title: "Program1",
      date: "2025-04-14 03:47:441",
    },
    {
      id: 3,
      title: "test12@gmail.com1",
      date: "2025-04-10 07:12:131",
    },
    {
      id: 4,
      title: "TODAY URGENT MEETING1",
      date: "2025-01-07 09:19:511",
    },
    {
      id: 5,
      title: "????? ???? ????? 1",
      date: "2024-12-26 10:13:101",
    },
    {
      id: 6,
      title: "????? ???? ????? 1",
      date: "2024-12-26 10:13:051",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                User Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, Vaithi Ji</p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statusCards.map((card, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${card.gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      {card.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                  <p className="text-white/80 text-sm font-medium">
                    {card.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Admin Notice Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Admin Notice
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {adminNotices.map((notice, index) => (
                    <div
                      key={notice.id}
                      className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200 border border-transparent hover:border-blue-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {notice.title}
                        </h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {notice.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
