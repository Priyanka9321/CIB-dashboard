import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const UserDonationReceipts = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const receipts = [
    {
      srNo: 1,
      receiptNo: 'UD/RCP-412',
      memberId: 'MBR-',
      name: 'anupam anand',
      email: 'anupamanand777@gmail.com',
      phone: '9262266777',
      transactionId: '68517d69d23cf',
      amount: 10,
      mode: 'Online'
    },
    {
      srNo: 2,
      receiptNo: 'UD/RCP-411',
      memberId: 'MBR-',
      name: 'dsgfsdg',
      email: 'sayan@gmail.com',
      phone: '9856326598',
      transactionId: '684fbcdd09660',
      amount: 500,
      mode: 'Online'
    },
    {
      srNo: 3,
      receiptNo: 'UD/RCP-409',
      memberId: 'MBR-',
      name: 'Utkarsh Kumar',
      email: 'rkumar151997@gmail.com',
      phone: '7547655678',
      transactionId: '684ebab7d02c6',
      amount: 67770,
      mode: 'Online'
    },
    {
      srNo: 4,
      receiptNo: 'UD/RCP-408',
      memberId: 'MBR-17',
      name: 'Vaithi ??',
      email: 'anushkawinggosoft@gmail.com',
      phone: '1234567890',
      transactionId: '684d2a52c9234',
      amount: 1000,
      mode: 'Online'
    },
    {
      srNo: 5,
      receiptNo: 'UD/RCP-407',
      memberId: 'MBR-',
      name: 'xyz',
      email: 'abcdefg@gmail.com',
      phone: '8752341234',
      transactionId: '684d263c4f790',
      amount: 1000,
      mode: 'Online'
    },
    {
      srNo: 6,
      receiptNo: 'UD/RCP-406',
      memberId: 'MBR-visitor',
      name: 'Rajkumar',
      email: 'winggosoft@gmail.com',
      phone: '1234567890',
      transactionId: '68493c565634a',
      amount: 1100,
      mode: 'Online'
    },
    {
      srNo: 7,
      receiptNo: 'UD/RCP-405',
      memberId: 'MBR-visitor',
      name: 'Rajkumar',
      email: 'winggosoft@gmail.com',
      phone: '1112223334',
      transactionId: '684821a89562b',
      amount: 101,
      mode: 'Online'
    },
    {
      srNo: 8,
      receiptNo: 'UD/RCP-404',
      memberId: 'MBR-',
      name: 'Abdul Hakim',
      email: 'abhakim1994@gmail.com',
      phone: '7002082630',
      transactionId: '6847e93eb7560',
      amount: 50000,
      mode: 'Online'
    },
    {
      srNo: 9,
      receiptNo: 'UD/RCP-403',
      memberId: 'MBR-visitor',
      name: 'BISHAL CHANDA',
      email: 'vikichanda@yahoo.co.in',
      phone: '7399278643',
      transactionId: '6847e93d9b27c',
      amount: 1000,
      mode: 'Online'
    },
    {
      srNo: 10,
      receiptNo: 'UD/RCP-402',
      memberId: 'MBR-',
      name: 'BISHAL CHANDA',
      email: 'vikichanda@yahoo.co.in',
      phone: '7399278643',
      transactionId: '6847e91a6317a',
      amount: 1000,
      mode: 'Online'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-medium">Active Users Donation Receipts</h2>
        </div>

        {/* Controls */}
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Sr No ↑</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Receipt No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Member Id</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Name / Email / Mobile</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Transaction Id</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Mode</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Details</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Download</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, index) => (
                <tr key={receipt.srNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-700">{receipt.srNo}</td>
                  <td className="px-4 py-3 text-gray-700">{receipt.receiptNo}</td>
                  <td className="px-4 py-3 text-gray-700">{receipt.memberId}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">
                      <div className="text-blue-600">{receipt.name}</div>
                      <div className="text-blue-600">{receipt.email}</div>
                      <div className="text-gray-600">{receipt.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{receipt.transactionId}</td>
                  <td className="px-4 py-3 text-gray-700">₹ {receipt.amount}</td>
                  <td className="px-4 py-3 text-gray-700">{receipt.mode}</td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                      Download
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t text-center text-sm text-gray-600">
          Showing 1 to 10 of 379 entries
        </div>
      </div>
    </div>
  );
};

export default UserDonationReceipts;