import React, { useState } from 'react';

export default function MembershipReceipt() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const paymentReceipts = [
    {
      srNo: 1,
      memberName: 'Shebin',
      memberId: 'MBR-508',
      receiptNo: 'M/RCP-100',
      amount: '₹ 100',
      transactionId: '684bf316783be',
      paymentMode: 'Online',
      date: '13-06-2025'
    },
    {
      srNo: 2,
      memberName: 'Rajkumar',
      memberId: 'MBR-504',
      receiptNo: 'M/RCP-99',
      amount: '₹ 100',
      transactionId: '68493d509d81e',
      paymentMode: 'Online',
      date: '11-06-2025'
    },
    {
      srNo: 3,
      memberName: 'Rajkumar',
      memberId: 'MBR-502',
      receiptNo: 'M/RCP-98',
      amount: '₹ 100',
      transactionId: '6848226db7b6e',
      paymentMode: 'Online',
      date: '10-06-2025'
    },
    {
      srNo: 4,
      memberName: 'Dipankar Bera',
      memberId: 'MBR-494',
      receiptNo: 'M/RCP-97',
      amount: '₹ 100',
      transactionId: '6841e488e5b4e',
      paymentMode: 'Online',
      date: '05-06-2025'
    },
    {
      srNo: 5,
      memberName: 'somnath Bera',
      memberId: 'MBR-493',
      receiptNo: 'M/RCP-96',
      amount: '₹ 100',
      transactionId: '68419f180c0ea',
      paymentMode: 'Online',
      date: '05-06-2025'
    },
    {
      srNo: 6,
      memberName: 'JAHIRUL AHAMED',
      memberId: 'MBR-492',
      receiptNo: 'M/RCP-95',
      amount: '₹ 100',
      transactionId: '684143c380e3a',
      paymentMode: 'Online',
      date: '05-06-2025'
    },
    {
      srNo: 7,
      memberName: 'JAHIRUL AHAMED',
      memberId: 'MBR-492',
      receiptNo: 'M/RCP-94',
      amount: '₹ 100',
      transactionId: '684143c380e3a',
      paymentMode: 'Online',
      date: '05-06-2025'
    },
    {
      srNo: 8,
      memberName: 'Aman Kumar',
      memberId: 'MBR-483',
      receiptNo: 'M/RCP-93',
      amount: '₹ 100',
      transactionId: '6839576232509',
      paymentMode: 'Online',
      date: '30-05-2025'
    },
    {
      srNo: 9,
      memberName: 'Amar Shinde',
      memberId: 'MBR-460',
      receiptNo: 'M/RCP-92',
      amount: '₹ 100',
      transactionId: '6826ddd45da9d',
      paymentMode: 'Online',
      date: '16-05-2025'
    },
    {
      srNo: 10,
      memberName: 'Chandra Prakash Kushwaha',
      memberId: 'MBR-459',
      receiptNo: 'M/RCP-91',
      amount: '₹ 100',
      transactionId: '6825d4f689de2',
      paymentMode: 'Online',
      date: '15-05-2025'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-600">entries per page</span>
        </div>

        <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded text-sm font-medium">
          Membership Payment Receipt
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Sr.No. ↕
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Member Name
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Member Id
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Receipt No.
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Transaction Id
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Payment Mode
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Date
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Details
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentReceipts.map((receipt, index) => (
              <tr key={receipt.srNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.srNo}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.memberName}
                </td>
                <td className="px-3 py-3 text-sm text-blue-600 border-b">
                  {receipt.memberId}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.receiptNo}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.amount}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.transactionId}
                </td>
                <td className="px-3 py-3 text-sm text-blue-600 border-b">
                  {receipt.paymentMode}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {receipt.date}
                </td>
                <td className="px-3 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                    View
                  </button>
                </td>
                <td className="px-3 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium">
                    Download Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Showing 1 to 10 of 100 entries
      </div>
    </div>
  );
}