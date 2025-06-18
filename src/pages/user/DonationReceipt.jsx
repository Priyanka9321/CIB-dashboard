import React, { useState } from "react";
import {
  Search,
  Eye,
  Download,
  Filter,
  Calendar,
  Users,
  CreditCard,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DonationReceipt = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const donationData = [
    {
      id: 1,
      receiptNo: "M/RCP-18",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "670ff15ee5623",
      amount: 200,
      paymentMode: "Online",
    },
    {
      id: 2,
      receiptNo: "M/RCP-40",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "671a159d6a54f",
      amount: 10000,
      paymentMode: "Online",
    },
    {
      id: 3,
      receiptNo: "M/RCP-42",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "671bb1b23fff2",
      amount: 1,
      paymentMode: "Online",
    },
    {
      id: 4,
      receiptNo: "M/RCP-60",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6729b8e97184b",
      amount: 500,
      paymentMode: "Online",
    },
    {
      id: 5,
      receiptNo: "M/RCP-61",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6729b8e97184b",
      amount: 500,
      paymentMode: "Online",
    },
    {
      id: 6,
      receiptNo: "M/RCP-62",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6729bd431a8ab",
      amount: 876,
      paymentMode: "Online",
    },
    {
      id: 7,
      receiptNo: "M/RCP-63",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6729bef84472b",
      amount: 765,
      paymentMode: "Online",
    },
    {
      id: 8,
      receiptNo: "M/RCP-106",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "673af9d382320",
      amount: 1100,
      paymentMode: "Online",
    },
    {
      id: 9,
      receiptNo: "M/RCP-124",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6741b9588f566",
      amount: 500000,
      paymentMode: "Online",
    },
    {
      id: 10,
      receiptNo: "M/RCP-125",
      memberId: "MBR-17",
      name: "Anushka Gupta",
      transactionId: "6741ba8a3be57",
      amount: 2000000,
      paymentMode: "Online",
    },
  ];

  const filteredData = donationData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Show
                </label>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-blue-50 to-indigo-50"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <label className="text-sm font-medium text-gray-700">
                  entries per page
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-blue-50 to-indigo-50 w-64"
                />
              </div>
              <button className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <span>Sr No</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <span>Receipt No</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Member ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment Mode
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Details
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {item.receiptNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {item.memberId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {item.transactionId}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      <span className="text-green-600">
                        {formatAmount(item.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {item.paymentMode}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 group">
                        <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 group">
                        <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + entriesPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-blue-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4 text-blue-600" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "border border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-blue-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationReceipt;
