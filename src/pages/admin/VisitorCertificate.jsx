import React, { useState } from 'react';

export default function VisitorCertificate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');

  const certificates = [
    {
      srNo: 1,
      certificateNo: 'V/CRT-573',
      memberId: 'Admin',
      name: '/ / 0',
      email: '',
      mobile: '',
      fatherName: '',
      programName: ''
    },
    {
      srNo: 2,
      certificateNo: 'V/CRT-572',
      memberId: 'Admin',
      name: '/ / 0',
      email: '',
      mobile: '',
      fatherName: '',
      programName: ''
    },
    {
      srNo: 3,
      certificateNo: 'V/CRT-559',
      memberId: 'Admin',
      name: '/ / 0',
      email: '',
      mobile: '',
      fatherName: '',
      programName: ''
    },
    {
      srNo: 4,
      certificateNo: 'V/CRT-552',
      memberId: 'Admin',
      name: 'Prasad',
      email: 'test@gmail.com',
      mobile: '1234567890',
      fatherName: 'Prasad ji',
      programName: 'Lucknow'
    },
    {
      srNo: 5,
      certificateNo: 'V/CRT-550',
      memberId: 'Admin',
      name: 'Bhimrav Gamara',
      email: 'bhimravgamara81@gmail.com',
      mobile: '2147483647',
      fatherName: 'Motibhai',
      programName: 'Blood donation'
    },
    {
      srNo: 6,
      certificateNo: 'V/CRT-532',
      memberId: 'Admin',
      name: 'VINAY RAMCHAND BELEKAR',
      email: '',
      mobile: '2147483647',
      fatherName: 'mnn',
      programName: 'cdds'
    },
    {
      srNo: 7,
      certificateNo: 'V/CRT-530',
      memberId: 'Admin',
      name: 'NAMAN KUMAR BAURI',
      email: 'instructway@gmail.com',
      mobile: '2147483647',
      fatherName: 'CHANDAN KUMAR BAURI',
      programName: 'SPORTS CAMP'
    },
    {
      srNo: 8,
      certificateNo: 'V/CRT-529',
      memberId: 'Admin',
      name: 'NAMAN KUMAR BAURI',
      email: 'instructway@gmail.com',
      mobile: '2147483647',
      fatherName: 'CHANDAN KUMAR BAURI',
      programName: 'SPORTS CAMP'
    },
    {
      srNo: 9,
      certificateNo: 'V/CRT-528',
      memberId: 'Admin',
      name: '/ / 0',
      email: '',
      mobile: '',
      fatherName: '',
      programName: 'SPORTS CAMP'
    },
    {
      srNo: 10,
      certificateNo: 'V/CRT-527',
      memberId: 'Admin',
      name: '/ / 0',
      email: '',
      mobile: '',
      fatherName: '',
      programName: ''
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
          All Visitor Certificate
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
                Sr No ↕
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Certificate No
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Member Id
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Name / Email / Mobile
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Father Name
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Program Name
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Download
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={cert.srNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {cert.srNo}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {cert.certificateNo}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {cert.memberId}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  <div className="space-y-1">
                    <div className="text-gray-700">{cert.name}</div>
                    {cert.email && <div className="text-gray-600">{cert.email}</div>}
                    {cert.mobile && <div className="text-gray-600">/ {cert.mobile}</div>}
                  </div>
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {cert.fatherName}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900 border-b">
                  {cert.programName}
                </td>
                <td className="px-3 py-3 border-b">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
                    Download
                  </button>
                </td>
                <td className="px-3 py-3 border-b">
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
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing 20-30 of 50
        </div>
        <div className="flex items-center gap-2">
          <button className="text-blue-500 hover:text-blue-700 px-2 py-1 text-sm">
            ‹
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            1
          </button>
          <button className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded text-sm">
            2
          </button>
          <button className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded text-sm">
            3
          </button>
          <button className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded text-sm">
            4
          </button>
          <button className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded text-sm">
            5
          </button>
          <button className="bg-gray-800 text-white px-2 py-1 text-sm">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}