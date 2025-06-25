import React, { useState } from "react";
import { Search, Eye, Download, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const Receipt = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sample data based on your screenshot
  const receiptsData = [
    {
      id: 1,
      receiptNo: "CD/RCP-325",
      name: "Raj Dudhatra",
      email: "rajdudhatra1999@gmail.com",
      mobile: "769807971",
      amount: "₹ 100",
      mode: "cash",
      paymentImage: null,
      hasImage: false
    },
    {
      id: 2,
      receiptNo: "CD/RCP-308",
      name: "test",
      email: "admin123@gmail.com",
      mobile: "1234567890",
      amount: "₹ 1200",
      mode: "cash",
      paymentImage: "receipt-2.jpg",
      hasImage: true
    },
    {
      id: 3,
      receiptNo: "CD/RCP-307",
      name: "test",
      email: "admin123@gmail.com",
      mobile: "1234567890",
      amount: "₹ 1200",
      mode: "cash",
      paymentImage: "receipt-3.jpg",
      hasImage: true
    },
    {
      id: 4,
      receiptNo: "CD/RCP-306",
      name: "Test22",
      email: "test22@gmail.com",
      mobile: "1234567890",
      amount: "₹ 1200",
      mode: "cash",
      paymentImage: "receipt-4.jpg",
      hasImage: true
    },
    {
      id: 5,
      receiptNo: "CD/RCP-205",
      name: "dfdf",
      email: "fytry@gmail.com",
      mobile: "56765756",
      amount: "₹ 1",
      mode: "cash",
      paymentImage: "receipt-5.jpg",
      hasImage: true
    },
    {
      id: 6,
      receiptNo: "CD/RCP-169",
      name: "Vikram",
      email: "Vikramsingh007@gmail.com",
      mobile: "6375961993",
      amount: "₹ 51000",
      mode: "cash",
      paymentImage: "receipt-6.jpg",
      hasImage: true
    },
    {
      id: 7,
      receiptNo: "CD/RCP-142",
      name: "Ravindra Singh",
      email: "Jodharawsa@gmail.com",
      mobile: "8302986018",
      amount: "₹ 51000",
      mode: "cash",
      paymentImage: "receipt-7.jpg",
      hasImage: true
    },
    {
      id: 8,
      receiptNo: "CD/RCP-137",
      name: "Ravi",
      email: "renn1983@gmail.com",
      mobile: "08072286542",
      amount: "₹ 1000",
      mode: "cash",
      paymentImage: "receipt-8.jpg",
      hasImage: true
    },
    {
      id: 9,
      receiptNo: "CD/RCP-43",
      name: "HJJHJHJHJHJHJ",
      email: "JVVAGHELA1998@GMAIL.COM",
      mobile: "",
      amount: "₹ 1000",
      mode: "cash",
      paymentImage: "receipt-9.jpg",
      hasImage: true
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="w-4 h-4 inline ml-1" /> : 
        <ChevronDown className="w-4 h-4 inline ml-1" />;
    }
    return null;
  };

  const PaymentImageCell = ({ hasImage, paymentImage }) => {
    if (!hasImage) {
      return <span className="text-gray-400 text-2xl">---</span>;
    }
    
    return (
      <div className="w-8 h-8 bg-blue-100 rounded border flex items-center justify-center">
        <div className="w-6 h-4 bg-blue-500 rounded-sm opacity-70"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
            Cash Donation Receipts
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">entries per page</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search:</span>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('id')}
                  >
                    Sr No {getSortIcon('id')}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Receipt No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Name / Email / Mobile
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {getSortIcon('amount')}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Mode
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Payment Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Download
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {receiptsData.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {receipt.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {receipt.receiptNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="font-medium">{receipt.name}</div>
                        <div className="text-gray-600">{receipt.email}</div>
                        <div className="text-gray-600">{receipt.mobile}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {receipt.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {receipt.mode}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <PaymentImageCell 
                        hasImage={receipt.hasImage} 
                        paymentImage={receipt.paymentImage}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors">
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Download
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing 1 to {Math.min(entriesPerPage, receiptsData.length)} of {receiptsData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;