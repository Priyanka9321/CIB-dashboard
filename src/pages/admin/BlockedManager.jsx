import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function BlockedManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const blockedManagers = [
    {
      srNo: 1,
      regNo: 'MBR-399',
      name: 'test',
      email: 'test33@gmail.com',
      mobile: '1234567890',
      regDate: '03-04-2025'
    },
    {
      srNo: 2,
      regNo: 'MBR-297',
      name: 'Govind Kumar',
      email: 'govindkumar123@gmail.com',
      mobile: '1234567890',
      regDate: '29-01-2025'
    },
    {
      srNo: 3,
      regNo: 'MBR-285',
      name: 'ticket',
      email: 'govindaaraya@gmail.com',
      mobile: '1234561234',
      regDate: '20-01-2025'
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
          Block Managers Data
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Sr.No. ↕
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Reg.No / Name / Email / Mobile
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Reg. Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Details
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Action
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blockedManagers.map((manager, index) => (
              <tr key={manager.srNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  {manager.srNo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <div className="space-y-1">
                    <div className="font-medium text-blue-600">{manager.regNo}</div>
                    <div className="text-gray-700 font-medium">/ {manager.name} /</div>
                    <div className="text-gray-600">{manager.email}</div>
                    <div className="text-gray-600">/ {manager.mobile}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  {manager.regDate}
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                    View
                  </button>
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                    Unblock
                  </button>
                </td>
                <td className="px-4 py-3 border-b">
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing 1 to 3 of 3 entries
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            1
          </button>
        </div>
      </div>
    </div>
  );
}