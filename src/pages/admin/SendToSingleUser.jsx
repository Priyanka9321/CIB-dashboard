import React, { useState } from 'react';

export default function SendToSingleUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const users = [
    {
      srNo: 1,
      regNo: 'MBR-512',
      name: 'Izorof',
      email: 'monarchs836@gmail.com',
      mobile: '9810867106',
      regDate: '14-06-2025'
    },
    {
      srNo: 2,
      regNo: 'MBR-510',
      name: 'IXYZ',
      email: 'harshitsh6611@gmail.com',
      mobile: '7878439974',
      regDate: '14-06-2025'
    },
    {
      srNo: 3,
      regNo: 'MBR-509',
      name: 'hhhh',
      email: 'nitishchandraroy@gmail.com',
      mobile: '7002341656',
      regDate: '14-06-2025'
    },
    {
      srNo: 4,
      regNo: 'MBR-508',
      name: 'Shebin',
      email: 'shebin28joseph@gmail.com',
      mobile: '9873177307',
      regDate: '13-06-2025'
    },
    {
      srNo: 5,
      regNo: 'MBR-507',
      name: 'Sachin vishwesworrao gudadhe',
      email: 'Sachingudadhe862@gmail.com',
      mobile: '9503465428',
      regDate: '12-06-2025'
    },
    {
      srNo: 6,
      regNo: 'MBR-506',
      name: 'SHAMIM ALI',
      email: 'superadmin@ramon.com',
      mobile: '7002115673',
      regDate: '11-06-2025'
    },
    {
      srNo: 7,
      regNo: 'MBR-505',
      name: 'Riddhika Jadhav',
      email: 'riddhika.jadhav07@gmail.com',
      mobile: '8799902949',
      regDate: '11-06-2025'
    },
    {
      srNo: 8,
      regNo: 'MBR-504',
      name: 'Rajkumar',
      email: 'winggosoft@gmail.com',
      mobile: '9566774488',
      regDate: '11-06-2025'
    },
    {
      srNo: 9,
      regNo: 'MBR-503',
      name: 'दिनेश',
      email: 'dishudevansh730@gmail.com',
      mobile: '8445444182',
      regDate: '11-06-2025'
    },
    {
      srNo: 10,
      regNo: 'MBR-502',
      name: 'Rajkumar',
      email: 'kumarsh@gmail.com',
      mobile: '9544667788',
      regDate: '10-06-2025'
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
          Send Notice To Single User
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
            {users.map((user, index) => (
              <tr key={user.srNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  {user.srNo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <div className="space-y-1">
                    <div className="font-medium text-blue-600">{user.regNo}</div>
                    <div className="text-gray-700 font-medium">/{user.name}/</div>
                    <div className="text-gray-600">{user.email}</div>
                    <div className="text-gray-600">/{user.mobile}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  {user.regDate}
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                    View
                  </button>
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                    Deactivate user
                  </button>
                </td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                    Send Notice Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Showing 1 to 10 of 343 entries
      </div>
    </div>
  );
}