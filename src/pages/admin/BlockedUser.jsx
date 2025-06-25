import React, { useState } from 'react';

const BlockUser = () => {
  const initialData = [
    {
      srNo: 1,
      regNo: "MBR-498",
      name: "RAMESH KADAM",
      email: "rameshkadamstar1974@gmail.com",
      mobile: "8796636861",
      blockingDate: "06-06-2025",
      status: "Blocked",
      reason: "Ok",
      blockedBy: "Admin",
    },
    {
      srNo: 2,
      regNo: "MBR-447",
      name: "Irshad",
      email: "irshadvfv@gmail.com",
      mobile: "99666463199",
      blockingDate: "29-05-2025",
      status: "Blocked",
      reason: "6",
      blockedBy: "Admin",
    },
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

  const handleUnblock = (item) => {
    const updatedData = data.map((dataItem) =>
      dataItem.srNo === item.srNo ? { ...dataItem, status: "Active" } : dataItem
    );
    setData(updatedData);
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded p-1 text-sm bg-white"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries per page</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">All Block User Data</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Search:</label>
          <input
            type="text"
            placeholder="Enter as Id No. Name Email Id"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-1 text-sm w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Sr.No.</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Reg.No / Name / Email / Mobile</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Blocking Date</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Details</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Reason</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Block By</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.srNo}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 text-sm text-gray-600">{item.srNo}</td>
                <td className="p-2 text-sm text-gray-600">
                  {item.regNo} / {item.name} / {item.email} / {item.mobile}
                </td>
                <td className="p-2 text-sm text-gray-600">{item.blockingDate}</td>
                <td className="p-2 text-sm">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    View
                  </button>
                </td>
                <td className="p-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded ${
                      item.status === "Blocked"
                        ? "bg-red-500 text-white"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 text-sm text-gray-600">{item.reason}</td>
                <td className="p-2 text-sm">
                  <span className="bg-green-500 text-white px-3 py-1 rounded">
                    {item.blockedBy}
                  </span>
                </td>
                <td className="p-2 text-sm">
                  {item.status === "Blocked" ? (
                    <button
                      onClick={() => handleUnblock(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnblock(item)}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded cursor-not-allowed"
                      disabled
                    >
                      Unblock
                    </button>
                  )}
                </td>
                <td className="p-2 text-sm flex gap-1">
                  <button className="text-gray-500 hover:text-gray-700">✏️</button>
                  <button className="text-gray-500 hover:text-gray-700">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <span className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
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

export default BlockUser;