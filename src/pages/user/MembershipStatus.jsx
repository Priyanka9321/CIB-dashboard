import {
  Home,
  User,
  Calendar,
  Shield,
  CreditCard,
  CheckCircle,
  Hash,
} from "lucide-react";

const MembershipStatus = () => {
  return (
    <div className="min-h-screen p-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          Membership Status
        </h1>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              Membership Status
            </h2>
          </div>

          {/* Card Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Number */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-lg p-3 mr-4">
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Registration No
                      </p>
                      <p className="text-xl font-bold text-gray-900">MBR-17</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-lg p-3 mr-4">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Account Status
                      </p>
                      <div className="flex items-center">
                        <p className="text-xl font-bold text-gray-900 mr-2">
                          Active
                        </p>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Date */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-500 rounded-lg p-3 mr-4">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Verification Date
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        2024-12-26
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-orange-500 rounded-lg p-3 mr-4">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Validity
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        2025-12-26
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Fee */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-lg p-3 mr-4">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Membership Fee
                      </p>
                      <div className="flex items-center">
                        <p className="text-xl font-bold text-gray-900 mr-2">
                          Success
                        </p>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                    Payment Complete
                  </div>
                </div>
              </div>
            </div>

            {/* Status Summary */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Account Summary
                  </h3>
                  <p className="text-blue-100">
                    Your membership is active and all payments are up to date
                  </p>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2 " />
                  <span className="font-medium ">All Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStatus;
