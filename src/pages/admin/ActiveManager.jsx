import React, { useState } from 'react';
import { ChevronDown, Edit, Trash2, Eye } from 'lucide-react';

const ActiveManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const managersData = [
    {
      id: 1,
      regNo: 'MBR-452',
      name: 'Hilf',
      email: 'riggs@gmail.com',
      mobile: '6437645436',
      regDate: '12-05-2025'
    },
    {
      id: 2,
      regNo: 'MBR-421',
      name: 'Sushil tiwari',
      email: 'prakashenterprises474@gmail.com',
      mobile: '7091080657',
      regDate: '18-04-2025'
    },
    {
      id: 3,
      regNo: 'MBR-241',
      name: 'Ravi',
      email: '9999222233@gmail.com',
      mobile: '9999222233',
      regDate: '02-01-2025'
    },
    {
      id: 4,
      regNo: 'MBR-238',
      name: 'manager',
      email: 'manager@gmail.com',
      mobile: '1234567899',
      regDate: '01-01-2025'
    },
    {
      id: 5,
      regNo: 'MBR-237',
      name: 'atul',
      email: 'cscgopi8888@gmail.com',
      mobile: '6058090591',
      regDate: '01-01-2025'
    }
  ];

  const filteredData = managersData.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-700 text-white px-6 py-3 rounded-t-lg">
          <h2 className="text-lg font-medium">Active Managers Data</h2>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 px-6 py-4 border-l border-r border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1 text-sm bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries per page</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
              placeholder=""
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-l border-r border-b border-gray-200">
          <table className="w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    Sr.No.
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  Reg.No / Name / Email / Mobile
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  Reg. Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((manager, index) => (
                <tr key={manager.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {manager.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">{manager.regNo}</span> / {manager.name} / 
                        <span className="text-blue-600"> {manager.email}</span> / {manager.mobile}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {manager.regDate}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium">
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium">
                      Block Now
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-l border-r border-b border-gray-200 rounded-b-lg flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex gap-1">
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveManager;