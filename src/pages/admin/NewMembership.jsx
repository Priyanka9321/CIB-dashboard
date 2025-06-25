// src/components/MemberTable.jsx
import React, { useState } from 'react';

const NewMembership = () => {
  const initialData = [
    { srNo: 1, regNo: "MBR-513", name: "RAHUL KEVAT", email: "LBHERU579@GMAIL.COM", mobile: "77728049047", regDate: "16-06-2025", fee: "Unpaid" },
    { srNo: 2, regNo: "MBR-474", name: "SHREE RADHE", email: "srcitaka@gmail.com", mobile: "9974831261", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 3, regNo: "MBR-472", name: "MD ASIF", email: "mypytvltbd4@gmail.com", mobile: "9903167970", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 4, regNo: "MBR-471", name: "Jitendra Panwar", email: "jci.jaipur@gmail.com", mobile: "894974896", regDate: "23-05-2025", fee: "Unpaid" },
    { srNo: 5, regNo: "MBR-469", name: "Bhivesh Yadav", email: "yson29@gmail.com", mobile: "9630080100", regDate: "20-05-2025", fee: "Unpaid" },
    { srNo: 6, regNo: "MBR-453", name: "Masum Sheikh", email: "masumsheikhmed500@gmail.com", mobile: "9120250684", regDate: "12-05-2025", fee: "Unpaid" },
    { srNo: 7, regNo: "MBR-415", name: "test21", email: "test21@gmail.com", mobile: "7061075423", regDate: "18-04-2025", fee: "Unpaid" },
    { srNo: 8, regNo: "MBR-408", name: "KUNNA", email: "pekic67232@clumbemp.com", mobile: "789045362", regDate: "11-04-2025", fee: "Unpaid" },
    { srNo: 9, regNo: "MBR-406", name: "MANISH KUMAR", email: "betisonaksh@gmail.com", mobile: "9598363813", regDate: "11-04-2025", fee: "Unpaid" },
    { srNo: 10, regNo: "MBR-342", name: "rsushAYjo", email: "droeibctiao1vkq1e@yahoo.com", mobile: "6599413365", regDate: "02-03-2025", fee: "Unpaid" },
    // Add more entries to simulate 85 total entries
    ...Array.from({ length: 75 }, (_, i) => ({
      srNo: i + 11,
      regNo: `MBR-${300 - i}`,
      name: `User ${i + 11}`,
      email: `user${i + 11}@example.com`,
      mobile: `900000${i + 11}`,
      regDate: "01-03-2025",
      fee: "Unpaid",
    })),
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = initialData.filter(
      (item) =>
        item.regNo.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
    );
    setData(filtered);
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries per page</span>
        </div>
        <h2 className="text-xl font-bold">NEW MEMBER REQUEST DATA</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter as Id No. Name Email Id"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-sm w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left text-sm font-semibold">Sr.No.</th>
              <th className="p-2 text-left text-sm font-semibold">Reg. No / NAME / EMAIL / MOBILE</th>
              <th className="p-2 text-left text-sm font-semibold">Reg-Date</th>
              <th className="p-2 text-left text-sm font-semibold">Fee</th>
              <th className="p-2 text-left text-sm font-semibold">Details</th>
              <th className="p-2 text-left text-sm font-semibold">Action</th>
              <th className="p-2 text-left text-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.srNo}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 text-sm">{item.srNo}</td>
                <td className="p-2 text-sm">
                  {item.regNo} / {item.name} / {item.email} / {item.mobile}
                </td>
                <td className="p-2 text-sm">{item.regDate}</td>
                <td className="p-2 text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {item.fee}
                  </span>
                </td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    View
                  </button>
                </td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Verify Now
                  </button>
                </td>
                <td className="p-2 text-sm flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    ✏️
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <span className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries}{" "}
          entries
        </span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          {currentPage}
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewMembership;